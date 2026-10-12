# XRPL.to read-only integration - recorded 2026-10-12

## Objective and current authority

The user asked for the most appropriate next step after receiving an XRPL.to permission email and explicitly said "do not deploy". Advisory work only. The later checkpoint request authorizes recording this topic, not implementing it. No provider application, wallet connection, API key creation, backend edit, public release or transaction is authorized by this brief.

## Source and observed permission

Evidence: `XRPLTO-email-visible-2026-10-12` in `memory/evidence.json`. A user-supplied email screenshot was directly inspected on 2026-10-12. The visible reply, presented as from the XRPL.to team, approves backend data retrieval, brief in-memory caching, public-page display and server-side sharing of WebSocket streams for the described read-only integration.

Each page displaying their data must include a clickable `Data by xrpl.to` credit. The reply invites application for the free Partner API plan at `https://xrpl.to/dashboard`: connect a wallet, create a key, and submit the Partner application with an attribution-page URL; that field may be empty if the pages are not public. The email states 20 million credits per 30 days and 100 requests per second. These are recorded email terms, not independently verified current plan limits or proof of Partner activation.

Limitations: the full original request is collapsed in the screenshot; sender authenticity and complete terms were not independently verified. A visible excerpt says a draft integration and automated tests existed, but no source/test results were inspected. Provider permission covers the stated data use, not unrestricted redistribution, transaction signing, custody, regulatory approval or user authorization to deploy.

Application source identity: backend repository, branch, relevant paths, head, pipeline, key status and Partner application status are all null/unknown. The frontend's separately recorded GitLab identity is not a substitute for identifying the backend. No integration readiness is established here.

## Recommendation, not an accepted implementation plan

The previous advice was: apply for the Partner plan first, then prepare a private backend staging integration with attribution, short caching, quota/rate-limit protection and safe unavailable/stale states. Keep keys server-side and restrict this adapter to read-only market/orderbook/AMM/holder/stream data. Preserve the existing Xaman transaction/signing flow; XRPL.to is a data provider, not signing authority.

Any later authorized rollout should begin with read-only market/AMM/orderbook display, then WebSocket streams, then advanced analytics/gated tools; execution-related changes require their own scope and checks. This is assistant advice only. The user has not authorized enrollment, staging edits or phased deployment.

## One next action and stop rule

On explicit continuation, agree the requested advisory/enrollment/implementation scope and identify the current backend adapter source before judging readiness. Review existing scoped evidence rather than rerunning a broad audit. The concrete risk is treating provider permission or historical advice as authority to modify production or interact with a wallet.

For another advisory request, stop after the recommendation. For implementation, require a new scoped user request and keep deployment separate unless explicitly included. Until then, preserve "do not deploy" and do not create keys, connect/sign with a wallet or perform financial tests.

Relevant contracts: `memory/CONTINUITY.md`; `memory/contracts/PROJECTS.md` only when application or wallet work is actually requested. No deployment or live ledger evidence exists for this checkpoint.
