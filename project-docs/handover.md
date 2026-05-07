# Handover Notes

## Current Handover

- Start future tasks by reading `AGENTS.md`, then relevant docs and `project-docs/`.
- Use the main thread for coordination and split frontend, backend, and bug-fixing work only when the task benefits from separation.
- Use short-term worktrees for risky or independent tasks.
- Update this file when leaving unfinished work or context that the next agent should know.
- The current scam detection frontend lives in `scam-detection-web/` and can be opened directly from `index.html`.
- The app is a frontend flow prototype. OCR, STT, URL safety checks, classifier scoring, and admin metrics are simulated in `app.js`.
- The VETO logo and hero illustration are copied into `scam-detection-web/assets/` so the prototype no longer depends on files outside the repo.

## Open Items

- Replace mock analysis with backend APIs for OCR, STT, URL safe checking, and the trained TF-IDF + Logistic Regression classifier.
- Add real persistence rules before storing any user-submitted content outside browser-local demo history.
