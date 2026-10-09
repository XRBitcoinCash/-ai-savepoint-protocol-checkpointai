# Next run — XRBC debugging

Read `memory/CURRENT.md`, its selected handoff and `memory/CONTINUITY.md`, or run `node scripts/resume-memory.mjs`.

Current resume ID: `RESUME-2026-10-09-trade-handoff`. Verified deployed GitLab master: `60f3ee35f901075119138e01234b415ce21f7291` (!94), deployment job `17050848801`, pipeline `2929243218`, matching live build. The user confirmed the safety choices work. !95 at `bb276576988cce00e5330655ba779008fe7b62d1` passed CI `2929289779` and awaits merge/deployment at this predeployment checkpoint.

The user then reported that the progress/possible QR flashed and disappeared after completing review. The exact error was overwritten by quote updates; no real payload UUID or QR remained in the observed UI. !95 adds a separate persistent failure explanation and rejects an unavailable validated-ledger deadline before binding/simulation. This known source path is not a confirmed diagnosis of the attempt. Fifteen focused checks and twelve inline JavaScript parses passed. No wallet-confirmed buy or sell has completed.

Save the checkpoint before deployment, stop all tools immediately when deployment succeeds, and resume only on a new explicit request. Then verify the actual deployed head and request state before one fresh bounded review. The user answers safety questions and signs. Keep the buy around/within 1 XRP and sell only the actual received XRBC after validated delivery. Count all fees; a 5% maximum cost objective aiming near 1% remains unverified. Do not promise arbitrage immunity or enlarge the test to amortize fees without asking. Do not restart the old 1-XRBC sell or repeat broad suites to recover context. Keep progress updates at least once per minute.

The goal is a useful, usable, trustworthy interface and the user's $500/month project-tool funding target. No income, error-free operation, automatic recall or model/hardware upgrade is promised.

For other projects use `memory/task-router.json`; JCS and XRBC routes remain separate. The October 7 JCS combined release handoff is `memory/active/JCS-RELEASE-2026-10-07.md`; PR #2 contains both changes and PR #3 was closed as superseded. Do not call the candidate deployed until Pages reports success. The legacy JSON checkpoint `SAVEPOINT-2026-10-05-xrbc-home-nexus` is retained unchanged and is not the current XRBC debugging task. Full prior next-run history is preserved in `memory/archive/NEXT_RUN-before-2026-10-06-continuity.md`. Do not load it by default.
