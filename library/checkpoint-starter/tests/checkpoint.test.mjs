import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import { initialize, listTasks, taskContext, validateCheckpoint, main } from '../skills/checkpoint-resume/scripts/checkpoint.mjs';

const CLI = fileURLToPath(new URL('../skills/checkpoint-resume/scripts/checkpoint.mjs', import.meta.url));
const SCHEMA = 'checkpoint-starter/1';
function fixture(t) {
  const root = fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), 'checkpoint-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  initialize(root);
  return root;
}
function write(root, relative, content) { fs.writeFileSync(path.join(root, relative), content); }
function router(root, routes) { write(root, 'checkpoint/task-router.json', JSON.stringify({ schema_version: SCHEMA, routes })); }
function route(id = 'demo', extra = {}) {
  return { title: `Example ${id}`, read: [`checkpoint/tasks/${id}.md`],
    source: { repository: null, branch: null, revision: null }, evidence: null, ...extra };
}
function addTask(root, id = 'demo', extra = {}) {
  write(root, `checkpoint/tasks/${id}.md`, '# Synthetic task\nNext action: review the example.\n');
  router(root, { [id]: route(id, extra) });
}
function evidence(extra = {}) {
  return { id: 'example', kind: 'synthetic', status: 'pending', source_revision: null,
    recorded_at: '2026-01-01T00:00:00Z', scope: 'Example only', reference: null,
    limitations: 'No live checks performed', ...extra };
}

test('empty initialization validates and never overwrites existing contents', t => {
  const root = fixture(t);
  assert.deepEqual(listTasks(root), []);
  assert.deepEqual(validateCheckpoint(root), { valid: true, tasks: 0 });
  const before = fs.readFileSync(path.join(root, 'checkpoint/CONTINUITY.md'));
  assert.throws(() => initialize(root), { code: 'EEXIST' });
  assert.deepEqual(fs.readFileSync(path.join(root, 'checkpoint/CONTINUITY.md')), before);
  assert.deepEqual(fs.readdirSync(root), ['checkpoint']);
});

test('initialization preserves an existing empty directory, file, or symlink', t => {
  const root = fixture(t);
  const target = path.join(root, 'checkpoint');
  fs.rmSync(target, { recursive: true });
  fs.mkdirSync(target);
  assert.throws(() => initialize(root), { code: 'EEXIST' });
  assert.deepEqual(fs.readdirSync(target), []);
  fs.rmdirSync(target);
  write(root, 'checkpoint', 'preserve');
  assert.throws(() => initialize(root), { code: 'EEXIST' });
  assert.equal(fs.readFileSync(target, 'utf8'), 'preserve');
  fs.unlinkSync(target);
  fs.mkdirSync(path.join(root, 'outside'));
  fs.symlinkSync(path.join(root, 'outside'), target, 'dir');
  assert.throws(() => initialize(root), { code: 'EEXIST' });
  assert.ok(fs.lstatSync(target).isSymbolicLink());
});

test('concurrent initializers publish one complete checkpoint without overwriting', async t => {
  const root = fixture(t);
  fs.rmSync(path.join(root, 'checkpoint'), { recursive: true });
  const run = () => new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [CLI, '--root', root, '--init'], { stdio: 'ignore' });
    child.once('error', reject);
    child.once('exit', resolve);
  });
  assert.deepEqual((await Promise.all([run(), run()])).sort(), [0, 1]);
  assert.deepEqual(validateCheckpoint(root), { valid: true, tasks: 0 });
  assert.deepEqual(fs.readdirSync(root), ['checkpoint']);
});

test('failed publication removes staging but preserves unexpected destination files', t => {
  const root = fixture(t);
  fs.rmSync(path.join(root, 'checkpoint'), { recursive: true });
  const rename = t.mock.method(fs, 'renameSync', (_stage, target) => {
    fs.writeFileSync(path.join(target, 'keep.txt'), 'new user contents');
    throw Object.assign(new Error('Simulated rename failure'), { code: 'ENOTEMPTY' });
  });
  assert.throws(() => initialize(root), { code: 'ENOTEMPTY' });
  rename.mock.restore();
  assert.deepEqual(fs.readdirSync(root), ['checkpoint']);
  assert.deepEqual(fs.readdirSync(path.join(root, 'checkpoint')), ['keep.txt']);
  assert.equal(fs.readFileSync(path.join(root, 'checkpoint/keep.txt'), 'utf8'), 'new user contents');
});

