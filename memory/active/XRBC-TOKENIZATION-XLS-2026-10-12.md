# NFT record publication and Tokenization XLS lifecycle — updated 2026-10-13
## Current objective, authority and source — 2026-10-13

The user resumed Advanced Tokenization browser/wallet testing, then requested a broadly useful NFT record publication page, expanded searchable use cases, a small XRBC burn as a spam deterrent, and traceable transaction references. Work was implemented on an isolated review branch. The user did not specify the burn amount or removal of the 2,500 XRBC holding gate. The candidate uses a clearly displayed provisional 1 XRBC burn per NFT mint/revision and retains that gate; review these economic defaults before deployment. No actual burn, mint, escrow, transfer or Batch request was created. No deployment of this candidate has been authorized/performed. A later Ultra analysis is still requested; no model-setting change or completed Ultra audit is claimed.

Current frontend candidate: GitLab project 75781181, branch `feat/nft-record-publication-20261013`, commit `905e4469ece27ef4444195b505f6c41822b77e07`, Draft MR !97: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/97 . CI pipeline `2941085732` passed. Master remained `b09b9bb0cb70e66cccef756d630815bfc4e711e5` before branch publication. Scope is 15 files across both Tokenization pages, core/ledger/studio/style, new access/publication/catalog modules, authored catalog/generator, focused tests and `docs/nft-record-publication.md`.

## Current behavior and evidence

- Previous MR !96 was observed merged to master `b09b9bb0`; pipeline `2940203614`, deploy-pages job `17124086201` succeeded. That deployment predates this testing turn. Live browser loaded the 20261012 module versions.
- Xaman SignIn visibly completed, the holding gate unlocked, and wallet details remained hidden pending deliberate reveal. Empty record build was rejected; fixed NFT default and explicit mutable opt-in were observed; Batch signing was disabled. No private wallet values, addresses or payload identifiers are published here.
- A later direct observation reproduced relocking with “Access verification expired. Refresh Gate…” for the already-connected session. Source implemented unconditional two-minute relocking. New candidate coalesces/renews visible gate reads, backs off after unavailable evidence, preserves signing freshness and distinguishes unavailable verification from insufficient holdings. Routine studio-state changes preserve drafts/queues; signer changes invalidate dependent review.
- 360 authored NFT record templates in 30 domains; Base64 packages JSON without eval, encryption or compression claims. Alias search, domain filter, pagination and custom types extend the catalog. Issued products remain separate references, not asserted XRPL issuances. Tests cover car title, prayer, software release, gold custody and other searches.
- Explicit burn Payment returns exactly 1 XRBC to the exact issuer and binds the salted record commitment. Verification checks validated success, exact fields, returned hash and signer trustline reduction. NFT review rechecks burn/account/commitment, complete bounded prior-use history, selected sources and existing NFT preflight. Public memos link burn/source hashes; encrypted backup/private file handling remains local. The old wizard directs new publication through the shared workspace.
- Burn and publication are separate approvals. A validated burn is irreversible if mint is canceled or fails; reuse the existing burn for the same unchanged record rather than automatically charging again. This is an application policy, not a protocol-enforced fee or one-time-use rule across clients. Prior-use checking is preflight, not compare-and-swap. Small cost does not guarantee prevention of spam, fraud or terrorism funding.
- Source evidence requires validated successful transactions and involvement of the signer. Observed assets and touched AMM objects do not prove a named exchange, complete route or origins of specific fungible units. Records do not establish legal title, identity or external truth; NFT objects can be burned even though historical ledger transactions persist.
- 37 focused local source/synthetic checks passed, including actual studio mounting/review sequencing and both pages’ settlement memo guards. Page IDs were unique and executable inline scripts parsed. CI runtime job `17129747913` passed runtime/gate/sidebar checks and all 401 unit tests, zero failures/skips, for the exact candidate. Repository job `17129747914` passed in advisory mode with validator exit 1 for other site findings; it is not strict site-wide clearance. Browser/mobile rendering, paid burn and mint settlement on the new candidate are unperformed.

## Next unfinished action and stopping condition

Review MR !97 and confirm the provisional 1 XRBC publication rate/retained holding gate. On explicit deployment authorization, recheck exact source/master heads and candidate CI, prepare the checkpoint before merge/deployment, and stop all tools immediately after successful deployment. New browser/mobile and user-reviewed wallet tests follow on a separate user-requested turn. Do not rerun unchanged completed checks merely after a model switch. Preserve ambiguous requests and existing burns; never create replacement financial requests automatically.

