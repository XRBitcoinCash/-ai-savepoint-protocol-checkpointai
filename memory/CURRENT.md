# Current XRBC debugging handoff

<!-- resume-record
version=1
id=RESUME-2026-10-09-trade-handoff
updated=2026-10-09T06:33:00Z
source_repository=xrbitcoincash-group/xrbitcoincash-project
source_project=75781181
source_branch=master
source_head=60f3ee35f901075119138e01234b415ce21f7291
source_pipeline=2929243218
handoff=memory/active/XRBC-SWAP-HANDOFF-2026-10-09.md
protocol=memory/CONTINUITY.md
-->

For XRBC debugging, read this file, the linked handoff, and the continuity protocol once. Reuse them until relevant facts change. The optional read-only loader is `node scripts/resume-memory.mjs`.

!94 is merged, deployed and live-observed; the user confirmed the visible safety answers work. They then reported that the progress/possible QR flashed and disappeared after completing review. The exact failure explanation was lost to quote refresh messages. !95 at `bb276576988cce00e5330655ba779008fe7b62d1` preserves failure messages and stops unavailable ledger deadlines earlier; required CI `2929289779` passed. This checkpoint precedes its merge/deployment. Backend source remains unverified.

Next action: complete the requested !95 deployment and stop all tools immediately upon success. On a later explicit Continue, verify the deployed head and inspect the request state first. If safe to start a fresh review, perform one bounded attempt and read any persistent error before deciding the next repair. Do not automatically replace an ambiguous request. Actual Xaman fees and wallet-confirmed buy/sell acceptance remain outstanding.

This compact overlay supersedes the October 5 homepage pointer **for XRBC debugging only**. Existing JSON, `latest_savepoint.record`, JCS routes, and historical records remain unchanged. Their older active pointers do not select the current debugging task. See the protocol for the compatibility boundary and future update rules.
