# XRBC homepage Live Metrics liquidity castle — recorded 2026-10-20 UTC

Objective and current user authority:

The user authorizes building and publishing a lightweight animated XRP liquidity castle in the existing homepage Live Metrics section. This is a separate isolated homepage feature. P2P MR !111/backend PR #2 and their release/configuration holds remain untouched. No new provider, service/resource/account/bill, signing flow or CSP endpoint change is authorized by this visual.

The feature implements the accepted translucent 3D-style castle on the right, two/three towers and escrow context behind a wall, near-center gate/drawbridge/moat, blue offered XRP, green buyer demand and red selling pressure. Visible venue depth/pressure and a labelled multiple explain the mechanics. New scene/model/controller/styles remain local assets with minimal homepage markup/import integration.

Repository/provider/branch/application paths:

GitLab `xrbitcoincash-group/xrbitcoincash-project`, project75781181. Isolated branch `codex/xrbc-liquidity-castle-20261020`, candidate `8283373ef9d621c314ab1d068a1d770283303ab4`, based on recorded production master `60fdd38c3796a30ba6d587003ecb1f48c3749b19`. MR !112: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/112 . **Candidate committed/CI passed; homepage merge and deployment pending.**

Ten changed files: `public/index.html`; `public/xrbc-liquidity-castle-model.js`; `public/xrbc-liquidity-castle-scene.js`; `public/xrbc-liquidity-castle-ui.css`; `public/xrbc-liquidity-castle.css`; `public/xrbc-liquidity-castle.js`; `tests/unit/liquidity-castle-model.test.mjs`; `tests/unit/liquidity-castle-reader.test.mjs`; `tests/unit/liquidity-castle-ui.test.mjs`; `docs/liquidity-castle.md`.

Recorded source revision and observation date:

Root verified source/readbacks/CI at the exact candidate on2026-10-20. All14 original inline script bodies,413 old IDs and CSP are preserved. Existing markup adjustments relocate the metrics ID to main level and change two anchor lines; new markup/imports add the isolated feature. No existing signing JavaScript/security endpoint change. New assets total approximately71KB uncompressed with no animation library or remote service.

Data and runtime boundaries:

- Live Coinbase XRP/USD book with separate existing Kraken fallback. Venue books remain independent with visible attribution. Selectable ±0.5/1/2% bands; default1%. Visible resting depth/pressure is venue-specific, not executed flow or all XRP supply.
- Refresh60s; expiry90s remains enforced even while a fetch is pending.429 backoff, visible/offscreen abort and an active-Live-click cooldown prevent repeated read bursts. Reduced-motion/manual-pause controls are implemented; actual browser behavior has not been observed.
- Existing fixed read-only ledger request supplies totalDrops context; BigInt preserves integer drops for supply valuation. No new endpoint/security policy or signing action. This does not establish aggregate escrow.
- Aggregate escrow remains unavailable/unknown. Explore controls use explicitly labelled sample data; feed failure does not silently turn into sample Live values. Missing/stale/fallback/demo states remain distinct.

Completed evidence IDs, scope and limitations:

`XRBC-liquidity-castle-source-2026-10-20`: source-preservation/readback scope above. Controller SHA256 `47274028f34c2bdb15f189039bf929c3cfc6bf3e61f8ca30b1fd5f2b894c358f` and UI-test SHA256 `1a3d28adc5b9a200a0382b7774206b6b57c2733b0c6d7c8c88334f638c2be63c` match local. These identify specific files, not complete input/environment fingerprints.

`XRBC-liquidity-castle-local-2026-10-20`:41 focused model/reader/UI tests pass, including the fixed/tested active-Live-click cooldown; root rerun passed. These tests are included in CI651, not added to that total.

`XRBC-liquidity-castle-static-artwork-2026-10-20`: artwork PNG rendered with Inkscape and visually inspected using view_image; geometry/contrast accepted. This is standalone artwork inspection, not actual browser/full-page/mobile/persistence/live-CORS QA. No browser QA/live CORS verification was available; report these limits rather than inventing success.

`XRBC-liquidity-castle-CI-2026-10-20`: pipeline2967382587 succeeded at exact8283373e. Runtime17314971217 passed651 tests, fail0; verified11 critical pages,12 tools/7 tiers,24 sidebar pages/5 groups/29 links. Repository job17314971218 succeeded in existing advisory mode:6 SEO tests passed, underlying site validator exited1 on unrelated unchanged missing refs/sitemap (markets/,llms.txt,privacy,ecosystem guide,readiness data), with no new castle-file finding. Advisory success is not strict sitewide clearance.

Present blocker and what would establish recovery:

No remaining code/CI blocker is recorded for this isolated candidate. Actual browser/live-feed CORS/mobile/reduced-motion behavior is unverified, an explicit QA limitation. Unknown aggregate escrow is an accepted data boundary, not a reason to add services or invent numbers. The feature is not yet deployed; no production/live-site observation is established by source, synthetic tests, static artwork or CI.

One next action:

After this validated deployment-pending checkpoint is published/read back, root may merge MR !112 at the exact reviewed head and poll the production Pages result. Keep all P2P drafts/configuration work held. No additional source changes or broad audits are queued.

Acceptance condition and stop rule:

Candidate source,41 focused tests/static artwork and exact651-test CI are completed as scoped above; preserve truthful venue/freshness/Explore/unknown-escrow behavior and the narrow source boundary. Deployment is authorized and pending. Immediately when the requested website deployment succeeds, stop **all tools**, including memory readbacks/checks/cleanup. Resume only on a new explicit user request; no post-deployment QA/checkpoint exception. A later turn may reconcile actual deployment/browser results with fresh authorized evidence.

Relevant contracts:

`AGENTS.md` and `memory/CONTINUITY.md` govern publication/evidence and the mandatory deployment stop. Existing endpoint/signing boundaries remain intact. P2P journals/bridge/configuration belong to their separate held route.

History/supersedes pointers:

New narrow route `xrbc_liquidity_castle` supersedes no task. Default swap route/compatibility mirror and `xrbc_record_handoff` stay unchanged. Prior checkpoint `1958d1f418a0cc43413bbeb3abcf71642e8dc9b9` holds the separate P2P state. No private data, wallet records, payloads, secrets, screenshots or raw logs in public memory.
