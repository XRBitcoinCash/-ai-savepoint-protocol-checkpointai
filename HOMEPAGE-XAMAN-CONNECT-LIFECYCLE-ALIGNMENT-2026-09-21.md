# Homepage Xaman Connect Lifecycle Alignment — 2026-09-21

The XRBitcoinCash homepage order-panel wallet connection now follows the same browser authorization lifecycle used by the Liquidity Pool.

Frontend implementation:
- primary commit `877d0e74ac7c86e71bc57fa8bf0214472db0624e`
- final cleanup `1e74ad6ccd0a0ba8e8deb08ffb054042426c5c97`
- pipeline `2868760527` passed completely
- rollback `1c1dd89587c49328f38baec0b0a35619915108ff`

The visible difference is that a browser Xaman connection no longer leaves the user trapped behind a disabled **Connecting…** button after closing the authorization window. A **Cancel / restart Xaman** control is now visible directly in the order panel during the active authorization attempt, matching the Liquidity Pool interaction.

The underlying lifecycle was aligned as well: authorization is still connection-only; XRPL/backend readiness wakes in parallel; the window remains capped at 180 seconds; every attempt has identity/generation protection; cancelling or timing out invalidates the old attempt and performs bounded SDK logout; obsolete late responses cannot adopt a newer wallet; no replacement authorization or transaction request is created automatically; pending transaction-request guards are preserved.

Project-wide migration standard for other wallet pages:

- Browser Connect calls `XRBCXamanStandard.authorizeAndWarm()` immediately from the deliberate user gesture.
- Read-only backend/XRPL readiness runs in parallel and never delays opening Xaman.
- Merely connecting never creates a TrustSet, OfferCreate, Payment, AMM action, or other transaction.
- Keep exactly one active browser authorization attempt with explicit attempt/generation stale-response guards.
- Show **Cancel / restart Xaman** in the same visible wallet surface during the attempt.
- Use the current 180-second maximum and hard-clean the current attempt at expiry.
- Never use the timer as an automatic reconnect/retry mechanism.
- A remembered public XRPL address is not current signing authorization.
- Disconnect/reset does not release an existing created/ambiguous transaction request guard.
- Inside a Xaman xApp, use the account supplied by the xApp runtime; do not start browser OAuth/authorization there.
- Actual ledger writes remain separate one-payload-per-final-intent flows with challenge/intent binding and validated finality.

Local GitLab checkpoint: `docs/checkpoints/HOMEPAGE-XAMAN-CONNECT-LIFECYCLE-ALIGNMENT-2026-09-21.md` at `c7cceef81fb3f251c9201c0da1d0086d09b7949f`. GitLab AI memory was synchronized at `95ddb1a84d000cab5470b56eb8cf83f675ba7f9c`.

Manual production verification remains: close authorization, cancel/reset immediately, start a second attempt and reject any late result from the first, then verify the three-minute timeout returns to Connect without creating a transaction.
