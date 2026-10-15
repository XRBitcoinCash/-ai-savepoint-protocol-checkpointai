# Tokenization QR preflight: simulation hash and RPC recovery — 2026-10-15

## Intent and authority

The user continues debugging a missing Tokenization QR and supplied a screenshot reporting `XRPL service HTTP 502. No Xaman request was created.` Current mode is the authorized frontend repair/deployment workflow. Preserve the reviewed record, evidence, acknowledgments, pending requests and working guided workspace. User attestations/signatures remain user actions. This repair does not authorize creating a live wallet request, automatically replacing an uncertain request or running a financial retest to recover context.

## Source and release reconciliation

Frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, project 75781181, default branch `master`. Production master `1e76fae31c6fad2ca56100bec703a5401a01ca71` is the observed merged MR !102. Master pipeline 2949002747 and deploy-pages 17187950122 succeeded in the preceding authorized turn. This reconciles checkpoint `ac04e4a0e9007406dc9623670418983beaac97b6`'s MR !102 deployment-pending claim. It does not establish live camera, wallet acceptance or validated Batch settlement.

Candidate `d29d48390f184cfbaed4e64f86339e2d79597117`, branch `fix/tokenization-preflight-recovery-20261015`, MR !103: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/103 . Six files change ledger/publication, both pages and focused batch-signing/RPC-recovery tests. Both pages pin ledger/publication to `20261015-3`. All six committed hashes match the tested local files. Candidate pipeline 2949231694 succeeded at the exact SHA. Runtime job 17189398375 passed 467 tests with zero failures/skips/cancellations; repository job 17189398376 succeeded in advisory mode with validator exit 1 for existing findings, not strict whole-site clearance. Merge and master security/Pages deployment remain pending.

## Observed failures and bounded repair

The user-supplied error establishes a pre-request HTTP 502; its exact upstream cause is unknown. A separate read-only reproduction through the configured Render proxy returned `tesSUCCESS` from unsigned NFT simulation with a 64-hex `hash` in `tx_json`. MR !101 had normalized only the simulator's empty `TxnSignature`; the strict reviewed-field comparison still rejected this valid response-added hash. Do not conflate that deterministic comparison defect with the earlier transient HTTP failure or claim Render query concurrency caused either.

The new response normalization validates and removes only a 64-hex simulation `hash` from a copy. Invalid/malformed hashes remain rejected, as do nonempty/malformed signatures, unexpected Signers, altered reviewed fields and fees. Strict checks on outbound unsigned transactions and actual validated receipts remain independent. Never strip or relax a real receipt's hash to make preflight pass.

Only allowlisted read-only XRPL calls may retry HTTP 502/503/504, with at most two attempts. Do not retry HTTP 400/429, ledger/application errors, malformed JSON, writes, unknown methods or Xaman request creation. Preserve ledger selectors, including `ledger_hash` on the basic page. Creation failures name the affected RPC method, appear beside Create Xaman Request and receive appropriate focus after controls unlock. Existing pending/uncertain-request guards remain unchanged.

The default two-action burn-plus-NFT Batch is supported by the reviewed official XRPL/Xaman references; no structural single-action redesign is justified by these failures. Standard simulate still does not validate the complete Batch. Component preflight success is not a wallet payload or ledger result.

A backend archive has a single-upstream Axios 20-second timeout configuration, but its relationship to the current Render deployment is unverified. No backend/archive mutation is part of this frontend repair. Do not infer a deployed backend identity from an old archive or keep retrying an unchanged failure without new evidence.

## Accepted workspace and recovery constraints

The deployed four-step guided workspace, simple/details/advanced disclosure and optional recordDate/default helpers remain accepted source behavior. AI input stays a user-controlled local copy/paste flow with a bounded allowlist and preview-before-apply. No automatic network/model/document upload is added. Advanced narrative descriptions do not import account identities, permissions, quantities, public metadata, hashes or acknowledgments. Local file handling retains its bounds and content checks. Visual desktop/mobile, live camera and wallet acceptance remain unverified.

A built record lives in a page closure and is not automatically persisted across refresh. To retain a filled record, cancel only a known pre-request review and export a verified encrypted backup before reloading; restore with the user's own password. Backup is optional for a clearly new record and is not a signing prerequisite. If a request is uncertain, retain its status/lock recovery instead of creating a replacement. Never preselect personal attestations.

The cloud Chromium OAuth block `ERR_BLOCKED_BY_CLIENT` remains unresolved; the user reported successful local Edge sign-in. Local Edge and cloud drafts/sessions are separate. Do not claim access to local console/network state or retry an unchanged blocked cloud authorization path without actual recovery.

## Durable safeguards

