# Handoff readiness — initiator-device journal and stateless bridge — 2026-10-20 UTC

The user now authorizes repository redesign: each initiator browser/device coordinates its own journal; existing Render is only a stateless Xaman credential bridge, no database. Any new service/cost and the owner's tower acting as users' server are rejected. Deployment, hosting configuration and infrastructure remain held. The earlier local/full-Node/PostgreSQL/Neon alternatives are superseded as current choices; no service/account was created.

Implementation is committed in existing draft reviews with passing scoped CI, still unmerged/undeployed. Actual Edge persistence/reload, existing app/audience/provider behavior, wallet/indexer acceptance and live settlement remain unverified.

## Required workflow and security evidence

- Keep the existing Advanced Tokenization page. Initiator stays there; recipient only scans the exact QR/deep link and signs in Xaman. No second recipient browser, proof link or invitation/approval file procedure.
- IndexedDB retains exact plan/stage/request/approval/dispatch/recovery identities. Transactional CAS and Web Locks are same-origin/profile protections. No global cross-device CAS or server reservation claim. Missing/cleared local state is not proof of no prior request.
- Freeze outer Account/Sequence and ordered terms before recipient approval. Native approval plus original-NFT burn and ledger sequence constrain valid settlement across competing devices. Preserve fresh identity/network/ownership/sequence/fees/reserves and exact inner-result verification; failed competing submissions may still cost outer fees.
- Keep pending/uncertain records and original request IDs through reload/provider failures. No automatic retry of ambiguous POSTs or replacement requests. Absence-based expiry recovery needs applicable deadlines, complete validated account history, correct scan bounds/pagination and gap-free `complete_ledgers` coverage of the full relevant interval.
- Existing Render performs credential-safe authenticated Xaman create/status/cancel bridging only. Preserve official pinned RS256 app/audience/account checks, request bounds, exact recipient/plan and fresh mutation/provider consistency. No coordinator PostgreSQL or durable server user-record state.
- Retain all four ALLORNOTHING actions, 2,500 XRBC gates, publication/XRP limits, immutable restricted successor, original-retirement warning and independent validated inner receipts. Personal attestations/signatures remain deliberate user actions; no custody or automatic final consent/submission.

## Source, runtime and release gate

Frontend MR !111 `0551e8a450089563b802a406d86c808821e9ed2b`:18 exact remote blobs, pipeline2965782825 success659 frontend/113 reference-backend, zero failures/skips;11 critical pages,12 tools/7 tiers,24 sidebar pages; repository validation remains advisory. Backend PR #2 `45645b496c35c07ed90a5e765059cd977b4d7bd2`:12 exact blobs, tree591e89c3f7d77edb1371d2ca2e996a556bef3b98, API run39358811935/job118419856218 success179/179, zero failures/skips. Local frontend140/140/backend179/179 passed. Core18/IDB14 fixture/client18 are included subsets, not added totals. No actual browser engine or live provider/wallet result.

Exact no-dispatch503 rollback requires known explicit code, status503, dispatched=false and own successful CAS release. Initial creation can release that reservation; final creation restores approved/senderRequest=null. Ambiguous responses/races remain locked; fresh review preserves form. Gap-free complete_ledgers recovery and all unchanged financial/native approval rules remain mandatory. Prior database-backed tests concern the preceding architecture.

Existing Render access/source/credentials-by-name were inspected earlier; actual OAuth audience/provider integration remains unverified. No resource/configuration/merge/deployment or wallet action occurred. Backend main auto-deploys Render and frontend master publishes Pages, so keep both release paths held. No paid database or new service is a continuation step.

Only on explicit release/testing resumption, verify actual Edge journal persistence/reload and existing bridge app/audience/provider behavior for these exact commits, with strict TLS/current identity. No purchase/new service is a next step. Committed source/scoped CI does not satisfy these actual runtime checks. Do not weaken checks to accommodate per-device storage. Keep the no-second-browser/no-file flow. Prepare memory before website release and stop all tools immediately after success. Prior budget/advisory history remains at `69171685fac05306d89f2abf6fdb6fd8648349e3`; existing dated records/archives remain unchanged.
