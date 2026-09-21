# Liquidity Pool Top Wallet + Xaman Countdown — 2026-09-21

## Implemented
Active frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, branch `master`.

UI implementation commit: `6df386f2b031f5b085232a0701ac0e1ea953aa87`  
Pipeline: `2868276237` — success.

The XRBC Liquidity Pool now opens with a compact exchange-style top workspace. The liquidity manager stays on the left on desktop and the Xaman connection card sits beside it on the right. On smaller screens, the Xaman card moves above the liquidity manager. Wallet balances and the LP-position readout remain available in a separate lower `Wallet details` panel linked directly from the top card.

## Xaman reconnect status
The top wallet card now mirrors the homepage security explanation:
- amber/yellow notice;
- red authorization countdown;
- static `3:00 max` state;
- explicit statement that no trade or liquidity request is created while authorization settles.

Browser authorization uses `XAMAN_AUTHORIZE_TIMEOUT_MS = 180000`. Transaction/backend action waits remain `ACTION_WAIT_MS = 90000`; do not merge these timers.

Connection remains authorization-only through `XRBCXamanStandard.authorizeAndWarm()`, with backend readiness starting in parallel. Do not turn the countdown into an automatic authorization retry or transaction retry mechanism.

The edited inline controller CSP hash changed from `HiwJxoPeAS8GetBqkEYikHtboo51ZMLgaWHKXKJLh3Q=` to `wqBTSDgyKV0ASiB4Gl5oXfXR7Na+8xjvCr2yJv8k7eQ=`.

## Preserved
No intentional changes were made to AMM math, quote logic, trustline policy, signing intent binding, validated XRPL finality, receipt/NFT semantics, or XRBC gates.

## Manual verification
CI passed, but connected tooling has not visually inspected the custom-domain render. Verify desktop/mobile spacing and one close/restart Xaman authorization test during normal browser testing.
