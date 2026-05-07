# Project Agent Rules

This file is the main rule file for AI-assisted development in this working tree. Read it before making any code, documentation, workflow, or git changes.

## Required Reading

- Start every task by reading this file.
- Read the relevant project documentation before changing files, including `README.md`, nearby docs under `docs/`, and any relevant files under `project-docs/`.
- For upstream-facing work on Superpowers itself, also read `CLAUDE.md` and `.github/PULL_REQUEST_TEMPLATE.md`. Those files contain project-specific contribution rules that still apply.

## Working Style

- Understand the current code, docs, tests, and git state before editing.
- Keep changes focused on the user request.
- Preserve existing naming, folder structure, tone, and style unless the task explicitly requires a change.
- Prefer simple, maintainable, practical solutions.
- Do not rewrite large areas of the project without a clear need.
- Do not add dependencies unless the project already uses them or the need is clearly justified.
- Do not remove existing features unless explicitly requested.

## Thread Responsibilities

- The main control thread owns project understanding, task breakdown, coordination, integration, final verification, and user-facing summaries.
- Frontend threads own UI, component structure, styling, accessibility, and responsive behavior within assigned tasks.
- Backend threads own routes, services, validation, persistence, auth, and server-side error handling within assigned tasks.
- Bug-fixing threads own reproduction, root cause analysis, minimal fixes, regression checks, and bug notes.
- Each thread must stay inside its assigned responsibility and avoid unrelated changes.

## Task Flow

1. Inspect the current repository state and relevant project memory.
2. Break larger work into small, independent tasks.
3. Assign frontend, backend, or bug-fixing responsibilities when useful.
4. Use existing tests, docs, and patterns to guide the implementation.
5. Verify the result with the most relevant checks available.
6. Update `project-docs/` when the work changes project status, handover state, bug knowledge, or important decisions.
7. Summarize changed files, checks run, and any remaining risks.

## Worktrees, Branches, and Commits

- Use the main working tree for small, safe changes.
- Use a short-term git worktree for work that is independent, risky, large, or likely to conflict with other work.
- Name short-term branches clearly, such as `task/<short-description>` or `fix/<short-description>`.
- After a worktree task is complete, review the diff, run relevant checks, commit locally, merge back to `main`, and remove the temporary worktree when it is no longer needed.
- Keep commits focused and meaningful.
- Do not push, open pull requests, or publish changes unless the user explicitly asks for that step.
- When the user asks for cloud backup or synchronization, push the current `main` branch after verifying the local state.

## Project Memory

Use `project-docs/` as the project memory folder.

- Update `project-docs/status.md` when current project status, branch state, goals, or risks change.
- Update `project-docs/progress.md` after important work with what changed, why it changed, and how it was checked.
- Update `project-docs/handover.md` when there are unfinished tasks, useful context for the next thread, or operational notes.
- Update `project-docs/decisions.md` when an architectural, workflow, dependency, data, or user-flow decision is made.
- Update `project-docs/bugs.md` when a bug is investigated or fixed, including root cause and verification.
- Keep entries concise, dated, and useful to the next agent.

## Bug Fixing

- Reproduce or inspect the issue before applying a fix.
- Identify the likely root cause.
- Fix the smallest responsible surface, not just the visible symptom.
- Add or update tests when the risk justifies it.
- Record the bug cause, fix, and verification in `project-docs/bugs.md`.

## Verification

- Run the most relevant checks available for the change, such as tests, lint, type checks, or build commands.
- If checks fail, investigate instead of ignoring the failure.
- If a failure is unrelated to the current task, mention it clearly.
- Do not claim the code works unless it was checked or the reason is clear.

## Upstream Contribution Guardrails

This repository has strict upstream contribution expectations. For any change intended for the upstream Superpowers project:

- Read `CLAUDE.md` completely.
- Read and complete `.github/PULL_REQUEST_TEMPLATE.md` with real details.
- Search for existing open and closed PRs before opening a new one.
- Verify that the change solves a real problem and belongs in core.
- Show the complete diff to the user and get explicit approval before opening a PR.
