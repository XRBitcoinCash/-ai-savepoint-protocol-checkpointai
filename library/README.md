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

This first version is a catalog and reusable starter. Sales, ratings, customer accounts and automated marketplace search are outside its scope.

## Licensing

The files under `library/checkpoint-starter/` are licensed under the [MIT License](checkpoint-starter/LICENSE), copyright 2026 XRBitcoinCash. MIT permits use, modification and distribution, including commercial use and resale, provided the required copyright and license notices are retained. The software is provided without warranty under the license terms.

This license covers only the reusable starter directory, including its code, skill, templates, tests and documentation. It does not relicense this catalog, the existing project-memory skill, checkpoint history or other repository files. Copy the starter's `LICENSE` with the package; a matching copy is included inside the standalone skill folder.
