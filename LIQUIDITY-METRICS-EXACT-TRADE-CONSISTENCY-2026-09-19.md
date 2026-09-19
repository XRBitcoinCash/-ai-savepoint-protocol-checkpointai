# XRBC liquidity metrics + exact trade consistency checkpoint — 2026-09-19

## Context

The user requested one consistency pass across the liquidity tools after observing three problems: token images in observed-liquidity rows were falling back to ticker text, the Liquidity Sentinel quick transaction path used a circular/pathfinding Payment rather than a direct exact-pair trade control, and liquidity scoring used a 0–7 direction that was inconsistent with the 0–100 higher-risk convention used by other XRBC risk tools.

## Production source

- GitLab project: `xrbitcoincash-group/xrbitcoincash-project`
- Branch: `master`
- Baseline / rollback before this pass: `878a8d23db5ebc304a995a02bf28cd8b1d54e87f`
- Main consistency commit: `4b5d38b62c291e00ccc7497f4a7d73f93ed67e64`
- Final correction commit: `a6ada1150b1dac04676d55fc3f131a49948948f8`
- Final pipeline: `2863531864` — success

## Files changed

- `public/liquidity-sentinel.html`
- `public/index.html`
- `public/xrbc-ecosystem.html`
- `public/xrbc-developer-api.js`

## Canonical liquidity score convention

The internal/source-derived liquidity health model remains a reproducible **0–7 health-point model**. Higher raw health points mean stronger observed direct-liquidity conditions.

Public XRBC interfaces should present liquidity alongside the other XRBC risk tools using a **0–100 risk score where higher means more observed risk**:

`riskScore = round((7 - healthPoints) / 7 * 100)`

Raw health thresholds remain:

- XRP reserve >= 500 XRP: +2
- XRP reserve >= 100 XRP and < 500: +1
- AMM fee <= 0.30%: +1
- AMM fee > 0.50%: -1
- modeled 10-XRP impact <= 1%: +2
- modeled 10-XRP impact <= 3%: +1
- modeled 100-XRP impact <= 10%: +1
- fresh validated ledger (<= 20 seconds where the surface has this evidence): +1
- clamp raw health to 0–7

Classification remains based on raw health:
- 6–7: Healthy; normalized risk 0–14
- 3–5: Caution; normalized risk 29–57
- 0–2: Risk; normalized risk 71–100

Important missing-evidence rule:
- `No XRP AMM found` is **unscored**, not 100 risk and not 0 risk.
- `Data unavailable` is **unscored**.
- A reported frozen issued side is treated as elevated concern and displayed as 100 risk on the standalone Sentinel.
- Missing evidence must never be converted into a favorable score.

The backend Developer API may continue returning its raw 0–7 Sentinel health field for contract compatibility. Frontends normalize it for user-facing 0–100 risk display and disclose the raw value for reproducibility.

## Canonical exact XRBC/XRP transaction convention for Liquidity Sentinel

The standalone Liquidity Sentinel optional trade control no longer uses a self-directed circular `Payment` with `ripple_path_find`, `Paths`, and payment `SendMax`.

It now uses a **direct XRBC/XRP OfferCreate** based on a fresh, ledger-pinned direct AMM observation:

### Buy exact XRBC
- `TransactionType: OfferCreate`
- `TakerPays`: exact XRBC amount requested
- `TakerGets`: maximum XRP drops permitted by the fresh quote boundary
- `Flags: tfFillOrKill`
- Result requirement: receive the full requested XRBC amount or the offer is killed.
- A better direct execution price may spend less XRP than the maximum boundary.

### Sell exact XRBC
- `TransactionType: OfferCreate`
- `TakerGets`: exact XRBC amount to sell
- `TakerPays`: minimum XRP drops required by the fresh quote boundary
- `Flags: tfFillOrKill | tfSell`
- Result requirement: spend the full requested XRBC amount or the offer is killed.
- A better direct execution price may return more XRP than the minimum boundary.

Additional safety behavior:
- Exact XRBC issuer + currency are fixed.
- Fresh validated-ledger evidence is required.
- The direct AMM quote uses its reported trading fee.
- Current UI boundary tolerance remains 2%.
- Exact-trade requests use a shorter `LastLedgerSequence` window (+20 validated-ledger sequences).
- `TakerGets`, `TakerPays`, flags, memos and `LastLedgerSequence` are saved and compared with the validated transaction.
- Xaman remains the wallet-side review/signing boundary.
- This removes multi-asset payment-path routing from this particular control. It **does not** claim that public XRPL markets cannot be arbitraged by other participants and must not be described as a global anti-arbitrage guarantee.

XRPL protocol basis verified during the pass:
- OfferCreate defines `TakerGets` as currency being sold and `TakerPays` as currency being bought.
- `tfFillOrKill` cancels the offer if it cannot be fully filled and does not leave a resting Offer.
- With `tfSell`, full fill means the entire `TakerGets` amount must be spent.
- Payment paths can traverse order books/AMMs and explicitly supplied paths can be used for arbitrage; therefore the Sentinel exact-trade control intentionally avoids that path-payment construction.

## Token image convention

Observed-liquidity token images are resolved by **exact asset identity**, never by ticker alone.

For the standalone Sentinel:
1. use a project-controlled local image when one is explicitly bound to the exact known asset;
2. otherwise request Bithomp's public issued-token image using exact `issuer/currency`;
3. if the image is unavailable, fall back to the ticker initials without treating the missing image as a liquidity or legitimacy signal.

The standalone page CSP now permits `https://cdn.bithomp.com` images. Images use no-referrer behavior.

The main homepage liquidity index can continue its established local-image -> exact Bithomp -> allowlisted XRPL Meta cached-image fallback.

## Warning-language convention

Use these distinctions consistently:
- **Healthy / Caution / Risk**: output of the published liquidity heuristic only.
- **Frozen**: a concrete reported ledger condition, not a generalized fraud/safety judgment.
- **No XRP AMM found**: no direct XRP AMM returned at the checked ledger; other liquidity may exist.
- **Data unavailable**: lookup/incomplete evidence problem; no score.
- Scores and warnings are evidence summaries, not certifications, investment recommendations, or guarantees.

## Verification

- Final GitLab commit: `a6ada1150b1dac04676d55fc3f131a49948948f8`
- Pipeline `2863531864` passed repository validation, secret detection, Semgrep SAST and Pages deployment.
- V8 syntax checks passed for:
  - the changed standalone Sentinel application script;
  - the homepage integrated Sentinel script;
  - the ecosystem scanner script;
  - `xrbc-developer-api.js`.
- Static checks confirmed:
  - standalone exact trade creates `OfferCreate`, not the removed `findXrpPath` Quick Buy flow;
  - Fill-or-Kill and Sell flags are defined;
  - `TakerGets` and `TakerPays` are protected by post-validation field comparison;
  - exact-trade quote lifetime uses the shortened ledger window;
  - Bithomp exact-identity image URL and CSP allowance are present;
  - Frozen rows have normalized 100-risk output.

## Manual checks still required

- Reload Liquidity Sentinel and confirm common assets resolve images where Bithomp has an image; unresolved assets should show initials cleanly.
- Connect a Mainnet Xaman wallet and test a very small exact buy and exact sell only after reviewing every field in Xaman.
- Confirm an intentionally unfillable boundary produces a killed/failed result rather than a resting Offer.
- Confirm mobile layout of Buy exact / Sell exact selector and preset buttons.
