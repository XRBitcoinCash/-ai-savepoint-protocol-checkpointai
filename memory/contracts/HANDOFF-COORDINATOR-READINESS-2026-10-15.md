# Handoff coordinator source and configuration readiness — 2026-10-15

## Identity and observed state

| Layer | Observation | Meaning |
| --- | --- | --- |
| Production frontend | GitLab project 75781181, master MR !110 merge `60fdd38c3796a30ba6d587003ecb1f48c3749b19`, pipeline 2950293159 succeeded | Existing staged file-exchange UI is deployed; no-file coordinator is not. |
| Actual Render source | GitHub `XRBitcoinCash/xrbitcoincash-source`, `main`, last live `bd225b2af35e55e3544fc2a46affce4a0cf72926` | This is the configured backend identity to recover. |
| Source retrieval | GitHub connector returned 404 for the actual source | Access/source is unavailable; do not infer deletion or use another repo as the deployed source. |
| Other archive/snapshot | Available under another repository/local snapshot | Review/reference material only, not actual Render source or an integrated release. |
| Existing Render credentials | Names `XAMAN_API_KEY` and `XAMAN_API_SECRET` are present | No values read/published; application UUID must match the website app before enabling. |
| Persistence | Free service, no configured coordinator database observed | Durable coordinator state is not ready. No database/resource was created. |
| OAuth identity | Actual audience/discovery/JWKS behavior not live verified | Verify official app/audience; do not guess or weaken issuer/audience checks. |
| PostgreSQL integration | Store tests use a transactional driver fixture | Actual restart, two-process reservations/CAS, connection-loss and migration remain required. |
| New review package | GitLab `src/backend/handoff-coordinator`, Draft MR !111 candidate `e25efc771b0c068c8ce5a800ea316311053da2b4` | Reviewable source only; does not mutate GitHub backend, Render config or live routes. |

## Readiness gate

Status is **blocked-ready-for-config**, not deployed or live tested. Exact candidate/readbacks, 250 frontend/68 backend local checks and MR CI (614 frontend/68 backend) passed; no deployment or live integration is established. Keep user authorization, provider permissions, configured-source access, database readiness, source/synthetic tests, service integration and financial signing as separate gates. No secret/credential value/database URL or private participant data belongs here.

Before any frontend merge/deployment that requires coordinator routes: recover/check the actual configured backend source; integrate the reviewed auth/provider/routes/state/storage/runtime changes there; configure approved durable TLS-verified PostgreSQL storage and server-only credentials; verify app UUID/OAuth audience against the actual Xaman app without exposing tokens/secrets; verify authenticated exact-plan/role checks, atomic replay/duplicate/uncertain-state recovery and endpoint compatibility against the deployed build. Do not substitute an archive or claim synthetic tests establish configured service operation. Do not create resources or change account/service configuration merely to make this checkpoint concrete.

Xaman signatures remain user actions. Coordinating approval is not custody, consent, settlement or cryptographic revocation; final reviewed sender submission and strict validated four-action receipts remain mandatory. No automatic request replacement or historical financial test.

Frontend and backend are deliberately held as a draft review package until the actual source/configuration blockers are resolved. On any later successful requested deployment, stop all tools immediately and report; reconcile only in a new explicit turn.
