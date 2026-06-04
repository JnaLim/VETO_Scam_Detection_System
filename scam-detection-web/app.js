const state = {
  activeTab: "text",
  latestResult: null,
};

const keywordPatterns = [
  "urgent",
  "verify",
  "otp",
  "password",
  "bank account",
  "suspended",
  "claim",
  "reward",
  "prize",
  "click",
  "limited time",
  "apk",
  "login",
  "confirm your details",
];

const highRiskTerms = new Set([
  "otp",
  "password",
  "bank account",
  "suspended",
  "apk",
  "confirm your details",
]);

const suspiciousDomains = ["bit.ly", "tinyurl", "t.co", "grab-prize", "verify-login"];

const scamTypeDetails = {
  romance: {
    title: "Romance Scam",
    summary: "Scammers build fake emotional relationships to gain trust and ask for money.",
    details: [
      "The scammer pretends to be caring, loving, and serious about the relationship.",
      "They often avoid real-life meetings or video calls and create excuses.",
      "After trust is built, they ask for money due to emergencies, travel issues, or investments.",
      "Victims are pressured to act quickly and keep the relationship private.",
    ],
  },
  phishing: {
    title: "Phishing",
    summary: "Fake emails, texts, or websites are used to steal login credentials and personal data.",
    details: [
      "Messages often look official and may copy trusted brands or services.",
      "They ask you to click a link, verify an account, or update payment information.",
      "The fake page is designed to capture usernames, passwords, or card details.",
      "Always check the sender, URL, and spelling before interacting.",
    ],
  },
  "customer-service": {
    title: "Customer Service Scam",
    summary: "Fraudsters pose as support teams or fake sellers to trick users into making payments.",
    details: [
      "They claim there is a problem with your order or account.",
      "They may ask you to pay extra fees, share OTP codes, or install remote apps.",
      "The message often looks urgent to stop you from thinking carefully.",
      "Always verify directly through the official app or website.",
    ],
  },
  lottery: {
    title: "Lottery",
    summary: "Victims are told they won a prize but must pay fees or provide details first.",
    details: [
      "You are informed that you won a lottery or reward you never entered.",
      "The scammer asks for processing fees, tax payments, or personal information.",
      "The goal is to steal money or sensitive identity data.",
      "Legitimate prize providers do not usually require advance payment to claim winnings.",
    ],
  },
  bank: {
    title: "Bank Scam",
    summary: "Fraudsters impersonate bank staff through calls, text messages, or fake alerts.",
    details: [
      "They claim your account is blocked, hacked, or involved in suspicious activity.",
      "They create urgency and ask for OTP, TAC, password, or banking details.",
      "Some send fake links that look like official bank websites.",
      "Real banks do not ask for sensitive credentials through random calls or messages.",
    ],
  },
  shopping: {
    title: "Shopping Scam",
    summary: "Fake online shops offer attractive deals but deliver nothing or poor-quality items.",
    details: [
      "Scammers use very low prices to attract buyers quickly.",
      "They may use stolen product images and fake reviews.",
      "Payment is usually requested through risky or irreversible methods.",
      "After payment, the seller may disappear, delay shipping, or send the wrong item.",
    ],
  },
  delivery: {
    title: "Delivery Scams",
    summary: "Fake shipping notifications ask victims to pay fees or install malicious software.",
    details: [
      "You may receive a message saying your parcel cannot be delivered.",
      "It often includes a suspicious link to pay a small fee or confirm delivery.",
      "Some links lead to phishing pages or malware downloads.",
      "Check delivery status only through the courier's official website or app.",
    ],
  },
  charity: {
    title: "Charity",
    summary: "Scammers exploit sympathy by pretending to raise funds for emergencies or relief efforts.",
    details: [
      "They use emotional stories, disaster relief claims, or fake medical cases.",
      "Photos and stories may be stolen from real situations.",
      "Victims are pressured to donate immediately without checking authenticity.",
      "Always verify the charity or fundraiser through trusted official channels.",
    ],
  },
};

