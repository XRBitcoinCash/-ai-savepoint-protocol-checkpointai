import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const DEFAULT_ROOT = fileURLToPath(new URL('..', import.meta.url));
const MAX_FILE_BYTES = 16_384;
const MAX_BUNDLE_BYTES = 32_768;
const MAX_ROUTER_BYTES = 65_536;
const SHA = /^[a-f0-9]{40}$/;
const TASK_ID = /^[a-z][a-z0-9_]{0,63}$/;
const FIELDS = [
  'version', 'id', 'updated', 'source_repository', 'source_project',
  'source_branch', 'source_head', 'source_pipeline', 'handoff', 'protocol',
];
const sha256 = value => createHash('sha256').update(value).digest('hex');
const requireValue = (condition, message) => {
  if (!condition) throw new Error(message);
};

function validatePath(relative, extension = 'md') {
  requireValue(typeof relative === 'string' && new RegExp('^[A-Za-z0-9_./-]+\\.' + extension + '$').test(relative), `Invalid ${extension === 'md' ? 'Markdown' : 'memory'} path`);
  requireValue(!path.isAbsolute(relative) && !relative.split('/').some(p => p === '..' || p === '.' || p === ''), 'Unsafe memory path');
}

function readFile(root, relative, maxBytes, extension) {
  validatePath(relative, extension);
  const resolved = fs.realpathSync(path.join(root, relative));
  const within = path.relative(root, resolved);
  requireValue(within !== '' && !path.isAbsolute(within) && !within.split(path.sep).includes('..'), 'Memory path escapes root');
  const stat = fs.statSync(resolved);
  requireValue(stat.isFile() && stat.size <= maxBytes, `Invalid or oversized document: ${relative}`);
  const buffer = fs.readFileSync(resolved);
  requireValue(buffer.length <= maxBytes, `Oversized document: ${relative}`);
  const content = new TextDecoder('utf-8', { fatal: true }).decode(buffer);
  return { path: relative, bytes: buffer.length, sha256: sha256(buffer), content };
}

function readDocument(root, relative) {
  return readFile(root, relative, MAX_FILE_BYTES, 'md');
}

function parseRecord(content) {
  const blocks = [...content.matchAll(/^<!-- resume-record\r?\n([\s\S]*?)\r?\n-->$/gm)];
  requireValue(blocks.length === 1, 'Expected one resume-record block');
  const record = Object.create(null);
  for (const line of blocks[0][1].split(/\r?\n/)) {
    const match = /^([a-z_]+)=(\S+)$/.exec(line);
    requireValue(match && FIELDS.includes(match[1]), 'Unknown or malformed resume field');
    requireValue(!Object.hasOwn(record, match[1]), `Duplicate field: ${match[1]}`);
    record[match[1]] = match[2];
  }
  requireValue(FIELDS.every(key => Object.hasOwn(record, key)), 'Missing resume field');
  requireValue(record.version === '1', 'Unsupported resume version');
  requireValue(/^RESUME-\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(record.id), 'Invalid resume ID');
  requireValue(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(record.updated) &&
    Number.isFinite(Date.parse(record.updated)) &&
    new Date(record.updated).toISOString().replace('.000Z', 'Z') === record.updated, 'Invalid saved timestamp');
  requireValue(record.source_repository === 'xrbitcoincash-group/xrbitcoincash-project' &&
    record.source_project === '75781181' && record.source_branch === 'master', 'Unexpected source identity');
  requireValue(/^[a-f0-9]{40}$/.test(record.source_head), 'Invalid saved source head');
  requireValue(/^[1-9][0-9]*$/.test(record.source_pipeline), 'Invalid pipeline ID');
  requireValue(/^memory\/active\/[A-Z0-9-]+\.md$/.test(record.handoff), 'Invalid handoff pointer');
  requireValue(record.protocol === 'memory/CONTINUITY.md', 'Invalid protocol pointer');
  return record;
}

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const boundedText = (value, limit) => typeof value === 'string' && value.trim().length > 0 && value.length <= limit;

