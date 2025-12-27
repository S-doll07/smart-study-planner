document.addEventListener("DOMContentLoaded", () => {

  /* ===== LOAD DATA ===== */
  let plannedSlots = Number(localStorage.getItem("plannedSlots")) || 0;
  let completedSlots = Number(localStorage.getItem("completedSlots")) || 0;
  let streak = Number(localStorage.getItem("streak")) || 0;
  let mood = localStorage.getItem("mood") || "Not set";
  let xp = Number(localStorage.getItem("xp")) || 0;

  /* ===== SUMMARY ===== */
  total.innerText = plannedSlots;
  completed.innerText = completedSlots;
  progressStreak.innerText = streak;
  lastMood.innerText = mood;

  let percent = plannedSlots
    ? Math.min((completedSlots / plannedSlots) * 100, 100)
    : 0;

  progressBar.style.width = percent + "%";
  progressText.innerText = Math.round(percent) + "% completed";

  /* ===== LEVEL SYSTEM ===== */
  function updateLevel() {
    let level = 1, title = "Beginner", nextXP = 50;

    if (xp >= 350) { level = 5; title = "Discipline Master"; nextXP = 999; }
    else if (xp >= 200) { level = 4; title = "Deep Focus Pro"; nextXP = 350; }
    else if (xp >= 100) { level = 3; title = "Focus Explorer"; nextXP = 200; }
    else if (xp >= 50) { level = 2; title = "Rising Learner"; nextXP = 100; }

    userLevel.innerText = `Level ${level} — ${title}`;

    let baseXP = [0, 0, 50, 100, 200, 350][level];
    let progress = ((xp - baseXP) / (nextXP - baseXP)) * 100;

    xpBar.style.width = Math.min(progress, 100) + "%";
    xpText.innerText = `XP: ${xp} / ${nextXP}`;
  }

  function addXP(amount) {
    xp += amount;
    localStorage.setItem("xp", xp);
    updateLevel();
  }

  updateLevel();

  /* ===== SUDOKU (MULTI-ANSWER) ===== */
  const puzzles = [
    [[1,0,0,4],[0,4,1,0],[0,1,4,0],[4,0,0,1]],
    [[0,2,0,4],[3,0,1,0],[0,1,0,3],[4,0,2,0]],
    [[1,0,3,0],[0,4,0,2],[2,0,4,0],[0,3,0,1]]
  ];

  let currentPuzzle = [];

  window.newSudoku = function () {
    sudokuMsg.innerText = "";
    sudokuGrid.innerHTML = "";
    currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

    currentPuzzle.forEach((row, r) => {
      row.forEach((val, c) => {
        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 4;
        input.dataset.r = r;
        input.dataset.c = c;

        if (val !== 0) {
          input.value = val;
          input.disabled = true;
          input.classList.add("fixed");
        }
        sudokuGrid.appendChild(input);
      });
    });
  };

  window.checkSudoku = function () {
    let board = Array.from({ length: 4 }, () => []);

    document.querySelectorAll(".sudoku-grid input").forEach(i => {
      let v = Number(i.value);
      if (v < 1 || v > 4) {
        sudokuMsg.innerText = "❌ Fill all cells (1–4)";
        return;
      }
      board[i.dataset.r][i.dataset.c] = v;
    });

    if (isValid(board)) {
      sudokuMsg.innerText = "🎉 Correct! +50 XP";
      addXP(50);
      setTimeout(newSudoku, 1200);
    } else {
      sudokuMsg.innerText = "❌ Invalid Sudoku";
    }
  };

  function isValid(b) {
    for (let i = 0; i < 4; i++) {
      let r = new Set(), c = new Set();
      for (let j = 0; j < 4; j++) {
        if (r.has(b[i][j]) || c.has(b[j][i])) return false;
        r.add(b[i][j]); c.add(b[j][i]);
      }
    }
    for (let r = 0; r < 4; r += 2)
      for (let c = 0; c < 4; c += 2) {
        let box = new Set();
        for (let i = 0; i < 2; i++)
          for (let j = 0; j < 2; j++) {
            let v = b[r+i][c+j];
            if (box.has(v)) return false;
            box.add(v);
          }
      }
    return true;
  }

  newSudoku();
});
