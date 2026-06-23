# VETO Scam Detection System

VETO is a web-based scam detection prototype for a Final Year Project. The system is designed to help users check suspicious text, URLs, uploaded images, uploaded files, and voice content before they trust or respond to it.

The current repository contains a React + Vite frontend prototype. It demonstrates the planned user flow, result explanation, scan history, pricing prototype, settings page, contact support flow, and admin monitoring dashboard. It does not currently use a real backend, database, payment system, or trained production AI model.

## System Summary

| Item | Description |
| --- | --- |
| System name | VETO Scam Detection System |
| System type | Web-based scam detection prototype |
| Main users | Normal users and system administrator |
| Frontend framework | React + Vite |
| Routing | React Router |
| Storage used now | Browser `localStorage` only |
| Real database | Not implemented yet |
| Real authentication | Not implemented yet |
| Real payment | Not implemented yet |
| Current AI status | Mock/prototype logic for frontend demonstration |

## What This System Does

VETO is planned as a multi-input scam detection system. The system supports a login-first user flow and separates normal user pages from admin monitoring pages.

Current prototype functions include:

1. User login and logout prototype.
2. Admin login and logout prototype.
3. Scam checking page for text, image, voice, and URL input.
4. Result page with risk status, risk score, explanation, highlighted terms, and recommended action.
5. Scan history using browser local storage.
6. Scam Types page with scam category information.
7. Guide page with scam prevention and recovery guidance.
8. FAQ and legal information pages.
9. Settings page for mock personal details.
10. Upgrade Plan page with Free, Student, and Pro prototype plans.
11. Contact Support modal that stores messages in local storage.
12. Admin Dashboard for mock system monitoring, model metrics, system logs, and support messages.

## Quantitative Prototype Details

| Area | Current value shown in prototype |
| --- | --- |
| Pricing plans | 3 plans: Free, Student, Pro |
| Free plan price | RM0 |
| Student plan price | RM9/month |
| Pro plan price | RM19/month |
| User current plan | Free Plan |
| Daily checks used example | 7 / 10 |
| Monthly checks used example | 84 / 300 |
| Admin total scans example | 12,840 |
| Admin flagged scams example | 3,218 |
| Admin safe results example | 8,974 |
| Admin error count example | 42 |
| Model accuracy example | 94.2% |
| Model precision example | 92.8% |
| Model recall example | 91.5% |
| Model F1-score example | 92.1% |
| Evaluation samples example | 2,400 |
| Scam categories example | 8 |

These values are mock numbers for prototype demonstration and can be replaced with real data when backend and machine learning integration are added.

## User Manual

### 1. Run the System Locally

```bash
cd scam-detection-web
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

To create a production build:

```bash
npm run build
```

### 2. User Flow

1. Open the website.
2. The first page is the User Login page.
3. Enter any email and password.
4. Click Login.
5. The system redirects to the main VETO homepage.
6. Use Check Now to submit text, image, voice, or URL content.
7. View the scam detection result and explanation.
8. Open View History from the user menu to see previous checks.
9. Open Settings to view and edit mock personal details.
10. Open Upgrade plan to compare plans.
11. Use Contact Support in the footer to send a prototype support message.

### 3. Admin Flow

1. Open `/admin-login`.
2. Enter any admin email, password, and access code.
3. Click Login.
4. The system redirects to `/admin`.
5. Admin can view:
   - Total scans
   - Flagged scams
   - Safe results
   - Error count
   - Model performance
   - Model version
   - System logs
   - Support messages submitted by users

### 4. Contact Support Flow

1. Click Contact Support in the footer.
2. Enter Subject and Message.
3. Click Send Message.
4. The modal shows a VETO-style Sending Message loading state.
5. The message is saved to `localStorage` under `vetoSupportMessages`.
6. The modal shows `Your message has been sent.` and closes automatically.
7. Admin can view the message in the Admin Dashboard.

## Current Storage

The prototype uses browser `localStorage` only.

| Key | Purpose |
| --- | --- |
| `vetoUserLoggedIn` | Mock user login state |
| `vetoAdminLoggedIn` | Mock admin login state |
| `vetoSupportMessages` | Mock Contact Support messages |
| Scan history storage | Stores local scan history in the browser |

This means data is stored only in the user's browser. There is no central database yet.

## Planned AI Model Scope

The system is planned to include three separate AI models. This section is ongoing and will be implemented progressively.

### 1. Text Model

Status: Ongoing

Purpose:
- Detect scam / not scam.
- Classify scam category.

Planned algorithm:
- TF-IDF + Logistic Regression.

Comparison models:
- Naive Bayes.
- SVM.

Scope:
- Typed text input.
- Uploaded file input, where text will be extracted and analysed by the text model.

Expected output:
- Scam / not scam prediction.
- Scam category.
- Explainable result details.

### 2. Image Model

Status: Ongoing

Purpose:
- Detect whether a scam-related image or payment screenshot is authentic or tampered.

Possible algorithm:
- CNN / Transfer Learning.
- Example models: MobileNetV2 or ResNet50.

Scope:
- Classify image as authentic or tampered.
- Use OCR to extract text from the image.
- Analyse the extracted text using the text scam detection model.
- First version focuses on authentic / tampered classification only.
- Exact edited area highlighting can be a future enhancement.

Expected output:
- Authentic / tampered prediction.
- Extracted OCR text.
- Scam risk result from extracted text.

### 3. Voice Model

Status: Ongoing

Purpose:
- Detect whether an uploaded voice file is human voice or bot / AI-generated voice.

Possible algorithm:
- MFCC feature extraction with SVM or Random Forest.

Scope:
- Classify voice as human or bot / AI-generated.
- Convert voice into text using speech-to-text.
- Analyse the transcript using the text scam detection model.
- First version focuses on uploaded voice files only.

Expected output:
- Human / bot or AI-generated voice prediction.
- Speech-to-text transcript.
- Scam risk result from transcript.

## Planned System Architecture

Current prototype:

```text
React + Vite frontend
        |
        |-- Mock login state
        |-- Mock scam checking flow
        |-- Mock pricing flow
        |-- Local scan history
        |-- Local support messages
        |
Browser localStorage
```

Planned future system:

```text
React frontend
        |
Backend API
        |
Database + AI model services
        |
Text model / Image model / Voice model
```

## Important Prototype Notes

- No real account verification is performed.
- No real admin authentication is performed.
- No real database is connected.
- No real payment is processed.
- No real email is sent from Contact Support.
- Current detection results are for prototype demonstration.
- The AI model implementation is ongoing.

## Folder Structure

```text
FYP/
├── scam-detection-web/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── sections/
│   │   ├── utils/
│   │   └── views/
│   ├── assets/
│   ├── index.html
│   ├── package.json
│   ├── styles.css
│   └── vite.config.js
├── project-docs/
└── README.md
```

## Technology Stack

- React
- Vite
- React Router
- JavaScript
- CSS
- Browser localStorage

## Development Status

Current status: Frontend prototype completed and ongoing AI/backend integration planned.

Next planned work:

1. Prepare dataset for text scam classification.
2. Train and evaluate TF-IDF + Logistic Regression text model.
3. Compare text model performance against Naive Bayes and SVM.
4. Add OCR pipeline for image input.
5. Add image tamper/authentic classifier.
6. Add speech-to-text pipeline for voice input.
7. Add voice human/bot classifier.
8. Design backend API and database schema.
9. Connect frontend to backend and model services.

## License

This repository is for academic Final Year Project development.
