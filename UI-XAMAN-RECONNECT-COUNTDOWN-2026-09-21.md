# XRBitcoinCash Xaman Reconnect Security Countdown — 2026-09-21

## Scope
Main XRBitcoinCash order panel only, in `public/index.html`.

This is a small user-experience/security-status enhancement around the existing Xaman authorization flow. It does not create, alter or retry a transaction payload.

## User-observed issue
When a remembered XRPL wallet remains visible but the Xaman signing session is no longer active, the order panel displays **Reconnect Xaman**. If the user starts reconnecting and closes the Xaman authorization window, the existing attempt can remain pending while the bounded authorization flow settles.

The behavior was already protected by an in-flight guard, but the UI did not explain why the button could remain temporarily unavailable.

## Implementation
Frontend commit: `bc77e91dbaac701a08d5364dd635e62715e26850`

Added immediately below the Connect/Reconnect controls:
- compact amber/yellow security notice
- red countdown numerals
- plain-language explanation of the bounded authorization wait
- static `3:00 max` explanation while a remembered wallet needs signing reconnection
- active countdown from `3:00` while Xaman authorization is in flight

The countdown uses the existing 180,000 ms authorization timeout through a shared constant:
`XAMAN_AUTHORIZE_TIMEOUT_MS = 180000`

The display is based on an absolute deadline so background-tab interval throttling cannot extend the displayed window.

At `0:00`, the copy explains that final account/session verification can still be settling.

## Security explanation exposed to users
XRBitcoinCash waits for the current authorization attempt to settle instead of immediately creating another authorization if the Xaman window is closed or slow.

The notice explicitly states:
- reconnect is authorization only
- no trade request is created during the wait
- the bounded wait helps prevent duplicate authorization attempts and stale-session reuse
- existing Reset / restart Xaman controls remain available

## Preserved invariants
- `xumm.authorize()` remains the connection path.
- Xaman authorization starts directly from the deliberate user click.
- Render/XRPL readiness still starts in parallel after authorization begins.
- `XAMAN_CONNECT_IN_FLIGHT` remains the guard against duplicate attempts.
- `authorizeTimeoutMs` is still 180,000 ms.
- No automatic replacement authorization was added.
- No transaction construction/signing/submission logic changed.
- No XRBC gate, trustline, quote, AMM or order behavior changed.

## Local repository memory
A matching technical checkpoint is stored in:
`docs/checkpoints/XAMAN-RECONNECT-SECURITY-COUNTDOWN-2026-09-21.md`

`docs/AI_MEMORY.md` also records the invariant.

## Verification already completed before memory write
- 13 executable inline scripts in the edited homepage were parsed before commit.
- New DOM IDs were checked for uniqueness.
- GitLab `runtime-contracts` passed.
- GitLab `validate-repository` job passed.
- Full pipeline status must be rechecked before claiming deployment success.

## Next-session rule
Treat this countdown as explanatory UI for the existing bounded authorization attempt. Do not convert it into an automatic reconnect loop, transaction retry, hidden signing request or second Xaman payload.
