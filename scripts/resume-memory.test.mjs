import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildResumeContext, buildTaskContext, listTasks, queryTasks, validateRouter } from './resume-memory.mjs';

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

function routedFixture(t) {
  const root = fixture(t);
  fs.writeFileSync(path.join(root, 'memory/active/JCS.md'), 'JCS topic only. Historical synthetic evidence.');
  const router = {
    schema_version: '2.0.0', updated: '2026-10-09', default_task: 'xrbc_swap',
    routes: {
      xrbc_swap: {
        title: 'XRBC swap and Market Nexus', match: ['XRBC swap', 'Nexus'], read: [pointer],
        source: { repository: 'xrbitcoincash-group/xrbitcoincash-project', branch: 'master', head,
          pipeline: /^source_pipeline=(.+)$/m.exec(current)[1] },
        status: 'recorded', next_action: 'Read the current user request.',
      },
      jcs_map: {
        title: 'JCS Prayer Map Nexus', match: ['Prayer Map', 'Nexus'], read: ['memory/active/JCS.md'],
        source: { repository: 'XRBitcoinCash/JCS-token-on-the-XRPL', branch: 'main', head: null, pipeline: null },
        status: 'historical', next_action: 'Read only the relevant source when needed.',
      },
    },
  };
  const save = () => fs.writeFileSync(path.join(root, 'memory/task-router.json'), JSON.stringify(router));
  save();
  return { root, router, save };
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

test('explicit topic bundles isolate projects and preserve unknown source evidence', t => {
  const { root } = routedFixture(t);
  const bundle = buildTaskContext({ root, task: 'jcs_map', sourceHead: head });
  assert.equal(bundle.version, 2);
  assert.equal(bundle.source.repository, 'XRBitcoinCash/JCS-token-on-the-XRPL');
  assert.equal(bundle.source.savedHead, null);
  assert.equal(bundle.source.savedPipelineId, null);
  assert.equal(bundle.sourceCheck, 'unknown-saved-head');
  assert.deepEqual(bundle.documents.map(document => document.path), ['AGENTS.md', 'memory/CONTINUITY.md', 'memory/active/JCS.md']);
  assert.ok(!bundle.documents.some(document => document.path === pointer));
  const xrbc = buildTaskContext({ root, task: 'xrbc_swap', sourceHead: head });
  assert.equal(xrbc.sourceCheck, 'matches-supplied-head');
  assert.equal(buildTaskContext({ root, task: 'xrbc_swap', sourceHead: '0'.repeat(40) }).sourceCheck, 'differs-from-supplied-head');
  assert.throws(() => buildTaskContext({ root, task: 'missing' }), /Unknown task/);
  assert.throws(() => buildTaskContext({ root, task: 'jcs_map', sourceHead: 'unknown' }), /Invalid supplied/);
});

test('index and ambiguous query return candidates without loading or choosing a topic', t => {
  const { root } = routedFixture(t);
  fs.unlinkSync(path.join(root, pointer));
  fs.unlinkSync(path.join(root, 'memory/active/JCS.md'));
  assert.equal(listTasks({ root }).tasks.length, 2);
  const ambiguous = queryTasks({ root, query: 'Nexus' });
  assert.equal(ambiguous.selectedTask, null);
  assert.deepEqual(ambiguous.candidates.map(candidate => candidate.id).sort(), ['jcs_map', 'xrbc_swap']);
  assert.equal(queryTasks({ root, query: 'Prayer Map' }).candidates[0].id, 'jcs_map');
  assert.equal(queryTasks({ root, query: 'xrbc_swap' }).candidates[0].match, 'exact');
  assert.deepEqual(queryTasks({ root, query: 'unrelated' }).candidates, []);
  assert.throws(() => queryTasks({ root, query: '' }), /Invalid task query/);
});

test('CURRENT must agree with a v2 canonical default route', t => {
  const { root, router, save } = routedFixture(t);
  assert.equal(buildResumeContext({ root }).version, 1);
  const route = router.routes.xrbc_swap;
  for (const field of ['repository', 'branch', 'head', 'pipeline']) {
    const original = route.source[field];
    route.source[field] = field === 'head' ? '0'.repeat(40) : field === 'pipeline' ? '1' : `${original}x`;
    save();
    assert.throws(() => buildResumeContext({ root }), /CURRENT differs/);
    route.source[field] = original;
  }
  route.read = ['memory/active/JCS.md'];
  save();
  assert.throws(() => buildResumeContext({ root }), /CURRENT differs/);
});

test('corrupt routing and invented source placeholders are rejected', t => {
  const { root, router, save } = routedFixture(t);
  for (const field of ['head', 'pipeline']) {
    router.routes.jcs_map.source[field] = 'unknown';
    save();
    assert.throws(() => validateRouter({ root }), /Invalid source/);
    router.routes.jcs_map.source[field] = null;
  }
  router.updated = '2026-02-30';
  save();
  assert.throws(() => validateRouter({ root }), /Invalid router review date/);
  fs.writeFileSync(path.join(root, 'memory/task-router.json'), '{broken');
  assert.throws(() => listTasks({ root }), /Invalid router JSON/);
});

test('routed paths cannot escape the checkout and document budgets remain bounded', t => {
  const { root, router, save } = routedFixture(t);
  const route = router.routes.jcs_map;
  for (const target of ['../outside.md', '/outside.md', 'memory/active/../../outside.md', 'https://example.com/context.md']) {
    route.read = [target];
    save();
    assert.throws(() => buildTaskContext({ root, task: 'jcs_map' }), /path/i);
  }
  route.read = ['memory/active/JCS.md'];
  save();
  fs.unlinkSync(path.join(root, route.read[0]));
  fs.symlinkSync(path.join(repo, 'AGENTS.md'), path.join(root, route.read[0]));
  assert.throws(() => buildTaskContext({ root, task: 'jcs_map' }), /escapes root/);
  fs.unlinkSync(path.join(root, route.read[0]));
  fs.writeFileSync(path.join(root, route.read[0]), 'x'.repeat(16_385));
  assert.throws(() => buildTaskContext({ root, task: 'jcs_map' }), /oversized/i);
  for (const relative of ['AGENTS.md', 'memory/CONTINUITY.md', route.read[0]]) fs.writeFileSync(path.join(root, relative), 'x'.repeat(11_000));
  assert.throws(() => buildTaskContext({ root, task: 'jcs_map' }), /byte budget/);
});

test('CLI supports explicit topic/index/query modes and rejects conflicting arguments', t => {
  const { root } = routedFixture(t);
  fs.mkdirSync(path.join(root, 'scripts'));
  const localScript = path.join(root, 'scripts/resume-memory.mjs');
  fs.copyFileSync(script, localScript);
  const run = args => spawnSync(process.execPath, [localScript, ...args], { encoding: 'utf8' });
  const task = run(['--task', 'jcs_map', '--json']);
  assert.equal(task.status, 0);
  assert.equal(JSON.parse(task.stdout).sourceCheck, 'unknown-saved-head');
  assert.equal(JSON.parse(run(['--list', '--json']).stdout).tasks.length, 2);
  assert.equal(JSON.parse(run(['--query', 'Nexus', '--json']).stdout).candidates.length, 2);
  assert.equal(run(['--task', 'xrbc_swap', '--source-head', '0'.repeat(40)]).status, 2);
  for (const args of [
    ['--task'], ['--query'], ['--task', 'missing'], ['--list', '--list'], ['--list', '--task', 'xrbc_swap'],
    ['--query', 'Nexus', '--source-head', head], ['--task', 'jcs_map', '--query', 'Nexus'],
    ['--task', 'jcs_map', '--source-head', head, '--source-head', head],
  ]) assert.equal(run(args).status, 1, args.join(' '));
});
