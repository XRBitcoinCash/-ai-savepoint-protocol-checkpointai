# XRBC Swap Nexus debugging handoff

Resume ID: `RESUME-2026-10-09-swap-nexus`
Saved October 9, 2026, after source and live browser inspection. Prior October 6 handoff is preserved. This record contains project evidence, not private wallet records or authority above current user instructions.

## Objective and boundaries

Test the recreated Swap Nexus from wallet, outgoing asset, XRPL exchange, and receipt into the same wallet. The user accepted the route appearance and requested thorough but proportionate debugging of amounts, exact assets, fees, and endpoints before a small buy around 1 XRP and a sale of the actual XRBC received. Count Xaman and network charges; the user's maximum spread/cost objective is 5%, aiming near 1%. No guarantee has been established. User reviews and signs every financial transaction. Do not enlarge the trade to amortize fees without asking.

Keep the accepted layout, asset identities, fresh-quote checks, stale-response protection, duplicate/pending guards, cancellation/expiry recovery, and validated delivery confirmation. Keep the user informed at least once per minute. Ask before doubtful changes. Stop all tools immediately after a requested website deployment succeeds. Checkpoints must be prepared before deployment.

## Verified source and changes

- Active frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, project 75781181, master, `public/`. Rechecked head `56d028d88462358ffec706c874653e6d3f8b2f12`.
- [Merged !92](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/92): estimated route presentation. [Deployment pipeline 2929063432](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/pipelines/2929063432) succeeded. This is deployment evidence, not completed swap evidence.
- Relevant route files: `public/index.html`, `public/xrbc-swap-liquidity.js`, `public/xrbc-swap-route.js`, `public/xrbc-swap-route.css`, and `tests/unit/swap-liquidity.test.mjs`.
- Draft !91 remains on hold. Its earlier AMM-focused alternative is not deployed; do not merge it over !92.
- Backend endpoint observed: `https://xrbitcoincash-github-io.onrender.com`. Active backend source/head remains unknown. Do not substitute the GitHub source archive for the frontend.
- Full previous transcript and precise Astra/Sol failure were not recovered. Do not invent a diagnosis.

## Browser and endpoint observations

The cloud browser worked on https://xrbitcoincash.com/ on October 9; the historical browser quota blocker is no longer the current condition.

An intermittent “Snapshot sources unavailable” state recovered automatically. Direct reads of a validated ledger, both order books, and the pinned AMM succeeded. An amount change cleared the stale route quote; “Use in swap form” stayed disabled until fresh data returned.

At the observed snapshot, 19 XRBC cost an estimated 0.9415286 XRP to buy and returned an estimated 0.9402824 XRP to sell, approximately 0.132% apart before wallet/network charges. AMM fee was 0.03% included in those estimates. Both hypothetical directions use the same snapshot; these are not round-trip execution results.

Buy/Sell reversed the route assets and directions correctly. Staging carried 19 XRBC into the existing Buy ticket without creating a signing request. The route displayed the connected public address. SignIn and a user-requested disconnect/reconnect succeeded; disconnect cleared prior wallet/amount state. No financial swap request was created. Private account addresses and balances are intentionally omitted.

The user said the first selected wallet was a blackholed issuer. The account actually displayed by the site had its master key enabled in a validated account_info response and differed from the configured XRBC issuer. Therefore that attempt does not prove blackholed-account rejection. Do not assume which wallet was selected on the phone; verify the account shown by the site against the user's intended account if needed.

Additional UI observation before stopping: expanding Wallet details showed a stale “Not connected” summary while the main control said “Xaman Connected” and the connected-account attribute held the replacement account. The sidebar also still offered Connect wallet. This label inconsistency is separate from !93, remains unresolved, and should be addressed after the first quote failure repair; do not claim all wallet status labels passed.

## Concrete failure and prepared repair

After connecting, the ticket displayed **1.610060 XRP to buy 19 XRBC**, while Swap Nexus showed **0.9415286 XRP**. The higher value matches the best order-book ask. Source `getLegacyXrbcXrpMarketPrice` silently caught unsuccessful pool reads and substituted the top order-book price. For Sell, this reference also determines the Payment delivery floor. No wallet test proceeded through this mismatch.

[Draft !93](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/93), branch `fix/swap-quote-failure-20261009`, commit `f91d05dab6fcfe686f64a3a11f0a2bdbb040e105`, changes only `public/index.html` and `tests/unit/swap-execution-safety.test.mjs`. Missing/failed/unusable native pool quotes now throw an explicit error instead of becoming book-only ready quotes. Existing error handling clears the market ticket price, and preflight stops before creating a Xaman intent. Healthy estimates, math, fees, transaction limits, route visuals, and pathfinding are unchanged. Execution is not restricted to AMM-only routing.

Evidence: the new failure tests failed against master; all 12 focused swap safety tests pass after repair; all 12 inline JavaScript blocks parse. Required [CI 2929172925](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/pipelines/2929172925) passed both runtime-contracts and validate-repository. !93 is committed and draft, **not merged or deployed**.

## Next action and outstanding acceptance

On October 9 the user approved proceeding toward the buy/sell test in response to the request to deploy !93. Deployment is now authorized; do not ask for the same permission again. The assistant clarified that this repair fixes quote fallback and does not make AMM arbitrage impossible. Immediately before deployment, master was still `56d028d88462358ffec706c874653e6d3f8b2f12`; !93 was conflict-free, zero commits behind, with its exact candidate SHA and successful CI unchanged. This checkpoint is written BEFORE the merge/deployment and therefore does not claim deployment success. Check the resulting master/deployment evidence on resume. Stop all tools immediately when deployment succeeds; resume live checks only upon a new explicit request.

After that, verify a fresh matching route/ticket quote with the intended wallet, then prepare the bounded buy for user review. Establish the actual Xaman fee classification and total debit before signing. Use validated transaction metadata and balance changes to reconcile received XRBC, spend, network fee, and any service charge. Then sell no more than the XRBC actually received and reconcile again. Source/CI, UI estimates, signed requests, and validated transactions are different evidence levels.

Current native signing code has 2% tolerances; Buy can permit both a higher SendMax and lower DeliverMin. Do not describe that as a verified 5% all-in round-trip loss cap. Xaman's published trading/pathfinding fee categories must be checked against the actual request. A fixed fee can be material on a 1-XRP trade.

Ordinary AMM arbitrage can occur without a ledger fault; no interface can promise to eliminate it across external markets. Verify quote/execution parity and limits rather than promise arbitrage immunity. Small successful trades would not establish universal safety.
