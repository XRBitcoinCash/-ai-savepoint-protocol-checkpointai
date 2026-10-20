# Handoff storage decision — Render spend declined; advisory work only — 2026-10-20 UTC

Latest user instruction: decline the $6.30/month Render database and take no Render actions until the project is fully live/useful. The prior pending-approval queue is superseded. Current scope is explanation and alternative-design research plus checkpoint maintenance; no architecture rewrite, Render/browser operation, resource/configuration, merge, deployment or wallet action. Earlier release authorization is held by this newer constraint. Do not ask for the same paid approval again as an automatic next step.

## Unchanged recorded implementation state

Both code candidates remain draft/unmerged/undeployed: frontend MR !111 `8ca28e61f024956dd30338880c6ac25427e74665`, master `60fdd38c3796a30ba6d587003ecb1f48c3749b19`; backend PR #2 `b353f224d98899285e313dc4c05095f60bb9234a`, main/live `bd225b2af35e55e3544fc2a46affce4a0cf72926`. Recorded CI passed 614 frontend/89 backend/API153 and real PostgreSQL16.15. No tests or live checks were rerun in this advisory turn.

Render access/source were verified before the hold; the last inspection found no Render PostgreSQL or handoff/database/OAuth-audience configuration. Existing Xaman key names were present, values unread. The earlier scoped public 200 status is not coordinator/OAuth readiness. Auto-deploy remains a release risk: frontend master merge publishes Pages, backend main auto-deploys Render; neither merge is authorized now. The prior prepared database form was never submitted and no resource/bill was created.

## Storage purpose and options under discussion

Current PostgreSQL holds off-ledger reviewed plans/stages, exact Xaman request/approval/dispatch identities, reservations/CAS and durable recovery. Completed assets and transactions live on XRPL. Browser IndexedDB could store drafts, pending references and receipts; Web Locks coordinates same-profile/origin tabs. It cannot establish cross-device global reservations/CAS, and lost/uncertain state must never create replacement requests automatically. This local-storage option is not implemented.

An isolated local Node + PostgreSQL development environment is possible but requires origins/TLS/provider configuration and is not implemented. Official https://neon.com/pricing currently lists Free at $0, no time limit/credit card, 1 GB/project, 100 CU-hours/month/project. Neon is an unselected candidate, with usage/connectivity/integration checks still needed. No account/service creation or architecture adoption is authorized.

Next: explain these data roles and obtain the user's preferred zero-cost build approach before implementation. Preserve strict verified TLS, exact current account/app/audience/plan checks, native approvals, durable duplicate/uncertain recovery, all four ALLORNOTHING actions, holding gates/cost limits and independently validated inner receipts. No security downgrade to fit per-device storage; no automatic POST retry, custody or final signing/submission.

Prior cost/connected-hosting observations remain at checkpoint `2bf159db0742ff6811bb5fbbfdc42603e2dbf3f7`; Oct19 records and existing Oct20 connection-pending archives remain unchanged. No new archive copies are needed. For a later explicitly resumed website release, prepare memory before deployment and stop all tools immediately after success.
