# XRBitcoinCash — next-run checkpoint

Updated: 2026-09-21.


## Machine-first continuity bootstrap

For new XRBitcoinCash/XRPL project sessions, use this compact load path before reading long historical notes:

1. `ai-bootstrap.json`
2. `latest_savepoint.record`
3. `ai-memory.json`
4. `memory/synapse-map.json`
5. Only the checkpoint files routed for the current task
6. The canonical contract when the task is security-sensitive, policy-sensitive, contradictory, or missing evidence

Current machine-memory savepoint: `SAVEPOINT-2026-09-21-memory-synaptic-layer` in `memory/savepoints/SAVEPOINT-2026-09-21-MEMORY-SYNAPTIC-LAYER.json`.

This is an external continuity layer, not a change to model weights or persistent internal model state. Human-readable historical checkpoints remain retained during the hybrid transition.

## Primary task for the next implementation pass

Continue the XRBitcoinCash ecosystem production scaffold defined in:

- `XRBC-ECOSYSTEM-PRODUCTION-SCAFFOLD-2026-09-20.md`
- `ai-memory.json`
- `AI-SAVEPOINT-PROTOCOL-CHECKPOINT-TIA.md`

The intended higher-capability implementation pass is 2026-09-22.

## Source of truth

Active frontend:
- GitLab project: `xrbitcoincash-group/xrbitcoincash-project`
- Project ID: `75781181`
- Branch: `master`
- Audited baseline: `4d7343c8c624e805298a4cd30c0a8f609f35b548`
- Baseline pipeline: `2865125823` — success

Always fetch the current head before editing. Do not assume the audited baseline is still current.

Shared backend/API:
- GitHub: `XRBitcoinCash/xrbitcoincash.github.io`
- Backend directory: `xrpl-proxy/`
- Render origin is documented in project code; do not change service settings or secrets from this checkpoint.

## What was decided

- Preserve current XRBC holding gates until current XRBC/XRP price/liquidity evidence is checked and an explicit policy decision is made.
- Gates are reusable holdings, not payments or burns.
- Higher gates must unlock materially deeper capability than lower tiers.
- Token gates are not sufficient anti-bot controls by themselves.
- Backend warm-up must never block initial page interaction.
- No Xaman transaction payload may exist during backend warm-up.
- Exactly one Xaman payload per deliberate final intent.
- Ambiguous payload creation must be reconciled, never automatically retried with a replacement payload.
- Final success requires validated XRPL evidence and critical-field verification.

Current threshold ladder:
- Bridge Integrity advanced: 10 XRBC
- Extended Audit: 50 XRBC
- Sentinel Forensics: 150 XRBC
- Risk Lens: 150 XRBC
- Value Path: 400 XRBC
- Watchtower: 1,000 XRBC
- Advanced Tokenization: 2,500 XRBC

## Scaffold already landed\n\nGitLab scaffold foundation: `8cfc0659a5d884f2a2a01411825205a6c4a89581` plus gate assertion correction `2d192c95c6afad338365b265537984e896b4d473`. Pipeline `2865294807` passed runtime-contracts, repository validation, secret detection, Semgrep SAST, and deploy-pages.\n\nGitHub backend access policy: `fe00bbb5...` policy file, `e07f3711...` API integration, `ba82d16d...` tests. Existing public API tool shape and thresholds were preserved.\n\n## September 21 bounded UI/discovery work already landed

Discovery/brand pass:
- frontend commit `68586a9af00f88253b60f7ee6137cec2b6dfa145`
- pipeline `2867921308` success
- checkpoint `DISCOVERY-BRAND-FAVICON-SEO-2026-09-21.md`
- conventional root favicon/icon aliases and machine brand records were added without removing legacy asset URLs

Xaman reconnect status pass:
- frontend commit `bc77e91dbaac701a08d5364dd635e62715e26850`
- pipeline `2868175288` success
- checkpoint `UI-XAMAN-RECONNECT-COUNTDOWN-2026-09-21.md`
- main order panel now exposes the existing 180-second authorization window through a yellow security notice and red countdown
- this countdown is status UI only; do not turn it into automatic reconnect, replacement authorization or transaction retry behavior

Before the September 22 higher-capability implementation work, fetch current GitLab and GitHub heads again.


## September 21 liquidity top-wallet pass

Already implemented in the active GitLab frontend:
- UI commit `6df386f2b031f5b085232a0701ac0e1ea953aa87`
- pipeline `2868276237` success
- local memory commit `0ff62e898fee7cf90f087659139c469cf1adfeac`
- machine savepoint `memory/savepoints/SAVEPOINT-2026-09-21-LIQUIDITY-TOP-WALLET-XAMAN-COUNTDOWN.json`

The Liquidity Pool now uses a compact top side-by-side workspace: liquidity actions plus Xaman authorization. On smaller screens the wallet card moves first. The connection card exposes a three-minute Xaman authorization countdown while transaction/backend action waits remain 90 seconds. Do not merge those timers or turn the countdown into an automatic authorization/transaction retry.

Manual follow-up: visually verify the custom-domain desktop/mobile layout and one close/restart Xaman authorization attempt.


## Shared exchange UI standard — active

Visual reference implementation:
- shared CSS: `public/xrbc-dynamic-ui.css` v1.1.0
- opt-in activation: `body.xrbc-exchange-shell`
- Liquidity Pool pilot: `public/xrbc-liquidity-pool.html` release `0.2.0`
- implementation commit: `fde15e74b4012a3981b89cad5fdae089331f860e`
- pipeline: `2868371281` success
- standard checkpoint: `SHARED-EXCHANGE-UI-DESIGN-SYSTEM-2026-09-21.md`

