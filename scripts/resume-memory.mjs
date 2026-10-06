import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const DEFAULT_ROOT = fileURLToPath(new URL('..', import.meta.url));
const MAX_FILE_BYTES = 16_384;
const MAX_BUNDLE_BYTES = 32_768;
const FIELDS = [
  'version', 'id', 'updated', 'source_repository', 'source_project',
  'source_branch', 'source_head', 'source_pipeline', 'handoff', 'protocol',
];
const sha256 = value => createHash('sha256').update(value).digest('hex');
const requireValue = (condition, message) => {
  if (!condition) throw new Error(message);
};

function readDocument(root, relative) {
  requireValue(typeof relative === 'string' && /^[A-Za-z0-9_./-]+\.md$/.test(relative), 'Invalid Markdown path');
  requireValue(!path.isAbsolute(relative) && !relative.split('/').some(p => p === '..' || p === '.' || p === ''), 'Unsafe memory path');
  const resolved = fs.realpathSync(path.join(root, relative));
  const within = path.relative(root, resolved);
  requireValue(within !== '' && !path.isAbsolute(within) && !within.split(path.sep).includes('..'), 'Memory path escapes root');
  const stat = fs.statSync(resolved);
  requireValue(stat.isFile() && stat.size <= MAX_FILE_BYTES, `Invalid or oversized document: ${relative}`);
  const buffer = fs.readFileSync(resolved);
  requireValue(buffer.length <= MAX_FILE_BYTES, `Oversized document: ${relative}`);
  const content = new TextDecoder('utf-8', { fatal: true }).decode(buffer);
  return { path: relative, bytes: buffer.length, sha256: sha256(buffer), content };
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

/** Read-only context assembly. sourceHead is caller-supplied, never fetched or trusted as live by this module. */
export function buildResumeContext({ root = DEFAULT_ROOT, sourceHead } = {}) {
  if (sourceHead !== undefined) requireValue(typeof sourceHead === 'string' && /^[a-f0-9]{40}$/.test(sourceHead), 'Invalid supplied source head');
  const resolvedRoot = fs.realpathSync(root);
  const current = readDocument(resolvedRoot, 'memory/CURRENT.md');
  const record = parseRecord(current.content);
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
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === '--json' && !json) json = true;
    else if (arg === '--source-head' && sourceHead === undefined && args[index + 1]) sourceHead = args[++index];
    else throw new Error(`Unknown, duplicate, or incomplete argument: ${arg}`);
  }
  const bundle = buildResumeContext({ sourceHead });
  if (json) process.stdout.write(JSON.stringify(bundle, null, 2) + '\n');
  else {
    process.stdout.write(`# ${bundle.id}\nSaved: ${bundle.savedAt}\nSource check: ${bundle.sourceCheck}\n${bundle.authority}\nBundle SHA-256: ${bundle.bundleSha256}\n\n`);
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
