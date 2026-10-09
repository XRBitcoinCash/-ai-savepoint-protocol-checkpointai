import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { assessEvidence, decideRepeatedAttempt } from './check-evidence.mjs';

const digest = 'a'.repeat(64);
const record = {
  id: 'synthetic-example', project: 'XRBC', kind: 'synthetic', status: 'passed',
  source_revision: 'revision-1', recorded_at: '2026-10-09T06:00:00Z',
  scope: 'Synthetic fixture only', command: 'DO NOT EXECUTE', input_digest: digest,
  environment_digest: 'b'.repeat(64), reference: 'local-evidence-reference',
  limitations: ['Caller must supply complete relevant fingerprints.'], supersedes: [],
};
const context = {
  project: 'XRBC', source_revision: 'revision-1', input_digest: digest,
  environment_digest: 'b'.repeat(64), required_gate: false, live_state: false,
};
const attempt = { hypothesis: 'same cause', input_digest: digest, failure: 'same failure' };
const decide = (recordChanges = {}, contextChanges = {}) => assessEvidence({ ...record, ...recordChanges }, { ...context, ...contextChanges });

test('passed scoped evidence can be reused across revisions only with complete matching fingerprints', () => {
  const before = JSON.stringify([record, context]);
  assert.equal(assessEvidence(record, context).reusable, true);
  const result = decide({ kind: 'source' }, { source_revision: 'revision-2' });
  assert.equal(result.decision, 'reuse-evidence');
  assert.match(result.reason, /revision changed/);
  assert.equal(decide({}, { input_digest: digest.toUpperCase() }).reusable, true);
  assert.equal(JSON.stringify([record, context]), before);
});

test('different projects or changed relevant fingerprints invalidate reuse', () => {
  for (const change of [{ project: 'JCS' }, { input_digest: 'c'.repeat(64) }, { environment_digest: 'c'.repeat(64) }]) {
    assert.equal(decide({}, change).decision, 'run-check');
  }
  assert.equal(decide({ environment_digest: null }, { input_digest: 'c'.repeat(64) }).decision, 'run-check');
});

test('same revision without complete fingerprints requires review and never machine reuse', () => {
  for (const change of [{ input_digest: null }, { environment_digest: null }, { input_digest: null, environment_digest: null }]) {
    assert.equal(decide(change).decision, 'review-evidence');
    assert.equal(decide({}, change).reusable, false);
    assert.equal(decide(change, { source_revision: 'revision-2' }).decision, 'run-check');
  }
});

test('unknown revisions require scoped review while pending records may lack a reference', () => {
  for (const status of ['pending', 'unknown']) {
    const result = decide({ status, source_revision: null, reference: null }, { source_revision: null });
    assert.equal(result.decision, 'run-check');
    assert.equal(result.reusable, false);
  }
  for (const kind of ['source', 'synthetic']) {
    for (const [recordRevision, contextRevision] of [[null, null], [null, 'revision-1'], ['revision-1', null]]) {
      const result = decide({ kind, source_revision: recordRevision }, { source_revision: contextRevision });
      assert.equal(result.decision, 'review-evidence');
      assert.equal(result.reusable, false);
    }
  }
  assert.throws(() => decide({ reference: null }), /reference/);
  assert.throws(() => decide({ status: 'pending', source_revision: null, reference: null, recorded_at: null }), /recorded_at/);
  assert.equal(decide({ source_revision: null }, { source_revision: null, required_gate: true }).decision, 'run-required-gate');
  assert.equal(decide({ source_revision: null }, { source_revision: null, live_state: true }).decision, 'historical-observation');
  assert.equal(decide({ kind: 'ci', source_revision: null }, { source_revision: null }).decision, 'historical-observation');
});

test('live observations and non-passing outcomes never become reusable certificates', () => {
  for (const kind of ['ci', 'deployment', 'browser', 'wallet']) {
    const result = decide({ kind });
    assert.equal(result.decision, 'historical-observation');
    assert.equal(result.reusable, false);
  }
  assert.equal(decide({}, { live_state: true }).decision, 'historical-observation');
  for (const status of ['failed', 'pending', 'unknown']) assert.equal(decide({ status }).decision, 'run-check');
});

