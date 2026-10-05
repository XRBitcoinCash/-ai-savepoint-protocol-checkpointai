# XRBC homepage swap and Market Nexus — 2026-10-05

Checkpoint: `SAVEPOINT-2026-10-05-xrbc-home-nexus`. Status: **committed-CI-verified-deployment-pending**. This is a pre-deployment continuity record; it does not claim the new homepage release has deployed.

The user requested swap, wallet Connect/Disconnect and chart near the top, with detailed trading pairs below. Swap and chart should visually echo Battle Pulse/Nexus while making actual liquidity and price movement understandable. Keep existing signing, identity and safety controls.

Active source: GitLab `xrbitcoincash-group/xrbitcoincash-project`, project 75781181, `master`, `public/index.html`; verified baseline `c7fb139101bb078caafa3dd40209e97d541d2ec7`. Current implementation: `71504344e8222b2a034a988892619555abc5dd13`. MR: https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/47. Pipeline: 2914933341 (success). Changed frontend files: `public/index.html`, `public/xrbc-swap-liquidity.js`, `public/xrbc-market-display.js`, `tests/unit/swap-liquidity.test.mjs`, `public/xrbc-market-nexus.js`, `public/xrbc-market-nexus.css`, `public/xrbc-nexus-layout.js`, `public/xrbc-nexus-layout.css`, `public/xrbc-swap-nexus.css`, `tests/unit/market-nexus.test.mjs`.

## Source and visual contracts

- Market Nexus consumes the existing `xrbc:market-context` snapshot and exact selected pair; funded order nodes, pool reference and ±2% combined depth reuse `XRBCCombinedLiquidity`.
- Price nodes use measured price/size, with up to 12 visual offers per side from a 100-offer sample. The trail is at most 60 session observations, not historical candles; pair/source change resets it.
- New-ledger movement lasts 1.4 seconds. Duplicate, backward, conflicting, stale or unavailable evidence cannot invent activity. Pause, reduced-motion and offscreen/hidden suppression are supported.
- Existing chart indicators and actual Xaman review remain separate; Nexus makes no new RPC or signing request.
- Swap Nexus keeps existing validation and quote math. Book/AMM flow share equals source.baseAmount / modeled filledBase; unknown, partial and stale states remain explicit.
- Use in swap form stages the existing XRBCSwapTicket only; fresh execution quote and Xaman review remain required. Existing Connect/Disconnect controls are moved, not duplicated.
- Top workspace moves the real wallet controls and chart ahead of the pair chooser. All preexisting IDs and inline-script bytes are preserved; the actual review form remains below. Layout checks are DOM/source evidence, not browser rendering.

Keep a text/numeric equivalent, reduced-motion support and honest unavailable/stale states. Animation is an explanation of measured data, not proof of a ledger trade or predicted future price. Do not add a separate polling/signing path for visuals.

## Already established

- MR !45 combined funded order-book/AMM liquidity deployed at `39cb75b824255ca2a0c3b12e19153038b77ab1ca`; pipeline 2914854164 succeeded. Existing swap-form/Xaman review remains the transaction path.
- MR !46 XRBitcoinCash favicon deployed at `c7fb139101bb078caafa3dd40209e97d541d2ec7`; pipeline 2914880120 succeeded. Search-provider recrawl/cache results remain unverified.
- These normal successful pipelines resolve the historical CI quota condition; old MR statuses are separate.
- The GitHub `xrbitcoincash.github.io/xrpl-proxy/` backend path is stale. Current GitHub root was observed as redirect files; current backend source is unknown. No backend change is part of this task.
- No real wallet transaction was submitted or proven by these checks. Focused source/mocked checks, CI, deployment and user-device behavior remain separate evidence.

## Efficient next session

Read `AGENTS.md`, `memory/task-router.json`, then `memory/active/XRBC-HOME-NEXUS-2026-10-05.json` once. Load the 100KB history or graph only for a missing fact. The exact final data fields, transforms, renderers, freshness and failure states are in the active JSON. Resolve the recorded MR/pipeline status only if needed for the new request; do not replay completed work.

JCS Prayer Map/Observatory and the legacy XRB queue remain under their existing routes. External checkpoints improve retrieval and continuity; they do not modify internal model weights or guarantee automatic recall.

Memory is published and read back before homepage deployment. Once that deployment succeeds, stop all tools immediately. No post-deployment tests or memory writes.
