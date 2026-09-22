# Project-Wide XRBC Sidebar Shell — 2026-09-22

XRBC application/tool pages now share the same exchange/workbench navigation direction as Trade and the Liquidity Pool.

Shared visual layer: `public/xrbc-dynamic-ui.css` v1.3.0.
Shared shell commit: `cae5a7947650df975e63aeba31dc6ca63ab5e309`.
Core tool migrations: `8abc8f784d9a1e40ea3557c4b27989350a3167f6`, `a26d2f41b39e9ce42a91e0021a7a84de92e9a486`, `dff9badd9053366001787412c8fe6e4c44d08479`.
Additional migrations: Developers `8109604e58f085cdfcc52a73cef6b54c6db88334`, Markets `c963c6286c584cf712e48901480b51e33b7855f9`, Liquidity Receipt `343bdc3673a3141ce4b84b4ef71e4586cece929d`.
Implementation pipeline `2870518110` and final memory pipeline `2870524422` passed completely.

Desktop XRBC tool pages now use a fixed 220px left rail with brand, vertical navigation and compact controls. Smaller screens retain compact top navigation. The shared body hook is `xrbc-tool-exchange-shell`.

Literal escaped-newline artifacts were normalized where found, including the homepage and liquidity receipt.

This work is visual/markup-class focused. Wallet/Xaman behavior, signing protections, challenge/memo binding, gates, market/order/trustline/AMM logic and validated finality remain unchanged. Developers and Liquidity Receipt executable script fingerprints stayed byte-identical; Markets has no executable inline scripts.

Separate JCS redirect, XRBitcoin-branded pages and the scriptless DEX holding page remain intentionally distinct instead of being forced into XRBC tool navigation.

Next phase: simplify the individual tools for non-developers while keeping raw technical evidence behind progressive disclosure.
