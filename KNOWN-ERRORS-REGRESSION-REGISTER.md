# Known Errors & Regression Register

**Purpose:** persistent cross-project error ledger for XRBitcoinCash ecosystem work.  
**Updated:** 2026-09-22  
**Policy:** read this file before changing any page listed here. When a defect is corrected, do not delete it; change its status, add the exact fix commit/pipeline/test evidence, and preserve the failure chain so the same regression is not reintroduced.

## Status meanings

- **OPEN** — reproduced or user-observed and not yet corrected.
- **RETEST REQUIRED** — code correction exists, but the exact real browser/device flow still needs user verification.
- **RESOLVED** — correction exists and the relevant automated checks passed; retain as a regression fixture.
- **HISTORICAL / REVERIFY** — carried from prior continuity notes; do not assume it is still broken until current source/runtime is checked.
- **NO CHANGE THIS PASS** — project was not modified in the current work session.

---

# 1. XRBitcoin / XRB

Active frontend: GitLab `xrbitcoincash-group/xrbitcoincash-project`, branch `master`  
Page: `public/xrbitcoin-links.html`  
Current deployed/tested source sequence ends at GitLab test commit `97cfb36f244e8f11d806232aedf488fc34fb9898`; production page bytes come from implementation commit `ac46b49ef17ef07ab85f61728c319844b17aa3bb`.  
Last successful pipeline: `2870991044`.

## XRB-001 — wallet requires a second Connect click to register on page
**Status: OPEN — highest priority**

### Observed behavior
After the user completes Xaman authorization, XRBitcoin does not immediately register the connected wallet in the page UI. The user has to press **Connect wallet** a second time before the page recognizes the session.

### Why this matters
This is an unnecessary extra authorization-state transition and makes the user unsure whether the first connection succeeded. It also risks further state-machine patches if treated as a visual problem.

### Evidence gathered before pausing
The working XRBitcoinCash homepage `public/index.html` listens to Xaman `success`, `retrieved`, and `ready` events and calls a dedicated session-restoration/verification routine so the page hydrates the account when OAuth returns. Its code explicitly documents that this removes the need for a second Connect click.

The current XRB `wireSdk()` intentionally restricted browser `success` / `retrieved` handling to xApp restoration after the earlier same-origin-session repair. That avoided cross-project passive restore, but it also removed the first-authorization completion bridge for normal browser OAuth.

### Intended next repair
Do **not** return to unrestricted passive browser restore. Instead:
1. Keep ordinary page-load browser restoration disabled.
2. While a deliberate XRB `connect()` attempt is active, allow that exact attempt's Xaman `success` / `retrieved` event to hydrate and verify the returned account automatically.
3. Bind the event to the active SDK instance, auth generation/version, and `S.authAttempt` so an unrelated or stale session cannot overwrite current state.
4. Reuse XRB's existing `adoptAccount()` / application verification.
5. Do not call `authorize()` a second time.
6. Do not create a transaction payload.
7. Add/extend the synthetic lifecycle test so one simulated authorization event results in `S.connected === true` without a second Connect action.
8. Compare behavior against the working XRBC homepage before committing.

### Important interruption note
A possible patch was being prepared when the user intentionally stopped the change. **No commit was made for this second-click issue.** Do not assume it is repaired.

---

## XRB-002 — main wallet/pool controller blocked by stale CSP hash
**Status: RESOLVED / regression fixture**

Observed symptoms: wallet connection missing/inert, existing XRB/XRP pool appeared broken, pool activity stayed in connecting/static state.

Root cause: `liquidity-app` JavaScript had changed without updating its CSP SHA-256, so the browser blocked the main controller while some later read-only scripts still executed.

Repair:
- GitLab commit `f728e7ae89ba35a90c7506085d151a7eb19417f6`
- Pipeline `2870872464` success
- Added XRBitcoin page to runtime-contract coverage.
- XRB/XRP exact pool identity preserved.

Regression rule: any edit to executable inline JavaScript must update CSP and pass runtime-contract checks.

---

## XRB-003 — Wallet shortcut was only an anchor; Preview looked frozen
**Status: RESOLVED / RETEST AFTER FUTURE WALLET FIX**

