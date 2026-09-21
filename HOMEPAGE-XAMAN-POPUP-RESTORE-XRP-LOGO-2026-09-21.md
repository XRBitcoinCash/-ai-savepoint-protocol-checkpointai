# Homepage Xaman Popup Restore + XRP Logo Hardening — 2026-09-21

Frontend implementation `fe2796a5976d0f3045f0d06f29318be86291c157` passed pipeline `2868893239`. Homepage release is `1.5.2`. Rollback point: `f14729e019454a94d29a25af2b253d8b5f5e37da`.

The v1.5.1 inline **Xaman review preview** experiment is superseded in presentation only. The compact exchange-style trade ticket remains, but the redundant inline review card, mirror script, and dedicated preview CSS were removed. Offer/swap reviews again use the established secure Xaman popup/dialog.

The popup now places the existing six-digit Xaman challenge directly under the official QR in large text. It is the same protected `securityCode` already used by the transaction intent/memo flow; no second code or second payload is created. The popup backdrop can dim the page, but blur is disabled.

Native XRP artwork is hardened so a failed asset fetch cannot degrade into a generic circular "XRP" ticker badge. The canonical reviewed CC0 asset remains `public/assets/tokens/xrp.svg` with provenance in `public/assets/tokens/README.md`. The homepage uses the exact reviewed SVG as a CSP-allowed data URI for native-XRP first paint, `TRADE_QUOTE_ASSETS.XRP.icon`, and the XRP fallback path. Static trade-page XRP images carry `data-local-token-asset="/assets/tokens/xrp.svg"` to retain provenance linkage. XRBC continues to use `/xrbitcoin-logo-128.png`.

Security behavior is unchanged: connection is authorization-only; exactly one payload is created per deliberate final transaction intent; ambiguous requests stay locked/reconciled; the six-digit challenge remains bound to the protected request; final success still requires validated XRPL evidence, `tesSUCCESS`, signer/account equality, and critical-field comparison.

Local GitLab checkpoint: `docs/checkpoints/HOMEPAGE-XAMAN-POPUP-RESTORE-XRP-LOGO-2026-09-21.md` at `fb80552c9b7e3f17efd59aafda49e022302a0db5`. GitLab AI memory was synchronized at `e1a0cc8ef5b894ef0b6f05b1887f1d33684af16d`.

Manual production verification remains: hard-refresh the page, confirm real XRP artwork throughout the trade UI, open a small Xaman review, confirm the popup QR, verify the large six-digit challenge directly below it, and confirm the redundant inline review card is gone.
