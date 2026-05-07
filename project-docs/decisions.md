# Decision Log

## 2026-05-07 - Use AGENTS.md as the main project rule file

- Decision: `AGENTS.md` is the primary rule file for AI-assisted development in this working tree.
- Reason: The workflow needs a stable first-read file for all future agent threads.
- Outcome: `AGENTS.md` now defines the development workflow and points upstream contribution work to `CLAUDE.md`.

## 2026-05-07 - Use project-docs/ as project memory

- Decision: `project-docs/` stores status, progress, handover notes, decisions, and bug knowledge.
- Reason: Future main, frontend, backend, and bug-fixing threads need a shared memory folder.
- Outcome: Added initial memory files and update expectations.

## 2026-05-07 - Keep this setup docs-only

- Decision: Do not add workflow scripts or full automation for this setup.
- Reason: The requested first version is a lightweight documentation workflow.
- Outcome: No dependencies, scripts, or automation files were added.