For visual-only migrations, preserve all functional IDs/data attributes/controls/event targets and executable JavaScript. Prefer shared CSS plus opt-in layout hooks. The Liquidity Pool redesign kept all 14 executable script blocks byte-identical.

Design language: dense neutral exchange/workbench surfaces, blue normal actions, semantic green/red only, amber security/attention, compact segmented controls/cards/tables, progressive disclosure, functional motion only, and responsive navigation/action rails.

Do not one-shot restyle every page. Browser-review the Liquidity Pool desktop/mobile deployment first, then migrate the next page deliberately.


## September 21 Liquidity Market Chart repair

Implemented:
- page `public/xrbc-liquidity-pool.html` release `0.2.1`
- frontend commit `e893d3cf86780de2cb8dbe2b948a0bea80b5ec91`
- pipeline `2868432524` success
- checkpoint `LIQUIDITY-MARKET-HISTORY-2026-09-21.md`

The prior Sologenic history source had documented issuer-coverage limitations that did not include the exact XRBC issuer. Historical OHLC now uses exact-pair OnTheDEX XRPL trade data with backward pagination. The default `1D · MAX` view is the broadest daily-history view, and returned date coverage is surfaced explicitly.

Preserve the evidence boundary: historical candles are chart context only. Current live book/AMM remains the separately validated XRPL snapshot, and no transaction construction/signing/finality logic depends on the history provider.

Manual follow-up: browser-verify direct provider access/CORS and the earliest returned XRBC/XRP trade date. If direct browser access fails, route the same exact-pair request through a reviewed read-only backend endpoint; do not substitute another token or fabricate candles.


## September 21 backend-routed Liquidity Market History

Current architecture:
`browser -> XRBC read-only backend -> fixed OnTheDEX XRPL history upstream`

Frontend:
- `264f5be880ed4fc8e47448a6a300c6b688a55ff7` routes history through the backend
- `7fd39d9ce2641f6b28318ba44e718a034f8d7116` gives same-backend history the 45-second backend allowance
- pipeline `2868480096` success
- Liquidity Pool release `0.2.3`

Backend:
- route `/api/v1/market/xrbc/history`
- implementation `8018486c7fcc0da7e867398702df2ab58e385d28`
- tests `ebf918c2e3010f33ab5a2bdd4f9f1cfd6ed48c3b`
- OpenAPI `f6658b41f508585a41bb9813b4e3fbc5b545147e`
- permanent API test workflow `b9ef92baadb03c6a32159c2ba71473feefdc718e`
- route inventory fix `131e204ebe131c5ae2f886d75506b230af91db21`
- GitHub Actions API test run `35626734128` success

Security boundary: the browser may specify only supported interval/page count. Upstream URL, host, XRBC/XRP identity and pagination markers are server-controlled. Historical candles remain chart context and never participate in transaction construction/signing/finality.

Next action: after Render has deployed backend main, hard-refresh the Liquidity Pool and verify `1D · MAX` plus the earliest returned direct-trade date. If still unavailable, inspect the backend endpoint response before changing chart logic.


## September 21 compact analytics + receipt empty states

Implemented on Liquidity Pool release `0.2.4`:
- frontend commit `350a5f343136195e7a05c674c5941e1a48e5d00c`
- pipeline `2868575025` success
- local checkpoint `ba24ffde455979ec62ecbc74791425ea246a23ae`
- local checkpoint pipeline `2868579101` success

The Advanced Market Chart is collapsed by default and no longer creates an outer nested-scroll window. Receipt cards hide unavailable amount rows and instead show subtle XRBC/XRP motion, explicit empty-state copy and a dominant `Connect / inspect wallet ↑` action to `#walletHeading`.

Reusable UI rule: secondary/uncertain analytics should use progressive disclosure. Account-dependent empty cards should present an intentional state and clear next action rather than dashes, fake values or zeros. Motion must never imply ledger execution.


## September 21 local XRP token asset

Implemented:
- local asset `public/assets/tokens/xrp.svg`
- provenance `public/assets/tokens/README.md`
- CC0-1.0 upstream source: `spothq/cryptocurrency-icons`
- frontend commit `2a37dc754853ff0cd045b2a5ddcf476b8045769d`
- pipeline `2868676134` success
- Liquidity Pool release `0.2.5`

The XRP quote unit and XRBC/XRP pair picker now use the local XRP asset. Reuse local reviewed token images and record their source/license; do not use token imagery as ledger identity evidence.

## Remaining implementation order

1. Runtime CI: parse critical inline JavaScript, verify standalone document structure, verify direct DOM binding targets, and guard primary transaction buttons.
2. Shared scaffold modules: transaction state machine, error taxonomy, retry/readiness policy, gate registry.
3. Unit tests for transition safety, retry safety, and gate-registry consistency.
4. Backend access-policy registry and tests.
5. Two-tab/mobile/cold-backend/rejection/expiry/ambiguous-create/finality test planning and implementation.
6. Only then expand individual higher-gate tool metrics.

## Critical regression fixtures

- `2b53901c0b418a121a34f4cc4f78536479e83cb5`: do not let security hardening globally block page interaction.
- `0ef0bacc91d4079fc530582fb64d97d0a9dcbcce`: readiness wait belongs to the clicked action.
- `4d7343c8c624e805298a4cd30c0a8f609f35b548`: duplicate `sleep` declaration prevented Liquidity Pool application parsing and made all buttons inert. CI must catch this class of failure.

## Non-goals

- no fiat/subscription bypass
- no automatic USD-pegged gate changes
- no attempt to block public XRPL arbitrage through the website
- no seed/private-key handling
- no one-shot rewrite of all pages
- no claim that XRBC can globally prevent unrelated Xaman prompts from another application
