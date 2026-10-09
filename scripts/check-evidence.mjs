import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_JSON_BYTES = 32_768;
const DIGEST = /^[a-f0-9]{64}$/i;
const RECORD_FIELDS = [
  'id', 'project', 'kind', 'status', 'source_revision', 'recorded_at',
  'scope', 'command', 'input_digest', 'environment_digest', 'reference',
  'limitations', 'supersedes',
];
const CONTEXT_FIELDS = [
  'project', 'source_revision', 'input_digest', 'environment_digest', 'required_gate', 'live_state',
];
const ATTEMPT_FIELDS = [
  'hypothesis', 'input_digest', 'failure', 'denial', 'evidence', 'recovery', 'authorization',
];
const requireValue = (condition, message) => {
  if (!condition) throw new Error(message);
};
const isText = (value, limit = 2_048) => typeof value === 'string' && value.trim().length > 0 && value.length <= limit;
const nullableText = value => value === null || isText(value);
const nullableDigest = value => value === null || (typeof value === 'string' && DIGEST.test(value));

function validateObject(value, fields, label, required = fields) {
  requireValue(value !== null && typeof value === 'object' && !Array.isArray(value), `Invalid ${label} object`);
  requireValue(Object.keys(value).every(key => fields.includes(key)), `Unknown ${label} field`);
  requireValue(required.every(key => Object.hasOwn(value, key)), `Missing ${label} field`);
}

function validateRecord(record) {
  validateObject(record, RECORD_FIELDS, 'record');
  for (const field of ['id', 'project', 'scope']) {
    requireValue(isText(record[field]), `Invalid record ${field}`);
  }
  requireValue(['source', 'synthetic', 'ci', 'deployment', 'browser', 'wallet'].includes(record.kind), 'Invalid record kind');
  requireValue(['passed', 'failed', 'pending', 'unknown'].includes(record.status), 'Invalid record status');
  requireValue(nullableText(record.source_revision), 'Invalid record source_revision');
  requireValue(['pending', 'unknown'].includes(record.status) ? nullableText(record.reference) : isText(record.reference), 'Invalid record reference');
  requireValue(typeof record.recorded_at === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(record.recorded_at) &&
    Number.isFinite(Date.parse(record.recorded_at)) &&
    new Date(record.recorded_at).toISOString() === record.recorded_at.replace(/(?<!\.\d{3})Z$/, '.000Z'),
  'Invalid record recorded_at');
  requireValue(nullableText(record.command), 'Invalid record command');
  for (const field of ['input_digest', 'environment_digest']) {
    requireValue(nullableDigest(record[field]), `Invalid record ${field}`);
  }
  for (const field of ['limitations', 'supersedes']) {
    requireValue(Array.isArray(record[field]) && record[field].length <= 64 && record[field].every(value => isText(value)), `Invalid record ${field}`);
  }
}

function validateContext(context) {
  validateObject(context, CONTEXT_FIELDS, 'context');
  requireValue(isText(context.project) && nullableText(context.source_revision), 'Invalid context identity');
  requireValue(nullableDigest(context.input_digest) && nullableDigest(context.environment_digest), 'Invalid context digest');
  requireValue(typeof context.required_gate === 'boolean' && typeof context.live_state === 'boolean', 'Invalid context flags');
}

const assessment = (decision, reason) => ({ decision, reusable: decision === 'reuse-evidence', reason });

/** Pure assessment of caller-supplied evidence; never executes command or resolves reference.
 * Digests must cover ALL relevant inputs and environment. This function cannot establish
 * their completeness, verify the record's truth, or authorize an action.
 */
export function assessEvidence(record, context) {
  validateRecord(record);
  validateContext(context);
  if (context.required_gate) return assessment('run-required-gate', 'A required gate must run; historical evidence does not waive it.');
  if (record.status !== 'passed') return assessment('run-check', 'Only passed evidence can qualify for reuse.');
  if (record.project !== context.project) return assessment('run-check', 'Evidence belongs to a different project.');
  if (context.live_state || !['source', 'synthetic'].includes(record.kind)) {
    return assessment('historical-observation', 'This record is historical evidence, not a certificate of current CI, deployment, browser, wallet, or other live state.');
  }
  if (record.source_revision === null || context.source_revision === null) {
    return assessment('review-evidence', 'A source revision is unknown. Inspect the documented scoped evidence before deciding what to check; matching fingerprints alone do not make this record machine-reusable.');
  }
  const fields = ['input_digest', 'environment_digest'];
  if (fields.some(field => record[field] !== null && context[field] !== null && record[field].toLowerCase() !== context[field].toLowerCase())) {
    return assessment('run-check', 'A relevant input or environment fingerprint changed.');
  }
  if (fields.every(field => record[field] !== null && context[field] !== null)) {
    return assessment('reuse-evidence', record.source_revision === context.source_revision
      ? 'Passed source or synthetic evidence has matching project, revision, and caller-supplied complete relevant input and environment fingerprints.'
      : 'The revision changed, but the project and caller-supplied complete relevant input and environment fingerprints match; revision alone does not invalidate this scoped evidence.');
  }
  if (record.source_revision === context.source_revision) {
    return assessment('review-evidence', 'The revision matches, but complete input and environment fingerprints are missing. Inspect the documented evidence; it is not machine-reusable.');
  }
  return assessment('run-check', 'The revision changed and complete matching input and environment fingerprints are unavailable.');
}

