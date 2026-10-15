# Shared NFT evidence card and guided AI assistance — 2026-10-15

## Intent and authority

The user accepted one generic public NFT evidence card now, with room to expand later, and requested clearer AI assistance in the simple Tokenization flow. The newest UI direction is a popup separating the blue prompt from the green reply, an explicit Open ChatGPT action and clear copy/paste/return instructions compatible with manual use of ChatGPT's free interface. This is the authorized frontend update/release workflow; do not expand it into a backend, paid API integration, private upload service, extra NFT images or live financial test. User attestations/signatures remain user actions.

## Source and release reconciliation

Frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, project 75781181, default branch `master`. Production master `bb26cfc0e4538dc85efa6371e71df5247836ef57` is the observed merged MR !104. Master pipeline 2949295231 succeeded in the preceding authorized deployment turn: runtime 17189762538, repository validation 17189762539, Semgrep 17189762540, secret detection 17189762541 and deploy-pages 17189762542. This reconciles checkpoint `512fdd35cceb98cabf7f51f273425ecd291aaffa`'s MR !104 deployment-pending state. No live wallet verification is established by the release.

Candidate `cc01a23e350cc26fa469c109e50bf8e23bc2c872`, branch `feat/tokenization-evidence-card-ai-helper-20261015`, MR !105: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/105 . Seventeen changed files comprise four modules, both pages, CSS, three display assets, two new tests, one updated legacy assertion, the rendering script and three documents. All seventeen committed file hashes match the tested local inputs; independent bounded review found no blocker. Candidate pipeline 2949436869 succeeded at the exact SHA. Runtime job 17190710344 passed 484 tests with zero failures/skips/cancellations; repository job 17190710345 succeeded in existing advisory mode with validator exit 1, not strict whole-site clearance. Merge and master security/Pages deployment remain pending.

## Shared card and URI boundaries

New evidence NFT URIs use the one public metadata resource `https://xrbitcoincash.com/nft/xrbc-evidence-record-v1.json#sha256=<commitment>`. The three display assets are shared JSON, SVG source and PNG artwork, with a reproduction script; JSON points to the one generic public PNG. It contains no per-record document, private record body or wallet upload. The full record fingerprint remains in the URI fragment and the existing RECORD_SHA256 memo. A shared illustration must not imply verified ownership, copyright approval, backing, legal title or that the NFT stores/redeems cryptocurrency.

The URI parser must allow only the approved metadata resource with the complete 64-hex fingerprint, while continuing to accept existing full `urn:sha256:` record URIs for pending transactions, receipts and update predecessors. Preserve exact reviewed transaction comparison and verified record linkage. Do not silently remint, rewrite existing pending transactions, replace receipts or migrate prior NFTs just to display a new image. A shared card is presentation evidence, not proof that its underlying record is true. The generic PNG was viewed locally at full size and a 256-pixel thumbnail: 1024 × 1024, 210,995 bytes, SHA-256 `89c686bb4a6a7a2a0d8543b4e6fc88f311bab8c324e53bc2aac350b811e34b3d`. This is artwork review, not wallet rendering/cache verification.

## AI assistance boundaries

The AI helper uses a same-page manual dialog with accessible control semantics and distinct blue prompt/green reply areas. Source/synthetic checks cover dialog controls, not a formal accessibility or browser-rendering certification. Explain the manual sequence: copy the questionnaire, open ChatGPT, paste it, copy the returned JSON and return to preview/apply locally. An explicit ChatGPT action opens a separate tab with fallback/return instructions. It does not automatically send a private record or document; no remote model/API/OCR/upload call is added. The user controls what they paste into an external service. Manual assistance does not require an application API subscription or API key.

Retain the 32 KiB strict JSON-envelope/field allowlists and narrative-only import, preview-before-apply, stale-preview invalidation and local validation. Advanced descriptions supplied by the user can assist entry without importing accounts, permission controls, quantities, public metadata, hashes, signatures or personal attestations. Missing facts and actual maturity remain blank unless supplied. No AI output may authorize a wallet action or establish ownership/regulatory approval.

## Accepted workspace and recovery constraints

The deployed four-step guided workspace, simple/details/advanced disclosure and optional recordDate/default helpers remain accepted source behavior. AI input stays a user-controlled local copy/paste flow with a bounded allowlist and preview-before-apply. No automatic network/model/document upload is added. Advanced narrative descriptions do not import account identities, permissions, quantities, public metadata, hashes or acknowledgments. Local file handling retains its bounds and content checks. Visual desktop/mobile, live camera and wallet acceptance remain unverified.

A built record lives in a page closure and is not automatically persisted across refresh. To retain a filled record, cancel only a known pre-request review and export a verified encrypted backup before reloading; restore with the user's own password. Backup is optional for a clearly new record and is not a signing prerequisite. If a request is uncertain, retain its status/lock recovery instead of creating a replacement. Never preselect personal attestations.

The cloud Chromium OAuth block `ERR_BLOCKED_BY_CLIENT` remains unresolved; the user reported successful local Edge sign-in. Local Edge and cloud drafts/sessions are separate. Do not claim access to local console/network state or retry an unchanged blocked cloud authorization path without actual recovery.



## Prior signing and preflight safeguards remain applicable

The deployed MR !104 uses one closure-owned Universal SDK across automatic resume and Connect, acquired synchronously after asynchronous loader work. Keep strict current SDK account identity, distinguish unavailable from genuinely different identity and guard adapter/account around awaited work. No cached/display-address fallback is permitted. Official SDK source blob `7b599aeca38a92bdd84fb7ad6370280b63216027` informed the lifecycle tests; the deployed CDN package version remains unverified and was not changed.

