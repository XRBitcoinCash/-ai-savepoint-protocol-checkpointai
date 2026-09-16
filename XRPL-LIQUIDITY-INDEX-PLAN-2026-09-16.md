# XRPL Liquidity Index — research and first-build plan

Status: research/design only; no page, collector, new API, or monitoring service has been deployed.
Recorded: 2026-09-16
Owner: XRBitcoinCash
Proposed frontend: GitLab project 75781181, `public/xrpl-liquidity-index.html` on `master`.
Memory baseline: `f2fe592aed8b3264f274b6eb3a0e3b3a0f6e9d32` in `XRBitcoinCash/-ai-savepoint-protocol-checkpointai`.

## 1. User intent and boundaries

Create a readable public token directory, using a familiar market-table layout but original XRBC styling. Rank liquidity rather than social popularity or market capitalization. Show token images where available, exact identities, current observations, and expandable anomaly evidence. Direct visitors to the existing wallet-analysis tools for personalized/deeper inspection. Keep XRBC holding gates; do not create a free replacement for the gated tools or add fiat passes.

The user requested research and a memory update before a later build, with heavier upgrades reserved for a future work session. This pass changes memory/planning documents only. Do not begin background monitoring, rewrite a trading page, deploy a collector, change Render settings, subscribe to a paid API, or relax network policies based on this plan alone. The first implementation can use deterministic code; no continuous AI inference is needed to rank numeric observations.

Keep public HTML directly in `public/`, with a distinct filename. Preserve `public/index.html`, `public/xrbitcoin-links.html`, `public/xrbitcoin-security.html`, the routing fix, all signing flows, token identities and shared backend. Older attached trading pages are references, not current production templates; do not revive their retired Quick Buy constructors.

## 2. Findings from source inspection and research

**Existing project source:** GitLab search of `public/index.html` on master found XRPL Meta discovery endpoints `/v2/tokens/iou` and `/v2/tokens`, per-token metadata `/v2/token/`, and a trading discovery trust-level filter of 2 and 3. A public directory must not accidentally inherit that filter while claiming universal coverage, and displaying additional assets must not expand permission to trade them.

**Existing proxy source:** `XRBitcoinCash/xrbitcoincash.github.io/xrpl-proxy/rpc-policy.cjs`, blob `ecf8aa23785a779293fcc449b93789ccbdf8ce57`, permits `amm_info`, `account_info`, `account_tx`, `book_offers`, `ledger`, `ledger_data`, `tx`, and other evidence reads. It rejects unsupported method names, batch-array bodies and wallet-secret fields. This confirms source-level method allowance, NOT live uptime, throughput, complete history, CORS compatibility or deployment parity. Do not POST a subscription command to the HTTP proxy or assume a WebSocket route exists.

**Retrieval limitations:** The connector returned an empty content field for the large shared `server.js` while supplying a nonempty blob SHA. This is not evidence of an empty deployed server. Local read-only attempts to retrieve a two-token metadata sample and one validated-ledger response failed at DNS resolution. No live compatibility or capacity test succeeded. An environment lookup failure must not be described as a project outage.

**Metadata:** XRPL Meta documents token listing, metadata sources, pagination and cached icon URLs; its issuer page identifies Xaman as an icon consumer. This is a documented alternative to scraping websites or resolving identities from a small logo image. Metadata and logos are off-ledger information, not security certification. Verify current terms and icon reuse/caching permissions before public integration.

**Other providers:** XRPL.to documents token/AMM APIs and requires visible on-screen attribution when displaying its data. Re-serving its data through our own API or dataset needs prior permission. It is an optional provider, not a dependency to scrape or silently mirror. Do not copy its scam blocklist into our own conclusions. No provider partnership, permission, account, or payment was established here.

**Protocol:** `amm_info` describes a particular pair and returns assets, reserves, fees and ledger context. `book_offers` gives funded order-book information. `account_tx` provides paginated account history whose actual available range must be checked. `ledger_data` can enumerate a pinned ledger, but filtered pages may be empty while a continuation marker remains. None is a one-request complete global token/liquidity/anomaly directory.

## 3. First-version product scope — proposed, not implemented

Working title: **XRPL Liquidity Index — by XRBitcoinCash**.