test('selected retrieval excludes unrelated missing files and preserves unknown source', t => {
  const root = fixture(t);
  addTask(root);
  router(root, { demo: route(), unrelated: route('absent', { evidence: 'checkpoint/evidence/absent.json' }) });
  const context = taskContext(root, 'demo');
  assert.deepEqual(context.source, { repository: null, branch: null, revision: null });
  assert.deepEqual(context.files.map(file => file.path), ['checkpoint/CONTINUITY.md', 'checkpoint/tasks/demo.md']);
  assert.match(context.bundle_sha256, /^[a-f0-9]{64}$/);
  assert.equal(listTasks(root).length, 2);
  assert.throws(() => validateCheckpoint(root), { code: 'ENOENT' });
  router(root, { demo: route(), changed: route('still-absent') });
  assert.equal(taskContext(root, 'demo').bundle_sha256, context.bundle_sha256);
  write(root, 'checkpoint/tasks/demo.md', '# Changed example\n');
  assert.notEqual(taskContext(root, 'demo').bundle_sha256, context.bundle_sha256);
});

test('router schema rejects missing fields and unsafe or wrong file paths', t => {
  const root = fixture(t);
  for (const read of ['../outside.md', '/tmp/outside.md', 'checkpoint/tasks/../private.md',
    'checkpoint/tasks/a\\b.md', 'checkpoint/tasks/demo.json', 'checkpoint/tasks/deep/demo.md',
    'checkpoint/tasks/demo.md\n']) {
    router(root, { demo: route('demo', { read: [read] }) });
    assert.throws(() => taskContext(root, 'demo'), /brief/);
  }
  const missing = route(); delete missing.source.revision;
  router(root, { demo: missing });
  assert.throws(() => listTasks(root), /source fields/);
  router(root, { demo: { ...route(), automatic_command: 'never execute' } });
  assert.throws(() => listTasks(root), /route fields/);
  router(root, { demo: route('demo', { evidence: 'checkpoint/tasks/demo.md' }) });
  assert.throws(() => listTasks(root), /Evidence/);
});

test('file and intermediate-directory symlinks, directories, and symlink roots are rejected', t => {
  const root = fixture(t);
  addTask(root);
  const brief = path.join(root, 'checkpoint/tasks/demo.md');
  fs.unlinkSync(brief);
  write(root, 'outside.md', '# Must not be read');
  fs.symlinkSync(path.join(root, 'outside.md'), brief);
  assert.throws(() => taskContext(root, 'demo'), /without symlinks/);
  fs.unlinkSync(brief);
  fs.mkdirSync(brief);
  assert.throws(() => taskContext(root, 'demo'), /regular files/);
  fs.rmSync(path.join(root, 'checkpoint/tasks'), { recursive: true });
  fs.mkdirSync(path.join(root, 'external-tasks'));
  write(root, 'external-tasks/demo.md', '# Must not be read');
  fs.symlinkSync(path.join(root, 'external-tasks'), path.join(root, 'checkpoint/tasks'), 'dir');
  assert.throws(() => taskContext(root, 'demo'), /without symlinks/);
  fs.symlinkSync(root, path.join(root, 'root-link'), 'dir');
  assert.throws(() => listTasks(path.join(root, 'root-link')), /without symlinks/);
});

