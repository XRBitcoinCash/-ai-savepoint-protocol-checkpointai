import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root=path.resolve(process.argv[2]||fileURLToPath(new URL('..',import.meta.url)));
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const json=p=>JSON.parse(read(p));
const exists=p=>{assert.ok(typeof p==='string'&&!path.isAbsolute(p)&&!p.split('/').includes('..'),'unsafe memory path');assert.ok(fs.existsSync(path.join(root,p)),'missing memory file: '+p);};
let jsonCount=0;
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(e.name==='.git')continue;const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.name.endsWith('.json')){JSON.parse(fs.readFileSync(p,'utf8'));jsonCount++;}}}
walk(root);
const bootstrap=json('ai-bootstrap.json'),memory=json('ai-memory.json'),graph=json('memory/synapse-map.json'),errors=json('memory/known-errors.json');
const record=Object.fromEntries(read('latest_savepoint.record').split('\n').filter(x=>x.includes('=')).map(x=>{const i=x.indexOf('=');return[x.slice(0,i),x.slice(i+1)];}));
const id=memory.latest_savepoint.id;
assert.equal(record.id,id,'latest record vs ai-memory');
assert.equal(bootstrap.current_state.active_memory_savepoint.id,id,'bootstrap active id');
assert.equal(bootstrap.current_state.latest_pointer_expected_id,id,'bootstrap expected id');
assert.equal(record.machine_savepoint,memory.latest_savepoint.record,'record file mismatch');
assert.equal(bootstrap.current_state.active_memory_savepoint.record,record.machine_savepoint,'bootstrap record mismatch');
exists(record.machine_savepoint);exists(record.human_checkpoint);
const point=json(record.machine_savepoint);
assert.equal(point.id,id,'savepoint id');
assert.equal(point.human_record,record.human_checkpoint,'human checkpoint');
assert.equal(point.next_issue,record.next_issue,'next issue in savepoint');
assert.ok(read('NEXT_RUN.md').includes(id),'NEXT_RUN stale');
assert.ok(read('AGENTS.md').includes(id),'AGENTS stale');
assert.ok(read('AI-SAVEPOINT-PROTOCOL-CHECKPOINT-TIA.md').includes(id),'canonical contract missing current checkpoint');
for(const p of Object.values(bootstrap.authority))exists(p);
for(const paths of Object.values(bootstrap.routing))for(const p of paths)exists(p);
const nodes=new Map(graph.nodes.map(n=>[n.id,n]));
assert.equal(nodes.size,graph.nodes.length,'duplicate graph node');
const active=nodes.get(graph.active_savepoint);
assert.ok(active,'missing active graph node');
assert.equal(active.file,record.machine_savepoint,'graph points at old checkpoint');
for(const e of graph.edges){assert.ok(nodes.has(e.from),'missing graph source '+e.from);assert.ok(nodes.has(e.to),'missing graph target '+e.to);}
for(const refs of Object.values(graph.query_hints))for(const n of refs)assert.ok(nodes.has(n),'missing graph route '+n);
const all=[...errors.xrbitcoin,...errors.cross_project,...errors.backend_ci];
const issues=new Map(all.map(x=>[x.id,x]));
assert.equal(issues.size,all.length,'duplicate issue IDs');
for(const issue of all)assert.ok(errors.status_values.includes(issue.status),'unknown issue status '+issue.id);
for(const i of errors.repair_order){assert.ok(issues.has(i),'missing queue issue '+i);assert.notEqual(issues.get(i).status,'resolved','resolved issue queued '+i);}
assert.equal(errors.highest_priority.id,errors.repair_order[0]);
assert.equal(record.next_issue,errors.repair_order[0]);
assert.equal(bootstrap.current_state.known_errors_registry.highest_priority,record.next_issue);
assert.equal(json('memory/operating-protocol.json').next_issue,record.next_issue);
assert.equal(graph.query_hints.next_implementation[0],'issue:'+record.next_issue);
assert.equal(point.source_frontend_commit,errors.active_source.observed_head);
assert.equal(point.source_frontend_commit,record.observed_frontend_commit);
assert.equal(point.source_backend_commit,record.observed_backend_commit);
assert.match(point.source_frontend_commit,/^[a-f0-9]{40}$/);assert.match(point.source_backend_commit,/^[a-f0-9]{40}$/);
exists(point.evidence);exists(point.operating_protocol);exists(point.registry);
exists('memory/archive/NEXT_RUN-before-2026-09-22-audit.md');
exists('memory/diagnostics/wallet-audit.mjs');
const audit=json(point.evidence);
assert.equal(audit.source_snapshots.frontend.commit,point.source_frontend_commit);
assert.equal(audit.source_snapshots.backend.commit,point.source_backend_commit);
if(point.checkpoint_kind==='application-repair'){
  assert.match(point.implementation_commit,/^[a-f0-9]{40}$/,'repair needs implementation commit');
  assert.ok(point.application_files_changed.length>0,'repair needs bounded application file list');
  for(const p of point.application_files_changed)assert.ok(typeof p==='string'&&!path.isAbsolute(p)&&!p.split('/').includes('..'),'unsafe application path');
  assert.equal(memory.current_repair.checkpoint,record.machine_savepoint,'repair pointer mismatch');
  assert.equal(memory.current_repair.evidence,point.evidence,'repair evidence mismatch');
}else{
  assert.equal(point.application_files_changed.length,0,'memory-only checkpoint cannot claim code changes');
}
console.log(JSON.stringify({status:'pass',json_files:jsonCount,active_savepoint:id,graph_nodes:nodes.size,issues:issues.size,next_issue:record.next_issue},null,2));
