# Xaman wallet standardization audit — paused for higher-capability review

**Savepoint ID:** `SAVEPOINT-2026-09-19-xaman-standardization-audit-pause`  
**Date:** 2026-09-19  
**Status:** Paused intentionally before final verification  
**Scope:** XRBitcoinCash active GitLab frontend wallet connection/signing consistency audit  
**No frontend or backend code is changed by this checkpoint.**

## User decision

The user chose to stop the wallet-standardization correction pass and preserve the audit state for continuation with a higher-capability ChatGPT configuration. The next model should resume from repository evidence rather than repeat the discovery work or assume the current frontend is fully verified.

Do not treat this savepoint as a completion certificate. The final repository-wide verification, real browser/device verification, and final security sign-off were not completed in this audit.

## Active source of truth observed at pause

- GitLab project: `xrbitcoincash-group/xrbitcoincash-project`
- GitLab project ID: `75781181`
- Branch: `master`
- Head observed while saving this checkpoint: `ffc50caed8694f2fada443cbd8748bec1890a34a`
- Observed commit title: `Standardize Xaman connection and signing validation`
- Parent: `04decf32ca30bcb983b7699fcc8f1c0154108242`

That commit appeared at the current head by the time this checkpoint was saved. It was **observed**, not accepted as proof that the requested standardization is complete.

Files changed by the observed head commit:

- `CONTRIBUTING.md`
- `THREAT_MODEL.md`
- `public/index.html`
- `public/xrbc-liquidity-pool.html`
- `public/xrbc-xaman-standard.js`
- `public/xrbitcoin-links.html`

The higher-capability review should compare this exact commit with its parent before making more edits.

## Required project-wide wallet architecture

### Connection standard

Wallet connection is authorization only.

Required behavior:

1. User presses **Connect Xaman**.
2. Call Xaman `authorize()` immediately from that user action.
3. Start the page's existing Render/XRPL read-service wake in parallel.
4. Do not create a transaction payload merely to connect.
5. Accept the public XRPL account only after authorization and the required read service are both ready.
6. Preserve restart/reset controls and stale-attempt protection.
7. After connection, read the page's normal wallet/gate data through that page's existing API/read path.

Reference behavior: Value Path / Risk Lens / Extended Auditor connection pattern.

### Signing standard

A ledger-changing request is a separate layer and occurs only after a deliberate transaction action.

Required behavior:

- `createAndSubscribe()` for the exact prepared transaction.
- Force XRP Ledger Mainnet.
- Fresh cryptographically secure six-digit challenge.
- Explicit transaction purpose.
- SHA-256 intent binding.
- Bounded Xaman request expiration and bounded XRPL ledger deadline.
- Official Xaman desktop QR / mobile deeplink for that same payload.
- Preserve payload UUID, challenge, intent hash, pending state, and returned transaction hash.
- Never create a replacement payload merely because transport/subscription state is uncertain.
- Wait for validated ledger evidence.
- Require `tesSUCCESS`.
- Require signing-account equality.
- Compare validated critical fields with the transaction the page originally prepared.
- Preserve stricter page-specific transaction validators.
- Protect against stale/restarted attempts.

Reference behavior: Order Manager / `limit-extraction` signing and post-ledger validation pattern.

## Shared standard discovered during the audit

The active frontend already contains:

`public/xrbc-xaman-standard.js`

The audit found shared helpers for:

- `authorizeAndWarm()`
- secure `newChallenge6()`
- canonical SHA-256 intent material
- `bindTransaction()`
- `createPayloadRequest()`
- `compareValidated()`
- account extraction / validation
- Xaman payload URL, QR and transaction-hash extraction
- stale-attempt and timeout helpers
- subscription disposal

At the observed head, the shared file reports version `1.1.0` and also contains `bindTransactionMetadataOnly()` for pages whose strict pre-existing memo/transaction schema must not be mutated while still binding purpose/challenge/intent in protected Xaman metadata.

Do not use metadata-only binding as a weaker substitute where the normal transaction-binding path is compatible. It exists for strict transaction schemas that must remain byte/field compatible with their page-specific validator.

## Live pages found using the shared authorization helper

Repository search during the audit found `XRBCXamanStandard.authorizeAndWarm()` in these active frontend pages:

- `public/asset-tokenization-auditor-advanced.html`
- `public/asset-tokenization-auditor.html`
- `public/creature-nft-links.html`
- `public/extended-audit.html`
- `public/index.html`
- `public/limit-extraction.html`
- `public/liquidity-sentinel.html`
- `public/risk-lens.html`
- `public/sentinel-forensics.html`
- `public/support.html`
- `public/value-path.html`
- `public/watchtower.html`
- `public/xrbc-ecosystem.html`
- `public/xrbc-liquidity-pool.html`
- `public/xrbc-lp-receipt.html`
- `public/xrbc-settlement.html`
- `public/xrbitcoin-links.html`
- `public/xrpl-bridge-integrity-monitor.html`

