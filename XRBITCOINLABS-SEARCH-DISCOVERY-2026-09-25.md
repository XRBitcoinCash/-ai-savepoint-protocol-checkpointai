# XRBitcoinLabs domain and search-discovery handoff — 2026-09-25

Machine checkpoint: [`memory/savepoints/SAVEPOINT-2026-09-25-XRBITCOINLABS-SEARCH-DISCOVERY.json`](https://github.com/XRBitcoinCash/-ai-savepoint-protocol-checkpointai/blob/main/memory/savepoints/SAVEPOINT-2026-09-25-XRBITCOINLABS-SEARCH-DISCOVERY.json). Created at the users request before ending the session.

## Goal

Continue improving discovery of XRBitcoinCash (XRBC) and XRBitcoin for people searching XRBC / XR Bitcoin and for search systems that crawl public pages. Better crawlability is actionable; ranking, logo display, AI citations and recommendations are not guaranteed.

## State to resume from

- New Web2 alias: [xrbitcoinlabs.com](https://xrbitcoinlabs.com/) is configured as a permanent 301 to the canonical [XRBitcoin workspace](https://xrbitcoincash.com/xrbitcoin-links.html). User reports it now works. No independent DNS/HTTPS/redirect test was performed in this savepoint.
- Bing and Google properties were verified in prior work. Bing live inspection previously followed the alias redirect; the canonical workspace was reported indexed in Bing and recrawl was requested. Google live test showed the root crawlable/indexable and an indexing request had been submitted.
- Sitemap: [sitemap.xml](https://xrbitcoincash.com/sitemap.xml), previously processed successfully with 24 URLs discovered.
- Bing Site Scan: one completed scan covered only 1 page and showed 0 errors / 0 warnings. A separate sitemap-scope scan (100-page cap) was created and showed **Queued**. Its completion/report is not checked.
- Bing Recommendations still displayed **10 findings across 9 pages** (2 High / 8 Moderate): multiple H1 tags, missing titles, important pages with meta robots needing review, and lack of high-quality inbound links. Do not mark these cleared from the one-page scan.
- Bing IndexNow showed 0 URLs submitted in the last 23 hours; the visible historic list had Wix submissions from Aug 2025, mostly on the www host. Recheck Wix integration and hostname consistency before changing notification behavior.
- Bing AI Performance showed 0 citations / 0 cited pages in its selected three-month view. This is only a baseline.
- User-provided Bing Search Performance view showed about 178 clicks, 1.4K impressions, 12.81% average CTR. Leading rows: `xrbitcoincash` (445 impressions / 137 clicks / avg position 4.08), `xrbc` (135 / 10 / 5.13), `xaman wallet` (25 / 0 / 10.48), `xrbitcoin` (16 / 2 / 1.69).
- Prior brand checkpoint records root favicon and 192px icon, brand JSON, Organization structured data, sitemap/robots and AI JSON changes; pipeline 2867921308 passed. Confirm currently served files before assuming Bing refreshed its result icon.
- GitLab [MR !35](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/35) for static XRBC/Xaman metadata was last recorded as pipeline-passed, pending merge/deployment. Recheck current state before claiming it is live.
- User accepts Render cold starts during beta. Keep focus on crawler/discovery work unless a concrete function failure is reported.

## Links for next session

| Site / tool | Link |
| --- | --- |
| Canonical site | [xrbitcoincash.com](https://xrbitcoincash.com/) |
| XRBitcoin workspace | [xrbitcoin-links.html](https://xrbitcoincash.com/xrbitcoin-links.html) |
| New Web2 alias | [xrbitcoinlabs.com](https://xrbitcoinlabs.com/) |
| Sitemap / robots | [sitemap.xml](https://xrbitcoincash.com/sitemap.xml) · [robots.txt](https://xrbitcoincash.com/robots.txt) |
| Bing Webmaster | [Home](https://www.bing.com/webmasters/home?siteUrl=https://xrbitcoincash.com/) · [Search Performance](https://www.bing.com/webmasters/searchperf?siteUrl=https://xrbitcoincash.com/) · [URL Inspection](https://www.bing.com/webmasters/urlinspection?siteUrl=https://xrbitcoincash.com/) |
| Bing crawl/index tools | [Sitemaps](https://www.bing.com/webmasters/sitemaps?siteUrl=https://xrbitcoincash.com/) · [IndexNow](https://www.bing.com/webmasters/indexnow?siteUrl=https://xrbitcoincash.com/) · [Recommendations](https://www.bing.com/webmasters/seoreports?siteUrl=https://xrbitcoincash.com/) · [Site Scan](https://www.bing.com/webmasters/sitescan?siteUrl=https://xrbitcoincash.com/) |
| Google Search Console | [Search Console](https://search.google.com/search-console) |
| GoDaddy | [Domain dashboard](https://dcc.godaddy.com/) |
| Static metadata change | [GitLab MR !35](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/35) |

Brand resources previously recorded: [favicon.ico](https://xrbitcoincash.com/favicon.ico), [favicon.png](https://xrbitcoincash.com/favicon.png), [192px icon](https://xrbitcoincash.com/icon-192.png), [brand.json](https://xrbitcoincash.com/assets/brand/brand.json), [AI manifest](https://xrbitcoincash.com/.well-known/ai.json).

## Resume order

1. Check whether the queued sitemap scan finished and inspect exact pages/findings.
2. Recheck Recommendations; review affected URLs and keep intentional member/private noindex exclusions.
3. Recheck MR !35 and live metadata after any deployment.
4. Confirm canonical host, 301 destination, sitemap/robots, favicon and AI manifest are consistent and crawlable.
5. Review Bing and Google URL Inspection; use clean query data to refine factual page content.
6. Leave cold starts and unrelated application fixes alone unless a concrete failure is reported; existing queue is XRB-001/007/008 plus separate XRB-009.

**Boundary:** this is a memory handoff only. It makes no site/DNS/Search Console changes and does not claim a search result, logo or AI citation.
