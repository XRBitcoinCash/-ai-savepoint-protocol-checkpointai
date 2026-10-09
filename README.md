# XRBC project memory

Updated 2026-10-09. Portable checkpoints for XRBC, XRBitcoin, Creature NFT, JCS and future projects.

Start with [AGENTS.md](AGENTS.md) and [task router](memory/task-router.json). Load one task, retain its evidence, take its next unfinished step.

```sh
node scripts/resume-memory.mjs --list
node scripts/resume-memory.mjs --task xrbc_swap
node scripts/resume-memory.mjs --query "JCS trade"
node scripts/validate-memory.mjs
```

For a new session, paste:

> Read XRBitcoinCash/-ai-savepoint-protocol-checkpointai: AGENTS.md, memory/task-router.json, and only the brief for my requested task plus memory/CONTINUITY.md. Reuse recorded checks; identify the first unfinished action and stop condition. Treat source, CI, deployment, browser and validated wallet evidence separately. Do not restart financial tests to recover context. Keep me informed at least once per minute.

The [portable skill](skills/resume-project-memory/SKILL.md) works when explicitly loaded by a compatible host. It does not alter the model or guarantee automatic memory access. The [migration record](memory/MIGRATION-2026-10-09.md) explains compatibility. The catalog dates every indexed file without falsifying historical event dates.