function readRouter(root) {
  const document = readFile(root, 'memory/task-router.json', MAX_ROUTER_BYTES, 'json');
  try { return JSON.parse(document.content); }
  catch { throw new Error('Invalid router JSON'); }
}

function validateRouterData(router) {
  requireValue(isObject(router) && router.schema_version === '2.0.0', 'Unsupported router schema');
  requireValue(typeof router.updated === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(router.updated) &&
    Number.isFinite(Date.parse(router.updated)) && new Date(router.updated).toISOString().slice(0, 10) === router.updated, 'Invalid router review date');
  requireValue(isObject(router.routes) && Object.keys(router.routes).length > 0 && Object.keys(router.routes).length <= 100, 'Invalid router routes');
  requireValue(typeof router.default_task === 'string' && TASK_ID.test(router.default_task) && Object.hasOwn(router.routes, router.default_task), 'Invalid default task');
  for (const [id, route] of Object.entries(router.routes)) {
    requireValue(TASK_ID.test(id) && isObject(route), 'Invalid task route');
    requireValue(boundedText(route.title, 160) && boundedText(route.status, 200) && boundedText(route.next_action, 2_000), `Invalid route summary: ${id}`);
    requireValue(Array.isArray(route.match) && route.match.length <= 32 && route.match.every(value => boundedText(value, 200)), `Invalid route matches: ${id}`);
    requireValue(Array.isArray(route.read) && route.read.length > 0 && route.read.length <= 4 && new Set(route.read).size === route.read.length, `Invalid route documents: ${id}`);
    for (const relative of route.read) {
      validatePath(relative);
      requireValue(!['AGENTS.md', 'memory/CONTINUITY.md', 'memory/CURRENT.md'].includes(relative), `Duplicate or incompatible route entrypoint: ${id}`);
    }
    const source = route.source;
    requireValue(isObject(source) && ['repository', 'branch', 'head', 'pipeline'].every(key => Object.hasOwn(source, key)), `Missing route source: ${id}`);
    requireValue(source.repository === null || (boundedText(source.repository, 200) && /^[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)+$/.test(source.repository)), `Invalid source repository: ${id}`);
    requireValue(source.branch === null || (boundedText(source.branch, 160) && /^[A-Za-z0-9][A-Za-z0-9_./-]*$/.test(source.branch) && !source.branch.includes('..')), `Invalid source branch: ${id}`);
    requireValue(source.head === null || (typeof source.head === 'string' && SHA.test(source.head)), `Invalid source head: ${id}`);
    requireValue(source.pipeline === null || (typeof source.pipeline === 'string' && /^[1-9][0-9]*$/.test(source.pipeline)), `Invalid source pipeline: ${id}`);
    requireValue(source.head === null || (source.repository !== null && source.branch !== null), `Source head lacks identity: ${id}`);
  }
  return router;
}

/** Validate the canonical router without loading any topic's documents. */
export function validateRouter({ root = DEFAULT_ROOT } = {}) {
  return validateRouterData(readRouter(fs.realpathSync(root)));
}

function checkHead(savedHead, sourceHead) {
  if (sourceHead !== undefined) requireValue(typeof sourceHead === 'string' && SHA.test(sourceHead), 'Invalid supplied source head');
  if (savedHead === null) return 'unknown-saved-head';
  return sourceHead === undefined ? 'not-checked' : sourceHead === savedHead ? 'matches-supplied-head' : 'differs-from-supplied-head';
}

function finishBundle(documents) {
  const totalBytes = documents.reduce((sum, document) => sum + document.bytes, 0);
  requireValue(totalBytes <= MAX_BUNDLE_BYTES, 'Resume bundle exceeds byte budget');
  return {
    bundleSha256: sha256(JSON.stringify(documents.map(({ path: file, sha256: digest }) => [file, digest]))),
    totalBytes,
    documents,
  };
}

