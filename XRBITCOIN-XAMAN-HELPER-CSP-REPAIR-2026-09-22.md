# XRBitcoin Xaman Helper CSP Repair — 2026-09-22

Active frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, branch `master`.

Implementation commit: `1e21ec4a89b711279ca87c91bd2216d3222a14fa`.

Pipeline: `2870937665` — success. Runtime contracts, repository validation, secret detection, Semgrep SAST, and Pages deployment all passed.

## Observed failure

The XRBitcoin wallet card showed:
`Connection was not completed: XRBCXamanStandard is not defined`.

The shared helper file `public/xrbc-xaman-standard.js` existed and correctly exports `window.XRBCXamanStandard`, but the XRBitcoin page's Content Security Policy allowed only hashed inline scripts and omitted `'self'` from `script-src`.

Therefore the browser blocked:
`/xrbc-xaman-standard.js`

The wallet controller then reached the call to `XRBCXamanStandard.authorizeAndWarm()` and raised the observed ReferenceError.

## Repair

- Added `'self'` to XRBitcoin `script-src` so same-origin shared JavaScript is allowed.
- Cache-busted the shared helper reference to `/xrbc-xaman-standard.js?v=20260922-1`.
- Added a guarded helper check before authorization so a future helper-load failure produces a controlled message instead of a raw ReferenceError.
- Recomputed the XRBitcoin `liquidity-app` CSP hash: `mWW0cZ2Ec6kN8vEwV6o2L+sStmr8F7rtRlBpxBlZ19I=`.
- Corrected `scripts/verify-runtime.mjs` CSP extraction. The previous regex stopped at the first apostrophe inside a double-quoted CSP value, so it failed to detect that same-origin scripts were disallowed. The runtime contract now parses the complete CSP attribute and can fail a build when a same-origin script exists without `script-src 'self'`.

## Preserve

XRBitcoin still uses its own Xaman public application key:
`9f853ecf-d95f-4e03-8591-e41f91b9f3c5`.

Do not substitute the XRBitcoinCash Xaman application.

Wallet connection remains authorization-only. No AMM, trade, trustline, NFT or other XRPL transaction is created merely by connecting.

Current page:
- blob: `169d22385708d27ea7007a81bf174fc4dd0e55a0`
- SHA-256: `3915c74b82ae8c8a9314f4984ef00f04755896c648aa61cc018ba37b82a37620`
