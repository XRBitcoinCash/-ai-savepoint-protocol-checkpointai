# JCS workspace layout — 2026-09-22

Fix `ba43da147fa6bf7ec743ecb24d755dfd19da8b32` in `XRBitcoinCash/JCS-token-on-the-XRPL`, main. Baseline `660fd2d78c07f282a2d3f39b09b7145b70af11b1`.

The Trade/Liquidity/My NFTs tab handlers worked. Two persistent receipt cards were inserted immediately after the tab bar, pushing the selected panel about 923 pixels down on the inspected desktop. The older receipt implementation (`1c2c16b...`) hid the receipt until a transaction; later versions added permanent receipt tools above all tab panels. This was a layout problem, not missing trading/liquidity JavaScript.

Move the receipt entry and actions below all three panels, preserving existing receipt links and handlers. Add local XRP and JCS logos to pair headings, balances and liquidity amount labels, plus direction-aware quote label icons. Reuse the existing XRBC/XRB XRP SVG and record provenance beside it. Leave legitimate disconnected balance placeholders as unavailable data. Sidebar and financial logic preserved. External stylesheet cache version is `20260922-2`.

Files: `index.html`, `js/jcs-nft.js`, `js/jcs-liquidity.js`, `css/jcs-exchange-ui.css`, `assets/tokens/xrp.svg`, `assets/tokens/README.md`. Source and corresponding embedded sections updated narrowly; newer inline trading/receipt code retained.

Essential verification: live tabs switched correctly before the change; changed source and inline scripts parse. No wallet authorization, financial transaction, broad audit or repeated suite. User preference: keep the selected tool directly below its tabs, optional receipts underneath, and token imagery consistent across JCS/XRBC/XRB. Maintain distinct issuers and Xaman application IDs.

Deployment: GitHub Pages run 35744758719 succeeded. Public page serves CSS `20260922-2`; all three tabs display their panel, and receipts begin 24px below each selected panel. Five local XRP images loaded successfully. JCS-002 layout issue is resolved at the inspected desktop width. Real wallet/trading verification remains separate.
