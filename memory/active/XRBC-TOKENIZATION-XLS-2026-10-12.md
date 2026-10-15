# Tokenization signing identity: one SDK lifecycle — 2026-10-15

## Intent and authority

The user continues debugging Step 3 after the guided workspace and QR preflight repairs. Current mode is the authorized frontend repair/deployment workflow. Preserve reviewed records, attached evidence, personal acknowledgments, wallet/pending guards and strict signer identity. User attestations/signatures remain user actions. This repair does not authorize a live wallet request, replacing an uncertain request or repeating financial tests to recover context.

## Source and release reconciliation

Frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, project 75781181, default branch `master`. Production master `bd0a73acdbcee2e8d8eebc2cff12cd672fa7b18e` is the observed merged MR !103. Master pipeline 2949236515 and deploy-pages 17189423026 succeeded with required runtime/security/repository jobs in the preceding authorized turn. This reconciles checkpoint `4ecf10a844b80e8ba732e819e8e8d2644761af36`'s MR !103 deployment-pending claim. It does not establish Xaman request creation or validated wallet/Batch acceptance.

Candidate `e10d793a86e94baf5772fc01aa406fdf1d43d12f`, branch `fix/tokenization-wallet-session-20261015`, MR !104: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/104 . Three changed files are both Tokenization pages and the new wallet-session regression tests. All three committed file hashes match tested local inputs. Candidate pipeline 2949291229 succeeded at the exact SHA. Runtime job 17189735511 passed 474 tests with zero failures/skips/cancellations; repository job 17189735512 succeeded in advisory mode with validator exit 1 for pre-existing findings, not strict whole-site clearance. Merge and master security/Pages deployment remain pending.

## Present failure and bounded repair

On the next explicit debugging turn, the user reported Step 3 asking to reconnect the same Xaman account while the displayed gate was connected/unlocked and publisher matched. This is a displayed-state observation, not proof that the current SDK signing identity was available or equal. Do not publish the wallet/address or infer identity from the gate display alone.

Source inspection identified an application lifecycle hazard: automatic resume creates an initial Universal SDK, then Connect can create a second instance. The SDK constructor resets module-global identity while retaining the PKCE provider, allowing an empty `user.account` promise despite an authorize result. The application must reuse one closure-owned SDK, rather than weakening signer comparison or substituting a cached/display address.

Primary SDK source is official `XRPL-Labs/Xumm-Universal-SDK` `src/index.ts`, observed Git blob `7b599aeca38a92bdd84fb7ad6370280b63216027`: https://github.com/XRPL-Labs/Xumm-Universal-SDK/blob/main/src/index.ts . The deployed CDN package version is unverified; no upstream dependency pin or package change is part of this repair. The source finding and synthetic lifecycle model must not be presented as a verified live SDK package/authorization result. Official browser lifecycle documentation: https://docs.xaman.dev/environments/browser-web3 .

Both pages acquire the same SDK synchronously after their asynchronous loader wait; asynchronous and synchronous loader paths share that closure-owned instance. Keep `currentAccount` anchored to the SDK's current account, distinguish unavailable identity from a genuinely different account and guard adapter/account identity around awaited work. No fallback to display text, cached state or an old account value is added. The tests and exact source identity below determine the bounded evidence; actual wallet acceptance remains unverified.

## Accepted workspace and recovery constraints

The deployed four-step guided workspace, simple/details/advanced disclosure and optional recordDate/default helpers remain accepted source behavior. AI input stays a user-controlled local copy/paste flow with a bounded allowlist and preview-before-apply. No automatic network/model/document upload is added. Advanced narrative descriptions do not import account identities, permissions, quantities, public metadata, hashes or acknowledgments. Local file handling retains its bounds and content checks. Visual desktop/mobile, live camera and wallet acceptance remain unverified.

A built record lives in a page closure and is not automatically persisted across refresh. To retain a filled record, cancel only a known pre-request review and export a verified encrypted backup before reloading; restore with the user's own password. Backup is optional for a clearly new record and is not a signing prerequisite. If a request is uncertain, retain its status/lock recovery instead of creating a replacement. Never preselect personal attestations.

The cloud Chromium OAuth block `ERR_BLOCKED_BY_CLIENT` remains unresolved; the user reported successful local Edge sign-in. Local Edge and cloud drafts/sessions are separate. Do not claim access to local console/network state or retry an unchanged blocked cloud authorization path without actual recovery.


## Prior QR preflight repair remains applicable

MR !103 validates/removes only a response-added 64-hex simulation hash on a copy and preserves the empty-signature normalization from MR !101. Invalid hashes, nonempty/malformed signatures, unexpected Signers, altered terms/fees, outbound unsigned transactions and validated receipts remain strict. Only allowlisted read-only RPCs may retry HTTP 502/503/504, at most two attempts; no HTTP 400/429, application/ledger errors, malformed JSON, writes, unknown methods or Xaman creation replay. Both pages retain the correct ledger selectors and error placement/focus recovery. These accepted paths are not broadened by the SDK lifecycle repair.

