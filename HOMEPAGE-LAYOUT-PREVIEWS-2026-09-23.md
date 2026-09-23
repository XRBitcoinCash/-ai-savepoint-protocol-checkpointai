# Homepage layout and preview correction — 2026-09-23

State: prepared before deployment. Implementation `48bc907207b105867be714733ffbfd49860b82ac`, GitLab MR !20, based on `5a9316174cacf18f1c32a9e8b6cadd5de7fd98f2`.

User requested narrow corrections to overlapping wallet liquidity text, broken XRP logo and unavailable video previews. Removed the obsolete 34px first-column rule and added readable column widths with natural table layout and horizontal scrolling. Repaired the existing XRP SVG's stray trailing text. Video cards show only successfully loaded thumbnails; missing previews collapse and thumbnails open the official YouTube page instead of a restricted embedded player. Publisher links remain available.

Changed five presentation files only. Wallet/signing/trading functions and feed endpoints are unchanged. Local checks: repaired SVG parses, 11 inline scripts and external media script parse, focused diff check passes. Required MR CI is the remaining gate; no live-site or browser checks performed or planned.

Stop immediately when deployment completes. No post-deployment tools, tests, live checks or memory updates. Final deployment status is intentionally not asserted in this predeployment record.
