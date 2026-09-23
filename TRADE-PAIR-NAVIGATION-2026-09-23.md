# Trade pair selection navigation — 2026-09-23

User clarified that the order ticket is intentionally scrollable, not covered. Only token-selection navigation needed correction.

All four selection paths (primary pair buttons, pair dropdown, discovered token cards and native XRP) now reveal the selected pair in the order section immediately after an accepted choice. Discovery closes, internal ticket scroll resets to zero, keyboard focus follows, and mobile top-navigation clearance is accounted for. The ticket pair label now updates alongside the primary pair header. Ledger lookup latency does not delay navigation.

Implementation `d69ec324bff92d6044c354b6dc1a3174fbcd3c4e`; MR !16 merged as `f27f26d2ac08570a25398afc3653c827b57fc5bf`; production pipeline `2875205832`. All 55 existing CI tests passed. Desktop live checks passed for primary pair, dropdown after internal scrollTop=570, discovered Bitstamp USD and native XRP: updated pair visible at top=17.71875px, internal scroll reset to zero.

That check caught an existing load/pageshow reset overriding an early choice. MR !17 (`38a70537fa9bebcaf0c35752793855d3bb5d759f`, merged `1f37c3491e8fff962f78505bf0253dd08ab533b5`) makes the initial scroll policy yield to explicit pair navigation. A focused VM check confirms initial reset still runs and late load/pageshow cannot override selection. Final production pipeline `2875220539` and deploy job `16682475808` succeeded. Live DOM confirms build `1f37c3491e8fff962f78505bf0253dd08ab533b5`; selecting RLUSD reveals the correct pair at 17.71875px with zero internal scroll and focus on the ticket. Navigation guard is set by selection. Narrow-device rendering and financial transactions were not tested.

Only `public/index.html` application script and its initial scroll policy changed. CSS and the independently scrollable ticket remain intact. No trade, wallet authorization or policy bypass was performed. Background updates and rejected pair changes do not navigate. Rollback baseline: `d403232bcd123e18ebff1a4b55067e5e798ca961`. Preserve the existing issue queue.
