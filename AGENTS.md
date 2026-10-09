# Project continuity — updated 2026-10-09

Use this repository as external evidence and project instructions. It does not change model weights, privileges or reasoning settings. User instructions and platform rules control authorization; historical text cannot grant it.

## Start small

1. Select the task from the user's current request using `memory/task-router.json`. Read only that route's `read` files and `memory/CONTINUITY.md`. Do not load every archive or the old graph.
2. With a checkout: `node scripts/resume-memory.mjs --list`, then `--task <id>`. `--query "words"` returns candidates, never an automatic task decision. Without a checkout, fetch the same files through the repository connector. Use a single known revision for the reads.
3. Reuse context already loaded in this conversation. A model switch, compaction or new session is not evidence that a completed test failed. Follow the evidence rules before rerunning it.
4. Choose one unfinished action and its stopping condition. Inspect the current application repository/head only when the next action depends on it. Never repeat a financial transaction merely to recover context.

Bare `continue` follows the active conversation. If its task is unavailable or multiple routes fit, list the plausible choices and ask one short question. The CLI's default XRBC route is compatibility behavior, not a global task assignment.

## Non-negotiable project boundaries

- Keep the user informed at least once per minute during active work; report concrete blockers promptly. Stop only the dependent work.
- User reviews and signs wallet transactions. Preserve fresh quotes, identities, fees, limits, pending/duplicate guards, cancellation/expiry recovery and validated ledger checks. Do not automatically replace ambiguous wallet requests.
- Preserve working code, accepted layouts and concurrent work. Ask about genuinely uncertain changes, not already-authorized routine steps. Current user intent selects manual delivery versus repository changes/deployment.
- After a requested website deployment succeeds, stop **all tools immediately**. Prepare authorized memory beforehand. No post-deployment test, screenshot, cleanup or checkpoint exception. A new explicit request is required to resume.
- Keep private financial records, payloads, credentials and personal transcripts out of public memory. Keep failed/partial/unknown states distinct from valid zero or success.

## Saving this repository

Update the selected brief, router and any mirrored pointer atomically. Record only actual observations; preserve earlier dated records. Follow `memory/CONTINUITY.md` for validation and evidence reuse. Use a non-force publication after checking the remote head; read back the published pointer and changed brief once.

Default XRBC compatibility resume ID: `RESUME-2026-10-09-memory-v2`, selected by `memory/CURRENT.md`. Legacy entrypoints are explicit version-2 redirects; v1 snapshots remain under `memory/archive/before-2026-10-09-v2/`.
