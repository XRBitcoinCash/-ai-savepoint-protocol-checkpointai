# XRBC ecosystem XLS upgrade roadmap - recorded 2026-10-12

## Objective and current authority

On 2026-10-12 the user adopted a systematic ecosystem upgrade program and requested saving it to the GitHub AI Checkpoint before beginning implementation. **XLS-85 TokenEscrow is first.** Plan the other upgrades together so evidence formats, capability checks and transaction handling are not rebuilt independently for every phase or page. The user's escrow-first choice supersedes the earlier assistant recommendation to implement Batch first; it does not invalidate that research or the saved unsigned Batch preview.

Current deliverable: recommend the four-token escrow rollout and preserve the completed read-only eligibility checks. This checkpoint is not an authorization to deploy, move/lock funds, mint NFTs, create new issuances, change issuer settings, delegate authority or open a financial service. Every later signed action remains explicitly reviewed by the user through Xaman.

The user's aim is stronger legal/policy alignment and expanded tokenization. This is an objective requiring appropriate evidence and review, not a finding of legal status, licensing, backing or regulatory approval. Ledger eligibility, the existing XRBC holding gate, credential eligibility and legal authorization remain separate states.

## Source identity and evidence

- Memory repository: `XRBitcoinCash/-ai-savepoint-protocol-checkpointai`, `main`; starting checkpoint `f79b046decac573cf8e0fb2a1702645e9480a6c4`.
- Authoritative XRBC frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project` (75781181), `master`; head `52139c4a89c6f7c330b3716b90c77c0d4f33cde0` observed during the 2026-10-12 research. This is not a fresh application deployment certificate. Current backend repository/head and intended escrow UI paths remain null/unverified.
- Relevant existing files: `public/xrbc-batch-preview.js`, `docs/analytics-upgrade.md`, `tests/unit/batch-protocol-evidence.test.mjs`, `public/whitepaper.html`; tokenization page paths must be confirmed against current source before edits.
- Evidence IDs: `XRBC-XLS-docs-review-2026-10-12`, `XRBC-batch-preview-source-2026-10-12`, historical `XRBC-escrow-eligibility-2026-10-12` and current `XRBC-escrow-eligibility-validated-2026-10-12` in `memory/evidence.json`.
- The saved Batch module builds an unsigned two-party token-for-XRP proposal. Signing/submission stay hard-disabled even when amendment, wallet and coordinator inputs say compatible. Its receipt verifier requires exact validated inner deliveries, parent/hash/ledger linkage and reviewed fields. Existing synthetic fixture coverage was inspected, not rerun; no new wallet or ledger transaction was performed.
- Research identified the documented XLS-85 issuer permission, revised Batch signing (Xaman 5.4+ for multi-party BatchV1_1), Batch settlement evidence requirements and `simulate`'s lack of full-Batch support. A third-party primary ledger observation reports Batch activation on 2026-10-09; the official disclosure confirms fixBatchV1_2 activation that day. No direct fresh Mainnet amendment/account query was completed in that research.

## Ordered phases

Each row is a planned phase, not an implemented feature. Only phase 1 is the next implementation topic. Later activation/support, exact use case, source boundaries and required approvals must be established at that phase; do not start all rows at once.

| Phase | Upgrade | Intended result | Prerequisite / completion evidence |
| --- | --- | --- | --- |
| 1 | **XLS-85 Token Escrow** | Reviewed create/finish/cancel lifecycle for eligible ecosystem tokens, with dated release conditions and receipt evidence | Verify validated Mainnet amendment state, exact issuer/currency, issuer locking flag, signing authority and configured API/wallet support. Then design/test the bounded lifecycle; an enabled amendment alone is insufficient. |
| 2 | **MPTs, XLS-30; Dynamic MPTs, XLS-94** | Expand the Tokenization Auditor and overall tokenization model to inspect or plan issuance IDs, scale, supply caps, transfer/authorization controls, metadata and lifecycle changes | Existing classic XRBC remains the same asset. No automatic migration, new issuer, MPT issuance or new trading pair. Track mutable vs permanently fixed properties and exact issuance identity. |
| 3 | **Dynamic NFTs, XLS-46; immutable evidence fingerprints** | New lifecycle NFTs can update a status/metadata URI while every evidence version retains an immutable fingerprint | Mutable NFTs need the mutable mint flag at creation. Preserve older NFTs and their original evidence. New minting, changes to receipt flags and any replacement strategy require an explicit implementation scope and user-reviewed signing. |
| 4 | **Credentials, XLS-70; Permissioned Domains, XLS-80; DID support where applicable** | Verify accepted issuer/type/subject, acceptance, expiry/revocation and domain policy in advanced tools; a separate credential eligibility layer | The 2,500 gate is **XRBC held in the connected wallet**, not XRP, an LP deposit or a regulatory tier. Existing thresholds stay unchanged. Credential existence does not prove identity/legal eligibility beyond the trusted attestor's reviewed claim. |
| 5 | **Permissioned DEX, XLS-81** | Evaluate a separate market for credential-approved participants and approved assets | Requires credentials/domains and compatible order-book operations. Permissioned DEX orders cannot use AMMs; this does not permission the existing XRBC pool. Define policy/recognizing parties and legal review separately. |
| 6 | **Batch, XLS-56 / BatchV1_1** | Reuse shared transaction/evidence handling for bundled order management, setup plus a bounded action, and the saved two-party exchange | Design for composition from phase 1, but keep the existing preview disabled until the revised signatures, coordinator, supported inner types and validated settlement/recovery are verified. Mode must reflect intended rollback vs partial results. |
| 7 | **Other assessed updates** | Extend suitable ecosystem tools with oracle comparisons, freeze/clawback/permission inspection and vault/lending risk analytics; separately assess sponsorship, confidential MPT transfers, MPT DEX integration and Smart Escrows | Record network/API/wallet support and project fit per feature. Read-only inspection first where appropriate. No autonomous trading, financial product, paid/background service or unsupported feature is introduced merely because it is on this roadmap. |

## Shared design to prevent duplicate work

Use `memory/contracts/XLS-UPGRADE-CONTRACT.md` across the phases. Reuse existing working helpers where they fit. Establish a common capability/evidence record and transaction-intent/receipt envelope during phase 1; do not build a generic executor or refactor unrelated code in advance. Keep XRBC, XRBitcoin, Creature NFT and JCS asset identities and page ownership distinct.

Expand on-ledger objects, metadata references and hashes where the protocol supports them. Do not promise arbitrary file storage on the ledger: source documents/media remain versioned and retrievable through the existing local/external evidence model. A hash proves correspondence to exact bytes, not the truth of the content, ownership or legal recognition.

For new mutable lifecycle NFTs, update only the pointer/status for a new immutable evidence version. Do not overwrite past evidence bytes or silently change old hashes. The finalized settlement manifest binds validated hashes/results after settlement; avoid requiring an NFT inside a batch to embed the hash of the batch containing that NFT.

Keep the homepage compact. Detailed builders, credential checks, document/evidence views and expanded analytics load on demand. Use existing backend caching/deduplication where appropriate; read-only cached analytics must not become executable quotes or settlement proof. Reuse the signing safeguards and current approved asset/pair policy.

## Phase 1: first unfinished action and stopping condition

**Completed prerequisite, 2026-10-12:** read all four public issuer accounts and TokenEscrow amendment at validated Mainnet ledger **107613658**, hash `91026B35E49CE2B52A7908472748347EFCEC21E9C7213AE01BEBDA124CC53617`, through `https://xrplcluster.com`. TokenEscrow was enabled. Exact identities and sanitized flags/authority evidence are in `memory/observations/XRBC-ESCROW-ELIGIBILITY-2026-10-12.json`. This dated observation supersedes the earlier unknown-permission state; no holder balances or signed operations were inspected.

