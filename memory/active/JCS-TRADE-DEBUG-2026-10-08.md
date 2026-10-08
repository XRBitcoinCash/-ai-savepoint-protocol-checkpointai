# JCS trade debugging checkpoint — 2026-10-08 UTC

Application: [XRBitcoinCash/JCS-token-on-the-XRPL](https://github.com/XRBitcoinCash/JCS-token-on-the-XRPL), `main`, GitHub Pages at https://jesuschristsavestoken.com/. This route covers the homepage trading, open-order, AMM liquidity and receipt NFT controls; it is separate from XRBC trading and the earlier JCS metrics/map/verify release.

## Observed live state

- The connected wallet completed a 10,000 JCS buy, 10,000 JCS sell, 10,000 JCS limit sell and cancellation with the expected validated ledger outcomes. The open-order view then reported zero orders. These are earlier live observations; avoid repeating financial transactions solely for continuity.
- The liquidity deposit of 0.01 XRP and 66,354.175211659 JCS produced 25,696.3912275 LP at validated ledger 107506606. A later 1% withdrawal returned 0.009586 XRP and 63,607.751927982 JCS, redeeming 24,632.8083113 LP at ledger 107506688. The user reviewed and signed each Xaman request.
- The My NFTs read-only view loaded 21 wallet NFTs. The JCS receipt (taxon 20260913) is labeled a personal historical record and has no sell action in this interface. The receipt copy says it holds no JCS/XRP and cannot be redeemed. This does not prove behavior of other marketplaces.
- PR #11 exposed OfferSequence in Xaman review; #12 checked validated cancellation details; #13 extended liquidity review to five minutes while retaining a fresh 1% drift check; #14 cleared stale deposit confirmation; #15 checked validated limit-order fields. PR #15 merged as `adc443c5613de17de895eb0af5e3118ec11f2b4d`; GitHub Pages run `37715750828` succeeded and the served inline code was checked.

## Current narrow fix, prepared before deployment

[PR #16](https://github.com/XRBitcoinCash/JCS-token-on-the-XRPL/pull/16), head `f453fd4e877b3c02f934659fe4e51288d6fcb677`, targets `main` head `adc443c5613de17de895eb0af5e3118ec11f2b4d`. At this checkpoint it is open and mergeable, with no PR-triggered workflow run reported. It edits both `js/jcs-core.js` and the inline bundle in `index.html`, preserving unrelated differences between them.

The prior open-order reader requested a single `account_offers` page with `limit: 500`; XRPL supports up to 400 and returns a marker when more pages remain. PR #16 requests up to 400 per page, pins a validated ledger, rejects mismatched/incomplete responses, clears rows on wallet changes and binds OfferCancel to the displayed account/sequence. A cancel-all batch stops on an error or wallet change.

Both changed JavaScript copies parsed. Focused synthetic checks passed for a two-page snapshot, an unvalidated response, an out-of-order old-wallet response and cancellation bound to the selected wallet. These checks did not submit a transaction and do not establish live deployment. No new signature is needed to inspect the read-only open-order view.

## Next action

Merge PR #16 through the normal workflow, wait for the Pages deployment result, then verify the served inline code and one read-only open-order refresh for the connected wallet under the user's current continuation request. Record merge/deployment/live observation separately; if a gate fails, report the actual blocker. Do not broaden into another buy, sell, mint or AMM transaction to test this change. Preserve wallet approval and the established transaction JSON validation.
