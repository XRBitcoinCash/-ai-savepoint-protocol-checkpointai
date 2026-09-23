# Discovery, usefulness and efficiency standard

User-requested standard, 2026-09-23. Machine twin: `memory/discovery-efficiency-standard.json`. This records intended behavior and acceptance criteria; it does not claim that an implementation, deployment or exhaustive ledger scan is complete. Current source and task-specific evidence determine completion.

## Maximum useful discovery

- Recover compact current context first, then inspect the exact repository, branch, head and affected code. Reuse existing evidence; load historical checkpoints only when they answer a concrete question.
- Discover across the supported XRPL asset universe without restricting results to names beginning with XR or the project's own tokens. Preserve the exact issuer and original ledger currency encoding independently from a decoded display label. Different encodings must not be silently collapsed because their labels match.
- Use documented public sources and read-only ledger evidence. A provider catalog is a source of candidates, not proof that every ledger asset or pool has been found. State supported asset classes, provider coverage, cursors, loaded/checked counts, freshness and ranking scope. Classic issued-token coverage does not establish MPT, NFT or all-pair coverage.
- Separate catalog discovery, direct XRP AMM checks, other-asset AMMs and order-book liquidity. If only direct XRP pools are measured, say so. Prioritize liquidity-ranked discovery when available, then sort comparable completed measurements in descending order. Never call a loaded subset a global top-liquidity ranking.
- Preserve an exact issuer/currency lookup when provider search omits an asset. Include a regression for a known liquid asset such as SOLO using an authoritative exact identity. Logos and names do not establish ledger identity or legitimacy.

## Maximum useful information

Public liquidity discovery requires no wallet connection, token holding, signature or payment. Keep existing wallet and forensic-tool policies separate.

Each result should answer: which exact asset is this; what pool was checked; how much comparable liquidity was observed; when and from where; what does the state mean; and what can the user do next?

| Observation | Plain-language meaning and action |
| --- | --- |
| Direct XRP pool found | A measured route for exchanging this token and XRP exists. Reserves can change; a pool alone does not establish safety or sufficient exit capacity. |
| Thin measured liquidity | Modest trades may move the price substantially. Explain the published reserve/slippage thresholds and measurement unit rather than implying a comprehensive risk score. |
| No direct XRP pool at checked ledger | This check found no automated token/XRP pool. Selling through that route may be unavailable. Other pairs, order books or non-trading uses may exist; investigate before relying on an exit. |
| Lookup unavailable | Evidence could not be retrieved. Show the specific reason, such as timeout, rate limit, provider failure or invalid identity, plus an appropriate retry/correction action. This is not zero liquidity. |
| Not checked, stale or unsupported | No current supported measurement is available. Keep this distinct from a confirmed no-pool response and exclude it from fresh measured rankings. |

Do not label a token worthless, intrinsically valueless, a scam or undeveloped solely because a direct pool is missing. Use measured liquidity cautions. A numeric caution metric requires a published formula, data inputs and explicit limits; unavailable/no-pool results must not receive an invented score.

## Maximum efficient execution

- Show 50 tokens initially. Render at most 100 per page and offer clearly labeled continuation that explains it discovers or opens more tokens/pools. Retain search and exact lookup; the display limit is not a discovery cap.
- Bound requests, concurrency, deadlines, retries, page growth and cached data. Respect provider limits and `Retry-After`; cancel or ignore obsolete work. Reuse duplicate in-flight requests and fresh cache where appropriate. More discovery must not mean an unbounded browser scan or background loop.
- Diagnose the actual failure before choosing a fix: catalog omission, changed API/schema, malformed currency, access policy, transport/CORS, timeout, throttling and ledger no-pool responses are different states. Prefer supported public alternatives; do not bypass authentication, protection mechanisms or provider terms, and do not infer deliberate concealment from an error.
- Define a small acceptance checklist before editing. For this index, cover exact currency identity, a known liquid asset, true no-pool versus unavailable, descending comparable ranking, 50/100 continuation and bounded retry/recovery. Use focused checks that resolve those concrete risks. Do not add repeated broad scans, unrelated audits, screenshots or extra suites merely for reassurance.
- Complete the requested bounded change, record commits and actual verification limits, preserve queued issues and stop. A larger collector or broader asset/pair coverage requires a distinct, justified scope decision.

## Completion record

Record the source heads and changed files, failure cause and evidence grade, supported discovery/pair scope, request/page limits, essential checks and results, deployment status, outstanding limitations and rollback reference. Distinguish source-corrected, fixture-tested, CI-verified and live-read-only-verified. Never claim real-wallet verification from synthetic checks or memory persistence from an uncommitted file.

“Maximum” means the most useful, evidence-supported result within the user's scope and a bounded resource budget. It does not promise perfect coverage, unlimited testing or a different model capability.
