# Ordinary Tokenization recovery — MR !106 deployed — 2026-10-15

## Intent and authority

The ordinary QR reset/reconnect, mixed wallet/gate and detail-control repair has been deployed as MR !106. The current new task is a distinct P2P Record Handoff implementation, selected through route `xrbc_record_handoff`; it does not reopen ordinary signing tests or change the ordinary two-action flow. Preserve valid signer identity, current record/evidence, personal acknowledgments and all pending/duplicate guards. The earlier mint/transfer/burn proposal was assessment-only in MR !106. The user has now authorized a separate four-action P2P handoff implementation; that authority applies to its own workspace/route, not automatic transfer or destruction in ordinary Tokenization. User attestations/signatures remain user actions.

## Source and release reconciliation

Frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, project 75781181, default branch `master`. Production master `44fbecf8a7b13f05c937432854c33114e7bb42fd` is the observed merged MR !106. Production pipeline 2949574930 succeeded in the preceding authorized turn, including 509 runtime tests: runtime 17191656483, repository validation 17191656484, Semgrep 17191656485, secret detection 17191656486 and deploy-pages 17191656487. This reconciles checkpoint `c60288001990babefedfda2f4cd6fd9b40f50aad`'s deployment-pending claim. No post-deployment local browser receipt/UI recovery is established by that release observation.

MR !106's checked candidate was `5b847eeb452f3ed037ded7b2c12ec71cdca47730`, branch `codex/tokenization-reset-receipt-recovery-20261015`: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/106 . Sixteen input hashes/sizes matched; 145 local checks and candidate pipeline 2949563810 passed, including runtime 17191580392 (509 tests) and advisory repository job 17191580393 (validator exit 1, not strict whole-site clearance). These remain dated release evidence.

## Pending recovery and mixed-state defect

User-supplied debug data showed an existing legacy-URN two-action Batch with the same selected account, unavailable/cleared gate data and an older session-restored/gate-unlocked status. Missing gate data must remain unknown, not a valid zero balance or proof of disconnection. Do not publish the wallet, payload, record fingerprint or raw debug body.

A new investigation made seven bounded read-only RPC calls, with the final server_info identifying network_id 0. It verified that the user's original two-action Batch had already settled: outer and both inner transactions are validated tesSUCCESS with ordered matching ParentBatchID and the same ledger. The existing strict verifier passed on a local response copy after removing only an equal Payment DeliverMax/Amount alias, including independent inner hashes, exact reviewed economic terms, 0.000001 XRBC trustline reduction and minted NFT identity. This verifies the public review/ledger result, not unavailable private record contents. The original browser-stored receipt is unavailable and the application still shows pending until repaired. No new financial transaction, payload or signature occurred.

The cached API-v1 history includes Payment Amount plus an equal DeliverMax alias. Existing Batch verification instead throws `Unexpected Batch transaction field: DeliverMax`. Official rippled/Clio source and API documentation establish that this equal alias is intentional API-v1 response behavior. Primary reference: https://github.com/XRPLF/rippled/blob/f1ce9449f20fa0e51f074e6821efbcfbf96325c1/API-VERSION-2.md ; reviewed rippled revision `f1ce9449f20fa0e51f074e6821efbcfbf96325c1`, Clio revision `2c0de0af5639dcb9a453758f65ed89858c63f65f`. These source identities do not identify the deployed proxy/backend build. The bounded repair creates a receipt-only view that removes DeliverMax only for a Payment with present, equal Amount; unequal/missing aliases fail. Apply that view to Batch verification and publication/ledger receipt readers while keeping unsigned, simulation and wire-term comparisons strict. This receipt exception feeds the following broader recovery defect.

Source inspection and synthetic reproduction identified that restoreSession wraps authentication and pending reconciliation in one outer try. A request-status/history exception can therefore clear a valid SDK/account/gate while leaving stale displayed wallet/gate status. Connect has the same coupling. Isolate pending-recovery errors from authentication: preserve independently validated current SDK/account/gate, retain the original pending lock and report recovery status accurately. Never use stale display text or cached addresses as signer authority and never turn an unresolved recovery error into a cleared request or a replacement QR.

