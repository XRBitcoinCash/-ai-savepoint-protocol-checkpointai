# AI Savepoint skill library

A small GitHub catalog of instructions and tools for saving project context and resuming work. Each entry links to readable files; the catalog itself requires no account system or hosted service.

| Package | Purpose | Audience |
| --- | --- | --- |
| [Checkpoint Resume starter](checkpoint-starter/README.md) | Create a clean checkpoint, load one task, and validate its records | Developers adapting the method to their own projects |
| [Existing project memory skill](../skills/resume-project-memory/SKILL.md) | Resume this repository's established project routes and constraints | Maintainers of the existing XRBC checkpoint system |

Start with **Checkpoint Resume** for a new project. Copy only `library/checkpoint-starter/`; the rest of this repository contains project-specific history. The generic starter does not replace the existing router or install itself into an assistant.

## What a package contains

- A `SKILL.md` with the agent's procedure and usage triggers.
- Plain templates for task state and source identity.
- A small local loader/validator and its tests.
- Human-readable setup instructions and a version number.

To propose another entry, add a self-contained package with a clear purpose, dependencies, permission boundaries, meaningful validation and explicit licensing terms, then add its link here. Do not include live project records in a reusable package.

This first version is a catalog and reusable starter. Sales, ratings, customer accounts and automated marketplace search are outside its scope. Repository licensing is unchanged. The owner can use this starter now; third-party reuse and redistribution terms remain to be chosen. No open-source license is implied.
