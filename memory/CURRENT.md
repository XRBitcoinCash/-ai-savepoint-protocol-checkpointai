# Current XRBC debugging handoff

<!-- resume-record
version=1
id=RESUME-2026-10-09-safety-answers
updated=2026-10-09T06:09:00Z
source_repository=xrbitcoincash-group/xrbitcoincash-project
source_project=75781181
source_branch=master
source_head=6cb001b84037a362954d12d510a0f4c18b2de7bd
source_pipeline=2929189075
handoff=memory/active/XRBC-SWAP-SAFETY-2026-10-09.md
protocol=memory/CONTINUITY.md
-->

For XRBC debugging, read this file, the linked handoff, and the continuity protocol once. Reuse them until relevant facts change. The optional read-only loader is `node scripts/resume-memory.mjs`.

!93 is merged and deployed; its live build matched the recorded source on the user's next explicit Continue. A fresh route/ticket quote agreed and an unsigned simulation succeeded, but no swap was submitted. The next blocker is the native safety-answer dropdown. !94 at `26c2c254f290b3ee576083ca18a23cfe215a4509` replaces it with visible choices and passed CI `2929231368`. This checkpoint precedes its merge/deployment. Backend source remains unverified.

Next action: complete the user-requested !94 deployment and stop immediately upon success. On a later explicit Continue, verify the actual deployed head and answer controls before preparing a new bounded buy. The prior review is closed; do not reuse its expired quote or automatically replace a wallet request. Actual Xaman fees and wallet-confirmed buy/sell acceptance remain outstanding.

This compact overlay supersedes the October 5 homepage pointer **for XRBC debugging only**. Existing JSON, `latest_savepoint.record`, JCS routes, and historical records remain unchanged. Their older active pointers do not select the current debugging task. See the protocol for the compatibility boundary and future update rules.
