# Next run — XRBC debugging

Read `memory/CURRENT.md`, its selected handoff and `memory/CONTINUITY.md`, or run `node scripts/resume-memory.mjs`.

Current resume ID: `RESUME-2026-10-09-swap-nexus`. GitLab master `56d028d88462358ffec706c874653e6d3f8b2f12` and successful deployment pipeline `2929063432` (!92) were verified October 9. Draft !93 at `f91d05dab6fcfe686f64a3a11f0a2bdbb040e105` passed CI `2929172925` and is not deployed.

Review !93: a failed AMM read silently replaced the ticket estimate with a materially different order-book price. Browser recovery, Buy/Sell route direction, staging, and SignIn/reset were observed. No swap was submitted. The user authorized a small buy around 1 XRP and sale of the actual received XRBC, with fees counted and a 5% maximum spread/cost objective aiming near 1%; that objective is not yet verified or guaranteed by the current 2% transaction tolerances. The user signs. Obtain deployment authorization if absent, then stop immediately once a requested deployment succeeds. Do not restart the old 1-XRBC sell or infer authority merely from loading memory. Keep progress updates at least once per minute during active work.

The goal is a useful, usable, trustworthy interface and the user's $500/month project-tool funding target. No income, error-free operation, automatic recall or model/hardware upgrade is promised.

For other projects use `memory/task-router.json`; JCS and XRBC routes remain separate. The October 7 JCS combined release handoff is `memory/active/JCS-RELEASE-2026-10-07.md`; PR #2 contains both changes and PR #3 was closed as superseded. Do not call the candidate deployed until Pages reports success. The legacy JSON checkpoint `SAVEPOINT-2026-10-05-xrbc-home-nexus` is retained unchanged and is not the current XRBC debugging task. Full prior next-run history is preserved in `memory/archive/NEXT_RUN-before-2026-10-06-continuity.md`. Do not load it by default.