/** Explicit selection only: this function never infers a task from a query. */
export function buildTaskContext({ root = DEFAULT_ROOT, task, sourceHead } = {}) {
  const resolvedRoot = fs.realpathSync(root);
  const router = validateRouter({ root: resolvedRoot });
  requireValue(typeof task === 'string' && TASK_ID.test(task) && Object.hasOwn(router.routes, task), 'Unknown task');
  const route = router.routes[task];
  const sourceCheck = checkHead(route.source.head, sourceHead);
  const documents = ['AGENTS.md', 'memory/CONTINUITY.md', ...route.read].map(relative => readDocument(resolvedRoot, relative));
  const bundle = finishBundle(documents);
  // Include selected routing evidence so metadata-only changes invalidate reuse.
  // Unrelated task edits need not change this task's content fingerprint.
  bundle.bundleSha256 = sha256(JSON.stringify({ task, route, documents: documents.map(({ path: file, sha256: digest }) => [file, digest]) }));
  return {
    version: 2,
    task,
    title: route.title,
    routerReviewedAt: router.updated,
    status: route.status,
    nextAction: route.next_action,
    source: {
      repository: route.source.repository,
      branch: route.source.branch,
      savedHead: route.source.head,
      savedPipelineId: route.source.pipeline,
      suppliedHead: sourceHead ?? null,
    },
    sourceCheck,
    authority: 'External context only; no live verification or action authorization. Router review date is not an observation date.',
    ...bundle,
  };
}

export function listTasks({ root = DEFAULT_ROOT } = {}) {
  const router = validateRouter({ root });
  return {
    version: 2,
    defaultTask: router.default_task,
    tasks: Object.entries(router.routes).map(([id, route]) => ({ id, title: route.title, status: route.status })),
  };
}

const normalizeQuery = value => value.normalize('NFKC').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** Return candidates only, preserving ambiguity and never reading a topic brief. */
export function queryTasks({ root = DEFAULT_ROOT, query } = {}) {
  requireValue(boundedText(query, 500), 'Invalid task query');
  const normalized = normalizeQuery(query);
  requireValue(normalized.length > 0, 'Invalid task query');
  const terms = new Set(normalized.split(' '));
  const router = validateRouter({ root });
  const candidates = [];
  for (const [id, route] of Object.entries(router.routes)) {
    const phrases = [id, route.title, ...route.match].map(normalizeQuery);
    const exact = phrases.includes(normalized);
    const routeTerms = new Set(phrases.flatMap(phrase => phrase.split(' ')));
    const matchedTerms = [...terms].filter(term => routeTerms.has(term));
    if (exact || matchedTerms.length > 0) candidates.push({
      id, title: route.title, match: exact ? 'exact' : 'token-overlap',
      score: exact ? 1 : matchedTerms.length / terms.size,
      matchedTerms,
    });
  }
  candidates.sort((a, b) => Number(b.match === 'exact') - Number(a.match === 'exact') || b.score - a.score || a.id.localeCompare(b.id));
  return { version: 2, query, selectedTask: null, candidates };
}