| Existing token | Locking flag | Issuer signing state observed | Native escrow decision |
| --- | --- | --- | --- |
| XRBC | Off | Disabled master, ACCOUNT_ONE regular key, no signer list or delegates | Blocked for this issuance under the current protocol |
| XRB / XRBitcoin | Off | Disabled master, ACCOUNT_ONE regular key, no signer list or delegates | Blocked for this issuance under the current protocol |
| CreatureNFT fungible token | Off | Disabled master, ACCOUNT_ONE regular key, no signer list or delegates | Blocked for this issuance under the current protocol |
| JCS | Off | Master enabled, no regular key or signer list | Not currently eligible; potential first candidate if the user controls the issuer and approves enabling locking |

**Next action:** confirm whether the user controls the JCS issuer, then define a finite community/contributor payment budget, holder source, recipient and release window. Confirm configured API/Xaman support before any implementation or signing request. Enabling `asfAllowTrustLineLocking` (AccountSet SetFlag 17) is irreversible and applies to all trustline tokens issued by that account; it needs a separately reviewed decision. Enabled master signing does not establish user possession of the key. Do not recover context by repeating these completed account reads; obtain fresh signing prerequisites only when an authorized operation needs them.

**Recommended rollout, not adopted allocation:** first demonstrate create/finish/cancel on a compatible test network. Then, if explicitly authorized, use a small user-selected JCS amount from an existing holder/treasury account for one fixed recipient and date. Issuers cannot fund escrow with their own issued tokens. Native XLS-20 NFTs are separate from the fungible CreatureNFT token and are not XLS-85 assets. Do not lock existing AMM liquidity, routine operating funds or users' 2,500-XRBC access holdings. No percentage or amount is chosen without a budget.

