# XRPL Liquidity Index — homepage implementation and launch savepoint

Recorded: 2026-09-16.
Status: current GitLab source and successful pipeline inspected; public HTTP retrieval still returned an older homepage. Live pool responses were not independently verified in this pass.
Memory rollback point: `1c108602c2b83eb402f086f4b4415ccd85966400`.

## Current user request and authority

The user explicitly requested reviewing/updating GitHub memory and drafting a long XRBitcoinCash X post announcing the public liquidity directory. An article is intended later; this step drafts the post only. Do not publish the post, contact tagged organizations, change the website, or deploy another service from this authorization.

The approved implementation is INSIDE GitLab `xrbitcoincash-group/xrbitcoincash-project`, branch `master`, `public/index.html`. It replaces the CoinGecko/CoinLore wider-market and top-100 sections. It is NOT a new standalone HTML page. This supersedes the placement and research-only status in `XRPL-LIQUIDITY-INDEX-PLAN-2026-09-16.md` and older memory entries. The methodological cautions in that plan remain applicable.

Public share link: https://xrbitcoincash.com/#xrpl-liquidity
Header and top-of-homepage shortcut: **XRPL Token Liquidity**.
The fragment opens the existing homepage section; `#market-overview` and `#xrbcv2-market` remain compatibility anchors. No separate public folder or page is required.

## Verification during this pass

- GitLab `get_latest_pipeline(master)` returned successful pipeline `2854819423`, commit `8a3d76aa33d032a25b2358278fdeaf6b0f1a3b25`, finished `2026-09-16T14:09:30.726Z`.
- Connector source search pinned to that commit verified both shortcuts, the `id="xrpl-liquidity"` heading inside the existing index, and its initial fragment-handling code.
- Read the delivered navigation replacement's complete change/test report and relevant HTML through Files. The report records 19,893 lines, 1,067,132 bytes and SHA-256 `c561bb1d72c4f8677076eaff327e7a3ca2d0acf7aaddae5f7256683cda9b8eb3`. These are delivered-file values; this pass did not download/hash the entire latest GitLab file.
- The report records 82 unit tests, 99 Chromium fixture integration checks and 57 static checks from preparation. They were NOT rerun in this communication/memory step; they were not live wallet, mainnet, Safari or physical-device tests.
- Public web retrieval of the root/fragment returned the older CoinGecko and legacy Quick Buy content despite newer repository evidence. Cause unestablished; do not diagnose DNS, caching, routing or a failed deployment without additional evidence. An independent container HTTP check failed local DNS resolution. Do not call this a demonstrated website outage.
- No wallet authentication, signature, trade, mainnet pool scan or current reserve measurement was performed. No website/backend file was changed in this memory step.

## Implemented public-directory scope

The directory is public, read-only, and independent of wallet connection. Browsing, searching, expanding pool evidence, exact-pair lookup and JSON export require no token purchase and create no signing request. Wallet-specific analysis is reached through existing tools; existing XRBC holding gates remain intact.

Measures direct XRP AMMs for classic trust-line issued assets. Default ranking is descending ACTUAL XRP-side reserve among fresh checked observations in the loaded catalog. Token-side reserve, correctly scaled AMM fee, exact issuer/currency, pool account and ledger/hash/time accompany observations. It is not a global liquidity census, an executable sell quote, or proof of asset backing, redemption, solvency, legitimacy or future price.

Metadata discovery uses XRPL Meta; token pictures use the documented Bithomp issuer/currency image service and approved cached metadata-image fallback. Pictures/names are off-ledger recognition aids, not identity or safety certification. No scraped blocklist is copied into conclusions.

Known identities include XRBC, XRBitcoin and JCS. JCS: currency `JCS`, issuer `rPU6sXCNzsjcTUEmgJQ5SxDUzY2y1RyYKd`. JCS is included even when absent from a metadata response, but is measured/ranked by the same pool rules, with no invented reserves or preferred rank.

The initial 50-token total cap and omission of JCS were corrected. Display options 10/25/50/100 are ROWS PER PAGE, not a ledger-wide count. `Load 50 more tokens` extends the catalog using provider pagination; `Find more name matches` searches provider metadata; exact issuer/currency lookup bypasses metadata listing requirements. Discovery starts from a holder-ordered sample: liquidity-sorting it does not make it the ledger's globally most liquid set. The provider's catalog end does not prove ledger-wide completeness.

