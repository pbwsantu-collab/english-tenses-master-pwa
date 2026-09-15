// ========== English Tenses Master PWA ==========
// quizData is loaded from questions-data.js

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}

const sections = document.querySelectorAll(".section");
const navBtns = document.querySelectorAll(".nav-btn");

function showSection(id) {
  sections.forEach(s => s.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");
  navBtns.forEach(b => {
    b.classList.remove("bg-primary-600", "text-white");
    b.classList.add("hover:bg-slate-700", "text-slate-300");
    if (b.dataset.section === id) {
      b.classList.add("bg-primary-600", "text-white");
      b.classList.remove("hover:bg-slate-700", "text-slate-300");
    }
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  updateProgress(id);
}

navBtns.forEach(btn => {
  btn.addEventListener("click", () => showSection(btn.dataset.section));
});

document.getElementById("menuBtn")?.addEventListener("click", () => {
  document.getElementById("sidebar")?.classList.toggle("hidden");
});

function speakText(text) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  }
}

const visited = new Set(JSON.parse(localStorage.getItem("tenses_visited") || "[]"));
function updateProgress(id) {
  if (id) visited.add(id);
  localStorage.setItem("tenses_visited", JSON.stringify([...visited]));
  const total = 8;
  const pct = Math.min(100, Math.round((visited.size / total) * 100));
  const bar = document.getElementById("progressBar");
  const txt = document.getElementById("progressText");
  if (bar) bar.style.width = pct + "%";
  if (txt) txt.textContent = pct + "% complete";
}
updateProgress();

let currentFilter = "all";
let answered = JSON.parse(localStorage.getItem("tenses_answered") || "{}");
let score = { correct: 0, total: 0 };

function loadScore() {
  score.correct = Object.values(answered).filter(v => v === true).length;
  score.total = Object.keys(answered).filter(k => !String(k).includes("_")).length;
  updateScoreUI();
}

function updateScoreUI() {
  const c = document.getElementById("scoreCorrect");
  const t = document.getElementById("scoreTotal");
  const p = document.getElementById("scorePercent");
  if (c) c.textContent = score.correct;
  if (t) t.textContent = score.total;
  const pct = score.total ? Math.round((score.correct / score.total) * 100) : 0;
  if (p) p.textContent = pct + "%";
}

function renderQuiz(filter = "all") {
  currentFilter = filter;
  const container = document.getElementById("quizContainer");
  if (!container || typeof quizData === "undefined") {
    if (container) container.innerHTML = "<p class='text-rose-400'>Question data failed to load. Please refresh.</p>";
    return;
  }
  const items = filter === "all" ? quizData : quizData.filter(q => q.cat === filter);
  container.innerHTML = items.map((q, idx) => {
    const already = answered[q.id];
    return `<div class="bg-slate-800 rounded-2xl p-5 border border-slate-700" data-qid="${q.id}">
      <div class="flex items-start gap-3 mb-4">
        <span class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-sm font-bold">${idx + 1}</span>
        <p class="font-medium leading-relaxed">${q.q}</p>
      </div>
      <div class="grid sm:grid-cols-2 gap-2 mb-3">
        ${q.options.map((opt, i) => `<button class="quiz-option text-left px-4 py-2.5 rounded-xl border border-slate-600 bg-slate-900/50 hover:bg-slate-700 text-sm ${already !== undefined ? (i === q.ans ? "correct" : "") : ""}" data-qid="${q.id}" data-idx="${i}" ${already !== undefined ? "disabled" : ""}>${opt}</button>`).join("")}
      </div>
      <div class="exp text-sm text-slate-400 ${already !== undefined ? "" : "hidden"}">${already === true ? "✅ Correct! " : "❌ "} ${q.exp}</div>
    </div>`;
  }).join("");
  container.querySelectorAll(".quiz-option:not([disabled])").forEach(btn => btn.addEventListener("click", handleAnswer));
}

function handleAnswer(e) {
  const btn = e.currentTarget;
  const qid = +btn.dataset.qid;
  const idx = +btn.dataset.idx;
  const q = quizData.find(x => x.id === qid);
  if (!q || answered[qid] !== undefined) return;
  const correct = idx === q.ans;
  answered[qid] = correct;
  localStorage.setItem("tenses_answered", JSON.stringify(answered));
  const card = btn.closest("[data-qid]");
  card.querySelectorAll(".quiz-option").forEach(b => {
    b.disabled = true;
    if (+b.dataset.idx === q.ans) b.classList.add("correct");
    else if (+b.dataset.idx === idx && !correct) b.classList.add("wrong");
  });
  card.querySelector(".exp")?.classList.remove("hidden");
  loadScore();
}

document.querySelectorAll(".quiz-filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".quiz-filter").forEach(b => {
      b.classList.remove("bg-primary-600");
      b.classList.add("bg-slate-700");
    });
    btn.classList.add("bg-primary-600");
    btn.classList.remove("bg-slate-700");
    renderQuiz(btn.dataset.quiz);
  });
});

document.getElementById("resetQuizBtn")?.addEventListener("click", () => {
  if (confirm("Reset all quiz answers and score?")) {
    answered = {};
    localStorage.removeItem("tenses_answered");
    loadScore();
    renderQuiz(currentFilter);
  }
});

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById("installBanner")?.classList.remove("hidden");
});

document.getElementById("installBtn")?.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById("installBanner")?.classList.add("hidden");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("SW registered"))
      .catch(err => console.log("SW failed", err));
  });
}

loadScore();
renderQuiz("all");
showSection("home");