/** Read-only context assembly. sourceHead is caller-supplied, never fetched or trusted as live by this module. */
export function buildResumeContext({ root = DEFAULT_ROOT, sourceHead } = {}) {
  if (sourceHead !== undefined) requireValue(typeof sourceHead === 'string' && /^[a-f0-9]{40}$/.test(sourceHead), 'Invalid supplied source head');
  const resolvedRoot = fs.realpathSync(root);
  const current = readDocument(resolvedRoot, 'memory/CURRENT.md');
  const record = parseRecord(current.content);
  if (fs.existsSync(path.join(resolvedRoot, 'memory/task-router.json'))) {
    const router = readRouter(resolvedRoot);
    const schema = router?.schema_version;
    requireValue(['1.0.0', '2.0.0'].includes(schema), 'Unsupported router schema');
    if (schema === '2.0.0') {
      validateRouterData(router);
      const route = router.routes[router.default_task];
      requireValue(route.source.repository === record.source_repository && route.source.branch === record.source_branch &&
        route.source.head === record.source_head && route.source.pipeline === record.source_pipeline &&
        route.read.includes(record.handoff), 'CURRENT differs from canonical default route');
    }
  }
  const agents = readDocument(resolvedRoot, 'AGENTS.md');
  const handoff = readDocument(resolvedRoot, record.handoff);
  const protocol = readDocument(resolvedRoot, record.protocol);
  requireValue(agents.content.includes(record.id) && handoff.content.includes(record.id), 'Resume ID missing from entrypoint or handoff');
  const documents = [agents, current, handoff, protocol];
  const totalBytes = documents.reduce((sum, document) => sum + document.bytes, 0);
  requireValue(totalBytes <= MAX_BUNDLE_BYTES, 'Resume bundle exceeds byte budget');
  const sourceCheck = sourceHead === undefined ? 'not-checked' :
    sourceHead === record.source_head ? 'matches-supplied-head' : 'differs-from-supplied-head';
  return {
    version: 1,
    id: record.id,
    savedAt: record.updated,
    source: {
      repository: record.source_repository, projectId: record.source_project,
      branch: record.source_branch, savedHead: record.source_head,
      savedPipelineId: record.source_pipeline, suppliedHead: sourceHead ?? null,
    },
    sourceCheck,
    authority: 'External context only; no live verification or action authorization.',
    bundleSha256: sha256(JSON.stringify(documents.map(({ path: file, sha256: digest }) => [file, digest]))),
    totalBytes,
    documents,
  };
}

function main(args) {
  let json = false;
  let sourceHead;
  let mode;
  let value;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === '--json' && !json) json = true;
    else if (arg === '--source-head' && sourceHead === undefined && args[index + 1] && !args[index + 1].startsWith('--')) sourceHead = args[++index];
    else if (arg === '--list' && mode === undefined) mode = 'list';
    else if (['--task', '--query'].includes(arg) && mode === undefined && args[index + 1] && !args[index + 1].startsWith('--')) {
      mode = arg.slice(2);
      value = args[++index];
    }
    else throw new Error(`Unknown, duplicate, or incomplete argument: ${arg}`);
  }
  requireValue(!['list', 'query'].includes(mode) || sourceHead === undefined, '--source-head requires a context bundle');
  if (mode === 'list' || mode === 'query') {
    const result = mode === 'list' ? listTasks() : queryTasks({ query: value });
    if (json) process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    else if (mode === 'list') {
      process.stdout.write(`Default task: ${result.defaultTask}\n`);
      for (const task of result.tasks) process.stdout.write(`${task.id}: ${task.title} [${task.status}]\n`);
    } else {
      process.stdout.write('Candidates only; no task selected or topic documents loaded.\n');
      for (const candidate of result.candidates) process.stdout.write(`${candidate.id}: ${candidate.title} [${candidate.match}]\n`);
      if (result.candidates.length === 0) process.stdout.write('No matching task.\n');
    }
    return;
  }
  const bundle = mode === 'task' ? buildTaskContext({ task: value, sourceHead }) : buildResumeContext({ sourceHead });
  if (json) process.stdout.write(JSON.stringify(bundle, null, 2) + '\n');
  else {
    const label = bundle.version === 1 ? `# ${bundle.id}\nSaved: ${bundle.savedAt}` : `# ${bundle.task} — ${bundle.title}\nRouter reviewed: ${bundle.routerReviewedAt}\nRecorded status: ${bundle.status}\nNext action: ${bundle.nextAction}`;
    process.stdout.write(`${label}\nSource check: ${bundle.sourceCheck}\n${bundle.authority}\nBundle SHA-256: ${bundle.bundleSha256}\n\n`);
    for (const document of bundle.documents) process.stdout.write(`## ${document.path}\n\n${document.content}\n`);
  }
  if (bundle.sourceCheck === 'differs-from-supplied-head') process.exitCode = 2;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); }
  catch (error) {
    process.stderr.write(`Cannot load continuity: ${error.message}\n`);
    process.exitCode = 1;
  }
}
