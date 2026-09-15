
(function () {
  const TENSES = {
    "pi": { name: "Present Indefinite", bn: "বর্তমান সাধারণ", form: "S + V1 (s/es)", ex: "The earth is round. He works hard.", use: "Universal truth, habit, timetable future, historic present, quotations.", signals: "always, every day, usually, on Sundays", art: "174", color: "#34d399" },
    "pc": { name: "Present Continuous", bn: "বর্তমান ঘটমান", form: "am/is/are + V-ing", ex: "I am writing. I am going there tomorrow.", use: "Happening now, or a near planned future.", signals: "now, at the moment, currently, tomorrow (plan)", art: "175", color: "#38bdf8" },
    "pp": { name: "Present Perfect", bn: "বর্তমান পূর্ণ", form: "has/have + V3", ex: "I have done my duty. The sun has set.", use: "Just finished; past action with present result; unfinished time.", signals: "just, already, yet, ever, never, so far", art: "176", color: "#a78bfa" },
    "ppc": { name: "Present Perfect Continuous", bn: "বর্তমান পূর্ণ ঘটমান", form: "has/have been + V-ing", ex: "It has been raining since Monday.", use: "Started earlier and still going on.", signals: "for, since, all day", art: "177", color: "#f472b6" },
    "psi": { name: "Past Indefinite", bn: "অতীত সাধারণ", form: "V2 / did + V1", ex: "I did it. He studied hard.", use: "Finished past act, past habit, polite request.", signals: "yesterday, ago, last week, in 1990", art: "178", color: "#fbbf24" },
    "psc": { name: "Past Continuous", bn: "অতীত ঘটমান", form: "was/were + V-ing", ex: "He was reading when I saw him.", use: "Action in progress at a past moment; often interrupted.", signals: "while, when, at 5 p.m. yesterday", art: "179", color: "#fb923c" },
    "psp": { name: "Past Perfect", bn: "অতীত পূর্ণ", form: "had + V3", ex: "The train had started before I reached.", use: "The earlier of two past actions. Memory: Before before, after after.", signals: "before, after, already, by the time", art: "180", color: "#f87171" },
    "pspc": { name: "Past Perfect Continuous", bn: "অতীত পূর্ণ ঘটমান", form: "had been + V-ing", ex: "I had been working when he came.", use: "Duration up to a past point.", signals: "for, since, before (past)", art: "181", color: "#ef4444" },
    "fi": { name: "Future Indefinite", bn: "ভবিষ্যৎ সাধারণ", form: "shall/will + V1", ex: "I shall do it. He will go home.", use: "A future event. Traditional: shall with I/we.", signals: "tomorrow, next week, soon", art: "182", color: "#818cf8" },
    "fc": { name: "Future Continuous", bn: "ভবিষ্যৎ ঘটমান", form: "shall/will be + V-ing", ex: "I shall be sleeping at that time.", use: "Action in progress at a future moment.", signals: "at this time tomorrow, at 8 p.m.", art: "183", color: "#60a5fa" },
    "fp": { name: "Future Perfect", bn: "ভবিষ্যৎ পূর্ণ", form: "shall/will have + V3", ex: "He will have done this before you come.", use: "Completed before a future point. Modern English often uses Simple Future instead.", signals: "by then, before, by next year", art: "184", color: "#c084fc" },
    "fpc": { name: "Future Perfect Continuous", bn: "ভবিষ্যৎ পূর্ণ ঘটমান", form: "shall/will have been + V-ing", ex: "(Rare) I shall have been teaching for 20 years by 2030.", use: "Textbook note: no longer in practical use.", signals: "by + time + for + period", art: "184", color: "#94a3b8" }
  };

  const FLASH = [
    ["What is Tense?", "Tense = the change of form in a verb to show TIME.\nক্রিয়ার যে পরিবর্তন দ্বারা সময় বোঝায়।"],
    ["The 4 forms", "Every principal tense has: Indefinite, Continuous, Perfect, Perfect Continuous."],
    ["Universal truth?", "Present Indefinite. The earth is round. Honesty is the best policy."],
    ["Habit / routine?", "Present Indefinite. He works hard. He takes bath everyday."],
    ["Happening right now?", "Present Continuous. I am writing. It is raining."],
    ["State verbs", "Do not normally take Continuous: know, like, want, belong, resemble, consist…\nI know (not am knowing)."],
    ["Just finished / present result", "Present Perfect. I have lost my book (I still don't have it)."],
    ["for vs since", "for = period (for six months).\nsince = point (since Monday)."],
    ["yesterday / ago / last", "Use Simple Past, NEVER Present Perfect.\nHe died last night (not has died)."],
    ["Two past actions", "Earlier one = Past Perfect. Later = Simple Past.\nBefore before, after after."],
    ["Interrupted past", "Past Continuous + when + Simple Past.\nHe was reading when I saw him."],
    ["Timetable future", "Present Indefinite: The school closes on the 15th. The train leaves at 8 p.m."],
    ["Plan / arrangement", "Present Continuous: I am going there tomorrow."],
    ["Time clause", "After when/before/if: use Present, not will.\nI shall tell him when he comes."],
    ["shall / will", "Traditional: shall with I, we; will with you/he/they."],
    ["3rd person singular", "Present Indefinite: add s/es. He writes. She goes."],
    ["-e + ing", "Drop e: come → coming, write → writing, rise → rising."],
    ["Strong verb", "Past by inside vowel, no -d/-t: sing–sang–sung, drive–drove–driven."],
    ["Weak verb", "Past by adding -d or -t: leap–leaped, teach–taught (still weak)."],
    ["lie / lay", "lie–lay–lain (rest, intransitive).\nlay–laid–laid (put, transitive).\nlie–lied–lied (false)."],
    ["hang", "hung = suspend a picture.\nhanged = execute a person."],
    ["fly / flee / flow", "fly–flew–flown (bird).\nflee–fled–fled (escape).\nflow–flowed–flowed (river)."],
    ["born / borne", "born = birth. He was born poor.\nborne = carried. She has borne the burden."],
    ["Historic Present", "Tell a past story in Present to make it vivid: Alexander now rushes upon the enemy."]
  ];

  function speak(text) {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.92; u.lang = "en-GB";
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    } catch (e) {}
  }

  window.TensesLab = {
    show(id) {
      const t = TENSES[id]; if (!t) return;
      document.querySelectorAll(".g-cell").forEach(c => c.classList.toggle("on", c.dataset.id === id));
      const p = document.getElementById("tensePanel");
      p.classList.add("show");
      p.innerHTML = '<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap">'
        + '<h3 style="color:' + t.color + '">' + t.name + ' <small style="color:#fbbf24">' + t.bn + '</small></h3>'
        + '<button class="speak" type="button">Listen</button></div>'
        + '<div class="structure">Art. ' + t.art + ' · ' + t.form + '</div>'
        + '<p><strong>When / কখন:</strong> ' + t.use + '</p>'
        + '<p class="ex">' + t.ex + '</p>'
        + '<div class="chip-row">' + t.signals.split(",").map(s => '<span class="chip">' + s.trim() + '</span>').join("") + '</div>'
        + '<p><a href="#present" style="color:var(--accent)">Jump to full rules →</a></p>';
      p.querySelector(".speak").onclick = () => speak(t.name + ". " + t.ex);
      const st = JSON.parse(localStorage.getItem("tenses-learn-v1") || "{}");
      st.seen = st.seen || {}; st.seen[id] = true;
      localStorage.setItem("tenses-learn-v1", JSON.stringify(st));
      updateLearnProgress();
    }
  };

  function updateLearnProgress() {
    const st = JSON.parse(localStorage.getItem("tenses-learn-v1") || "{}");
    const n = Object.keys(st.seen || {}).length;
    const el = document.getElementById("learnProg");
    if (el) el.textContent = n + "/12 tenses explored";
  }

  /* Tense finder */
  const WIZ = [
    { q: "When does the action happen? কাজটি কখন?",
      opts: [["In the present / now-related", "pres"], ["In the finished past", "past"], ["In the future", "fut"]] },
    { q: "Is it a single fact, or still going on? কাজ কি চলছে?",
      opts: [["A fact / habit / completed event", "simple"], ["It is/was/will be in progress", "cont"], ["It started earlier and the duration matters", "dur"]] },
    { q: "Is it linked to another time? অন্য সময়ের সাথে যুক্ত?",
      opts: [["No — just this action", "solo"], ["Yes — finished before another time", "before"], ["Yes — continuing up to another time", "upto"]] }
  ];
  const WIZ_MAP = {
    "pres|simple|solo": "pi", "pres|simple|before": "pp", "pres|simple|upto": "pp",
    "pres|cont|solo": "pc", "pres|cont|before": "ppc", "pres|cont|upto": "ppc",
    "pres|dur|solo": "ppc", "pres|dur|before": "ppc", "pres|dur|upto": "ppc",
    "past|simple|solo": "psi", "past|simple|before": "psp", "past|simple|upto": "psp",
    "past|cont|solo": "psc", "past|cont|before": "pspc", "past|cont|upto": "pspc",
    "past|dur|solo": "pspc", "past|dur|before": "pspc", "past|dur|upto": "pspc",
    "fut|simple|solo": "fi", "fut|simple|before": "fp", "fut|simple|upto": "fp",
    "fut|cont|solo": "fc", "fut|cont|before": "fp", "fut|cont|upto": "fpc",
    "fut|dur|solo": "fpc", "fut|dur|before": "fpc", "fut|dur|upto": "fpc"
  };
  let wizStep = 0, wizAns = [];
  function renderWiz() {
    const box = document.getElementById("wizBox"); if (!box) return;
    if (wizStep >= WIZ.length) {
      const key = wizAns.join("|");
      const id = WIZ_MAP[key] || "pi";
      const t = TENSES[id];
      box.innerHTML = '<p class="wiz-q">Best fit / সবচেয়ে উপযোগী:</p>'
        + '<h3 style="color:var(--accent)">' + t.name + '</h3><p class="bn">' + t.bn + '</p>'
        + '<div class="structure">' + t.form + '</div><p>' + t.use + '</p><p class="ex">' + t.ex + '</p>'
        + '<button class="speak" type="button" id="wizAgain">Start again</button> '
        + '<button class="speak" type="button" id="wizShow">Open on the map</button>';
      document.getElementById("wizAgain").onclick = () => { wizStep = 0; wizAns = []; renderWiz(); };
      document.getElementById("wizShow").onclick = () => { TensesLab.show(id); document.getElementById("lab").scrollIntoView({behavior:"smooth"}); };
      return;
    }
    const s = WIZ[wizStep];
    box.innerHTML = '<p class="wiz-q">Step ' + (wizStep+1) + '/3 — ' + s.q + '</p><div class="wiz-opts"></div>';
    const wrap = box.querySelector(".wiz-opts");
    s.opts.forEach(([label, val]) => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = label;
      b.onclick = () => { wizAns.push(val); wizStep += 1; renderWiz(); };
      wrap.appendChild(b);
    });
  }

  /* Timeline */
  function drawTL(kind) {
    const svg = document.getElementById("tlSvg"); if (!svg) return;
    const ns = "http://www.w3.org/2000/svg";
    svg.innerHTML = "";
    const line = (x1,y1,x2,y2,c,w) => {
      const e = document.createElementNS(ns,"line");
      e.setAttribute("x1",x1); e.setAttribute("y1",y1); e.setAttribute("x2",x2); e.setAttribute("y2",y2);
      e.setAttribute("stroke",c); e.setAttribute("stroke-width",w||3); e.setAttribute("stroke-linecap","round");
      svg.appendChild(e);
    };
    const text = (x,y,t,c) => {
      const e = document.createElementNS(ns,"text");
      e.setAttribute("x",x); e.setAttribute("y",y); e.setAttribute("fill",c||"#94a3b8");
      e.setAttribute("font-size","12"); e.textContent = t; svg.appendChild(e);
    };
    const rect = (x,y,w,h,c) => {
      const e = document.createElementNS(ns,"rect");
      e.setAttribute("x",x); e.setAttribute("y",y); e.setAttribute("width",w); e.setAttribute("height",h);
      e.setAttribute("rx",6); e.setAttribute("fill",c); svg.appendChild(e);
    };
    line(20,80,480,80,"#334155",2);
    line(250,30,250,130,"#38bdf8",2);
    text(236,24,"NOW","#38bdf8");
    text(30,150,"PAST"); text(430,150,"FUTURE");
    const note = document.getElementById("tlNote");
    if (kind === "pi") { rect(240,62,20,16,"#34d399"); note.textContent = "Simple Present: a point or a timeless fact at NOW."; }
    if (kind === "pc") { rect(210,58,80,24,"rgba(56,189,248,.7)"); note.textContent = "Present Continuous: a bar covering NOW — still in progress."; }
    if (kind === "pp") { rect(150,62,90,16,"#a78bfa"); line(240,70,250,70,"#a78bfa"); note.textContent = "Present Perfect: finished before NOW, result still here."; }
    if (kind === "ppc") { rect(90,58,160,24,"rgba(244,114,182,.7)"); note.textContent = "Present Perfect Continuous: started in the past, bar still crosses NOW."; }
    if (kind === "psi") { rect(80,62,20,16,"#fbbf24"); note.textContent = "Simple Past: a finished point left of NOW (yesterday / ago)."; }
    if (kind === "psc") { rect(60,58,90,24,"rgba(251,146,60,.75)"); note.textContent = "Past Continuous: a past bar, often cut by another past point."; }
    if (kind === "psp") { rect(40,62,50,16,"#f87171"); rect(120,62,16,16,"#fbbf24"); note.textContent = "Past Perfect: the earlier past (red) before another past (gold)."; }
    if (kind === "fi") { rect(360,62,20,16,"#818cf8"); note.textContent = "Simple Future: a point to the right of NOW."; }
    if (kind === "fc") { rect(330,58,90,24,"rgba(96,165,250,.7)"); note.textContent = "Future Continuous: a bar around a future moment."; }
    if (kind === "fp") { rect(280,62,70,16,"#c084fc"); rect(380,62,16,16,"#818cf8"); note.textContent = "Future Perfect: done before a later future point."; }
    document.querySelectorAll(".tl-btns button").forEach(b => b.classList.toggle("on", b.dataset.k === kind));
  }

  /* Flashcards */
  let fi = 0, flipped = false;
  function renderFlash() {
    const el = document.getElementById("flashCard"); if (!el) return;
    const [q, a] = FLASH[fi];
    el.classList.toggle("flipped", flipped);
    el.querySelector(".front").innerHTML = "<p class='kicker'>Card " + (fi+1) + "/" + FLASH.length + "</p><h3>" + q + "</h3><p class='muted'>Tap to flip</p>";
    el.querySelector(".back").innerHTML = "<p class='kicker'>Concept</p><p style='white-space:pre-wrap'>" + a + "</p>";
    document.getElementById("flashPos").textContent = (fi+1) + " / " + FLASH.length;
  }

  /* Compare */
  function fillCompare() {
    const a = document.getElementById("cmpA");
    const b = document.getElementById("cmpB");
    if (!a) return;
    const opts = Object.entries(TENSES).map(([id,t]) => '<option value="'+id+'">'+t.name+'</option>').join("");
    a.innerHTML = opts; b.innerHTML = opts;
    a.value = "pi"; b.value = "pc";
    const paint = () => {
      const x = TENSES[a.value], y = TENSES[b.value];
      document.getElementById("cmpLeft").innerHTML = "<h3>"+x.name+"</h3><p class='bn'>"+x.bn+"</p><div class='structure'>"+x.form+"</div><p>"+x.use+"</p><p class='ex'>"+x.ex+"</p>";
      document.getElementById("cmpRight").innerHTML = "<h3>"+y.name+"</h3><p class='bn'>"+y.bn+"</p><div class='structure'>"+y.form+"</div><p>"+y.use+"</p><p class='ex'>"+y.ex+"</p>";
    };
    a.onchange = paint; b.onchange = paint; paint();
  }

  /* Search */
  function setupSearch() {
    const input = document.getElementById("siteSearch");
    const hits = document.getElementById("searchHits");
    if (!input) return;
    const blocks = [...document.querySelectorAll("h2, h3, .q-prompt, .g-cell")];
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      hits.innerHTML = "";
      if (q.length < 2) { hits.style.display = "none"; return; }
      let n = 0;
      blocks.forEach(el => {
        if (n > 12) return;
        const t = el.textContent.replace(/\s+/g," ").trim();
        if (t.toLowerCase().includes(q)) {
          const a = document.createElement("a");
          a.href = "#"; a.textContent = t.slice(0, 90);
          a.onclick = (e) => { e.preventDefault(); el.scrollIntoView({behavior:"smooth", block:"center"}); hits.style.display="none"; };
          hits.appendChild(a); n++;
        }
      });
      hits.style.display = n ? "block" : "none";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".g-cell").forEach(c => c.addEventListener("click", () => TensesLab.show(c.dataset.id)));
    document.querySelectorAll("[data-speak]").forEach(b => b.addEventListener("click", () => speak(b.dataset.speak)));
    renderWiz();
    drawTL("ppc");
    document.querySelectorAll(".tl-btns button").forEach(b => b.addEventListener("click", () => drawTL(b.dataset.k)));
    const card = document.getElementById("flashCard");
    if (card) {
      card.addEventListener("click", () => { flipped = !flipped; renderFlash(); });
      document.getElementById("flashPrev").onclick = (e) => { e.preventDefault(); fi = (fi + FLASH.length - 1) % FLASH.length; flipped = false; renderFlash(); };
      document.getElementById("flashNext").onclick = (e) => { e.preventDefault(); fi = (fi + 1) % FLASH.length; flipped = false; renderFlash(); };
      renderFlash();
    }
    fillCompare();
    setupSearch();
    updateLearnProgress();
    document.querySelectorAll(".ex").forEach(ex => {
      if (ex.querySelector(".speak")) return;
      const b = document.createElement("button");
      b.type = "button"; b.className = "speak no-print"; b.textContent = "Listen";
      b.style.marginLeft = "8px";
      b.onclick = () => speak(ex.textContent.replace("Listen","").trim());
      ex.appendChild(b);
    });
  });
})();
