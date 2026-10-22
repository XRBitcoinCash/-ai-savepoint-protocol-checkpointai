# XRBC liquidity castle — monitored vaults, 2026-10-22 UTC

Intent and authority:

Show Evernorth XRP and XRP escrow amounts, track ledger changes, open separate drawbridges for verified inflow/outflow within a rolling 24 hours with amounts, and label the middle trading point Nexus. Continue the authorized existing homepage Live Metrics repository/deployment workflow. Preserve accepted timers/motion and shared saved observations. No new service, bill, storage, CSP origin, backend, wallet/signing or P2P change. P2P draft MR !111 and backend draft PR #2 remain held, unmerged and undeployed.

Source identity and prepared release:

GitLab xrbitcoincash-group/xrbitcoincash-project, project 75781181. Baseline master ff6d8a518edce8f7cfcf6294d6c8bdfde2efbacc. Branch codex/xrbc-vault-bridges-20261022, candidate f58aff4d148c4a0538e3b6ef1ec6388be9609e52, MR !117: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/117 . Source/local/CI passed; merge and deployment pending this checkpoint.

Nine paths: public/index.html; public/xrbc-liquidity-castle.js, -scene.js, .css, -ui.css, new -vaults.js; tests/unit/liquidity-castle-ui.test.mjs and new -vaults.test.mjs; docs/liquidity-castle.md. Four asset versions and one same-origin deferred script change in index. All 14 original inline bodies, existing index IDs and CSP identical to baseline. Model/exchange/ledger/history/flow algorithms and unrelated paths preserved. Remote/local index/controller/reader hashes match; reader SHA256 86c22ff4bc92410760d3efcd7ccbecab5f5bc00179b9decb6a53c297d7028a2d.

Previous deployment reconciled on this new authorized turn:

MR !116 candidate 1559bc40f2c05e1908ee382bbdb757b543597eb0 merged to ff6d8a518edce8f7cfcf6294d6c8bdfde2efbacc. Production pipeline 2974495489 / deploy-pages 17367911291 succeeded, as did its runtime/validate/snapshot/semgrep/secret jobs. Checkpoint 5679ec5e62c83dfcddffe7643eff3050ce011042 was saved before deployment and still said pending. Retain original dated evidence; this turn reconciles it. Oct20 brief/evidence preserves older v1/v2 history.

Implemented behavior and durable boundaries:

- Pinned validated native balances for two independently attributed Evernorth wallets; native XRP escrow owned by twenty accounts in Ripple's official TOML. These are monitored subtotals, not company-complete treasury or all XRPL escrow. Ownership attribution is not company-confirmed; eleven inferred custody addresses excluded. Dated 473M Evernorth / 32.6B Ripple disclosures remain separate from monitored amounts.
- Reuse only https://xrbitcoincash-github-io.onrender.com; read-only ledger/server_info/account_info/account_objects/account_tx, credentials omitted and redirects refused. Poll every five minutes while visible: 15s request / 85s scan / 90s UI deadlines, at most 100 requests, concurrency 3, two pages/account, 8MiB total. No extra provider, origin or runtime treasury feed.
- Separate bridges lower for positive validated events inside rolling 24h, with exact integer drops, stable IDs, dates and read-only transaction links. Gross observed in/out separate; net zero can mean activity. Retain up to 256 facts/group in memory until 24h expiry across refresh failure, staleness, hide and Explore. Balance freshness separate. Explore invents no treasury balance. Pause/reduced motion only affect presentation.
- Ripple additions/removals identify native escrow objects by owner, including third-party-submitted Finish/Cancel. Removal is not proof of sale. Evernorth native balance changes exclude known fees/internal pair transfers; complex transactions cannot prove complete gross corporate flows.
- Public upstream hostname has no serving-node binding between server_info and account_tx. Final historySourceBound=false prevents a complete 24h zero claim even with reported complete_ledgers and exhausted pages. Positive events remain partial; no event remains unknown/null. Closed requires a future genuinely complete fresh proof. Preserve this guard.
- Nexus centered over trading ring; stationary R/E holdings pieces imply no sale. Listed XRP stays on a separate apron. Reviewed CSS fixes isolate scene overlays from evidence cards; <=1200px cards enter normal flow and <=520px stack. Static/source findings do not certify rendered mobile geometry.
- Bid/ask multiple remains resting notional in the stated band, not a price-gain prediction. Keep USD exchange depth, RLUSD DEX/AMM, taker trades and completed-UTC YoY price/volume separate. No invented global exchange share or historical depth.

Sources and dated live observation:

Official https://ripple.com/.well-known/xrp-ledger.toml returned HTTP200 with twenty matching addresses. Primary XRPL account_objects/account_tx/server_info docs reviewed. No official company-complete real-time Evernorth API or complete wallet set verified. Independent https://xrp-insights.com/xrp-radar/evernorth/data.json is hourly attribution, not official; its cumulative outflow/signed-only history does not prove 24h gross flows and is not fetched by the app. XRPSCAN account pages/fact endpoint returned403: no unchanged retries or invented response fields/cadence. ObjectCountEscrow is a count, not XRP. Details in application docs and research evidence.

Pre-final-reader HTTP smoke: 47 requests / 66,033 bytes; validated ledger 107817910 closed 2026-10-22T02:21:21Z. Two-wallet balance 45,920,883.000423 XRP; twenty-owner escrow 31.4B XRP. Two observed outgoing wallet events within 24h totaled 41,963,824 XRP, partial and not proof of a corporate sale. Smoke preceded final DeliverMax alias and node-binding guards. Its Ripple complete-zero flag was rejected after routing review; final absent-history result is unknown/null. Amount/event facts remain dated observations, not exact-final-reader browser/CORS or current quote certification.

Evidence and environment:

Six new scoped records in memory/evidence.json: XRBC-vault-source/local/CI/live/research-2026-10-22 and XRBC-Nexus-deployed-reconciled-2026-10-22. All 166 focused castle/saved-display tests passed at final JS, included in CI 786, not additional. Reader31/UI27 cover bounds, exact drops, aliases, unbound zero, retained positives, polling, deadlines, cancellation and 24h expiry. Syntax passes. CSS-only selector isolation followed with independent review; no remaining material source finding.

Exact candidate pipeline 2974581160 succeeded. Runtime 17368475733 passed 786 tests, zero fail/cancel/skip. Validate 17368475734 and homepage-snapshot 17368475735 succeeded. Existing validation is advisory, not strict sitewide clearance; prior unrelated metadata/sitemap/reference findings are not claimed fixed. Root inspected open/unknown static SVG proofs. Full-page/mobile rendering, new browser timers/live-CORS and predictive validity remain unverified. Local Playwright exists but Chromium executable absent; no install/retry. Connectors, Node and public research available. No financial transaction performed.

Continuation and stop:

After validated checkpoint publication/readback, merge MR !117 at exact f58aff4d148c4a0538e3b6ef1ec6388be9609e52 and follow production Pages. Accept scoped balances, truthful partial/unknown history and finite independent loading. No code/CI blocker; company-complete/global coverage remains explicitly unresolved.

Immediately on successful requested website deployment, stop ALL tools, including browser, cleanup and checkpoint writes. A new explicit user turn is required to resume and reconcile deployment. No post-deploy exception. Follow AGENTS.md, memory/CONTINUITY.md and selected xrbc_liquidity_castle route. Preserve default/all other routes and holds. No private financial records, credentials, raw logs, screenshots or temporary paths in public memory.
