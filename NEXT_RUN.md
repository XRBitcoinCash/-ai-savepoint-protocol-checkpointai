# Next run — XRBitcoin recovery merged

Active savepoint: `SAVEPOINT-2026-09-22-xrbitcoin-wallet-recovery`. Read `ai-bootstrap.json`, `latest_savepoint.record`, `memory/operating-protocol.json`, then `memory/savepoints/SAVEPOINT-2026-09-22-XRBITCOIN-WALLET-RECOVERY.json` and the known-errors register.

Current frontend master: `eb437dd40f3a22951cca9709353c5696d5df519f`; implementation `87b00f81c86e85686b874c93ab65b02630984027` via MR !9. Production pipeline 2871255138 / deploy-pages 16653266144 succeeded. Verify served build before device testing. Memory update is separate from deployment.

XRB-007/008 are CI-verified fixes awaiting real-device retest. Check Connect → close Xaman → Cancel / restart → Connect again, then timeout and a slow old response. Existing signing requests must remain recoverable. Sidebar Wallet controls only opens the canonical wallet area; it does not authorize.

**Next implementation: XRB-001 first-click hydration.** Reproduce the second-click report on the deployed build; do not claim this recovery patch fixes it. Keep app/account verification and deliberate-attempt guards. Then continue BRIDGE-001 and the existing metadata/reference/CI queue. No broad CSS or other-project rewrite.

24 unit tests pass; 10-page runtime/CSP and 12-tool/7-tier gates pass. Site validation still reports 19 advisory findings / exit 1. Browser/mobile/two-tab and live wallet tests were not run (local Chromium unavailable).

Historical audit: `RELIABILITY-AUDIT-2026-09-22.md`. Backend audit baseline `48c7ff4dd45b2658ba5ce3f6ddf7d86128fc9563` was not re-audited or modified here.