const guideDetails = {
  whatsapp: {
    title: "WhatsApp Security Guides",
    summary:
      "Learn how to reduce scam risks on WhatsApp by improving privacy settings, recognizing suspicious media, and avoiding contact-based tricks.",
    details: [
      "Enable two-step verification to reduce the risk of account takeover.",
      "Be careful with unknown images, links, and forwarded messages that create urgency.",
      "Ignore group invites from unknown contacts or suspicious business accounts.",
      "Do not share OTP codes, verification codes, or account recovery messages with anyone.",
      "Always verify payment requests or urgent stories through another trusted channel.",
    ],
  },
  social: {
    title: "Social Media Account Safety",
    summary:
      "Protect your social media accounts from impersonation, fake giveaways, account takeover attempts, and suspicious login activity.",
    details: [
      "Watch for impersonation scams that copy friend, influencer, or brand accounts.",
      "Review recent login activity and remove devices you do not recognize.",
      "Use strong passwords and enable extra security settings like two-factor authentication.",
      "Be careful with giveaway links, fake support accounts, and DM-based payment requests.",
      "Avoid logging into social platforms through unknown third-party links.",
    ],
  },
  sms: {
    title: "SMS Fraud Prevention",
    summary:
      "Understand common SMS scam tactics such as fake delivery alerts, account warnings, and phishing links that try to steal personal or banking details.",
    details: [
      "Do not click links in unexpected SMS messages, especially those claiming account issues or parcel delays.",
      "Check the sender carefully because scammers often imitate official names.",
      "Never share verification codes, TAC numbers, or banking login details through SMS or chat.",
      "Be cautious with urgent language like 'account suspended' or 'immediate action required'.",
      "When in doubt, open the official app or contact the real company directly.",
    ],
  },
  email: {
    title: "Email Phishing Defense",
    summary:
      "Learn how to detect phishing emails, suspicious attachments, fake sender identities, and social engineering attempts in your inbox.",
    details: [
      "Check the sender address carefully because fake emails often look similar to trusted domains.",
      "Avoid opening unexpected attachments, especially invoices, password-protected files, or urgent documents.",
      "Do not trust emails that pressure you to act immediately or threaten account suspension.",
      "Hover over links before clicking and verify the domain destination.",
      "Report suspicious emails and confirm sensitive requests with the official organization.",
    ],
  },
  "banking-login": {
    title: "Online Banking Login Safety",
    summary:
      "Stay safe when logging into online banking by avoiding fake login pages, insecure devices, and suspicious urgent prompts.",
    details: [
      "Always access online banking from the official app or by typing the bank website yourself.",
      "Do not log in through links sent by SMS, email, or chat messages.",
      "Check for suspicious design differences, unusual URLs, and missing security details.",
      "Avoid using public Wi-Fi or shared devices for banking access.",
      "Enable transaction notifications so you can spot unusual account activity quickly.",
    ],
  },
  "loan-investment": {
    title: "Loan & Investment Scam Awareness",
    summary:
      "Recognize fake loan offers, guaranteed investment returns, and scam messages pretending to be from licensed financial institutions.",
    details: [
      "Be suspicious of guaranteed profits, instant approvals, or offers with no verification process.",
      "Check whether the company is properly registered before sending any payment or documents.",
      "Do not pay upfront processing fees for loans or investment releases.",
      "Avoid sharing payslips, IC details, banking details, or selfies with unknown agents.",
      "Contact the financial institution directly through official channels to verify the offer.",
    ],
  },
  "card-protection": {
    title: "Card & Transaction Protection",
    summary:
      "Reduce the risk of card fraud by protecting card details, reviewing transactions, and spotting unauthorized charges early.",
    details: [
      "Do not save card details on unknown or suspicious websites.",
      "Review your transaction history regularly for unfamiliar purchases or small test charges.",
      "Turn on spending alerts and instant transaction notifications.",
      "Never share CVV numbers, PINs, or TAC codes with anyone.",
      "Freeze or block your card immediately if you suspect misuse.",
    ],
  },
  "bank-call": {
    title: "Bank Call & OTP Scam Defense",
    summary:
      "Prevent social engineering fraud where scammers pretend to be bank officers and pressure victims into revealing OTP or account details.",
    details: [
      "Banks do not ask for OTP, TAC, PIN, or full password over phone calls or chat messages.",
      "Be cautious if the caller uses fear tactics about suspicious transactions or account blocking.",
      "Hang up and call the bank back using the official number from the website or app.",
      "Do not approve device binding, app reset, or transfer requests unless you initiated them yourself.",
      "Report suspicious calls immediately and secure your account if any details were exposed.",
    ],
  },
};

const getHistory = () => {
  const raw = localStorage.getItem("scam-detection-history");
  if (!raw) return [];
  try {
    return JSON.parse(raw).filter((item) => item.id !== "seed-1");
  } catch {
    return [];
  }
};

