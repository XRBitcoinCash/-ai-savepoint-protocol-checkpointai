# Xaman Popup Layout Repair — 2026-09-21

Frontend commit `60633cbc8682cd07677e744f553db3dc6bdd149b` passed pipeline `2868922004`. Homepage release is `1.5.3`.

The Xaman secure-review popup layout is now explicit:

- Left: review title/status, payload UUID, Open in Xaman, Check Request Status, Cancel Xaman request, then the large six-digit Xaman security code.
- Right: official Xaman QR, then one compact instruction card underneath it.
- The instruction text is forced to normal horizontal wrapping so it cannot collapse into the narrow vertical strip seen in production.
- Mobile collapses to one column.

This is presentation only. The displayed code remains the existing protected `securityCode` from the request controller. Payload creation, pending/ambiguous request protection, signing, and validated XRPL finality are unchanged.

GitLab checkpoint: `docs/checkpoints/XAMAN-POPUP-LAYOUT-REPAIR-2026-09-21.md` at `631080fae94b43c175911b8a9ff61e4d6f4bd65f`. GitLab AI memory updated at `8ec6e577e52fb4f9c751c3109f8fb07f137263ae`.

Manual verification: hard-refresh, create a small review, confirm QR is unobstructed, instruction is below QR, code is below Cancel Xaman request, and code matches Xaman.
