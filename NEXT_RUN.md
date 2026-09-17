# XRBitcoinCash — next-run checkpoint

Updated: 2026-09-17. Read this before resuming the homepage work after a chat/server interruption. This is a continuation checkpoint; retain the earlier project and liquidity-index records in this repository.

## User task recovered and implemented

The user asked to resume from the last endpoint after an internal server error and complete the existing task. Recovered homepage requirements: a compact exchange-style interface inspired by Coinbase, fixed desktop sidebar, plain-language feature labels, expandable sections instead of a long vertical stack, and an initial dashboard around one or two screens. Preserve existing working wallet, trustline, chart, market, issuer, history/export, and XRBC token-gated functionality.

Authoritative code repository: GitLab `xrbitcoincash-group/xrbitcoincash-project` (project ID `75781181`), branch `master`. Do not substitute the GitHub mirror as the production source.

## Saved implementation

Implementation commit: `4aa1061f3d7610a0e18015c1fde44ffb0f85b274`.
Commit URL: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/commit/4aa1061f3d7610a0e18015c1fde44ffb0f85b274

Added `public/xrbc-home-compact.js`, `public/xrbc-home-compact.css`, and executable `scripts/prepare-compact-home.sh`. The CI file has two preparation-script hooks: validation and deployment. Original `public/index.html` source was not rewritten; the build inserts one stylesheet and one deferred script and verifies that removing them restores the original HTML byte for byte.

The layout uses existing DOM nodes and IDs. Six views: Dashboard, History & exports, Token details, Order book, Safety & issuer, and Learn & links. Fixed desktop sidebar; mobile drawer; existing original menu retained under More links. Desktop wallet card and expandable mobile wallet section. Secondary statistics, chart controls, QR/help, and detailed content are expandable. Wallet/trustline actions and QR-state changes open QR/help.

The patch does not rewrite transaction payloads, signing functions, backend endpoints, asset identifiers, financial calculations, or token gates. The design is intended to preserve working behavior, but moving nodes is not proof that every delegated handler or third-party integration still works.

## Verified deployment

Pipeline `2857774142` for implementation commit `4aa1061f` returned `success`.
Pipeline URL: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/pipelines/2857774142

Jobs and statuses confirmed through the GitLab connector:
- validate-repository `16560996933`: job success; underlying validator exit 1 / advisory.
- semgrep-sast `16560996934`: job success; findings report not reviewed.
- secret_detection `16560996935`: job success; findings report not reviewed.
- deploy-pages `16560996936`: success; finished 2026-09-17T10:57:54.467Z.

Validation and deploy job traces both confirmed successful external-asset injection and original HTML byte preservation. The deployment trace recorded publication to `https://xrbitcoincash-project-15389d.gitlab.io` and successful artifact upload. This confirms GitLab Pages deployment, not an independent custom-domain browser check.

Published-tree digest in the validation report: `9f08f3e003d64ad6028e141f453883b384734d157e96742858e84a8376b542bc`; 57 files; 12,902,761 bytes.

## Validation warnings and evidence correction

Do not call this a clean site-validation or security-audit pass. Existing advisory settings let the pipeline continue when the validator reports findings. Its trace reports invalid `public/universal-ai.json`, two TOML/license metadata mismatches, a missing `/markets/` sitemap destination, and missing local references including llms.txt, creature NFT discovery JSON, readiness JSON, and the bridge-monitor Xaman vendor file. The compact-home patch did not modify these referenced files. They were not fixed or suppressed during this layout task.

The first draft of the implementation documentation included offline-fixture results and viewport numbers. Reproducible fixture files, runner, screenshots, and execution logs were not available at this recovery endpoint. These are NOT retained as verified results. The documentation and result record were corrected in docs-only commit `45d0ff0217e4188a4bcd3fce18292c58c207a20c` (`[skip ci]`; no public source or deployment logic changes). No companion download package is asserted to exist.

Current evidence and acceptance status are in GitLab `docs/COMPACT-HOMEPAGE-2026-09-17.md` and `tests/compact-home-results.json`. Do not state that live wallet behavior, custom-domain loading, responsive dimensions, or production integration tests passed. No real-wallet transaction was signed or submitted.

## Exact next technical checkpoint

The implementation is committed and its Pages deployment job completed. Next is direct browser acceptance of the deployed homepage: asset/CSP loading; default height and horizontal overflow with real values; existing handlers and element identities; views, deep links, browser back, mobile drawer focus; wallet QR/deep-link/cancel/disconnect/reset; quote changes; chart intervals and PDF/CSV exports; and token-gated access. Use real source, not a fabricated fixture presented as production. Do not sign transactions to test layout.

Read current GitLab master and diff before further edits. The last known master was documentation commit `45d0ff02`; deployed implementation remains `4aa1061f`. Recheck both rather than assuming they have not changed. Preserve all working functions and keep unrelated fixes separate. Do not restart the redesign or ask the user to repeat already recovered instructions.

Baseline before this task: `8a3d76aa33d032a25b2358278fdeaf6b0f1a3b25`. Recovery option: remove only the two CI preparation calls in a clean build to disable the presentation layer while retaining original source. Do not revert unrelated later work.
