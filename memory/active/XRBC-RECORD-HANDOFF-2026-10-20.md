# P2P Record Handoff — Render spending declined; storage options under review — 2026-10-20 UTC

## Intent, authority and current state

Latest user instruction: decline the $6.30/month database and take no Render actions until the project is fully live/useful. This supersedes pending cost approval and holds the earlier release queue. Current scope is explanation/alternative-design research plus memory maintenance. No architecture rewrite, Render/browser operations, infrastructure/configuration, merge, deployment or wallet action. Preserve the Advanced Tokenization page, exact financial/security rules and deliberate Xaman signing.

Private source/hosting access is verified. October15's 404 is superseded; it never proved deletion or unauthorized change, and no repository was made public.

Both code candidates remain draft, unmerged and undeployed with passing scoped CI and unchanged candidate/production heads. Render is connected in the user-confirmed existing workspace. Actual service `xrbitcoincash.github.io`, https://xrbitcoincash-github-io.onrender.com, uses the recorded GitHub main source, root `xrpl-proxy`, Node, Oregon, free web plan and automatic deployment. Its current live revision is `bd225b2af35e55e3544fc2a46affce4a0cf72926`, deployed October 7, consistent with the prior checkpoint.

Read-only hosting inventory contains no Render PostgreSQL instances. Secure Dashboard inspection of key names found existing `XAMAN_API_KEY`/`XAMAN_API_SECRET`; no `HANDOFF_ENABLED`, `HANDOFF_DATABASE_URL`, `XAMAN_OAUTH_AUDIENCE`, common database variables or linked environment groups. No values were read/revealed or configuration changed. Durable database and handoff/OAuth configuration were missing at inspection; hosting/repository access is resolved. Latest budget/Render hold prevents release actions. A frontend master merge automatically publishes production Pages and backend main auto-deploys Render; neither draft has merged.

The prior Render proposal/form was prepared only, never submitted or approved; **$6.30/month is declined**, not awaiting approval. Its quote/configuration details remain in checkpoint `2bf159db0742ff6811bb5fbbfdc42603e2dbf3f7` and scoped evidence. Do not resubmit the proposal or create a recurring bill. The earlier safe status snapshot returned cold-start 503 then one warm 200 operational with configured/verified wallet authentication, Mainnet ledger107773972 closed `2026-10-20T01:45:50Z`, age7s. That dated response is not OAuth audience/P2P readiness; no status recheck occurred in this advisory turn.

## What storage means and unselected alternatives

The current database is durable **off-ledger coordination state**: exact reviewed plan, stage, Xaman request identity/approval, dispatch status, sender/NFT reservations, compare-and-swap and uncertain-result recovery. Completed assets/transactions are on XRPL. The database is not holding token ownership or private signing keys. Losing coordinator state must never trigger an automatic replacement request or financial retry.

Computer/phone browser storage (IndexedDB) could retain development drafts, pending references and receipts. Web Locks coordinates tabs in the same browser profile/origin; it does not provide shared cross-device reservations/CAS. Storage may be cleared or unavailable on another device. These are design options, not implemented substitutes for current durable coordinator guarantees.

A full local Node + PostgreSQL development setup is feasible, with isolated origins, TLS and app/provider configuration; it is not implemented or selected. Official Neon pricing https://neon.com/pricing was checked: $0 Free, no time limit/no credit card, 1 GB/project and 100 CU-hours/month/project. This is an unselected shared-PostgreSQL candidate with quota/connectivity/integration gates, not an approved account/service or deployment plan. No account/resource was created. Await a user choice and implementation direction before changing architecture.

## Source identity and completed evidence

Frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project` (75781181), master `60fdd38c3796a30ba6d587003ecb1f48c3749b19`, Draft MR !111 head `8ca28e61f024956dd30338880c6ac25427e74665`. Pipeline2962668083 passed 614 frontend/89 backend, zero failures/skips, 11 critical/24 sidebar pages; repository validation remains advisory. Five candidate files matched tested blobs. Production retains staged file exchange.

Backend: private GitHub `XRBitcoinCash/xrbitcoincash-source`, main/live `bd225b2af35e55e3544fc2a46affce4a0cf72926`, Draft PR #2 head `b353f224d98899285e313dc4c05095f60bb9234a`. Seven files matched tested blobs/tree; run39237671853 passed API153/153 and real PostgreSQL16.15. Full URLs/job identities/limits remain in scoped evidence and unchanged Oct19 brief. Reuse only matching relevant inputs; no tests rerun or required live gate waived.

The reviewed security update closes a reserved-status compare-and-swap race, prevents expired/terminal record replay and reads fresh provider state before cancellation. Xaman payload responses now require consistent signed/resolved state and reject disabled payloads. A bounded 30-second pending-response cache (64 entries, 1 MB), request coalescing and 429 cooldown reduce repeated provider reads; mutations force fresh state. No POST retry or automatic replacement is added. The existing page receives one Xaman 5.4.0+ compatibility hint. Exact published source/readbacks and successful candidate CI are recorded above.

Real PostgreSQL16.15 CI passed actual schema/concurrency/CAS/restart and connection-loss/commit-recovery checks. No local real-PG execution or XRPL/Xaman traffic; deployed storage/OAuth/provider configuration is unverified.

## Documentation and read-only protocol checks

Official XLS-56 Batch documentation and Xaman multiple-inner-signer/checklist/polling guidance were reviewed on October 19. The exact four-action ALLORNOTHING design, BatchV1_1 signing preimage, fees and current codec support were checked. Multi-party Batch requires Xaman 5.4.0+; establish outer Account and Sequence before recipient approval. Preserve exact reviewed fields/order, roles, fees and deadlines through the final sender request. Check actual installed-wallet support at use; a version hint is not provider acceptance.

Official provider endpoint paths and RS256 issuer/JWKS behavior match the implementation. The actual deployed app UUID/OAuth audience remains unverified. Authentication, a valid payload/signature and validated ledger completion are different facts. Use pending-state polling/cooldowns; a status GET must never create or replace a request, and a failed/uncertain mutation must retain its state lock.

Oct19 read-only Mainnet snapshot: network 0, validated ledger 107759798, required NFT/mint-offer/BatchV1_1/fixBatchV1_2 amendments enabled; exact hash is retained in scoped evidence. Keep fresh network/amendment/account/ownership/sequence/fee/reserve checks before signing. The earlier bounded status timeout is superseded only by the scoped current status above.

Primary references: https://xls.xrpl.org/xls/XLS-0056-batch.html ; https://docs.xaman.dev/concepts/special-transaction-types/batch-multiple-inner-signers . Checklist/polling links remain in the unchanged Oct19 brief.

## Durable user/security contract

Keep one current Universal SDK and current connected-account comparisons across awaits. Mainnet; both roles hold at least 2,500 XRBC, with sender retaining the threshold after exact 0.000001 XRBC publication cost. Gate is wallet holdings, not a pool deposit. Price is XRP-only, defaults zero; price plus network fee remains at most 1 XRP. No extra wallet connector, custody, issuer-policy change, altered economics or unrelated trading feature.

Schema `xrbc-record-handoff-v1` has one sender, one receiver and one original NFT. Four ALLORNOTHING inner actions: exact XRBC publication cost; immutable transferable successor mint with recipient-restricted offer; receiver acceptance; sender owner-burn of original. Sender is successor issuer; display both issuer identities and original-retirement warning. No guessed successor/offer IDs, royalties, mutable/issuer-burnable flags or invented ownership/backing/legal rights. Hard mint-offer expiry is 30 minutes; outer LastLedgerSequence window +240. Preserve native current master/regular-key recipient BatchSigner verification; recipient multisignature remains unsupported.

Sender explicitly creates the exact recipient-restricted submit=false request. Receiver scans its QR/deep link in their own Xaman; an address alone grants no push permission. Both service and browser independently verify exact recipient approval before fresh unchecked sender acknowledgments and deliberate final request/signature. No second receiver browser or invitation/approval file exchange. Closing a page does not revoke a completed signature.

Backend keeps pinned official RS256 discovery/JWKS, explicit app/audience/account/expiry checks, bounded origins/actions/body/rate limits, PostgreSQL compare-and-swap and sender-account/NFT reservations before provider dispatch. Incoming recipient requests cannot reserve/displace that recipient's sender workspace. Unknown create/cancel/submission results retain exact request identity/reservations; failed, expired, cancelled, uncertain and validated states remain distinct. Share existing pending guards/Web Locks; no cached display-address authority. Ordinary publication, encrypted backups, attachments/artwork and personal attestations retain their established behavior.

Verified success requires every exact inner transaction's validated tesSUCCESS, expected ParentBatchID/order/same ledger, XRBC debit, restricted offer/successor issuer/URI/flags/fingerprint/delivery, opposing paid-XRP changes and original destruction. Outer success, an approval or coordinator status alone is insufficient. Do not repeat settled ordinary burn/mint or any financial transaction to recover context.

## Next action, stopping condition and history

One unfinished action: explain the off-ledger coordination requirement and help the user choose a zero-cost development/storage approach, then await implementation direction. Keep Render spending/actions and release on hold. Risk is treating disposable per-device state as authoritative shared recovery/consent and creating duplicate requests. Any future design must preserve exact-plan approval, cross-device reservations/CAS, strict TLS, current app/audience/provider checks and pending/cancel/expiry/validated-receipt behavior. Existing real PostgreSQL CI remains scoped evidence, not deployment. First live two-wallet settlement remains unverified; do not bypass guards or replay financial tests to demonstrate progress.

No new wallet request/signature/financial transaction, infrastructure resource, secret/configuration change or website deployment is established by this checkpoint. The latest Render hold blocks deployment. If a future explicit request resumes release, prepare memory first; stop all tools immediately after successful website deployment and report.

Current contract: `memory/contracts/HANDOFF-COORDINATOR-READINESS-2026-10-20.md`; shared rules: `memory/contracts/XLS-UPGRADE-CONTRACT.md`. Prior connected-hosting/cost-proposal state: checkpoint `2bf159db0742ff6811bb5fbbfdc42603e2dbf3f7`. Connection-pending history: `memory/archive/XRBC-RECORD-HANDOFF-2026-10-20-before-Render-inspection.md`, checkpoint `82c9f1d9a5443a87d9f7de794d48c945ffa24fe6`. Unchanged Oct19 brief/contract retain earlier Oct15 history. Scoped results are in `memory/evidence.json`. Exclude private wallets/payloads/signed blobs, credentials/database URLs, screenshots and raw logs from public memory.
