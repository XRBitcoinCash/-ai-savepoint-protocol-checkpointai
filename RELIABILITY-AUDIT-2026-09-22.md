# Reliability audit and secondary-memory checkpoint — 2026-09-22

## Outcome and boundaries

This pass updates continuity only. No application, workflow, backend, DNS, Render, Xaman configuration, wallet, or transaction was changed. It reviews recent AI-assisted work by evidence; the authoring model/tier of each commit was not established. An Ultra setting or model name is not proof of correctness.

Current verified source snapshots:

| Role | Repository / branch | Commit / evidence |
| --- | --- | --- |
| Continuity before this change | GitHub XRBitcoinCash/-ai-savepoint-protocol-checkpointai / main | a04378435f83f852308ccd9f8dc81ce458322917 |
| Active frontend | GitLab xrbitcoincash-group/xrbitcoincash-project / master | 97cfb36f244e8f11d806232aedf488fc34fb9898; pipeline 2870991044 success |
| Shared backend and mirror | GitHub XRBitcoinCash/xrbitcoincash.github.io / main | 48c7ff4dd45b2658ba5ce3f6ddf7d86128fc9563 |
| Last API test pass | Same GitHub backend | 131e204ebe131c5ae2f886d75506b230af91db21; run 35626734128 |

Refresh heads before every repair. These are audit baselines, not claims about future current state or served custom-domain bytes.

## What was actually checked

- Existing bootstrap, latest record, canonical contract, machine memory, graph, error register and relevant checkpoints.
- First 100 recent frontend commits and pipelines since September 19; selected failure logs/diffs and latest job results. This is not a review of every historical diff.
- All 27 root-level public HTML pages: 118 executable inline classic scripts parse; no duplicate markup ID/root findings or missing declared inline CSP hashes under this static scan. External/module execution, CSS hit-testing and browser behavior are not proven.
- Existing frontend runtime contracts pass for 10 critical pages; gates pass for 12 tools / 7 tiers; all 17 existing unit tests pass locally.
- Source-extracted, no-network probes reproduce XRB-007 and XRB-008 and confirm the missing event bridge relevant to XRB-001.
- The 15 backend/test/API-workflow blobs present at the successful API run are unchanged at the observed backend head.
- Current GitLab validation log, not just the green badge: 19 finding lines, validator exit 1, advisory mode. Five current pipeline jobs were returned, not six. SAST and secret-detection jobs succeeded but are configured allow_failure=true. Their success is not proof of zero vulnerabilities.

Local runtime was Node v24.19.0; configured CI runtime is Node 22. Browser/mobile/two-tab/real OAuth/finality checks and the deployed Render endpoint were not performed.

Machine evidence: [memory/audits/2026-09-22-reliability-audit.json](memory/audits/2026-09-22-reliability-audit.json).

## One-at-a-time repair queue

| Order | ID | Finding | Evidence and next action |
| --- | --- | --- | --- |
| 1 | XRB-001 | Second Connect click required | User report plus missing browser success/retrieved adoption bridge. Diagnose exact promise/event order, then bind completion to the active SDK/attempt. Do not restore unrestricted passive browser adoption. |
| 2 | XRB-007 | Cancel / restart does nothing during authorization | Actual disconnect() returns when S.connecting=true; the visible Cancel button calls that handler. Synthetic probe: zero clear calls. Add a bounded cancellation path, preserve pending requests. |
| 3 | XRB-008 | SDK startup failure leaves connecting latched | SDK creation occurs before try/finally and timeout setup. Injected initialization throw leaves connecting=true. Ensure safe cleanup without delaying authorize beyond the user click. |
| 4 | BRIDGE-001 | Advanced Bridge wallet setup incomplete | Missing pinned SDK and empty SRI intentionally disable Connect. Preserve fail-closed behavior; review and pin dependency/integrity before enabling. |
| 5 | CI-001 | Coverage/advisory results overstate readiness | Add tests for real recovery behavior and distinguish pipeline status, validator findings and live evidence. Do not blindly flip strict mode or relax assertions. |
| 6 | META-001 | Manifest validator uses old schema | Current exact identifiers are under xrbc:officialIdentity; validator still reads assetIdentity. This is schema drift, not evidence that the current issuer is wrong. |
| 7 | META-002 | License labels/tests stale | LICENSE and TOML use LicenseRef-XRBC-Watchdog-1.0; validator/README use another identifier and older CONTRIBUTING prose says Apache-2.0. Align descriptions/tests to current source without changing license terms. |
| 8 | REF-001 | Missing discovery/evidence links and market sitemap path | Resolve each reference deliberately; do not fabricate readiness evidence. See exact paths in registry. |
| 9 | DEPLOY-001 | Served-origin/mirror freshness unverified | Mirror build-info identifies baf07ddb...; latest observed sync ran before the new GitLab deployment. Compare actual origin build markers before diagnosing a sync failure. |
| 10 | UX-001 | Rendered layout and device flows unverified | Check desktop/mobile/narrow widths, theme, keyboard, QR/deep links, cancel, resume, cold backend and two tabs after bounded repairs. |

