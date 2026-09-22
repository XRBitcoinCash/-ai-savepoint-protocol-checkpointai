# Next run — XRBitcoin wallet and sidebar

Active: `SAVEPOINT-2026-09-22-xrbitcoin-wallet-events-sidebar`. Read `memory/savepoints/SAVEPOINT-2026-09-22-XRBITCOIN-WALLET-EVENTS-SIDEBAR.json`, the operating protocol and known errors.

MR !12 merged as `a46172c91d1f9d0cdcd0f151c83c406090e8a25c`; implementation `f08dcae3ecef604e0b86b261dcdfc01788fcba91`. Frontend `public/xrbitcoin-links.html` now has one canonical Connect Xaman action and the shared left-sidebar geometry above 900px. XRBC homepage/Liquidity unchanged by this repair. Keep XRB token and Xaman app identities distinct.

37 tests pass, including 13 new browser-event cases. Runtime/CSP and gate checks pass. Seven-width source CSS parity passes; live desktop/served CSS and bridge verified. Real Xaman authorization and narrow-device geometry are unverified. Existing 19 advisory site-validator findings remain.

Next: XRB-001 device retest (first click, cancel, retry), alongside XRB-007/008. XRB-009 is the separate historical Sologenic feed failure; do not reuse the XRBC-only history relay. Keep pending-request guards and one reviewed payload per intent.

User execution preference (2026-09-22): Keep work narrowly limited to the requested action and conserve credits. For deployment requests, deploy the requested page, perform only essential checks, make a concise checkpoint update, and stop. Do not add audits, broad research, screenshots, extra test suites, repeated verification, or unrelated repairs unless needed to resolve a concrete blocker or explicitly requested. Reuse existing evidence. Ask before materially expanding scope; do not ask again for an already authorized deployment. Keep final reports brief. This supersedes broader optional workflow steps.
