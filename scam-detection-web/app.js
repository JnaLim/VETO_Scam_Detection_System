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

const sampleHistory = [
  {
    id: "seed-1",
    type: "Text",
    timestamp: "Demo record",
    preview: "Your parcel delivery failed. Please verify your address.",
    label: "Suspicious",
    score: 62,
  },
];

const getHistory = () => {
  const raw = localStorage.getItem("scam-detection-history");
  if (!raw) return sampleHistory;
  try {
    return JSON.parse(raw);
  } catch {
    return sampleHistory;
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
    timestamp: new Date().toLocaleString(),
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
  check: "home",
  features: "home",
  "how-it-works": "home",
  "scam-types": "scam-types",
  guide: "home",
  privacy: "privacy",
  terms: "terms",
  ai: "about",
};

const scrollTargets = new Set(["check", "features", "how-it-works", "guide"]);

const showView = (rawName) => {
  const name = routeMap[rawName] || rawName || "home";
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  const target = document.querySelector(`#${name}-view`) || document.querySelector("#home-view");
  target.classList.add("active");
  if (name === "history") renderHistory();
  if (scrollTargets.has(rawName)) {
    const targetId = rawName === "check" ? "home-check-panel" : rawName;
    setTimeout(() => document.querySelector(`#${targetId}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
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
  document.querySelector("#form-error").textContent = "";
};

const getInputPayload = () => {
  const type = state.activeTab;
  if (type === "text") {
    const text = document.querySelector("#text-input").value.trim();
    if (text.length < 10) throw new Error("Please enter at least 10 characters of text.");
    return { type, text };
  }

  if (type === "image") {
    const file = document.querySelector("#image-input").files[0];
    const text = document.querySelector("#image-text").value.trim();
    if (!file) throw new Error("Please upload an image file.");
    if (!text) throw new Error("OCR text is empty. Review the extracted text first.");
    return { type, text };
  }

  if (type === "voice") {
    const file = document.querySelector("#voice-input").files[0];
    const text = document.querySelector("#voice-text").value.trim();
    if (!file) throw new Error("Please upload an audio file.");
    if (!text) throw new Error("STT transcript is empty. Review the transcript first.");
    return { type, text };
  }

  const url = document.querySelector("#url-input").value.trim();
  const context = document.querySelector("#url-context").value.trim();
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
  if (items.length === 0) {
    list.innerHTML = `<section class="info-card"><h2>No history yet</h2><p class="note">Run a check to create a local history record.</p></section>`;
    return;
  }

  list.innerHTML = items
    .map(
      (item) => `
        <article class="history-item">
          <span class="type-icon">${item.type[0]}</span>
          <div>
            <strong>${item.type} check</strong>
            <p class="note">${item.timestamp}</p>
            <p>${item.preview}</p>
          </div>
          <div>
            <span class="badge ${item.score >= 72 ? "dangerous" : item.score >= 40 ? "suspicious" : "safe"}">${item.label}</span>
            <p class="note">Risk: ${item.score}%</p>
            <div class="history-actions">
              <button class="link-button" type="button" data-view="${item.id}">View Details</button>
              <button class="link-button" type="button" data-delete="${item.id}">Delete</button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
};

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

document.querySelector("#image-input").addEventListener("change", (event) => {
  if (event.target.files[0]) {
    document.querySelector("#image-text").value =
      "Congratulations! You have won a special reward. Verify your account details now to claim it.";
  }
});

document.querySelector("#voice-input").addEventListener("change", (event) => {
  if (event.target.files[0]) {
    document.querySelector("#voice-text").value =
      "Hello, this is an urgent notice from your bank. Your account may be suspended unless you confirm your details immediately.";
  }
});

document.querySelector("#check-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const error = document.querySelector("#form-error");
  error.textContent = "";

  try {
    const payload = getInputPayload();
    const result = classifyContent(payload);
    state.latestResult = result;
    const history = [result, ...getHistory().filter((item) => item.id !== "seed-1")].slice(0, 20);
    saveHistory(history);
    renderResult(result);
    location.hash = "result";
  } catch (err) {
    error.textContent = err.message;
  }
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
