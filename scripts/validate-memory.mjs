// Reviewed 2026-10-09. Validate current routing separately from historical evidence.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { validateRouter, buildResumeContext, buildTaskContext } from './resume-memory.mjs';
import { assessEvidence } from './check-evidence.mjs';
import { verifyCatalog } from './catalog-memory.mjs';
const root=fs.realpathSync(process.argv[2] || fileURLToPath(new URL('..',import.meta.url)));
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const json=file=>JSON.parse(read(file));
function exists(file){
 assert.ok(typeof file==='string' && !path.isAbsolute(file) && !file.split('/').some(p=>['..','.',''].includes(p)),'Unsafe pointer');
 const relative=path.relative(root,fs.realpathSync(path.join(root,file)));
 assert.ok(relative && !path.isAbsolute(relative) && !relative.split(path.sep).includes('..'),'Pointer escapes repository');
}
const router=validateRouter({root});
const legacyBundle=buildResumeContext({root});
const bundles=Object.keys(router.routes).map(task=>buildTaskContext({root,task}));
for(const file of ['ai-bootstrap.json','ai-memory.json','memory/operating-protocol.json']){
 const redirect=json(file);assert.equal(redirect.schema_version,'2.0.0');assert.equal(redirect.status,'redirect');assert.equal(redirect.canonical_router,'memory/task-router.json');
 for(const key of ['protocol','entrypoint','legacy_snapshot','migration'])exists(redirect[key]);
 assert.equal(redirect.updated,router.updated);
}
const latest=Object.fromEntries(read('latest_savepoint.record').trim().split('\n').map(line=>{const at=line.indexOf('=');assert.ok(at>0,'Malformed record');return[line.slice(0,at),line.slice(at+1)];}));
assert.equal(latest.version,'2');assert.equal(latest.status,'redirect');assert.equal(latest.canonical_router,'memory/task-router.json');assert.equal(latest.default_compatibility_pointer,'memory/CURRENT.md');exists(latest.legacy_snapshot);
const evidence=json('memory/evidence.json');assert.equal(evidence.schema_version,'1.0.0');assert.ok(Array.isArray(evidence.records)&&evidence.records.length<=500);
const ids=new Set();
for(const record of evidence.records){
 assert.ok(!ids.has(record.id),'Duplicate evidence ID');ids.add(record.id);
 assessEvidence(record,{project:record.project,source_revision:record.source_revision,input_digest:null,environment_digest:null,required_gate:false,live_state:false});
 if(!/^https:\/\//.test(record.reference))exists(record.reference);
}
for(const record of evidence.records)for(const old of record.supersedes)assert.ok(ids.has(old),'Missing superseded evidence');
let jsonCount=0;
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){
 if(item.name==='.git')continue;const file=path.join(dir,item.name);assert.ok(!item.isSymbolicLink(),'Unexpected symlink');
 if(item.isDirectory())walk(file);else if(item.name.endsWith('.json')){JSON.parse(fs.readFileSync(file,'utf8'));jsonCount++;}
}}
walk(root);
const graph=json('memory/synapse-map.json'),nodes=new Set(graph.nodes.map(node=>node.id));assert.equal(nodes.size,graph.nodes.length,'Duplicate historical graph node');
for(const edge of graph.edges)assert.ok(nodes.has(edge.from)&&nodes.has(edge.to),'Broken historical graph edge');
const catalog=verifyCatalog({root});
console.log(JSON.stringify({status:'pass',schema:'2.0.0',tasks:bundles.length,defaultCompatibilityId:legacyBundle.id,jsonFiles:jsonCount,evidenceRecords:ids.size,maxTaskBundleBytes:Math.max(...bundles.map(bundle=>bundle.totalBytes)),historicalGraphNodes:nodes.size,historicalQueueSelectsCurrentTask:false,catalog},null,2));
