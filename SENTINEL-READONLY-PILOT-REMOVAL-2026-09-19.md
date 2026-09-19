# Sentinel read-only pilot removal checkpoint — 2026-09-19

## Context

The optional XRBC quick-buy / exact-buy / exact-sell transaction area on the standalone Liquidity Sentinel page was a pilot and proved redundant with the project's dedicated trading interfaces. The user explicitly requested that the entire section be removed without affecting the scanner.

## Production source

- GitLab project: `xrbitcoincash-group/xrbitcoincash-project`
- Branch: `master`
- Primary file: `public/liquidity-sentinel.html`
- Final commit: `da9cfbf98feaa82690a5fead35be1354a7f4503d`
- Rollback point before pilot removal: `a6ada1150b1dac04676d55fc3f131a49948948f8`
- Pipeline: `2863543612` — success

## Final standalone Sentinel scope

- The standalone Liquidity Sentinel is now read-only.
- Xaman is used only to select / authorize the public XRPL account used for the wallet liquidity scan.
- The page does not prepare, sign, submit, recover, or reconcile XRPL transactions.
- The Quick Buy / exact buy / exact sell UI, trust-line transaction button, Xaman signing panel, persistent transaction controller and exact-trade implementation were removed.
- Normal scanner refresh no longer performs background trade-quote calculations.

## Preserved consistency work

- Exact-identity token images remain enabled using local exact assets where available and Bithomp's issued-token image service keyed by exact issuer + currency, with ticker initials as fallback.
- Liquidity risk display remains normalized to 0–100 where higher means more observed risk.
- The reproducible raw liquidity health model remains 0–7 where applicable to compatibility/evidence.
- Normalization remains `round((7 - healthPoints) / 7 * 100)`.
- `No XRP AMM found` and `Data unavailable` remain separate unscored states.
- Homepage Sentinel, Ecosystem scanner and Developer API workbench retain the same 0–100 display direction established in the preceding consistency pass.
- This removal does not remove or modify the dedicated XRBC/XRP trading interfaces elsewhere in the project.

## Verification

- All executable inline scripts in `public/liquidity-sentinel.html` compiled successfully after the removal.
- JSON and JSON-LD script blocks parsed successfully.
- Repository validation, secret detection, Semgrep SAST and Pages deployment passed in pipeline `2863543612`.
- Source checks confirmed the standalone Sentinel still contains the scanner, Xaman public-account connection, Bithomp image fallback and 0–100 risk display.
- Source checks confirmed the standalone Sentinel no longer contains the quick-trade section, OfferCreate pilot, persistent signing-request controller, transaction builder or verification-code transaction UI.

## Operating rule

Do not reintroduce Quick Buy, exact buy/sell, trust-line transaction preparation or another signing workflow into standalone Liquidity Sentinel unless the user explicitly requests a new transaction feature. Keep the page focused on liquidity observation, scoring, warnings and evidence export.
