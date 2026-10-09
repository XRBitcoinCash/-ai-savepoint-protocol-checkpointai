# Current XRBC debugging handoff

<!-- resume-record
version=1
id=RESUME-2026-10-09-swap-nexus
updated=2026-10-09T05:42:00Z
source_repository=xrbitcoincash-group/xrbitcoincash-project
source_project=75781181
source_branch=master
source_head=56d028d88462358ffec706c874653e6d3f8b2f12
source_pipeline=2929063432
handoff=memory/active/XRBC-SWAP-NEXUS-2026-10-09.md
protocol=memory/CONTINUITY.md
-->

For XRBC debugging, read this file, the linked handoff, and the continuity protocol once. Reuse them until relevant facts change. The optional read-only loader is `node scripts/resume-memory.mjs`.

Application master and successful !92 deployment were rechecked October 9. Live route inspection and wallet SignIn succeeded, but no swap was submitted. Draft !93 fixes the observed quote fallback mismatch; commit `f91d05dab6fcfe686f64a3a11f0a2bdbb040e105` passed CI `2929172925` and is not deployed. Current backend source remains unverified.

Next action: review !93 and obtain website deployment authorization if not supplied by the current user instructions. Respect the deployment stopping rule. The user-authorized small buy and matching sell remain outstanding; do not restart the old 1-XRBC sell or repeat broad suites merely to recover context.

This compact overlay supersedes the October 5 homepage pointer **for XRBC debugging only**. Existing JSON, `latest_savepoint.record`, JCS routes, and historical records remain unchanged. Their older active pointers do not select the current debugging task. See the protocol for the compatibility boundary and future update rules.
