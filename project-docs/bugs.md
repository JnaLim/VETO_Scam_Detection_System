# Bug Log

Use this file to record bug investigations and fixes.

## Template

- Date:
- Symptom:
- Root cause:
- Fix:
- Verification:
- Follow-up:

## Known Bugs

- Date: 2026-06-05
- Symptom: Checking content jumped directly to the result page, so the expected loading screen was missing.
- Root cause: The form submit handler called `classifyContent`, saved history, rendered the result, and changed the route immediately without an intermediate loading state.
- Fix: Added a shared form loading state for the homepage quick panel and main Check page, including a blurred panel, spinner, progress bar, disabled controls, and a short simulated analysis delay before rendering results.
- Verification: Ran `git diff --check`, served the static app with `python3 -m http.server 4173`, and confirmed `HTTP/1.0 200 OK` for `/`, `/app.js`, and `/styles.css`.
- Follow-up: Replace the simulated delay with real backend/OCR/STT/model progress when those services are integrated.
