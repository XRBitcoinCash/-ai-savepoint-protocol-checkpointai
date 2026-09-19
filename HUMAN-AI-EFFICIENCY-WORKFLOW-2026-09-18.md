# XRBitcoinCash Human–AI Efficiency Workflow

**Document ID:** `xrbc/human-ai-workflow/1.0.0`  
**Status:** Active  
**Created:** 2026-09-18  
**Scope:** XRBitcoinCash and explicitly requested related XRPL project work  
**Canonical memory repository:** `XRBitcoinCash/-ai-savepoint-protocol-checkpointai`

## Purpose

Use the combined strengths of the user and the AI model to produce the best practical result with the least unnecessary context transfer, repeated output, compute, bandwidth, and human search effort.

This is a model-agnostic operating protocol. It applies whether the active model is Sol, Pro, Astra, or another future model. It does not change safety rules, repository permissions, or the requirement for explicit authorization before writes that the user has not requested.

## Working principle

Do not make either side do work that the other side can perform more efficiently.

The user is comfortable performing exact manual repository edits when given precise instructions. The model is responsible for source inspection, organization, reasoning, exact targeting, replacement design, and verification.

For large files, especially the XRBitcoinCash homepage, do not make the user visually scan thousands of lines and do not make the model repeatedly reproduce the entire file when a bounded function-level edit will solve the task.

## Default workflow for contained code changes

1. **Identify the exact source**
   - State repository, branch, and full path.
   - Inspect the current source before proposing code.
   - Do not rely on an older snippet when the current file can be checked.

2. **Find the smallest safe edit boundary**
   - Prefer replacing an entire function, small CSS block, or clearly bounded component.
   - Avoid partial fragments when brace ownership or surrounding logic could be ambiguous.
   - Give an exact Ctrl+F/search anchor that is confirmed to exist in the current source.

3. **Give the user a surgical replacement**
   - Show the complete existing function/block when practical.
   - Show the complete replacement.
   - State the exact first and last lines or neighboring function names that should remain unchanged.
   - Do not ask the user to hunt through a large file without a precise anchor.

4. **Human applies the edit**
   - The user may make the exact change directly in GitHub/GitLab.
   - Do not duplicate the same edit through an automated write unless explicitly requested.

5. **Model verifies before commit**
   - Inspect the resulting current file supplied by the user or repository.
   - Confirm the new function/block occurs exactly where expected.
   - Search for remnants or duplicate copies of the old code.
   - Run the relevant syntax/static check when possible.
   - Check the immediate call sites and determine whether unrelated page functions were changed.
   - Clearly state whether the version is safe to commit and any remaining runtime/manual check.

6. **Commit only under the user's chosen workflow**
   - If the user is committing manually, stop at verification.
   - If the user explicitly asks the model to commit, perform the bounded repository write and report the exact commit.

## Large-file rule

For files on the order of many thousands of lines, such as `public/index.html`:

- retrieve/search only the relevant ranges first;
- avoid reproducing the whole file for one- or two-function changes;
- avoid repeatedly sending unchanged source through model context;
- use exact function names, stable identifiers, selectors, or unique strings as anchors;
- verify adjacent code after replacement;
- escalate to full-file generation only when the change spans many interdependent regions or mechanical automation is clearly safer.

A full-file rewrite is appropriate when:
- dozens of coordinated edits are required;
- the change affects broad structure or dependency ordering;
- a machine transformation can be tested reliably;
- manual editing would create more risk than it removes.

## Division of strengths

### Human
Best used for:
- repository navigation when the exact path is known;
- selecting and replacing a clearly bounded function/block;
- visual confirmation in GitHub/GitLab editors;
- final judgment about whether to commit/deploy;
- real-device and real-wallet observations that the model cannot directly experience.

### AI model
Best used for:
- locating exact code and dependencies;
- reducing a large codebase to the relevant region;
- mathematical and logical analysis;
- designing safe replacements;
- detecting duplicates, missing braces, stale code, and likely regressions;
- syntax/static verification;
- comparing before/after behavior;
- maintaining project continuity and non-goals.

## Efficiency rules

- Do not re-read or re-output 20,000 lines when 30–100 lines are sufficient.
- Prefer exact repository search and range reads over full-file transfer.
- Prefer one precise function replacement over many tiny manual edits when both solve the same issue.
- Prefer verification of the user's edit over regenerating the same file.
- Preserve known-working code outside the requested scope.
- Do not perform the same task in multiple models merely for reassurance; escalate only when the task complexity or risk justifies it.
- Carry forward concise evidence and failure information rather than full conversation transcripts.
- Separate architectural reasoning from mechanical editing so expensive reasoning is used only where it adds value.

## Quality rule

Efficiency must not replace correctness.

If a surgical edit cannot be isolated confidently, the model should use a broader inspection or generate/test the full affected artifact. If a change touches signing, wallet authorization, backend security, transaction construction, asset identity, liquidity math, or other high-impact behavior, verification depth should increase even if that uses more context or compute.

## XRBC-specific example established 2026-09-18

For the XRPL Liquidity Index token-image resolver in GitLab `public/index.html`, the effective workflow was:

1. inspect the current GitLab source;
2. locate the exact `safeMetadataIcon(value)` and `icon(token)` functions;
3. provide complete function replacements rather than approximate snippets;
4. user applies the replacements manually;
5. model re-reads the submitted current file;
6. verify each replacement occurs once, old fragments are absent, neighboring functions remain intact, and the containing JavaScript parses;
7. user commits only after verification.

This is the preferred pattern for future bounded edits of the same kind.

## Current operating sentence

**Model organizes, targets, reasons, and verifies. Human performs simple exact edits when that is cheaper and clearer. Use full automation only when it improves correctness or materially reduces human effort.**


## New-conversation bootstrap

For XRBitcoinCash and explicitly related XRPL project work, treat this GitHub memory repository as a secondary continuity layer whenever a new conversation starts.

1. Read `ai-memory.json`, then the canonical contract.
2. Read the current `latest_savepoint.record`.
3. Verify the active source-of-truth repository, branch, current commit, and relevant pipeline before editing.
4. Compare the user's request with current source first; do not duplicate or overwrite work that has already landed.
5. Reuse established project facts and decisions instead of making the user repeat known context.
6. Keep the change bounded, preserve unrelated working behavior, run the relevant checks, and write a concise savepoint.

Project-memory notes may also record working practices that make future model collaboration more reliable: evidence before action, current-source verification, exact file identity, rollback points, concise status reporting, and explicit separation of repository state, CI state, and live deployment state.

This is a project continuity mechanism, not a modification of model weights or model/system safeguards.
