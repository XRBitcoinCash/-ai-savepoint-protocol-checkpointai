# Next run — shared sidebar alignment

Active savepoint: `SAVEPOINT-2026-09-22-xrbc-home-responsive-header`. Read `memory/savepoints/SAVEPOINT-2026-09-22-XRBC-HOME-RESPONSIVE-HEADER.json`, the operating protocol and relevant known errors.

Frontend master `0dcf99de7f4e5f6847689e298c1a7684d1b81369`; correction `3701c892041df7a0cd948e3dff6faa6f888fae92` via MR !11. This supersedes the MR !10 top-header choice at 901–1180px. Trade must match the Liquidity screenshot: fixed scrollable left sidebar above 900px, 188px through 1180px and 220px above, compact header only <=900px. Footer/main content clear the rail. Shared CSS, no copied page-local design.

Seven-width source CSS comparisons against Liquidity pass; all 24 tests and runtime/gate CI pass. Homepage executable scripts are unchanged. User-device visual comparison remains pending; no live wallet test. Existing 19 advisory site-validation findings remain.

Next implementation is still XRB-001; XRB-007/008 retain device-retest status. Preserve financial request guards. Do not broaden this layout correction into unrelated functions or project-wide rewrites.

MR !11 deployment verified: pipeline 2871483161 and deploy job 16654973464 succeeded. Live stylesheet v=20260922-4 has only the <=900px compact-header transition. Desktop rail/main/footer geometry verified at 1363px; narrow-device geometry remains unverified.
