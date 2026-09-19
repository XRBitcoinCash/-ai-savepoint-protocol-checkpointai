# XRBitcoinCash developer API workbench checkpoint — 2026-09-19

## Context

The developer page was technically functional but led with code/reference material while the useful live response was buried. The user requested the same general header language as the main site (without the Xaman acquisition CTA), clearer purpose, more actual output, and a simpler explanation of wallet-authenticated access.

## Production source

- GitLab project: `xrbitcoincash-group/xrbitcoincash-project`
- Branch: `master`
- Files:
  - `public/developers.html`
  - `public/xrbc-developer-api.js`
- Commit: `1b119d28a19aeda94288602c5cd26171135fe39a`
- Rollback parent: `27bd9a8fe1475806dc2bdcc5d29effa0ab6a5f20`
- Pipeline: `2863474475` — success

## Changes

- Developer header now matches the homepage navigation language: original XRBC emblem, Trade, XRBC Liquidity Pool, Research, Tools, Developers, and light/dark mode. No Get-XRBC-in-Xaman CTA is present.
- Reframed the page as an `XRBC Developer API Workbench`: live output first, implementation detail second.
- Public endpoint selector now defaults to `/market/xrbc` and uses plain-language dataset labels.
- `Run live data` renders human-readable summary cards for:
  - XRBC/XRP market snapshot
  - Liquidity Sentinel pool health
  - public trade preview
  - validated ledger
  - XRBC supply
  - exact project identity
  - tool catalog
  - service status
  - readiness telemetry
  - bridge evidence availability
- Raw JSON is retained in a collapsible disclosure.
- cURL/JavaScript request examples are retained in a separate collapsible disclosure.
- Full API route catalog is retained but collapsed behind `Browse all API routes`; heading changed from the vague “Small endpoints. Clear contracts.”
- Added one non-polling `/status` warm-up check on page load so an idle backend can begin waking. Live datasets remain request-driven.
- Reframed wallet authentication as `Advanced · gated reports only`. Public market/liquidity/ledger/supply/project endpoints explicitly do not require wallet proof.
- Authentication readiness now distinguishes configured credentials from `walletAuthenticationVerified === true`, matching backend semantics.

## Preserve

- Public API reads remain read-only, no custody, no signing and no wallet requirement.
- Advanced report gates remain based on actual XRBC holdings and short-lived signed-wallet sessions; no bypass credential is introduced.
- Do not turn the Matrix background into claimed telemetry.
- Keep raw JSON and OpenAPI available for developers even though the human-readable workbench is primary.
- Keep one-time status warm-up non-polling; do not add continuous background API traffic without an explicit request.

## Verification

- Replacement JavaScript parses successfully with a V8 syntax check.
- All required DOM IDs used by the developer script occur exactly once after the edit.
- GitLab validation, secret detection, Semgrep SAST and Pages deploy all passed in pipeline `2863474475`.
- This environment could not directly resolve the public Render hostname, so live endpoint payloads were not independently exercised here after deployment.

## Next check

- User visual review of desktop/mobile developer page after propagation.
- Press `Run live data` for the default XRBC/XRP market and verify the summary panel populates before the raw JSON/code sections.