MR !103 normalizes only a valid 64-hex simulation response hash on a copy and the empty simulator signature. Invalid hashes/signatures, unexpected Signers, reviewed terms/fees, outbound unsigned transactions and validated receipts remain strict. Only allowlisted read-only RPCs may retry HTTP 502/503/504 at most twice; no HTTP 400/429, application/ledger error, malformed JSON, write, unknown-method or Xaman creation replay. Preserve correct ledger selectors and error/focus recovery. The prior 21 read-only component RPC calls remain dated evidence, not a full Batch/wallet test. The old HTTP 502 upstream cause/backend identity remains unverified; no backend mutation is in scope.

## Durable safeguards

- The holding gate is 2,500 XRBC. Each new publication/revision burns exactly 0.000001 XRBC; exact pre-signing checks reserve every new burn above the gate. Native XRP network fees are separate. A failed all-or-nothing transaction can still incur the outer XRP fee.
- Default publication binds the burn and NFT to the same record fingerprint and XRBC_PUBLICATION_BATCH commitment. Existing standalone burns retain XRBC_BURN_TX and unused-history verification; no burn hash is guessed and no prior burn is silently charged again. Counterparty coordination and unknown future object IDs are not fabricated.
- Require current Mainnet identity, BatchV1_1 and fixBatchV1_2, exact account, fee at or below 1 XRP, fresh sequence/deadline, adequate reserves/holdings and relevant permissions. Standard simulate does not validate a complete Batch; retain the distinction between component checks and full Batch settlement.
- Preserve explicit reviewed terms, exact outer/inner fields, order/flags/sequences, challenge/intent binding, cross-tab locks, pending storage, QR/deep links, expiry/cancel recovery and no automatic replacement of ambiguous requests. Before a persistent intent exists, Cancel Review can return to the unchanged workspace for fresh terms. An attempted or uncertain request instead requires the existing status/lock path.
- Completion requires independently derived inner IDs, validated tesSUCCESS for all actions, exact ParentBatchID, ordered metadata and the same ledger. Exact trustline reduction and minted NFT IDs are required. Outer success or a signed payload alone is insufficient. Missing evidence preserves pending state; proven failure closes with a failure receipt and no automatic retry.
- Backup export/restore is optional for signing. Preserve the original ciphertext. Verified export compares the serialized envelope before download; failed export/restore preserves the record. A restored current record must not be rebuilt just to sign it. Backup password whitespace/Unicode are exact; never inspect or infer secrets from redacted browser values.
- Source refs and NFTs establish only the verified signer/ledger observations described by receipts, not legal title, underlying truth or regulatory approval. Private documents/record bodies remain local. No private wallets, balances, record fingerprints, payload IDs or screenshots belong in public memory.




## Evidence and limits

The scoped local checks passed across runs: 116 related checks plus four catalog checks (120 total), including ten new regressions (four display and six AI). One initial harness failure was a missing unchanged catalog dependency; fetching that module from production revision `bb26cfc0e4538dc85efa6371e71df5247836ef57` resolved the harness and its four tests passed. No application change was made for that missing local dependency. Four changed JavaScript modules and seven inline page scripts parse. Image loading is lazy and light-theme prompt/reply colors were adjusted.

Both pages pin core, ledger, studio, guidance and CSS to `20261015-4`. Core schema VERSION is unchanged; no backup schema migration is part of this update. Preserve original encrypted backups and legacy pending/receipt/predecessor support. Complete reusable input/environment fingerprints are not claimed. Source/synthetic tests and local artwork review do not establish live wallet metadata display, desktop/mobile dialog rendering or Xaman acceptance.

Previous MR !104's 30 focused checks and 474-test CI remain dated evidence for the SDK lifecycle repair, not proof of the current card/AI flow or live wallet behavior. Reuse relevant completed source/synthetic evidence without restarting unrelated wallet tests. No new app, wallet, proxy or browser operation is performed by this checkpoint work. Source checks, synthetic tests, CI, deployment, visual observations and validated user-signed results remain distinct.

## Next action, risk and stop rule

Candidate CI is complete. Merge only the exact checked update and wait for required master security and Pages deployment. The concrete risks are losing legacy URI/receipt compatibility, accepting an unapproved or incomplete record URI, leaking private record data through public metadata or AI navigation, or letting copied AI output bypass review. Preserve full record fingerprints, existing pending recovery and all signing guards.

Stop all tools immediately when requested deployment succeeds. No post-deployment test, screenshot, cleanup or checkpoint exception is allowed in that turn. On a new explicit continuation, preserve records/backups and pending state before loading the updated page. Review the artwork and AI flow separately from live signing; do not create a financial transaction merely to show the card. Actual wallet metadata rendering, Xaman acceptance and validated inner Batch results remain unverified until independently observed.

## Dated history

The previous MR !104 repair brief is preserved at `memory/archive/XRBC-TOKENIZATION-XLS-2026-10-15-before-evidence-card-ai.md`, captured from checkpoint `512fdd35cceb98cabf7f51f273425ecd291aaffa`. It retains exact SDK source/test limitations and earlier history pointers. Shared contract: `memory/contracts/XLS-UPGRADE-CONTRACT.md`; its historical Batch-disabled boundary was superseded only by the separately implemented atomic publication work, not blanket authorization for future Batch operations.
