// =============================================================================
// CONTROLADOR DE LA APLICACIÓN (SPA) · LENGUA CASTELLANA 4.º PRIMARIA · TEMA 3
// "Prefijos, Palabras Llanas, Demostrativos, Obras Narrativas y el Anuncio"
// Entrenador Pedagógico para Olivia · Santillana CLAVES
// =============================================================================

class LenguaApp {
  constructor() {
    this.data = window.LENGUA_DATA;
    this.currentView = "home";
    this.studentName = "Olivia";
    this.stars = 0;
    this.voiceEnabled = false;
    this.soundEnabled = true;

    // Estado de Misiones
    this.missionsState = {
      completed: {}, // id: boolean
      currentMissionId: null,
      currentQuestionIndex: 0,
      score: 0
    };

    // Estado de Exámenes
    this.examState = {
      activeExamId: null, // 'testA' | 'testB'
      currentQuestionIndex: 0,
      answers: [],
      finished: false,
      lastScore: 0
    };
    this.activeBlankIndex = 0;
    this.activeTextInputIndex = 0;

    // Estado de Desafío Express
    this.expressState = {
      currentQuestion: null,
      streak: 0,
      answered: false
    };

    // Estado de Arcade
    this.arcadeState = {
      currentModeId: "prefijos",
      score: 0,
      streak: 0,
      highScore: 0,
      timeLeft: 45,
      timerId: null,
      isPlaying: false,
      currentQuestion: null
    };

    // Estado del Laboratorio
    this.labState = {
      activeTab: "prefijos",
      selectedPrefix: "des-",
      selectedRoot: "peinado",
      adBuilder: {
        product: "Telescopio Submarino Aqua-Visor",
        feature: "Lentes de zafiro de 20 aumentos con luz LED subacuática",
        eslogan: "¡Descubre los tesoros que el río esconde!",
        price: "4 bellotas doradas en la papelería del valle"
      }
    };

    this.init();
  }

  // Inicialización global
  init() {
    this.loadState();
    this.updateHeaderStats();
    this.renderHome();
    this.renderMissionsList();
    this.renderCheatsheet();
    this.setupLab();
    this.bindEvents();

    if (window.soundManager) {
      window.soundManager.soundEnabled = this.soundEnabled;
      window.soundManager.voiceEnabled = this.voiceEnabled;
    }
  }

  // Carga y guardado local de progreso
  loadState() {
    try {
      const saved = localStorage.getItem("olivia_lengua_t3_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        this.stars = parsed.stars || 0;
        this.missionsState.completed = parsed.completedMissions || {};
        this.arcadeState.highScore = parsed.arcadeHighScore || 0;
      }
    } catch (e) {
      console.warn("No se pudo cargar el estado de localStorage", e);
    }
  }

  saveState() {
    try {
      const state = {
        stars: this.stars,
        completedMissions: this.missionsState.completed,
        arcadeHighScore: this.arcadeState.highScore
      };
      localStorage.setItem("olivia_lengua_t3_state", JSON.stringify(state));
    } catch (e) {
      console.warn("No se pudo guardar el estado", e);
    }
  }

  addStars(amount) {
    this.stars += amount;
    this.saveState();
    this.updateHeaderStats();
  }

  updateHeaderStats() {
    const starEl = document.getElementById("star-count");
    if (starEl) starEl.textContent = this.stars;

    const btnVoice = document.getElementById("btn-voice");
    if (btnVoice) {
      btnVoice.classList.toggle("bg-amber-100", this.voiceEnabled);
      btnVoice.classList.toggle("text-amber-700", this.voiceEnabled);
      btnVoice.classList.toggle("border-amber-300", this.voiceEnabled);
    }

    const btnSound = document.getElementById("btn-sound");
    if (btnSound) {
      btnSound.classList.toggle("bg-amber-100", this.soundEnabled);
      btnSound.classList.toggle("text-amber-700", this.soundEnabled);
      btnSound.classList.toggle("border-amber-300", this.soundEnabled);
    }
  }

  toggleSound() {
    if (window.soundManager) {
      this.soundEnabled = window.soundManager.toggleSound();
    } else {
      this.soundEnabled = !this.soundEnabled;
    }
    this.updateHeaderStats();
  }

  toggleVoice() {
    if (window.soundManager) {
      this.voiceEnabled = window.soundManager.toggleVoice();
    } else {
      this.voiceEnabled = !this.voiceEnabled;
    }
    this.updateHeaderStats();
    if (this.voiceEnabled && window.soundManager) {
      window.soundManager.speak("Lectura en voz alta activada.");
    }
  }

  // Navegación SPA entre secciones
  navigate(viewId) {
    if (window.soundManager) window.soundManager.playClick();
    if (this.arcadeState.isPlaying && viewId !== 'arcade') {
      this.stopArcade();
    }

    const views = ["home", "misiones", "examen", "express", "arcade", "laboratorio", "chuleta"];
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) {
        if (v === viewId) el.classList.remove("hidden");
        else el.classList.add("hidden");
      }