const saveHistory = (items) => {
  localStorage.setItem("scam-detection-history", JSON.stringify(items));
};

const normalizeText = (value) => value.toLowerCase().replace(/\s+/g, " ").trim();

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const detectKeywords = (text) =>
  keywordPatterns.filter((term) => normalizeText(text).includes(term));

const safeUrlCheck = (value) => {
  const factors = [];
  const trimmed = value.trim();

  try {
    const url = new URL(trimmed);
    const hostname = url.hostname.toLowerCase();
    const path = `${url.pathname}${url.search}`.toLowerCase();

    if (url.protocol !== "https:") factors.push("URL does not use HTTPS");
    if (suspiciousDomains.some((term) => hostname.includes(term))) {
      factors.push("Shortened or suspicious-looking domain");
    }
    if (path.includes("redirect") || path.includes("next=") || path.includes("url=")) {
      factors.push("Redirect parameter detected");
    }
    if (path.includes(".apk") || path.includes("download") || path.includes("install")) {
      factors.push("Suspicious download indicator");
    }
    if (hostname.split(".").length > 3) factors.push("Unusual number of subdomains");
  } catch {
    factors.push("Invalid or unusual URL format");
  }

  return factors;
};

const classifyContent = ({ type, text, url }) => {
  const normalized = normalizeText(text);
  const keywords = detectKeywords(normalized);
  const urlFactors = url ? safeUrlCheck(url) : [];

  let score = 8;
  score += keywords.length * 8;
  score += keywords.filter((term) => highRiskTerms.has(term)).length * 9;
  score += urlFactors.length * 12;
  if (type === "voice" && keywords.length > 0) score += 8;
  if (type === "image" && keywords.length > 0) score += 5;
  if (type === "voice" && keywords.filter((term) => highRiskTerms.has(term)).length >= 2) score += 30;
  if (type === "image" && keywords.length >= 2) score += 27;
  score = Math.min(score, 96);

  const label = score >= 72 ? "Dangerous" : score >= 40 ? "Suspicious" : "Legitimate";
  const status = score >= 72 ? "dangerous" : score >= 40 ? "suspicious" : "safe";
  const action =
    status === "dangerous"
      ? "Do not click, reply, share OTP/password, or install files. Block and report the sender."
      : status === "suspicious"
        ? "Verify the sender through an official channel before taking action."
        : "No strong scam indicators found. Still verify the sender if anything feels unusual.";

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    type: type[0].toUpperCase() + type.slice(1),
    timestamp: "Just now",
    preview: text.slice(0, 130) || url,
    normalized,
    label,
    status,
    score,
    keywords,
    urlFactors,
    action,
  };
};

const routeMap = {
  check: "check",
  features: "home",
  "how-it-works": "home",
  "scam-types": "scam-types",
  guide: "guide",
  faq: "faq",
  privacy: "privacy",
  terms: "terms",
  ai: "about",
};

const scrollTargets = new Set(["features", "how-it-works"]);

