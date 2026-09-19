# Xaman token-specific XRBC swap checkpoint — 2026-09-18

## Context

The user demonstrated the desired Xaman screen on a phone: Selling XRP and Receiving XRBitcoinCash. The previous Step 2 button had been routed to the local XRBC trade anchor and was observed by the user as taking them to the wrong local page. Research into Xaman's public application source identified the token-specific Swap launch contract used internally by Xaman.

## Evidence

Xaman's public app source shows two relevant behaviors:

1. External xApp deep links preserve query parameters and pass them into the launched xApp context.
2. Xaman's own token-specific Swap action launches `xaman.swapper` with:
   - `issuer`
   - `asset` (the token's exact currency code)
   - `action=SWAP`

For XRBC the exact identity is:
- issuer: `rEjwniYhYR5QDZzK1a1x2359j8j8N43Ypw`
- currency: `5852626974636F696E6361736800000000000000`

## Production change

- GitLab: `xrbitcoincash-group/xrbitcoincash-project`
- Branch: `master`
- File: `public/index.html`
- Commit: `77d07adc69e7a6ddd99a846793bb41404a8a8402`
- Rollback parent: `1b06e6152b2471749a585690920477fe20b46e3f`
- Pipeline: `2863140420` — success

Step 2 now targets:

`https://xaman.app/detect/xapp:xaman.swapper?issuer=rEjwniYhYR5QDZzK1a1x2359j8j8N43Ypw&asset=5852626974636F696E6361736800000000000000&action=SWAP`

The button no longer targets the local liquidity/trade page.

## Preserve

- Step 1 remains the Xaman XRP on-ramp.
- Step 2 must remain the token-specific Xaman Swap deep link unless Xaman changes its launch contract.
- Exact issuer + exact currency must be used; ticker text alone is insufficient.
- Keep Tools, theme toggle, original XRBC emblem and all trading/runtime logic unchanged.

## Verification

- GitLab validation, secret detection, Semgrep SAST and Pages deployment all passed.
- The repository target is correct.
- Final device behavior still requires the user's real Xaman app test because this environment cannot launch the native Xaman app.
