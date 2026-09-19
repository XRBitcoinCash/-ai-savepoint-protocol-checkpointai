# XRPL Order Manager cleanup restore checkpoint — 2026-09-19

## Context

The current `limit-extraction.html` had regressed from the useful v3.2 behavior. Its desktop QR was a permanently embedded QR containing only the Order Manager page URL. It did not represent a Xaman authorization or a transaction payload, so it appeared stuck and could not function as the intended desktop signing handoff.

The user asked to restore the tool's actual purpose: find open/stagnant/forgotten XRPL offers, especially after testing or use of an abandoned/unused exchange interface, then cancel unwanted offers and return the offer-controlled funds and any released owner reserve to normal wallet availability.

Historical Library copies `limit-extraction-v3.0.0-copy-paste.txt`, `limit-extraction-v3.1.0-copy-paste.txt`, and `limit-extraction-v3.2.0-copy-paste.txt` were inspected before editing. The v3.2 design used Xaman's official QR/deeplink flow, bounded sequential OfferCancel, intent binding, validated tesSUCCESS and post-validation reserve/balance reporting.

## Production source

- GitLab project: `xrbitcoincash-group/xrbitcoincash-project`
- Branch: `master`
- File: `public/limit-extraction.html`
- Commit: `1c55229a71a7e21dc4181ff239847af5b4975a05`
- Rollback parent: `da9cfbf98feaa82690a5fead35be1354a7f4503d`
- Pipeline: `2863825712` — success

## Restored purpose

The page is now an **XRPL Open Order Cleanup & Manager**, not an XRBC Quick Buy surface.

Primary workflow:

1. Load a public XRPL classic address or deliberately connect Xaman.
2. Read the account's currently open offers using validated `account_offers`.
3. Review the visible open offers.
4. Cancel one offer, or on desktop use **Clear Open Offers** for a bounded sequential cleanup.
5. Every offer still receives its own `OfferCancel` transaction and Xaman approval.
6. Every submitted cancellation must reach validated `tesSUCCESS` and match the saved account, OfferSequence, challenge, intent digest and other protected fields.
7. After cleanup, compare OwnerCount and XRP balance and report estimated owner-reserve release when observable.

The page explicitly does **not** claim it can determine offer age from `account_offers`. It lists every offer that is still open; the user decides which are stale, forgotten or unwanted.

## Xaman / QR correction

- Removed the permanently embedded `desktopXamanQr` page-link QR.
- Desktop `Connect Xaman` now invokes the Xaman browser SDK. Xaman owns the authorization QR shown to the user.
- For each desktop OfferCancel, `createAndSubscribe` creates a real transaction payload and the page displays the official QR returned by Xaman (`created.refs.qr_png` / equivalent).
- Mobile uses the same Xaman flow as a same-device deeplink.
- The page never requests or stores a seed phrase, private key or recovery phrase.
- Xaman account identity is rechecked before signing.

## Cleanup control

- **Refresh Open Offers** reloads the validated `account_offers` state.
- **Clear Open Offers** is wired to the bounded `cancelAll()` queue on desktop.
- The configured cleanup cap is 25 offers per run.
- Each cancellation remains independently approved; the queue stops on rejection, failure, validation timeout or field mismatch.
- Mobile keeps individual cancellation because same-device Xaman navigation cannot safely complete a multi-request browser queue without returning between requests.

## Removed unrelated behavior

The Order Manager's XRBC Quick Buy / TrustSet UI and transaction code were removed. Dedicated XRBC trading/acquisition interfaces already exist elsewhere.

## Safety invariants

- Public address inspection is read-only and creates no signing authority.
- Offer cancellation writes are Mainnet-only.
- Every write receives a fresh six-digit challenge and SHA-256 intent binding.
- `OfferSequence` is a protected critical field.
- Submitted is not complete; validated `tesSUCCESS` plus intent-field matching is required.
- The website never holds the user's offer funds. Canceling the ledger offer makes the committed assets no longer committed to that offer. If OwnerCount falls, the corresponding XRPL owner-reserve requirement may also be released.
- Observed XRP balance changes can also include transaction fees or other ledger activity.

## Verification

- Required DOM IDs occur exactly once.
- Static handoff QR is absent.
- Official Xaman payload QR path is present.
- Public `account_offers`, individual `OfferCancel`, bounded cleanup queue, validated-result checks and OfferSequence critical-field matching are present.
- Quick Buy HTML and `buyXRBC` implementation are absent.
- GitLab pipeline `2863825712` passed repository validation, secret detection, Semgrep SAST and Pages deployment.

## Manual checks still useful

- Desktop: click **Connect Xaman** and confirm Xaman's authorization QR appears from the SDK.
- After connection: confirm currently open offers load.
- Desktop: cancel one test offer and confirm the per-transaction official QR updates for that payload.
- Confirm a validated cancel removes the offer from the refreshed list and the Results panel reports observed OwnerCount / balance effects.
- Mobile: confirm individual Cancel opens Xaman and returns for validation.
