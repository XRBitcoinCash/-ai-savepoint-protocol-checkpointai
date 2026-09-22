# XRBitcoin wallet events and sidebar — 2026-09-22

Checkpoint `SAVEPOINT-2026-09-22-xrbitcoin-wallet-events-sidebar`. [MR !12](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/12), implementation `f08dcae3ecef604e0b86b261dcdfc01788fcba91`, merge `a46172c91d1f9d0cdcd0f151c83c406090e8a25c`. Rollback baseline `0dcf99de7f4e5f6847689e298c1a7684d1b81369`.

The screenshot page is XRBitcoin (`xrbitcoin-links.html`), not the XRBC homepage. Its 1180px top-header breakpoint contradicted the saved Liquidity layout. It now keeps a fixed, scrollable left rail above 900px: 188px through 1180px, then 220px. Compact top navigation only at <=900px. Removed the redundant header wallet shortcut; the canonical Connect Xaman remains above action forms. Preserve visual-family consistency while keeping app/token identity distinct.

The actual-source reproduction showed browser success events could leave the active connection pending. A page-local bridge now accepts current SDK success/retrieved/ready or authorize() completion only for the deliberate current attempt. It rereads the current account getter and retains validated ledger readiness plus app/account verification before adoption. Cancellation, timeout, old SDK events and duplicates are guarded. xApp behavior and financial request guards remain.

Validation: 37 tests (13 new event cases), runtime contracts for 10 pages and gates for 12 tools/7 tiers pass. Seven-width source CSS comparison with Liquidity passes. Updated two inline CSP hashes and CSS cache key to `20260922-3`. Browser confirms served DOM/CSS and bridge; real Xaman authorization is not verified. Narrow-device geometry remains to compare on the user's device. Existing 19 advisory site findings remain.

Historical price data is separate: direct Sologenic XRB OHLC remains unavailable, recorded as XRB-009. The existing XRBC backend history route pins a different asset; do not substitute it. No backend changes or invented price data.

Next checkpoint: device retest XRB-001/007/008; then diagnose XRB-009. Evidence: `memory/audits/2026-09-22-xrbitcoin-wallet-events-sidebar.json`. SDK event semantics: https://docs.xaman.dev/js-ts-sdk/sdk-syntax/xumm.on-event-fn .
