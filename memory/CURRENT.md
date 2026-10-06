# Current XRBC debugging handoff

<!-- resume-record
version=1
id=RESUME-2026-10-06-xrbc-debug
updated=2026-10-06T20:27:03Z
source_repository=xrbitcoincash-group/xrbitcoincash-project
source_project=75781181
source_branch=master
source_head=135ac566ecea70ffc8634a3b013d5cf558022729
source_pipeline=2916332595
handoff=memory/active/XRBC-DEBUG-2026-10-06.md
protocol=memory/CONTINUITY.md
-->

For XRBC debugging, read this file, the linked handoff, and the continuity protocol once. Reuse them until relevant facts change. The optional read-only loader is `node scripts/resume-memory.mjs`.

Application head and successful pipeline were rechecked on October 6. This is a source/CI observation, not a fresh live-wallet test or security audit. Current backend source remains unverified.

The next action is to identify the user's current page and unfinished symptom, then perform one bounded read-only check when access permits. Do not restart the old 1-XRBC sell test: prior progress had already advanced beyond that point.

This compact overlay supersedes the October 5 homepage pointer **for XRBC debugging only**. Existing JSON, `latest_savepoint.record`, JCS routes, and historical records remain unchanged. Their older active pointers do not select the current debugging task. See the protocol for the compatibility boundary and future update rules.