Observed behavior:
- sidebar Wallet button only scrolled;
- Preview deposit was disabled while disconnected and gave no direct path into authorization;
- connection used generic busy state.

Repair:
- Commit `ab7f5dbd401e93e7bcffc7bd87669625ef14d097`
- Pipeline `2870912971` success
- Added real wallet shortcut binding, dedicated `connecting` state, and disconnected Preview gateway that starts authorization only.

Regression rule: disconnected Preview may initiate authorization, but it must not create AMM/trade/trustline/NFT payloads.

---

## XRB-004 — `XRBCXamanStandard is not defined`
**Status: RESOLVED**

Observed error: browser displayed `XRBCXamanStandard is not defined`.

Root cause: same-origin `/xrbc-xaman-standard.js` existed, but XRBitcoin's `script-src` omitted `'self'`.

Repair:
- Commit `1e21ec4a89b711279ca87c91bd2216d3222a14fa`
- Pipeline `2870937665` success
- Added `script-src 'self'`
- Fixed the CI CSP parser so inner apostrophes no longer truncate the policy string.

Regression rule: runtime verification must prove same-origin script permission when same-origin scripts are referenced.

---

## XRB-005 — ambiguous “Signing blocked” state / reset-loop behavior
**Status: RESOLVED IN CODE; browser lifecycle still coupled to XRB-001 retest**

Observed behavior:
- page could look partially connected but show **Signing blocked**;
- Connect could route into a reset confirmation rather than clean XRB authorization;
- Disconnect state was unclear.

Root cause established:
XRBitcoin and XRBitcoinCash use separate Xaman app IDs on the same `xrbitcoincash.com` origin, while browser PKCE state uses the origin-scoped `XummPkceJwt` cache. Passive browser restore could consume cached state from the other app, then XRB application verification would reject it and leave `sessionFault`.

Repair:
- Implementation commit `ac46b49ef17ef07ab85f61728c319844b17aa3bb`
- Synthetic-test commit `97cfb36f244e8f11d806232aedf488fc34fb9898`
- Pipeline `2870991044` success
- normal browser passive restore disabled;
- deliberate XRB connect clears PKCE cache and installs a fresh XRB SDK;
- disconnect/reset made deterministic and modal-free;
- failed app verification clears the candidate wallet;
- wallet details state text added;
- seven synthetic lifecycle tests added.

Known side effect discovered afterward: this strict browser restore change is the likely reason XRB-001 now needs a second click. Repair XRB-001 surgically rather than undoing the cross-app isolation.

---

## XRB-006 — project-boundary navigation contamination
**Status: RESOLVED**

XRBitcoin had inherited XRBC-only sidebar destinations such as Liquidity scanner, Auditor, Risk Lens and All tools.

Repair:
- Commit `be62d4ce19f44bd4c94a6044e78d47b4c81067ea`
- XRBitcoin sidebar stays project-specific: Exchange, Limit orders, XRB Watchtower, Security, Support.
- XRBitcoinCash, JCS and Creature NFT remain separate related-project links.

---

# 2. XRBitcoinCash / XRBC

## Current-session UI work
**Status: IMPLEMENTED; do not mix with XRB wallet debugging**

### XRBC-UI-001 — Coinbase-style shared exchange/tool shell
Implemented during this state:
- shared homepage exchange shell;
- fixed desktop left rail and compact responsive navigation;
- project-wide tool sidebar family;
- separate exchange/workbench family for Trade / Liquidity / Developers;
- narrow-desktop collapse fixes;
- Developer page migrated to dedicated exchange sidebar;
- CTA readability refinements;
- stray escaped-newline markup repairs.

Important commits include:
- `cd8b2bd41082c9a87b1540381344e6c5ee4928e1` — shared homepage exchange shell
- `b06b3ca16f047b01a059bd5833d7e1d81050f24d` — homepage migration
- `cae5a7947650df975e63aeba31dc6ca63ab5e309` — project-wide tool sidebar shell
- `8abc8f784d9a1e40ea3557c4b27989350a3167f6`, `a26d2f41b39e9ce42a91e0021a7a84de92e9a486`, `dff9badd9053366001787412c8fe6e4c44d08479` — page migrations
- `638e01f22c909b170eec9ed6c6eb77cd7b6e8343` / `0493ff6e52418c1675efe7a3e4d4419c5ab106cb` — Developer exchange sidebar
- `c287fcd07629169b9416db6396607745ae1f9835` — Xaman CTA readability

