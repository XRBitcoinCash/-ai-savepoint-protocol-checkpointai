# Selected-market header repair — 2026-09-23

Prepared before deployment, per the user's mandatory stop-after-deployment rule.

Cause: the homepage's XRP per XRBC, best bid/ask, spread and ledger fields were static markup without an update handler. The existing selected-market snapshot feed was already available but did not populate them.

MR !18 connects the header to that existing validated exact-pair snapshot renderer, hides stale prices, distinguishes empty and unavailable books, and requests the new pair immediately even while the chart is hidden. It adds no polling loop. CSS, wallet/trade policy, and token-selection scrolling remain unchanged.

Implementation: `aa3643935c926af1bc72e31a302c149c49dc4088`; baseline: `1f37c3491e8fff962f78505bf0253dd08ab533b5`.
MR: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/18

Before deployment: JavaScript syntax and one focused check of prices, empty book, failure and pair-change output passed. The diff is confined to the chart display module. Required CI gates apply. Deployment was pending when this checkpoint was saved; consult the MR during a future authorized task for its final result. No browser/live checks are authorized after deployment. Stop immediately when deployment completes; no automatic memory update afterward.