A later repository search should be repeated before editing because the branch may advance.

## Direct legacy authorization finding

At the last search in this audit, direct `xumm.authorize` occurrences were not found in active frontend page code outside the shared standard; remaining hits were in documentation/archive/validation material. Re-run this search against the then-current `master` before claiming project-wide consistency.

The intended invariant is:

- active page code calls the shared authorization helper;
- the shared helper is the only layer that directly invokes the SDK authorization primitive.

## Signing audit state

Multiple transaction-capable pages already use `createAndSubscribe()`. Multiple pages also use shared `bindTransaction()` and `compareValidated()`.

However, the audit was interrupted before a complete page-by-page proof that **every** ledger-writing path satisfies all of the standard at once.

Special attention was being given to:

- `public/index.html`
- `public/xrbc-liquidity-pool.html`
- `public/xrbitcoin-links.html`
- any NFT/receipt flow with a strict legacy memo schema
- any page that loads the shared standard but still keeps independent legacy signing/recovery logic

The observed head commit adds shared validated comparison to the homepage and shared metadata-only intent binding to XRBC Liquidity Pool / XRBitcoin transaction flows. These changes still require careful review and tests.

## What was completed in this audit

- Located the active frontend source of truth in GitLab.
- Located the canonical shared Xaman standard file.
- Identified the intended connection/signing separation.
- Audited repository-wide references to Xaman construction, authorization, `createAndSubscribe()`, shared binding, and shared validation.
- Confirmed that major gated tools already use the shared authorization helper.
- Identified the remaining verification target: consistency of every ledger-writing path, especially complex liquidity/XRBitcoin flows.
- Observed the current standardization commit and its changed-file set.

## What was NOT completed

- No final project-wide sign-off.
- No exhaustive proof that every live write path uses all required protections.
- No complete review of every changed line in `ffc50caed8694f2fada443cbd8748bec1890a34a`.
- No real desktop Xaman QR test in this audit.
- No real mobile Xaman deeplink/app-switch recovery test in this audit.
- No live XRPL transaction was submitted by this audit.
- No production Render/Xaman credential or environment changes were made.
- No deployment/runtime claim is made by this checkpoint.

## Continuation procedure

For the next higher-capability model:

1. Read `ai-memory.json`, this checkpoint, the canonical memory contract, `CONTRIBUTING.md`, and `THREAT_MODEL.md`.
2. Fetch the current GitLab `master` head. Do not assume it is still `ffc50ca...`.
3. If the head changed, compare the new head with this recorded baseline.
4. Review commit `ffc50caed8694f2fada443cbd8748bec1890a34a` against parent `04decf32ca30bcb983b7699fcc8f1c0154108242`.
5. Search active `public/` code for:
   - direct `.authorize()`
   - `new Xumm(`
   - `createAndSubscribe`
   - `bindTransaction(`
   - `bindTransactionMetadataOnly(`
   - `compareValidated(`
6. Build a page-by-page matrix: connection-only, read-only, signing capable, exact transaction types, shared helper use, pending/recovery behavior, validation behavior.
7. Repair only verified gaps. Preserve each page's existing API endpoints and transaction-specific business logic.
8. Run repository validation/tests and diff checks.
9. Separately perform or request controlled real-device Xaman tests for desktop and mobile before calling the wallet standard complete.
10. Record exact final commit, pipeline/test results, remaining manual checks, and rollback point.

## Acceptance checklist for completion

The future audit may call this complete only if all applicable live pages satisfy:

- connection uses authorization only, never a transaction;
- authorization begins immediately from the user click;
- backend/read wake runs in parallel;
- stale connection attempts cannot overwrite current state;
- read-only tools remain read-only;
- transaction creation happens only after explicit action;
- exactly one signing payload is used per intent;
- Mainnet is forced;
- six-digit secure challenge is fresh;
- purpose and SHA-256 intent are bound;
- expiration and ledger deadline are bounded;
- official QR/deeplink belongs to the same payload;
- transaction hash is captured;
- final status comes from validated XRPL evidence;
- `tesSUCCESS` is required;
- validated account equals the connected account;
- critical fields equal the prepared intent;
- page-specific stricter validators remain intact;
- restart/recovery does not create duplicate payloads;
- desktop and mobile behavior are both verified separately.

## Rollback / safety note

This checkpoint intentionally makes no live-code correction. If the observed GitLab standardization commit proves unsafe, its parent `04decf32ca30bcb983b7699fcc8f1c0154108242` is the immediate comparison point. Do not automatically revert; first determine whether later commits depend on it.

