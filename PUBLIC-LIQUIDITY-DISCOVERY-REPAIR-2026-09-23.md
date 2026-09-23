# Public liquidity discovery repair — 2026-09-23

Active: `SAVEPOINT-2026-09-23-public-liquidity-discovery`. Machine record: `memory/savepoints/SAVEPOINT-2026-09-23-PUBLIC-LIQUIDITY-DISCOVERY.json`. Evidence: `memory/audits/2026-09-23-public-liquidity-discovery.json`.

## Implementation and cause

MR [!13](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/13), implementation `16fcf45800ad7bbf53796c2c03318fab363ae6ae`, base/rollback `a46172c91d1f9d0cdcd0f151c83c406090e8a25c`. Status: **deployed and served source verified; rendered device behavior unverified**. The observed backend head is `1c1fa1d41287af846c3be9d7233c319eb2b8a470`; this repair does not change the backend.

XRPL Meta checks whether `decode_currency` is present, so `decode_currency=false` still returns decoded currency labels. The same presence behavior applies to `original_icons=false`. Omitting these parameters restores raw asset identity. Decoded SOLO/RLUSD labels are not interchangeable with their actual ledger encodings. Generic unavailable states and holder/catalog-based discovery compounded the visibility problem; there is no evidence that a provider was deliberately concealing pools.

## Resulting behavior

- Public, wallet-free discovery starts with 50 candidates, including exact XRBC/XRB/JCS/SOLO seeds. XRPL.to reported TVL prioritizes candidates; broad Meta fallback/selection and exact lookup remain available.
- Bounded continuation grows discovery, with 50 rows initially and at most 100 rendered per page. Fresh direct token/XRP AMM reserves determine the displayed liquidity ranking among loaded tokens.
- Each result explains pool depth, missing direct XRP pool or a specific retrieval failure and retry action. Cautions use published 1,000/10,000 XRP depth bands and a 100-XRP reserve-share comparison. They do not claim an intrinsic value, executable quote or comprehensive safety score.
- One paced transient retry, rate-limit cooldown and bounded workers preserve recovery without an unbounded scan. Public browsing requires no wallet, holding or signature.

## Verification and boundaries

Nine focused tests pass; syntax and diff checks pass. HTML outside the permitted index/CSP blocks is byte-equivalent. Changed application file: `public/index.html`; support file: `tests/unit/public-liquidity-index.test.mjs`. Chromium was unavailable locally, so there is no local rendered/browser runtime claim. Read-only provider probes and CX1/JCS/XRBC pool requests succeeded; GCB returned `actNotFound`. These probes do not establish an end-to-end production-page check.

Limits: 50 discovery/pool checks per action; at most four Meta pages per action; two workers; 850 ms request-start spacing; 25 s request deadline; 180 s cycle/freshness window; catalog and observations retained in-session (no enforced 30-minute cache lifetime claimed). No exhaustive ledger claim: classic issued-token catalogs and direct XRP AMMs do not cover every asset type, other-pair pool or order book.

## Continuity

The user's measurable maximum discovery/usefulness/efficiency standard is in `memory/discovery-efficiency-standard.json` and `DISCOVERY-EFFICIENCY-STANDARD-2026-09-23.md`. Preserve exact raw identities, state evidence coverage, avoid fabricated risk conclusions, bound resource use, and run focused verification only.

Keep the existing queue unchanged: `XRB-001` device retest remains next, alongside `XRB-007/008`; `XRB-009` historical feed and other prior issues remain open as previously recorded. The new `LIQ-001` records this scoped repair and remaining runtime verification. No wallet connection, signing or financial transaction was tested.

## Final CI and deployment evidence

Final implementation `16fcf45800ad7bbf53796c2c03318fab363ae6ae` includes discovery attribution/source documentation in evidence exports. MR !13 merged as `8c13eaf222ea7a70b74837a474a496de3d22a531`. MR pipeline `2875015185` succeeded. Production pipeline `2875017821`, deploy job `16680915408` and runtime job `16680915404` succeeded: 46 tests passed, zero failed (37 existing plus nine focused cases). Runtime contracts cover 10 pages; gates cover 12 tools/seven tiers. Validator job `16680915405` retains exit 1 in advisory mode with the same 19 pre-existing findings. Semgrep and secret detection passed. No unrelated gate policy changed. Canonical served source and build are verified; no rendered browser runtime claim.

Provider source evidence: [XRPL Meta HTTP implementation](https://github.com/xrplmeta/node/blob/e38bef6882d78c4d04aeb8eb56ef055a833c80e7/src/srv/http.js); the coordinating agent corroborated raw currency output with a live omitted-parameter probe.

Canonical delivery verified: `build-info.json` and HTML build ID match merge `8c13eaf222ea7a70b74837a474a496de3d22a531`; public index script and directory markup match the final local source. Deployment timestamp: `2026-09-23T12:28:55Z`. HTTP source verification does not establish rendered browser, visual, device or wallet execution.

## Pagination follow-up — MR !14

User reported that selecting 100 still showed 50 and both page controls were disabled. The controls only paginated already loaded rows. The correction now loads missing rows when selecting 100 and lets Next discover another page; Previous reuses loaded rows. A navigation revision prevents a delayed Next response from undoing a newer Previous click. Filtered views remain limited to loaded results, with explicit footer guidance.

Implementation `9e8463eab7a2153ee5a1409af8b18a1bb519cb8c`, merge `a8d36ff73961a8eb06915968564770ccffeeb162`; [MR !14](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/14). Production pipeline `2875080550` and deploy job `16681397485` succeeded. Four added pagination tests pass (13 focused / 50 CI tests total); canonical served script and build were verified. Rendered browser/device execution remains unverified. CI's existing site-validator advisory findings remain outside scope.

Explicit page loading checks at most 100 newly discovered tokens; initial, refresh and automatic batches remain 50. Pacing, timeout, Stop, failure limits and HTTP 429 backoff remain. Successful checks no longer impose the ordinary 30-second navigation hold. All homepage content outside this script and the existing issue queue are unchanged. Earlier sections describe the MR !13 baseline.
