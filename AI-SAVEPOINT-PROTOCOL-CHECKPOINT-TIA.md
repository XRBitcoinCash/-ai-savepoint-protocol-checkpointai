# XRBitcoinCash AI Memory & On-Task Operating Contract

**Document ID:** `xrbc/ai-memory/2.0.0`  
**Status:** Active  
**Updated:** 2026-09-21  
**Machine-readable twin:** [`ai-memory.json`](https://raw.githubusercontent.com/XRBitcoinCash/-ai-savepoint-protocol-checkpointai/main/ai-memory.json)  
**Web entrypoint:** [`xrbitcoincash.github.io/.well-known/ai.js`](https://raw.githubusercontent.com/XRBitcoinCash/xrbitcoincash.github.io/main/.well-known/ai.js)

This is a compact, repo-native continuity layer for AI agents working on XRBitcoinCash and its explicitly requested XRPL applications. It preserves decisions and constraints; it is not a hidden model memory, a transcript dump, a credential store, or a permission to act.

## Current source and deployment map — checked 2026-09-16

Read this map before using older repository descriptions or downloaded filenames. The active website frontend is in GitLab; the similarly named GitHub repositories have different roles. Repository content and the GitLab pipeline were checked; final public HTTP delivery remains a separate verification step.

| Role | Repository and exact file | Website path / state |
| --- | --- | --- |
| XRBitcoinCash main trading homepage | GitLab `xrbitcoincash-group/xrbitcoincash-project`, `public/index.html`, branch `master` | `https://xrbitcoincash.com/` — preserve the corrected homepage |
| Active XRBitcoin trading/liquidity workspace | Same GitLab project, `public/xrbitcoin-links.html` | `https://xrbitcoincash.com/xrbitcoin-links.html` — preserve; title is `XRBitcoin | Unified Trading & Liquidity Workspace` |
| XRBitcoin security reference | Same GitLab project, `public/xrbitcoin-security.html` | `https://xrbitcoincash.com/xrbitcoin-security.html` — created directly in public/; GitLab pipeline passed |
| Legacy route compatibility | Same GitLab project, `public/_redirects` | Exact `/XRBitcoin`, `/XRBitcoin/` and `/XRBitcoin/index.html` routes redirect with HTTP 302 to `/xrbitcoin-security.html` once served by Pages |
| Retired standalone XRBitcoin frontend | GitHub `XRBitcoinCash/XRBitcoin`, `index.html`, branch `main` | Fixed meta-refresh redirect and manual fallback to the flat security URL; NOT the active GitLab trading page |
| Shared backend | GitHub `XRBitcoinCash/xrbitcoincash.github.io`, `xrpl-proxy/`, documented Render origin `https://xrbitcoincash-github-io.onrender.com` | Separate from the legacy HTML page; preserve backend files and service settings |

**User preference:** Give each public page a distinct filename directly in GitLab `public/` where practical. The user rejected the proposed `public/XRBitcoin/index.html` subfolder solution. That nested file was not created; use `public/xrbitcoin-security.html`. Give the exact filename and direct public URL without unnecessary folder alternatives. The user treats other material as reference or old work, but this does not authorize deleting a live backend or unverified dependency.

A filename is identified by its repository, branch, and complete folder path. Never tell the user to replace an existing `index.html` without naming its exact repository and path. Downloaded TXT code is a delivery copy, not a new deployment filename. Do not restore the superseded nested-folder proposal merely because it appears in the historical savepoint below.

The user observed a GitLab 404 at `/XRBitcoin/` after following the GitHub Pages link. The main GitHub site previously had `CNAME` set to `xrbitcoincash.com`; project-site domain inheritance was identified in the prior review as the routing explanation. The exact-path GitLab redirects address that legacy destination without a new subfolder. A successful GitHub or GitLab build does not establish that the final custom-domain URL serves its content. Recheck actual redirects and target hosting before claiming public delivery.

The secondary GitHub `.well-known/ai.js` index still listed XRBitcoin's old `/XRBitcoin/` home when inspected. This newer map supersedes that stale home entry: trading uses `/xrbitcoin-links.html`, security reference uses `/xrbitcoin-security.html`. Updating this canonical memory does not itself update that secondary file, DNS or Pages settings.

## Agent entrypoint

Before planning or editing code, an agent should:

1. Read this contract and `ai-memory.json`.
2. Read the target repository's `README`, `AGENTS.md`, security policy, and relevant page documentation.
3. Check the latest savepoint or release note for the target feature.
4. Inspect the exact target file and its current branch/commit.
5. State the target, non-goals, acceptance checks, and rollback point before changing anything.

If a referenced file, branch, endpoint, or requirement cannot be verified, stop and report the missing evidence. Do not fill gaps with invented values.

## Precedence and scope

When instructions conflict, use this order:

1. The user's current, explicit request.
2. Repository-local instructions and security policy.
3. This contract and its machine-readable twin.
4. Archived conversation notes and older savepoints.

Conversation history is context, not authority. Preserve a prior decision only when it is recorded here or in a current repository document. Do not widen a one-page request into a repository-wide rewrite.

Supported project scope:

- GitLab `xrbitcoincash-group/xrbitcoincash-project` — active website frontend, including XRBC and XRBitcoin pages.
- `XRBitcoinCash/xrbitcoincash.github.io` — shared backend source, AI discovery, and legacy GitHub Pages configuration; not the source of the current GitLab frontend.
- `XRBitcoinCash/xrbitcoincash-core` — internal/core documentation and scripts.
- `XRBitcoinCash/XRBitcoin` — legacy XRBitcoin repository; its root page is now a non-trading redirect to the flat security reference.
- `XRBitcoinCash/JCS-token-on-the-XRPL` — JCS application when explicitly named.
- `XRBitcoinCash/-ai-savepoint-protocol-checkpointai` — this memory and savepoint archive.

No other repository, account, wallet, backend, or deployment is in scope unless the user names it.

## Stable project facts

- Primary site: `https://xrbitcoincash.com/`
- Network: XRP Ledger Mainnet.
- XRBC issuer: `rEjwniYhYR5QDZzK1a1x2359j8j8N43Ypw`.
- XRBC currency hex: `5852626974636F696E6361736800000000000000`.
- XRBitcoin issuer: `rGQaHbQHCsTLQtboQPwUBasXjLvk8uDbpT`.
- XRBitcoin currency hex: `5852626974636F696E0000000000000000000000`.
- Wallet-side authorization is independently reviewed in Xaman; the site is non-custodial.
- Public ledger facts must be kept separate from interpretation, market claims, and external-provider data.

Verify identity, network, destination, amount, flags, and memo in the wallet or validated ledger before treating a value as authoritative. Never use a ticker, logo, search result, or AI statement as proof of asset identity.

## Cost-aware work loop

Use one bounded pass at a time:

1. **Classify:** documentation/UI polish, contained bug, multi-file feature, or architecture/security decision.
2. **Plan:** write the smallest file list and explicit non-goals.
3. **Inspect:** search before editing; preserve working code and exact casing.
4. **Implement:** make the smallest additive or surgical change that satisfies the request.
5. **Verify:** run syntax, unit, integration, and security checks appropriate to the change.
6. **Review:** escalate only the failed assertion or uncertain section, not the entire project.
7. **Record:** add a short savepoint with facts, impact, checks, and remaining risks.

Suggested model routing (when these models are available):

- **GPT-5.6 Luna:** wording, CSS, documentation, mechanical edits, and routine parsing.
- **GPT-5.6 Terra:** contained implementation, tests, and ordinary debugging.
- **GPT-5.6 Sol:** multi-file XRPL/Xaman/Render integration, security review, and difficult failures.
- **GPT-6 Astra:** architecture, ambiguous threat models, deep research, and final high-risk audit.

Do not send the same full task to every model. Escalate with a compact failure log and the relevant code only.

## Sandbox protocol

The sandbox is for local, synthetic, reversible work only. Use an untracked worktree or the repository's `ai/sandbox/` directory. The sandbox must:

- use fake accounts, fake hashes, fixture ledger responses, and test endpoints;
- never contain seeds, private keys, API secrets, personal data, or real signing payloads;
- never be loaded by production pages or deployment jobs;
- never submit a transaction, connect to a user's wallet, move funds, or alter a live backend;
- include a short hypothesis, fixture, expected result, observed result, and cleanup note;
- be deleted or promoted only after a human-reviewed patch passes the real test suite.

Sandbox success is not proof of a live-wallet result. Report simulated and real-device checks separately.

See [`ai/sandbox/README.md`](https://raw.githubusercontent.com/XRBitcoinCash/-ai-savepoint-protocol-checkpointai/main/ai/sandbox/README.md) for the experiment template.

## Security and safety invariants

- Never commit wallet seeds, private keys, passcodes, recovery phrases, credentials, or environment values.
- Keep public read-only ledger access separate from transaction preparation and signing.
- Do not change a proxy, Render service, network allowlist, CSP, wallet flow, or API contract without an explicit request and a regression check.
- Desktop signing remains QR-only; mobile signing remains an explicit Xaman handoff where the target project supports it.
- Validate addresses, amounts, balances, reserve buffers, currencies, issuers, NFT IDs, and ledger validation state.
- Disable duplicate async submissions; handle cancellation, timeout, rejection, stale responses, and missing data visibly.
- Prefer `textContent`; escape every dynamic value before `innerHTML`.
- External links are independent services, not endorsements or guarantees.
- A ledger record proves only what the validated record establishes; it does not automatically prove ownership, authenticity, legal title, intent, fraud, or safety.
- Preserve the user's XRBC holding-based access gates. Do not substitute fiat passes, subscriptions, or alternative credentials that bypass required holdings.
- A static security notice is not a firewall for another page and does not eliminate public AMM arbitrage. Do not revive removed unsafe quick-buy code or describe removal as a guarantee against all arbitrage.

## Definition of done

A change is complete only when:

- the exact requested behavior works;
- non-goals and existing working features remain unchanged;
- relevant syntax, unit, integration, accessibility, and security checks pass;
- live calls are labeled as live and simulations as simulations;
- no secret or unrequested network behavior was added;
- the full commit SHA, changed files, checks, and remaining manual checks are recorded;
- deployment is not claimed until the target deployment is verified.

## Savepoint format

Append concise entries; do not paste full conversations:

```text
### [SAVEPOINT-YYYY-MM-DD] title
Context: one or two evidence-based lines.
Changes:
- exact files, constants, behavior, or decision
Impact:
- what future agents must preserve
Checks:
- commands/results and any manual check still required
TODO:
- only concrete remaining work
```

Older entries remain historical. A newer verified savepoint supersedes an older one; it does not erase the audit trail.

### [SAVEPOINT-2026-09-16-xrb-routing] Separate trading pages, security notice, and memory

Context: The user committed the corrected XRBC homepage and replaced the legacy GitHub XRBitcoin root page with a non-trading security notice. A GitHub verification link led to a GitLab 404 at `/XRBitcoin/`. The next request explicitly authorized reading/updating the GitHub memory and asked whether another `index.html` would conflict.

Changes:
- Added the current deployment map and corrected repository roles in this contract; the machine-readable twin is updated with the same distinctions.
- No GitLab file, trading page, backend, domain, wallet setting, or secondary web index is changed by this memory-only update.

Impact:
- Keep GitLab `public/index.html` (XRBC) and `public/xrbitcoin-links.html` (active XRB) separate and intact.
- Proposed GitLab `public/XRBitcoin/index.html` would be a non-trading notice in a new subfolder, not a second exchange and not an overwrite. Its creation remains pending a separate website action.
- Never identify a deployment destination by the basename `index.html` alone. Explain the exact repository and full path first.
- Treat attached older `XRBitcoin — Trading & Liquidity Sentinel` code as an older source, not proof of what the active Unified Workspace currently runs.
- Preserve shared Render services and the XRBC token-gating model. The old HTML page is not the backend.

Checks:
- Read the canonical contract, `ai-memory.json`, and the secondary `.well-known/ai.js` entrypoint.
- GitLab `master` and recursive `public/` tree inspected at `3feca39da72a7043a3c2cddd86557480a061425a`: main homepage blob `67f4173c84e248e105be09631967c761d2b4cf31`; active XRB blob `b23c9538d588952b02a6fc5b0799acfbe7a0f2f2`; proposed `public/XRBitcoin/index.html` absent.
- GitLab active XRB title/canonical verified through repository blame; the public `/xrbitcoin-links.html` retrieval also identifies the Unified Trading & Liquidity Workspace.
- GitHub `XRBitcoin/index.html` inspected: security-notice blob `b18f5bfe4a8c9ba968a3c57a61ca150bbca09594`.
- Rollback point for this memory update: memory repository commit `9cbe5564f3ebb158cbeb255ac24e32efd86fb64a`.
- No live signing, transaction, or wallet test performed. Private Render and Xaman settings were not inspected in this pass.

TODO:
- Resolve the legacy `/XRBitcoin/` hosting route only through a separately authorized, exact-path website change; do not overwrite either active trading page.
- Recheck the final public URL after any routing deployment. Do not substitute a successful pipeline for a live-content check.
- Refresh the secondary `.well-known/ai.js` stale XRBitcoin home in a separate bounded metadata change; this contract and its twin are the current routing authority.

### [SAVEPOINT-2026-09-16-flat-xrb-security] One flat public filename and corrected legacy links

Context: The user explicitly requested a slightly different filename directly in GitLab public/, without another folder, plus GitHub links to the exact same page. This supersedes the nested-folder proposal in the earlier savepoint.

Changes:
- Created `public/xrbitcoin-security.html` and `public/_redirects` in GitLab commit `4e02faf4f28d6b7932f3deafbf98a3027c7ea68f`.
- The security reference is a standalone no-script page. Its canonical URL is `https://xrbitcoincash.com/xrbitcoin-security.html`; workspace links still point to `/xrbitcoin-links.html`.
- `_redirects` contains only three exact legacy paths, each using HTTP 302 to `/xrbitcoin-security.html`: `/XRBitcoin`, `/XRBitcoin/`, `/XRBitcoin/index.html`.
- Updated GitHub `XRBitcoinCash/XRBitcoin/index.html` in commit `81001b3a382d92a28434d10bbc73f21530c80dc9` to a fixed no-JavaScript meta-refresh redirect with a manual fallback link to the same security URL.
- Updated this contract and ai-memory.json to record the flat filename, source roles and user preference.

Impact:
- No new public subfolder and no replacement of either active trading page. Do not ask the user to upload the same file again; it was already committed.
- No changes to backend, Render, CNAME, DNS, wallet settings, holding gates or liquidity.
- A GitHub HTML redirect cannot execute while hosting redirects away before serving it; the exact GitLab redirects handle the inherited custom-domain path instead.
- Reference material may be old, but do not assume non-public backend files are unused.

Checks:
- GitLab pipeline `2853982624` for `4e02faf4f28d6b7932f3deafbf98a3027c7ea68f` passed.
- GitLab security-page blob `472fe44669e333c1653b92e4415383631b0b5bf2`, SHA-256 `5635d9369ac72777e94a3a1f395f835cad049c9e6b913c09167565219dd02dd3`, 12691 bytes, read back and matched the generated HTML/TXT.
- Static checks confirmed CSS hash matches the strict CSP, fixed canonical/workspace links, no scripts, forms, frames or inline event handlers.
- In-memory Chromium checks at desktop/mobile sizes passed during preparation; these do not establish live website or wallet behavior.
- GitHub redirect blob after update: `6e16d118ef2f8bfc7cf556b7377d95476a686a08`.
- Rollback baselines: GitLab `3feca39da72a7043a3c2cddd86557480a061425a`; GitHub XRB `e0f124e049f048b65a3aada9198d8140a8433252`; memory `8a6b00e24704b44f28f8e2fe602957f810c409c3`.
- Public web retrieval was blocked by the tooling and container DNS resolution failed. These environment errors do not establish a website outage. Live delivery and redirect behavior are not claimed as verified.

TODO:
- Open the direct `/xrbitcoin-security.html` URL and the old `/XRBitcoin/` route after publishing to confirm rendered content and routing.
- Refresh the stale secondary AI index only in a separately bounded metadata update; the current map above is authoritative for source locations.


### [SAVEPOINT-2026-09-18-xrpl-media-freshness] XRPL Media Desk and deterministic freshness

Context: The user authorized redesigning the homepage media area into an XRPL-first information desk and then explicitly requested implementation of the available stale-copy/cache corrections. Review found fixed dated asset versions, an unscheduled GitHub mirror, per-path Pages cache drift, stale discovery metadata, and malformed wrapper fragments around the current universal AI manifest.

Changes:
- GitLab `public/index.html` now contains the XRPL Media Desk: labeled source shelf, XRPL-first/default ordering, All Crypto / Markets / Security / Policy filters, current-headline search, trending rail, lead story, secondary story stack, responsive layouts, and an Independent/Community row retaining the existing CryptoWendyO player.
- GitLab deployment now injects the exact commit SHA into compact-home asset URLs and the homepage `xrbc-build-id`, and publishes `/build-info.json` with the deployed commit/pipeline/ref.
- Repaired the valid current v3 `public/universal-ai.json`; refreshed `public/.well-known/ai.json`, `public/xrbc-metadata.json`, and the homepage sitemap modification date.
- GitHub homepage mirror now runs every 30 minutes plus manual/workflow triggers, retries through short Pages propagation, requires `build-info.json` and the built homepage to agree, and fetches source-owned companion/discovery files from the exact immutable GitLab commit instead of mutable Pages-CDN copies.
- GitHub-only `.well-known/ai.js` now identifies the GitLab frontend source and the current XRBitcoin routes `/xrbitcoin-links.html` and `/xrbitcoin-security.html`.

Impact:
- GitLab `xrbitcoincash-group/xrbitcoincash-project` remains the active frontend source of record.
- Do not reintroduce fixed dated query strings such as `?v=20260917` for compact-home assets; deployment commit SHA is the cache-busting identity.
- Do not mirror source-owned companion files from arbitrary current Pages-CDN paths after learning the build; use the exact immutable GitLab commit.
- Media publisher labels describe source type only; inclusion is not an endorsement, truth rating, safety rating, or authority ranking.
- Preserve the read-only media boundary: no wallet/signing/trading/XRPL-RPC/gate/backend/liquidity-math coupling.

Checks:
- Final GitLab production build `d0cafa50d71bb737b37b2664d6211003d9737905`; pipeline `2862679871` passed repository validation, secret detection, Semgrep SAST, and Pages deployment.
- GitHub `build-info.json` matches that exact GitLab build.
- Final verified GitHub mirror sync commit: `ad24d237d140dc3d366904fdefaa30850a6382de`.
- GitHub mirrored sitemap reports `Updated: 2026-09-18` and homepage `lastmod 2026-09-18`.
- Detailed record: `XRPL-MEDIA-FRESHNESS-CHECKPOINT-2026-09-18.md`.

TODO:
- Visually inspect the Media Desk at desktop, tablet, and phone widths after browser/CDN propagation.
- Add more independent/community publishers only after confirming exact canonical URLs and retaining explicit source-type labels.


### [SAVEPOINT-2026-09-18-xrpl-media-connection-fix] Media Desk live-data repair

Context: The deployed Media Desk layout rendered but showed no matching headlines. XRPL-first mode did not exclude generic stories, so the empty state established that the browser had zero usable articles; the failure was transport/data-path related.

Changes:
- Added a first-party read-only backend endpoint at `/api/v1/media/news` with fixed cryptocurrency.cv XRPL/XRP/Ripple/RLUSD/Xaman/latest searches, sanitation, deduplication, short shared cache and bounded last-known-good fallback.
- The homepage now tries the XRBC media proxy first, fixed direct provider requests second, then clearly labeled direct publisher/source access.
- Direct source cards render immediately while live feeds connect, so cold starts or transport failures do not recreate the blank media wall.
- Bumped browser media cache to `xrbc.media.news.v3`; upstream redirects fail closed.

Impact:
- Do not treat a normal media transport outage as grounds to blank the Media Desk.
- Do not fabricate fallback headlines. Direct-source fallback items must remain labeled Direct source / Market reference.
- Keep media read-only and separate from wallet, Xaman signing, token gates, transaction submission and liquidity math.

Checks:
- Final frontend commit `61278c5b5c9a9bda08a467da84069b39c45a6eaa`, GitLab pipeline `2862729733`: validation, secret detection, Semgrep SAST and Pages deploy all passed.
- Browser-facing GitHub mirror commit `5c6004cdbbf94c6cb1427f00e0426654f1fb765c` identifies the same build.
- Exact mirrored media script parsed successfully and contains proxy, direct-provider, static-source and immediate-fallback paths; prior empty-feed copy is absent.
- Backend commits: `d22d98590bb4cafce5ef679d4a08d1fcb9f0b78f`, `15767e51e9fe4826990ef34ceadb7777de909908`, `801824d83457544df859be56e583823f4e98671f`.
- Current tool environment cannot directly open the Render hostname, so the exact live backend deployment timestamp is not independently asserted.

TODO:
- Reload the public homepage and observe the status line: proxy, direct provider, or direct-source fallback.
- If the proxy path does not become active after Render redeploys, inspect Render deployment logs/configuration separately; the page must still remain useful through the other two paths.

## Current operating rule

**Evidence before action. Preserve working paths. Change one bounded thing. Test it. Record what changed.**

This contract improves continuity and reduces repeated reasoning; it does not override model safeguards, repository permissions, user approval requirements, or independent wallet review.


### [SAVEPOINT-2026-09-18-footer-compaction] Compact homepage footer and conversation bootstrap

Context: The user requested that the oversized XRBitcoinCash homepage footer be reduced to compact fine print, retain only the core disclosure links, remove the empty/disordered layout, and use a subtle technical/XRPL background. The same request formalized the GitHub memory repository as a secondary continuity step at the beginning of new project conversations.

Changes:
- GitLab `public/index.html` footer is represented by commit `3110da635cc487f9111d59f30233724e2d343928` (rollback parent `b3c01cb9df17ca95a2536e45ec956f90a64bf536`).
- Footer now uses a compact terminal-style panel, tight XRBC identity grid, four fine-print disclosures, and only Support / Policy & security / Terms / White paper / Project provenance links.
- Removed redundant related-project navigation and repeated long-form footer copy.
- Added the required new-conversation bootstrap to the machine-readable memory and human workflow: read canonical memory + latest savepoint, verify current source/commit/pipeline, detect already-applied work, reuse established facts, then make a bounded change.
- Detailed record: `FOOTER-COMPACTION-CHECKPOINT-2026-09-18.md`.

Impact:
- GitLab remains the active frontend source of record.
- Do not widen footer/presentation work into wallet, Xaman, AMM, order, holding-gate, proxy, or transaction logic.
- Future conversations should regain project continuity from repository evidence before asking the user to restate known project state.
- Repository memory can record collaboration heuristics that reduce errors, but it does not alter model weights or system safeguards.

Checks:
- Commit diff reviewed: only `public/index.html` changed in the footer compaction commit.
- GitLab pipeline `2863060698` completed successfully.
- No live-wallet or signing action was performed.

TODO:
- Visually inspect the deployed footer at desktop and mobile widths after propagation.


### [SAVEPOINT-2026-09-18-header-xaman-nav] Homepage navigation and Xaman Swap CTA

Context: The user approved the XRPL terminal-style header mockup and requested it on the actual homepage, explicitly retaining Tools and light/dark mode.

Changes:
- GitLab `public/index.html` commit `b0f97dbd274986be8b379850964ed65cc4933764` adds the CSS-only XRPL grid/orb navigation treatment, preserves the original XRBC emblem, groups Trade / XRPL Token Liquidity / Liquidity / Research / Tools / Developers, retains `themeToggle`, and adds the prominent Get XRBC in Xaman CTA.
- The CTA uses Xaman's documented first-party Swap xApp URL. No undocumented XRBC-prefill query is used.
- Detailed record: `HEADER-XAMAN-NAV-CHECKPOINT-2026-09-18.md`.

Checks:
- GitLab pipeline `2863126314` succeeded, including repository validation, secret detection, Semgrep SAST and Pages deployment.
- Rollback parent: `3110da635cc487f9111d59f30233724e2d343928`.
- No trading, signing, AMM, order-book, wallet-gate or backend behavior was intentionally changed.

TODO:
- User visual review after public propagation; keep any follow-up adjustment presentation-only unless explicitly requested otherwise.


### [SAVEPOINT-2026-09-18-header-acquisition-steps] Two-step XRP → XRBC acquisition path

Context: The prior single Xaman CTA was observed by the user as an XRP-purchase flow rather than an exact XRBC trade route. No documented first-party Xaman token-prefill parameter was verified.

Changes:
- GitLab `public/index.html` commit `1b06e6152b2471749a585690920477fe20b46e3f` replaces the single CTA with two numbered actions.
- Step 1 opens Xaman's documented Buy/Sell XRP xApp.
- Step 2 opens the existing exact `/#trade` XRBC/XRP panel; review/signing remains in Xaman.
- No new DEX provider or purchase engine was introduced.
- Detailed record: `HEADER-ACQUISITION-STEPS-CHECKPOINT-2026-09-18.md`.

Checks:
- GitLab pipeline `2863135579` succeeded.
- Rollback parent: `b0f97dbd274986be8b379850964ed65cc4933764`.
- Tools, theme toggle, original emblem and trading runtime were preserved.

TODO:
- User visual/interaction review after propagation.


### [SAVEPOINT-2026-09-18-xaman-token-specific-xrbc-swap] Exact XRBC target in Xaman Swap

Context: The user supplied a phone screenshot showing the desired native Xaman Swap state: XRP as the selling asset and XRBitcoinCash as the receiving asset. The previous Step 2 local target was incorrect.

Changes:
- GitLab `public/index.html` commit `77d07adc69e7a6ddd99a846793bb41404a8a8402` changes Step 2 to Xaman's token-specific Swap launch form using the exact XRBC issuer, exact XRBC currency code and `action=SWAP`.
- The old local `/#trade` target is removed from Step 2.
- Detailed record: `XAMAN-TOKEN-SPECIFIC-SWAP-CHECKPOINT-2026-09-18.md`.

Checks:
- GitLab pipeline `2863140420` succeeded.
- Validation, secret detection, Semgrep SAST and Pages deploy all passed.
- Final native-app behavior still requires real-device verification.

TODO:
- User retests Step 2 after propagation and confirms Xaman opens with XRBC selected as the token-specific swap asset.


### [SAVEPOINT-2026-09-18-xaman-single-cta-homepage-top] One Xaman CTA and homepage starts at header

Context: Real-device testing showed the two-button acquisition header was not producing the intended experience and the homepage could reopen mid-page. Xaman's current public app config was checked and the previous xApp identifier was found to be wrong.

Changes:
- GitLab `public/index.html` commit `4ff0aa9431bca84ac84a13eac8b11ba81933349b` removes Buy XRP and the two-step acquisition UI.
- One `Get XRBC in Xaman` CTA now uses Xaman's current `xaman.swap` identifier plus exact XRBC issuer/currency and `action=SWAP`.
- Trade navigation now targets root `/`, not `/#trade`.
- Root/legacy `#trade` loads reset to the header using manual scroll-restoration handling; deliberate other fragment links remain supported.
- Detailed record: `XAMAN-SINGLE-CTA-AND-HOMEPAGE-TOP-CHECKPOINT-2026-09-18.md`.

Checks:
- GitLab pipeline `2863147964` succeeded: validation, secret detection, Semgrep SAST and Pages deployment all passed.
- Rollback parent: `77d07adc69e7a6ddd99a846793bb41404a8a8402`.
- Existing trading/signing runtime was not intentionally changed.

TODO:
- Confirm the deployed button opens the desired token-specific Xaman Swap state on the user's phone.
- Confirm a normal homepage visit opens at the header after propagation.


### [SAVEPOINT-2026-09-19-developer-api-workbench] Live developer API workbench

Context: The developer page exposed the right API surface but prioritized route documentation/code over useful live output. The user requested a homepage-style header without the Xaman acquisition CTA, clearer purpose, and understandable output.

Changes:
- GitLab commit `1b119d28a19aeda94288602c5cd26171135fe39a` updates `public/developers.html` and `public/xrbc-developer-api.js`.
- Header now uses Trade / XRBC Liquidity Pool / Research / Tools / Developers plus theme control.
- Public API workbench defaults to `/market/xrbc`; successful responses render endpoint-specific human-readable metrics before raw JSON or copyable request code.
- Full route reference remains available but collapsed behind a secondary disclosure.
- One `/status` request on page load can wake/check the backend; no continuous polling was added.
- Wallet authentication is explained as advanced gated-report access only. Public market/liquidity/ledger/supply/project reads require no wallet.
- Authentication UI now treats `walletAuthenticationVerified === true` as verified readiness; configured credentials alone are not presented as verified.

Checks:
- V8 syntax check for `xrbc-developer-api.js` passed.
- Required script DOM IDs are unique.
- GitLab pipeline `2863474475` succeeded: repository validation, secret detection, Semgrep SAST and Pages deployment.
- Direct Render endpoint verification was blocked by this environment’s DNS/network limitations.

TODO:
- User reviews the deployed desktop/mobile page and runs the default live market request after propagation.


### [SAVEPOINT-2026-09-19-liquidity-metrics-exact-trade-consistency] Liquidity metrics, warnings, images and exact XRBC trades

Context: The observed-liquidity table lacked resolved token images, the standalone optional XRBC transaction path used a circular/pathfinding Payment, and liquidity score direction differed from other XRBC risk tools.

Changes:
- GitLab final tree at `a6ada1150b1dac04676d55fc3f131a49948948f8` (main implementation `4b5d38b62c291e00ccc7497f4a7d73f93ed67e64`; rollback `878a8d23db5ebc304a995a02bf28cd8b1d54e87f`).
- `public/liquidity-sentinel.html` now resolves token art using exact issuer/currency via local exact images then Bithomp, with initials fallback.
- Standalone Sentinel exact XRBC/XRP transaction control now uses direct `OfferCreate`: buy exact XRBC uses `TakerPays=XRBC`, max-XRP `TakerGets`, `tfFillOrKill`; sell exact XRBC uses `TakerGets=XRBC`, min-XRP `TakerPays`, `tfFillOrKill|tfSell`.
- The exact-trade control uses a fresh ledger-pinned direct AMM quote, no Payment Paths, a 2% boundary, a +20-ledger LastLedgerSequence window, Xaman review, and validated field comparison.
- Liquidity frontends now display normalized 0–100 risk where higher = more observed risk. Raw 0–7 health remains the reproducible model/API compatibility value.
- `No XRP AMM found` and `Data unavailable` are unscored; missing evidence is not converted into a numeric verdict.
- Homepage Sentinel, Ecosystem scanner and Developer API workbench display direction were aligned.

Impact:
- Preserve the exact score normalization `round((7-healthPoints)/7*100)` for liquidity-risk display unless a separately reviewed methodology version intentionally replaces it.
- Preserve raw health evidence in exports/contracts where compatibility matters.
- Never return to ticker-only image identity. Token art lookup keys are exact issuer + currency.
- Do not replace the Sentinel exact trade with a circular Payment/pathfinding flow without an explicit, reviewed reason.
- “No path routing in this control” is not a claim that public XRPL markets cannot be arbitraged.

Checks:
- Pipeline `2863531864` passed validation, secret detection, Semgrep SAST and Pages deployment.
- Changed JavaScript parsed successfully in V8 for standalone Sentinel, homepage Sentinel, Ecosystem scanner and Developer workbench.
- Exact-trade protected fields include TakerGets/TakerPays; Fill-or-Kill/Sell constants and shortened ledger window verified in source.
- Detailed record: `LIQUIDITY-METRICS-EXACT-TRADE-CONSISTENCY-2026-09-19.md`.

TODO:
- User visually checks resolved token art and mobile exact-trade layout.
- Real-device Xaman test: small exact buy and sell; verify fields before signing.
- Test deliberately unfillable Fill-or-Kill behavior and confirm no resting Offer remains.


### [SAVEPOINT-2026-09-19-sentinel-readonly-pilot-removal] Standalone Sentinel returns to read-only scope

Context: The standalone Liquidity Sentinel Quick Buy / exact-buy / exact-sell area was a pilot and was judged redundant with the project's dedicated trading interfaces. The user explicitly requested complete removal from this page without breaking the scanner.

Changes:
- Final GitLab commit `da9cfbf98feaa82690a5fead35be1354a7f4503d` removes the visible transaction section from `public/liquidity-sentinel.html`.
- Removed the standalone Sentinel trust-line transaction button, exact buy/sell controls, Xaman signing panel, persistent transaction controller, transaction-field reconciliation, exact-trade implementation and background trade-estimate refresh.
- Xaman remains only for selecting the public account used by the wallet liquidity scan.
- Page copy, metadata, methodology and footer now describe the standalone Sentinel as read-only.
- Detailed record: `SENTINEL-READONLY-PILOT-REMOVAL-2026-09-19.md`.

Preserved:
- Wallet liquidity scan, direct XRP AMM checks, watchlist, deltas, JSON evidence and scanner controls.
- Exact-identity token art: local exact asset first, Bithomp issued-token endpoint keyed by exact issuer + currency, ticker initials fallback.
- Published liquidity risk remains 0–100 with higher = more observed risk; raw 0–7 health remains the reproducible compatibility/evidence layer where needed.
- `No XRP AMM found` and `Data unavailable` remain unscored.
- Homepage trading, XRBC liquidity pool interface and other dedicated transaction workspaces were not removed by this change.

Checks:
- All executable inline Sentinel scripts compiled successfully after cleanup.
- JSON / JSON-LD blocks parsed successfully.
- Pipeline `2863543612` passed repository validation, secret detection, Semgrep SAST and Pages deployment.
- Rollback point before removal: `a6ada1150b1dac04676d55fc3f131a49948948f8`.

Supersession:
- The exact-trade portion of `SAVEPOINT-2026-09-19-liquidity-metrics-exact-trade-consistency` is historical for the standalone Sentinel and must not be restored by default.
- The image-resolution, scoring-direction, warning-state and downstream consistency portions of that earlier savepoint remain current.

Operating rule:
- Standalone Liquidity Sentinel = observation, scoring, warnings and evidence export. No transaction preparation unless explicitly requested again.


### [SAVEPOINT-2026-09-19-order-manager-cleanup-restore] Restore XRPL open-offer cleanup

Context: `public/limit-extraction.html` had drifted to a mobile-only design whose desktop QR was a static page URL. Historical v3.0/v3.1/v3.2 copies were inspected; v3.2 established the useful Xaman-owned QR/deeplink, bounded OfferCancel and validated-intent pattern.

Changes:
- GitLab commit `1c55229a71a7e21dc4181ff239847af5b4975a05` restores the page as an XRPL Open Order Cleanup & Manager.
- Validated `account_offers` is the source for current open offers. The UI explicitly does not infer age from that response.
- Removed the permanent page-link QR. Desktop Xaman authorization is again owned by the Xaman SDK; each desktop OfferCancel displays the official QR returned for that exact payload. Mobile uses a same-device deeplink.
- Restored the bounded `Clear Open Offers` queue on desktop, up to 25 currently loaded offers. Every item still requires a distinct OfferCancel + Xaman approval and the queue stops on any non-authoritative result.
- Preserved six-digit challenge, SHA-256 intent, short ledger expiry, validated `tesSUCCESS`, protected OfferSequence and critical-field comparison.
- Preserved public-address read-only inspection and post-cleanup OwnerCount/XRP balance/reserve reporting.
- Removed unrelated XRBC Quick Buy / TrustSet UI and transaction code.
- Detailed record: `ORDER-MANAGER-CLEANUP-RESTORE-CHECKPOINT-2026-09-19.md`.

Checks:
- Static `desktopXamanQr` is absent; Xaman payload QR is present.
- Required interface IDs are unique.
- Validated account_offers, OfferCancel, cancelAll wiring, tesSUCCESS verification and OfferSequence matching are present.
- Quick Buy UI / buyXRBC are absent.
- GitLab pipeline `2863825712` succeeded: validation, secret detection, Semgrep SAST and Pages deployment.

Operating rules:
- Do not claim open-offer age unless independently established; current account_offers only proves the offer is still open.
- Do not present a static page-link QR as Xaman authorization/signing.
- One cleanup button may orchestrate the workflow, but XRPL still requires one independently approved OfferCancel per offer.
- The website never takes custody of offer funds.


### [SAVEPOINT-2026-09-19-order-manager-xaman-browser-repair] Xaman browser authorization repair

Context: After the open-offer cleanup restoration, real browser testing still showed no usable Xaman connection. Research against Xaman's current browser SDK documentation and the historical Order Manager implementation exposed a mixed mobile-only/browser-capable state.

Root cause:
- `xamanRuntimeOk()` was called throughout the current page but never defined.
- `mobileWalletOnly` still disabled desktop authorization.
- The connect path stored `connectionMode='xaman'` while the cancellation path still required `'xaman-mobile'`.

Changes:
- GitLab `public/limit-extraction.html` commit `825028ecebfe582986392933632bf5df0fe1508e` defines one canonical top-level HTTPS Xaman browser posture and enables browser Web3 authorization.
- `Connect Xaman` now uses the supported Xaman browser SDK flow: official authorization QR on desktop, deeplink-capable behavior on mobile.
- Cancellation permission consistently requires the connected `xaman` mode.
- Public-address inspection remains read-only.
- Validated `account_offers`, per-offer `OfferCancel`, six-digit challenge, SHA-256 intent, bounded ledger window, `tesSUCCESS`, critical-field comparison and post-cleanup reserve reporting are preserved.
- Static page-link QR remains prohibited.
- Detailed record: `ORDER-MANAGER-XAMAN-BROWSER-REPAIR-2026-09-19.md`.

Checks:
- All executable inline scripts compiled.
- GitLab pipeline `2863838957` succeeded: validation, secret detection, Semgrep SAST and Pages deployment.
- Rollback parent: `1c55229a71a7e21dc4181ff239847af5b4975a05`.

TODO:
- User verifies the desktop authorization QR with Xaman and tests one real OfferCancel before relying on bulk sequential cleanup.


### [SAVEPOINT-2026-09-19-xaman-standardization-audit-pause] Xaman wallet standardization audit paused for higher-capability review

Context: The user requested a project-wide standard for Xaman wallet behavior: connection must be authorization-only using immediate authorize() with the existing Render/XRPL read service waking in parallel; ledger writes must use the Order Manager createAndSubscribe pattern with challenge, intent binding and validated post-ledger comparison. The audit was intentionally paused before final verification so a higher-capability model can finish the security-sensitive pass.

Changes:
- Added `XAMAN-STANDARDIZATION-AUDIT-PAUSE-2026-09-19.md` as the detailed continuation record.
- Updated `ai-memory.json` so this paused audit is the latest savepoint and the next model is told not to assume the observed standardization commit is complete.
- No active GitLab frontend, backend, Render configuration, Xaman configuration, wallet or XRPL transaction code is changed by this memory checkpoint.

Impact:
- Resume from active GitLab frontend `xrbitcoincash-group/xrbitcoincash-project`, branch `master`, not from the legacy GitHub site frontend.
- Recorded GitLab head at pause: `ffc50caed8694f2fada443cbd8748bec1890a34a` (`Standardize Xaman connection and signing validation`), parent `04decf32ca30bcb983b7699fcc8f1c0154108242`. This head is evidence to review, not proof of completion.
- Preserve `public/xrbc-xaman-standard.js` as the shared connection/signing security layer unless the higher-capability audit finds a specific defect.
- Preserve page-specific APIs and stricter transaction validators while removing verified legacy inconsistencies only.

Checks:
- Repository-wide discovery located shared authorization usage across the major active XRBC/XRBitcoin wallet pages.
- Direct legacy authorization was not found in active page code outside the shared layer at the last audit search; re-run against the then-current head before making a final claim.
- The observed head commit changes `CONTRIBUTING.md`, `THREAT_MODEL.md`, `public/index.html`, `public/xrbc-liquidity-pool.html`, `public/xrbc-xaman-standard.js`, and `public/xrbitcoin-links.html`.
- No real desktop QR, mobile deeplink/app-switch, or live XRPL transaction test was completed by this audit.

TODO:
- Review the recorded standardization commit against its parent, then re-fetch current `master` before editing.
- Build a page-by-page connection/read/write/validation matrix and repair only confirmed gaps.
- Run repository tests/diff checks and separately verify desktop and mobile Xaman behavior before calling the wallet standard complete.


### [SAVEPOINT-2026-09-20-ecosystem-production-scaffold] Gate hierarchy, production hardening, and September 22 handoff

Context: Deep research audited the XRBitcoinCash ecosystem gates, UX, anti-abuse model, Xaman lifecycle, Liquidity Pool regressions, and production readiness. The active frontend head used as the audited baseline was GitLab `master` commit `4d7343c8c624e805298a4cd30c0a8f609f35b548`, pipeline `2865125823` success.

Changes:
- Added the durable implementation checkpoint `XRBC-ECOSYSTEM-PRODUCTION-SCAFFOLD-2026-09-20.md`.
- Updated `ai-memory.json` with the current gate ladder, tier-value rule, transaction invariants, regression fixtures, implementation order, observability minimums, and non-goals.
- Current holding thresholds remain unchanged pending authoritative XRBC/XRP market and liquidity evidence plus explicit policy approval: Bridge 10; Extended Audit 50; Sentinel Forensics 150; Risk Lens 150; Value Path 400; Watchtower 1,000; Advanced Tokenization 2,500 XRBC.

Impact:
- Higher gates must earn their thresholds through deeper metrics, computation, evidence, history/monitoring, exports, forensic depth, or protected transaction capability. Cosmetic duplication is not sufficient.
- Page load must never wait for Render. Backend-dependent actions may wait only after click, with bounded/cancellable status, and no Xaman transaction payload during warm-up.
- Exactly one Xaman payload may be created per deliberate final intent. Provider ambiguity is reconciled; it never authorizes an automatic replacement request.
- Frontend holding gates are not privileged backend authorization. Privileged services require server-side revalidation plus rate/concurrency/replay/idempotency controls as applicable.
- The Liquidity Pool regression at `4d7343c8...` is now a permanent release lesson: generic CI success is not enough; critical JavaScript must parse and primary controls must bind.

Checks:
- Deep-research inventory and threat analysis completed.
- GitLab audited head `4d7343c8c624e805298a4cd30c0a8f609f35b548` had successful pipeline `2865125823`.
- Checkpoint commit: `55477f08b7311541c7b1f3459137259546da62d1`.
- Machine-readable memory update commit: `fb2cfd978698f98405513de5bb8dd011f858c63d`.

TODO:
- Verify the current GitLab head again before the September 22 implementation pass.
- Land runtime parse/DOM/CSP/control-binding CI and shared state/gate/retry scaffolding before broad feature expansion.
- Review current XRBC/XRP economics before changing any holding threshold.


### [SAVEPOINT-2026-09-20-production-scaffold-implemented] Runtime contracts and gate policy landed

Context: The 2026-09-20 ecosystem audit scaffold was implemented rather than left as planning only.

Changes:
- GitLab active frontend scaffold: `8cfc0659a5d884f2a2a01411825205a6c4a89581`.
- Gate assertion correction: `2d192c95c6afad338365b265537984e896b4d473`.
- Pipeline `2865294807` passed `runtime-contracts`, repository validation, secret detection, Semgrep SAST, and deploy-pages.
- Added machine-readable gate and retry policy, shared transaction state machine, error taxonomy, retry-policy reader, gate validator, critical-page runtime verifier, gate/source verifier, unit tests, local implementation memory, production scaffold, release checklist, transaction-state documentation and failure runbook.
- GitHub backend policy was centralized without changing public threshold semantics: policy creation `fe00bbb5c2841150d8e53eec889662f1ef1bd1b4`; API integration `e07f371129555a31d78f1c43ea8aed6056227494`; policy tests `ba82d16dcf786b35848593de8e11056cc1ef31a1`.

Impact:
- Critical frontend pages now have a release-blocking check for single document roots, executable inline JavaScript parsing, required controls, CSP hash freshness where applicable, gate/source assertions and shared unit tests.
- The current XRBC threshold ladder is now represented as policy and tested for accidental drift.
- The shared state machine makes `payload_unknown` a one-way recovery/reconciliation state; it cannot automatically transition back to creating another Xaman payload.
- Production-page migration remains incremental. Do not rewrite every transaction page at once merely because the scaffold exists.

Checks:
- GitLab pipeline `2865294807` fully successful.
- Runtime-contract job verified nine critical pages.
- Ten scaffold unit tests passed in CI.
- Modified backend policy/API/test files were syntax-compiled through connected tooling. No GitHub Actions run was available for those direct backend commits.

TODO:
- On 2026-09-22, verify repository heads again.
- Add browser-level two-tab, mobile Xaman app-switch/resume, cold-backend, cancellation, rejection/expiry, ambiguous-create and validated-finality tests.
- Add measured production telemetry/dashboards.
- Review authoritative XRBC/XRP economics before changing any gate.
- Expand higher-tier tools only where added metrics/evidence depth materially justify the higher threshold.


### [SAVEPOINT-2026-09-21-discovery-brand-favicon] Conventional favicon and machine brand discovery

Context: Bing search results showed the site indexed but without the XRBC favicon. The existing homepage referenced only `/xrbitcoin-logo-128.png`, and the repository had no conventional root `/favicon.ico`.

Changes:
- Frontend commit `68586a9af00f88253b60f7ee6137cec2b6dfa145`.
- Added conventional root favicon/icon aliases and organized brand-discovery files while preserving legacy image URLs.
- Strengthened homepage title/description, Schema.org organization/logo identity, manifest, sitemap freshness, robots discovery comments, XRBC metadata, universal AI metadata and well-known AI catalog.
- Detailed checkpoint: `DISCOVERY-BRAND-FAVICON-SEO-2026-09-21.md`.

Impact:
- New canonical brand aliases are additive. Do not delete the older logo URLs merely because the new conventional paths exist.
- Search ranking is not guaranteed by metadata. This work reduces discovery ambiguity; it is not a ranking guarantee.
- Do not introduce automatic IndexNow or outbound crawler-notification behavior without a separately reviewed network/deployment change.

Checks:
- Pipeline `2867921308` passed runtime-contracts, validate-repository job, secret detection, Semgrep SAST and deploy-pages.
- Existing site-validator advisory findings elsewhere remain separate.

### [SAVEPOINT-2026-09-21-xaman-reconnect-countdown] Explain bounded Xaman reconnect wait

Context: A remembered wallet can remain visible while Xaman signing authorization is no longer active. Reconnect already had a protected in-flight window, but when the Xaman authorization UI was closed the order panel did not explain why reconnect could remain temporarily unavailable.

Changes:
- Frontend commit `bc77e91dbaac701a08d5364dd635e62715e26850`.
- Added a yellow/amber security notice under the main Connect/Reconnect controls and a red countdown tied to the existing 180-second Xaman authorization timeout.
- The notice is visible when a remembered wallet needs signing reconnection and during an active authorization attempt.
- Reconnect copy states that no trade request is created during this wait.
- Added local GitLab memory checkpoint `docs/checkpoints/XAMAN-RECONNECT-SECURITY-COUNTDOWN-2026-09-21.md`.
- Detailed continuity checkpoint: `UI-XAMAN-RECONNECT-COUNTDOWN-2026-09-21.md`.

Impact:
- Countdown is explanatory UI only. It must never become an automatic reconnect loop, automatic signing request, transaction retry or duplicate Xaman payload mechanism.
- `xumm.authorize()`, parallel backend readiness, `XAMAN_CONNECT_IN_FLIGHT`, current transaction safety and existing Reset/restart path remain authoritative.
- No quote, AMM, trustline, gate, order construction or transaction submission behavior was intentionally changed.

Checks:
- 13 executable homepage scripts parsed before commit.
- New DOM ids were unique.
- Pipeline `2868175288` passed runtime-contracts, validate-repository, secret detection, Semgrep SAST and deploy-pages.
