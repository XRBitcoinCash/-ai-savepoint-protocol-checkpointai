# XRP Logo Rendering Repair — 2026-09-21

The Liquidity Pool XRP logo repair is implemented in frontend commit `81833af341390038818bc3cdba4485647e1a67d7`. Pipeline `2868712767` passed completely. Page release is `0.2.6`.

The production/browser symptom was XRP text rendering without its icon even though `public/assets/tokens/xrp.svg` existed and `pairUI()` rebuilt the quote unit through the token renderer. The existing image-error path hides a failed image, so the UI could degrade to ticker-only when the separate SVG request failed.

The repair embeds the exact reviewed CC0 XRP SVG as a CSP-allowed data URI in both the initial XRP quote unit and the dynamic `tokenLogo()` helper. The canonical local asset and provenance remain:
- `public/assets/tokens/xrp.svg`
- `public/assets/tokens/README.md`
- upstream: `spothq/cryptocurrency-icons/svg/color/xrp.svg`
- license: CC0-1.0

The `liquidity-app` CSP hash changed from `sha256-8woQbNnLXODclW86zxf4eaez2kznwubfVuMSAfi1RtA=` to `sha256-1OiuEkgSFV4gl79M7pFIFGuShMFnhwDneaBkon0Z6Ek=`.

Local GitLab checkpoint: `docs/checkpoints/XRP-LOGO-RENDERING-REPAIR-2026-09-21.md` at commit `11dc4c83c55d84534c3e0af4382312f60f345e61`. GitLab AI memory was synchronized at `1c1dd89587c49328f38baec0b0a35619915108ff`.

Rollback point: `130643a4b7cd65338204a6db17d15f45f901c7ef`.

No wallet, balance, AMM, quote, signing, transaction, receipt, or finality logic changed. Token imagery remains presentation only and must never define XRPL identity.

Remaining manual verification: hard-refresh the affected production browser/device and confirm the XRP icon appears beside **Maximum XRP to deposit** and in the XRBC/XRP pair picker after dynamic UI rebuild.
