# XRBitcoin Sidebar Project Boundary — 2026-09-22

Scope: XRBitcoin (XRB) navigation only.

The XRBitcoin workspace and XRBitcoin security reference were cleaned so the main XRBitcoin sidebar no longer exposes XRBitcoinCash-only tools. The project boundary is now explicit: XRBitcoin keeps its own Exchange, Limit orders, XRB Watchtower, Security, and Support navigation. Cross-project navigation remains limited to the existing XRBitcoinCash, JCS, and Creature NFT ecosystem links.

Frontend source of truth:
- GitLab project: `xrbitcoincash-group/xrbitcoincash-project`
- Branch: `master`
- Implementation commit: `be62d4ce19f44bd4c94a6044e78d47b4c81067ea`
- Pipeline: `2870778794`

Removed from XRBitcoin sidebars:
- Liquidity scanner
- Auditor
- Risk Lens
- All tools

Preserved:
- Exchange
- Limit orders
- XRB Watchtower
- Security
- Support
- Related-project links: XRBitcoinCash, JCS, Creature NFT

Safety / regression notes:
- `public/xrbitcoin-links.html` executable inline scripts remained byte-identical.
- `public/xrbitcoin-security.html` remains scriptless.
- The change is navigation/presentation only; Xaman, wallet, signing, ledger, market, liquidity, receipt, and validation behavior were not changed.
- Pipeline `2870778794` completed successfully: runtime-contracts, repository validation, secret detection, Semgrep SAST, and Pages deployment all passed.

Operating rule:
Do not re-add XRBitcoinCash analysis/tool links to the XRBitcoin project sidebar. XRBitcoinCash, JCS, and Creature NFT belong only in the explicit related-project links unless the user separately requests deeper cross-project navigation.
