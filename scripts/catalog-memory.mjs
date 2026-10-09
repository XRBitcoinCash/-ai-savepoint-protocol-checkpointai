// Reviewed 2026-10-09. Local integrity catalog; never executes stored content.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CATALOG = 'memory/catalog.json';
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const validDate = date => typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(Date.parse(date)) && new Date(date).toISOString().slice(0,10) === date;
export function buildCatalog({ root = ROOT, date } = {}) {
  if (!validDate(date)) throw new Error('An explicit valid catalog date is required.');
  root = fs.realpathSync(root);
  const router = JSON.parse(fs.readFileSync(path.join(root,'memory/task-router.json'),'utf8'));
  const selected = new Set(Object.values(router.routes).flatMap(route => route.read));
  const entries = [];
  function walk(relative = '') {
    for (const name of fs.readdirSync(path.join(root,relative)).sort()) {
      if (name === '.git') continue;
      const file = relative ? relative + '/' + name : name;
      if (file === CATALOG) continue;
      const full=path.join(root,file),stat=fs.lstatSync(full);
      if (stat.isSymbolicLink()) throw new Error('Catalog does not follow symlinks: '+file);
      if (stat.isDirectory()) { walk(file); continue; }
      if (!stat.isFile() || stat.size > 2_000_000) throw new Error('Unsupported catalog file: '+file);
      const bytes=fs.readFileSync(full);
      let classification='reference';
      if(file.startsWith('memory/archive/')) classification='historical';
      else if(selected.has(file)) classification='selected-task-record';
      else if(file.startsWith('scripts/') || file.startsWith('skills/')) classification='tooling';
      else if(file.startsWith('memory/templates/')) classification='template';
      else if(file==='memory/MIGRATION-2026-10-09.md') classification='reference';
      else if(/\d{4}-\d{2}-\d{2}/.test(file)) classification='historical';
      else if(['ai-bootstrap.json','ai-memory.json','latest_savepoint.record','OPERATING-PROTOCOL.md','AI-SAVEPOINT-PROTOCOL-CHECKPOINT-TIA.md','memory/operating-protocol.json'].includes(file)) classification='redirect';
      else if(['AGENTS.md','NEXT_RUN.md','memory/CURRENT.md','memory/CONTINUITY.md','memory/task-router.json','memory/evidence.json'].includes(file)) classification='current';
      entries.push({path:file,indexed_on:date,bytes:bytes.length,sha256:digest(bytes),classification});
    }
  }
  walk();
  return {schema_version:'1.0.0',indexed_on:date,meaning:'Content inventory and integrity snapshot, not renewed verification of historical claims. Original event dates remain intact.',self:{path:CATALOG,indexed_on:date,sha256:null,reason:'Self hash excluded to avoid recursion.'},entries};
}
export function verifyCatalog({root=ROOT}={}) {
  const saved=JSON.parse(fs.readFileSync(path.join(root,CATALOG),'utf8'));
  const actual=buildCatalog({root,date:saved.indexed_on});
  if(JSON.stringify(actual)!==JSON.stringify(saved)) throw new Error('Catalog is stale or malformed; refresh after the intended edits.');
  return {files:saved.entries.length+1,indexedOn:saved.indexed_on};
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const args=process.argv.slice(2);
    if(args.length===0) console.log(JSON.stringify(verifyCatalog()));
    else if(args.length===3 && args[0]==='--write' && args[1]==='--date') {
      const catalog=buildCatalog({date:args[2]});
      fs.writeFileSync(path.join(ROOT,CATALOG),JSON.stringify(catalog,null,2)+'\n');
      console.log(JSON.stringify({indexed:catalog.entries.length+1,date:catalog.indexed_on}));
    } else throw new Error('Use no arguments to verify or --write --date YYYY-MM-DD to update.');
  }catch(error){ console.error(error.message);process.exitCode=1; }
}