const showView = (rawName) => {
  const name = routeMap[rawName] || rawName || "home";
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  const target = document.querySelector(`#${name}-view`) || document.querySelector("#home-view");
  target.classList.add("active");
  if (name === "history") renderHistory();
  if (scrollTargets.has(rawName)) {
    setTimeout(() => document.querySelector(`#${rawName}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const setActiveTab = (tab) => {
  state.activeTab = tab;
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tab);
  });
  document.querySelectorAll(".form-error").forEach((error) => {
    error.textContent = "";
  });
};

const getInputPayload = (form) => {
  const type = state.activeTab;
  if (type === "text") {
    const text = form.querySelector('[data-input="text"]').value.trim();
    if (!text) throw new Error("Please enter some text before checking.");
    if (text.length < 10) throw new Error("Please enter at least 10 characters of text to analyze.");
    return { type, text };
  }

  if (type === "image") {
    const file = form.querySelector('[data-input="image-file"]').files[0];
    const text = form.querySelector('[data-input="image-text"]').value.trim();
    if (!file) throw new Error("Please upload an image before checking.");
    if (!text) throw new Error("OCR text is empty. Review the extracted text first.");
    return { type, text };
  }

  if (type === "voice") {
    const file = form.querySelector('[data-input="voice-file"]').files[0];
    const text = form.querySelector('[data-input="voice-text"]').value.trim();
    if (!file) throw new Error("Please upload a voice file before checking.");
    if (!text) throw new Error("STT transcript is empty. Review the transcript first.");
    return { type, text };
  }

  const url = form.querySelector('[data-input="url"]').value.trim();
  const context = form.querySelector('[data-input="url-context"]').value.trim();
  if (!url) throw new Error("Please enter a URL before checking.");
  return { type, text: `${context} ${url}`.trim(), url };
};

const renderResult = (result) => {
  const statusLabel = result.status === "safe" ? "Safe" : result.label;
  const riskLabel =
    result.status === "dangerous" ? "High Risk" : result.status === "suspicious" ? "Medium Risk" : "Low Risk";
  const headline =
    result.status === "dangerous"
      ? "Strong scam indicators were detected. Avoid interacting with this content."
      : result.status === "suspicious"
        ? "Some scam-related patterns were detected and should be reviewed carefully."
        : "No major scam indicators were detected in this content.";
  const scanLabel =
    result.type === "Voice" ? "Voice Analysis" : result.type === "Image" ? "Image Scan" : result.type === "URL" ? "Link Scan" : "Link Scan";
  const scanMessage =
    result.status === "dangerous"
      ? result.type === "Voice"
        ? "High-risk manipulation or pressure indicators were detected in the audio content"
        : "High-risk scam indicators were detected"
      : result.status === "suspicious"
        ? result.type === "Image"
          ? "Potentially misleading or suspicious visual content detected"
          : "Some suspicious indicators were detected"
        : "No phishing characteristics detected";
  const contentMessage =
    result.status === "dangerous"
      ? "Strong urgency, manipulation, or threat-based language found"
      : result.status === "suspicious"
        ? "Some suspicious patterns were found and should be reviewed carefully"
        : "Language and tone appear normal, with no urgency or threats";
  const databaseMessage =
    result.status === "dangerous"
      ? "This content matches known scam-related warning patterns"
      : result.status === "suspicious"
        ? "Some indicators partially match reported scam patterns"
        : "No related scam reports found";
  const actionItems =
    result.status === "dangerous"
      ? ["Do not click, reply, or download anything", "Block the sender or source immediately", "Report the case through official reporting channels"]
      : result.status === "suspicious"
        ? ["Review the content carefully before taking action", "Verify the source through official channels", "Do not trust edited or misleading visuals immediately"]
        : ["Stay cautious even when content appears harmless", "Verify unknown senders before replying", "Avoid sharing sensitive information casually"];
  const actionButton = result.status === "dangerous" ? "Start New Check" : result.status === "suspicious" ? "Review Again" : "Check Another";
  const highlightedTerms =
    result.status === "safe"
      ? []
      : result.status === "dangerous"
        ? ["urgent action", "verification request", "high-risk manipulation"]
        : result.type === "Image"
          ? ["unusual request", "edited or misleading image", "suspicious visual content"]
          : result.keywords.length > 0
            ? result.keywords
            : ["unusual request", "suspicious pattern"];
  const highlightedHtml =
    highlightedTerms.length > 0
      ? highlightedTerms.map((term) => `<span class="result-term">${escapeHtml(term)}</span>`).join("")
      : `<p>No suspicious or dangerous phrases were strongly detected.</p>`;

  document.querySelector("#result-card").innerHTML = `
    <section class="result-summary-card ${result.status}">
      <div class="result-status-bar"><span>${statusLabel}</span></div>
      <div class="result-summary-body">
        <div class="result-verdict">
          <span class="result-shield" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.6-2.9 8.5-7 10-4.1-1.5-7-5.4-7-10V6z" /></svg>
          </span>
          <div class="result-copy">
            <h2>Analysis Complete: This looks ${statusLabel}</h2>
            <p>${headline}</p>
            <span class="risk-pill">Risk Level: ${riskLabel}</span>
            <ul class="result-check-list">
              <li><strong>${scanLabel}:</strong> ${scanMessage}</li>
              <li><strong>Content Analysis:</strong> ${contentMessage}</li>
              <li><strong>Database Check:</strong> ${databaseMessage}</li>
            </ul>
          </div>
        </div>
        <aside class="result-score-panel">
          <div class="result-ring ${result.status}" style="--score:${result.score}">
            <strong>${result.score}%</strong>
          </div>
          <strong class="risk-name">${riskLabel}</strong>
          <div class="risk-scale" style="--score:${result.score}">
            <span>0</span>
            <i></i>
            <span>100</span>
          </div>
        </aside>
      </div>
    </section>
    <div class="result-detail-grid">
      <section class="result-info-card">
        <h2>Analysis Details</h2>
        <div class="result-detail-box">
          <span>Selected Type</span>
          <p>${escapeHtml(result.type)}</p>
        </div>
        <div class="result-detail-box">
          <span>Scanned Content</span>
          <p>${escapeHtml(result.preview)}</p>
        </div>
        <div class="result-detail-box highlighted-box">
          <span>Highlighted Terms</span>
          <div class="result-term-list ${result.status}">${highlightedHtml}</div>
        </div>
      </section>
      <aside class="result-info-card">
        <h2>Recommended Action</h2>
        <ul class="recommended-list">
          ${actionItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
        <button class="result-action-button" type="button" onclick="location.hash='check'">${actionButton}</button>
      </aside>
    </div>
  `;
};

const renderHistory = () => {
  const items = getHistory();
  const list = document.querySelector("#history-list");
  const clearButton = document.querySelector("#clear-history");
  const historyNote = document.querySelector("#history-note");
  clearButton.hidden = items.length === 0;
  historyNote.hidden = items.length === 0;

  if (items.length === 0) {
    list.innerHTML = `
      <section class="history-empty-card">
        <div class="empty-document-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M7 3h7l4 4v14H7z" />
            <path d="M14 3v5h5" />
            <path d="M9 12h6M9 16h6" />
          </svg>
        </div>
        <h2>No History Yet</h2>
        <p>Your scam detection checks will appear here</p>
        <a class="history-start-link" href="#check">Start Checking</a>
      </section>
    `;
    return;
  }

  const typeStyles = {
    Text: {
      key: "text",
      icon: `<svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v5h5" /><path d="M9 12h6M9 16h6" /></svg>`,
    },
    Image: {
      key: "image",
      icon: `<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="14" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M7 17l4.2-4.2 2.8 2.8 2-2L20 17" /></svg>`,
    },
    Voice: {
      key: "voice",
      icon: `<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></svg>`,
    },
    URL: {
      key: "url",
      icon: `<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.1 0l1.4-1.4a5 5 0 0 0-7.1-7.1L10.5 5.4" /><path d="M14 11a5 5 0 0 0-7.1 0l-1.4 1.4a5 5 0 0 0 7.1 7.1l.9-.9" /></svg>`,
    },
  };

  const actionIcon = {
    view: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" /><circle cx="12" cy="12" r="2.6" /></svg>`,
    delete: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16" /><path d="M10 11v6M14 11v6" /><path d="M6 7l1 14h10l1-14" /><path d="M9 7V4h6v3" /></svg>`,
  };

  list.innerHTML = items
    .map(
      (item) => {
        const status = item.score >= 72 ? "dangerous" : item.score >= 40 ? "suspicious" : "safe";
        const label = status === "safe" ? "Safe" : status === "dangerous" ? "Dangerous" : "Suspicious";
        const type = typeStyles[item.type] || typeStyles.Text;
        return `
        <article class="history-item ${type.key}">
          <span class="type-icon ${type.key}" aria-hidden="true">
            ${type.icon}
          </span>
          <div class="history-main">
            <div class="history-meta">
              <span class="history-type-pill ${type.key}">${type.icon}${escapeHtml(item.type)}</span>
              <span>${escapeHtml(item.timestamp)}</span>
            </div>
            <strong>${escapeHtml(item.preview)}</strong>
            <div class="history-risk-row">
              <span class="badge ${status}">${label}</span>
              <span>Risk: ${item.score}%</span>
            </div>
          </div>
          <div class="history-actions">
            <button class="link-button view-action" type="button" data-view="${item.id}">${actionIcon.view}View</button>
            <button class="link-button delete-action" type="button" data-delete="${item.id}">${actionIcon.delete}Delete</button>
          </div>
        </article>
      `;
      },
    )
    .join("");
};

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

document.querySelectorAll("[data-guide-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTab = button.dataset.guideTab;
    document.querySelectorAll("[data-guide-tab]").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.guideTab === selectedTab);
    });
    document.querySelectorAll("[data-guide-panel]").forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.guidePanel === selectedTab);
    });
  });
});