Finish pending only after verified completion or a proven cancelled/rejected/expired/creation-failed outcome; then clear the intent, QR src and deep-link href. Closing an unsigned review also clears its transport. Unknown request/cancel/history outcomes retain the exact original lock and transport, without automatic replacement. Validated success/failure preserves the receipt. Terminal non-success uses Studio reviewClosed: preserve record, attachments, queue, the three personal record acknowledgments, password inputs, backup and receipt; clear derived expected terms, Batch plan and Batch-terms acknowledgment so fresh review is required.

## Detail controls

The intended controls use strong green/yellow/red Simple/Details/Advanced states with a Selected indicator. Selection navigates to Step 2 and opens the corresponding controls. Busy/pending state disables the controls with a reason. This is navigation/disclosure only: no record, fingerprint, acknowledgment, permission or transaction setting is changed by selecting a level. Color is accompanied by explicit labels/state, and source/synthetic checks do not establish a rendered desktop/mobile result.

## Review-close race

Independent review found that closing/resetting a review during asynchronous unsigned preflight could still allow payload creation after the read returned. Both pages must recheck that `state.pendingAction` is the exact captured action after preflight, before saving an intent or creating a request. If the review was closed/reset, create neither a pending intent nor payload. This does not erase or replace a request whose creation was already attempted; retain its uncertain-state lock and original exact-request cancellation path.

## NFT lifecycle proposal: assessment only

The ordinary two ledger actions remain the XRBC publication microburn and NFT mint. MR !106 did not add NFT transfer or destruction. The new authorized P2P implementation is separate work at `memory/active/XRBC-RECORD-HANDOFF-2026-10-15.md`: burn cost, mint with restricted offer, recipient acceptance and owner burn of the original, using an explicitly reviewed multi-account Batch. Its design/implementation is not ordinary-flow acceptance or permission to destroy an old NFT automatically. Never invent a recipient, burn authority, counterparty signature or lineage.

## Accepted display, AI and record recovery

MR !105's shared card uses the allowlisted public metadata URI `https://xrbitcoincash.com/nft/xrbc-evidence-record-v1.json#sha256=<full fingerprint>` plus RECORD_SHA256 memo. One generic static image/metadata resource contains no private per-record upload. Full legacy `urn:sha256:` pending transactions, receipts and update predecessors remain supported; an old pending URI is not silently rewritten to show the new card. No image establishes ownership, copyright approval, backing or redeemable cryptocurrency.

The manual AI helper remains a same-page blue-prompt/green-reply dialog with explicit ChatGPT open/copy/paste/return instructions, no automatic external document/model/API upload and a 32 KiB strict narrative schema with preview-before-apply/stale-preview invalidation. It cannot import accounts, permissions, quantities, public metadata, hashes or personal attestations. Actual maturity and unsupported facts remain blank unless supplied. Core schema VERSION is unchanged; preserve original encrypted backups.

The four-step workspace remains accepted. A built record is closure-local and not automatically persisted across refresh. To retain a filled record, cancel only a known pre-request review and export a verified encrypted backup before reloading; restore with the user's own password. Backup is optional for a clearly new record and is not a signing prerequisite. An uncertain pending request instead retains its status/lock recovery. Never preselect personal acknowledgments.

The cloud Chromium OAuth block `ERR_BLOCKED_BY_CLIENT` remains unresolved; local Edge and cloud drafts/sessions are separate. Do not claim access to local console/network state or retry unchanged blocked cloud authorization without actual recovery. Wallet artwork rendering remains unverified. The prior two-action Batch is now technically verified against the public review, within the private-body/browser-receipt limits above; that does not establish general future wallet compatibility.

## Prior signing and preflight safeguards

Keep one closure-owned Universal SDK across automatic resume and Connect, acquired synchronously after asynchronous loader work; strict current SDK identity and adapter/account guards around awaits remain mandatory. No cached/display-address fallback is permitted. The official SDK source informed the lifecycle model; the deployed CDN version remains unverified and unchanged.

Simulation response normalization stays limited to an empty signature and a valid 64-hex response hash on a copy. Malformed/extra/changed terms, fees, outbound unsigned transactions and validated receipts remain strict. Only allowlisted read-only RPCs may retry HTTP 502/503/504 at most twice; no HTTP 400/429, ledger/application error, malformed JSON, write, unknown-method or Xaman creation replay. Prior read-only component preflight is dated evidence, not a full Batch/wallet test. The old HTTP 502 upstream cause/backend identity remains unverified; no backend mutation is in scope.

