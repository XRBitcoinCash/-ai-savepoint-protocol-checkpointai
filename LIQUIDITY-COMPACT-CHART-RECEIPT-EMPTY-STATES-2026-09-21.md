# Liquidity Compact Chart + Receipt Empty States — 2026-09-21

Implemented in the active GitLab frontend at `350a5f343136195e7a05c674c5941e1a48e5d00c`. Pipeline `2868575025` passed completely. Local checkpoint commit `ba24ffde455979ec62ecbc74791425ea246a23ae`; pipeline `2868579101` also passed.

The Liquidity Pool is now release `0.2.4`.

## Advanced Market Chart
The Advanced Market Chart is optional secondary context and is now collapsed by default using native progressive disclosure. When opened, the outer chart container no longer uses a nested max-height/scroll window; it grows naturally inside the card and the page scrolls instead.

## Receipt cards
The latest deposit/withdrawal cards no longer show bare dash placeholders when no receipt is available.

Empty receipt cards now show:
- subtle XRBC/XRP movement;
- explicit wallet/receipt state;
- a large `Connect / inspect wallet ↑` action to `#walletHeading`.

Actual amount rows, receipt exports and NFT-receipt controls stay hidden until a verified receipt exists. Once available, real receipt data replaces the empty state.

## Reusable UX rule
Optional or uncertain analytics should default to progressive disclosure. Account-dependent cards without meaningful data should show an intentional empty state and the clearest next action, not punctuation placeholders, fake values or zeros.

Motion can make an empty state feel alive but must never suggest that a ledger transaction is taking place. Respect reduced-motion preferences.

No intended changes were made to wallet authorization, AMM/trade/trustline transaction logic, signing/finality, or the market-history backend architecture.