### XRBC-WALLET-REFERENCE
The current XRBC homepage wallet flow is the reference for the pending XRB-001 fix:
- deliberate Connect starts `XRBCXamanStandard.authorizeAndWarm()`;
- Xaman `success`, `retrieved`, and `ready` events feed a verification/restore routine;
- after OAuth returns, the page registers the account without requiring a second Connect press;
- signing readiness remains separate from a remembered public account.

Do not copy the entire XRBC state machine into XRB. Port only the bounded event-completion behavior required for the active XRB connect attempt.

## Historical XRBC wallet issues to reverify, not assume current
**Status: HISTORICAL / REVERIFY**
Prior continuity notes include:
- “Opening wallet” / authorization stuck states;
- QR or desktop wallet handoff failures;
- Render/service-busy states;
- reconnect after closing Xaman;
- need for bounded reconnect countdown and reset/restart.

Recent XRBC wallet standardization and reconnect-countdown work may already mitigate some of these. Re-test current source before reopening any of them.

---

# 3. Jesus Christ Saves Token / JCS

**Current-session status: NO CHANGE THIS PASS**

No JCS live code was modified during the September 22 XRBitcoin repair sequence documented above.

## Historical JCS issues carried forward
**Status: HISTORICAL / REVERIFY BEFORE EDITING**

From prior project continuity:
- wallet connection friction / connect-button revisions;
- JCS LP/NFT mint popup reported flashing then disappearing;
- return-URL mismatch reported in the JCS liquidity/NFT signing flow;
- prayer NFT wall / verification setup had prior incomplete states;
- media page had synchronization/layout/rendering work and mobile wrapping issues;
- JCS liquidity workflow was intended to follow the same general Xaman/AMM safety pattern while retaining JCS-specific backend/project identity.

Do not assume these remain broken. Before changing JCS:
1. inspect current JCS source and active deployment;
2. identify exact Xaman app/backend identity;
3. reproduce one issue at a time;
4. avoid importing XRBC/XRB wallet state blindly;
5. record the result here.

---

# 4. Cross-project regression rules

1. **Different token projects may share a domain but still use different Xaman application IDs.** Never substitute app IDs.
2. **Browser session cache is a project-boundary risk on a shared origin.** Treat remembered public account, active signing authorization and app identity as separate facts.
3. **Do not “fix” a wallet state only through labels/CSS.** Trace authorization -> account resolution -> app verification -> connected state -> ledger hydration -> disconnect/reset.
4. **No transaction payload during wallet connection.**
5. **One deliberate transaction intent -> at most one Xaman payload.**
6. **CSP is part of runtime correctness.** Any inline-JS edit requires hash verification; any same-origin external script requires policy permission.
7. **A green pipeline is not a live-wallet proof.** Preserve a separate `browser_live_retest` field.
8. **When a correction creates a new regression, add it here immediately and link it to the parent fix that introduced/exposed it.**
9. **Do not erase failures after they are fixed.** Convert OPEN -> RESOLVED and add fix/test/rollback evidence.
10. **Before a high-risk repair, compare the current code with the last known working implementation and the relevant XRBC/XRB/JCS reference flow.**

---

# 5. Next higher-capability review order

1. **XRB-001 first:** remove the second Connect click without restoring unsafe cross-project passive browser session adoption.
2. Run the synthetic XRB wallet lifecycle suite and extend it to prove a single authorization event hydrates the page.
3. Real browser test: disconnected -> Connect -> authorize -> page shows connected/account/balances automatically -> Disconnect -> reconnect.
4. Test Preview deposit without signing.
5. Only after wallet lifecycle is stable, resume page simplification/UX work.
6. Revisit historical XRBC/JCS items only from current source/runtime evidence, one issue at a time.

