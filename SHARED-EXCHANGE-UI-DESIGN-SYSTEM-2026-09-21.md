# Shared Exchange UI Design System — 2026-09-21

XRBitcoinCash now has an opt-in project-wide exchange/workbench presentation system in `public/xrbc-dynamic-ui.css` v1.1.0.

Pilot: XRBC Liquidity Pool, implementation commit `fde15e74b4012a3981b89cad5fdae089331f860e`, pipeline `2868371281` success.

## Permanent design direction
Use a compact modern exchange/workbench information architecture: neutral black/charcoal surfaces, thin borders, dense cards/tables, segmented action controls, a clear primary work surface and optional secondary account/action rail. Blue is the default primary action. Green/red are reserved for real semantic state or directional meaning. Amber is for security/attention.

Avoid decorative green/red lines, scan effects, glowing grids, or motion that does not communicate a real functional state. Prefer existing XRBC/token imagery and CSS-native icons over decorative stock imagery.

Keep beginner-facing actions prominent and plain-language. Technical/raw evidence remains accessible but visually secondary through cards, tables, details/summary and other progressive disclosure.

## Migration method
Future visual migrations should use the existing shared `xrbc-dynamic-ui.css` rather than reproducing large page-local style blocks.

Pages opt in with `body.xrbc-exchange-shell` and reusable `xrbc-exchange-*` hooks. Migrate one page at a time.

For visual-only work:
- preserve existing IDs, data attributes, names, controls, event targets and script order;
- prefer CSS/native disclosure mechanisms before adding JavaScript;
- compare executable script blocks before/after and require byte-identical scripts;
- check duplicate IDs and runtime-contract CI;
- browser-review desktop/mobile before using that page as the next visual reference.

Do not force the exchange shell globally onto unreviewed pages.

## Liquidity Pool pilot
The Liquidity Pool release marker is now `0.2.0`. It uses a fixed desktop navigation rail, compact responsive top navigation, primary Liquidity Manager, secondary Xaman rail, dense neutral market cards and segmented actions. Decorative green chart scan/grid effects are disabled.

All 14 executable Liquidity Pool script blocks were byte-identical before/after the redesign. No duplicate IDs were introduced. No wallet, AMM, quote, trustline, signing, finality, NFT or gate logic was intentionally changed.

Browser visual review remains the next step.
