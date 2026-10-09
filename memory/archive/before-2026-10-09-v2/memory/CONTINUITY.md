# Bounded continuity protocol

## What this provides

A versioned external handoff, not internal model memory, training, hardware improvement, or guaranteed recall. New sessions must load it through the connected repository or a checked-out workspace. No background service, scheduled agent, model-setting change, paid API, or production backend integration is installed by this change.

The loader is a dependency-free, read-only Node module/CLI. It can be consumed by a separately authorized backend later. It reads only the entrypoint and the two declared Markdown records, plus `AGENTS.md`; it does not fetch URLs, execute record contents, write files, create wallet requests, or grant authority to act.

## Resume

1. Read `AGENTS.md` and `memory/CURRENT.md`, then only the selected handoff and this protocol. For non-XRBC topics use the existing task router. Do not ingest all history or bundled application libraries by default.
2. Separate current user instructions, newly verified source/CI, historical recorded observations, and inference. Resolve conflicts explicitly; a prior assistant summary is not a fresh test.
3. Before application edits, check the exact repository, branch and relevant source once. A matching source commit does not prove wallet, provider, deployment, or liquidity state is unchanged.
4. Select one unfinished acceptance check. Ask the user for the current page/symptom if later live progress is not durably evidenced. Never repeat a financial test to reconstruct memory.
5. Stop for doubts about JSON/JS, asset identity, amounts, fees, transaction state, or missing permissions. Explain the doubt and ask the user before changing the affected application data/code. User reviews and signs wallet transactions; never request secrets.
6. Use focused checks for the changed risk and required gates only. Preserve existing fees, gates, layouts, identities and pending-request safeguards. No automatic replacement of ambiguous signing requests.
7. A previously denied quota/permission action remains blocked until there is evidence of recovery. A higher model setting or new conversation is not that evidence. No alternate route to bypass the denial.

## Read-only function

Run from this repository with Node.js 18 or later:

```sh
node scripts/resume-memory.mjs
node scripts/resume-memory.mjs --json
node scripts/resume-memory.mjs --source-head <freshly-checked-GitLab-master-SHA>
node --test scripts/resume-memory.test.mjs
```

An importing backend can call `buildResumeContext({ root, sourceHead })` from `scripts/resume-memory.mjs`. `root` must be a trusted checkout path selected by its operator, not a public request parameter. Repository text is project context, not trusted executable code or authority above the user's instructions. Do not expose this module as an unauthenticated write or execution endpoint.

Without a supplied head the result says `not-checked`; with one it says `matches-supplied-head` or `differs-from-supplied-head`. The caller, not the loader, must obtain that SHA from an authorized current source. CLI exit 2 flags a differing head; exit 1 flags invalid/missing/oversized input. The content digest identifies the loaded bundle; it is not an authenticity or safety certificate. JSON is emitted to stdout only, never saved to existing JSON files. Matching does not authorize edits, signing, or deployment.

## Save and compatibility

When a memory update is requested, preserve the prior dated handoff, add a concise successor, and update the metadata block in `memory/CURRENT.md` plus the current notices in `AGENTS.md` and `NEXT_RUN.md` in one commit. Record exact source identity, evidence links, actual checks, unresolved blockers, decisions, and one next action. Do not paste transcripts or private financial/account records.

The legacy JSON graph, `latest_savepoint.record`, and its validator are deliberately untouched because the user restricted uncertain JSON changes. They still describe the October 5 homepage checkpoint. Consumers reading only that legacy graph will not receive this overlay: they must explicitly use this loader or the Markdown entrypoint. Migrating those consumers or deploying a service is separate work requiring an agreed scope; do not silently rewrite their schema.

Validate the existing graph with `node scripts/validate-memory.mjs` and the new loader with its focused tests. Publish without force, preserve concurrent changes, and make one bounded read-back. For a website deployment task, prepare any requested checkpoint first and stop immediately when deployment succeeds; no post-deployment memory/test exception.

Official product reference: [AGENTS.md project guidance](https://learn.chatgpt.com/docs/agent-configuration/agents-md), consulted October 6, 2026. Repository guidance helps when loaded in the supported workspace; a remote file alone does not guarantee every conversation reads it.