- The holding gate is 2,500 XRBC. Each new publication/revision burns exactly 0.000001 XRBC; exact pre-signing checks reserve every new burn above the gate. Native XRP network fees are separate. A failed all-or-nothing transaction can still incur the outer XRP fee.
- Default publication binds the burn and NFT to the same record fingerprint and XRBC_PUBLICATION_BATCH commitment. Existing standalone burns retain XRBC_BURN_TX and unused-history verification; no burn hash is guessed and no prior burn is silently charged again. Counterparty coordination and unknown future object IDs are not fabricated.
- Require current Mainnet identity, BatchV1_1 and fixBatchV1_2, exact account, fee at or below 1 XRP, fresh sequence/deadline, adequate reserves/holdings and relevant permissions. Standard simulate does not validate a complete Batch; retain the distinction between component checks and full Batch settlement.
- Preserve explicit reviewed terms, exact outer/inner fields, order/flags/sequences, challenge/intent binding, cross-tab locks, pending storage, QR/deep links, expiry/cancel recovery and no automatic replacement of ambiguous requests. Before a persistent intent exists, Cancel Review can return to the unchanged workspace for fresh terms. An attempted or uncertain request instead requires the existing status/lock path.
- Completion requires independently derived inner IDs, validated tesSUCCESS for all actions, exact ParentBatchID, ordered metadata and the same ledger. Exact trustline reduction and minted NFT IDs are required. Outer success or a signed payload alone is insufficient. Missing evidence preserves pending state; proven failure closes with a failure receipt and no automatic retry.
- Backup export/restore is optional for signing. Preserve the original ciphertext. Verified export compares the serialized envelope before download; failed export/restore preserves the record. A restored current record must not be rebuilt just to sign it. Backup password whitespace/Unicode are exact; never inspect or infer secrets from redacted browser values.
- Source refs and NFTs establish only the verified signer/ledger observations described by receipts, not legal title, underlying truth or regulatory approval. Private documents/record bodies remain local. No private wallets, balances, record fingerprints, payload IDs or screenshots belong in public memory.


## Evidence and limits

51 focused local checks passed on Node v24.19.0. The simulator-hash regression reproduced the old failure before the bounded fix; cases cover accepted valid response hashes, malformed/extra/changed simulation terms and exact fee/outbound/receipt boundaries. Four RPC recovery cases exercise both page adapters, including the error-focus regression after busy state unlock. Both changed modules and seven inline scripts parse. Source HTML has one QR-status region next to creation controls; that is not visual rendering evidence. These are source/synthetic checks, not browser rendering or a live Xaman request. Complete reusable input/environment fingerprints are not claimed.

A bounded configured-proxy investigation made 21 read-only RPC calls using a synthetic technical record and the local candidate component-preflight path. NFT and XRBC-burn simulations returned `tesSUCCESS`; final aggregate preflight returned `component-checks-passed`. This is dated read-only component evidence only. No Xaman payload, signature, submission, ledger write, burn or NFT mint occurred. Private account/record identifiers, fingerprints, payloads and raw logs are excluded from public memory.

MR !102's 94 focused local and 462-test CI results remain dated evidence for the guided workspace; its release is reconciled above. Reuse relevant completed evidence rather than rerunning unrelated historical wallet tests. Source/synthetic, CI, deployment, browser and validated user-signed wallet results remain separate categories.

## Next action, risk and stop rule

Candidate CI is complete. Merge the exact checked frontend candidate and wait for required master security and Pages deployment. The concrete risk is that a legitimate simulation response or transient read-only gateway failure blocks QR creation before any Xaman request; the bounded repair must preserve unsigned terms and prevent any write/request replay. Stop all tools immediately when the requested deployment succeeds. No post-deployment test, screenshot, cleanup or checkpoint exception is allowed in that turn.

On a new explicit testing turn, preserve records/backups and existing pending state before loading the repaired page. When evidence establishes no request exists, cancel stale review, prepare fresh terms and let the user acknowledge/create once. If evidence shows uncertainty, use status recovery and do not replace it. Actual Xaman acceptance and all required validated inner Batch results remain unverified until independently observed after user signing. No automatic financial retry or repeated test solely to recover history.

## Dated history

The previous MR !102 release brief is preserved at `memory/archive/XRBC-TOKENIZATION-XLS-2026-10-15-before-rpc-qr-repair.md`, captured from checkpoint `ac04e4a0e9007406dc9623670418983beaac97b6`. It retains exact guided-workspace implementation/CI evidence and earlier history pointers. Shared contract: `memory/contracts/XLS-UPGRADE-CONTRACT.md`; its historical Batch-disabled boundary was superseded only by the separately implemented atomic publication work, not blanket authorization for future Batch operations.
