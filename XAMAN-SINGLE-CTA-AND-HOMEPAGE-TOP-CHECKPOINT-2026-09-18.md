# Xaman single CTA + homepage top checkpoint — 2026-09-18

## Context

The two-step acquisition header proved confusing in real use: one control did not work as intended, the second did not reach the correct Xaman location, and the homepage could reopen around the trading section instead of the header. The user requested one clear XRBC acquisition control and a normal homepage load at the top.

## Root causes

- The Xaman Swap xApp identifier previously used was incorrect: `xaman.swapper`.
- Xaman's current public app config defines the Swap identifier as `xaman.swap`.
- The header Trade link still used `/#trade`, which created a mid-page hash state.
- Browser native scroll restoration could reopen the root homepage below the header even when no deliberate deep link was intended.

## Production change

- GitLab project: `xrbitcoincash-group/xrbitcoincash-project`
- Branch: `master`
- File: `public/index.html`
- Commit: `4ff0aa9431bca84ac84a13eac8b11ba81933349b`
- Rollback parent: `77d07adc69e7a6ddd99a846793bb41404a8a8402`
- Pipeline: `2863147964` — success

## Header

- Removed the separate Buy XRP control.
- Removed the two-step numbered acquisition UI.
- Added one CTA:
  - primary text: `Get XRBC in Xaman`
  - secondary text: `XRP → XRBC · first-party wallet route`
- CTA uses the exact XRBC identity and Xaman's current Swap xApp identifier:
  `https://xaman.app/detect/xapp:xaman.swap?issuer=rEjwniYhYR5QDZzK1a1x2359j8j8N43Ypw&asset=5852626974636F696E6361736800000000000000&action=SWAP`

## Homepage start position

- Header Trade link now targets `/`, not `/#trade`.
- Added an early scroll policy:
  - sets browser `history.scrollRestoration = 'manual'`;
  - ordinary root loads reset to page top;
  - legacy `#trade` URLs are normalized to root and reset to top;
  - deliberate anchors such as `#xrpl-liquidity` and `#market-research` are not cleared.

## Preserve

- Original XRBC emblem.
- Trade / XRPL Token Liquidity / Liquidity / Research / Tools / Developers navigation.
- Theme toggle and its existing state logic.
- Exact XRBC issuer/currency identity.
- Existing trading, wallet, AMM, order-book, gate and signing logic.

## Verification

- Repository validation passed.
- Secret detection passed.
- Semgrep SAST passed.
- Pages deployment passed.
- Pipeline `2863147964` finished successfully.
- Real Xaman native-app rendering still requires a device test after deployment propagation.
