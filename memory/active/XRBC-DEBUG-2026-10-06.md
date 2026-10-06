# XRBitcoinCash debugging — October 6, 2026

Resume ID: `RESUME-2026-10-06-xrbc-debug`.

## User goal and decision boundaries

Build a functioning, useful, usable and trustworthy XRBC interface. The user's initial funding objective is enough recurring project income to cover a **$500/month development-tool budget**. This records the user's target, not verified subscription pricing, a revenue forecast, or a promise. No monetization mechanism, new fee, gate, spending, subscription purchase or promotion is authorized by that goal alone.

Prioritize understandable first-use flows, accurate transaction previews, safe recovery, and honest data coverage. Revenue should follow demonstrated user value; token-price claims or AI/security guarantees are not substitutes. No current adoption, conversion or income figures have been verified.

Use the selected reasoning setting for ordinary bounded work; the user may choose a higher setting for serious issues. The assistant cannot change its own tier, weights or hardware. Better continuity can reduce repeated retrieval, but no measured token/energy savings or error-free behavior is promised.

User restrictions: preserve working code; ask before uncertain JSON/JavaScript changes; use their help to resolve ambiguity; minimize repeated tests and broad scans. This memory update is authorized separately from website/backend changes. Historical trade limits are not fresh transaction authorization.

## Current source evidence

Rechecked October 6, 2026, during this savepoint task:

- Frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, project `75781181`, branch `master`, directory `public/`.
- Head: [`135ac566ecea70ffc8634a3b013d5cf558022729`](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/commit/135ac566ecea70ffc8634a3b013d5cf558022729).
- [Pipeline 2916332595](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/pipelines/2916332595): success; completed `2026-10-06T05:52:25Z`. CI success is not independent audit or fresh live verification.
- [MR !75](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/75): merged; one-line Risk Lens completion message correction. Its recorded live observation: Xaman and the 150-XRBC gate worked; XRBC evidence coverage reached 85%, with unavailable AMM activity marked unknown. The correction replaces a stale calculating message with “Snapshot ready.” This session did not reproduce that live test.
- Website: `https://xrbitcoincash.com/`. Known service: `https://xrbitcoincash-github-io.onrender.com`. Current backend repository/head has not been verified; do not assume the archived GitHub `xrpl-proxy/` location is current.
- Continuity base read: GitHub `XRBitcoinCash/-ai-savepoint-protocol-checkpointai`, `main`, commit `a8059a8e238c1f2a412f7644e676a36619857ebe`. Its previous active entrypoint described the October 5 homepage release, not the later debugging sequence.

## Debugging evidence and unfinished confirmations

| Area | Evidence available | Remaining boundary |
| --- | --- | --- |
| XRBC buy/sell, limit creation/cancellation | [Committed live-test record](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/blob/135ac566ecea70ffc8634a3b013d5cf558022729/docs/testing/2026-10-05-live-xrbc-tests.md) records validated transactions and decimal/manual-price fixes. | This file stops at expired-deposit recovery; it is not the complete later session. Do not restart its old next step blindly. |
| XRBC liquidity/receipt | Prior conversation reports progressed through deposit/withdrawal and optional receipt work. | This savepoint does not independently reconcile the later transaction hashes or current pending state. A receipt NFT is not an LP token or redemption right. |
| Readiness | [!67](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/67) records live confirmation of !66 integrity fix; [!68](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/68) records live RLUSD loading after !67 and a tested manual-refresh repair. Both merged. | !68 description leaves post-fix live manual refresh confirmation pending. Do not call !66 still unconfirmed. |
| Extended Auditor / Forensics | [!69](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/69) records Extended 6/6 methods; [!70](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/70) records Forensics recovery 9/9 and Ecosystem scan of 13 tokens. | Recorded historical observations, not fresh tests. Temporary failures can recur. |
| Liquidity Scanner | [!70](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/70) fixed the missing SDK return; [!71](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/71) records live connection and 20/20 lookup recovery. | Avoid repeating an already recorded successful connection solely for context recovery. |
| XRBitcoin, separate from XRBC | [!71](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/71), [!72](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/72), [!73](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/73), [!74](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/74) merged startup-event, returned-path, API-v2 Amount/DeliverMax, and bounded pre-sign RPC recovery corrections. | Focused checks are recorded; !73 explicitly leaves live completion recheck pending. !74 addresses a withdrawal preflight HTTP 502, not proof of a later successful withdrawal. Ask before any new signing or uncertain code change. |
| Value Path / Watchtower | Retrieved prior-conversation summaries report later successful checks, including Watchtower full reported coverage. | Treat as historical assistant-reported context, not independently reverified source/ledger evidence. Coverage is not a safety rating. |

Do not conflate fixes in the interface with defects in XRPL consensus or the Xaman wallet itself. Keep XRBC and XRBitcoin/XRB app and token identities separate.

## Open blocker and next action

Earlier in this conversation, browser navigation was denied for a usage limit; no live page was opened in that attempt. A model-setting change is not evidence that access recovered. Do not retry or bypass that denial without evidence of recovery; independent repository reads remain usable.

First resume step: identify the user's current page and last unfinished symptom from their current screen or a narrowly targeted session record. A screenshot can resolve this without creating a wallet request. Then choose one read-only acceptance check; the source records above identify candidate unresolved confirmations, not automatic instructions to trade.

Do not repeat the previously suggested 1-XRBC sell as the default next test: it was based on an older handoff and ignores subsequent work. Never mark unknown transaction state clear just because memory is incomplete, a request expired, or CI passed.

## Scope of this savepoint change

Only the continuity repository receives the compact Markdown overlay, entrypoint notices and read-only loader with focused tests. Application HTML/JS/JSON, backend, gates, fees and signing logic are unchanged. No wallet request, transaction, website deployment or background process is created. The old JSON graph is retained as historical compatibility state, not silently presented as current XRBC debugging state.
