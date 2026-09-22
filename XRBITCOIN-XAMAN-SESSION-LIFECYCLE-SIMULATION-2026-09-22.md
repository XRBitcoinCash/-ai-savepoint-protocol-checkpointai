# XRBitcoin Xaman Session Lifecycle Repair + Simulation — 2026-09-22

## Scope

Active frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, branch `master`.

Production implementation commit: `ac46b49ef17ef07ab85f61728c319844b17aa3bb`.

Simulation/test commit: `97cfb36f244e8f11d806232aedf488fc34fb9898`.

Final pipeline: `2870991044` — success. Runtime contracts, repository validation, secret detection, Semgrep SAST, unit/synthetic wallet lifecycle tests, and Pages deployment all passed.

Current XRBitcoin page:
- file: `public/xrbitcoin-links.html`
- blob: `a2a0093960296dc4a446725691da449f5dde41a7`
- SHA-256: `06f0b27bcdffebe44f2c042095d2e4cbade52d7786db9a175da8ea4cde50ca4e`

## Failure reproduced from browser evidence

The page could display a remembered/partial wallet state while showing **Signing blocked**, then pressing **Connect Xaman** opened the “Reset this website’s remembered Xaman sign-in” confirmation instead of starting a clean XRBitcoin authorization.

The code path was deterministic:

1. XRBitcoin and XRBitcoinCash use different Xaman public application IDs but run on the same website origin.
2. Xaman browser PKCE state is stored under the origin-scoped browser key `XummPkceJwt`.
3. XRBitcoin’s browser `setupSdk()` passively tried to restore any cached browser account on page load.
4. If that cached session belonged to the other application, `checkXamanSession()` correctly rejected the application identity, but left the page in `sessionFault` / “Signing blocked”.
5. The next Connect click saw `sessionFault` and called `resetXamanSession()`, which opened a confirmation/reload path.
6. This produced the confusing state seen in the browser: not clearly connected, not clearly disconnected, wallet details unavailable, and Connect acting like Reset.

This was a session-lifecycle defect, not an AMM/pool-read defect.

## Repair

### Browser connection is now explicit only

Browser `setupSdk()` no longer passively adopts a remembered account. Automatic restoration is retained only for the Xaman xApp runtime, where Xaman itself supplies the account.

A normal browser stays visibly disconnected until the user deliberately presses **Connect Xaman** or the XRBitcoin wallet shortcut.

### Deliberate XRB Connect starts clean

Each deliberate browser Connect:
- removes the origin-scoped `XummPkceJwt` cache before creating a fresh SDK instance;
- creates the SDK with XRBitcoin’s own public application ID;
- immediately starts `XRBCXamanStandard.authorizeAndWarm()`;
- wakes the validated XRPL reader in parallel;
- creates no transaction payload merely to connect;
- accepts the account only after Xaman application/account verification succeeds.

XRBitcoin Xaman public application ID remains:
`9f853ecf-d95f-4e03-8591-e41f91b9f3c5`.

Do not substitute the XRBitcoinCash application ID.

### Failed verification is no longer an ambiguous wallet

If application/account verification fails, the candidate account is cleared. The UI cannot retain an unverified account as if it were an active wallet.

The state label is **Reconnect required**, not “Signing blocked” with an apparently connected wallet.

### Disconnect is deterministic

Browser Disconnect now:
- immediately clears local XRBitcoin wallet state;
- clears the Xaman browser PKCE cache;
- preserves pending XRBitcoin transaction records and receipts;
- attempts provider logout, but provider logout failure does not leave the UI stuck in a pseudo-connected/signing-blocked state;
- reinstalls a clean SDK instance;
- returns the page to a clear disconnected state.

### Reset no longer opens a modal/reloads

The explicit Reset Xaman sign-in control uses the same deterministic local disconnect/reset path. It does not use `window.confirm()` and does not reload the page.

### Wallet details now explains its state

The wallet-details panel explicitly says whether:
- no wallet is connected;
- Xaman is connecting;
- reconnect is required;
- or a verified wallet is connected and balances/LP position are being shown from validated ledger reads.

## Synthetic simulation added

New test:
`tests/unit/xrbitcoin-wallet-lifecycle.test.mjs`

It exercises the actual source structure and shared helper behavior with synthetic SDK/storage/provider fixtures.

Covered scenarios:
1. No passive browser wallet restoration.
2. A stale cross-project browser cache is discarded before XRBitcoin authorization.
3. `authorizeAndWarm()` calls authorization immediately and does not create a transaction payload.
4. XRBitcoin Connect uses the exact XRB application ID and contains no transaction construction path.
5. Provider logout failure still ends in an unambiguous disconnected local state.
6. Disconnect and Reset are modal-free and preserve pending request storage.
7. Failed Xaman application verification cannot leave an accepted wallet account.

An initial test assertion was itself too narrow and failed pipeline `2870987101`; the test was corrected without weakening the production fix. Final pipeline `2870991044` passed completely.

## Preserve

- XRBitcoin and XRBitcoinCash remain separate Xaman applications.
- Connect is authorization-only.
- No automatic transaction or replacement signing payload is created by connection/reconnection.
- Pending/ambiguous transaction-request records are not deleted by wallet disconnect/reset.
- Existing validated XRPL finality, signer equality, challenge/intent binding, and critical-field comparison remain authoritative.
- Exact XRB identity remains issuer `rGQaHbQHCsTLQtboQPwUBasXjLvk8uDbpT`, currency `5852626974636F696E0000000000000000000000`.
