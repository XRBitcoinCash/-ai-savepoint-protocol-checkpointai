> Current design correction: MR !11 supersedes the 1180px compact-header choice below. Trade now follows the saved Liquidity Pool sidebar rule: desktop above 900px; compact top navigation only at <=900px.

# XRBC homepage responsive header — 2026-09-22

Active checkpoint: `SAVEPOINT-2026-09-22-xrbc-home-responsive-header`.

The user supplied an XRBitcoinCash homepage screenshot with only navigation visible at 1158px wide. This is a separate page from the prior XRBitcoin wallet repair. Source confirms a partial breakpoint migration: between 901 and 1180px the header became full-width while retaining fixed top/bottom positioning and vertical links, covering the workspace.

Completed the homepage compact transition in shared CSS: sticky header, automatic bottom inset, grid inner layout, horizontal scrollable navigation, compact brand spacing and zero footer offset. Updated only the homepage stylesheet URL to `v=20260922-3`. Desktop rules above 1180px and all 12 executable homepage inline scripts are unchanged.

Implementation `a20800962133141d7e2d5c99e03ddda6ccd93d57` merged as `3e15aaec8d8ae875d3598ea259f947a6bb6ae881` through [MR !10](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/10). Rollback baseline `eb437dd40f3a22951cca9709353c5696d5df519f`. Revert the bounded repair through normal review while preserving subsequent work.

Verification: CSS cascade checks at 390/900/901/1158/1180/1181/1363px reproduce the prior defect and select corrected compact rules. These are source checks, not rendered geometry. All 24 existing tests, 10-page runtime/CSP checks and 12-tool/7-tier gates pass. All 12 homepage scripts parse. MR pipeline 2871378469 passed; the same 19 advisory site-validator findings remain. Production pipeline 2871382210 and deploy job 16654205029 succeeded.

Live desktop was inspected before and after deployment. After reload, the homepage served CSS v=20260922-3 and all corrected compact CSSOM rules; at 1363×936 the 220px sidebar and trading workspace remain visible. No full build-marker verification. Local file preview was blocked by browser URL policy; no workaround used. No real wallet, signing or transaction test was performed. Narrow-screen rendering needs a device check. Existing XRB-001 and XRB-007/008 retest status remain unchanged.

Prevention: change the complete positioning, size, inner-layout, navigation and content-offset transition together when moving a breakpoint. Test just below/above both old and new breakpoints, include the screenshot width, inspect winning CSS specificity, and refresh the stylesheet cache key. Green CI alone does not establish responsive rendering or wallet success.

## User reference alignment follow-up

The earlier visibility repair did not preserve the intended desktop layout. The user supplied the Liquidity screenshot; the September 21 shared-shell memory already specifies 900px. Restored that breakpoint, inherited shared 188px/220px rail widths and fixed footer clearance. Only CSS and homepage stylesheet URL (`20260922-4`) change. Implementation `3701c892041df7a0cd948e3dff6faa6f888fae92`, merged `0dcf99de7f4e5f6847689e298c1a7684d1b81369` through [MR !11](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/11). Seven-width source comparisons match Liquidity; 24 tests and runtime/gate CI pass. Real narrow-device geometry remains to confirm. Prior checkpoint/evidence retained in memory/archive and Git history.

MR !11 deployment verified: pipeline 2871483161 and deploy job 16654973464 succeeded. Live stylesheet v=20260922-4 has only the <=900px compact-header transition. Desktop rail/main/footer geometry verified at 1363px; narrow-device geometry remains unverified.
