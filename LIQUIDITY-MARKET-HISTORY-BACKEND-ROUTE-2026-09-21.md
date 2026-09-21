# Liquidity Market History — Backend Route Finalization — 2026-09-21

The XRBC/XRP chart no longer contacts its historical-data provider from the browser.

## Active path
Browser → XRBC read-only backend → fixed OnTheDEX XRPL OHLC upstream.

Frontend:
- `264f5be880ed4fc8e47448a6a300c6b688a55ff7` — route chart history through backend
- `7fd39d9ce2641f6b28318ba44e718a034f8d7116` — give same-backend history requests the existing 45-second backend allowance
- pipeline `2868480096` — success
- Liquidity Pool release `0.2.3`

Backend:
- `8018486c7fcc0da7e867398702df2ab58e385d28` — fixed read-only history endpoint
- `ebf918c2e3010f33ab5a2bdd4f9f1cfd6ed48c3b` — endpoint tests
- `f6658b41f508585a41bb9813b4e3fbc5b545147e` — OpenAPI
- `b9ef92baadb03c6a32159c2ba71473feefdc718e` — permanent backend API test workflow
- `131e204ebe131c5ae2f886d75506b230af91db21` — route inventory update
- GitHub Actions run `35626734128` — success

The endpoint is `/api/v1/market/xrbc/history`. The browser can choose only the supported interval and a bounded page count. It cannot supply an upstream URL, host, token identity or pagination marker.

Exact XRBC currency/issuer and native XRP are fixed server-side. Returned history is validated before being normalized and returned.

Historical candles remain chart context. The separately validated XRPL order book/AMM snapshot remains the current-market source, and transaction construction/signing/finality never depends on historical data.

Next check: after Render has redeployed the backend, hard-refresh the Liquidity Pool and verify `1D · MAX`. If it still fails, inspect the backend history endpoint response before changing the chart again.