Use a searchable, sortable table with token image/name, exact issuer and currency, direct XRP-AMM reserve, token-side reserve, fee, ledger/time, data coverage and an expandable evidence control. The headline ranking is **XRP reserve in each token's direct XRP AMM**, descending. Native XRP is the quote asset, not a fabricated issued-token row. Limit v0.1 to classic trust-line issued assets; state that MPTs and other asset types are outside this first scope.

Begin with a bounded explicitly disclosed catalog, for example 50–100 exact asset identities, with 25 rows visible at a time. It is a **tracked-set ranking**, not "the ledger's top 100". Sorting the first 100 holder-ranked metadata results by liquidity does not yield the global top 100 by liquidity. The screenshot's unresolved logos must not become invented issuers. List inclusion rules, exclusions, catalog size and check coverage. Apply the same measurements to XRBC and other projects; no favorable manual ranking.

Basic states: pool verified, no direct XRP AMM found at the checked ledger, lookup unavailable, stale observation, and unsupported scope. An unknown value must not become zero. "No direct XRP AMM" does not mean no token/token pool, no order book or no trading route. Presence of a pool does not prove a usable exit, safety, or a price floor.

Show actual XRP reserve separately from any two-sided pool value. Do not label both sides valued at the pool's own spot rate as spendable XRP. Do not combine illiquid token/token valuations into ranking totals. In later multi-pool coverage, deduplicate pools when computing ecosystem totals and disclose valuation and quote-asset assumptions.

The directory requires no wallet connection to browse and has no trade, trust-line, mint or wallet-signing constructor. A **Scan my wallet** button opens `liquidity-sentinel.html`; **Deeper analysis** leads to the existing gated tools. Pass an issuer/currency to an existing tool only after verifying that tool's input contract; a query string does not prove integration. No new gate thresholds are assigned in this plan.

## 4. Safe data handling and refresh

Key assets by network + exact issuer + canonical currency bytes, not name, image or ticker. Preserve case-sensitive addresses and legitimate currency encoding distinctions. Validate metadata identity, AMM pair and numeric domains. Identify the XRP side from the returned amount type; response order need not match request order.

Use integer drops and decimal-aware issued values. XRPL AMM `trading_fee` is in 1/100,000 units: fraction = raw / 100000 and percent = raw / 1000. For example, 30 is 0.03%, not 0.3% or 0.003%. An illustrative quote must state direction, fees, assumed size and scope; do not call a modeled AMM-only result a guaranteed executable or best-routed quote. Account-specific auction discounts and restrictions need separate handling.

Pin each comparison to a validated ledger hash/index where possible. Publish ledger close time, fetch time, source, requested/actual coverage and errors. Mixed-ledger observations need an explicit label. Refresh success must not silently hide failures for some rows.

Initial proposal: a bounded initial check, user-controlled refreshing, visible-row priority, low concurrency, timeouts, request cancellation and exponential backoff. A tentative 60-second refresh interval is subject to a live capacity check, not a current service promise. Pause hidden tabs and do not fetch history for every asset continuously in every browser.

Scale-up architecture: one authorized collector retrieves/validates observations, saves history and serves a shared cached snapshot to many visitors. Reuse the existing Render host only after reviewing deployment configuration, rate limits, upstream terms and resource isolation. Persistent history/worker infrastructure may require a separate service or datastore; neither is assumed to exist. New routes and scheduled jobs require their own bounded implementation and authorization. There is no invented live API endpoint in this plan.

For images, prefer provider-cached, allowlisted HTTPS hosts or reviewed local assets; lazy load, suppress referrers and show a text fallback. Do not insert arbitrary SVG/HTML from metadata into the DOM. A future server-side image fetcher needs explicit host/IP restrictions, redirect checks, MIME/size/time limits and caching permission; do not introduce an open URL proxy. Keep private API keys server-side. Use safe DOM text rendering and a narrow CSP.

## 5. Anomaly design

An anomaly is an observation needing context, not a fraud verdict. Show severity separately from evidence completeness; do not invent percentage confidence. No alerts means only that implemented rules found none in the observed scope. Not analyzed, incomplete history and unavailable data must stay visibly distinct from a clean result.

Each expanded observation must include: rule ID/version; measured value and denominator; threshold and why it was selected; time/ledger window; sample size; affected pair/accounts; transaction hashes and execution indexes when relevant; plausible ordinary explanations; limitations; and a route to report a reproducible correction. Retain an auditable correction history. Never name a beneficial owner based solely on a wallet label or funding transaction.

