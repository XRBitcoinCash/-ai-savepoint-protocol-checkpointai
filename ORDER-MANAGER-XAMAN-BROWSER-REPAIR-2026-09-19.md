# Order Manager Xaman browser repair — 2026-09-19

## Context

Real browser testing showed that the restored Order Manager still did not actually connect Xaman. The visible button could leave the user with the public-address validation path instead of the wallet authorization path.

Historical context and current Xaman browser documentation were checked before editing. The intended browser integration is Xaman Web3 authorization: desktop displays Xaman's official sign-in QR, mobile can deeplink, and transaction payloads use Xaman-owned QR/link data.

## Root cause

The current page contained an incomplete merge between the older mobile-only security posture and the restored desktop QR design:

- `syncWriteControls()`, `bindIntent()`, SDK loading and session checks called `xamanRuntimeOk()`, but that function did not exist.
- The page config still had `mobileWalletOnly: true`.
- `submitAndValidate()` still required `connectionMode === 'xaman-mobile'`, while the restored connection function stored `connectionMode = 'xaman'`.
- UI copy still described desktop as QR/read-only or mobile-only in several places.

Those contradictions prevented the supported wallet/cancellation path from becoming usable.

## Production change

- GitLab project: `xrbitcoincash-group/xrbitcoincash-project`
- Branch: `master`
- File: `public/limit-extraction.html`
- Commit: `825028ecebfe582986392933632bf5df0fe1508e`
- Rollback parent: `1c55229a71a7e21dc4181ff239847af5b4975a05`
- Pipeline: `2863838957` — success

## Corrected behavior

- Added one canonical browser runtime check: secure context + top-level page + exact `https://xrbitcoincash.com/limit-extraction.html` origin/path.
- Xaman browser authorization is enabled for desktop and mobile.
- `Connect Xaman` calls the official browser SDK `authorize()` flow:
  - desktop: Xaman owns the authorization QR;
  - mobile: Xaman may deeplink on the same device.
- Connected mode is consistently `xaman`.
- Open offers are loaded with validated `account_offers`.
- Public-address inspection remains a separate read-only path and cannot cancel.
- Every cancellation remains one `OfferCancel` with exact `OfferSequence`, bounded `LastLedgerSequence`, six-digit challenge, SHA-256 intent, Xaman review, validated `tesSUCCESS`, and critical-field comparison.
- Desktop `Clear Open Offers` may orchestrate the bounded sequential queue; each offer still requires its own Xaman approval.
- Mobile continues with individual cancellations because each signing deeplink temporarily leaves the browser.
- The permanent page-link QR remains removed. Transaction QR images come only from Xaman payload responses.

## Verification

- All five executable inline scripts compiled successfully after the repair.
- GitLab repository validation, secret detection, Semgrep SAST and Pages deployment passed.
- Pipeline `2863838957` completed successfully.
- No live wallet signature or OfferCancel transaction was executed by the assistant environment.

## Operating rules

- Do not restore a static page URL QR as a wallet QR.
- Do not reintroduce `xaman-mobile` as a separate cancellation permission state.
- Public address inspection is read-only; signing authority comes only from the Xaman-authorized account.
- An offer is "currently open" because validated `account_offers` returns it. Do not infer its age from that response.
- Clearing an offer releases that order's commitment and can lower OwnerCount; do not describe the website as returning funds it held.