XRB-001 remains first per the user's most recent reported defect. Do not mark the wallet lifecycle complete until cancellation and startup-error recovery also pass. Each issue needs a failing reproduction, bounded patch, acceptance checks, diff review, exact commit/CI evidence and separately labelled browser confirmation.

## Already-fixed failures: do not repair twice

- API-001: workflow b9ef92b failed at tests, not dependency installation. OpenAPI count was 25 while test expected 24. One-line test correction 131e204e followed by successful API run 35626734128. No workflow or site change needed now.
- TEST-001: ac46b49e pipeline failed a source-regex assertion looking in setupSdk instead of wireSdk. Test-only successor 97cfb36f passes. That did not cover first-click account hydration, cancel during an unresolved authorization, or SDK construction failure.
- TEST-002: initial scaffold gate assertion failed; correction 2d192c95 and current gate tests pass. No holding-threshold change is warranted.
- Existing XRB-002/003/004/006 repairs remain historical regression fixtures. XRB-005 stays retest-required, not a fully verified live fix.

Evidence:
[API failed run](https://github.com/XRBitcoinCash/xrbitcoincash.github.io/actions/runs/35626618909),
[API passing run](https://github.com/XRBitcoinCash/xrbitcoincash.github.io/actions/runs/35626734128),
[current GitLab validation log](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/jobs/16651226888),
[current pipeline](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/pipelines/2870991044).

## Memory faults corrected in this commit

- NEXT_RUN still identified the September 21 memory-layer checkpoint and repeated completed scaffold tasks.
- The context graph's active_savepoint still identified the Developer sidebar checkpoint, while the main pointers identified the later XRB lifecycle checkpoint.
- Latest pointer next_action asked for a retest without surfacing the newly reported second-click issue.
- Historical desktop QR-only wording conflicted with later official same-payload QR/open-link behavior.
- Generic green-CI wording obscured advisory validation and untested interaction paths.

Active bootstrap, latest record, machine memory, graph, next-run and registry now agree. The previous NEXT_RUN is retained at memory/archive/NEXT_RUN-before-2026-09-22-audit.md. Historical checkpoints are not deleted or retroactively treated as verified. Changes are published together as one fast-forward memory commit, with no force push.

## Reusable operating protocol

[OPERATING-PROTOCOL.md](OPERATING-PROTOCOL.md) and its JSON twin define source selection, authorization boundaries, evidence grades, testing, research provenance, one-at-a-time repairs and checkpoint validation. AGENTS.md makes the entrypoint discoverable in this repository.

The user's preference is to use connected GitHub, GitLab, Google and other relevant sources when useful. GitHub reads and GitLab reads were verified here. GitHub memory-write success is established only by the containing commit read-back. Google and other services were not probed, and availability/permissions must be rediscovered per session. This is not a blanket credential grant or approval for financial actions, destructive changes, publishing elsewhere or unrelated account access.

This repository is an external secondary context/checkpoint layer. It does not change model weights, guarantee automatic loading in every new chat, promise defect-free work or prove a particular model/Ultra capability. Future sessions should be directed to ai-bootstrap.json. General methods transfer across projects; XRBC identities, gates and project-specific settings do not.

## Remaining scope

Historical XRBC/JCS reports remain historical until reproduced against current source. The standalone JCS repository, real wallets, live transaction signing and all research domains were not audited. Public continuity must contain only task-relevant, non-secret project facts—not private correspondence, personal medical/financial information, tokens or raw authenticated logs.

Application repairs begin only after this memory pass, under the next explicit user instruction.
