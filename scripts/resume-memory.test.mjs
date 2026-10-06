import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildResumeContext } from './resume-memory.mjs';

const repo = fileURLToPath(new URL('..', import.meta.url));
const script = fileURLToPath(new URL('./resume-memory.mjs', import.meta.url));
const current = fs.readFileSync(path.join(repo, 'memory/CURRENT.md'), 'utf8');
const head = /^source_head=(.+)$/m.exec(current)[1];
const id = /^id=(.+)$/m.exec(current)[1];
const pointer = /^handoff=(.+)$/m.exec(current)[1];

function fixture(t, transform = value => value) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'xrbc-resume-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'memory/active'), { recursive: true });
  fs.writeFileSync(path.join(root, 'memory/CURRENT.md'), transform(current));
  fs.writeFileSync(path.join(root, 'AGENTS.md'), id);
  fs.writeFileSync(path.join(root, pointer), id);
  fs.writeFileSync(path.join(root, 'memory/CONTINUITY.md'), 'Synthetic protocol. No network or financial operations.');
  return root;
}

test('actual compact bundle loads, stays bounded, and does not claim fresh verification', () => {
  const bundle = buildResumeContext();
  assert.equal(bundle.sourceCheck, 'not-checked');
  assert.equal(bundle.id, id);
  assert.equal(bundle.documents.length, 4);
  assert.ok(bundle.totalBytes <= 32_768);
  assert.match(bundle.bundleSha256, /^[a-f0-9]{64}$/);
  assert.ok(bundle.documents.every(document => document.path.endsWith('.md')));
  assert.equal(buildResumeContext().bundleSha256, bundle.bundleSha256);
});

test('head checks distinguish supplied match, mismatch, and invalid input', () => {
  assert.equal(buildResumeContext({ sourceHead: head }).sourceCheck, 'matches-supplied-head');
  assert.equal(buildResumeContext({ sourceHead: '0'.repeat(40) }).sourceCheck, 'differs-from-supplied-head');
  assert.throws(() => buildResumeContext({ sourceHead: 'master' }), /Invalid supplied/);
});

test('missing, duplicate, unknown, ambiguous, and invalid metadata fail closed', t => {
  const changes = [
    text => text.replace('version=1\n', ''),
    text => text.replace('version=1', 'version=1\nversion=1'),
    text => text.replace('version=1', 'version=1\nexecute=anything'),
    text => text + '\n<!-- resume-record\nversion=1\n-->\n',
    text => text.replace('source_branch=master', 'source_branch=other'),
    text => text.replace(/^updated=.+$/m, 'updated=2026-02-30T20:27:03Z'),
    text => text.replace(`source_head=${head}`, 'source_head=unknown'),
  ];
  for (const change of changes) assert.throws(() => buildResumeContext({ root: fixture(t, change) }));
});

test('arbitrary, missing, traversal and symlink-escape pointers are rejected', t => {
  for (const target of ['../outside.md', '/outside.md', 'memory/active/../../outside.md', 'https://example.com/context.md']) {
    const root = fixture(t, text => text.replace(`handoff=${pointer}`, `handoff=${target}`));
    assert.throws(() => buildResumeContext({ root }), /Invalid handoff pointer/);
  }
  const root = fixture(t);
  fs.unlinkSync(path.join(root, pointer));
  assert.throws(() => buildResumeContext({ root }));
  fs.symlinkSync(path.join(repo, 'AGENTS.md'), path.join(root, pointer));
  assert.throws(() => buildResumeContext({ root }), /escapes root/);
});

test('oversized documents, oversized bundles and mismatched IDs fail', t => {
  const root = fixture(t);
  fs.writeFileSync(path.join(root, pointer), 'x'.repeat(16_385));
  assert.throws(() => buildResumeContext({ root }), /oversized/i);
  fs.writeFileSync(path.join(root, pointer), 'wrong resume ID');
  assert.throws(() => buildResumeContext({ root }), /Resume ID/);
  for (const file of ['AGENTS.md', pointer, 'memory/CONTINUITY.md']) fs.writeFileSync(path.join(root, file), id + '\n' + 'x'.repeat(11_000));
  assert.throws(() => buildResumeContext({ root }), /byte budget/);
});

test('bundle fingerprints change with contents without modifying input files', t => {
  const root = fixture(t);
  const before = buildResumeContext({ root });
  const baseline = before.documents.map(document => fs.readFileSync(path.join(root, document.path), 'utf8'));
  buildResumeContext({ root });
  assert.deepEqual(before.documents.map(document => fs.readFileSync(path.join(root, document.path), 'utf8')), baseline);
  fs.appendFileSync(path.join(root, 'memory/CONTINUITY.md'), '\nNew evidence.');
  assert.notEqual(buildResumeContext({ root }).bundleSha256, before.bundleSha256);
});

test('CLI exports JSON, reports stale heads and rejects unsupported arguments', () => {
  const run = args => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
  const normal = run(['--json']);
  assert.equal(normal.status, 0);
  assert.equal(JSON.parse(normal.stdout).sourceCheck, 'not-checked');
  const stale = run(['--json', '--source-head', '0'.repeat(40)]);
  assert.equal(stale.status, 2);
  assert.equal(JSON.parse(stale.stdout).sourceCheck, 'differs-from-supplied-head');
  for (const args of [['--source-head'], ['--write'], ['--json', '--json']]) assert.equal(run(args).status, 1);
});
