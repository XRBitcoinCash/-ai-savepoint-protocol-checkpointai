# XRBitcoinCash — next-run checkpoint

Updated: 2026-09-20.

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
