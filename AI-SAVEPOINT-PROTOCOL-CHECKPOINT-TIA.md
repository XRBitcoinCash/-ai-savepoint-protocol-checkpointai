# XRBitcoinCash AI Memory & On-Task Operating Contract

**Document ID:** `xrbc/ai-memory/2.0.0`  
**Status:** Active  
**Updated:** 2026-09-18  
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