For the initial schedule use FinishAfter plus mandatory token CancelAfter. Finishing requires an explicit EscrowFinish after release eligibility and before expiry; it does not run automatically. After CancelAfter, explicit EscrowCancel returns funds to the source. Neither date nor recipient can be amended after creation, and the sender cannot cancel early. Keep enough fee/reserve headroom and show locked versus spendable holdings. After the bounded pilot, consider separate monthly tranches of an approved finite allocation. Conditions based on completed work or credential checks need a separately designed evidence/release authority; time escrow does not adjudicate milestones. Keep a compact homepage summary and load the detailed escrow tool on demand.

If the flag is absent and irreversible blackholing is established, **native escrow for that issuance is blocked**. Preserve that result and present it to the user. Do not silently substitute a wrapper, replacement token, new issuer or new asset. XRP/another eligible asset may be discussed as an explicit alternative, not assumed.

If eligible, define one escrow lifecycle using the protocol's supported time/hash conditions, exact asset amounts, destination, reserves, fees, finish/cancel recovery and independently validated receipts. Standard XLS-85 is not arbitrary programmable policy enforcement. Test the permitted local cases first and a compatible test network when needed; the user reviews/signs any wallet request. No Mainnet escrow is created by this checkpoint.

Phase-1 acceptance starts with a dated **eligible / blocked / unknown** decision and its source evidence. Finish only the authorized bounded implementation and required checks; leave later phases pending. Reuse existing completed checks rather than rerunning broad audits to recover context. After any separately authorized website deployment, follow the mandatory deployment-stop rule.

## Sources and history

- Token Escrow requirements: https://xrpl.org/docs/concepts/payment-types/escrow
- Permanent issuer locking permission: https://xrpl.org/docs/references/protocol/transactions/types/accountset
- Blackholed-account criteria: https://xrpl.org/docs/concepts/accounts/blackholed-accounts
- Finish/cancel lifecycle: https://xrpl.org/docs/references/protocol/transactions/types/escrowfinish and https://xrpl.org/docs/references/protocol/transactions/types/escrowcancel
- MPTs: https://xrpl.org/docs/concepts/tokens/fungible-tokens/multi-purpose-tokens
- Mutable MPTs: https://xrpl.org/docs/concepts/tokens/fungible-tokens/mutable-mpts
- Dynamic NFT transaction: https://xrpl.org/docs/references/protocol/transactions/types/nftokenmodify
- Credentials: https://xrpl.org/docs/concepts/decentralized-storage/credentials
- Permissioned DEX constraints: https://xrpl.org/docs/concepts/tokens/decentralized-exchange/permissioned-dexes
- Batch modes/settlement: https://xrpl.org/docs/concepts/transactions/batch-transactions
- Revised Xaman signing: https://docs.xaman.dev/concepts/special-transaction-types/batch-multiple-inner-signers
- Batch security fix: https://xrpl.org/blog/2026/vulnerabilitydisclosurereport-bug-20261009
- Context: `memory/contracts/PROJECTS.md`, `memory/active/ECOSYSTEM-2026-10-09.md`, `memory/active/MEMORY-SYSTEM-2026-10-12.md`. Preserve other task routes and their unresolved states; this roadmap replaces only the earlier suggested upgrade order.
