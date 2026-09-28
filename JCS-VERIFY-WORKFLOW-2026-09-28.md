# JCS verify page: accepted patch and delivery workflow

Updated: 2026-09-28. Source: explicit user acceptance of the existing-file preview/code workflow, followed by a request to correct only illogical, conflicting or outdated memory guidance.

## How to continue

1. Work on the page the user names. The current JCS scope is `verify.html`; leave the prayer map for a separate request.
2. Start from the latest complete file supplied or accepted by the user. Inspect relevant prior commits when recovering working behavior. Do not replace that accepted file with an older repository version or reconstruct a simpler page from memory.
3. Make a focused patch. Preserve the established sidebar/header, religious visual design, artwork, Scripture library, audio, local prayers, wallet integration and existing NFT behavior unless the request changes them. A request to simplify interaction does not mean strip the page's appearance or features.
4. Deliver the complete working HTML and a viewable preview with working **View code**, **Copy full HTML**, and **Download HTML** controls. These controls must expose the complete updated file, not only JavaScript or a snippet. Full-file delivery is compatible with a small patch; it does not mean a redesign.
5. Regenerate the embedded source snapshot after edits. Source exports must match the delivered file and exclude private runtime state such as a visitor's entered prayer or wallet details. Keep the preview's signing limitations explicit; a preview that does not run Xaman must not claim to connect or mint.
6. Name any required companion files and exact publish locations. Include their complete contents/downloads. Explain dependencies before calling the installation ready.
7. Run only an existing required gate or a focused check resolving a concrete changed risk. Reuse completed checks. Do not add broad audits, repeated live probes or optional suites. Never call a simulated wallet flow a real signed transaction.
8. The user commits application files. Do not write, merge or deploy application repositories unless asked. An explicit request to update this memory repository authorizes the bounded memory commit, not application deployment. Stop at the requested completion boundary.

This workflow supersedes the older rule restricting full-file delivery to broad multi-region edits. Bounded Ctrl+F replacements remain available when the user chooses that format. Current user instructions and applicable platform instructions take precedence over repository memory.

## Prepared verify.html state to preserve

The user accepted the workflow and authorized continued incremental work. This does not assert that every feature has been confirmed on their device.

- Artifact status: complete HTML delivered for manual commit; application commit/deployment and a real wallet signature remain unverified.
- Target repository: `XRBitcoinCash/JCS-token-on-the-XRPL`; intended site path: `https://jesuschristsavestoken.com/verify.html`. Verify the actual target branch/head before a later repository write.
- Accepted HTML SHA-256: `35eb6fffae7273d58ed5ba60fb7735f0e0d15c866bbb8613780f121e30f1027e` (590,212 bytes). This identifies the delivered candidate, not a production commit. Retrieve the latest supplied/accepted artifact before continuing; do not assume an old download or live page has these bytes.
- Xaman public app key: `5b8499a9-ae28-4050-ac09-45efa948eced`; browser SDK used by the accepted page: `https://xaman.app/assets/cdn/xumm.min.js`. Keep JCS identity separate from XRBC, XRBitcoin and Creature apps. Authorization begins from the deliberate click; cancel/timeout invalidate late responses. Connection alone does not create a transaction.
- The complete prayer is UTF-8 text in the mint transaction's `msg` memo, with its content hash and optional details. The current page limits NFT text to 320 characters and separately checks serialized memo bytes. The page's character limit is not a universal ledger character limit.
- Ledger limits used by this implementation: 256-byte NFT URI; 1,024 bytes for all serialized transaction memos, including field overhead. Preserve the per-transaction budget calculation.
- NFT mint and optional one-drop registry publication are separate validated transactions. Preserve mint-only receipt display, registry continuation, pending/ambiguous request recovery and duplicate-mint prevention. Display success only after validated `tesSUCCESS`, account and critical-field comparison.
- Local prayers require no wallet. Preserve the separation between approximate country suggestion and consent to publish location details; never add raw IP addresses to the ledger.
- Keep page metadata, NFT display metadata and transaction memos separate. The display metadata has one inert `application/json` block, `jcs-prayer-nft-metadata`, parsed once inside the existing closure. View/copy/download and hosted validation share this data. Do not add another wallet initialization, duplicate listener, constant or DOM ID.
- The metadata companion is **`jcs-prayer-nft-v1.json`**, published at **`https://jesuschristsavestoken.com/jcs-prayer-nft-v1.json`**, beside `verify.html` at the site's root. SHA-256: `07b8f29a8d0d042784765475c5ae08374e63307f16104906059c80a140404179`. It supplies shared collection name/description and `https://jesuschristsavestoken.com/jcs-logo.png`; individual prayer words remain in validated mint memos.
- Embedding JSON in HTML does not serve that separate JSON URL. The reported HTTP 404 is a missing public dependency, not proof the wallet API is wrong. Keep the pre-mint JSON/artwork check; do not suppress it to make a broken NFT appear ready. Existing NFTs retain their original URI.
- Recorded checks: unchanged HTML head metadata, unique IDs, inline JS syntax, exact full-source view/copy/download, metadata exports/fallback, malformed-metadata isolation and mocked prayer/NFT recovery flows passed. No live signature or production deployment was performed. Reuse these results for unchanged behavior; they do not guarantee wallet/explorer display.

Do not substitute the LP receipt backend/policy for prayer NFTs. LP receipts and prayer witnesses have different data and transaction requirements; recover the appropriate page-specific implementation.

## Memory correction boundaries

The existing September 25 search-discovery savepoint and all historical records remain intact. Its latest pointer omitted `next_issue`, `observed_frontend_commit`, and `observed_backend_commit`; these were restored from the linked savepoint without inventing new observations. Historical Bing and XRB queues apply when that topic is requested, not as an instruction to abandon current JCS work.

Older blanket reproduction/test/checkpoint and post-deployment instructions are replaced by the current narrow-check and stop rules in `memory/operating-protocol.json`. No claim is made that a model tier caused the defects or that repository files can force internal memory or model settings.