## Durable safeguards

- The holding gate is 2,500 XRBC. Each new publication/revision burns exactly 0.000001 XRBC; exact pre-signing checks reserve every new burn above the gate. Native XRP network fees are separate. A failed all-or-nothing transaction can still incur the outer XRP fee.
- Default publication binds the burn and NFT to the same record fingerprint and XRBC_PUBLICATION_BATCH commitment. Existing standalone burns retain XRBC_BURN_TX and unused-history verification; no burn hash is guessed and no prior burn is silently charged again. Counterparty coordination and unknown future object IDs are not fabricated.
- Require current Mainnet identity, BatchV1_1 and fixBatchV1_2, exact account, fee at or below 1 XRP, fresh sequence/deadline, adequate reserves/holdings and relevant permissions. Standard simulate does not validate a complete Batch; retain the distinction between component checks and full Batch settlement.
- Preserve explicit reviewed terms, exact outer/inner fields, order/flags/sequences, challenge/intent binding, cross-tab locks, pending storage, QR/deep links, expiry/cancel recovery and no automatic replacement of ambiguous requests. Before a persistent intent exists, Cancel Review can return to the unchanged workspace for fresh terms. An attempted or uncertain request instead requires the existing status/lock path.
- Completion requires independently derived inner IDs, validated tesSUCCESS for all actions, exact ParentBatchID, ordered metadata and the same ledger. Exact trustline reduction and minted NFT IDs are required. Outer success or a signed payload alone is insufficient. Missing evidence preserves pending state; proven failure closes with a failure receipt and no automatic retry.
- Backup export/restore is optional for signing. Preserve the original ciphertext. Verified export compares the serialized envelope before download; failed export/restore preserves the record. A restored current record must not be rebuilt just to sign it. Backup password whitespace/Unicode are exact; never inspect or infer secrets from redacted browser values.
- Source refs and NFTs establish only the verified signer/ledger observations described by receipts, not legal title, underlying truth or regulatory approval. Private documents/record bodies remain local. No private wallets, balances, record fingerprints, payload IDs or screenshots belong in public memory.

## Evidence and limits

Final local scoped tests passed 145/145 after the review-close race fix. The new regression executes both real page adapters and the actual cancel function against synthetic dependencies, proving no intent save or payload creation after closing review; removing only the guard from an in-memory test copy makes it fail. An earlier 144-check run preceded the independent review finding and is not evidence for the final guard. Candidate source includes dedicated recovery/detail-control documentation. Complete reusable input/environment fingerprints are not claimed.

The prior user-signed Batch is newly verified through bounded read-only receipt analysis; no new automated Xaman request, signature, transfer, NFT burn or transaction is created. Private record/body verification and browser receipt recovery remain outstanding. Reuse previous relevant scoped source/synthetic evidence instead of restarting historical financial tests. Keep source checks, synthetic recovery tests, CI, deployment, user-supplied observations, rendered UI and validated user-signed results separate.

## Next ordinary action and stop rule

Do not repeat the already-settled publication. On a new explicit ordinary-recovery request, preserve the current record with a verified encrypted backup before one page reload, then Check Request Status for the original request. Recover its receipt/UI state without another burn or mint; that rendered recovery remains unobserved. Preserve the exact lock for ambiguous outcomes. The active new P2P task has its own route and evidence and must not silently inherit a financial-test queue.

Any later requested deployment requires its own exact-candidate checkpoint/gates. Stop all tools immediately on successful requested deployment, with no post-deployment test, screenshot, cleanup or checkpoint exception; resume only on a new explicit user request.

## Dated history

The superseded pre-MR !106 deployment brief is preserved at `memory/archive/XRBC-TOKENIZATION-XLS-2026-10-15-before-record-handoff.md`, captured from checkpoint `c60288001990babefedfda2f4cd6fd9b40f50aad`.

The previous MR !105 release brief is preserved at `memory/archive/XRBC-TOKENIZATION-XLS-2026-10-15-before-pending-session.md`, captured from checkpoint `17d37aca8d621e61bf1ce38d067cb89f7af61616`. It retains card/AI/source-test limits and earlier history pointers. Shared contract: `memory/contracts/XLS-UPGRADE-CONTRACT.md`; its historical Batch-disabled boundary was superseded only by separately implemented atomic publication work, not blanket authorization for future Batch operations.
