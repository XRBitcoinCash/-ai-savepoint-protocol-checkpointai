# XRBitcoinCash header acquisition steps checkpoint — 2026-09-18

## Context

The first header CTA labeled "Get XRBC in Xaman" opened a Xaman flow that the user experienced as an XRP purchase/on-ramp rather than an exact XRP→XRBC trade. Xaman's first-party Swap documentation confirms the Swap xApp, but no public first-party URL parameter was verified that preselects XRBC. The user chose a simpler two-step header.

## Production source

- GitLab: `xrbitcoincash-group/xrbitcoincash-project`
- Branch: `master`
- File: `public/index.html`
- Commit: `1b06e6152b2471749a585690920477fe20b46e3f`
- Rollback parent: `b0f97dbd274986be8b379850964ed65cc4933764`
- Pipeline: `2863135579` — success

## Header acquisition behavior

1. **Buy XRP** opens Xaman's documented Buy/Sell XRP xApp:
   `https://xumm.app/detect/app:xumm.buysellxrp`
2. **XRP → XRBC** opens the existing exact XRBC/XRP trading panel at `/#trade`; transaction review/signing remains in Xaman.

## Why this structure

- It does not falsely claim a first-party Xaman URL can prefill XRBC.
- It introduces no new purchase engine and no new third-party DEX provider.
- The existing XRBC/XRP transaction path remains the exact token-specific route.
- The two actions are visibly numbered and compact enough for the approved header.
- Tools and light/dark mode remain unchanged.

## Preserve

- Original XRBC emblem and the approved terminal-style header.
- Trade / XRPL Token Liquidity / Liquidity / Research / Tools / Developers navigation.
- Existing theme toggle state hooks.
- Existing XRBC/XRP trade logic and Xaman signing.
- Do not replace Step 2 with a generic token swap link unless an exact, documented XRBC route is verified.

## Verification

- Repository diff limited to homepage header acquisition markup/CSS.
- GitLab pipeline `2863135579` passed.
- No live wallet transaction was performed.
