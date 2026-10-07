# JCS live debugging handoff — 2026-10-07 UTC

The user moved from Creature NFT to JCS as the fourth project and asked for logical, bounded debugging. The application repository is `XRBitcoinCash/JCS-token-on-the-XRPL`; the observed `main` head is `c6897c9b9c91f7219af184f2da95d3491c33f6d9`. Treat this as a source checkpoint, not a claim that either draft fix is deployed. The September 30 Observatory and September 28 verify records remain historical context; inspect current source before editing.

## Live observations

- The homepage showed market data and a 25 JCS quote. The Observatory displayed source-aware cards but its account history stopped at a 200-transaction quota boundary. Draft [PR #2](https://github.com/XRBitcoinCash/JCS-token-on-the-XRPL/pull/2) proposes one-page, resumable, snapshot-pinned history with honest partial counts and cooldown. It is open, clean and **not deployed**; four focused tests and syntax checks passed locally.
- Prayer Map rendered its historical dataset and a selected country's sourced figures. The separate current-news panel reported “Failed to fetch” and labeled the reporting source unavailable. No map application change was made.
- Sign the Ledger connected to Xaman through SignIn. The live page displayed a connected wallet and explicitly required separate mint and registry approvals. A supplied prayer starter filled its text and Jeremiah 29:11 reference; the preview and 1,024-byte memo budget updated. The test draft was cleared. No mint, registry payment or other wallet transaction was submitted.
- The public feed loaded 7 supported prayers after 600 validated collector transactions across three pages; its XRPL endpoint then said “You are placing too much load on the server.” “Load older prayers” preserved the partial count and marker but met the same limit. Draft [PR #3](https://github.com/XRBitcoinCash/JCS-token-on-the-XRPL/pull/3) changes the initial and manual reads to one 200-transaction page per action, pauses retries 30 seconds on quota errors, and retains the pinned marker/entries. It is open, clean and **not deployed**; three focused pagination/quota cases and inline JS syntax passed locally.

## Boundaries and next action

PR #2 head `7535310c9baa55036cc4a3510da321c794f6b817` changes `metrics.html`, `js/jcs-metrics-ledger.js`, `js/jcs-metrics.js`, and one test. PR #3 head `c136893c6f0a1525dbafd081e185ad455c58b6ba` changes `verify.html` and one test. Both target the observed `main` head above, are draft review candidates, and have no CI run. Their live corrected behavior is unverified.

The current verify source has pending-request recovery and compares validated mint account, transaction type, taxon, URI, flags and memos; registry publication requires a separate validated payment. This is source assessment, not a real signature test of this revision. The hosted NFT metadata URL was not confirmed through a live fetch in this pass. Existing on-ledger prayer records show earlier successful mints/registry entries but do not prove the current preflight or future signing.

Next, review the two small PRs and use the owner's chosen release workflow. After a later explicit continuation, test their live pagination and cooldown once; do not replay financial transactions merely to establish continuity. Under the standing instruction, stop tools immediately when a requested website deployment succeeds. Preserve existing working wallet JSON, asset identity and signing guards.
