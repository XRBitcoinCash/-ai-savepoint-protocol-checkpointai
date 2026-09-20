# XRBitcoinCash Ecosystem Production Scaffold — 2026-09-20

**Status:** Active implementation checkpoint  
**Primary implementation date:** 2026-09-22  
**Source of truth:** GitLab `xrbitcoincash-group/xrbitcoincash-project`, branch `master`  
**Verified GitLab head before this checkpoint:** `4d7343c8c624e805298a4cd30c0a8f609f35b548`  
**Verified pipeline:** `2865125823` — success

## Why this checkpoint exists

Deep research on 2026-09-20 audited XRBitcoinCash gating, user experience, anti-abuse controls, Xaman signing, liquidity behavior, and production readiness. The central conclusion is that the project's security architecture is materially stronger than its release-validation discipline. The next implementation pass must harden shared state, testing, and observability before adding more visual complexity.

## Stable decisions

1. XRBC access gates are reusable **holding requirements**, not payment, burn, escrow, subscription, or token seizure.
2. Do not introduce a USD oracle that silently changes gates. Gate changes are explicit versioned policy decisions.
3. Preserve the current threshold ladder until authoritative market evidence justifies a deliberate change:
   - public/basic: 0 XRBC
   - Bridge Integrity advanced: 10 XRBC
   - Extended Audit: 50 XRBC
   - Sentinel Forensics: 150 XRBC
   - Risk Lens: 150 XRBC
   - Value Path: 400 XRBC
   - Watchtower: 1,000 XRBC
   - Advanced Tokenization: 2,500 XRBC
4. A higher gate must unlock materially more evidence depth, compute cost, forensic scope, historical analysis, monitoring, exports, or transaction capability. Do not use a higher threshold for a cosmetic duplicate of a lower-tier tool.
5. Before changing a threshold, calculate the implied XRP/USD exposure from current XRBC market evidence and compare it with the intended user audience.
6. Frontend holding checks are not authorization for privileged backend work. Any privileged endpoint must independently revalidate wallet identity, gate threshold, request freshness, ledger state, and scope.
7. Token gates do not replace rate limits, idempotency, replay resistance, concurrency limits, or request-size controls.
8. Do not attempt to block legitimate XRPL AMM arbitrage through the website. Protect users with fresh ledger reads, explicit bounds, exact intent validation, and verified finality.

## Required tier behavior

### Public / 0 XRBC
Useful basic telemetry must remain available without a wallet wherever practical:
- ecosystem discovery
- readiness/ledger telemetry
- Liquidity Sentinel basic pool evidence
- basic Tokenization Auditor planning
- settlement/receipt lookup where no private wallet action is required

### 10 XRBC
Bridge Integrity advanced local evidence:
- evidence consistency
- route/asset identity checks
- freshness and arithmetic validation
- no claim of bridge solvency without authenticated external proof

### 50 XRBC
Extended Audit:
- validated account/trustline/transaction evidence
- larger transaction samples
- burst/participation analysis
- evidence export

### 150 XRBC
Risk Lens and Sentinel Forensics:
- issuer controls
- market depth and exit capacity
- concentration
- pool history / forensic observations
- evidence completeness/confidence
- stronger warning explanations and reproducible exports

### 400 XRBC
Value Path:
- multi-venue / multi-leg route comparison
- AMM and order-book execution modeling
- fill, impact, maker concentration, spread, path quality
- scenario analysis and protected bounds

### 1,000 XRBC
Watchtower:
- repeated monitoring snapshots
- configurable thresholds
- local trend/history
- portfolio/token enumeration only after gate
- alert/evidence model deeper than one-shot scans

### 2,500 XRBC
Advanced Tokenization:
- deepest source traversal
- larger holder/book/history caps
- evidence pack integrity
- architecture planning
- exact wallet-approved issuance/mint workflow where supported
- validated result recording

## Production transaction invariant

All ledger-changing XRBC applications must converge on this state model:

`click -> readiness wait -> exclusive lock -> fresh state read -> simulate -> bind intent -> create exactly one Xaman payload -> user signs/rejects/expires -> reconcile -> validated XRPL result -> critical-field verification -> terminal cleanup`

Rules:
- Page load must not wait for Render.
- A user action may wait for backend readiness, with visible status and cancel.
- No Xaman transaction payload exists during backend warm-up.
- Backend readiness must finish before acquiring the signing-critical lock.
- Xaman authorization-only connection is not a transaction request.
- Exactly one payload is allowed per deliberate final intent.
- A timeout or provider error during payload creation is **not proof that no payload exists**.
- Never automatically create a replacement payload after an ambiguous create result.
- Preserve UUID, challenge, intent hash, account, network, reviewed transaction and pending state for recovery.
- Mainnet only for production signing.
- `signed:true`, submitted, or dispatched are not success.
- Success requires validated XRPL evidence, `tesSUCCESS`, expected account, and critical-field equality with the prepared transaction.