test('required gates cannot be waived by any previous result', () => {
  for (const kind of ['source', 'synthetic', 'ci', 'deployment', 'browser', 'wallet']) {
    for (const status of ['passed', 'failed', 'pending', 'unknown']) {
      const result = decide({ kind, status }, { required_gate: true });
      assert.equal(result.decision, 'run-required-gate');
      assert.equal(result.reusable, false);
    }
  }
});

test('malformed or ambiguous record/context data fails closed', () => {
  for (const change of [
    { input_digest: '' }, { environment_digest: 'short' }, { kind: 'anything' },
    { recorded_at: '2026-02-30T00:00:00Z' }, { recorded_at: 'yesterday' },
    { limitations: 'none' }, { supersedes: {} }, { command: {} }, { extra: true },
  ]) assert.throws(() => decide(change));
  for (const change of [{ required_gate: 'false' }, { live_state: null }, { input_digest: 'not-a-digest' }, { extra: true }]) {
    assert.throws(() => decide({}, change));
  }
  assert.throws(() => assessEvidence([record], context));
  assert.throws(() => assessEvidence({}, context));
  assert.equal(decide({ recorded_at: '2026-10-09T06:00:00.123Z' }).reusable, true);
});

test('unchanged failures stop; changed conditions need documented new evidence', () => {
  assert.equal(decideRepeatedAttempt(attempt, { ...attempt }).decision, 'stop');
  assert.equal(decideRepeatedAttempt(attempt, { ...attempt, hypothesis: 'a guess' }).decision, 'stop');
  const next = { ...attempt, input_digest: 'c'.repeat(64), evidence: 'The relevant input was corrected.' };
  assert.equal(decideRepeatedAttempt(attempt, next).decision, 'reconsider');
  assert.equal(decideRepeatedAttempt(next, { ...next }).decision, 'stop');
  assert.throws(() => decideRepeatedAttempt(attempt, { ...attempt, evidence: ' ' }));
});

test('permission and security denials persist until explicit new recovery or authorization', () => {
  for (const denial of ['permission', 'security']) {
    const previous = { ...attempt, denial };
    assert.equal(decideRepeatedAttempt(previous, { ...attempt, evidence: 'A different hypothesis.' }).decision, 'blocked');
    assert.equal(decideRepeatedAttempt(attempt, { ...previous, evidence: 'New evidence.' }).decision, 'blocked');
    for (const field of ['recovery', 'authorization']) {
      const next = { ...previous, [field]: 'Explicit relevant recovery or authorization for review.' };
      assert.equal(decideRepeatedAttempt(previous, next).decision, 'reconsider');
      assert.equal(decideRepeatedAttempt(next, { ...next }).decision, 'blocked');
    }
  }
});

test('CLI reads only two bounded local JSON files, rejects unsupported args, and never echoes input', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'xrbc-evidence-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const recordPath = path.join(root, 'record.json');
  const contextPath = path.join(root, 'context.json');
  fs.writeFileSync(recordPath, JSON.stringify(record));
  fs.writeFileSync(contextPath, JSON.stringify(context));
  const script = fileURLToPath(new URL('./check-evidence.mjs', import.meta.url));
  const run = args => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
  const args = ['--file', recordPath, '--context', contextPath];
  const normal = run(args);
  assert.equal(normal.status, 0);
  assert.equal(JSON.parse(normal.stdout).decision, 'reuse-evidence');
  assert.doesNotMatch(normal.stdout, /DO NOT EXECUTE|local-evidence-reference/);
  for (const invalid of [[], ['--file'], [...args, '--write'], [...args, '--file', recordPath]]) assert.equal(run(invalid).status, 1);
  for (const content of ['{"secret-example":', 'x'.repeat(32_769), JSON.stringify([record])]) {
    fs.writeFileSync(recordPath, content);
    const result = run(args);
    assert.equal(result.status, 1);
    assert.equal(result.stdout, '');
    assert.doesNotMatch(result.stderr, /secret-example|record\.json|DO NOT EXECUTE/);
  }
});
