import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildCatalog, verifyCatalog } from './catalog-memory.mjs';

function fixture(t) {
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'memory-catalog-'));
 t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 fs.mkdirSync(path.join(root,'memory/active'),{recursive:true});
 fs.writeFileSync(path.join(root,'memory/task-router.json'),JSON.stringify({routes:{sample:{read:['memory/active/sample.md']}}}));
 fs.writeFileSync(path.join(root,'memory/active/sample.md'),'Original observation 2026-09-20.');
 return root;
}
function save(root) { const result=buildCatalog({root,date:'2026-10-09'});fs.writeFileSync(path.join(root,'memory/catalog.json'),JSON.stringify(result));return result; }
test('index dates every file without changing original event text and excludes recursive self hash',t=>{
 const root=fixture(t),catalog=save(root);
 assert.equal(verifyCatalog({root}).files,3);
 assert.ok(catalog.entries.every(entry=>entry.indexed_on==='2026-10-09'));
 assert.equal(catalog.self.sha256,null);
 assert.equal(fs.readFileSync(path.join(root,'memory/active/sample.md'),'utf8'),'Original observation 2026-09-20.');
});
test('integrity check catches both modified records and unindexed additions',t=>{
 const root=fixture(t);save(root);
 fs.appendFileSync(path.join(root,'memory/active/sample.md'),' Changed.');
 assert.throws(()=>verifyCatalog({root}),/stale/);
 save(root);fs.writeFileSync(path.join(root,'new.md'),'New record');
 assert.throws(()=>verifyCatalog({root}),/stale/);
});
test('catalog rejects invalid dates and symlink escapes',t=>{
 const root=fixture(t);
 assert.throws(()=>buildCatalog({root,date:'2026-02-30'}),/valid catalog date/);
 fs.symlinkSync(os.tmpdir(),path.join(root,'outside'));
 assert.throws(()=>buildCatalog({root,date:'2026-10-09'}),/symlinks/);
});
