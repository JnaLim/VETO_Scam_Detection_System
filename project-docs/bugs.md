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
- Symptom: The circular check icons in the result page analysis list did not visually align with the first line of text when list items wrapped.
- Root cause: The list item had mixed inline text and a pseudo-element positioned manually, so the icon could not align predictably with the first text line.
- Fix: Wrapped each checklist line in `.result-check-text`, changed the list item to a two-column grid, and sized the icon column so the check circle aligns with the first text line while wrapped text stays in the text column.
- Verification: Ran `git diff --check`, served the static app with `python3 -m http.server 4173`, and confirmed `HTTP/1.0 200 OK` for `/`, `/app.js`, and `/styles.css`.
- Follow-up: None.

- Date: 2026-06-08
- Symptom: Highlighted term pills on the result page looked vertically off-center, especially the yellow suspicious-term pills.
- Root cause: The broad `.result-detail-box span` selector also matched `.result-term` pills inside the highlighted terms list, overriding the intended inline-flex pill layout with label-style block spacing.
- Fix: Scoped the label styles to `.result-detail-box > span` and explicitly centered `.result-term` pill content with inline-flex, `justify-content`, `line-height`, and zero inherited margin.
- Verification: Ran `git diff --check`, served the static app with `python3 -m http.server 4173`, and confirmed `HTTP/1.0 200 OK` for `/` and `/styles.css`.
- Follow-up: None.

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
