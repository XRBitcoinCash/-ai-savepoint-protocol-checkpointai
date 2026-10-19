# Handoff coordinator readiness — source restored, integration gates remain — 2026-10-19

## Separate observations

| Layer | Observed state | Limit |
| --- | --- | --- |
| Production frontend | GitLab project 75781181 `master`, MR !110 merge `60fdd38c3796a30ba6d587003ecb1f48c3749b19`; prior pipeline 2950293159 passed | Existing staged file-exchange UI; no coordinated replacement deployment established. |
| Actual backend source | Private GitHub `XRBitcoinCash/xrbitcoincash-source`; app selection restored access; `main` remains `bd225b2af35e55e3544fc2a46affce4a0cf72926` | Supersedes October 15 source-unavailable state. Earlier 404 alone never proved deletion or unauthorized change. |
| Backend integration candidate | Draft PR #2 current `b353f224d98899285e313dc4c05095f60bb9234a`, seven exact published files; run 39237671853 succeeded: API job 118010600651 passed 153/153, zero failures/skips; PostgreSQL job 118010600302 passed | Initial 5565431 had 140 passing CI tests, run 39234969343; no merge/service release inferred. |
| Frontend candidate | Draft MR !111 `8ca28e61f024956dd30338880c6ac25427e74665`, pipeline 2962668083; five exact published files; mirrored backend 89/89 local tests passed | Runtime job 17280504880 passed 614 frontend/89 backend, zero failures/skips; 11 critical/24 sidebar pages checked; repository job 17280504881 passed advisory; no merge/deployment. |
| Focused local follow-up | 153/153 backend tests pass; provider-state consistency/cancellation, reservation/replay and bounded polling/cooldown fixes | Source/synthetic results do not establish deployed provider or database behavior. |
| Real PostgreSQL | Official ephemeral PostgreSQL 16.15 CI passed init/idempotence, independent-process reservations/intent/CAS, connection-termination rollback, COMMIT/lost-ack and uncertain-COMMIT recovery, actual container restart | Scoped real-service CI passed; local installation was blocked by host setgroups permissions. No deployed storage/provider readiness inferred; no XRPL/Xaman traffic. |
| Mainnet protocol | Read-only network 0, validated ledger 107759798, hash `0E0E4752294165B154AFC89B31D46DB143C0D43E12DAAB289FE1DC428CE720FE`; required four amendments enabled | Snapshot only; keep fresh amendment/account/ownership/network/sequence/fee/reserve preflight. |
| Xaman documentation | XLS-56 BatchV1_1 and multiple-inner-signers reviewed; Xaman 5.4.0+ required; outer Account/Sequence fixed before recipient approval; official endpoint/RS256 issuer/JWKS compatibility checked | Actual deployed OAuth app UUID/audience, credentials/provider and installed-wallet behavior remain unverified. |
| Render service/persistence | Public status read timed out after 20 seconds; no deployed database/configuration check completed in this turn | Unavailable remains unknown. No resource, credential or service configuration was changed. |
| Financial outcome | No new signing/request/transaction; first complete live two-wallet handoff untested | CI, signature/provider status and validated settlement remain distinct. |

Both source candidates remain draft/unmerged/undeployed. Real-database CI is completed evidence; deployed database/OAuth/provider operation remains unverified.

## Release and testing gate

The user authorizes repository P2P implementation/security/testing. Keep exact code identity, required automated checks, real database behavior, configured OAuth/provider integration, website release and user-signed ledger settlement separate. No secret values, payloads, wallet records or database URLs belong in public memory. Preserve dated October 15 contract unchanged as superseded history.

Before a dependent frontend release: integrate the exact reviewed code into the actual backend source; establish approved durable TLS-verified PostgreSQL; verify restart/two-worker reservations/compare-and-swap/connection-loss/migration behavior; verify actual Xaman app UUID/audience and authenticated exact-plan/role/provider endpoint behavior without publishing tokens/secrets; confirm request/cancel/status/expiry/unknown-outcome recovery against the actual service. Never weaken issuer/audience/native approval checks, automatically retry POSTs, replace an ambiguous request or present fixture/CI success as deployed integration.

Keep four exact ALLORNOTHING actions, original-retirement warning, both 2,500 XRBC gates, exact publication cost, XRP fee/price limits, immutable successor/restricted offer and independent inner receipt verification. Sender final submission remains a deliberate reviewed Xaman action following exact verified recipient consent. Closing the page does not cryptographically revoke consent. Stop on unavailable prerequisites. After a later requested website deployment succeeds, stop all tools immediately; reconcile only on a new explicit user request.