## Regression history that must become tests

- `2b53901c0b418a121a34f4cc4f78536479e83cb5`: security hardening accidentally made backend warm-up too global.
- `0ef0bacc91d4079fc530582fb64d97d0a9dcbcce`: moved waiting to the individual action.
- `4d7343c8c624e805298a4cd30c0a8f609f35b548`: fixed duplicate `sleep` declaration that prevented the entire liquidity application script from parsing and left all controls inert.

Permanent release rule: a successful generic pipeline is insufficient. CI must prove critical page JavaScript parses and critical button bindings reference real DOM elements.

## Scaffold to implement

### Shared configuration
Create a machine-readable gate registry containing:
- tool id
- route
- threshold
- access semantics
- intended tier
- required capabilities
- whether server enforcement is required

Create a retry policy registry containing:
- transient HTTP statuses
- maximum readiness duration
- backoff schedule
- retryable operation classes
- explicit prohibition on automatic payload-create retry

### Shared transaction library
Add reusable modules for:
- explicit transaction state machine
- error taxonomy
- retry/readiness policy
- Xaman payload invariants
- gate registry validation

Do not refactor working production pages into the shared library in one large pass. First land and test the library, then migrate one page at a time.

### CI / release validation
CI must fail when:
- a critical standalone HTML document contains duplicate roots
- executable inline JavaScript fails to parse
- a direct `$('id')` binding references a missing DOM id
- a transaction page loses required primary control bindings
- a gate registry entry is malformed
- unit tests for state transitions or retry safety fail

### Server-side controls
For privileged APIs:
- default deny
- fresh gate check
- wallet/session scope
- per-IP and per-wallet/session budgets
- global concurrency ceiling
- request-size limits
- bounded timeouts
- structured safe errors
- idempotency for transaction-intent creation where a server creates remote state
- minimal structured telemetry with no secrets

### Observability
Track at minimum:
- app boot and control binding
- backend readiness latency
- warm-up timeout/cancel
- upstream HTTP error class
- queue depth
- rate-limit events
- payloads created per intent
- ambiguous create outcomes
- rejected/expired/signed/validated outcomes separately
- intent/account/network/field mismatch as zero-tolerance security events
- time to validated finality
- JS exceptions by release SHA

Never log seeds, private keys, auth tokens, real secrets, or unnecessary raw payload bodies.

## September 22 dependency order

1. Read this checkpoint, `ai-memory.json`, the canonical contract, `CONTRIBUTING.md`, and `THREAT_MODEL.md`.
2. Verify current GitLab `master` head and pipeline; do not assume `4d7343c8...` is still current.
3. Verify and preserve the current gate thresholds before editing.
4. Land CI parse/DOM/CSP/runtime smoke checks.
5. Land shared state-machine, error-taxonomy, retry-policy and gate-registry modules with unit tests.
6. Land backend access-policy registry and tests without changing public threshold semantics.
7. Migrate transaction pages incrementally; Liquidity Pool and Order Manager are the reference patterns.
8. Add mobile/Xaman app-switch, two-tab, cold-backend, cancellation, rejection, expiry, ambiguous-create and validated-success tests.
9. Only after those pass, expand individual higher-tier tools so each gate earns its threshold with demonstrably deeper metrics.
10. Review gate economics again from current XRBC/XRP liquidity and price evidence before changing any threshold.

## Definition of done

A production tool is not complete because it renders or because a pipeline is green. It is complete when:
- the page boots without the backend;
- controls bind;
- the gate behavior matches the canonical registry;
- transient dependencies degrade without trapping the UI;
- no duplicate Xaman request can be produced by retry logic;
- pending requests recover safely;
- validated finality is checked;
- mobile and keyboard paths work;
- evidence/export wording accurately describes limitations;
- runtime telemetry can explain a future 404/429/503 rather than forcing a guess.

## Explicit non-goals

- no fiat pass or subscription bypass for XRBC gates
- no automatic USD-pegged gate adjustment
- no attempt to suppress public XRPL arbitrage
- no seed/private-key handling
- no large one-shot rewrite of all public HTML pages
- no claim that frontend locks can prevent prompts from unrelated third-party Xaman applications
- no claim that token holding alone prevents determined bot abuse

