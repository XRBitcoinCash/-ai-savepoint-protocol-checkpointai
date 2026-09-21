# XRBitcoinCash Discovery, Brand & Favicon Checkpoint — 2026-09-21

## Scope
Static discoverability/identity hardening only. No wallet, XRPL transaction, AMM, quote, gate, order or signing JavaScript was intentionally changed.

## Source baseline
- Active frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`
- Branch: `master`
- Parent baseline: `2d192c95c6afad338365b265537984e896b4d473`

## Implementation
Commit: `68586a9af00f88253b60f7ee6137cec2b6dfa145`
Pipeline: `2867921308` — success

Added conventional root assets while retaining legacy URLs:
- `/favicon.ico` — real ICO container embedding the official 128×128 PNG
- `/favicon.png` — 128×128 PNG
- `/icon-192.png` — 192×192 PNG
- `/apple-touch-icon.png` — 192×192 PNG
- `/assets/brand/xrbc-logo-128.png`
- `/assets/brand/xrbc-logo-192.png`
- `/assets/brand/brand.json`
- `/brand.json`
- `/.well-known/xrbc-brand.json`

Preserved compatibility paths:
- `/xrbitcoin-logo-128.png`
- `/xrbitcoin-favicon.ico.ico.png`

Updated discovery surfaces:
- `public/index.html`
- `public/site.webmanifest`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/xrbc-metadata.json`
- `public/universal-ai.json`
- `public/.well-known/ai.json`

Homepage identity was strengthened from a generic market title to:
`XRBitcoinCash (XRBC) | XRP Ledger DEX, Liquidity & Tools`

Primary description now emphasizes:
- official XRBC portal
- XRP Ledger / XRPL
- non-custodial trading
- AMM liquidity
- Xaman signing
- risk analysis
- forensics
- tokenization

Schema.org Organization identity now links the canonical site plus official X/GitLab/GitHub references. Logo structured data points to the canonical 192×192 icon.

## Intent
This was not a ranking-manipulation pass. It reduces ambiguity for search engines, browser UI, machine agents, wallets and crawlers by exposing conventional, stable brand/icon paths while preserving older paths already in use.

## Verification
Pipeline `2867921308` passed:
- runtime-contracts
- validate-repository job
- secret detection
- Semgrep SAST
- deploy-pages

Repository validator still reports pre-existing advisory findings elsewhere; do not represent the entire site as having zero advisory findings.

## Follow-up
After deployment, request homepage reindexing in Bing Webmaster Tools and equivalent search consoles as appropriate. Do not add outbound IndexNow or crawler-notification behavior without a separately reviewed change.
