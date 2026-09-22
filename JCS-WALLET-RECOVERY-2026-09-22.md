# JCS wallet recovery — 2026-09-22

Repository `XRBitcoinCash/JCS-token-on-the-XRPL`, main. Fix `660fd2d78c07f282a2d3f39b09b7145b70af11b1`; previous `6d2e0ef13e7ec8e62ca2767fe2c0a20dc87f9989`. Files: `js/jcs-core.js` and its embedded wallet code in `index.html`.

The Connecting flag waited on an unbounded authorization promise while Disconnect was disabled. Disconnect did not invalidate authorization, and old events could restore a canceled session. Added a 3-minute authorization limit, enabled Cancel / restart while connecting, bounded logout to 5 seconds, cleared the attempt state, rejected obsolete SDK/generation callbacks, and constructed a fresh SDK on the next deliberate click. Success/retrieved/ready events complete the same active attempt. Connect remains authorization-only; active financial requests remain guarded.

The inline core contains newer trading/NFT/receipt changes absent from the standalone source. Preserved those differences and patched only the matching wallet sections. Sidebar, JCS issuer/application key, transaction construction and liquidity formulas were preserved.

Essential checks only: JavaScript syntax and one focused wallet simulation covering cancellation, old callback rejection, fresh retry completion and popup-error cleanup. Passed. No broad test suite, repeated audit or real wallet/signing test. User will check the page. GitHub Pages build/deployment succeeded (run 35743143452). Public browser and real wallet checks deferred to the user.

User preference remains: keep work narrow, conserve credits, use existing evidence, perform essential checks and stop. JCS-001 is retest-required. Existing XRBC/XRBitcoin checkpoint and source heads remain scoped to those projects.
