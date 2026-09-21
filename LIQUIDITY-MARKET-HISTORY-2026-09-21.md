# Liquidity Market History Repair — 2026-09-21

The XRBC/XRP Advanced Market Chart history path was repaired in frontend commit `e893d3cf86780de2cb8dbe2b948a0bea80b5ec91`; pipeline `2868432524` passed completely.

## Why the chart was empty
The chart itself was rendering. The historical feed was the problem.

Its original Sologenic OHLC integration could request the exact XRBC/XRP identity, but the provider's published Mainnet limitations list a defined issuer set and does not include the exact XRBC issuer `rEjwniYhYR5QDZzK1a1x2359j8j8N43Ypw`. The original code also requested only about 360 intervals rather than walking backward through the market's available history.

## Current design
Historical candles now use the public OnTheDEX XRPL OHLC path with exact currency/issuer identity and backward marker pagination.

The chart intervals are:
- 15m — bounded recent history
- 1h — bounded recent history
- 4h — up to three backward pages
- 1D · MAX — broadest default daily history, paging backward
- 1W — paging backward

The UI reports the actual returned date range instead of implying that a recent request represents the full market history.

## Evidence boundary
Historical OHLC is contextual market history only. Current bid/ask, AMM reserve ratio, depth and trade-size context continue to come from the separately validated XRP Ledger snapshot. Transaction preview/signing never depends on the historical provider.

No substitute token, ticker-only match, synthetic candle or fabricated missing interval is allowed.

The page release is `0.2.1`. Browser verification of the provider response remains necessary because connected tooling could not directly retrieve the public API response from its restricted network environment.
