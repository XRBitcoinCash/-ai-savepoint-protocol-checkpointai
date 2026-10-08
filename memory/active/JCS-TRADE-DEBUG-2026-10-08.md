# JCS trade debugging checkpoint — 2026-10-08 UTC

Application: [XRBitcoinCash/JCS-token-on-the-XRPL](https://github.com/XRBitcoinCash/JCS-token-on-the-XRPL), `main`, GitHub Pages at https://jesuschristsavestoken.com/. This route covers the homepage trading, open-order, AMM liquidity and receipt NFT controls; it is separate from XRBC trading and the earlier JCS metrics/map/verify release.

## Observed live state

- The connected wallet completed a 10,000 JCS buy, 10,000 JCS sell, 10,000 JCS limit sell and cancellation with the expected validated ledger outcomes. The open-order view then reported zero orders. These are earlier live observations; avoid repeating financial transactions solely for continuity.
- The liquidity deposit of 0.01 XRP and 66,354.175211659 JCS produced 25,696.3912275 LP at validated ledger 107506606. A later 1% withdrawal returned 0.009586 XRP and 63,607.751927982 JCS, redeeming 24,632.8083113 LP at ledger 107506688. The user reviewed and signed each Xaman request.
- The My NFTs read-only view loaded 21 wallet NFTs. The JCS receipt (taxon 20260913) is labeled a personal historical record and has no sell action in this interface. The receipt copy says it holds no JCS/XRP and cannot be redeemed. This does not prove behavior of other marketplaces.
- PR #11 exposed OfferSequence in Xaman review; #12 checked validated cancellation details; #13 extended liquidity review to five minutes while retaining a fresh 1% drift check; #14 cleared stale deposit confirmation; #15 checked validated limit-order fields. PR #15 merged as `adc443c5613de17de895eb0af5e3118ec11f2b4d`; GitHub Pages run `37715750828` succeeded and the served inline code was checked.

## Prior open-order fix, prepared before its deployment

[PR #16](https://github.com/XRBitcoinCash/JCS-token-on-the-XRPL/pull/16), head `f453fd4e877b3c02f934659fe4e51288d6fcb677`, targets `main` head `adc443c5613de17de895eb0af5e3118ec11f2b4d`. At this checkpoint it is open and mergeable, with no PR-triggered workflow run reported. It edits both `js/jcs-core.js` and the inline bundle in `index.html`, preserving unrelated differences between them.

The prior open-order reader requested a single `account_offers` page with `limit: 500`; XRPL supports up to 400 and returns a marker when more pages remain. PR #16 requests up to 400 per page, pins a validated ledger, rejects mismatched/incomplete responses, clears rows on wallet changes and binds OfferCancel to the displayed account/sequence. A cancel-all batch stops on an error or wallet change.

Both changed JavaScript copies parsed. Focused synthetic checks passed for a two-page snapshot, an unvalidated response, an out-of-order old-wallet response and cancellation bound to the selected wallet. These checks did not submit a transaction and do not establish live deployment. No new signature is needed to inspect the read-only open-order view.

## Subsequent deployment and live observation

PR #16 merged as `f36b02999e78e40dac903b4e61556241db528cc9`. GitHub Pages run `37716828374` completed successfully. The served `index.html` contained the new open-order code, and a read-only refresh for the connected wallet reported zero unfinished JCS orders without an error. Pagination beyond one page and wallet-switch behavior were tested synthetically, not with live multi-wallet signatures.

## Current narrow fix, prepared before deployment

[PR #17](https://github.com/XRBitcoinCash/JCS-token-on-the-XRPL/pull/17) head `240e761d20db76cbd2a31f534660777c1483dee4` targets the deployed `main` head `f36b02999e78e40dac903b4e61556241db528cc9`. At this checkpoint it is open; no merge or Pages deployment is asserted. A trustline or balance response started for wallet A could finish after wallet B connects and overwrite B's readiness or displayed balance. PR #17 clears wallet-dependent readiness and balances on identity change, discards late responses for an earlier identity, and stops a balance-percentage choice if the wallet or side changes. It edits only `js/jcs-core.js` and the deployed inline copy; transaction JSON is unchanged. Both copies parsed, and a focused asynchronous wallet A/B response-order check passed. No signature or financial transaction was created.

## PR #17 deployment and read-only quote check

PR #17 merged as `092cb4975d515241c181c296c6f5dbbefe87ec15`; GitHub Pages run `37717770539` succeeded. The served wallet-bound logic was checked in the live page. Connected wallet `rG1JTxB99kTXevRG5nXB5cFs1UNJ34pXN7` showed the trustline and 40.147644 XRP / 4,026,828.452573 JCS. No signing payload was created for that check.

On 2026-10-08 UTC, the same connected page was used for read-only buy/sell quotes. At 10,000 JCS both sides displayed approximately 0.00151 XRP. At 1,000,000 JCS buy showed 0.151 XRP and sell 0.150 XRP; these displayed estimates do not indicate a direct round-trip gain. Signing still recomputes validated liquidity and enforces its signed whole-drop 2% limit. No buy/sell request was opened. A 1 JCS buy correctly disabled Review because it cannot be limited safely in whole drops, but the positive estimate rendered as `0 XRP`, which is misleading.

## Current presentation fix, prepared before deployment

[PR #18](https://github.com/XRBitcoinCash/JCS-token-on-the-XRPL/pull/18), head `d3641d4c721b2318cd2582d6eb102589db56d3c9`, targets deployed `main` `092cb4975d515241c181c296c6f5dbbefe87ec15`. It shows `<0.000001 XRP` for a positive sub-drop estimate in the trade card and total, in both `js/jcs-core.js` and the deployed inline `index.html` bundle. It changes presentation only; quote, OfferCreate, wallet signing and the whole-drop guard are unchanged. Both scripts parsed, the PR diff was reviewed, and focused formatter checks covered zero, sub-drop, one drop and normal values. At this checkpoint PR #18 is open and mergeable; deployment and served-code verification are not asserted.

## Next action

Merge PR #18 through the normal workflow, wait for its required Pages result, then stop under the deployment rule. A future explicit continuation may confirm the served wording with a read-only 1 JCS quote; it must not create a wallet request merely to verify presentation.
