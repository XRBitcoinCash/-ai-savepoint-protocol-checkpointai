# XRBitcoin Wallet + Pool Runtime Repair — 2026-09-22

## Scope

Active frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, branch `master`.

Primary page: `public/xrbitcoin-links.html`.

Implementation commit: `f728e7ae89ba35a90c7506085d151a7eb19417f6`.

Pipeline: `2870872464` — success. Runtime contracts, repository validation, secret detection, Semgrep SAST, and Pages deployment all passed.

## Root cause

The XRBitcoin page's main `liquidity-app` inline script had drifted from its Content Security Policy hash. The browser therefore blocked that controller while later independently authorized read-only scripts could still execute. This produced the observed split state: Limit Orders and some reference panels were visible, while the existing XRB/XRP pool stayed on its static “Connecting…” state, pool activity never received observations, and the wallet/liquidity controller never initialized.

The stale CSP hash was replaced with the SHA-256 of the repaired `liquidity-app`: `8TOaagbO5wAAmFEfAngq8PeNZX+bEG27XccrtxXGtJA=`.

The runtime-contract test suite now includes `xrbitcoin-links.html`, so future executable-script/CSP mismatches on this page are release-blocking instead of silently reaching production.

## Wallet repair

XRBitcoin continues to use its own Xaman public application key:
`9f853ecf-d95f-4e03-8591-e41f91b9f3c5`.

Do not substitute the XRBitcoinCash Xaman key.

Wallet connection remains authorization-only. It uses the shared `XRBCXamanStandard.authorizeAndWarm()` lifecycle with the XRBitcoin Xaman application, while the validated XRPL reader wakes in parallel. Connecting does not create a trade, AMM, trustline, NFT, or other XRPL transaction.

The connection card now appears directly above the liquidity manager, matching the accepted XRBitcoinCash workflow direction. Wallet balances and LP-position details remain available in a separate lower panel.

Browser authorization now exposes the same bounded security behavior used by the XRBC reference flow:
- 180-second maximum authorization window;
- visible countdown and security explanation;
- explicit reset/restart path;
- stale-attempt guard;
- no automatic replacement authorization;
- no transaction payload during connection.

## Pool repair

The existing XRB/XRP pool reader still uses exact XRPL identity:
- XRB issuer: `rGQaHbQHCsTLQtboQPwUBasXjLvk8uDbpT`
- XRB currency hex: `5852626974636F696E0000000000000000000000`
- quote: native XRP

The existing validated `server_info` + `amm_info` read path was preserved. The pool and pool-activity code itself had not regressed relative to the original XRBitcoin 3.0.0 deployment; it was unreachable because the parent liquidity controller was blocked by CSP.

## Token imagery

Primary XRB/XRP controls now display project/token imagery instead of ticker-only presentation:
- XRB uses `/xrbitcoin-logo-128.png`.
- XRP uses the reviewed local/provenance-backed XRP artwork, with the same embedded SVG fallback used by the XRBC liquidity interface and `data-local-token-asset="/assets/tokens/xrp.svg"`.

Pool headings, pool metrics, pair selection, deposit units, and wallet balance labels now carry token identity visually. Images are presentation only; ledger identity remains issuer + currency/native XRP.

## Operating rules

- XRBitcoin is a separate project. Its main sidebar stays limited to Exchange, Limit orders, XRB Watchtower, Security, and Support.
- XRBitcoinCash, JCS, and Creature NFT remain explicit related-project links, not XRBC tool navigation inside XRBitcoin.
- Preserve XRB's public Xaman key and exact asset identity.
- Any future edit to executable inline XRBitcoin JavaScript must update its CSP hash; CI now checks this page.
- Do not treat a successful signature as transaction success. Existing validated-ledger finality and critical-field checks remain authoritative.
- Do not infer pool existence, balances, fees, or activity from ticker/logo data; use the validated XRPL reader.
