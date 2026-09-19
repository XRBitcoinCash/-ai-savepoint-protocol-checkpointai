# XRBitcoinCash footer compaction checkpoint — 2026-09-18

## Context

The user identified the homepage footer as visually oversized and disordered, with unnecessary empty space beneath the official-domain area. The requested direction was to keep the substantive safety/legal disclosures, convert the presentation to compact fine print, retain only Support, Policy & security, Terms, White paper, and Project provenance links, and give the footer a subtle technical/XRPL visual cue.

This conversation also reaffirmed the GitHub memory repository as a secondary project-memory layer. At the start of a new XRBitcoinCash project conversation, the assistant should use the canonical memory, latest savepoint, and current repository state to regain continuity before editing.

## Production source

- Active frontend source: GitLab `xrbitcoincash-group/xrbitcoincash-project`
- Branch: `master`
- Homepage: `public/index.html`
- Footer commit: `3110da635cc487f9111d59f30233724e2d343928`
- Parent / rollback point: `b3c01cb9df17ca95a2536e45ec956f90a64bf536`
- GitLab pipeline: `2863060698` — **success**

## Footer changes

- Replaced the tall multi-section footer with one compact `.xrbc-footer-panel`.
- Kept XRBC identity facts but reorganized them into a tight grid so the official-domain area does not leave a large blank column.
- Preserved four disclosure areas as fine print: Security, Ledger data, AI-assisted review, and Risk & legal.
- Retained only these footer links:
  - Support
  - Policy & security
  - Terms
  - White paper
  - Project provenance
- Removed redundant related-project navigation and repeated long-form footer copy.
- Added a subdued dark terminal/XRPL background with green grid accents, compact border treatment, and responsive two-column / one-column fallbacks.
- No wallet, Xaman, order, AMM, trading, holding-gate, proxy, or transaction behavior was intentionally changed.

## New-conversation continuity rule

For XRBitcoinCash and explicitly related XRPL project work, a new conversation should begin by:

1. Reading `ai-memory.json`.
2. Reading `AI-SAVEPOINT-PROTOCOL-CHECKPOINT-TIA.md`.
3. Reading the `latest_savepoint.record`.
4. Checking the active source-of-truth repository, branch, current commit, and relevant pipeline before editing.
5. Comparing the user's new request against current code to avoid redoing or overwriting a change that is already present.
6. Reusing established project facts and decisions instead of asking the user to repeat them.
7. Recording a concise new savepoint after a meaningful completed change.

This repository memory is a project continuity aid. It does not alter model weights or bypass model/system safeguards. Useful model-working notes should focus on evidence, continuity, error reduction, bounded edits, and preserving verified working paths.

## Preserve

- GitLab remains the active frontend source of record; GitHub is the mirror/backend/discovery surface unless a current savepoint says otherwise.
- Keep the compact Coinbase-like information density across the homepage.
- Preserve public wallet-free browsing and established XRBC holding gates.
- Do not couple footer/media presentation work to signing, trading, proxy, or ledger execution logic.
- Treat successful repository edits, CI success, and live public rendering as separate verification stages.

## Next check

- After deployment/mirror propagation, visually check the compact footer at desktop and mobile widths.
