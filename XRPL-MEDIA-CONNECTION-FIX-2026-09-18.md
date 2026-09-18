# XRPL Media Desk connection repair — 2026-09-18

## Failure observed

The deployed Media Desk layout rendered, but the live article area showed:
- "No matching headline is available in the current feed."
- "No matching headlines in this category."
- "No additional matching stories."

The XRPL-first ordering code did not exclude general crypto stories, so this state established that the browser had zero usable articles. The failure was in the live data path, not the relevance ranking.

## Repair

### First-party read-only media API

GitHub backend repository: `XRBitcoinCash/xrbitcoincash.github.io`

Added public endpoint:

`GET https://xrbitcoincash-github-io.onrender.com/api/v1/media/news`

Backend changes:
- fixed upstream requests only; no user-supplied fetch URL;
- parallel cryptocurrency.cv searches for:
  - XRP Ledger
  - XRP
  - Ripple
  - RLUSD
  - Xaman
  - wider latest cryptocurrency headlines;
- server-side normalization and URL sanitation;
- duplicate-title and duplicate-link removal;
- XRPL search groups ordered before wider crypto;
- two-minute shared cache;
- up to fifteen-minute last-known-good in-memory fallback;
- query parameters rejected so callers cannot expand the upstream request;
- upstream redirects fail closed;
- endpoint remains read-only and independent of wallet, Xaman, holding gates, XRPL signing and transaction submission.

Backend commits:
- `d22d98590bb4cafce5ef679d4a08d1fcb9f0b78f` — tests
- `15767e51e9fe4826990ef34ceadb7777de909908` — media API
- `801824d83457544df859be56e583823f4e98671f` — redirect fail-closed hardening

Static syntax checks passed for the final API and test files.

### Homepage transport cascade

GitLab frontend repository: `xrbitcoincash-group/xrbitcoincash-project`

The Media Desk now uses:

1. XRBC Render read-only media API.
2. Direct fixed cryptocurrency.cv requests if the first-party proxy is unavailable.
3. Verified direct publisher/source entry cards if both live transports are unavailable.

The fallback directory includes XRPL Blog, Ripple XRP Insights, Xaman Blog, CoinDesk XRP Ledger, Decrypt, XRPL Community, XRP Ledger YouTube discovery, broader CoinDesk XRP coverage and Live Coin Watch XRP reference.

No fallback card pretends to be a current headline. It is explicitly labeled Direct source or Market reference.

The cache key was bumped to `xrbc.media.news.v3` so a prior failed/old local feed state is not reused.

Startup was further changed so direct-source cards display immediately while live network requests connect. A cold Render start or unavailable provider can therefore no longer produce the large blank Media Desk seen in the failure screenshot.

Frontend commits:
- `008379f3d6b0caaf04350d54be39f3687aa29eb8` — resilient proxy/direct/source cascade
- `61278c5b5c9a9bda08a467da84069b39c45a6eaa` — immediate source display during connection

Final GitLab pipeline:
- `2862729733` — success
- repository validation: success
- secret detection: success
- Semgrep SAST: success
- Pages deployment: success

Final GitHub browser-facing mirror:
- sync commit `5c6004cdbbf94c6cb1427f00e0426654f1fb765c`
- `build-info.json` identifies GitLab commit `61278c5b5c9a9bda08a467da84069b39c45a6eaa`
- exact mirrored Media Desk script syntax check: success
- proxy path present: yes
- direct provider path present: yes
- direct publisher fallback present: yes
- immediate fallback present: yes
- old "No matching headline is available in the current feed" copy: absent

## Boundary

No changes were made to:
- Xaman transaction signing;
- QR/deep-link transaction requests;
- wallet secrets or custody;
- XRPL transaction construction/submission;
- holding gates;
- liquidity math;
- token identity;
- ledger RPC behavior used by trading tools.

## Remaining external uncertainty

The current tool environment cannot directly open the Render hostname, so it cannot independently establish the exact live Render deployment timestamp for the new backend route. This does not leave the Media Desk blank: the frontend has direct-provider and direct-source fallbacks. The backend source is committed in the repository used by the existing Render service.

## Manual visual check

Reload the homepage and inspect the Media Desk:
- source cards should be visible immediately;
- when the Render route is live, status should read "Connected through XRBC media proxy";
- if Render is not yet live but direct provider works, status should read "Direct provider fallback";
- if both live transports fail, status should read "Live headlines unavailable · direct source access";
- no normal transport failure should produce the previous blank media layout.
