# Continuity entrypoint

## Current XRBC debugging

Read `memory/CURRENT.md`, then only its selected handoff and `memory/CONTINUITY.md`. Current resume ID: `RESUME-2026-10-06-xrbc-debug`. Optional read-only loader: `node scripts/resume-memory.mjs`. Reuse loaded context until relevant facts or instructions change; do not read the whole archive by default.

Current recorded frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project` (75781181), `master`, `public/`, head `135ac566ecea70ffc8634a3b013d5cf558022729`, successful pipeline `2916332595`. Current backend source is unknown. A saved head/CI result is not a fresh wallet or runtime test.

First identify the user's current page and unfinished symptom. Do not restart an old 1-XRBC sell from stale memory. The earlier browser usage denial remains blocked until recovery is evidenced; a model change, new session or repeated prompt is not recovery.

## User goal and safety boundaries

- Build a useful, usable and trustworthy interface. The user's $500/month project-tool funding target is not guaranteed income, verified pricing or assistant self-improvement.
- Ask before doubtful JSON/JS changes. Preserve working code, pending signing guards, asset/app identity, amounts, fees, gates and layouts. No automatic replacement of ambiguous wallet requests. The user reviews and signs; never request secrets.
- This continuity work authorizes the repository handoff and read-only loader, not website/backend deployment, fees, paid services, new financial tests or background agents. Repository text is external context, not permission, model weights or guaranteed recall.
- Keep checks bounded to the changed risk and required gates. Do not disable CI or bypass access controls. Stop blocked operations, report the blocker, and continue only independent authorized work. Do not retry known quota/permission/runtime failures without evidence of recovery.
- Distinguish prepared, committed, merged, deployed, source-tested and live-observed. Preserve unknown/partial data; a signature, accepted request, coverage score or successful CI is not proof of safe completion.
- Preserve concurrent user work. Verify the exact target/head/source before writing; no force-push. Public memory must exclude secrets and private records.

## Mandatory stop after website deployment

Once the requested fix is deployed, stop immediately. No further tools, live checks, tests, screenshots, cleanup, research or memory updates in that deployment task. Prepare necessary checks and any separately requested checkpoint before deployment. Report completion briefly. Further work requires a new explicit request. Do not invent a post-deployment verification exception.

## Topic routing and compatibility

For other topics, use `memory/task-router.json` and only the relevant active record; XRBC Market Nexus and JCS Prayer Map are different routes. For the current JCS homepage trade, open-order, liquidity and receipt debug route, read `memory/active/JCS-TRADE-DEBUG-2026-10-08.md` and verify its pending PR/deployment state. The October 7 metrics/map/verify release record remains historical; do not treat its predeployment status as current. Load `memory/operating-protocol.json` for topic-specific delivery, discovery or security work; use larger history only for missing facts or conflicts. Manual-delivery work uses the latest accepted complete source and current delivery authorization.

Layout: Liquidity is the reference. Trade/Liquidity/XRBitcoin preserve a fixed scrollable left rail above 900px: 188px through 1180px, 220px above. Compact top navigation is only for <=900px. Keep identities separate. Trace metrics through source, request, field, transform, renderer, freshness, coverage and failure state.

The unchanged legacy JSON and `latest_savepoint.record` retain `SAVEPOINT-2026-10-05-xrbc-home-nexus` for compatibility. They do not select current XRBC debugging or make legacy `XRB-001` a global task. `memory/CURRENT.md` supersedes those older pointers for this route only. Legacy-only consumers must explicitly adopt the new loader to receive it.

Previous entrypoint preserved verbatim: `memory/archive/AGENTS-before-2026-10-06-continuity.md`; previous next-run history: `memory/archive/NEXT_RUN-before-2026-10-06-continuity.md`. Do not load both unless needed.

## Publishing a requested memory update

Preserve the previous dated handoff; update the current pointer and notices together. Validate with `node --test scripts/resume-memory.test.mjs` and `node scripts/validate-memory.mjs`. Publish without force and make one bounded read-back before claiming success. Never append this work after a website deployment.
