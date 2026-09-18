# XRBitcoinCash Homepage Tool Preview Checkpoint

**Checkpoint ID:** `SAVEPOINT-2026-09-18-homepage-tool-previews`  
**Status:** Active  
**Created:** 2026-09-18  
**GitLab project:** `xrbitcoincash-group/xrbitcoincash-project`  
**GitLab project ID:** `75781181`  
**Branch:** `master`  
**Primary file:** `public/index.html`  
**Current inspected commit:** `b84efe6c484fff33c850b026dc0c156e9edc1fcd`

## Context

The homepage "Tools for a closer look" workspace grid originally used text abbreviation placeholders:

- LP
- AU
- RL
- VP
- WT
- AT
- IR

The user wanted real visual artwork instead of abbreviation placeholders.

A reusable image library was added under:

`public/tool-previews/`

The homepage card image presentation was updated in `public/index.html` without changing wallet, Xaman, trade, chart, AMM, liquidity-index, or ledger logic.

## Current workspace-card mapping

### Liquidity Pool

Current image:

`/tool-previews/sentinel-liquidity-health.webp`

Current link:

`/xrbc-liquidity-pool.html`

User has noted this is Sentinel Liquidity Health artwork rather than a dedicated Liquidity Pool image. Leave as-is unless the user supplies or selects a better exact Liquidity Pool image.

### Advanced Auditor

Current image:

`/tool-previews/extended-token-auditor.webp`

Current link:

`/extended-audit.html`

User approved this visual.

### Risk Lens

Current image:

`/tool-previews/risk-lens.jpg`

Current link:

`/risk-lens.html`

The earlier WEBP did not render correctly. A clean JPEG copied from the user-supplied original was added and the homepage now references the JPEG.

### Value Path

Current image:

`/tool-previews/value-path.jpg`

Current link:

`/value-path.html`

User approved this visual.

### Watchtower

Current image:

`/tool-previews/bridge-integrity-monitor.jpg`

Current link:

`/watchtower.html`

The earlier WEBP appeared corrupted. A clean JPEG copied from the user-supplied Bridge Integrity Monitor artwork was added. The user stated that Bridge Integrity should be the Watchtower image.

### Advanced Tokenization

Current image:

`/tool-previews/advanced-asset-tokenization-auditor.webp`

Current link:

`/asset-tokenization-auditor.html#wallet-gate`

User approved this visual.

### Institutional Readiness

Current state:

**No preview image.**

Current link:

`/xrbc-readiness.html`

The Asset Provenance Gateway image was incorrect for Institutional Readiness and has been removed from this card. Do not reuse Asset Provenance Gateway here unless the user explicitly requests it.

The user suggested that a future visual could potentially come from an XRPL/consensus-related indicator, but no such image has been selected or implemented yet.

## Tool preview asset directory

Current known files include:

- `public/tool-previews/advanced-asset-tokenization-auditor.webp`
- `public/tool-previews/asset-provenance-gateway.webp`
- `public/tool-previews/bridge-integrity-monitor.jpg`
- `public/tool-previews/bridge-integrity-monitor.webp`
- `public/tool-previews/extended-token-auditor.webp`
- `public/tool-previews/jcs-religious-artifact-creator.jpg`
- `public/tool-previews/nft-art.png`
- `public/tool-previews/risk-lens.jpg`
- `public/tool-previews/risk-lens.webp`
- `public/tool-previews/sentinel-liquidity-health.webp`
- `public/tool-previews/support-page.jpg`
- `public/tool-previews/tool-previews-manifest.json`
- `public/tool-previews/value-path.jpg`
- `public/tool-previews/xaman-phone-background.webp`
- `public/tool-previews/xrbc-main-portal.webp`
- `public/tool-previews/xrbitcoin-decentralized-exchange.jpg`

Some older WEBP assets remain in the folder even where the homepage now references clean JPEG replacements. Do not delete them unless the user asks for cleanup.

## Homepage presentation change

The active institutional homepage CSS was changed so `.product-icon` can display real image thumbnails instead of 36x36 abbreviation badges.

The seven-card grid uses normal local same-origin image paths under `/tool-previews/`.

This is presentation-only. Existing card destinations and functions remain unchanged.

## Verification state

Before the Institutional Readiness image removal:

- Risk Lens JPEG path was confirmed in current GitLab source.
- Watchtower Bridge Integrity JPEG path was confirmed in current GitLab source.
- Pipeline `2860608051` for commit `3fd024a678c10113a17b140913dba5e1cc093d91` passed successfully.

Latest change:

- Commit `b84efe6c484fff33c850b026dc0c156e9edc1fcd`
- Removed only the incorrect Institutional Readiness preview image.
- Pipeline `2860622242` was still running when this checkpoint was written.

## Non-goals / preserve

Do not alter these systems while continuing the visual work unless explicitly requested:

- Xaman connection or signing
- wallet state
- trade execution
- XRPL transaction construction
- liquidity-pool logic
- charting
- XRPL Liquidity Index calculations
- order handling
- AMM behavior
- backend APIs
- token gates

## Next conversation entrypoint

In a new conversation, the user can say:

**"Read `XRBC-HOMEPAGE-TOOL-PREVIEWS-CHECKPOINT-2026-09-18.md` from the XRBC GitHub AI memory repository and continue from there."**

Then:

1. Read this checkpoint.
2. Inspect current GitLab `master` before any write.
3. Confirm the latest pipeline status for commit `b84efe6c484fff33c850b026dc0c156e9edc1fcd`.
4. Continue only with the specific visual correction requested.
5. Preserve all unrelated working page functions.
