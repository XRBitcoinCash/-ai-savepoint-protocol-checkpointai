# In-page video playback and Battle Nexus — 2026-09-23

State: prepared before deployment. GitLab MR !21; implementation `3aa12510700dca50d3cf76ecaa30055ad2f9a13c`, base `c0e7253510eb745cdbcf9f6c8941ad5b3100732d`.

User requested embedded playback, automatic pausing of other videos, fullscreen/restore controls and opposing buy/sell forces meeting at a Nexus. Reviewed existing GitHub memory: the recorded prior pulse used ledger-arrival matrix motion; no separate Nexus implementation was recorded.

Changes: YouTube iframe API coordination (including manual resume and delayed callbacks), saved-position resume after closing, full screen / Return to page with Escape and page-expansion fallback, bounded load errors and publisher links. Missing thumbnails stay hidden. CSP script-src adds only the documented YouTube iframe API entrypoint and /s/player/ path. No wallet or signing functions change.

Battle Pulse now uses continuous green buy/red sell streams meeting at a fixed center. Funded top-five XRP depth controls stream strength. Ledger updates do not restart the phase. Motion describes resting depth, not executed trades, and pauses with stale/missing data, reduced motion, hidden/offscreen states. Visible canvas rendering is capped at 24 FPS.

Predeployment checks: three mocked playback tests and four existing market-display tests passed; changed JavaScript syntax and focused diff checks passed. No live/browser checks. Required CI is the deployment gate. No backend changes.

Reference: https://developers.google.com/youtube/iframe_api_reference

Mandatory stop: stop all tools/work immediately at deployment completion. This prepared checkpoint intentionally does not assert final deployment status. No post-deployment updates or checks.
