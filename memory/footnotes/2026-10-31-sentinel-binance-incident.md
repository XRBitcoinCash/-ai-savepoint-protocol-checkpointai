# Footnote: Sentinel exchange-incident marker

**Recorded:** 2026-10-31  
**Status:** Parked design note for future XRBC main-page Metrics / Sentinel battlefield work.

## User intent

When the user resumes the battlefield metrics work after the compute-minute reset, consider adding a prominent Binance castle/camp marker: a large red X and red incident banner. Include other publicly documented breach and non-breach examples under one transparent, consistently applied scoring rubric.

Use dated source links and clearly distinguish confirmed facts, preliminary reports, investigation status, containment and recovery. A red X is a visual incident marker; the numerical score must come from the published rubric. “No public breach found” must never be presented as proof that a system is secure.

## Binance incident facts recorded at this date

Binance’s official updates reported unauthorized hot-wallet withdrawals around 2026-10-29 20:05 UTC, with an estimated impact of about $6.3 billion. Its October 31 update said investigators had found additional breach points, the investigation was ongoing, and it had found no evidence at that time that wallet private keys were leaked. Binance said approximately $3 billion had been frozen, withdrawals were temporarily paused for security review, and the company would cover the losses. It expected to publish a technical postmortem after verifying the findings.

The earlier compromised-DevOps-laptop/service-container explanation was an initial hypothesis. Do not state it as the final root cause. The amount, attack path, recovery and operational status may change as the investigation continues.

Suggested on-screen wording, subject to a fresh source check at implementation time:

> **Confirmed unauthorized withdrawals · 29 Oct 2026 · ~$6.3B reported impact · investigation ongoing**

Do not predict that Binance will shut down or that an executive will face liability. Those conclusions were not established by the sources checked on 2026-10-31.

## Source links

- Binance Security Incident Update #2 (posted 2026-10-31): https://www.binance.com/en/square/post/382966352206379
- Binance support incident update: https://www.binance.com/en-GB/support/announcement/security-incident-update-2-2026-10-30-d3306d9dca5243548c813b605e1d1751
- Elliptic’s on-chain analysis, marked as evolving analysis: https://www.elliptic.co/insights/binance-largest-hack-in-history/

## XRBC comparison boundary

XRBC’s Xaman flow places transaction review and signing in the user’s wallet; that is a different threat model from a centralized exchange’s hot-wallet withdrawal infrastructure. The absence of a known XRBC compromise is an operational observation, not proof of an audit or equivalence at Binance’s scale. Preserve the project’s beta status and unresolved independent end-to-end security verification when making comparisons.

## Scope and behavior

This is a standalone footnote. It does not change the task router, loader, active route, existing release code, or security claims. The November 1 read-only reminder remains limited to checking the existing Metrics release pipeline/jobs and telling the user the next step. Do not implement or deploy this design from the footnote alone; wait for the user’s explicit continuation.
