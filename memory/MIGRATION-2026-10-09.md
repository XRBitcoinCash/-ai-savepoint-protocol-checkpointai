# Memory v2 migration — 2026-10-09

## Change and scope

The October 9 user request authorizes reorganizing the memory repository, including applicable JSON, reusable skills and all-file date coverage. Several v1 entrypoints selected October 5 while the newer Markdown handoff selected October 9. Version 2 makes `memory/task-router.json` canonical, gives each task a short brief, and validates its mirrors. Historical files stay dated evidence, not active directions. Current frontend status is reconciled through !95 deployment without resuming browser or financial tests.

Root ai-bootstrap/ai-memory/operating-protocol JSON and latest_savepoint.record are explicitly versioned redirects. Their removed v1 fields are a deliberate compatibility break. Exact originals, including the old validator, are preserved in `memory/archive/before-2026-10-09-v2/`; no external consumer is claimed migrated. The default `buildResumeContext()` API remains version 1; task selection/list/query are added for model-neutral use. New consumers use the router or explicit-task loader. Historical graph and known-errors retain their contents, but their old active/next labels are not authoritative.

Every tracked source file is cataloged with an indexed date and SHA-256. This gives today's date coverage without relabeling an old event, check or deployment as new. Cataloging does not verify historical claims. Retrieval loads one brief; the larger archive is referenced only for specific missing context. No installed Python/embedding stack, paid API, background process or automatic memory extraction is needed.

## Supplied references and decision

Reviewed the user's three attached references: json-memory, Darren Addy's optimize-ai-agent-memory, and Fareed Khan's optimize-ai-agent-memory. Adopted structured keys, relevant retrieval, a small working context, provider-neutral interfaces and explicit evidence. Automatic extraction/consolidation remains a candidate process, never authority. No time/frequency decay deletes constraints or evidence.

Primary references consulted on 2026-10-09:

- https://agents.md/ — open instruction-file convention.
- https://agentskills.io/specification — portable skill format and progressive loading.
- https://pypi.org/project/json-memory/ — structured memory with optional semantic dependencies.
- https://github.com/darrenaddy/optimize-ai-agent-memory — pluggable educational memory strategies.
- https://github.com/FareedKhan-dev/optimize-ai-agent-memory — educational memory examples.

The supplied token-saving/accuracy figures are demonstrations on other data, not validated savings for this repository or proof of better model reasoning. Local reports measure bytes and loaded files only. Consciousness, hidden capabilities and model-weight changes are outside what these files implement.

## Validation and continuation

Run the changed loader/evidence tests, skill validator, and repository validator. Forward-check independent resume scenarios without production access. The repository validator checks route/mirror consistency, safe bounded documents, archive presence, evidence schema and catalog integrity; historical graph consistency is reported separately from current tasks. The catalog is regenerated only when memory files change.

Publish without force after confirming the remote head; perform one bounded readback. Preserve the existing mandatory stop after website deployment. For future changes, keep one current brief per topic, one next action, clear evidence scope and explicit supersession/history links. Unknown source/backend/transaction fields remain unknown.

## Recorded validation for this change

- Loader: 13 focused tests passed after the v2 router and briefs were integrated.
- Evidence/retry helper: 10 focused tests passed, including unknown revisions and pending references.
- Catalog: 3 focused tests passed for original-date preservation, changed/unindexed files, invalid dates and symlink escapes.
- Two independent read-only resume scenarios selected XRBC and JCS correctly, preserved uncertainty and avoided repeating financial tests. Neither contacted production.
- Skill format validation passed. All eleven archived entrypoints matched their original committed bytes.
- The explicit XRBC bundle loads three Markdown files totaling 12,133 bytes, versus the previous four-file 19,563-byte bundle: 38% fewer bytes. This is not a model-token, cost or correctness benchmark.