document.querySelectorAll("[data-faq-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isActive = item.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach((faqItem) => {
      faqItem.classList.remove("active");
      faqItem.querySelector("[data-faq-toggle]").setAttribute("aria-expanded", "false");
    });

    if (!isActive) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const scamModal = document.querySelector("#scam-modal");
const closeScamModal = () => {
  scamModal.hidden = true;
  document.body.classList.remove("modal-open");
};

const openDetailModal = (detail) => {
  document.querySelector("#scam-modal-title").textContent = detail.title;
  document.querySelector("#scam-modal-summary").textContent = detail.summary;
  document.querySelector("#scam-modal-details").innerHTML = detail.details
    .map((item) => `<li>${item}</li>`)
    .join("");
  scamModal.hidden = false;
  document.body.classList.add("modal-open");
};

document.querySelectorAll("[data-scam-learn]").forEach((button) => {
  button.addEventListener("click", () => {
    const detail = scamTypeDetails[button.dataset.scamLearn];
    if (!detail) return;
    openDetailModal(detail);
  });
});

document.querySelectorAll("[data-guide-learn]").forEach((button) => {
  button.addEventListener("click", () => {
    const detail = guideDetails[button.dataset.guideLearn];
    if (!detail) return;
    openDetailModal(detail);
  });
});