function validateAttempt(attempt) {
  validateObject(attempt, ATTEMPT_FIELDS, 'attempt', ['hypothesis', 'input_digest', 'failure']);
  requireValue(isText(attempt.hypothesis) && isText(attempt.failure) && nullableDigest(attempt.input_digest), 'Invalid attempt hypothesis, input, or failure');
  requireValue(attempt.denial === undefined || attempt.denial === null || ['permission', 'security'].includes(attempt.denial), 'Invalid attempt denial');
  for (const field of ['evidence', 'recovery', 'authorization']) {
    requireValue(attempt[field] === undefined || nullableText(attempt[field]), `Invalid attempt ${field}`);
  }
}

/** Pure retry guidance. Recovery/authorization must be explicit, relevant evidence supplied
 * by the caller; these strings are not verified permissions and do not execute a retry.
 */
export function decideRepeatedAttempt(previous, next) {
  validateAttempt(previous);
  validateAttempt(next);
  const newlySupplied = field => isText(next[field]) && next[field] !== previous[field];
  const hasRecovery = newlySupplied('recovery') || newlySupplied('authorization');
  if (previous.denial || next.denial) {
    if (!hasRecovery) return { decision: 'blocked', reason: 'A permission or security denial remains blocked until explicit relevant recovery or authorization is supplied.' };
    return { decision: 'reconsider', reason: 'Explicit recovery or authorization was supplied; verify that it resolves the denial before reconsidering the attempt.' };
  }
  if (newlySupplied('evidence') || hasRecovery) {
    return { decision: 'reconsider', reason: 'New evidence or an explicitly documented recovery permits reconsideration; it does not establish success.' };
  }
  const unchanged = previous.hypothesis === next.hypothesis && previous.input_digest === next.input_digest && previous.failure === next.failure;
  return { decision: 'stop', reason: unchanged
    ? 'The hypothesis, input, and failure are unchanged, with no new evidence. Stop the repeated attempt.'
    : 'The proposed conditions changed without supporting new evidence. Document the evidence before reconsidering.' };
}

function readJson(file) {
  requireValue(isText(file, 4_096) && !/^[a-z][a-z0-9+.-]*:/i.test(file), 'Expected a trusted local JSON file');
  const fd = fs.openSync(file, 'r');
  try {
    const stat = fs.fstatSync(fd);
    requireValue(stat.isFile() && stat.size <= MAX_JSON_BYTES, 'JSON input must be a bounded regular file');
    const buffer = Buffer.alloc(MAX_JSON_BYTES + 1);
    let length = 0;
    while (length < buffer.length) {
      const read = fs.readSync(fd, buffer, length, buffer.length - length, null);
      if (read === 0) break;
      length += read;
    }
    requireValue(length <= MAX_JSON_BYTES, 'JSON input exceeds byte budget');
    try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(buffer.subarray(0, length))); }
    catch { throw new Error('Invalid UTF-8 JSON input'); }
  } finally { fs.closeSync(fd); }
}

function main(args) {
  const values = Object.create(null);
  for (let index = 0; index < args.length; index += 2) {
    const flag = args[index];
    requireValue(['--file', '--context'].includes(flag) && !Object.hasOwn(values, flag) &&
      isText(args[index + 1], 4_096) && !args[index + 1].startsWith('--'), 'Expected --file <record.json> --context <context.json> exactly once');
    values[flag] = args[index + 1];
  }
  requireValue(Object.keys(values).length === 2, 'Expected --file <record.json> --context <context.json> exactly once');
  process.stdout.write(JSON.stringify(assessEvidence(readJson(values['--file']), readJson(values['--context'])), null, 2) + '\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); }
  catch {
    // Never echo input values, paths, commands, records, or parser excerpts.
    process.stderr.write('Cannot assess evidence: invalid arguments or local evidence/context input.\n');
    process.exitCode = 1;
  }
}