      // Actualizar botón de navegación desktop
      const navBtn = document.getElementById(`nav-${v}`);
      if (navBtn) {
        if (v === viewId) {
          navBtn.classList.add("text-amber-700", "bg-amber-50", "font-black");
          navBtn.classList.remove("text-slate-600");
        } else {
          navBtn.classList.remove("text-amber-700", "bg-amber-50", "font-black");
          navBtn.classList.add("text-slate-600");
        }
      }
    });

    this.currentView = viewId;
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (viewId === "home") this.renderHome();
    if (viewId === "misiones") this.renderMissionsList();
    if (viewId === "express") this.startExpressQuestion();
    if (viewId === "laboratorio") this.renderLab();
    if (viewId === "chuleta") this.renderCheatsheet();
  }

  bindEvents() {
    // Teclas rápidas para el Arcade (Flechas izquierda/derecha)
    window.addEventListener("keydown", (e) => {
      if (this.currentView === "arcade" && this.arcadeState.isPlaying) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          this.handleArcadeAnswer("left");
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          this.handleArcadeAnswer("right");
        }
      }
    });
  }

  // ===========================================================================
  // VISTA 1: INICIO (HOME)
  // ===========================================================================
  renderHome() {
    const totalMissions = this.data.missions.length;
    const completedCount = Object.keys(this.missionsState.completed).filter(k => this.missionsState.completed[k]).length;
    const pct = Math.round((completedCount / totalMissions) * 100);

    const progEl = document.getElementById("home-progress-text");
    const barEl = document.getElementById("home-progress-bar");
    if (progEl) progEl.textContent = `${completedCount} de ${totalMissions} misiones completadas (${pct}%)`;
    if (barEl) barEl.style.width = `${pct}%`;

    const badgesContainer = document.getElementById("home-badges-grid");
    if (badgesContainer) {
      badgesContainer.innerHTML = this.data.missions.map(m => {
        const isDone = !!this.missionsState.completed[m.id];
        return `
          <div class="p-3.5 rounded-2xl border-2 ${isDone ? 'bg-amber-50 border-amber-300 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'} flex items-center gap-3 transition-all">
            <div class="w-10 h-10 rounded-xl ${isDone ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-400'} flex items-center justify-center text-xl shrink-0">
              ${isDone ? m.icon : '🔒'}
            </div>
            <div>
              <p class="text-xs font-black text-slate-800 leading-tight">${m.badge}</p>
              <p class="text-[11px] font-semibold text-slate-500">${isDone ? '✨ Conseguida' : 'Pendiente'}</p>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // ===========================================================================
  // VISTA 2: MISIONES DIDÁCTICAS
  // ===========================================================================
  renderMissionsList() {
    const listContainer = document.getElementById("missions-list-container");
    const quizContainer = document.getElementById("mission-quiz-container");
    if (!listContainer || !quizContainer) return;

    listContainer.classList.remove("hidden");
    quizContainer.classList.add("hidden");

    listContainer.innerHTML = this.data.missions.map(m => {
      const isDone = !!this.missionsState.completed[m.id];
      return `
        <div class="card-playful p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-300">
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 rounded-2xl ${isDone ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-700'} flex items-center justify-center text-2xl shrink-0 shadow-sm">
              ${m.icon}
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                  Misión ${m.id}
                </span>
                ${isDone ? '<span class="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">✓ Superada</span>' : ''}
              </div>
              <h3 class="text-base sm:text-lg font-black text-slate-900">${m.title}</h3>
              <p class="text-xs sm:text-sm text-slate-500 font-semibold mt-1">${m.description}</p>
            </div>
          </div>
          <button onclick="app.startMission(${m.id})" class="btn-bounce px-5 py-2.5 rounded-xl font-black text-sm text-white bg-amber-600 hover:bg-amber-700 shadow-md shrink-0 flex items-center justify-center gap-2">
            <span>${isDone ? 'Repetir' : 'Comenzar'}</span>
            <span>🚀</span>
          </button>
        </div>
      `;
    }).join("");
  }

  startMission(missionId) {
    const mission = this.data.missions.find(m => m.id === missionId);
    if (!mission) return;

    this.missionsState.currentMissionId = missionId;
    this.missionsState.currentQuestionIndex = 0;
    this.missionsState.score = 0;

    const listContainer = document.getElementById("missions-list-container");
    const quizContainer = document.getElementById("mission-quiz-container");
    if (listContainer) listContainer.classList.add("hidden");
    if (quizContainer) quizContainer.classList.remove("hidden");

    this.renderMissionQuestion();
  }

  renderMissionQuestion() {
    const mission = this.data.missions.find(m => m.id === this.missionsState.currentMissionId);
    const qIndex = this.missionsState.currentQuestionIndex;
    const q = mission.questions[qIndex];
    const totalQ = mission.questions.length;

    const quizContainer = document.getElementById("mission-quiz-container");
    if (!quizContainer) return;

    quizContainer.innerHTML = `
      <div class="card-playful p-6 sm:p-8 animate-pop">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
          <div class="flex items-center gap-2">
            <span class="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
              Misión ${mission.id}
            </span>
            <span class="text-xs font-bold text-slate-500">${mission.badge}</span>
          </div>
          <span class="text-sm font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
            Pregunta ${qIndex + 1} / ${totalQ}
          </span>
        </div>

        <h3 class="text-lg sm:text-xl font-black text-slate-900 leading-snug mb-3">
          ${q.question}
        </h3>
        <button onclick="window.soundManager.speak('${q.question.replace(/'/g, "\\'")}')" class="text-xs text-amber-700 hover:text-amber-900 font-bold mb-6 flex items-center gap-1">
          🗣️ Escuchar en voz alta
        </button>

        <div class="space-y-3 mb-6" id="mission-options">
          ${q.options.map((opt, i) => `
            <button onclick="app.answerMissionQuestion(${i})" class="w-full quiz-option-btn" id="m-opt-${i}">
              <span class="w-7 h-7 rounded-lg bg-slate-100 font-black text-xs flex items-center justify-center text-slate-700 shrink-0">
                ${String.fromCharCode(65 + i)}
              </span>
              <span class="flex-1">${opt}</span>
            </button>
          `).join("")}
        </div>

        <div id="mission-feedback" class="hidden p-4 rounded-2xl mb-6"></div>

        <div class="flex items-center justify-between pt-4 border-t border-slate-200">
          <button onclick="app.renderMissionsList()" class="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
            ⬅️ Volver a Misiones
          </button>
          <button onclick="app.nextMissionQuestion()" id="btn-next-mission-q" class="hidden btn-bounce px-6 py-2.5 rounded-xl font-black text-sm text-white bg-amber-600 hover:bg-amber-700 shadow-md">
            Siguiente ➡️
          </button>
        </div>
      </div>
    `;

    if (this.voiceEnabled && window.soundManager) {
      window.soundManager.speak(q.question);
    }
  }

  answerMissionQuestion(chosenIdx) {
    const mission = this.data.missions.find(m => m.id === this.missionsState.currentMissionId);
    const q = mission.questions[this.missionsState.currentQuestionIndex];
    const isCorrect = (chosenIdx === q.correct);

    // Desactivar botones
    q.options.forEach((_, i) => {
      const btn = document.getElementById(`m-opt-${i}`);
      if (btn) {
        btn.disabled = true;
        if (i === q.correct) btn.classList.add("correct");
        else if (i === chosenIdx) btn.classList.add("incorrect");
      }
    });

    const fb = document.getElementById("mission-feedback");
    if (isCorrect) {
      this.missionsState.score++;
      this.addStars(1);
      if (window.soundManager) window.soundManager.playCorrect();
      fb.className = "p-4 rounded-2xl mb-6 bg-emerald-50 border-2 border-emerald-200 text-emerald-900";
      fb.innerHTML = `
        <div class="flex items-start gap-3">
          <span class="text-2xl">🌟</span>
          <div>
            <p class="font-black text-sm text-emerald-800">¡Correcto, Olivia! +1 estrella ⭐</p>
            <p class="text-xs mt-1 font-semibold">${q.explanation}</p>
          </div>
        </div>
      `;
    } else {
      if (window.soundManager) window.soundManager.playWrong();
      fb.className = "p-4 rounded-2xl mb-6 bg-rose-50 border-2 border-rose-200 text-rose-900";
      fb.innerHTML = `
        <div class="flex items-start gap-3">
          <span class="text-2xl">💡</span>
          <div>
            <p class="font-black text-sm text-rose-800">¡Casi! Vamos a aprender el porqué:</p>
            <p class="text-xs mt-1 font-semibold">${q.explanation}</p>
          </div>
        </div>
      `;
    }
    fb.classList.remove("hidden");

    if (this.voiceEnabled && window.soundManager) {
      window.soundManager.speak(isCorrect ? "¡Muy bien! " + q.explanation : "Atención. " + q.explanation);
    }

    const nextBtn = document.getElementById("btn-next-mission-q");
    if (nextBtn) nextBtn.classList.remove("hidden");
  }

  nextMissionQuestion() {
    const mission = this.data.missions.find(m => m.id === this.missionsState.currentMissionId);
    this.missionsState.currentQuestionIndex++;

    if (this.missionsState.currentQuestionIndex < mission.questions.length) {
      this.renderMissionQuestion();
    } else {
      this.finishMission(mission);
    }
  }

  finishMission(mission) {
    const quizContainer = document.getElementById("mission-quiz-container");
    const score = this.missionsState.score;
    const total = mission.questions.length;
    const passed = score >= 3;

    if (passed) {
      this.missionsState.completed[mission.id] = true;
      this.addStars(5);
      this.saveState();
      if (window.confetti) {
        window.confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
      if (window.soundManager) window.soundManager.playCelebration();
    }

    quizContainer.innerHTML = `
      <div class="card-playful p-8 text-center max-w-xl mx-auto animate-pop">
        <div class="w-20 h-20 mx-auto rounded-3xl ${passed ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'} flex items-center justify-center text-4xl mb-4 shadow-inner">
          ${passed ? '🏆' : '💪'}
        </div>
        <h2 class="text-2xl font-black text-slate-900 mb-2">
          ${passed ? '¡Misión Superada con Éxito!' : '¡Buen entrenamiento, Olivia!'}
        </h2>
        <p class="text-sm text-slate-600 mb-6">
          Has acertado <strong>${score} de ${total}</strong> preguntas conceptuales.
          ${passed ? `<br>Has desbloqueado la medalla: <strong class="text-amber-700">«${mission.badge}»</strong> y ganado 5 estrellas bonus ⭐` : '<br>Repasa los conceptos y vuelve a intentarlo para conseguir tu medalla.'}
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onclick="app.startMission(${mission.id})" class="w-full sm:w-auto px-5 py-2.5 rounded-xl font-extrabold text-sm text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors">
            Repetir para mejorar 🔄
          </button>
          <button onclick="app.renderMissionsList()" class="w-full sm:w-auto btn-bounce px-6 py-2.5 rounded-xl font-extrabold text-sm text-white bg-amber-600 hover:bg-amber-700 shadow-md">
            Ver todas las misiones 🗺️
          </button>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // VISTA 3: SIMULADOR DE EXAMEN (Prueba A y Prueba B)
  // ===========================================================================
  startExam(examKey) {
    const examData = this.data.exams[examKey];
    if (!examData) return;

    this.examState.activeExamId = examKey;
    this.examState.currentQuestionIndex = 0;
    this.examState.answers = examData.questions.map(q => {
      if (q.type === 'fill_blanks') return new Array(q.blanks.length).fill('');
      if (q.type === 'classify_inputs') return new Array(q.items.length).fill('');
      if (q.type === 'text_input') return new Array(q.inputs ? q.inputs.length : 1).fill('');
      return null; // choice
    });
    this.examState.finished = false;
    this.activeBlankIndex = 0;
    this.activeTextInputIndex = 0;

    const selectorView = document.getElementById("exam-selector");
    const activeView = document.getElementById("exam-active");
    const resultsView = document.getElementById("exam-results");

    if (selectorView) selectorView.classList.add("hidden");
    if (resultsView) resultsView.classList.add("hidden");
    if (activeView) activeView.classList.remove("hidden");

    this.renderExamQuestion();
  }

  renderExamQuestion() {
    const exam = this.data.exams[this.examState.activeExamId];
    const qIndex = this.examState.currentQuestionIndex;
    const q = exam.questions[qIndex];
    const totalQ = exam.questions.length;
    const currentAns = this.examState.answers[qIndex];

    const container = document.getElementById("exam-question-card");
    if (!container) return;

    let bodyHtml = "";

    // 1. TIPO RELLENAR HUECOS (FILL BLANKS)
    if (q.type === 'fill_blanks') {
      let sentenceHtml = q.template;
      q.blanks.forEach((b, bIdx) => {
        const val = (Array.isArray(currentAns) && currentAns[bIdx]) ? currentAns[bIdx] : '';
        const inputHtml = `<input type="text" id="blank-${bIdx}" data-blank-idx="${bIdx}" value="${val.replace(/"/g, '&quot;')}" placeholder="${b.placeholder || '...'}" oninput="app.recordBlankInput(${bIdx}, this.value)" onfocus="app.setActiveBlank(${bIdx})" class="input-fill-blank ${val ? 'border-amber-500 bg-amber-50' : ''}" autocomplete="off" autocapitalize="none" spellcheck="false">`;
        sentenceHtml = sentenceHtml.replace(`{${bIdx}}`, inputHtml);
      });

      const wordBankHtml = q.wordBank ? `
        <div class="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
          <p class="text-xs font-black text-amber-900 mb-2.5 flex items-center gap-1.5">
            <span>💡</span> <span>Banco de ayuda (haz clic en una palabra para insertarla en el hueco activo):</span>
          </p>
          <div class="flex flex-wrap gap-2">
            ${q.wordBank.map(w => `
              <button type="button" onclick="app.insertWordToBlank('${w.replace(/'/g, "\\'")}')" class="word-chip">
                <span>✏️</span> <span>${w}</span>
              </button>
            `).join("")}
          </div>
        </div>
      ` : '';

      bodyHtml = `
        <div class="space-y-4 mb-8">
          <div class="p-5 sm:p-6 bg-slate-50 rounded-2xl border-2 border-amber-100">
            <p class="text-base sm:text-lg leading-relaxed text-slate-800">${sentenceHtml}</p>
          </div>
          ${wordBankHtml}
        </div>
      `;
    }
    // 2. TIPO RESPUESTA ESCRITA (TEXT INPUT)
    else if (q.type === 'text_input') {
      const inputs = q.inputs || [{ label: "Tu respuesta", placeholder: q.placeholder || "Escribe aquí...", accepted: q.accepted }];

      const inputsHtml = inputs.map((inp, iIdx) => {
        const val = (Array.isArray(currentAns) && currentAns[iIdx]) ? currentAns[iIdx] : '';
        return `
          <div class="space-y-1.5">
            <label class="block text-xs font-black uppercase tracking-wider text-slate-700">${inp.label}:</label>
            <input type="text" id="text-input-${iIdx}" data-text-idx="${iIdx}" value="${val.replace(/"/g, '&quot;')}" placeholder="${inp.placeholder || 'Escribe tu respuesta...'}" oninput="app.recordTextInput(${iIdx}, this.value)" onfocus="app.setActiveTextInput(${iIdx})" class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 text-slate-900 font-bold text-sm sm:text-base bg-white" autocomplete="off" autocapitalize="none" spellcheck="false">
          </div>
        `;
      }).join("");

      const wordBankHtml = q.wordBank ? `
        <div class="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
          <p class="text-xs font-black text-amber-900 mb-2.5 flex items-center gap-1.5">
            <span>💡</span> <span>Palabras o terminaciones de ayuda:</span>
          </p>
          <div class="flex flex-wrap gap-2">
            ${q.wordBank.map(w => `
              <button type="button" onclick="app.insertWordToTextInput('${w.replace(/'/g, "\\'")}')" class="word-chip">
                <span>✍️</span> <span>${w}</span>
              </button>
            `).join("")}
          </div>
        </div>
      ` : '';

      bodyHtml = `
        <div class="space-y-4 mb-8">
          <div class="p-5 sm:p-6 bg-slate-50 rounded-2xl border-2 border-amber-100 space-y-4">
            ${inputsHtml}
          </div>
          ${wordBankHtml}
        </div>
      `;
    }
    // 3. TIPO CLASIFICACIÓN ESCRITA (CLASSIFY INPUTS)
    else if (q.type === 'classify_inputs') {
      const itemsHtml = q.items.map((item, itemIdx) => {
        const val = (Array.isArray(currentAns) && currentAns[itemIdx]) ? currentAns[itemIdx] : '';
        return `
          <div class="p-4 bg-white rounded-2xl border-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-300 transition-colors">
            <span class="text-sm sm:text-base font-bold text-slate-900 flex-1">${item.name}</span>
            <div class="flex items-center gap-2">
              <input type="text" id="classify-input-${itemIdx}" value="${val.replace(/"/g, '&quot;')}" placeholder="${item.placeholder || 'Escribe categoría...'}" oninput="app.recordClassifyInput(${itemIdx}, this.value)" class="input-fill-blank ${val ? 'border-amber-500 bg-amber-50' : ''} text-xs sm:text-sm !min-w-[170px]" autocomplete="off" autocapitalize="none" spellcheck="false">
            </div>
          </div>
        `;
      }).join("");

      const wordBankHtml = q.wordBank ? `
        <div class="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
          <p class="text-xs font-black text-amber-900 mb-2.5 flex items-center gap-1.5">
            <span>💡</span> <span>Categorías posibles (puedes teclearlas o pulsarlas):</span>
          </p>
          <div class="flex flex-wrap gap-2">
            ${q.wordBank.map(w => `
              <span class="word-chip"><span>🏷️</span> <span>${w}</span></span>
            `).join("")}
          </div>
        </div>
      ` : '';

      bodyHtml = `
        <div class="space-y-3 mb-8">
          ${itemsHtml}
          ${wordBankHtml}
        </div>
      `;
    }
    // 4. TIPO TEST ESTÁNDAR (MULTIPLE CHOICE)
    else {
      bodyHtml = `
        <div class="space-y-3 mb-8">
          ${q.options.map((opt, i) => `
            <div onclick="app.recordExamAnswer(${i})" class="quiz-option-btn cursor-pointer ${currentAns === i ? 'selected' : ''}">
              <span class="w-7 h-7 rounded-lg ${currentAns === i ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'} font-black text-xs flex items-center justify-center shrink-0">
                ${String.fromCharCode(65 + i)}
              </span>
              <span class="flex-1">${opt}</span>
            </div>
          `).join("")}
        </div>
      `;
    }

    const typeBadge = q.type === 'fill_blanks' ? '✍️ Rellenar palabras' : q.type === 'classify_inputs' ? '🏷️ Clasificación' : q.type === 'text_input' ? '📝 Respuesta escrita' : '🎯 Razonamiento test';

    const narrativeHtml = (exam.context && qIndex === 0) ? `
      <div class="mb-6 p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200">
        <p class="text-xs font-black uppercase text-amber-800 tracking-wider mb-2 flex items-center gap-2">
          <span>📜</span> <span>Texto de lectura y caso práctico:</span>
        </p>
        <p class="text-xs sm:text-sm text-slate-700 leading-relaxed italic whitespace-pre-line">${exam.context}</p>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="p-6 sm:p-8 animate-pop">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
          <div>
            <span class="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
              ${exam.title}
            </span>
            <p class="text-xs text-slate-500 mt-1 font-semibold">${typeBadge} · Simulador de Examen</p>
          </div>
          <span class="text-sm font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
            Pregunta ${qIndex + 1} / ${totalQ}
          </span>
        </div>

        ${narrativeHtml}

        <h3 class="text-lg sm:text-xl font-black text-slate-900 leading-snug mb-3">
          ${q.question}
        </h3>
        <button onclick="window.soundManager.speak('${q.question.replace(/'/g, "\\'")}')" class="text-xs text-amber-700 hover:text-amber-900 font-bold mb-6 flex items-center gap-1">
          🗣️ Escuchar en voz alta
        </button>

        ${bodyHtml}

        <div class="flex items-center justify-between pt-4 border-t border-slate-200">
          <button onclick="app.prevExamQuestion()" ${qIndex === 0 ? 'disabled class="opacity-40 cursor-not-allowed text-slate-400 font-bold text-sm px-4 py-2"' : 'class="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"'}>
            ⬅️ Anterior
          </button>

          ${qIndex === totalQ - 1 ? `
            <button onclick="app.finishExam()" class="btn-bounce px-6 py-2.5 rounded-xl font-black text-sm text-white bg-amber-600 hover:bg-amber-700 shadow-md">
              Corregir Examen Completo 📝
            </button>
          ` : `
            <button onclick="app.nextExamQuestion()" class="btn-bounce px-6 py-2.5 rounded-xl font-black text-sm text-white bg-amber-600 hover:bg-amber-700 shadow-md">
              Siguiente ➡️
            </button>
          `}
        </div>
      </div>
    `;

    if (this.voiceEnabled && window.soundManager) {
      window.soundManager.speak(q.question);
    }
  }

  recordExamAnswer(optionIndex) {
    this.examState.answers[this.examState.currentQuestionIndex] = optionIndex;
    if (window.soundManager) window.soundManager.playClick();
    this.renderExamQuestion();
  }

  recordBlankInput(blankIdx, value) {
    const qIndex = this.examState.currentQuestionIndex;
    const q = this.data.exams[this.examState.activeExamId].questions[qIndex];
    if (!Array.isArray(this.examState.answers[qIndex])) {
      this.examState.answers[qIndex] = new Array(q.blanks.length).fill('');
    }
    this.examState.answers[qIndex][blankIdx] = value;
  }

  setActiveBlank(blankIdx) {
    this.activeBlankIndex = blankIdx;
  }

  insertWordToBlank(word) {
    const qIndex = this.examState.currentQuestionIndex;
    const q = this.data.exams[this.examState.activeExamId].questions[qIndex];
    if (!q || q.type !== 'fill_blanks') return;

    if (!Array.isArray(this.examState.answers[qIndex])) {
      this.examState.answers[qIndex] = new Array(q.blanks.length).fill('');
    }

    let targetIdx = this.activeBlankIndex;
    if (targetIdx < 0 || targetIdx >= q.blanks.length) targetIdx = 0;

    this.recordBlankInput(targetIdx, word);
    const inputEl = document.getElementById(`blank-${targetIdx}`);
    if (inputEl) {
      inputEl.value = word;
      inputEl.classList.add('border-amber-500', 'bg-amber-50');
    }

    if (targetIdx + 1 < q.blanks.length) {
      this.activeBlankIndex = targetIdx + 1;
      const nextInput = document.getElementById(`blank-${targetIdx + 1}`);
      if (nextInput) nextInput.focus();
    }
    if (window.soundManager) window.soundManager.playClick();
  }

  recordTextInput(inputIdx, value) {
    const qIndex = this.examState.currentQuestionIndex;
    const q = this.data.exams[this.examState.activeExamId].questions[qIndex];
    const totalInputs = q.inputs ? q.inputs.length : 1;
    if (!Array.isArray(this.examState.answers[qIndex])) {
      this.examState.answers[qIndex] = new Array(totalInputs).fill('');
    }
    this.examState.answers[qIndex][inputIdx] = value;
  }

  setActiveTextInput(inputIdx) {
    this.activeTextInputIndex = inputIdx;
  }

  insertWordToTextInput(word) {
    const qIndex = this.examState.currentQuestionIndex;
    const q = this.data.exams[this.examState.activeExamId].questions[qIndex];
    if (!q || q.type !== 'text_input') return;

    const totalInputs = q.inputs ? q.inputs.length : 1;
    if (!Array.isArray(this.examState.answers[qIndex])) {
      this.examState.answers[qIndex] = new Array(totalInputs).fill('');
    }

    let targetIdx = this.activeTextInputIndex;
    if (targetIdx < 0 || targetIdx >= totalInputs) targetIdx = 0;

    this.recordTextInput(targetIdx, word);
    const inputEl = document.getElementById(`text-input-${targetIdx}`);
    if (inputEl) inputEl.value = word;

    if (targetIdx + 1 < totalInputs) {
      this.activeTextInputIndex = targetIdx + 1;
      const nextInput = document.getElementById(`text-input-${targetIdx + 1}`);
      if (nextInput) nextInput.focus();
    }
    if (window.soundManager) window.soundManager.playClick();
  }

  recordClassifyInput(itemIdx, value) {
    const qIndex = this.examState.currentQuestionIndex;
    const q = this.data.exams[this.examState.activeExamId].questions[qIndex];
    if (!Array.isArray(this.examState.answers[qIndex])) {
      this.examState.answers[qIndex] = new Array(q.items.length).fill('');
    }
    this.examState.answers[qIndex][itemIdx] = value;
  }

  nextExamQuestion() {
    const exam = this.data.exams[this.examState.activeExamId];
    if (this.examState.currentQuestionIndex < exam.questions.length - 1) {
      this.examState.currentQuestionIndex++;
      this.activeBlankIndex = 0;
      this.activeTextInputIndex = 0;
      this.renderExamQuestion();
    }
  }

  prevExamQuestion() {
    if (this.examState.currentQuestionIndex > 0) {
      this.examState.currentQuestionIndex--;
      this.activeBlankIndex = 0;
      this.activeTextInputIndex = 0;
      this.renderExamQuestion();
    }
  }

  // Normalizador de texto para corrección inteligente y tolerante (sin tildes, signos ni espacios sobrantes)
  normalizeAnswerText(str) {
    if (!str || typeof str !== 'string') return '';
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[.,;:¿?¡!]/g, "")
      .replace(/\s+/g, " ");
  }

  checkQuestionCorrectness(q, userAns) {
    if (userAns === undefined || userAns === null) {
      return { isOk: false, scoreRatio: 0, details: [] };
    }

    if (q.type === 'fill_blanks') {
      if (!Array.isArray(userAns)) return { isOk: false, scoreRatio: 0, details: [] };
      let correctBlanks = 0;
      const details = q.blanks.map((b, bIdx) => {
        const val = this.normalizeAnswerText(userAns[bIdx] || '');
        const match = b.accepted.some(acc => this.normalizeAnswerText(acc) === val);
        if (match) correctBlanks++;
        return { user: userAns[bIdx] || '', expected: b.accepted[0], isOk: match };
      });
      const ratio = q.blanks.length > 0 ? (correctBlanks / q.blanks.length) : 0;
      return { isOk: ratio === 1, scoreRatio: ratio, details };
    }

    if (q.type === 'classify_inputs') {
      if (!Array.isArray(userAns)) return { isOk: false, scoreRatio: 0, details: [] };
      let correctItems = 0;
      const details = q.items.map((item, itIdx) => {
        const val = this.normalizeAnswerText(userAns[itIdx] || '');
        const match = item.accepted.some(acc => this.normalizeAnswerText(acc) === val);
        if (match) correctItems++;
        return { name: item.name, user: userAns[itIdx] || '', expected: item.accepted[0], isOk: match };
      });
      const ratio = q.items.length > 0 ? (correctItems / q.items.length) : 0;
      return { isOk: ratio === 1, scoreRatio: ratio, details };
    }

    if (q.type === 'text_input') {
      const inputs = q.inputs || [{ label: "Respuesta", accepted: q.accepted }];
      if (!Array.isArray(userAns)) {
        const val = this.normalizeAnswerText(userAns || '');
        const match = inputs[0].accepted.some(acc => this.normalizeAnswerText(acc) === val);
        return { isOk: match, scoreRatio: match ? 1 : 0, details: [{ label: inputs[0].label, user: userAns || '', expected: inputs[0].accepted[0], isOk: match }] };
      }
      let correctInputs = 0;
      const details = inputs.map((inp, iIdx) => {
        const val = this.normalizeAnswerText(userAns[iIdx] || '');
        const match = inp.accepted.some(acc => this.normalizeAnswerText(acc) === val);
        if (match) correctInputs++;
        return { label: inp.label, user: userAns[iIdx] || '', expected: inp.accepted[0], isOk: match };
      });
      const ratio = inputs.length > 0 ? (correctInputs / inputs.length) : 0;
      return { isOk: ratio === 1, scoreRatio: ratio, details };
    }

    // choice
    const isOk = (userAns === q.correct);
    return { isOk, scoreRatio: isOk ? 1 : 0, details: [] };
  }

  finishExam() {
    const exam = this.data.exams[this.examState.activeExamId];
    let totalScore = 0;
    let perfectCount = 0;

    exam.questions.forEach((q, idx) => {
      const res = this.checkQuestionCorrectness(q, this.examState.answers[idx]);
      totalScore += res.scoreRatio;
      if (res.isOk) perfectCount++;
    });

    const finalGrade = Math.round((totalScore / exam.questions.length) * 10 * 10) / 10;
    this.examState.lastScore = finalGrade;
    this.examState.finished = true;

    if (finalGrade >= 5) {
      const awardedStars = Math.round(finalGrade * 2);
      this.addStars(awardedStars);
      if (window.soundManager) window.soundManager.playCelebration();
      if (window.confetti) {
        window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      }
    } else {
      if (window.soundManager) window.soundManager.playWrong();
    }

    const activeView = document.getElementById("exam-active");
    const resultsView = document.getElementById("exam-results");
    if (activeView) activeView.classList.add("hidden");
    if (resultsView) resultsView.classList.remove("hidden");

    this.renderExamResults(finalGrade, perfectCount, totalScore);
  }

  renderExamResults(grade, perfectCount, totalScore) {
    const resultsView = document.getElementById("exam-results");
    const exam = this.data.exams[this.examState.activeExamId];
    if (!resultsView || !exam) return;

    const isHonor = grade >= 9;
    const isPassed = grade >= 5;

    resultsView.innerHTML = `
      <div class="space-y-8 animate-pop">
        <!-- Tarjeta de Calificación -->
        <div class="card-playful p-8 text-center max-w-xl mx-auto border-2 ${isHonor ? 'border-amber-400 bg-amber-50/50' : isPassed ? 'border-emerald-300' : 'border-rose-300'}">
          <div class="w-24 h-24 mx-auto rounded-full ${isHonor ? 'bg-amber-100 text-amber-600' : isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'} flex items-center justify-center text-5xl mb-4 shadow-inner">
            ${isHonor ? '⭐' : isPassed ? '🎉' : '📖'}
          </div>
          <span class="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            ${exam.title}
          </span>
          <h2 class="text-4xl font-black text-slate-900 mt-3 mb-1">
            ${grade} <span class="text-xl font-bold text-slate-400">/ 10</span>
          </h2>
          <p class="text-sm font-bold text-slate-600 mb-6">
            ${isHonor ? '¡Sobresaliente! Dominio absoluto de los contenidos para el examen.' : isPassed ? '¡Aprobado con éxito! Buen repaso, continúa afianzando los conceptos.' : 'Ánimo Olivia, revisa las explicaciones de abajo y repite la prueba.'}
          </p>

          <div class="flex flex-wrap items-center justify-center gap-3">
            <button onclick="app.startExam('${this.examState.activeExamId}')" class="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
              Repetir Examen 🔄
            </button>
            <button onclick="app.showExamSelector()" class="px-5 py-2.5 rounded-xl font-bold text-sm text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors">
              Elegir otra Prueba 📋
            </button>
            <button onclick="app.navigate('chuleta')" class="btn-bounce px-6 py-2.5 rounded-xl font-black text-sm text-white bg-amber-600 hover:bg-amber-700 shadow-md">
              Ver Diploma de Honor 🎓
            </button>
          </div>
        </div>

        <!-- Desglose Pregunta por Pregunta -->
        <div class="max-w-3xl mx-auto space-y-4">
          <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
            <span>🔍</span> <span>Corrección Detallada con Explicaciones Pedagógicas</span>
          </h3>

          ${exam.questions.map((q, idx) => {
            const userAns = this.examState.answers[idx];
            const check = this.checkQuestionCorrectness(q, userAns);

            let ansDisplay = "";
            if (q.type === 'choice') {
              const optChosen = userAns !== null ? q.options[userAns] : 'Sin responder';
              const optCorrect = q.options[q.correct];
              ansDisplay = `
                <p class="text-xs text-slate-600"><strong>Tu respuesta:</strong> <span class="${check.isOk ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}">${optChosen}</span></p>
                ${!check.isOk ? `<p class="text-xs text-slate-600 mt-1"><strong>Respuesta esperada:</strong> <span class="text-emerald-700 font-bold">${optCorrect}</span></p>` : ''}
              `;
            } else if (q.type === 'fill_blanks') {
              ansDisplay = `
                <div class="space-y-1 text-xs">
                  ${check.details.map((d, bIdx) => `
                    <p class="${d.isOk ? 'text-emerald-700' : 'text-rose-700'}">
                      Hueco ${bIdx + 1}: <strong>"${d.user || '(vacío)'}"</strong> ${d.isOk ? '✓' : `(esperado: "${d.expected}")`}
                    </p>
                  `).join("")}
                </div>
              `;
            } else if (q.type === 'classify_inputs') {
              ansDisplay = `
                <div class="space-y-1 text-xs">
                  ${check.details.map(d => `
                    <p class="${d.isOk ? 'text-emerald-700' : 'text-rose-700'}">
                      ${d.name}: <strong>"${d.user || '(vacío)'}"</strong> ${d.isOk ? '✓' : `(esperado: "${d.expected}")`}
                    </p>
                  `).join("")}
                </div>
              `;
            } else if (q.type === 'text_input') {
              ansDisplay = `
                <div class="space-y-1 text-xs">
                  ${check.details.map(d => `
                    <p class="${d.isOk ? 'text-emerald-700' : 'text-rose-700'}">
                      ${d.label}: <strong>"${d.user || '(vacío)'}"</strong> ${d.isOk ? '✓' : `(esperado: "${d.expected}")`}
                    </p>
                  `).join("")}
                </div>
              `;
            }

            return `
              <div class="p-5 rounded-2xl border-2 ${check.isOk ? 'bg-white border-emerald-200' : check.scoreRatio > 0 ? 'bg-amber-50/40 border-amber-300' : 'bg-white border-rose-200'}">
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="text-xs font-black uppercase text-slate-500">Pregunta ${idx + 1}</span>
                  <span class="text-xs font-black px-2 py-0.5 rounded-full ${check.isOk ? 'bg-emerald-100 text-emerald-800' : check.scoreRatio > 0 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}">
                    ${check.isOk ? '✓ Correcto (1 pto)' : check.scoreRatio > 0 ? `Parcial (${Math.round(check.scoreRatio * 10) / 10} ptos)` : '✗ A repasar (0 ptos)'}
                  </span>
                </div>
                <h4 class="text-sm sm:text-base font-black text-slate-900 mb-3">${q.question}</h4>
                ${ansDisplay}
                <div class="mt-3 pt-3 border-t border-slate-100 bg-slate-50/80 p-3 rounded-xl">
                  <p class="text-xs text-slate-600 font-semibold leading-relaxed">
                    <span class="font-black text-amber-800">💡 Explicación didáctica:</span> ${q.explanation}
                  </p>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  showExamSelector() {
    const selectorView = document.getElementById("exam-selector");
    const activeView = document.getElementById("exam-active");
    const resultsView = document.getElementById("exam-results");

    if (selectorView) selectorView.classList.remove("hidden");
    if (activeView) activeView.classList.add("hidden");
    if (resultsView) resultsView.classList.add("hidden");
  }

  // ===========================================================================
  // VISTA 4: DESAFÍO EXPRESS (TEST INFINITO)
  // ===========================================================================
  startExpressQuestion() {
    const pool = this.data.expressPool;
    const randomIdx = Math.floor(Math.random() * pool.length);
    this.expressState.currentQuestion = pool[randomIdx];
    this.expressState.answered = false;

    const streakEl = document.getElementById("express-streak");
    if (streakEl) streakEl.textContent = this.expressState.streak;

    const card = document.getElementById("express-card");
    if (!card) return;

    const q = this.expressState.currentQuestion;

    card.innerHTML = `
      <div class="p-6 sm:p-8 animate-pop">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
          <span class="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
            ⚡ Pregunta Rápida
          </span>
          <span class="text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1">
            🔥 Racha: <strong>${this.expressState.streak}</strong>
          </span>
        </div>

        <h3 class="text-lg sm:text-xl font-black text-slate-900 leading-snug mb-3">
          ${q.q}
        </h3>
        <button onclick="window.soundManager.speak('${q.q.replace(/'/g, "\\'")}')" class="text-xs text-amber-700 hover:text-amber-900 font-bold mb-6 flex items-center gap-1">
          🗣️ Escuchar en voz alta
        </button>

        <div class="space-y-3 mb-6">
          ${q.options.map((opt, i) => `
            <button onclick="app.answerExpress(${i})" id="exp-opt-${i}" class="w-full quiz-option-btn">
              <span class="w-7 h-7 rounded-lg bg-slate-100 font-black text-xs flex items-center justify-center text-slate-700 shrink-0">
                ${String.fromCharCode(65 + i)}
              </span>
              <span class="flex-1">${opt}</span>
            </button>
          `).join("")}
        </div>

        <div id="express-feedback" class="hidden p-4 rounded-2xl mb-6"></div>

        <div class="flex justify-end pt-4 border-t border-slate-200">
          <button onclick="app.startExpressQuestion()" id="btn-next-express" class="hidden btn-bounce px-6 py-2.5 rounded-xl font-black text-sm text-white bg-amber-600 hover:bg-amber-700 shadow-md">
            Otra Pregunta ⚡
          </button>
        </div>
      </div>
    `;

    if (this.voiceEnabled && window.soundManager) {
      window.soundManager.speak(q.q);
    }
  }

  answerExpress(chosenIdx) {
    if (this.expressState.answered) return;
    this.expressState.answered = true;

    const q = this.expressState.currentQuestion;
    const isCorrect = (chosenIdx === q.correct);

    q.options.forEach((_, i) => {
      const btn = document.getElementById(`exp-opt-${i}`);
      if (btn) {
        btn.disabled = true;
        if (i === q.correct) btn.classList.add("correct");
        else if (i === chosenIdx) btn.classList.add("incorrect");
      }
    });

    const fb = document.getElementById("express-feedback");
    if (isCorrect) {
      this.expressState.streak++;
      this.addStars(1);
      if (window.soundManager) window.soundManager.playCorrect();
      fb.className = "p-4 rounded-2xl mb-6 bg-emerald-50 border-2 border-emerald-200 text-emerald-900";
      fb.innerHTML = `
        <div class="flex items-start gap-3">
          <span class="text-2xl">🔥</span>
          <div>
            <p class="font-black text-sm text-emerald-800">¡Acertaste! Racha aumentada a ${this.expressState.streak} (+1 estrella ⭐)</p>
            <p class="text-xs mt-1 font-semibold">${q.exp}</p>
          </div>
        </div>
      `;
    } else {
      this.expressState.streak = 0;
      if (window.soundManager) window.soundManager.playWrong();
      fb.className = "p-4 rounded-2xl mb-6 bg-rose-50 border-2 border-rose-200 text-rose-900";
      fb.innerHTML = `
        <div class="flex items-start gap-3">
          <span class="text-2xl">💡</span>
          <div>
            <p class="font-black text-sm text-rose-800">¡Oh, no! La racha se reinicia, pero aprendemos:</p>
            <p class="text-xs mt-1 font-semibold">${q.exp}</p>
          </div>
        </div>
      `;
    }
    fb.classList.remove("hidden");

    const streakEl = document.getElementById("express-streak");
    if (streakEl) streakEl.textContent = this.expressState.streak;

    const nextBtn = document.getElementById("btn-next-express");
    if (nextBtn) nextBtn.classList.remove("hidden");
  }

  // ===========================================================================
  // VISTA 5: ARCADE CONTRARRELOJ (45 SEGUNDOS)
  // ===========================================================================
  selectArcadeMode(modeId) {
    this.arcadeState.currentModeId = modeId;
    this.stopArcade();
    const mode = this.data.arcade.modes.find(m => m.id === modeId);
    if (!mode) return;

    document.querySelectorAll(".arcade-mode-btn").forEach(b => {
      b.classList.remove("bg-amber-600", "text-white");
      b.classList.add("bg-white", "text-slate-700");
    });
    const activeBtn = document.getElementById(`arcade-mode-${modeId}`);
    if (activeBtn) {
      activeBtn.classList.add("bg-amber-600", "text-white");
      activeBtn.classList.remove("bg-white", "text-slate-700");
    }

    const descEl = document.getElementById("arcade-desc");
    if (descEl) descEl.textContent = mode.description;

    this.resetArcadeScreen();
  }

  resetArcadeScreen() {
    const card = document.getElementById("arcade-game-card");
    const mode = this.data.arcade.modes.find(m => m.id === this.arcadeState.currentModeId);
    if (!card || !mode) return;

    card.innerHTML = `
      <div class="p-8 text-center max-w-md mx-auto space-y-6">
        <div class="w-20 h-20 mx-auto rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center text-4xl shadow-inner">
          🕹️
        </div>
        <div>
          <h3 class="text-2xl font-black text-slate-900">${mode.title}</h3>
          <p class="text-xs text-slate-500 font-semibold mt-2">${mode.description}</p>
        </div>
        <p class="text-xs font-bold text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
          ⏱️ Tienes <strong>45 segundos</strong> para clasificar tantas palabras como puedas. ¡Cada acierto consecutivo suma combo multiplicador!
        </p>
        <button onclick="app.startArcadeGame()" class="btn-bounce w-full py-4 rounded-2xl font-black text-base text-white bg-amber-600 hover:bg-amber-700 shadow-lg flex items-center justify-center gap-2">
          <span>¡Comenzar Desafío!</span> <span>🚀</span>
        </button>
      </div>
    `;
  }

  startArcadeGame() {
    this.arcadeState.isPlaying = true;
    this.arcadeState.score = 0;
    this.arcadeState.streak = 0;
    this.arcadeState.timeLeft = 45;

    this.updateArcadeStatsUI();
    this.nextArcadeItem();

    if (this.arcadeState.timerId) clearInterval(this.arcadeState.timerId);
    this.arcadeState.timerId = setInterval(() => {
      this.arcadeState.timeLeft--;
      const timerEl = document.getElementById("arcade-timer");
      if (timerEl) timerEl.textContent = `${this.arcadeState.timeLeft}s`;

      if (this.arcadeState.timeLeft <= 0) {
        this.finishArcadeGame();
      }
    }, 1000);
  }

  stopArcade() {
    this.arcadeState.isPlaying = false;
    if (this.arcadeState.timerId) {
      clearInterval(this.arcadeState.timerId);
      this.arcadeState.timerId = null;
    }
  }

  updateArcadeStatsUI() {
    const scoreEl = document.getElementById("arcade-score");
    const streakEl = document.getElementById("arcade-streak");
    const timerEl = document.getElementById("arcade-timer");

    if (scoreEl) scoreEl.textContent = this.arcadeState.score;
    if (streakEl) streakEl.textContent = `x${Math.min(4, Math.floor(this.arcadeState.streak / 3) + 1)}`;
    if (timerEl) timerEl.textContent = `${this.arcadeState.timeLeft}s`;
  }

  nextArcadeItem() {
    const mode = this.data.arcade.modes.find(m => m.id === this.arcadeState.currentModeId);
    if (!mode) return;

    const items = mode.items;
    const randomItem = items[Math.floor(Math.random() * items.length)];
    this.arcadeState.currentQuestion = randomItem;

    const card = document.getElementById("arcade-game-card");
    if (!card) return;

    card.innerHTML = `
      <div class="p-6 sm:p-10 text-center space-y-8 animate-pop">
        <span class="text-xs font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
          Palabra a clasificar
        </span>

        <div class="py-6 sm:py-8 bg-amber-50/60 rounded-3xl border-2 border-amber-200 shadow-xs">
          <h3 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            ${randomItem.word}
          </h3>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button onclick="app.handleArcadeAnswer('left')" class="btn-bounce p-5 sm:p-6 rounded-2xl border-2 border-emerald-400 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base sm:text-lg shadow-md flex flex-col items-center justify-center gap-1">
            <span>${mode.leftBtn.label}</span>
            <span class="text-xs opacity-80 font-bold hidden sm:inline">(Flecha ⬅️)</span>
          </button>
          <button onclick="app.handleArcadeAnswer('right')" class="btn-bounce p-5 sm:p-6 rounded-2xl border-2 border-orange-400 bg-orange-500 hover:bg-orange-600 text-white font-black text-base sm:text-lg shadow-md flex flex-col items-center justify-center gap-1">
            <span>${mode.rightBtn.label}</span>
            <span class="text-xs opacity-80 font-bold hidden sm:inline">(Flecha ➡️)</span>
          </button>
        </div>
      </div>
    `;
  }

  handleArcadeAnswer(side) {
    if (!this.arcadeState.isPlaying || !this.arcadeState.currentQuestion) return;

    const mode = this.data.arcade.modes.find(m => m.id === this.arcadeState.currentModeId);
    const item = this.arcadeState.currentQuestion;

    const chosenKey = (side === "left") ? mode.leftBtn.key : mode.rightBtn.key;
    const isCorrect = (chosenKey === item.type);

    if (isCorrect) {
      this.arcadeState.streak++;
      const multiplier = Math.min(4, Math.floor(this.arcadeState.streak / 3) + 1);
      const points = 10 * multiplier;
      this.arcadeState.score += points;

      if (window.soundManager) window.soundManager.playCorrect();
    } else {
      this.arcadeState.streak = 0;
      if (window.soundManager) window.soundManager.playWrong();
    }

    this.updateArcadeStatsUI();
    this.nextArcadeItem();
  }

  finishArcadeGame() {
    this.stopArcade();
    const score = this.arcadeState.score;
    const isNewHigh = score > this.arcadeState.highScore;

    if (isNewHigh) {
      this.arcadeState.highScore = score;
      this.saveState();
      if (window.confetti) {
        window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }

    const earnedStars = Math.floor(score / 50);
    if (earnedStars > 0) this.addStars(earnedStars);

    const card = document.getElementById("arcade-game-card");
    if (!card) return;

    card.innerHTML = `
      <div class="p-8 text-center max-w-md mx-auto space-y-6 animate-pop">
        <div class="w-20 h-20 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-5xl shadow-inner">
          🏁
        </div>
        <div>
          <h3 class="text-2xl font-black text-slate-900">¡Tiempo Terminado!</h3>
          <p class="text-3xl font-black text-amber-700 mt-2">${score} puntos</p>
          ${isNewHigh ? '<p class="text-xs font-black text-emerald-600 uppercase tracking-wider mt-1">🎉 ¡Nuevo Récord Personal!</p>' : ''}
        </div>
        <p class="text-xs text-slate-600 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-200">
          Has ganado <strong>+${earnedStars} estrellas</strong> para tu marcador ⭐.
        </p>
        <div class="flex gap-3">
          <button onclick="app.startArcadeGame()" class="btn-bounce flex-1 py-3 rounded-xl font-black text-sm text-white bg-amber-600 hover:bg-amber-700 shadow-md">
            Jugar Otra Vez 🔄
          </button>
          <button onclick="app.resetArcadeScreen()" class="px-4 py-3 rounded-xl font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200">
            Cambiar Modo 📋
          </button>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // VISTA 6: LABORATORIO INTERACTIVO (4 PESTAÑAS)
  // ===========================================================================
  setupLab() {
    this.renderLab();
  }

  setLabTab(tabId) {
    this.labState.activeTab = tabId;
    if (window.soundManager) window.soundManager.playClick();
    this.renderLab();
  }

  renderLab() {
    const container = document.getElementById("lab-content-container");
    if (!container) return;

    // Actualizar botones de pestaña
    ["prefijos", "llanas", "demostrativos", "publicidad"].forEach(t => {
      const btn = document.getElementById(`lab-tab-${t}`);
      if (btn) {
        if (t === this.labState.activeTab) {
          btn.classList.add("bg-amber-600", "text-white");
          btn.classList.remove("bg-white", "text-slate-700");
        } else {
          btn.classList.remove("bg-amber-600", "text-white");
          btn.classList.add("bg-white", "text-slate-700");
        }
      }
    });

    const activeTab = this.labState.activeTab;

    // 1. LABORATORIO DE PREFIJOS
    if (activeTab === "prefijos") {
      const tabData = this.data.lab.tabs.find(t => t.id === "prefijos");
      container.innerHTML = `
        <div class="space-y-6">
          <div class="p-6 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl text-white shadow-md">
            <span class="text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
              Simulador Interactivo de Derivación
            </span>
            <h3 class="text-xl sm:text-2xl font-black mt-2">🧪 La Máquina Creadora de Prefijos</h3>
            <p class="text-xs sm:text-sm text-amber-100 mt-1">Elige un prefijo y una palabra raíz para ver cómo nace una palabra nueva y cómo cambia su significado.</p>
          </div>

          <!-- Selector de Prefijo y Raíz -->
          <div class="card-playful p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-black uppercase text-amber-800 mb-2">1. Selecciona un Prefijo:</label>
                <div class="grid grid-cols-2 gap-2">
                  ${tabData.items.map(item => `
                    <button onclick="app.selectLabPrefix('${item.prefix}')" class="p-3 rounded-xl border-2 font-black text-sm text-left transition-all ${this.labState.selectedPrefix === item.prefix ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300'}">
                      <span>${item.prefix}</span>
                    </button>
                  `).join("")}
                </div>
              </div>

              <div>
                <label class="block text-xs font-black uppercase text-amber-800 mb-2">2. Selecciona una Palabra Raíz:</label>
                <div class="grid grid-cols-2 gap-2" id="lab-root-options">
                  ${this.getRootsForPrefix(this.labState.selectedPrefix).map(r => `
                    <button onclick="app.selectLabRoot('${r.root}')" class="p-3 rounded-xl border-2 font-black text-sm text-left transition-all ${this.labState.selectedRoot === r.root ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300'}">
                      <span>${r.root}</span>
                    </button>
                  `).join("")}
                </div>
              </div>
            </div>

            <!-- Resultado de la Combinación -->
            <div class="mt-8 pt-6 border-t border-slate-200 text-center" id="lab-prefix-result">
              ${this.renderPrefixResult()}
            </div>
          </div>

          <!-- Fichas de Estudio de Prefijos con 'Ojo al dato' -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${tabData.items.map(item => `
              <div class="card-playful p-5 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-base font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-xl">${item.prefix}</span>
                  <span class="text-xs font-bold text-slate-500">${item.meaning}</span>
                </div>
                <div class="pt-2">
                  <p class="text-xs text-slate-600"><strong>Ejemplos:</strong> ${item.examples.map(e => `<span class="font-bold text-slate-900">${e.result}</span> (${e.desc})`).join("; ")}.</p>
                </div>
                <div class="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] font-bold text-amber-900">
                  ${item.tip}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    // 2. BÁSCULA DE LAS PALABRAS LLANAS
    else if (activeTab === "llanas") {
      const tabData = this.data.lab.tabs.find(t => t.id === "llanas");
      container.innerHTML = `
        <div class="space-y-6">
          <div class="p-6 bg-gradient-to-r from-orange-600 to-rose-600 rounded-3xl text-white shadow-md">
            <span class="text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
              Escáner Ortográfico de Sílaba Tónica
            </span>
            <h3 class="text-xl sm:text-2xl font-black mt-2">⚖️ La Báscula de las Palabras Llanas</h3>
            <p class="text-xs sm:text-sm text-orange-100 mt-1">Descubre la regla V-N-S invertida: golpe de voz en la penúltima sílaba y tilde en consonante distinta de n o s.</p>
          </div>

          <!-- Comprobador Interactivo de Palabras Llanas -->
          <div class="card-playful p-6 space-y-4">
            <h4 class="text-base font-black text-slate-900">🔍 Escáner Silábico Interactivo</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button onclick="app.inspectWord('árbol', 'ár-bol', 'l', true, 'Termina en consonante l (distinta de n o s)')" class="p-4 rounded-2xl border-2 border-slate-200 hover:border-orange-400 font-black text-left bg-white">
                <span class="text-lg">ár-bol</span>
                <p class="text-xs text-emerald-700 font-bold mt-1">✓ SÍ lleva tilde</p>
              </button>
              <button onclick="app.inspectWord('examen', 'ex-a-men', 'n', false, 'Termina en consonante n → ¡NUNCA lleva tilde en singular!')" class="p-4 rounded-2xl border-2 border-slate-200 hover:border-orange-400 font-black text-left bg-white">
                <span class="text-lg">ex-a-men</span>
                <p class="text-xs text-rose-700 font-bold mt-1">✗ NO lleva tilde</p>
              </button>
              <button onclick="app.inspectWord('lápiz', 'lá-piz', 'z', true, 'Termina en consonante z (distinta de n o s)')" class="p-4 rounded-2xl border-2 border-slate-200 hover:border-orange-400 font-black text-left bg-white">
                <span class="text-lg">lá-piz</span>
                <p class="text-xs text-emerald-700 font-bold mt-1">✓ SÍ lleva tilde</p>
              </button>
            </div>
            <div id="word-inspector-result" class="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm text-slate-700">
              Pulsa en cualquiera de las palabras de arriba para ver su análisis silábico y la justificación formal exigida en examen.
            </div>
          </div>

          <!-- Regla Visual y Alerta Trampa -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="card-playful p-5 border-emerald-200 bg-emerald-50/40">
              <span class="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">✍️ SÍ llevan tilde</span>
              <p class="text-xs font-bold text-slate-700 mt-3 mb-2">Cuando terminan en consonante DISTINTA de -n o -s:</p>
              <ul class="text-xs space-y-1 font-semibold text-slate-600">
                <li>• <strong>-l:</strong> ár-bol, fá-cil, di-fí-cil, fós-il, há-bil.</li>
                <li>• <strong>-z:</strong> lá-piz, cá-liz, Ra-mí-rez, Pé-rez.</li>
                <li>• <strong>-d:</strong> cés-ped, hués-ped.</li>
                <li>• <strong>-r:</strong> lí-der, ca-rác-ter, ám-bar, crá-ter.</li>
                <li>• <strong>-x:</strong> tó-rax, Fé-lix.</li>
              </ul>
            </div>

            <div class="card-playful p-5 border-rose-200 bg-rose-50/40">
              <span class="text-xs font-black uppercase text-rose-800 bg-rose-100 px-3 py-1 rounded-full">❌ NO llevan tilde</span>
              <p class="text-xs font-bold text-slate-700 mt-3 mb-2">Cuando terminan en vocal, en -n o en -s:</p>
              <ul class="text-xs space-y-1 font-semibold text-slate-600">
                <li>• <strong>Vocal:</strong> me-sa, li-bro, pe-lo-ta, ca-mi-no.</li>
                <li>• <strong>-s:</strong> lu-nes, ti-je-ras, cri-sis, can-tas.</li>
                <li>• <strong>-n:</strong> can-tan, bai-lan.</li>
                <li class="pt-2 text-rose-900 font-black">• ⚠️ ¡ALERTA TRAMPA!: <em>examen, origen, joven, volumen</em> terminan en -n, ¡NO llevan tilde!</li>
              </ul>
            </div>
          </div>
        </div>
      `;
    }

    // 3. RADAR DE LOS DEMOSTRATIVOS
    else if (activeTab === "demostrativos") {
      const tabData = this.data.lab.tabs.find(t => t.id === "demostrativos");
      container.innerHTML = `
        <div class="space-y-6">
          <div class="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white shadow-md">
            <span class="text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
              Mapa Espacial 3D
            </span>
            <h3 class="text-xl sm:text-2xl font-black mt-2">🧭 El Radar de los Demostrativos</h3>
            <p class="text-xs sm:text-sm text-indigo-100 mt-1">Aprende a situar las cosas según la distancia: cercanía (aquí), distancia media (ahí) y lejanía (allí).</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${tabData.distances.map(d => `
              <div class="card-playful p-5 space-y-4 hover:border-indigo-300">
                <div class="border-b border-slate-200 pb-3">
                  <h4 class="text-base font-black text-slate-900">${d.zone}</h4>
                  <p class="text-xs text-slate-500 font-semibold">${d.where}</p>
                </div>
                <div class="space-y-1.5 text-xs font-bold text-slate-700">
                  <p>Masc. Sing: <span class="text-indigo-600 font-black">${d.forms.mascSing}</span></p>
                  <p>Fem. Sing: <span class="text-indigo-600 font-black">${d.forms.femSing}</span></p>
                  <p>Masc. Plur: <span class="text-indigo-600 font-black">${d.forms.mascPlur}</span></p>
                  <p>Fem. Plur: <span class="text-indigo-600 font-black">${d.forms.femPlur}</span></p>
                  <p>Neutro: <span class="text-purple-600 font-black">${d.forms.neutro}</span></p>
                </div>
                <div class="p-3 bg-indigo-50 rounded-xl text-xs text-indigo-900 italic">
                  "${d.example}"
                </div>
              </div>
            `).join("")}
          </div>

          <div class="card-playful p-5 bg-purple-50/50 border-purple-200 text-xs sm:text-sm text-purple-950 font-semibold space-y-1">
            <p class="font-black text-purple-900">✨ Formas Neutras (esto, eso, aquello):</p>
            <p>Se usan para referirse a cosas que no tienen género masculino o femenino identificado (por ejemplo: <em>¿Qué es esto?</em>, <em>Eso no me gusta</em>). Nunca acompañan a un sustantivo y <strong>jamás llevan tilde</strong>.</p>
          </div>
        </div>
      `;
    }

    // 4. TALLER DEL ANUNCIO PUBLICITARIO
    else if (activeTab === "publicidad") {
      const tabData = this.data.lab.tabs.find(t => t.id === "publicidad");
      container.innerHTML = `
        <div class="space-y-6">
          <div class="p-6 bg-gradient-to-r from-amber-600 to-rose-600 rounded-3xl text-white shadow-md">
            <span class="text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
              Taller de Creatividad Publicitaria
            </span>
            <h3 class="text-xl sm:text-2xl font-black mt-2">📢 La Agencia de Publicidad de Olivia</h3>
            <p class="text-xs sm:text-sm text-amber-100 mt-1">Conoce las 5 partes obligatorias de cualquier anuncio y diseña un cartel llamativo listo para triunfar.</p>
          </div>

          <!-- Creador Interactivo de Anuncios -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="card-playful p-6 space-y-4">
              <h4 class="text-base font-black text-slate-900">✍️ Configura tu Producto:</h4>
              <div>
                <label class="block text-xs font-black uppercase text-slate-700 mb-1">Nombre / Titular:</label>
                <input type="text" id="ad-title" value="${this.labState.adBuilder.product}" oninput="app.updateAdPreview('product', this.value)" class="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-bold">
              </div>
              <div>
                <label class="block text-xs font-black uppercase text-slate-700 mb-1">Características y Ventajas:</label>
                <textarea id="ad-feature" oninput="app.updateAdPreview('feature', this.value)" class="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-bold" rows="2">${this.labState.adBuilder.feature}</textarea>
              </div>
              <div>
                <label class="block text-xs font-black uppercase text-slate-700 mb-1">Eslogan Pegadizo:</label>
                <input type="text" id="ad-eslogan" value="${this.labState.adBuilder.eslogan}" oninput="app.updateAdPreview('eslogan', this.value)" class="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-bold">
              </div>
              <div>
                <label class="block text-xs font-black uppercase text-slate-700 mb-1">Punto de Venta / Precio:</label>
                <input type="text" id="ad-price" value="${this.labState.adBuilder.price}" oninput="app.updateAdPreview('price', this.value)" class="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-bold">
              </div>
            </div>

            <!-- Vista Previa del Cartel del Anuncio -->
            <div class="card-playful p-6 bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-300 text-center flex flex-col justify-between shadow-md" id="ad-cartel-preview">
              <div>
                <span class="text-[10px] font-black uppercase tracking-widest text-amber-800 bg-amber-200 px-3 py-1 rounded-full">¡Gran Novedad Exclusiva!</span>
                <h3 class="text-2xl font-black text-slate-900 mt-3" id="prev-title">${this.labState.adBuilder.product}</h3>
                <div class="w-24 h-24 mx-auto my-4 rounded-2xl bg-white border-2 border-amber-300 flex items-center justify-center text-5xl shadow-sm">
                  🔍
                </div>
                <p class="text-xs text-slate-700 font-semibold px-4" id="prev-feature">${this.labState.adBuilder.feature}</p>
              </div>
              <div class="mt-6 pt-4 border-t border-amber-200">
                <p class="text-base font-black text-amber-800 italic" id="prev-eslogan">"${this.labState.adBuilder.eslogan}"</p>
                <p class="text-[11px] font-bold text-slate-500 mt-2" id="prev-price">📍 ${this.labState.adBuilder.price}</p>
              </div>
            </div>
          </div>

          <!-- Los 4 Géneros Narrativos -->
          <div class="card-playful p-6">
            <h4 class="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
              <span>📖</span> <span>Las 4 Obras Narrativas Clave de 4.º</span>
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <p class="font-black text-amber-800 text-sm">1. El Cuento</p>
                <p class="text-slate-600 mt-1">Relato breve de ficción con pocos personajes y argumento sencillo.</p>
              </div>
              <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <p class="font-black text-indigo-800 text-sm">2. La Novela</p>
                <p class="text-slate-600 mt-1">Narración extensa y compleja, dividida en capítulos con varios personajes.</p>
              </div>
              <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <p class="font-black text-emerald-800 text-sm">3. La Fábula</p>
                <p class="text-slate-600 mt-1">Historia corta con animales que hablan y una moraleja didáctica final.</p>
              </div>
              <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <p class="font-black text-purple-800 text-sm">4. La Leyenda</p>
                <p class="text-slate-600 mt-1">Relato tradicional sobre lugares reales con elementos mágicos y populares.</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  getRootsForPrefix(prefix) {
    const tabData = this.data.lab.tabs.find(t => t.id === "prefijos");
    const item = tabData.items.find(i => i.prefix === prefix) || tabData.items[0];
    return item.examples;
  }

  selectLabPrefix(prefix) {
    this.labState.selectedPrefix = prefix;
    const roots = this.getRootsForPrefix(prefix);
    this.labState.selectedRoot = roots[0] ? roots[0].root : "";
    if (window.soundManager) window.soundManager.playClick();
    this.renderLab();
  }

  selectLabRoot(root) {
    this.labState.selectedRoot = root;
    if (window.soundManager) window.soundManager.playClick();
    this.renderLab();
  }

  renderPrefixResult() {
    const tabData = this.data.lab.tabs.find(t => t.id === "prefijos");
    const item = tabData.items.find(i => i.prefix === this.labState.selectedPrefix);
    if (!item) return "";

    const ex = item.examples.find(e => e.root === this.labState.selectedRoot) || item.examples[0];
    if (!ex) return "";

    return `
      <div class="inline-flex items-center gap-3 bg-amber-100/70 border-2 border-amber-300 px-6 py-4 rounded-3xl animate-pop">
        <span class="text-2xl font-black text-amber-800">${this.labState.selectedPrefix}</span>
        <span class="text-xl font-bold text-slate-400">+</span>
        <span class="text-2xl font-black text-slate-800">${ex.root}</span>
        <span class="text-xl font-bold text-slate-400">=</span>
        <span class="text-3xl font-black text-amber-700 bg-white px-4 py-2 rounded-2xl shadow-xs border border-amber-300">${ex.result}</span>
      </div>
      <p class="text-xs sm:text-sm font-semibold text-slate-600 mt-3">
        Significado derivado: <strong>${ex.desc}</strong> (${item.meaning})
      </p>
    `;
  }

  inspectWord(word, syllables, ending, hasTilde, reason) {
    if (window.soundManager) window.soundManager.playClick();
    const resEl = document.getElementById("word-inspector-result");
    if (!resEl) return;

    resEl.innerHTML = `
      <div class="animate-pop space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-2xl font-black ${hasTilde ? 'text-emerald-700' : 'text-rose-700'}">${word}</span>
          <span class="text-xs font-bold bg-slate-200 px-2 py-0.5 rounded-md">Separación: ${syllables}</span>
          <span class="text-xs font-black ${hasTilde ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'} px-2.5 py-0.5 rounded-full">
            ${hasTilde ? 'SÍ lleva tilde' : 'NO lleva tilde'}
          </span>
        </div>
        <p class="text-xs text-slate-700 font-semibold leading-relaxed">
          <strong>Justificación formal:</strong> «${reason}».
        </p>
      </div>
    `;
  }

  updateAdPreview(field, val) {
    this.labState.adBuilder[field] = val;
    const el = document.getElementById(`prev-${field}`);
    if (el) {
      if (field === "eslogan") el.textContent = `"${val}"`;
      else if (field === "price") el.textContent = `📍 ${val}`;
      else el.textContent = val;
    }
  }

  // ===========================================================================
  // VISTA 7: ESQUEMAS VISUALES Y DIPLOMA
  // ===========================================================================
  renderCheatsheet() {
    const container = document.getElementById("cheatsheet-cards");
    if (container) {
      container.innerHTML = this.data.summaryCards.map(c => `
        <div class="card-playful p-6 border-2 ${c.color}">
          <h3 class="text-lg font-black mb-3">${c.title}</h3>
          <ul class="space-y-2 text-xs sm:text-sm">
            ${c.content.map(li => {
              const formatted = li.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
              return `<li class="leading-relaxed">• ${formatted}</li>`;
            }).join("")}
          </ul>
        </div>
      `).join("");
    }

    const dipName = document.getElementById("diploma-student");
    const dipGrade = document.getElementById("diploma-grade");
    const dipDate = document.getElementById("diploma-date");
    const dipStars = document.getElementById("diploma-stars");

    if (dipName) dipName.textContent = this.studentName;
    if (dipGrade) dipGrade.textContent = this.examState.lastScore ? `${this.examState.lastScore} / 10` : "10 / 10";
    if (dipDate) {
      const now = new Date();
      dipDate.textContent = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    if (dipStars) dipStars.textContent = `${this.stars} estrellas ⭐`;
  }

  updateStudentName(name) {
    this.studentName = name || "Olivia";
    const dipName = document.getElementById("diploma-student");
    if (dipName) dipName.textContent = this.studentName;
  }

  printDiploma() {
    if (window.soundManager) window.soundManager.playCelebration();
    window.print();
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.app = new LenguaApp();
});
