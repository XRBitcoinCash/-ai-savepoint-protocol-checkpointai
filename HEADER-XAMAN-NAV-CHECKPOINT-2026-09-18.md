# XRBitcoinCash header + Xaman navigation checkpoint — 2026-09-18

## Context

The homepage header was redesigned from the compact institutional navigation into the approved dark XRPL/terminal-style header mockup. The user explicitly requested preservation of the original XRBC emblem, all primary navigation, the Tools link, light/dark mode, and a prominent "Get XRBC in Xaman" action.

## Production source

- GitLab project: `xrbitcoincash-group/xrbitcoincash-project`
- Branch: `master`
- File: `public/index.html`
- Commit: `b0f97dbd274986be8b379850964ed65cc4933764`
- Rollback parent: `3110da635cc487f9111d59f30233724e2d343928`
- Pipeline: `2863126314` — success

## Changes

- Preserved the existing `/xrbitcoin-logo-128.png` XRBC emblem and made the XRBitcoinCash wordmark a single white/dark-theme-aware label rather than coloring "Cash" separately.
- Restyled the homepage header with a dark XRPL grid/terminal background and subtle cyan/green orbital cue using CSS only; no decorative image dependency was added.
- Primary navigation now contains Trade, XRPL Token Liquidity, Liquidity, Research, Tools, and Developers in the same navigation group.
- Preserved `#themeToggle` and its existing light/dark-mode state hooks; restyled the control to match the new header.
- Added a prominent `Get XRBC in Xaman` CTA.
- CTA opens the documented first-party Xaman Swap xApp at `https://xaman.app/detect/xapp:xaman.swapper`.
- Xaman currently documents the Swap launch URL but does not publish a supported public parameter for preselecting XRBC. The site therefore does not invent an undocumented token-prefill query. The CTA tooltip explains that the user selects XRBC as the receive asset.
- Added responsive behavior: single-row desktop where space permits, compact two-row navigation under 980px, horizontally scrollable nav at smaller widths, and a one-column small-phone fallback.

## Invariants

- Do not replace the original XRBC emblem with generated artwork.
- Keep Tools and the light/dark toggle in the header.
- Do not claim that the Xaman URL preselects XRBC unless Xaman publishes and verifies a supported parameter.
- Header presentation must remain independent of wallet connection, signing, trade construction, AMM/order-book logic, liquidity calculations, and token gates.
- Preserve all current navigation targets and `data-liq-jump` behavior.

## Checks

- GitLab repository validation passed.
- Secret detection passed.
- Semgrep SAST passed.
- Pages deployment passed.
- Pipeline `2863126314` finished successfully.
- No wallet transaction or live signing operation was performed.

## Next check

- User visual review of the deployed header at the actual browser width.
- If spacing needs adjustment, modify only the `#xrbc-home-hero-header` CSS override and header markup without changing runtime trading logic.
