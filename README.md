# VETO Scam Detection System (Ongoing) 

VETO is a web-based scam detection prototype for a Final Year Project. The system is designed to help users check suspicious text, URLs, uploaded images, uploaded files, and voice content before they trust or respond to it.

The current repository contains a React + Vite frontend prototype. It demonstrates the planned user flow, result explanation, scan history, pricing prototype, settings page, contact support flow, and admin monitoring dashboard. It does not currently use a real backend, database, payment system, or trained production AI model.

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

## AI Model Scope

The system is planned to include three separate AI models. This section is ongoing and will be implemented progressively.

### 1. Text Model

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

## System Architecture

Current prototype:

```text
React + Vite frontend
        |
        |-- Mock login state
        |-- Mock scam checking flow
        |-- Mock pricing flow
        |-- Scan history
        |-- Local support messages
        |
Browser Storage
```

```text
React frontend
        |
Backend API
        |
Database + AI model services
        |
Text model / Image model / Voice model
```

## Technology Stack

## Planned Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Recharts

### Backend

* Python
* FastAPI
* REST API

### Database

* MySQL

### Text Scam Detection

* Scikit-learn
* TF-IDF Vectorizer
* Logistic Regression
* Naive Bayes
* Support Vector Machine (SVM)

### Image Tampering Detection

* TensorFlow
* Keras
* Transfer Learning
* MobileNetV2
* ResNet50
* OpenCV
* Pillow

### Voice Detection

* Librosa
* MFCC Feature Extraction
* Support Vector Machine (SVM)
* Random Forest

### Content Extraction

* EasyOCR / Tesseract OCR
* PyMuPDF / pdfplumber
* python-docx
* Speech-to-Text

### Data Processing and Model Evaluation

* Pandas
* NumPy
* Accuracy
* Precision
* Recall
* F1-score
* Confusion Matrix

### Authentication and Security

* Password Hashing
* Role-Based Access Control

### Development Tools

* Visual Studio Code
* GitHub
* Figma

## License

This repository is for academic Final Year Project development.
