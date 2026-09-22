// Read-only, synthetic probes against a supplied frontend checkout. No network or wallet access.
// These characterize the audited defects; they are not acceptance tests that declare the app fixed.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(process.argv[2]||'.');
const html=fs.readFileSync(path.join(root,'public/xrbitcoin-links.html'),'utf8');
const script=(html.match(/<script id="liquidity-app">([\s\S]*?)<\/script>/)||[])[1];
assert.ok(script,'liquidity-app must exist');
const section=(start,end)=>{const a=script.indexOf(start),b=script.indexOf(end,a+start.length);assert.ok(a>=0&&b>a,'Source shape changed: inspect probe before reuse');return script.slice(a,b);};
const results=[];
// Execute the real event wiring with a fake SDK: an active browser success event is ignored.
{
 const callbacks={},sdk={runtime:{xapp:false},on:(name,fn)=>{callbacks[name]=fn;}};
 const S={sdk,ignoreSdk:false,authVersion:1,authAttempt:{version:1},connecting:true};
 let adopted=0;
 const wire=new Function('S','accountFromSDK',section('function wireSdk(sdk){','function installSdk(){')+';return wireSdk;')(S,async()=>{adopted++;});
 wire(sdk);callbacks.success();callbacks.retrieved();await Promise.resolve();
 results.push({id:'XRB-001',probe:'active browser success/retrieved event bridge',observed_calls:adopted,missing_bridge:adopted===0,limitation:'Does not execute real OAuth or prove the sole cause of the reported second click.'});
}
// Execute the real handler bound to the button labelled Cancel / restart Xaman.
{
 const S={busy:false,connecting:true,cancelling:false,authAttempt:{version:1},sdk:{runtime:{xapp:false}}};
 let cleared=0;
 const disconnect=new Function('S','clearBrowserAuthorization',section('async function disconnect(){','async function watch(){')+';return disconnect;')(S,async()=>{cleared++;});
 await disconnect();
 results.push({id:'XRB-007',probe:'cancel during authorization',clear_calls:cleared,connecting_after:S.connecting,reproduced:cleared===0&&S.connecting===true});
}
// SDK construction precedes connect's try/finally and timeout installation.
{
 const S={busy:false,connecting:false,cancelling:false,pending:null,sdk:null};
 const connect=new Function('S','signingOrigin','freshBrowserSdk',section('async function connect(recoveryOnly=false){','async function disconnect(){')+';return connect;')(S,true,()=>{throw new Error('synthetic SDK initialization failure');});
 let error='';try{await connect();}catch(e){error=e.message;}
 results.push({id:'XRB-008',probe:'SDK initialization failure cleanup',error,connecting_after:S.connecting,reproduced:error==='synthetic SDK initialization failure'&&S.connecting===true});
}
console.log(JSON.stringify({mode:'synthetic-source-extraction',network_calls:0,transaction_payloads:0,results},null,2));
