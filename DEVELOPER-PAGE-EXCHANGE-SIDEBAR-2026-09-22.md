# Developer Page Exchange Sidebar — 2026-09-22

The Developer/API Workbench page now belongs visually to the same exchange/workbench family as Trade and XRBC Liquidity Pool, while the tool pages retain their separate tool-oriented navigation shell.

Frontend implementation:
- shared CSS commit: `638e01f22c909b170eec9ed6c6eb77cd7b6e8343`
- Developer page commit: `0493ff6e52418c1675efe7a3e4d4419c5ab106cb`
- pipeline: `2870557261` success
- local checkpoint: `docs/checkpoints/DEVELOPER-PAGE-EXCHANGE-SIDEBAR-2026-09-22.md`
- local memory commit: `8950f51dbd2c423c7f9a7cdac5ab0f3a5ae27608`
- shared UI version: `1.3.1`

The root conflict was the legacy `xrbc-dev-app-header` class. Its page-local high-specificity grid/header rules kept the Developer page in the old top-header presentation even though shared exchange-sidebar classes were already present. That legacy class is no longer active on the Developer header.

Developer now uses `xrbc-developer-exchange-shell` with the shared exchange sidebar hooks. Desktop has a fixed 220px left rail with Developers active and the theme control at the bottom. At <=900px it collapses to compact top navigation.

The API Workbench, code console, endpoint catalog and developer-specific technical identity remain intact. This was presentation-only: both executable inline script blocks are byte-identical before/after (310/`41f4185c`, 2142/`afc2e163`).

Compartmentalization rule:
- Trade / Liquidity / Developers = exchange/workbench family.
- Security/analysis/tool pages = separate tool shell.
- Do not merge the full tool navigation catalog into the Developer page.