test('limits bound individual files, serialized bundles, router bytes, and task count', t => {
  const root = fixture(t);
  addTask(root);
  write(root, 'checkpoint/tasks/demo.md', 'x'.repeat(16385));
  assert.throws(() => taskContext(root, 'demo'), /size limit/);
  write(root, 'checkpoint/tasks/demo.md', 'x'.repeat(16384));
  write(root, 'checkpoint/CONTINUITY.md', 'x'.repeat(16384));
  assert.throws(() => taskContext(root, 'demo'), /bundle limit/);
  write(root, 'checkpoint/task-router.json', ' '.repeat(65537));
  assert.throws(() => listTasks(root), /size limit/);
  router(root, Object.fromEntries(Array.from({ length: 101 }, (_, i) => [`task${i}`, route()])));
  assert.throws(() => listTasks(root), /task limit/);
});

test('strict UTF-8 and JSON errors do not return malformed content', t => {
  const root = fixture(t);
  addTask(root);
  write(root, 'checkpoint/tasks/demo.md', Buffer.from([0xff]));
  assert.throws(() => taskContext(root, 'demo'), /UTF-8/);
  write(root, 'checkpoint/task-router.json', '{"secret":');
  assert.throws(() => listTasks(root), /Invalid JSON/);
});

test('optional evidence supports empty arrays and validates referenced records', t => {
  const root = fixture(t);
  addTask(root, 'demo', { evidence: 'checkpoint/evidence/demo.json' });
  assert.throws(() => taskContext(root, 'demo'), { code: 'ENOENT' });
  write(root, 'checkpoint/evidence/demo.json', '[]');
  assert.equal(taskContext(root, 'demo').files.length, 3);
  write(root, 'checkpoint/evidence/demo.json', JSON.stringify([evidence()]));
  assert.deepEqual(validateCheckpoint(root), { valid: true, tasks: 1 });
  write(root, 'checkpoint/evidence/demo.json', JSON.stringify([evidence({ limitations: '' })]));
  assert.deepEqual(validateCheckpoint(root), { valid: true, tasks: 1 });
  for (const records of [null, {}, [evidence({ kind: 'wallet' })], [evidence({ status: 'complete' })],
    [evidence({ recorded_at: null })], [evidence({ recorded_at: '2026-02-30T00:00:00Z' })],
    [evidence({ recorded_at: '2026-01-01T00:00:00+00:00' })], [evidence(), evidence()]]) {
    write(root, 'checkpoint/evidence/demo.json', JSON.stringify(records));
    assert.throws(() => taskContext(root, 'demo'));
  }
  const missing = evidence(); delete missing.limitations;
  write(root, 'checkpoint/evidence/demo.json', JSON.stringify([missing]));
  assert.throws(() => taskContext(root, 'demo'), /evidence fields/);
  write(root, 'checkpoint/evidence/demo.json', '{invalid');
  assert.throws(() => taskContext(root, 'demo'), /Invalid JSON/);
});

test('CLI requires explicit root and a single mode, and reports failures without payloads', t => {
  const root = fixture(t);
  for (const args of [[], ['--list'], ['--root', root], ['--root'], ['--root', '--list'],
    ['--root', root, '--list', '--validate'], ['--root', root, '--task'],
    ['--root', root, '--root', root, '--list'], ['--root', root, '--task', 'demo', '--task', 'demo'],
    ['--root', root, '--unknown']]) assert.throws(() => main(args));
  assert.throws(() => main(['--root', root, '--task', 'unknown']), /Unknown task/);
  assert.match(main(['--help']), /No task is selected automatically/);
  assert.deepEqual(JSON.parse(main(['--list', '--root', root])), []);
  const result = spawnSync(process.execPath, [CLI, '--root', root, '--validate'], { encoding: 'utf8' });
  assert.equal(result.status, 0);
  assert.deepEqual(JSON.parse(result.stdout), { valid: true, tasks: 0 });
  write(root, 'checkpoint/task-router.json', '{"private-value": invalid}');
  const failed = spawnSync(process.execPath, [CLI, '--root', root, '--list'], { encoding: 'utf8' });
  assert.equal(failed.status, 1);
  assert.equal(failed.stdout, '');
  assert.match(failed.stderr, /Invalid JSON/);
  assert.doesNotMatch(failed.stderr, /private-value/);
});
