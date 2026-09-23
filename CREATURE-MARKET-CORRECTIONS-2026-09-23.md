# Creature NFT market corrections — 2026-09-23

Prepared and tested against frontend `efe729fa5a81f0108932989bf83426377e8b7962` on GitLab `master`. Memory is saved before the final application commit. See `memory/creature-market-corrections-2026-09-23.json` for tested file fingerprints. Deployment and real-wallet confirmation are pending user testing.

## Confirmed earlier work

The Creature trading/liquidity rebuild was committed as `d73e71d6d7313bfaceaa2cc22c0f5779d1306477`. The corrected public Xaman application ID is `a80af797-db3f-4305-b1c5-14a0a6d447b2`, committed in `efe729fa5a81f0108932989bf83426377e8b7962`. This is an application ID, not a private API secret or a URL.

Exact CreatureNFT identity: issuer `rGWUGk9BUnknFeyPHSxmkv6UPnt4Zs4c92`, currency `43726561747572654E4654000000000000000000`. Market tokens, LP shares and individual NFT artworks remain separate. Trading, pool management, token permissions, limit orders/cancellation and confirmed transaction exports use the existing protected controller. The previous public NFT reader and linked records load on entry and refresh every five minutes while visible. Optional NFT receipt minting is disabled because no Creature receipt service exists. The user deferred further NFT archive work.

## Failure causes and correction

The page recreated Xumm while its pinned SDK shared PKCE state and event bindings. It also failed to reject errors returned as resolved values, leaving the button waiting for an account. Reuse one SDK instance, reject returned/error-event failures, retain exact app/account checks, and allow cancellation beside the action button.

Browser testing reproduced a separate one-drop buy rejection: XRP route input was rounded before tolerance but the pool boundary was not. Both now use the same rounding; materially worse routes still fail.

Costs and tolerance bounds appear as amounts are typed, without a wallet. The liquidity quote amount fills automatically from validated pool reserves and can be refreshed. Stale or materially changed estimates update the form and require another review. A major reserve-price change at signing clears the unsigned preview and refreshes the amounts before any payload creation. Existing encoded caps, minimum LP output, simulation, independent ledger checks and pending-request locks remain.

The market view gains freshness metrics and a quote-update pulse; the pool gains an animated reserve nexus and observation markers. The limit-order section shows spend/receive totals, price conditions, lifetime and partial-fill explanations, plus a current-pool-price button. Motion can be paused and respects reduced-motion settings. Animations do not fabricate price history or executed trades. The existing JCS asset is now in both the ecosystem card and sidebar.

## Evidence and limits

78 unit tests pass, including 10 focused Creature checks. Runtime contracts for 11 pages and the 12-tool gate registry pass. Mocked Chromium checks cover wallet error/cancel/retry, successful Buy and deposit previews, automatic estimates, major price-shift rejection with zero financial payloads, limit totals, JCS assets, CSP, motion and responsive widths 390/900/901/1180/1440. Two transaction simulations used synthetic fixtures. No live signature or on-ledger transaction was attempted.

The existing XRB-001/007/008 device retests and XRB-009 history issue remain. Other site behavior, shared scripts, backend and NFT archive are outside this correction. Stop after the final application commit; the user will test. An already-open signing request cannot be revoked by the page’s price timer.
