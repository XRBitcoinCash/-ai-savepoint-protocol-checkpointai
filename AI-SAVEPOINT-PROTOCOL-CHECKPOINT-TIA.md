# XRBitcoinCash AI Memory & On-Task Operating Contract

**Document ID:** `xrbc/ai-memory/2.0.0`  
**Status:** Active  
**Updated:** 2026-09-14  
**Machine-readable twin:** [`ai-memory.json`](https://raw.githubusercontent.com/XRBitcoinCash/-ai-savepoint-protocol-checkpointai/main/ai-memory.json)  
**Web entrypoint:** [`xrbitcoincash.github.io/.well-known/ai.js`](https://raw.githubusercontent.com/XRBitcoinCash/xrbitcoincash.github.io/main/.well-known/ai.js)

This is a compact, repo-native continuity layer for AI agents working on XRBitcoinCash and its explicitly requested XRPL applications. It preserves decisions and constraints; it is not a hidden model memory, a transcript dump, a credential store, or a permission to act.

## Agent entrypoint

Before planning or editing code, an agent should:

1. Read this contract and `ai-memory.json`.
2. Read the target repository's `README`, `AGENTS.md`, security policy, and relevant page documentation.
3. Check the latest savepoint or release note for the target feature.
4. Inspect the exact target file and its current branch/commit.
5. State the target, non-goals, acceptance checks, and rollback point before changing anything.

If a referenced file, branch, endpoint, or requirement cannot be verified, stop and report the missing evidence. Do not fill gaps with invented values.

## Precedence and scope

When instructions conflict, use this order:

1. The user's current, explicit request.
2. Repository-local instructions and security policy.
3. This contract and its machine-readable twin.
4. Archived conversation notes and older savepoints.

Conversation history is context, not authority. Preserve a prior decision only when it is recorded here or in a current repository document. Do not widen a one-page request into a repository-wide rewrite.

Supported project scope:

- `XRBitcoinCash/xrbitcoincash.github.io` — public GitHub Pages site and AI discovery.
- `XRBitcoinCash/xrbitcoincash-core` — internal/core documentation and scripts.
- `XRBitcoinCash/XRBitcoin` — XRBitcoin application when explicitly named.
- `XRBitcoinCash/JCS-token-on-the-XRPL` — JCS application when explicitly named.
- `XRBitcoinCash/-ai-savepoint-protocol-checkpointai` — this memory and savepoint archive.

No other repository, account, wallet, backend, or deployment is in scope unless the user names it.

## Stable project facts

- Primary site: `https://xrbitcoincash.com/`
- Network: XRP Ledger Mainnet.
- XRBC issuer: `rEjwniYhYR5QDZzK1a1x2359j8j8N43Ypw`.
- XRBC currency hex: `5852626974636F696E6361736800000000000000`.
- XRBitcoin issuer: `rGQaHbQHCsTLQtboQPwUBasXjLvk8uDbpT`.
- XRBitcoin currency hex: `5852626974636F696E0000000000000000000000`.
- Wallet-side authorization is independently reviewed in Xaman; the site is non-custodial.
- Public ledger facts must be kept separate from interpretation, market claims, and external-provider data.

Verify identity, network, destination, amount, flags, and memo in the wallet or validated ledger before treating a value as authoritative. Never use a ticker, logo, search result, or AI statement as proof of asset identity.

## Cost-aware work loop

Use one bounded pass at a time:

1. **Classify:** documentation/UI polish, contained bug, multi-file feature, or architecture/security decision.
2. **Plan:** write the smallest file list and explicit non-goals.
3. **Inspect:** search before editing; preserve working code and exact casing.
4. **Implement:** make the smallest additive or surgical change that satisfies the request.
5. **Verify:** run syntax, unit, integration, and security checks appropriate to the change.
6. **Review:** escalate only the failed assertion or uncertain section, not the entire project.
7. **Record:** add a short savepoint with facts, impact, checks, and remaining risks.

Suggested model routing (when these models are available):

- **GPT-5.6 Luna:** wording, CSS, documentation, mechanical edits, and routine parsing.
- **GPT-5.6 Terra:** contained implementation, tests, and ordinary debugging.
- **GPT-5.6 Sol:** multi-file XRPL/Xaman/Render integration, security review, and difficult failures.
- **GPT-6 Astra:** architecture, ambiguous threat models, deep research, and final high-risk audit.

Do not send the same full task to every model. Escalate with a compact failure log and the relevant code only.

## Sandbox protocol

The sandbox is for local, synthetic, reversible work only. Use an untracked worktree or the repository's `ai/sandbox/` directory. The sandbox must:

- use fake accounts, fake hashes, fixture ledger responses, and test endpoints;
- never contain seeds, private keys, API secrets, personal data, or real signing payloads;
- never be loaded by production pages or deployment jobs;
- never submit a transaction, connect to a user's wallet, move funds, or alter a live backend;
- include a short hypothesis, fixture, expected result, observed result, and cleanup note;
- be deleted or promoted only after a human-reviewed patch passes the real test suite.

Sandbox success is not proof of a live-wallet result. Report simulated and real-device checks separately.

See [`ai/sandbox/README.md`](https://raw.githubusercontent.com/XRBitcoinCash/-ai-savepoint-protocol-checkpointai/main/ai/sandbox/README.md) for the experiment template.

## Security and safety invariants

- Never commit wallet seeds, private keys, passcodes, recovery phrases, credentials, or environment values.
- Keep public read-only ledger access separate from transaction preparation and signing.
- Do not change a proxy, Render service, network allowlist, CSP, wallet flow, or API contract without an explicit request and a regression check.
- Desktop signing remains QR-only; mobile signing remains an explicit Xaman handoff where the target project supports it.
- Validate addresses, amounts, balances, reserve buffers, currencies, issuers, NFT IDs, and ledger validation state.
- Disable duplicate async submissions; handle cancellation, timeout, rejection, stale responses, and missing data visibly.
- Prefer `textContent`; escape every dynamic value before `innerHTML`.
- External links are independent services, not endorsements or guarantees.
- A ledger record proves only what the validated record establishes; it does not automatically prove ownership, authenticity, legal title, intent, fraud, or safety.

## Definition of done

A change is complete only when:

- the exact requested behavior works;
- non-goals and existing working features remain unchanged;
- relevant syntax, unit, integration, accessibility, and security checks pass;
- live calls are labeled as live and simulations as simulations;
- no secret or unrequested network behavior was added;
- the full commit SHA, changed files, checks, and remaining manual checks are recorded;
- deployment is not claimed until the target deployment is verified.

## Savepoint format

Append concise entries; do not paste full conversations:

```text
### [SAVEPOINT-YYYY-MM-DD] title
Context: one or two evidence-based lines.
Changes:
- exact files, constants, behavior, or decision
Impact:
- what future agents must preserve
Checks:
- commands/results and any manual check still required
TODO:
- only concrete remaining work
```

Older entries remain historical. A newer verified savepoint supersedes an older one; it does not erase the audit trail.

## Current operating rule

**Evidence before action. Preserve working paths. Change one bounded thing. Test it. Record what changed.**

This contract improves continuity and reduces repeated reasoning; it does not override model safeguards, repository permissions, user approval requirements, or independent wallet review.
