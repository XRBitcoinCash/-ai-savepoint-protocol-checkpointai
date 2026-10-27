# Checkpoint Resume starter

Version 1.0.0. Save a compact task handoff in your own repository, then give an assistant just the context needed to resume it.

The starter contains a portable skill, a dependency-free Node.js command, task templates and synthetic tests. It makes no network calls and never executes instructions or commands stored in a checkpoint. A compatible assistant must explicitly load the skill or read the files; this is external project memory, not automatic recall inside a model.

Runtime tested: Node.js 24.22.1 on Linux. Initialization uses POSIX directory replacement and is not supported on Windows in this release. Other runtime versions and operating systems have not been verified. The Markdown/JSON handoff procedure also works without the CLI.

## Start with an empty checkpoint

Copy this entire `checkpoint-starter` directory to a convenient local location. Keep it separate from your project's saved task state. Use an installed Node.js runtime to run the following, replacing both example paths:

```sh
node /path/to/checkpoint-starter/skills/checkpoint-resume/scripts/checkpoint.mjs --root /path/to/your-project --init
```

The project directory must already exist. Initialization creates only `checkpoint/` inside it, with a continuity guide, an empty router and task/evidence directories. It refuses to overwrite an existing checkpoint. No Git commit, push, account connection or deployment is performed.

1. Copy `skills/checkpoint-resume/assets/task.md` to your project's `checkpoint/tasks/your-task.md` and fill it with the actual objective, current authority, observations and one next action.
2. Add a route to `checkpoint/task-router.json` using `skills/checkpoint-resume/assets/route.json` as the route value. Use a descriptive task ID and matching brief path. Keep unknown repository, branch and revision values `null`.
3. Validate the checkpoint, review the files for private data, then commit the intended checkpoint files to your own repository through your normal workflow.

For example, a new router can look like this after you have written the brief:

```json
{
  "schema_version": "checkpoint-starter/1",
  "routes": {
    "your-task": {
      "title": "Replace with your actual task",
      "read": ["checkpoint/tasks/your-task.md"],
      "source": {"repository": null, "branch": null, "revision": null},
      "evidence": null
    }
  }
}
```

The starter schema is intentionally separate from the established project-memory schema in the parent repository. It is not a drop-in migration of that system.

## Resume and validate

Use the same explicit project path each time:

```sh
node /path/to/checkpoint-starter/skills/checkpoint-resume/scripts/checkpoint.mjs --root /path/to/your-project --list
node /path/to/checkpoint-starter/skills/checkpoint-resume/scripts/checkpoint.mjs --root /path/to/your-project --task your-task
node /path/to/checkpoint-starter/skills/checkpoint-resume/scripts/checkpoint.mjs --root /path/to/your-project --validate
```

`--list` shows the available tasks. `--task` reads only the selected brief, shared continuity guide and that task's optional evidence. Its JSON output includes source identity and SHA-256 fingerprints. There is no default task or automatic execution. If the task is unclear, list the choices before resuming.

`--validate` checks the router and every referenced record for structural problems. Paths must remain inside the checkpoint, symlinks are rejected, and a task bundle must fit within 32 KiB. Validation cannot prove that a recorded result is truthful or that a deployed application still works. A fingerprint identifies content; it is not a trust certificate.

For an assistant, explicitly load `skills/checkpoint-resume/SKILL.md` using your host's supported mechanism, then ask:

> Use Checkpoint Resume for my project at /path/to/your-project. Load task your-task, summarize its current state, and identify the next unfinished action within my current request.

Without Node.js, read the router and only the selected task's files manually at one known Git revision. The same procedure still applies.

## Record evidence when you have it

A route may point to `checkpoint/evidence/your-task.json`. This file contains an array; `[]` means no evidence has been recorded. Each real record requires these fields:

| Field | Value |
| --- | --- |
| `id` | A unique, meaningful string within that file |
| `kind` | `source`, `synthetic`, `ci`, `deployment`, `browser` or `manual` |
| `status` | `passed`, `failed`, `pending` or `unknown` |
| `source_revision` | Observed revision string, or `null` when unknown |
| `recorded_at` | Actual UTC timestamp, such as the value returned by `new Date().toISOString()` |
| `scope` | What was checked and what the result establishes |
| `reference` | Reviewable result location, or `null` |
| `limitations` | What remains unverified; an empty string is allowed |

Keep source checks, synthetic tests, CI, deployment and live observations distinct. Reuse relevant evidence after assessing its inputs and limits. Do not rerun work merely because the assistant or conversation changed, and do not treat old results as current live verification.

## Maintain the package

From this starter directory, run:

```sh
node --test tests/checkpoint.test.mjs
```

Keep actual task records in the receiving project's `checkpoint/` directory. Any distribution package should contain only this starter's generic files, never a working project's checkpoints, secrets, raw correspondence or transcripts.

## License

The generic files in this directory are licensed under the [MIT License](LICENSE), copyright 2026 XRBitcoinCash. You may use, modify, share and sell copies, including as part of a commercial product, provided the required copyright and license notices remain included. The software is provided without warranty under the license terms.

Keep `LICENSE` when copying or distributing the starter. The standalone `skills/checkpoint-resume/` folder includes an identical license so its notice travels with the skill when copied separately.

This license applies to this starter's code, skill, templates, tests and documentation. It does not change licensing for other parts of the parent repository or grant rights to separately supplied user data in a receiving project's checkpoints.
