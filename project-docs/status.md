# Project Status

## Current State

- Repository: `obra/superpowers`
- Main project rule file: `AGENTS.md`
- Project memory folder: `project-docs/`
- Current prototype app: `scam-detection-web/`
- Current workflow change: static frontend prototype for a web-based scam detection system.

## Current Branch

- Branch: `main`
- Short-term worktrees: none active.

## Near-Term Goals

- Use `AGENTS.md` as the first-read rule file for future development tasks.
- Keep `project-docs/` updated after important work, bug fixes, handovers, and decisions.
- Preserve upstream Superpowers contribution rules in `CLAUDE.md`.
- Connect the frontend prototype to real OCR, STT, URL inspection, and ML classifier services when backend work begins.

## Known Risks

- This repo has strict upstream contribution expectations; changes intended for upstream must follow `CLAUDE.md` and the pull request template.
- Pushing to the remote should happen only after explicit user approval and local verification.
- `scam-detection-web/` currently uses browser-side mock analysis for frontend flow only; it is not a trained ML model.
- The prototype does not store sensitive content on a backend, but local history is stored in browser `localStorage`.
