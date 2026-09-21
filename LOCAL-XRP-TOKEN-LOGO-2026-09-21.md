# Local XRP Token Logo — 2026-09-21

The Liquidity Pool now uses a local XRP SVG at `public/assets/tokens/xrp.svg`. Its provenance and CC0-1.0 source are recorded in `public/assets/tokens/README.md`.

Implementation commit: `2a37dc754853ff0cd045b2a5ddcf476b8045769d`. Pipeline `2868676134` passed completely. Liquidity Pool release: `0.2.5`. Shared dynamic UI: `v1.1.1`.

The dynamic quote-unit renderer and XRBC/XRP pair picker now use the local XRP asset, so `pairUI()` no longer replaces XRP with plain text only.

Reusable rule: keep reviewed token imagery local, record its license/source beside the asset, and use shared token-logo classes instead of runtime hotlinks. Token imagery is presentation only and must never define ledger asset identity.
