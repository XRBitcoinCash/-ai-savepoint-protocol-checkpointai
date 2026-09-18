# XRPL Media Desk & freshness hardening checkpoint — 2026-09-18

## Context

The XRBitcoinCash homepage media area was redesigned from a simple three-card crypto headline strip plus a standalone CryptoWendyO player into an XRPL-first media dashboard. During verification, several stale-copy paths were found: hard-coded enhancement asset versions, an unscheduled GitHub mirror, per-path GitLab Pages cache drift, stale crawler metadata, and a malformed universal AI manifest.

## Production source

- Repository: `xrbitcoincash-group/xrbitcoincash-project`
- Branch: `master`
- Homepage: `public/index.html`
- Final production build in this checkpoint: `d0cafa50d71bb737b37b2664d6211003d9737905`
- Final GitLab Pages pipeline: `2862679871` — success
- GitHub mirror build record: same GitLab commit via `build-info.json`
- Final verified GitHub mirror sync commit: `ad24d237d140dc3d366904fdefaa30850a6382de`

## Media Desk

Implemented in the homepage:

- XRPL-first source shelf with clearly separated publisher types.
- Direct choices for XRPL Blog, Ripple XRP Insights, Xaman Blog, CoinDesk XRPL, Decrypt, and XRPL Community.
- Headline modes: XRPL first, All crypto, Markets, Security, Policy.
- Current-headline text search.
- Three-part desktop layout: Trending rail, lead story, secondary story stack.
- Responsive tablet/mobile layouts.
- Live `cryptocurrency.cv` aggregation increased to up to 30 items.
- XRPL/XRP/Ripple/RLUSD/Xaman relevance ordering in XRPL-first mode.
- Duplicate link removal and source-diversity ordering.
- Feed-supplied HTTPS images only; local source-monogram fallback when images fail or are absent.
- Existing CryptoWendyO read-only proxy/player retained and labeled Independent.
- Independent/community discovery links retained as discovery, not endorsement.
- Dynamic feed strings are constructed with DOM nodes/textContent; no new `innerHTML` writes in the media module.

Primary implementation commits:

- `5374ead53b036a03b4552342cf6ae3bac2c61f95` — XRPL-first Media Desk
- `7b0ce22f1cd02b182f96c174fd46f4b9e6f62150` — freshness hardening + headline search

## Freshness and stale-copy controls

- Homepage now includes browser cache-revalidation meta hints.
- `scripts/prepare-compact-home.sh` no longer uses hard-coded `?v=20260917`.
- Deployment injects the exact Git commit as the cache-busting version for:
  - `xrbc-home-compact.css`
  - `xrbc-home-compact.js`
  - `xrbc-liquidity-model.js`
- Deployment injects `xrbc-build-id` into the built homepage.
- GitLab Pages now publishes `build-info.json` with exact commit, pipeline, ref and deployment source.
- GitHub mirror workflow now:
  - runs every 30 minutes and on workflow changes/manual dispatch;
  - bypasses ordinary cache on Pages fetches;
  - retries until `build-info.json` and built homepage agree;
  - pulls source-owned companion files from the immutable GitLab raw commit instead of the Pages CDN;
  - mirrors homepage assets, AI discovery files, security/TOML discovery, robots and sitemap;
  - refuses to commit inconsistent source/deployment pairs.
- GitHub-only `.well-known/ai.js` updated to the active GitLab frontend source and current XRBitcoin routes.

GitHub workflow hardening commits include:

- `20a72f9ac47febacedd7cb37c0351bce3afca7c9`
- `77398a0846f937383dcb9e907ac43e17d91f6985`
- `e73a1168c189dca425f517de43d3b7cd74bc5148`
- `b775da154273083e64081fbcdb58463b49be27c1`
- `c1ea1ea242da61a9b7fdb35b0f8f28d83b698db2`

## Machine discovery repair

- Repaired `public/universal-ai.json` by preserving the valid current v3 object and removing malformed stale fragments around it.
- Updated its modification date and added the exact deployment build endpoint.
- Updated `public/.well-known/ai.json` to v1.1.1 and added `build-info.json`.
- Updated `public/xrbc-metadata.json` to v1.0.1 with current generation time and deployment evidence pointer.
- Preserved the current XRBitcoin trading route `/xrbitcoin-links.html` and security reference `/xrbitcoin-security.html`.
- Updated the homepage sitemap `lastmod` to `2026-09-18`.
- GitHub mirror now receives these canonical files from the exact GitLab commit.

Relevant production commits:

- `101f2dd5e24b33ed9060eff42c072687d3281b35` — canonical machine manifest repair
- `d0cafa50d71bb737b37b2664d6211003d9737905` — homepage sitemap freshness

## Checks

- All affected GitLab pipelines passed repository validation, secret detection, Semgrep SAST, and Pages deployment.
- Final production pipeline `2862679871` passed.
- GitHub `build-info.json` matches final GitLab build `d0cafa50d71bb737b37b2664d6211003d9737905`.
- GitHub mirrored sitemap now reports `Updated: 2026-09-18` and homepage `lastmod 2026-09-18`.
- No wallet signing, Xaman payload creation, transaction construction, token gates, XRPL RPC methods, backend service, or liquidity math were changed.

## Manual follow-up

- Visually inspect the Media Desk after browser/CDN propagation at desktop, tablet and phone sizes.
- Check headline image fallback behavior and current-feed search/filter interactions.
- Add more independent/community publishers only when exact canonical URLs are confirmed and publisher type remains clearly labeled.
- Do not reintroduce fixed asset-version query strings or Pages-CDN companion-file mirroring.
