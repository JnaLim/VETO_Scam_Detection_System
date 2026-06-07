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

- Date: 2026-06-08
- Symptom: The result page action button did not reliably take users straight to the main checking page.
- Root cause: The rendered result action used an inline `location.hash='check'` assignment instead of the app's navigation flow, so the route transition was brittle.
- Fix: Replaced the inline handler with a `data-start-check` action and shared navigation helper that opens the standalone `#check` view directly.
- Verification: Ran `git diff --check`, confirmed the new handler exists and the old inline handler is removed with `rg`, served the static app with `python3 -m http.server 4173`, and confirmed `HTTP/1.0 200 OK` for `/`, `/app.js`, and `/styles.css`. `node --check` could not run because `node` is not installed.
- Follow-up: None.

- Date: 2026-06-05
- Symptom: Checking content jumped directly to the result page, so the expected loading screen was missing.
- Root cause: The form submit handler called `classifyContent`, saved history, rendered the result, and changed the route immediately without an intermediate loading state.
- Fix: Added a shared form loading state for the homepage quick panel and main Check page, including a blurred panel, spinner, progress bar, disabled controls, and a short simulated analysis delay before rendering results.
- Verification: Ran `git diff --check`, served the static app with `python3 -m http.server 4173`, and confirmed `HTTP/1.0 200 OK` for `/`, `/app.js`, and `/styles.css`.
- Follow-up: Replace the simulated delay with real backend/OCR/STT/model progress when those services are integrated.
