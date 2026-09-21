# Homepage Trade Ticket + Inline Xaman Review — 2026-09-21

Frontend implementation `2334d35e6b291d164cb16bb795d54c3050f7d973` passed pipeline `2868812919`. Homepage release is `1.5.1`. Rollback point: `95ddb1a84d000cab5470b56eb8cf83f675ba7f9c`.

The homepage trade rail now follows the compact exchange/Coinbase-style direction already used by the Liquidity Pool: tighter segmented Buy/Sell and Market/Limit controls, denser wallet/balance information, a larger focused XRBC amount entry, compact percentage shortcuts, stacked pay/receive rows suited to the narrow ticket, and tighter verification/readiness/review controls.

Native XRP now uses the reviewed local `/assets/tokens/xrp.svg`; XRBC uses `/xrbitcoin-logo-128.png`. Market identity cards use real asset images instead of generic letter placeholders and keep the selected quote icon/name/currency/issuer synchronized. Token imagery remains presentation only; exact XRPL identity is still issuer/currency/native identity.

For trade purposes `offer` and `swap`, the page no longer forces the secure-review modal over the trading workspace. The permanent **Xaman review preview** is the primary presentation. Its preparing state remains visible while the protected request controller runs; after payload creation it mirrors the official Xaman QR and official request link. The six-digit Xaman challenge appears in large type directly below the QR. The idle state uses XRBC/XRP project artwork rather than a generic QR glyph.

The inline preview is presentation only. It must never create a second payload, weaken pending/ambiguous request guards, or replace validated XRPL finality, signer/account equality, or critical-field comparison. Non-trade Xaman flows may still use the secure dialog; remaining dialog backdrops dim without blur.

Local GitLab checkpoint: `docs/checkpoints/HOMEPAGE-TRADE-TICKET-INLINE-XAMAN-2026-09-21.md` at `613da9395e8aa2b776487f4a9f5d247a0245c343`. GitLab AI memory was synchronized at `f14729e019454a94d29a25af2b253d8b5f5e37da`.

Manual production verification remains: confirm local token art, compact trade layout, no trade modal blur/cover, official inline QR, matching six-digit challenge below it, and the same protected request link.