States remain distinct: pool found; no direct XRP AMM found for the exact pair at the checked ledger; unavailable; not checked; stale/older observation. No direct XRP pool does not rule out token/token pools or funded order-book routes. A timeout must not be described as zero liquidity.

## Current observation and refresh boundaries

The first version reports observed frozen condition, fee changes and reserve changes between comparable snapshots, with neutral explanations. Historical wallet repetition, wash trading, fake volume and sandwich detection are NOT implemented in this public index. Do not advertise those planned capabilities as running, or equate repeated activity with fraud.

Checks are bounded to 60 pairs per batch, concurrency 2, 850ms start spacing, timeouts/backoff and optional two-minute visible-section auto-refresh. Completed results now appear progressively rather than waiting for the full batch; partial ranking and per-row timestamps remain explicit. Progressive display improves first useful display, not proven backend throughput. No permanent background collector or continuous complete-ledger monitoring was deployed.

## Preserved implementation boundaries

Keep the working Xaman/trading code, wallet connection, trustline/QR behavior, pending-request protection, charts, news, media, Live Coin Watch, social-preview metadata and existing XRBC holding gates. Do not revive retired Quick Buy constructors. LCW's comparison adapter was changed in the earlier homepage integration to use Coinbase Exchange rather than the removed CoinGecko cache; its price/recovery flow remained.

The latest delivered navigation report records 14 other scripts and 14 existing style blocks unchanged from its baseline. Browser tests used synthetic fixtures; never publish their values as market measurements.

## Launch-message requirements

- Lead with liquidity evidence versus logo/popularity/market-cap rankings. Explain that public data can remain hard to interpret without exact identities, scope and timestamps.
- Invite users to bookmark the fragment, run fresh checks, load more catalog pages, and use exact lookup for a missing project. Missing listing is not evidence of no pool.
- Explain free wallet-free public browsing separately from existing wallet scans and XRBC-gated deeper metrics. One XRBitcoinCash hub; do not fragment the message into multiple project launches.
- Present this as a useful additional source of evidence alongside other explorers and tools, not the only honest source or the first explorer ever built.
- Do not claim that a limited catalog proves XRPL is empty, that all tokens were checked, or that pool presence guarantees a successful exit.
- XRPL itself launched in June 2012. Frame 'early' as the project's view that understandable token-market tooling and broader adoption remain unfinished work, not that the ledger is new or that future gains/adoption are guaranteed.
- Support responsible use, developer review, corrections and evidence-based context. Never identify a wallet owner from a label alone or publish unsupported accusations.
- Use the organization's correct name: Bank for International Settlements (BIS). Tags are for awareness and feedback only, not affiliation, endorsement, listing approval or involvement.

Requested tag set for this post: `@XamanWallet @xrplto @XPMarket @LiveCoinWatch @Ripple @RippleXDev @RippleDevRel @BIS_org`.

Ripple's three corporate/developer handles, Xaman, XRPL.to, XPMarket and BIS were corroborated on their organizations' websites in this pass. Live Coin Watch's requested `@LiveCoinWatch` handle appears in public profile references; direct primary X/profile and website-social-link retrieval was unsuccessful here. Do not claim every handle received the same primary-source verification. Do not automatically add named executives or impersonator accounts.

Primary references used for messaging checks:
- https://ripple.com/insights/how-to-spot-and-report-crypto-scams/
- https://help.xaman.app/app/learning-more-about-xaman/official-communication-channels
- https://xrpl.to/about
- https://xpmarket.com/general/terms-and-conditions
- https://www.bis.org/publications/research
- https://xrpl.org/about/history
- https://xrpl.org/docs/concepts/tokens/decentralized-exchange/automated-market-makers/
- https://xrbitcoincash.com/liquidity-sentinel.html
- https://xrbitcoincash.com/risk-lens.html

## Next actions

Draft the requested long X post; article and image require subsequent user requests. Before claiming universal live delivery, confirm the public fragment in a fresh browser and reconcile the old page returned by external retrieval. Preserve exact ledger evidence for any future named-token findings. Any broader collector/history upgrade needs its own reviewed implementation; do not create it from a promotional-writing request.
