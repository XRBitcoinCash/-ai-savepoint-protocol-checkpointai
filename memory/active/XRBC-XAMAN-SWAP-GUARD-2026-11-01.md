# XRBC Swap Guard standby copy

On 2026-11-01 the user asked to keep the tested guard available in case it is needed later. Both code reviews are open, unmerged drafts. The guard has not been deployed. Resume this route only on an explicit request to revisit it. The scheduled maintenance and default swap routes have separate objectives.

## Where to recover the implementation

| Component | Pinned standby commit | Review |
| --- | --- | --- |
| Backend, tests and runbook | `2d52d4257dddf8b4c9a124ddc3ad5e2a88c0c962` | [GitHub PR 3](https://github.com/XRBitcoinCash/xrbitcoincash-source/pull/3) |
| Portal | `0cca50f0e3d382a30b52218b27c8dd0fea11ae0d` | [GitLab MR 142](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/142) |

Both reviews use branch `xrbc/xaman-swap-guard-20261101`. The backend target is `main` and the portal target is `master`. Start with the [runbook at the tested backend commit](https://github.com/XRBitcoinCash/xrbitcoincash-source/blob/2d52d4257dddf8b4c9a124ddc3ad5e2a88c0c962/docs/xaman-swap-guard.md). It includes the two-repository simulation command and the original portal revision for reproducing the pre-guard behavior.

## What the tests established

The direct XRP ↔ RLUSD and XRP ↔ USDC tickets send reviewed terms to the guard. The backend authenticates the wallet, constructs a self-payment, checks the exchange terms, fee and deadline, and reads back the stored Xaman request before releasing its signing link. A recipient injected at the browser’s last handoff reached the mock provider on the original portal. The guarded routes blocked that input. A stored recipient mismatch or an unrestricted signer caused the guard to withhold the signing link. The test also covered acknowledgement loss and recovery without issuing a second request. A dishonest page can still request a larger, otherwise permitted self-swap. The wallet holder must check the spend shown in Xaman. The XRBC-token ticket and other actions use their existing signing paths.

Recorded evidence includes 22 offline cross-repository simulations, 70 backend tests and 1,342 frontend tests. Both repositories passed CI at the pinned revisions. Tests used fixtures for the provider and ledger. None exercised a live wallet signature or settlement. Evidence IDs end in `SWAP-GUARD-SIM-2026-11-01`, `SWAP-GUARD-BACKEND-CI-2026-11-01` and `SWAP-GUARD-PORTAL-CI-2026-11-01`.

## If the user reopens this work

First compare current application sources and hosting capabilities with the pinned revisions and runbook. A production release requires a separately verified Xaman requester identity inaccessible to the browser, plus a private request journal shared by all writers that survives restarts. The journal records whether a signing request may already have been issued. Losing it can allow a duplicate after an interrupted response. Render Free cannot attach a persistent disk. Price alone establishes nothing about transaction security. [Render storage documentation](https://render.com/docs/free#other-limitations)

Before considering activation, demonstrate recovery across a restart against the intended storage and verify the real wallet’s requester identity, allowed signer and displayed amounts in a controlled environment. Keep the draft on standby until the user requests activation and those checks pass.
