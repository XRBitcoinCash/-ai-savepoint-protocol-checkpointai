# XRBitcoin wallet recovery — 2026-09-22

Active checkpoint: `SAVEPOINT-2026-09-22-xrbitcoin-wallet-recovery`.

User confirmed XRBitcoin after the page ambiguity was explained. Changed only its wallet connection controls and recovery paths. The layout already places the canonical wallet area above trade/liquidity. Sidebar **Wallet controls** now scrolls/focuses it; only its Connect Xaman button starts wallet authorization. Removed redundant Switch wallet; Disconnect becomes Cancel / restart during authorization.

Fixed XRB-007 and XRB-008 in source: Cancel/reset no longer return just because authorization is pending, SDK startup errors release Connecting, cancellation clears timers immediately, and timeout recovery holds its lock until bounded logout ends. Pending/ambiguous signing records remain intact. Exact inline controller CSP hash updated.

Implementation `87b00f81c86e85686b874c93ab65b02630984027`; merged via [MR !9](https://gitlab.com/xrbitcoincash-group/xrbitcoincash-project/-/merge_requests/9) as `eb437dd40f3a22951cca9709353c5696d5df519f`. Rollback baseline `97cfb36f244e8f11d806232aedf488fc34fb9898`. Protected workflow respected; no settings or protection changes.

Verification: 24 unit tests (7 new actual-source behavioral tests), 10-page runtime/CSP checks and 12-tool/7-tier gates pass locally and in MR pipeline 2871252507. Four lifecycle failures reproduced before patch. Site validator still has the same 19 advisory findings / exit 1. Production pipeline 2871255138 and deploy-pages job 16653266144 succeeded. Public build-info could not be retrieved by the web reader, so served-build/device verification is not claimed.

No live wallet or transaction test. Local Chromium executable was unavailable, so rendered desktop/mobile and real Xaman behavior remain unverified. XRB-001 second-click report remains open; this patch does not claim to fix OAuth completion. Next: device check recovery, then reproduce first-click hydration against the current build.

The prior reliability audit remains historical evidence; its 17-test count and no-repairs status describe the earlier checkpoint only.
