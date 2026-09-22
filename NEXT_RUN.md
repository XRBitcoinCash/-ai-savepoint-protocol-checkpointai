# Next run — verified 2026-09-22

Active savepoint: `SAVEPOINT-2026-09-22-reliability-audit-memory-hardening`.
Mode: audit/checkpoint complete; application repairs not started in this pass.

## Start here

Read `ai-bootstrap.json`, `latest_savepoint.record`, `memory/operating-protocol.json`, and the relevant `memory/known-errors.json` entries. Use `ai-memory.json` and `memory/synapse-map.json` for routed details.

Refresh source heads before changes:
- Active frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, `master`; observed `97cfb36f244e8f11d806232aedf488fc34fb9898`.
- Shared backend: GitHub `XRBitcoinCash/xrbitcoincash.github.io`, `main`; observed `48c7ff4dd45b2658ba5ce3f6ddf7d86128fc9563`.
- Memory: this repository; rollback baseline `a04378435f83f852308ccd9f8dc81ce458322917`.

## First repair after user directs continuation

**XRB-001: remove the second Connect click on public/xrbitcoin-links.html.**

Compare current XRB `wireSdk/connect/adoptAccount` with the XRBC homepage's completion behavior. Bind completion only to the active user-initiated SDK/attempt/generation; verify application/account and read-only readiness; preserve xApp behavior. The missing browser event bridge is confirmed in source, but the exact real OAuth cause still needs reproduction. Do not simply copy passive homepage restore.

Then address separately:
1. XRB-007 — Cancel / restart handler currently returns while connecting.
2. XRB-008 — SDK construction exception leaves connecting latched.
3. BRIDGE-001 — advanced Bridge Xaman SDK/SRI setup incomplete.
4. CI-001, META-001, META-002, REF-001 — coverage/advisory, schema, license-label and missing-reference issues.
5. DEPLOY-001, UX-001 — served-build and real browser/device verification.

Each repair is bounded, tested and checkpointed before the next. Do not declare the wallet lifecycle complete while cancel/startup recovery remains broken.

## Verified checks and caveats

- Frontend runtime contracts: 10 pages pass.
- Gate registry: 12 tools / 7 tiers pass; no gate change authorized.
- Existing unit tests: 17 pass, including 7 XRB tests.
- Static scan: 27 public HTML pages / 118 executable inline classic scripts pass stated parse/root/ID/hash checks.
- Additional synthetic probes reproduce XRB-007/008 despite green existing tests.
- Latest GitLab pipeline 2870991044 succeeds, but validator job 16651226888 has **19 advisory findings / exit 1**. Security jobs are allow_failure. Green is not clean.
- API failure at b9ef92b is already fixed by 131e204e; passing run 35626734128. Relevant backend/test/workflow blobs unchanged at observed head. Do not duplicate that fix.
- Live wallet, custom-domain rendering, Render endpoint, mobile/two-tab and transaction finality were not tested here.

## Preserve

Authorization-only Connect; exact XRBC/XRB/JCS app and asset boundaries; immediate deliberate authorize with read-only warm-up in parallel; bounded cancellation; stale completion guards; one payload per final intent; pending/ambiguous transaction records; validated tesSUCCESS and exact critical-field verification.

No wallet seeds, transactions, deployment/settings changes, licensing-term edits, broad UI rewrites, Quick Buy restoration or gate changes from this checkpoint.

## Evidence and history

- `RELIABILITY-AUDIT-2026-09-22.md`
- `memory/audits/2026-09-22-reliability-audit.json`
- `KNOWN-ERRORS-REGRESSION-REGISTER.md`
- `memory/diagnostics/wallet-audit.mjs` — synthetic, no network
- Prior next-run retained: `memory/archive/NEXT_RUN-before-2026-09-22-audit.md`

GitHub/GitLab reads were verified. Other connected services must be checked when relevant. External memory works when loaded; it is not guaranteed automatic recall in every chat.