The prior 21 configured-proxy read-only RPC calls and successful NFT/burn component preflight remain dated MR !103 evidence. They do not validate the current SDK flow, a full Batch, Xaman payload or settlement. No new live proxy, wallet request, signature or ledger write is part of this turn. The old HTTP 502's upstream cause and backend/archive deployment identity remain unverified; no backend mutation is made.

## Durable safeguards

- The holding gate is 2,500 XRBC. Each new publication/revision burns exactly 0.000001 XRBC; exact pre-signing checks reserve every new burn above the gate. Native XRP network fees are separate. A failed all-or-nothing transaction can still incur the outer XRP fee.
- Default publication binds the burn and NFT to the same record fingerprint and XRBC_PUBLICATION_BATCH commitment. Existing standalone burns retain XRBC_BURN_TX and unused-history verification; no burn hash is guessed and no prior burn is silently charged again. Counterparty coordination and unknown future object IDs are not fabricated.
- Require current Mainnet identity, BatchV1_1 and fixBatchV1_2, exact account, fee at or below 1 XRP, fresh sequence/deadline, adequate reserves/holdings and relevant permissions. Standard simulate does not validate a complete Batch; retain the distinction between component checks and full Batch settlement.
- Preserve explicit reviewed terms, exact outer/inner fields, order/flags/sequences, challenge/intent binding, cross-tab locks, pending storage, QR/deep links, expiry/cancel recovery and no automatic replacement of ambiguous requests. Before a persistent intent exists, Cancel Review can return to the unchanged workspace for fresh terms. An attempted or uncertain request instead requires the existing status/lock path.
- Completion requires independently derived inner IDs, validated tesSUCCESS for all actions, exact ParentBatchID, ordered metadata and the same ledger. Exact trustline reduction and minted NFT IDs are required. Outer success or a signed payload alone is insufficient. Missing evidence preserves pending state; proven failure closes with a failure receipt and no automatic retry.
- Backup export/restore is optional for signing. Preserve the original ciphertext. Verified export compares the serialized envelope before download; failed export/restore preserves the record. A restored current record must not be rebuilt just to sign it. Backup password whitespace/Unicode are exact; never inspect or infer secrets from redacted browser values.
- Source refs and NFTs establish only the verified signer/ledger observations described by receipts, not legal title, underlying truth or regulatory approval. Private documents/record bodies remain local. No private wallets, balances, record fingerprints, payload IDs or screenshots belong in public memory.



## Evidence and limits

30 focused checks passed on Node v24.19.0, including seven new wallet-session regressions exercising both pages. The unchanged baseline reproduced two SDK constructors where one was expected on both pages. The checked candidate uses one closure-owned SDK with strict current-account behavior. All seven inline page scripts parse; independent diff review found no issue in the bounded change. These are synthetic/source checks, not a live SDK authorization or wallet result. Complete reusable environment/input fingerprints are not claimed.

Use previous scoped source/synthetic/CI evidence where relevant; do not rerun unrelated historical wallet tests. Keep source findings, synthetic SDK lifecycle tests, CI, deployment, browser observations and validated user-signed results separate. No new live wallet request, signing, proxy experiment or ledger write is claimed.

## Next action, risk and stop rule

Candidate CI is complete. Merge only the exact checked SDK lifecycle repair and wait for required master security and Pages deployment. The concrete risk is that a second SDK instance clears current signing identity after the page reports connected; a repair must restore one lifecycle while refusing unavailable, changed or stale signer identity. Stop all tools immediately when requested deployment succeeds. No post-deployment test, screenshot, cleanup or checkpoint exception is allowed in that turn.

On a new explicit testing turn, preserve records/backups and existing pending state before loading the repaired page. When evidence establishes no request exists, prepare fresh terms and let the user acknowledge/create once. If identity is missing, use the explicit reconnect path; if different, stop until the actual signer matches. Do not use a displayed/cached address to authorize signing. If a request is uncertain, use status recovery and do not replace it. Xaman acceptance and all required validated inner Batch results remain unverified until independently observed after user signing.

## Dated history

The previous MR !103 repair brief is preserved at `memory/archive/XRBC-TOKENIZATION-XLS-2026-10-15-before-sdk-identity.md`, captured from checkpoint `4ecf10a844b80e8ba732e819e8e8d2644761af36`. It preserves exact response-hash/RPC recovery evidence and earlier history pointers. Shared contract: `memory/contracts/XLS-UPGRADE-CONTRACT.md`; its historical Batch-disabled boundary was superseded only by the separately implemented atomic publication work, not blanket authorization for future Batch operations.
