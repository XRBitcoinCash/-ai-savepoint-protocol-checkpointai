# Homepage Exchange-Shell Migration — 2026-09-21

The XRBitcoinCash main trading page now uses the same shared exchange/workbench presentation system as the XRBC Liquidity Pool.

Frontend:
- shared CSS commit: `cd8b2bd41082c9a87b1540381344e6c5ee4928e1`
- homepage opt-in commit: `b06b3ca16f047b01a059bd5833d7e1d81050f24d`
- pipeline: `2868954757` success
- rollback: `8ec6e577e52fb4f9c751c3109f8fb07f137263ae`

The shared visual layer in `public/xrbc-dynamic-ui.css` is now v1.2.0. Homepage-specific rules are scoped to `body.xrbc-home-exchange-shell`.

Desktop now uses the Liquidity Pool information architecture: fixed left navigation rail, compact workbench heading, neutral dense market surfaces, primary chart/market workspace, and sticky right-side order/action rail. The existing Get XRBC in Xaman CTA and theme control remain in the sidebar. At <=900px, the sidebar converts to compact top navigation and the order panel stacks before the chart.

The page remains release `1.5.3` because this migration intentionally changed presentation only. All 12 executable inline homepage script blocks are byte-identical before/after. Wallet authorization, Xaman popup/request lifecycle, six-digit challenge, quote/order construction, trustline behavior, pending-request protection, and validated XRPL finality are unchanged.

GitLab checkpoint: `docs/checkpoints/HOMEPAGE-EXCHANGE-SHELL-MIGRATION-2026-09-21.md` at `38d76d107614ce1f1c68c8922ed17d63242da4ab`. GitLab AI memory updated at `baf07ddb5c5a0d9ede518b3003272d32ea43954e`.

Manual browser review remains: desktop sidebar, compact terminal, sticky order rail, Xaman flow, and mobile top-nav/stacking.
