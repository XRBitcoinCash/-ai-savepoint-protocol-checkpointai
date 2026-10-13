# NFT record publication and Tokenization XLS lifecycle — updated 2026-10-13
## Current objective, authority and source — 2026-10-13

The user requested NFT evidence-record publication, a broad useful catalog/search, small XRBC burns and verifiable source references. The accepted launch policy is a fixed 0.000001 XRBC per new NFT publication or linked revision, with the existing 2,500 XRBC holding gate. The reviewed repair was deployed; the user explicitly resumed cloud-browser testing afterward. Wallet attestations and signatures remain with the user. A later Ultra review remains requested, unperformed; no model-setting change or formal audit is claimed.

Frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, project 75781181. MR !97 merged source `7afc7e562c1f5ef9e87715551a1b49e354faef44` from `feat/nft-record-publication-20261013`; master merge `3ad9e4f16326b0c873ffbfd77f6a318df4affdaa`. Pages pipeline `2941198284` and deploy-pages job `17130472443` succeeded. These release states were reread on the first authorized postdeployment testing turn. MR: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/97 . Notes: `docs/nft-record-publication.md`. Scope: the two Tokenization pages and shared modules/catalog/tests; preserve unrelated layouts and issuer settings. Checkpoint `2ca3a975190580b0dc92cdf62f3a0a77f60d99bc` retains the predeployment state.

## Current behavior and scoped evidence

- 360 NFT templates / 30 domains, alias search, domain filter, pagination and custom types. Base64 packages JSON without eval, encryption or completeness claims. Issued-product references remain separate. Source hashes establish validated signer involvement and observed assets, not a named exchange, full route or origins of particular fungible units.
- The exact-decimal policy returns 0.000001 XRBC to its exact issuer, binding the salted fingerprint. Equivalent 1e-6 notation verifies without binary rounding. Fresh burn preflight requires 2,500.000001 XRBC to retain 2,500 after burning; ordinary access remains 2,500. Both pages use raw balances and refresh controls without reloading.
- Before requesting a burn: explicit authority/public-field/burn acknowledgments, intended NFT/source/feature/authority checks, unsigned NFT simulation, native XRP fee quote and pinned reserve/account funding checks for both fees plus a possible new NFT page. Each request fee is capped at 1 XRP, combined quoted fees at 1 XRP before burning. Conservative page reserve may exceed actual requirements. Quoted fees enter signing requests and settlement/recovery/receipt comparisons; shared intent hashing treats Fee as dynamic.
- Burn and NFT remain two Xaman approvals. A validated burn is irreversible if publication fails/cancels. Preserve and reuse its hash for the same unchanged record. NFT preflight rechecks burn/account/commitment, complete bounded prior-use history, sources and current eligibility. Changed fees/account/eligibility can still block publication. Never automatically replace an unknown request or burn. No live burn/NFT settlement has been executed.
- Browsing/search/previews/source references add no XRBC charge. Fixed token quantity does not fix cash value. XRP is the native transaction fee/spam protection. The application does not ledger-enforce one-time burn use across outside clients, certify document truth/title or guarantee fraud prevention. NFT objects can be burned while transaction history persists. Private documents, filenames and encrypted backups remain local.
- 41 focused checks passed; the final fixture-only change reran 13 publication checks and reused unchanged checks. Changed scripts parse, IDs are unique and whitespace checks pass. Final candidate CI `2941186769`, runtime job `17130394223`, passed 405 tests with zero failures/skips/cancellations. Repository job `17130394224` was advisory with validator exit 1 for other site findings; no strict whole-site clearance. Deployment pipeline runtime, advisory repository and security jobs also succeeded.
- Cloud-browser observations, 2026-10-13: the deployed fractional policy and catalog were visible. Software-release search returned meaningful ranked matches. Background verification briefly returned HTTP 502; Refresh Gate recovered unlocked access without reloading and preserved the draft. A nonfinancial software-release test record built successfully. After the user's pause, the same record remained present and access was unlocked; unsigned NFTokenMint preview matched the fingerprint with Flags 0, taxon 0 and only the record commitment memo, no royalty. Backup controls were opened for the user. Agent completed no personal attestations; no Xaman request, signed settlement, mobile rendering or Batch execution was tested. A generic initial publication status mentions a previous burn although none exists; retain as a small copy follow-up, not evidence of a payment.

## Next unfinished action and stopping condition

Keep the existing cloud draft; do not rebuild, reload or replace a financial request to recover context. The user must save an encrypted backup using their own password, review public fields/authority and complete the three acknowledgments. Then run the existing burn review/preflight and prepare its wallet request; stop for the user's QR/wallet signature. First cost is 0.000001 XRBC plus native XRP fee; NFT mint requires a separate approval. Compare validated outcomes before claiming success. On RPC/preflight failure, preserve the exact draft and receipts and inspect only the concrete failure. Private wallet/record IDs, balances and payloads are excluded from this checkpoint.

Batch remains unsigned/export-only for 2–8 single-account actions; atomic execution, participant signing and exact inner settlement are unfinished. After any future requested website deployment succeeds, stop all tools immediately; prepare memory beforehand. Evidence: `XRBC-record-microburn-local-2026-10-13`, `XRBC-record-microburn-CI-2026-10-13`, `XRBC-record-microburn-deployment-2026-10-13`, `XRBC-record-microburn-browser-2026-10-13`.

## Earlier NFT publication candidate — 2026-10-13, economic default superseded

Candidate `905e4469ece27ef4444195b505f6c41822b77e07` introduced the catalog/access/publication integration with a provisional 1 XRBC rate. It was never deployed or charged. Its 37 focused checks and pipeline `2941085732`/runtime job `17129747913` (401 tests) remain dated evidence, superseded for release by the fractional policy and funding guards above. Checkpoint `413b7225473a6174f30188c48664ef6d965acf6c` preserves the full earlier brief. No historical wallet data is republished.

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
