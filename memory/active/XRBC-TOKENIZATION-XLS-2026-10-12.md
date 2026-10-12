# Public and Advanced Tokenization XLS lifecycle — 2026-10-12

## Current objective and authority

After the four-token escrow eligibility findings, the user selected the public Tokenization workspace and its Advanced continuation as the useful place to incorporate XLS changes. Build general asset/record workflows, consider the up-to-eight-transaction Batch capability, and preserve the shared evidence architecture. This supersedes the proposed JCS treasury escrow pilot as the current implementation task. The broader ecosystem roadmap remains history/future planning, not blanket implementation authorization.

Authorized result: code changes on an isolated draft branch, checks, draft review and checkpoint publication. No merge/deployment, issuer setting change, token issuance, escrow, liquidity movement or actual Xaman request was performed. User signatures remain explicit. The existing 2,500 XRBC signing gate is unchanged; public local planning remains available without a purchase.

## Source and saved implementation

- Frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project` (75781181).
- Verified starting `master`: `52139c4a89c6f7c330b3716b90c77c0d4f33cde0`; rechecked unchanged before publication.
- Draft branch: `feat/tokenization-xls-lifecycle-20261012`.
- Draft commit: `078f9068e476be9e9b5b7d9ce94dcab3ef62dbb7`.
- Draft MR !96: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/96
- Notes: `docs/tokenization-xls-lifecycle.md` in that commit. Nine changed/new files: both Tokenization pages, shared core/ledger/studio JavaScript, studio CSS, new workflow module, focused lifecycle tests and notes.

The older professional NFT wizard already offered a mutable option. The newer shared public workspace always minted fixed NFTs; that is the specific behavior upgraded. Both pages load the same changed modules with refreshed cache versions. No homepage layout or unrelated tools were rebuilt.

## Implemented draft behavior

1. Explicit fixed versus mutable evidence-NFT choice. Fixed receipts remain the default. Mutable mint uses tfMutable (16); existing NFTs are not silently reminted or converted.
2. NFTokenModify review for a linked revision of the same NFT. The new record retains its record ID, increments its revision and binds its predecessor fingerprint. Preflight checks the current owner inventory at a pinned validated ledger, mutable flag, exact predecessor URI, DynamicNFT support and issuer/current authorized-minter authority. Unknown, changed or bounded-incomplete evidence stops the action. Receipt comparison verifies the reviewed NFT ID, URI and owner.
3. Optional tfMPTCanEscrow (8) for newly planned MPT definitions, requiring holder-transfer capability. TokenEscrow support is checked before signing. This does not lock funds, migrate classic tokens or enable their issuer flags.
4. Local queue and unsigned all-or-nothing Batch draft for 2–8 actions from one signing account. Uses a validated account sequence/amendment snapshot, bounded deadline, correctly marked unsigned inner transactions, illustrative fee and public application commitment. Rejects duplicate actions, mixed signers, tampered records and multiple updates of one NFT. Export omits private record bodies and document contents. Batch signing/submission is hard-disabled.

Examples: certificate/service/warranty revisions, shipment records, several independent NFT updates, and authorization/distribution of already identified MPTs. New NFT/MPT identifiers cannot be guessed for dependent actions. Eight is a transaction limit, not a limit on asset characteristics. Private files remain outside the ledger.

An evidence NFT can be self-minted by the connected user wallet. Describing a blackholed project's token does not require issuing the NFT from that token's blackholed issuer. The record does not change the represented asset's permissions or establish external legal title.

## Validation and limitations

- Local focused command: `node --test tests/unit/tokenization-studio.test.mjs tests/unit/tokenization-catalog.test.mjs tests/unit/tokenization-xls-lifecycle.test.mjs`: **23 passed**. Covers prior evidence/encryption/catalog behavior and mutable mint/update, predecessor and authority mismatch, permission/activation failure, Batch bounds/sequence/duplicates/signer rejection and disclosure limits.
- Local executable inline scripts parse on both pages; markup IDs are unique; all four affected JavaScript modules parse; `git diff --check` passes.
- GitLab MR pipeline **2940180718**, exact draft SHA above, **success**: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/pipelines/2940180718 . Runtime/gate/sidebar checks passed and **387 unit tests passed, zero failed/skipped** in job 17123914195.
- Repository validation job 17123914196 succeeded in **advisory mode**, with site-validator exit 1 and missing-reference findings elsewhere. This is not a clean strict site-validation certificate. No production deployment job ran in the MR pipeline.
- Visual browser review remains unperformed. Local Chromium was absent and its download returned unusable archives; do not repeat that attempt unchanged. No browser, wallet or live financial execution was validated.

## Next unfinished action and stopping condition

Review draft !96 and perform a browser/mobile check of the public workspace and Advanced continuation in an available environment. Verify configured backend/Xaman support for the new single-action NFT update before any user-reviewed live request. Do not merge/deploy from a bare resume, repeat completed tests without changed inputs, or interpret passing CI as wallet settlement.

Batch execution is separate unfinished implementation: actual fee/reserve and per-action checks, compatible signing, pending/uncertain recovery, independently derived hashes and exact validated inner results with ParentBatchID/same-ledger linkage. Standard simulate does not validate complete Batch transactions. Credentials/domains and actual escrow create/finish/cancel are future scope.

## Historical eligibility and shared design

Read `memory/observations/XRBC-ESCROW-ELIGIBILITY-2026-10-12.json` only when the four project-token permissions are relevant. At ledger 107613658, native escrow was blocked for XRBC/XRB/CreatureNFT by absent permission on blackholed issuers; JCS permission was off with master enabled. These findings remain valid dated history. No wrapper or replacement issuance is adopted.

Shared contract: `memory/contracts/XLS-UPGRADE-CONTRACT.md`. Broader roadmap: `memory/active/XRBC-XLS-ROADMAP-2026-10-12.md`. Evidence records: `XRBC-tokenization-XLS-local-2026-10-12` and `XRBC-tokenization-XLS-CI-2026-10-12`.
