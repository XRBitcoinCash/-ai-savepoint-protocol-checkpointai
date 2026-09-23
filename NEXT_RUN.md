# Next run — public liquidity repair and preserved queue

Active: `SAVEPOINT-2026-09-23-public-liquidity-discovery`. Read `memory/savepoints/SAVEPOINT-2026-09-23-PUBLIC-LIQUIDITY-DISCOVERY.json`, `PUBLIC-LIQUIDITY-DISCOVERY-REPAIR-2026-09-23.md`, `memory/discovery-efficiency-standard.json` and relevant known errors.

MR !13 implementation `16fcf45800ad7bbf53796c2c03318fab363ae6ae` was prepared from `a46172c91d1f9d0cdcd0f151c83c406090e8a25c`; deployment and canonical served-source verification succeeded; rendered browser runtime unverified. Production pipeline `2875017821` and deploy job `16680915408` succeeded at merge `8c13eaf222ea7a70b74837a474a496de3d22a531`; rendered runtime remains unverified. 46 CI tests (37 existing plus nine focused), syntax/diff and unrelated-block preservation pass. Canonical served source/build match the final merge; rendered browser/device runtime remains unverified; Chromium was unavailable. Endpoint probes are separate evidence. Keep the public index ungated, preserve exact raw currency, and distinguish direct XRP-AMM subset ranking from all-ledger coverage.

Existing next issue remains `XRB-001`: real-device first-click Xaman sign-in, cancel and retry, alongside `XRB-007/008`. `XRB-009` remains the separate history-feed failure. Other queue items and their evidence remain unchanged. Do not expand this liquidity repair into wallet, history, gate or backend changes.

Apply the bounded discovery/usefulness/efficiency standard: reuse current evidence, use focused checks only, preserve all history and report actual completion limits briefly.
