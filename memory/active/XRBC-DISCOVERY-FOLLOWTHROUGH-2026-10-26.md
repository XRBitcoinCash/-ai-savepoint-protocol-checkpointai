# Public discovery and owner-console follow-through — October 27, 2026

Current-session observations below were supplied by the root from source and authenticated browser work; this checkpoint preparation did not independently revisit consoles or rerun application checks. Remaining Labs/Bing checks are explicitly pending.

## Intent and boundaries

User prioritizes making the existing XRBC website publicly accessible and discoverable through search engines, web crawlers and appropriate internet outlets. Latest request asks whether actual main-page battlefield metrics can appear in Google, Bing and social previews, including motion. Microsoft Store and business registration are shelved. Preserve the existing site and accepted work; no new hosting architecture, runtime/code/CI/security change, wallet action, or deployment was performed for this discovery session. The separate MR140 metrics release remains paused because of shared-runner compute quota; do not resume it merely to complete discovery work.

Preserve Xaman-only signing, gates, token identities, quote/slippage/fee limits, pending/duplicate protections, the held P2P release and bounded Render use. Public explanations may be crawlable without opening gated actions. Engine receipt, crawling, indexing and ranking are different outcomes; none of these observations guarantees visibility or rankings.

## Source identity and reconciled history

Authoritative frontend: GitLab project 75781181, `xrbitcoincash-group/xrbitcoincash-project`, `master`; current observed source `bf84b00cd2bbc72c834811bb11084cb2871249e7`. MR138 merged October 27, 2026 at 03:38:32 UTC as `76e793ba56f4750e34cc3d784b45b76cacc14500`. Its earlier pending state is superseded by the recorded merge and subsequent deployed MR139 baseline. The current master also contains paused MR140, so master must not be described as fully deployed. Release state remains in `xrbc_battlefield_nav`.

Previous MR138 preparation, exact-head CI/browser evidence, unchanged financial boundaries and failed earlier Google sign-in are preserved in `memory/archive/XRBC-DISCOVERY-MR138-PREDEPLOY-2026-10-26.md`. This session successfully authenticated Google and Bing; that supersedes the earlier access blocker, not its historical record. No application tests were repeated for context recovery.

## Google observations and requests

- Cash Pages report, last updated October 22: 9 indexed and 20 not indexed; exclusions comprise 2 alternate pages with proper canonical, 15 discovered/not indexed and 3 crawled/not indexed. This is a dated report, not a fresh count of current indexed pages.
- Canonical Cash sitemap: Success, 25 URLs, last read October 23, submitted October 3. An old www sitemap has two URL-not-allowed errors associated with 2025 Google/Bing ping links. It was not changed or deleted.
- Homepage: on Google; last smartphone crawl October 24; declared and Google-selected canonical both `https://xrbitcoincash.com/`.
- Risk Lens: previously discovered/not crawled. Ecosystem: last smartphone crawl August 26 succeeded, crawling/indexing allowed, Google-selected canonical matched inspected URL.
- One indexing request each for Risk Lens and ecosystem was accepted into the priority crawl queue. No repeated request, completed subsequent crawl or new indexing result is claimed.

## Bing observations

Google-based sign-in succeeded. Canonical Cash sitemap: Success, 25 URLs, last crawl October 24, zero errors. Risk Lens was indexed with no SEO issues reported. Four missing-title alerts concern `security.txt`, HTTP/HTTPS `xrp-ledger.toml`, and `universal-ai.json`; these are machine-readable resources, not appropriate targets for HTML title insertion. No title fixes were made.

IndexNow showed only historical Wix submissions from 2025 and zero submissions during the displayed last-nine-hours window. No current IndexNow submission or integration was created.

## Existing discovery implementation

Current source already allows wildcard crawling and named Google, Bing, Apple, OAI, Claude and Perplexity agents; includes `llms.txt`; has 26 indexable canonical entries (25 Cash plus one Labs); and contains public JavaScript-free introductions, native mobile links and preview metadata. Existing homepage preview metadata already declares a 1774 × 887 PNG and `summary_large_image`; representative battle artwork would replace or extend existing metadata, not fill a missing-metadata gap. No new sitemap or generic AI file was justified merely to repeat existing work. Search-crawler access and training permission are distinct; `llms.txt` is not an indexing or ranking guarantee.

## Next preview task and remaining discovery work

Prepare an authentic static screenshot of the real homepage battlefield and metrics as the homepage share image, preserving the logo and favicon for brand identity. Describe the capture as a dated representative view, not a live quote feed or a guaranteed current metric. No screenshot asset, recording, page, metadata edit or deployment has been produced for this task yet.

A short actual recorded demonstration is a separate optional extension: provide a representative poster, a publicly accessible watch page and fetchable video for surfaces that support video. Google documents that it may select a few seconds of fetched video for a moving preview. Its image guidance permits `primaryImageOfPage` or `og:image` to influence a chosen search image and recommends representative page imagery rather than a generic logo. Selection remains automated; no guarantee of Google/Bing/social image, video placement or animation. Social support for optional `og:video` varies by surface; static `og:image` is the first deliverable.

Root consulted the official sources below; these are provider guidance, not evidence of XRBC search placement:
- https://developers.google.com/search/docs/appearance/video#enable-specific-video-features
- https://developers.google.com/search/docs/appearance/google-images
- https://ogp.me/

Additional Labs/Bing property/canonical/indexing checks remain pending. This is a bounded discovery follow-through, not completion of all outlets or full index coverage. Google requests for Risk Lens and ecosystem already succeeded at the submission stage and must not be repeated merely for continuity.

## Continuation and stop rule

The next scoped work is authentic static battlefield share-image preparation; a recorded demonstration is optional follow-through, not a prerequisite. Deployment stays paused because the existing shared-runner quota is exhausted. Preserve finished source and existing CI evidence; no broad audit, financial rerun, code deployment, new hosting or background task follows automatically from this checkpoint. When release work is separately resumed, inspect existing state before any targeted retry. If a later requested website deployment succeeds, stop all tools immediately as required by the project protocol.
