# Shared XLS upgrade contract - adopted 2026-10-12

Applies only to the ecosystem XLS upgrade program selected by the user. The ordered/current work is in `memory/active/XRBC-XLS-ROADMAP-2026-10-12.md`; XLS-85 escrow is first. This contract records the shared design intent so later phases reuse compatible evidence and workflow decisions. It does not authorize all future features or override current user/platform instructions.

## Distinct readiness decisions

Track protocol amendment activation, configured server/API support, library/wallet compatibility, asset permissions, current account readiness, application implementation and legal/policy evidence separately. Use eligible/blocked/unknown with the observation date, validated ledger identity, source and limitations. An unavailable response is unknown, not zero, permission denial or proof that an issuer is blackholed.

The existing 2,500 XRBC Advanced Tokenization threshold means XRBC held in the connected wallet. No liquidity-pool deposit, XRP amount, staking, burn or escrow is needed to satisfy that holding gate. It confers interface access only. Credentials/domains are a separate eligibility layer with accepted issuer, exact credential type/subject, subject acceptance, expiry/revocation and domain-policy checks. Neither layer establishes legal licensing or regulatory approval.

## Shared transaction intent and receipts

Reuse existing helpers; identify any real common module before adding abstraction. Design phase-1 evidence so later MPT, NFT, credential and Batch features can refer to the same reviewed intent without forcing a premature ecosystem rewrite.

An intent/receipt envelope should preserve project/token identity, operation and lifecycle version, network, source snapshot, exact participants/amounts, permission assumptions, fee/reserve bounds, conditions/deadlines, evidence fingerprint and outcome. Add validated transaction IDs, ledger identity, result codes and actual delivered changes only after obtaining them. Keep prepared, signed, submitted, uncertain, expired, failed and validated states separate.

Xaman remains non-custodial signing authority. Preserve exact-account comparison, explicit user review, applicable challenge/intent binding, pending locks, expiry/cancel recovery and replay protection. Every reviewed Batch displays all included actions and its mode. Do not automatically replace uncertain submissions, use a new signer or change an approved proposal.

For revised multi-party Batch signing, establish the outer Account/Sequence (or ticket) before participant signatures and verify wallet/library compatibility. Require the relevant validated inner evidence and ParentBatchID/same-ledger linkage; outer tesSUCCESS alone does not prove completion. Existing Batch signing/submission remains disabled until separately implemented and verified. Standard simulate RPC does not validate a complete Batch; compatible network testing remains a separate gate. No assumption that all transaction types can be batched.

## Token and evidence lifecycle

Classic XRBC, XRBitcoin, Creature NFT and JCS retain their exact existing identities. No automatic MPT migration, issuer flag change, wrapping, minting or additional trading pair. A blackholed issuer cannot newly authorize token locking if the required flag was not already enabled; prove the actual state before concluding eligibility or blockage.

AccountSet SetFlag 17 (`asfAllowTrustLineLocking`) is irreversible and covers all trustline tokens issued by that account. Issuer-key possession and approval of this permanent permission change are separate from an enabled master key. Fund token escrow from a holder account, with fixed destination and finish/cancel conditions; token escrow requires CancelAfter and explicit finish/cancel transactions. Do not represent time locks as automatic payments or evidence-based milestone adjudication.

For new mutable lifecycle NFTs, tfMutable must be set at mint under an explicit reviewed design. Keep every evidence version immutable and content-addressed; a changing URI/status refers to a new version with its original hash, chronology and manifest. Preserve already-minted NFTs and receipts. Do not silently remint, replace, change transferability/royalty policy or reinterpret receipt ownership.

Store canonical ledger objects and bounded metadata/fingerprints on XRPL where supported. Raw document/media storage and retrieval have their own retention/backup requirements. A hash, NFT, credential or token does not establish truth, real-world backing, physical delivery, legal ownership or public/regulatory recognition. Do not place secrets, private documents, precise locations or personally identifying evidence on-chain or in public checkpoints.

## Integration and phase validation

Keep the accepted homepage/sidebar geometry and load expanded tools on demand. Separate cached read-only analytics from current signing/execution facts. Apply approved issuer/pair policy and preserve gate thresholds. A permissioned DEX is a separate domain-specific order-book market; it cannot turn an existing AMM into a permissioned pool.

For each phase use a small acceptance matrix with success, absent permission, unknown evidence, wrong identity/network, stale terms/sequence, insufficient reserve/fee, expiry/cancel, duplicate/replay and uncertain-result recovery as applicable. Reuse previously completed evidence when inputs/environment still justify it. Do not run a financial transaction, broaden an audit, create a paid service or deploy simply to reconstruct memory or demonstrate a new model state.
