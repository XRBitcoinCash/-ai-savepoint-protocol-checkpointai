# XRBC Swap Nexus — disappearing trade review

Resume ID: `RESUME-2026-10-09-trade-handoff`
Saved October 9, 2026, before !95 deployment. Previous dated handoffs are preserved. This public record excludes private wallet addresses, balances, payloads and transaction records.

## Objective and boundaries

The user is testing the recreated homepage Swap Nexus. The safety-answer controls were repaired in !94; the user confirmed they could select and complete them. Immediately afterwards, they reported that the payload or possible QR flashed and disappeared. Continue focused debugging and explain the next concrete failure. Keep updates at least once per minute.

The planned financial test remains a buy around/within 1 XRP followed by a sale of the XRBC actually received, with all fees reconciled from validated metadata. The user answers the personal safety questions and signs transactions. A 5% maximum all-in cost objective, aiming near 1%, is not established by the current 2% transaction tolerances. Do not increase the amount to amortize fees without asking. Ordinary AMM arbitrage does not require a ledger fault; never promise arbitrage immunity.

Preserve asset identity, limits, fees, fresh quotes, stale-response checks, pending/duplicate guards, cancellation/expiry recovery and validated delivery checks. Do not merge the earlier draft !91. Backend source/head remains unverified. Do not substitute the GitHub source archive for the GitLab frontend.

## Verified source and deployment

Frontend: GitLab xrbitcoincash-group/xrbitcoincash-project, project 75781181, master, public/.
Verified source and observed live build: `60f3ee35f901075119138e01234b415ce21f7291`.

[!94](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/94) replaced invisible native answer dropdowns with visible required radio choices and corrected dialog contrast. Source `26c2c254f290b3ee576083ca18a23cfe215a4509`, MR CI 2929231368 success. Production pipeline 2929243218 succeeded; [deploy job 17050848801](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/jobs/17050848801) finished successfully at 06:12:48.947Z. The assistant stopped. On the next explicit Continue, the page build matched the merge SHA. All three groups were visible without default answers; continuation was disabled until the user's selections. The user confirmed the answers worked.

!93, previously deployed at `6cb001b84037a362954d12d510a0f4c18b2de7bd`, removed the native ticket's silent order-book fallback after AMM quote failure. !92 is the accepted route presentation. Neither release establishes a successful wallet trade.

## Latest browser observations

A temporary failed account/trustline read made the UI display zero XRP and a missing trustline. A read-only validated-ledger RPC returned a funded account and the expected exact XRBC line. The existing Review XRBC trustline action confirmed the line already existed, and the UI recovered. No TrustSet was created. Later the UI again displayed zero XRP after another read failure. Treat this as an unresolved data-state problem, not evidence that funds were lost.

A fresh route and native ticket agreed on a 19-XRBC buy at about 0.941529 XRP. The review protected a maximum of 0.960360 XRP excluding wallet/network fees and minimum receipt of 18.620000 XRBC. These are historical review values, not an executable fresh quote. The user completed the personal questions.

After the reported flash, both the safety and Xaman progress dialogs were closed. The retained progress text said Checking your reviewed trade and Preflight passed, creating one payload. The observed QR source and payload-ID text were empty. No visible pending/reopen controls remained. The recent activity list kept only three quote-update entries, so the actual failure explanation had been overwritten. No relevant console error was captured. This does not prove a real QR or payload was created, nor recover the exact error. No wallet-confirmed buy or sell has completed.

The source sets Preparing your Xaman request only after creation guards. Its earlier progress text is consistent with an early guard failure. A failed validated-ledger read can return zero, skip LastLedgerSequence, pass simulation and fail a later creation guard. This source path is verified, but its occurrence in this user attempt is unconfirmed. Other causes have not been ruled out. Do not present an inference as a recovered diagnosis.

## Focused repair !95

[!95](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/95), branch fix/swap-review-failure-20261009, source `bb276576988cce00e5330655ba779008fe7b62d1`, is not merged/deployed at this checkpoint.

Changes:
- Add a separate dismissible Trade review stopped alert. Automatic quote updates cannot overwrite it. An explicit new swap/order review clears it only after the pending-request guard.
- Preserve the explanation for terminal unsuccessful trade requests and safely released pre-payload failures. Ambiguous/pending requests retain existing handling and locks.
- Reject an unavailable, invalid or overflowing validated-ledger deadline before binding or simulation. Healthy requests retain the existing ledger window and exact transaction fields.
- Add three focused tests; update one existing test fixture for the new UI helper.

Evidence: three focused handoff tests plus twelve existing swap safety tests passed. They cover unavailable-ledger early rejection, healthy exact transaction simulation/submission shape, persistent failure through quote refreshes, and existing amount/asset/account/stale/duplicate/delivery protections. All twelve inline JavaScript blocks parsed. The remote candidate source matched the reviewed file. [Required CI 2929289779](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/pipelines/2929289779) succeeded for that exact source.

No new live wallet payload was retried for these checks. The new alert's live appearance and next request outcome remain untested. Browser security previously blocked local-file preview; do not bypass that block with another browser/network route.

## Next action and unresolved acceptance

Complete !95 deployment. This checkpoint precedes merge/deployment and cannot prove success. Once deploy-pages succeeds, stop all tools immediately: no browser, tests, screenshots, cleanup, research or memory update. Report briefly. A new explicit Continue permits checking the deployed head and request state, followed by one safe fresh review. Read any durable failure before changing another path.

Do not automatically replace an ambiguous request. If an official payload is returned, keep that exact request available for the user and determine the actual Xaman fee before signing. A fixed 0.15-XRP fee would exceed 5% for this small trade; do not silently enlarge it. A successful simulation or signed request does not prove validated receipt. Require validated transaction metadata and exact debits/credits before the matching sell.

Separate unresolved observations: intermittent account/trustline failures are represented as zero/missing; some wallet/navigation labels can disagree with the connected Xaman control. Exact backend source and the full old transcript/Astra-Sol failure remain unverified.
