# AI Savepoint Protocol: checkpoints and skills

Save useful project context in GitHub, then resume one task with its source, evidence and next action intact.

**New here? Start with the [skill library](library/README.md) and [portable checkpoint starter](library/checkpoint-starter/README.md).** The starter is separate from the project-specific records below and can be copied into another project. It needs no marketplace account, payment service or hosted backend.

## Existing project memory

Updated 2026-10-12. Portable checkpoints for XRBC, XRBitcoin, Creature NFT, JCS and future projects.

Start with [AGENTS.md](AGENTS.md) and [task router](memory/task-router.json). Load one task, retain its evidence, take its next unfinished step.

[Portable working memory 6.1](memory/CONTINUITY.md#portable-working-memory-61) is the shared, model-neutral handoff section, included in every task bundle. The version-2 schemas remain unchanged. The [current memory handoff](memory/active/MEMORY-SYSTEM-2026-10-12.md) records this session; the [XRPL.to advisory checkpoint](memory/active/XRPL-TO-READONLY-2026-10-12.md) preserves the read-only permission and explicit no-deployment boundary.

The current [Tokenization XLS handoff](memory/active/XRBC-TOKENIZATION-XLS-2026-10-12.md) records reviewed MR !96: mutable/linked evidence NFTs, new-MPT escrow permission, unsigned Batch workflows and public predecessor links. Candidate CI passed 391 tests; the user authorized deployment after review. This checkpoint precedes deployment, so resolve the merged Pages build before later browser/wallet testing. The [broader roadmap](memory/active/XRBC-XLS-ROADMAP-2026-10-12.md) preserves earlier sequencing and eligibility findings. Its [shared contract](memory/contracts/XLS-UPGRADE-CONTRACT.md) keeps evidence/signing decisions consistent. The 2,500 XRBC holding gate is not a liquidity deposit or legal credential.

```sh
node scripts/resume-memory.mjs --list
node scripts/resume-memory.mjs --task xrbc_swap
node scripts/resume-memory.mjs --task xrpl_to
node scripts/resume-memory.mjs --task xrbc_xls_upgrade
node scripts/resume-memory.mjs --query "JCS trade"
node scripts/validate-memory.mjs
```

For a new session, paste:

> Read XRBitcoinCash/-ai-savepoint-protocol-checkpointai: AGENTS.md, memory/task-router.json, and only the brief for my requested task plus memory/CONTINUITY.md. Reuse recorded checks; identify the first unfinished action and stop condition. Treat source, CI, deployment, browser and validated wallet evidence separately. Do not restart financial tests to recover context. Keep me informed at least once per minute.

The [portable skill](skills/resume-project-memory/SKILL.md) works when explicitly loaded by a compatible host. It does not alter the model or guarantee automatic memory access. The [migration record](memory/MIGRATION-2026-10-09.md) explains compatibility. The catalog dates every indexed file without falsifying historical event dates.
