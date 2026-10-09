# XRBC Swap Nexus — safety answer repair

Resume ID: `RESUME-2026-10-09-safety-answers`
Saved October 9, 2026, before the requested dropdown repair deployment. Prior handoffs are preserved; load older ones only if needed. This record excludes private wallet addresses, balances, payloads and transaction records.

## Current objective and authority

The user is testing the recreated homepage Swap Nexus and reported: clicking Choose an answer did not show options. They explicitly asked to fix that before continuing. This authorizes the focused repair; it is not a new request to trade without the user. User reviews and signs all financial transactions. Keep progress updates at least once per minute and report blockers promptly.

The planned financial acceptance remains a small buy around/within 1 XRP, followed by a sale of the XRBC actually received, with all fees reconciled from validated metadata. Maximum spread/cost objective 5%, aiming near 1%, is not a guarantee. Do not enlarge the amount to amortize fees without asking. Preserve asset identities, transaction limits, fresh quotes, stale-response protection, pending/duplicate guards, expiry/cancellation recovery, and validated delivery checks. Draft !91 stays on hold.

## Verified source and deployment

Frontend: GitLab xrbitcoincash-group/xrbitcoincash-project, project 75781181, master, public/. Last verified deployed master: `6cb001b84037a362954d12d510a0f4c18b2de7bd`.

[!93](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/93) fixed the native ticket silently replacing a failed AMM quote with a very different order-book price. It was merged on October 9. [Deploy job 17050505467](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/jobs/17050505467) in pipeline 2929189075 succeeded. All other required production jobs had succeeded. The assistant stopped immediately. On the user's subsequent Continue, the live homepage build ID matched this merge SHA.

The active backend source/head is still unverified. The observed endpoint is https://xrbitcoincash-github-io.onrender.com. Do not substitute the GitHub source archive for the active frontend.

## Current repair !94

[!94](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/94), branch fix/swap-safety-choices-20261009, source commit `26c2c254f290b3ee576083ca18a23cfe215a4509`, changes only public/index.html and tests/unit/trade-safety-review.test.mjs. At this checkpoint it is not merged or deployed.

Live observation reproduced the user's symptom: clicking the native select focused it, but its choices remained invisible. The exact browser-native popup cause is not established; do not label it a popup blocker or claim that diagnosis proved. All three source options existed. A separate computed-style check confirmed that global light-theme colors made text difficult to read inside the dark dialog.

The repair replaces three selects with labelled fieldsets containing visible No, Yes and I'm not sure radio choices, with nothing preselected. Continuation requires exactly three explicit No answers and both acknowledgements. Yes, unsure, incomplete/missing controls, expiry, changed wallet, cancelled intent or an existing payload cannot accept the review. Cancel/reset semantics and the signing path are preserved. Scoped text colors protect this dialog from the observed theme override. No quote, fee, amount, asset or transaction-construction change is included.

Evidence: six focused safety tests pass; twelve inline JavaScript blocks parse; the uploaded source exactly matched the reviewed file. Required [CI 2929231368](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/pipelines/2929231368) succeeded for this exact source commit. The existing !93 swap test evidence is reused. Browser security rejected the local-file visual preview; no workaround was attempted. Therefore radio usability, focus, wrapping and appearance still require a live browser check after deployment on a new explicit request.

## Unfinished swap acceptance

After !93, temporary AMM HTTP 502 responses recovered. A fresh 19-XRBC buy estimate agreed between route and native ticket (about 0.941529 XRP). A read-only unsigned XRPL simulation returned tesSUCCESS with the expected exact asset and balance effects; this was not submission or wallet confirmation. The safety dialog was reached before any financial Xaman payload was created. The user then reported the dropdown problem. The review later closed; the native ticket became available again. No buy or sell was submitted.

The old review's amounts are historical, not a reusable execution quote. Prepare a new request only after the controls are usable and a fresh quote agrees. The user must answer the personal safety questions and attestations. Determine the actual Xaman service fee from the request before signing. Published percentage and fixed pathfinding categories do not establish which fee applies to this request. A fixed 0.15-XRP fee would exceed the 5% objective on this tiny trade; stop rather than silently increase the amount.

The current 2% tolerances permit both a higher Buy SendMax and a lower DeliverMin; they do not establish a 5% all-in round-trip loss cap. Ordinary AMM arbitrage is possible without a ledger fault. Do not promise arbitrage immunity. After a user-signed buy, require validated ledger delivery and exact debits/credits before preparing the matching sell.

Separate unresolved UI issue: Wallet details/left navigation can still say Not connected/Connect wallet despite the authoritative Xaman control showing the connected account. Do not claim those labels passed. The full old transcript and precise Astra/Sol failure were not recovered.

## Next action and stopping rule

Finish the user-requested !94 deployment after checking the current master and exact candidate. This checkpoint is deliberately written before deployment and cannot prove it succeeded. Once the requested fix deploys successfully, stop all tools immediately: no browser refresh, tests, screenshots, research, cleanup or memory update. Report completion briefly. A new explicit Continue permits the next step: verify the deployed build, inspect the now-visible safety choices, then resume the bounded user-signed buy/sell test with a fresh quote and actual fee review.