document.querySelectorAll("[data-scam-close]").forEach((button) => {
  button.addEventListener("click", closeScamModal);
});

document.querySelector("#scam-start-analysis").addEventListener("click", closeScamModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !scamModal.hidden) closeScamModal();
});

const showFileReview = (form, type, file) => {
  const input = form.querySelector(`[data-input="${type}-file"]`);
  const dropzone = input?.closest(".upload-dropzone");
  const review = form.querySelector(`[data-review="${type}"]`);

  if (dropzone) {
    const fileName = dropzone.querySelector("strong");
    const helperText = dropzone.querySelector("small");
    if (fileName) fileName.textContent = file.name;
    if (helperText) helperText.hidden = true;
    dropzone.classList.add("has-file");
  }

  if (review) review.classList.remove("hidden-analysis-text");
};

document.querySelectorAll("[data-check-form]").forEach((form) => {
  form.querySelector('[data-input="image-file"]').addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      showFileReview(form, "image", file);
      form.querySelector('[data-input="image-text"]').value =
        "Congratulations! You have won a special reward. Verify your account details now to claim it.";
    }
  });

  form.querySelector('[data-input="voice-file"]').addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      showFileReview(form, "voice", file);
      form.querySelector('[data-input="voice-text"]').value =
        "Hello, this is an urgent notice from your bank. Your account may be suspended unless you confirm your details immediately.";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const error = form.querySelector(".form-error");
    error.textContent = "";

    try {
      const payload = getInputPayload(form);
      const result = classifyContent(payload);
      state.latestResult = result;
      const history = [result, ...getHistory()].slice(0, 20);
      saveHistory(history);
      renderResult(result);
      location.hash = "result";
    } catch (err) {
      error.textContent = err.message;
    }
  });
});

document.querySelector("#history-list").addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-view], [data-delete]");
  if (!actionButton) return;
  const viewId = actionButton.dataset.view;
  const deleteId = actionButton.dataset.delete;
  if (viewId) {
    const item = getHistory().find((historyItem) => historyItem.id === viewId);
    if (item) {
      const result = {
        ...item,
        status: item.score >= 72 ? "dangerous" : item.score >= 40 ? "suspicious" : "safe",
        keywords: detectKeywords(item.preview),
        urlFactors: item.preview.includes("http") ? safeUrlCheck(item.preview.match(/https?:\/\/\S+/)?.[0] || "") : [],
        action:
          item.score >= 72
            ? "Do not click, reply, share OTP/password, or install files. Block and report the sender."
            : item.score >= 40
              ? "Verify the sender through an official channel before taking action."
              : "No strong scam indicators found. Still verify the sender if anything feels unusual.",
      };
      renderResult(result);
      location.hash = "result";
    }
  }
  if (deleteId) {
    saveHistory(getHistory().filter((item) => item.id !== deleteId));
    renderHistory();
  }
});

document.querySelector("#clear-history").addEventListener("click", () => {
  const shouldClear = window.confirm("Are you sure you want to clear all history?");
  if (!shouldClear) return;
  saveHistory([]);
  renderHistory();
});

window.addEventListener("hashchange", () => showView(location.hash.replace("#", "") || "home"));

showView(location.hash.replace("#", "") || "home");
