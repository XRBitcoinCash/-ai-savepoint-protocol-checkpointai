# XRBitcoinCash Homepage Tool Images Checkpoint — 2026-09-18

**Checkpoint ID:** `SAVEPOINT-2026-09-18-homepage-tool-images`  
**Status:** Active / resume point  
**GitLab project:** `xrbitcoincash-group/xrbitcoincash-project`  
**GitLab project ID:** `75781181`  
**Branch:** `master`  
**Primary frontend:** `public/index.html`

## Context

The homepage "Tools for a closer look" grid originally used abbreviation placeholders:

`LP / AU / RL / VP / WT / AT / IR`

The user wanted real project artwork instead of plain abbreviation boxes. Attempts to dynamically scrape third-party screenshots were abandoned because they did not reliably render. The chosen implementation is now local static artwork stored in GitLab under a stable folder, with the homepage cards pointing to those assets.

This is a presentation-only change. Do not alter wallet connection, Xaman signing, trading, XRPL requests, AMM logic, liquidity calculations, charting, or card destination URLs when continuing this work.

## Asset folder

Current asset folder:

`public/tool-previews/`

Current files include:

- `advanced-asset-tokenization-auditor.webp`
- `asset-provenance-gateway.webp`
- `bridge-integrity-monitor.webp` (older stored copy; no longer referenced by homepage)
- `bridge-integrity-monitor.jpg` (clean source now referenced)
- `extended-token-auditor.webp`
- `jcs-religious-artifact-creator.jpg`
- `nft-art.png`
- `risk-lens.webp` (older stored copy; no longer referenced by homepage)
- `risk-lens.jpg` (clean source now referenced)
- `sentinel-liquidity-health.webp`
- `support-page.jpg`
- `tool-previews-manifest.json`
- `value-path.jpg`
- `xaman-phone-background.webp`
- `xrbc-main-portal.webp`
- `xrbitcoin-decentralized-exchange.jpg`

## Current homepage card mapping

The current `public/index.html` mapping on `master` is:

| Homepage card | Current image |
| --- | --- |
| Liquidity Pool | `/tool-previews/sentinel-liquidity-health.webp` |
| Advanced Auditor | `/tool-previews/extended-token-auditor.webp` |
| Risk Lens | `/tool-previews/risk-lens.jpg` |
| Value Path | `/tool-previews/value-path.jpg` |
| Watchtower | `/tool-previews/bridge-integrity-monitor.jpg` |
| Advanced Tokenization | `/tool-previews/advanced-asset-tokenization-auditor.webp` |
| Institutional Readiness | `/tool-previews/asset-provenance-gateway.webp` |

## User visual feedback before this checkpoint

- Extended Token Auditor artwork: correct.
- Risk Lens: previous WebP did not render; switched to the clean original JPEG.
- Value Path: correct.
- Watchtower: previous displayed image looked corrupted/incorrect; switched to a clean Bridge Integrity Monitor JPEG from the user's supplied source.
- Advanced Asset Tokenization: correct.
- Institutional Readiness: user explicitly identified Asset Provenance Gateway as the correct image; current mapping uses it.
- Liquidity Pool currently uses Sentinel Liquidity Health. The user noted this current image; do not assume a different replacement unless the user explicitly requests one.

## CSS / layout

The active institutional homepage CSS for `.product-icon` was changed from a small abbreviation box to a 96 × 96 image container. The image is rendered with `object-fit: cover`.

Only presentation markup/CSS for these seven cards was changed. Existing card URLs, titles, descriptions, and functions were preserved.

## Verified current state

Latest verified GitLab homepage commit:

`3fd024a678c10113a17b140913dba5e1cc093d91`

Current `public/index.html` blob:

`961a18ab7c5a4bfbda227f0f5b4a056fe11c9b52`

Latest verified GitLab pipeline:

- Pipeline ID: `2860608051`
- Pipeline IID: `654`
- Status: **success**
- Commit: `3fd024a678c10113a17b140913dba5e1cc093d91`

The current homepage source was verified to reference:

- `/tool-previews/risk-lens.jpg`
- `/tool-previews/bridge-integrity-monitor.jpg`

and no longer references the older Risk Lens / Bridge WebP paths in the seven-card homepage grid.

## Resume instructions for the next conversation

1. Read this file first.
2. Inspect current GitLab `master` before making any change; do not assume this checkpoint is still HEAD.
3. Preserve all functional systems outside the seven-card image presentation.
4. Ask for or inspect the user's latest screenshot before changing mappings based only on old screenshots.
5. If the user approves the current visual result, leave the tool-image section alone.
6. If the user wants a different card image, change only that card's `<img src>` unless CSS itself is the problem.
7. Do not reintroduce dynamic screenshot/scraping services unless the user specifically requests that architecture again.

## Pending visual check

The latest Risk Lens and Watchtower JPEG replacements passed the GitLab pipeline, but the user had not yet shown a post-deployment screenshot confirming the final visual result at the moment this checkpoint was written.

## Preferred working method

For bounded homepage changes, follow:

**inspect exact current source → identify exact block/function → make smallest safe edit → verify source and pipeline → user visually checks live page**

See also:

`HUMAN-AI-EFFICIENCY-WORKFLOW-2026-09-18.md`