Candidate observations for later calibration:

- **Trading concentration:** fraction of executed pair activity attributable to the most active initiating accounts. Account count is not person count; market makers may dominate a small market normally.
- **Repeated round trips:** repeated opposite-direction executed swaps with low net inventory movement. This can be arbitrage, rebalancing or bot testing, not necessarily wash trading.
- **Volume/depth mismatch:** executed volume unusually large relative to time-aligned liquidity and its own baseline. High turnover alone does not establish fake volume; intermittent history invalidates an asserted 24-hour comparison.
- **Liquidity change:** reserve and LP-supply changes, distinguishing swaps from deposits, withdrawals and ordinary valuation changes. A falling XRP reserve is not automatically liquidity-provider removal or a rug pull.
- **Issuer setting change:** explicit on-ledger freeze, authorization or other relevant setting changes, described as controls/conditions. Such settings can be expected for some assets and are not proof of malicious intent.

Behavioral metrics require actual executed metadata, not raw transaction counts or OfferCreate requested amounts. Ignore failed/proposed transactions for executed volume, deduplicate hashes across feeds, use ledger index + TransactionIndex for ordering, and distinguish initiators from pool accounts and routing intermediaries. A Payment can involve multiple markets; a same-account cross-currency payment is not automatically wash trading. Normalize API v1/v2 shapes deliberately. Do not assume that seeing the same AMM account on every trade identifies one human trader.

Begin v0.1 with verified snapshot facts and explicitly labeled changes between valid observations. Introduce historical concentration/round-trip badges only after the collector/parser, coverage accounting and benign-pattern regression tests exist. Do not invent anomaly results or silently expose the full gated forensic product through the public table.

Research by Victor and Weintraud (2021) studies wash-trade structures on Ethereum order-book DEXs; it supports reviewing executed structures, but its labels, thresholds and prevalence must not be transferred to XRPL AMMs without validation.

## 6. Acceptance and later upgrades

Before publishing a first version, test: exact-identity collisions; reversed AMM amount order; fee units; drops/decimal precision; missing/empty metadata; unsafe icon URLs; malformed numbers; not-found versus timeout/429; partial pagination; stale and mixed-ledger data; sorting only checked rows; no data becoming zero; hidden-tab pause; duplicate request prevention; keyboard/mobile layout; honest export timestamps and scope; no wallet credentials or signing behavior; preservation of existing pages and gate requirements.

Before behavioral claims, add fixtures for ordinary arbitrage, market-making, genuine buys/sells, deposits/withdrawals, routed payments, repeated fee-only failures, duplicate feeds, account-versus-person ambiguity, missing historical intervals and manipulated metadata. Track false positives and publish rule versions. An evidence export can include a content hash, but a hash is not proof that source observations or analysis are correct.

Upgrade order: broader exact-identity discovery; shared snapshots; persistent 24h/7d history; well-defined behavioral observations; funded order-book and multi-pair exit analysis through existing gated tools; optional evidence-bound AI explanations with review. Do not wait for an AI model to calculate deterministic reserve rankings, and do not ask an AI model to invent fraud probabilities.

## 7. Sources checked

Project source:
- https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/blob/master/public/index.html (XRPL Meta discovery configuration inspected via connector search)
- https://github.com/XRBitcoinCash/xrbitcoincash.github.io/blob/main/xrpl-proxy/rpc-policy.cjs (inspected blob recorded above)
- https://github.com/XRBitcoinCash/-ai-savepoint-protocol-checkpointai (canonical memory)

Primary external documentation and research:
- https://xrplmeta.org/docs
- https://xrplmeta.org/docs/websocket/list-tokens
- https://xrplmeta.org/issuers
- https://xrpl.to/docs (attribution and re-serving conditions)
- https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/amm_info
- https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/path-and-order-book-methods/book_offers
- https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger_data
- https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_tx
- https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/subscription-methods/subscribe
- https://xrpl.org/docs/references/protocol/transactions/metadata
- https://xrpl.org/docs/concepts/tokens/decentralized-exchange/automated-market-makers
- https://arxiv.org/abs/2102.07001

These are source-level findings and a proposed implementation plan. They are not a live 100-token audit, a security certification, provider permission or evidence that any particular project is fraudulent.