Batch remains unsigned/export-only for 2–8 single-account actions. Actual atomic execution, multiple participant signing, fee/reserve preflight and exact validated inner settlement are separate unfinished implementation. Do not present this release as one-signature atomic burn-plus-mint.

Earlier sections below are dated history and do not select the current action. Evidence: `XRBC-record-publication-local-2026-10-13`, `XRBC-record-publication-CI-2026-10-13`, `XRBC-tokenization-browser-access-2026-10-13`.

## Earlier XLS objective and authority — 2026-10-12

After the four-token escrow eligibility findings, the user selected the public Tokenization workspace and its Advanced continuation as the useful place to incorporate XLS changes. Build general asset/record workflows, consider the up-to-eight-transaction Batch capability, and preserve the shared evidence architecture. This supersedes the proposed JCS treasury escrow pilot as the current implementation task. The broader ecosystem roadmap remains history/future planning, not blanket implementation authorization.

Initial authorized result: code changes on an isolated draft branch, checks, draft review and checkpoint publication. On 2026-10-12 at 16:27 America/Chicago the user explicitly requested another review, required additions, deployment, then later testing. This now authorizes merging/deploying reviewed MR !96 after its checks. No issuer setting change, token issuance, escrow, liquidity movement or actual Xaman request was performed. User signatures remain explicit. The existing 2,500 XRBC signing gate is unchanged; public local planning remains available without a purchase.

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

## Predeployment review and release candidate — 2026-10-12

Reviewed source candidate: `567b992a41053cfb825cf5fa52da83767b0a9099`, same branch and MR !96. The target master remained `52139c4a89c6f7c330b3716b90c77c0d4f33cde0` at review start. The review added public PREVIOUS_RECORD_SHA256 memos to NFT updates and predecessor links to validated receipts, plus rejection of changed reviewed fields, extra economic fields, duplicated/missing record memos and altered simulation transaction terms. Both pages accept the predecessor memo through their existing signing safeguards and load refreshed core/ledger cache versions.

All **27 focused local tests passed**. MR pipeline **2940199284** passed for this exact candidate; runtime job **17124051551** passed **391 unit tests, zero failures/skips**, with runtime/gate/sidebar checks. Repository job **17124051552** still reports advisory site validation for missing references elsewhere. No financial execution or browser rendering was tested. The predecessor observation is not a ledger-enforced compare-and-swap: another authorized URI update could occur before settlement.

This checkpoint is deliberately prepared **before** the authorized merge/deployment. It does not assert that deployment has already succeeded or invent a merge SHA. On resume, resolve MR !96's merged head and the master Pages pipeline before testing. Once the deploy-pages job is confirmed successful for that merged head, stop all tools and report. Record the resulting deployment evidence on the next user-requested testing turn, not after the deployment-stop boundary.

Evidence: `XRBC-tokenization-XLS-predeploy-local-2026-10-12`, `XRBC-tokenization-XLS-predeploy-CI-2026-10-12`. Preserve earlier draft records as dated history; they are superseded for candidate-source validation.

## Earlier continuation — superseded by the 2026-10-13 section

Finish the already-authorized merge/deployment of reviewed candidate !96, using exact-head checks and the successful candidate CI. Stop immediately on successful deployment. The next user-requested testing turn should first resolve the deployed build and inspect public/Advanced workspace behavior, then verify configured backend/Xaman support for a user-reviewed NFT update. Do not repeat completed checks without changed inputs or interpret passing CI as wallet settlement.

Batch execution is separate unfinished implementation: actual fee/reserve and per-action checks, compatible signing, pending/uncertain recovery, independently derived hashes and exact validated inner results with ParentBatchID/same-ledger linkage. Standard simulate does not validate complete Batch transactions. Credentials/domains and actual escrow create/finish/cancel are future scope.

## Historical eligibility and shared design

Read `memory/observations/XRBC-ESCROW-ELIGIBILITY-2026-10-12.json` only when the four project-token permissions are relevant. At ledger 107613658, native escrow was blocked for XRBC/XRB/CreatureNFT by absent permission on blackholed issuers; JCS permission was off with master enabled. These findings remain valid dated history. No wrapper or replacement issuance is adopted.

Shared contract: `memory/contracts/XLS-UPGRADE-CONTRACT.md`. Broader roadmap: `memory/active/XRBC-XLS-ROADMAP-2026-10-12.md`. Evidence records: `XRBC-tokenization-XLS-local-2026-10-12` and `XRBC-tokenization-XLS-CI-2026-10-12`.
