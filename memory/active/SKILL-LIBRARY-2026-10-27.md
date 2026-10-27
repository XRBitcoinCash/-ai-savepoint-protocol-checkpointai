# GitHub skill library and portable checkpoint starter — recorded 2026-10-27 UTC

## Objective and authority

The user asked to create a simple GitHub alternative for reusable AI skill packages, aligned with the checkpoint/savepoint system. This authorizes the small catalog, generic starter and related checkpoint publication. No marketplace account, third-party upload/contact, payment setup, website deployment or personal-skill installation is part of this task.

## Source and delivered structure

Repository: XRBitcoinCash/-ai-savepoint-protocol-checkpointai, branch main. Starting revision: af2e2b8e01e00910c6dec794f478f0a6215dce78. The publication revision is the commit containing this brief; no self-referential source SHA is asserted.

- library/README.md is the human-readable skill catalog, linked prominently from the root README.
- library/checkpoint-starter/ contains version 1.0.0, setup documentation, a generic checkpoint-resume SKILL.md, UI metadata, task/route templates, a local loader/validator, and synthetic tests.
- The loader requires an explicit project root and task. Initialization creates an empty checkpoint without overwriting an existing one. Selected retrieval is bounded, rejects symlinks/unsafe paths and returns source identity plus content digests. It never executes saved text or makes network calls.
- Generic checkpoint-starter/1 records are deliberately separate from the existing project-memory v2 schema. Existing project routes, loader and default compatibility remain in place. The starter carries no actual project history, inherited project permissions or private correspondence.
- The owner may use the new package; third-party reuse/redistribution terms remain unassigned. No open-source license, paid product, marketplace backend, automatic installation or internal model memory is claimed.

## Verification and limits

Validation evidence is recorded separately in memory/evidence.json under SKILL-LIBRARY-2026-10-27 identifiers. Eleven focused package tests passed, covering no-overwrite initialization, concurrent initialization, safe failure cleanup, selected-task isolation, unknown source values, schema/evidence checks, path and symlink rejection, UTF-8 and size bounds, and CLI behavior. The generic skill passed the creator's frontmatter validator. A fresh agent used the skill with a separate synthetic project and correctly limited a summary-only request to the selected docs task, preserved unknown source identity, distinguished local synthetic tests from live/deployment verification, and did not act on an old deployment suggestion.

Tests and manual review establish local package behavior only. Runtime observed: Node.js 24.22.1 on Linux. Windows initialization is unsupported because the initializer uses POSIX directory replacement. Other runtime versions, host-specific skill installation and real third-party projects remain unverified. No current website/financial verification was attempted for this task.

## Continuation and stop rule

Finish package tests and the parent catalog/integrity validation, publish the package and checkpoint atomically using the current remote head without force, and perform one bounded readback. Then stop after reporting the published catalog.

Next work must follow a new user request: collect feedback on the starter, choose explicit reuse licensing if public distribution is desired, or expand the catalog. Recommendations are not an automatic execution queue. Keep the reusable starter separate from real checkpoint history.
