# Creature NFT Xaman signing handoff — 2026-09-23

Prepared and tested against GitLab frontend master `4a2faf38ee8e1b736085a0b935de8692f0eae900`. This confirms the earlier quote/animation correction was committed. Deployment of this follow-up and real-device behavior are not claimed. Save memory first, make the final application commit, then stop all tools as the user requested.

## Report and causes

The user said XR Bitcoin Cash, but the supplied screenshot is the Creature NFT page with `Transaction changed: Paths`. The application ID is already the requested `a80af797-db3f-4305-b1c5-14a0a6d447b2`; it is a public app ID, not an endpoint URL or secret.

The page strips deprecated `type`/`type_hex` fields while building a Payment path, then compared returned simulation paths without the same normalization. Valid equivalent route metadata produced the reported error before any QR or mobile link could exist. A failing regression test reproduced this exact message.

Full mocked signing then exposed another blocker: `CreatureNFT-` plus the 32-character compact UUID is 44 characters. The existing request builder rejects identifiers above 40 characters before posting to Xaman. This also blocked liquidity signing. Earlier tests used empty paths and did not complete successful request creation, so they missed both failures.

## Minimal correction

Returned Payment paths now pass through the existing exact-asset validator, which validates type flags before discarding only redundant encoding fields. Changed assets, accounts, route order/steps, amounts, caps, fees, destination and deadlines still fail comparison. DeliverMax alias handling remains.

New request IDs use `CNFT-` plus the entire UUID: 37 characters, no entropy truncated. Previous saved identifiers remain intact for recovery and legacy validation; new POSTs still reject oversized identifiers. The page's correct app ID and official QR/mobile-link rendering remain. Only this application page and two unit-test files change; inline CSP hashes are refreshed.

## Evidence and limits

86 unit tests pass, including eight new path/identifier/payload tests. Runtime contracts for 11 pages and the 12-tool gate registry pass. Mocked Chromium desktop Buy, mobile Buy and desktop deposit each complete preview, final simulation and seven independent ledger reads, then create exactly one mocked request and display its official QR URL and same-UUID Xaman link. Mobile uses same-window navigation; desktop uses a new window. Status rereads accept the validated route metadata; hide/show keeps one request. A changed route is rejected with zero payloads. No JavaScript or CSP errors occurred.

No real signing request, signature or on-ledger transaction was made. Live app opening and production deployment remain for user testing. The source baseline and tested candidate hashes are in `memory/creature-xaman-handoff-2026-09-23.json`. Earlier work remains documented in `CREATURE-MARKET-CORRECTIONS-2026-09-23.md`; historical savepoints and the XRB-001/007/008/009 queue are preserved.
