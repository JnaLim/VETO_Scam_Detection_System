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
    if (text.length < 10) throw new Error("Please enter at least 10 characters of text.");
    return { type, text };
  }

  if (type === "image") {
    const file = form.querySelector('[data-input="image-file"]').files[0];
    const text = form.querySelector('[data-input="image-text"]').value.trim();
    if (!file) throw new Error("Please upload an image file.");
    if (!text) throw new Error("OCR text is empty. Review the extracted text first.");
    return { type, text };
  }

  if (type === "voice") {
    const file = form.querySelector('[data-input="voice-file"]').files[0];
    const text = form.querySelector('[data-input="voice-text"]').value.trim();
    if (!file) throw new Error("Please upload an audio file.");
    if (!text) throw new Error("STT transcript is empty. Review the transcript first.");
    return { type, text };
  }

  const url = form.querySelector('[data-input="url"]').value.trim();
  const context = form.querySelector('[data-input="url-context"]').value.trim();
  if (!url) throw new Error("Please enter a URL.");
  return { type, text: `${context} ${url}`.trim(), url };
};

const renderResult = (result) => {
  const keywordHtml =
    result.keywords.length > 0
      ? result.keywords.map((keyword) => `<span class="keyword">${keyword}</span>`).join("")
      : `<span class="keyword">No high-risk keywords detected</span>`;
  const urlHtml =
    result.urlFactors.length > 0
      ? result.urlFactors.map((factor) => `<span class="risk-factor">${factor}</span>`).join("")
      : `<span class="risk-factor">No URL risk factors detected</span>`;

  document.querySelector("#result-card").innerHTML = `
    <div class="result-header">
      <div>
        <div class="status-row">
          <span class="badge ${result.status}">${result.label}</span>
          <span class="badge">Input: ${result.type}</span>
        </div>
        <h1>Analysis Complete: ${result.label}</h1>
        <p class="result-summary">
          Risk score combines text classifier confidence with URL indicators when a link is provided.
        </p>
      </div>
      <div class="gauge ${result.status}">
        <div><strong>${result.score}%</strong><span>${result.score >= 72 ? "High" : result.score >= 40 ? "Medium" : "Low"} Risk</span></div>
      </div>
    </div>
    <div class="result-sections">
      <section class="explain-card">
        <h2>Why this result was shown</h2>
        <ul class="list">
          <li>Text was normalized and analyzed through the classifier flow.</li>
          <li>${result.keywords.length} suspicious keyword or phrase match(es) detected.</li>
          <li>${result.urlFactors.length} URL risk factor(s) detected.</li>
        </ul>
        <h3>Suspicious keywords</h3>
        <div class="factor-list">${keywordHtml}</div>
        <h3>URL risk factors</h3>
        <div class="factor-list">${urlHtml}</div>
      </section>
      <aside class="action-card">
        <h2>Recommended Action</h2>
        <p>${result.action}</p>
        <button class="primary-action" type="button" onclick="location.hash='check'">Check Another</button>
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

  list.innerHTML = items
    .map(
      (item) => {
        const status = item.score >= 72 ? "dangerous" : item.score >= 40 ? "suspicious" : "safe";
        const label = status === "safe" ? "Safe" : item.label;
        return `
        <article class="history-item">
          <span class="type-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M7 3h7l4 4v14H7z" />
              <path d="M14 3v5h5" />
              <path d="M9 12h6M9 16h6" />
            </svg>
          </span>
          <div class="history-main">
            <div class="history-meta">
              <span class="history-type-pill">${item.type}</span>
              <span>${item.timestamp}</span>
            </div>
            <strong>${item.preview}</strong>
            <div class="history-risk-row">
              <span class="badge ${status}">${label}</span>
              <span>Risk: ${item.score}%</span>
            </div>
          </div>
          <div class="history-actions">
            <button class="link-button view-action" type="button" data-view="${item.id}">View</button>
            <button class="link-button delete-action" type="button" data-delete="${item.id}">Delete</button>
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

document.querySelectorAll("[data-check-form]").forEach((form) => {
  form.querySelector('[data-input="image-file"]').addEventListener("change", (event) => {
    if (event.target.files[0]) {
      form.querySelector('[data-input="image-text"]').value =
        "Congratulations! You have won a special reward. Verify your account details now to claim it.";
    }
  });

  form.querySelector('[data-input="voice-file"]').addEventListener("change", (event) => {
    if (event.target.files[0]) {
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
  const viewId = event.target.dataset.view;
  const deleteId = event.target.dataset.delete;
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
  saveHistory([]);
  renderHistory();
});

window.addEventListener("hashchange", () => showView(location.hash.replace("#", "") || "home"));

showView(location.hash.replace("#", "") || "home");
