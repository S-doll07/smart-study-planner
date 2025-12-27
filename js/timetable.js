/* =========================
   GLOBAL STATE
========================= */
let timetable = JSON.parse(localStorage.getItem("timetable")) || [];
let activeTimers = {};

/* =========================
   ADD SUBJECT
========================= */
function addSubject() {
  const subject = document.getElementById("subject").value.trim();
  const fromTime = document.getElementById("fromTime").value;
  const toTime = document.getElementById("toTime").value;
  const mode = document.getElementById("mode").value;

  if (!subject || !fromTime || !toTime) {
    alert("Please fill all fields");
    return;
  }

  const duration = calculateDuration(fromTime, toTime);

  timetable.push({
    subject,
    fromTime,
    toTime,
    mode,
    duration,
    remaining: duration,
    running: false,
    completed: false
  });

  document.getElementById("subject").value = "";
  save();
  render();
}

/* =========================
   TIME CALCULATION
========================= */
function calculateDuration(from, to) {
  const [fh, fm] = from.split(":").map(Number);
  const [th, tm] = to.split(":").map(Number);
  return (th * 60 + tm - (fh * 60 + fm)) * 60;
}

/* =========================
   START TIMER
========================= */
function startTimer(index) {
  if (activeTimers[index]) return;

  timetable[index].running = true;

  activeTimers[index] = setInterval(() => {
    if (timetable[index].remaining <= 0) {
      stopTimer(index);
      markCompleted(index);
      return;
    }

    timetable[index].remaining--;
    save();
    render();
  }, 1000);

  save();
  render();
}

/* =========================
   STOP TIMER
========================= */
function stopTimer(index) {
  if (activeTimers[index]) {
    clearInterval(activeTimers[index]);
    delete activeTimers[index];
  }

  timetable[index].running = false;
  save();
  render();
}

/* =========================
   MARK COMPLETED SLOT
========================= */
function markCompleted(index) {
  if (timetable[index].completed) return;

  timetable[index].completed = true;

  /* ✅ COMPLETED SESSIONS */
  let completed = parseInt(localStorage.getItem("completedSlots")) || 0;
  completed++;
  localStorage.setItem("completedSlots", completed);

  /* ✅ WEEKLY DATA */
  let weekly =
    JSON.parse(localStorage.getItem("weeklyStudyData")) ||
    [0, 0, 0, 0, 0, 0, 0];

  const day = new Date().getDay(); // Sun=0
  const indexDay = day === 0 ? 6 : day - 1;
  weekly[indexDay]++;

  localStorage.setItem("weeklyStudyData", JSON.stringify(weekly));

  /* 🔥 AUTO STREAK */
  if (typeof updateStreakAuto === "function") {
    updateStreakAuto();
  } else {
    console.warn("updateStreakAuto() not loaded");
  }

  /* 🎮 XP SYSTEM */
  let xp = parseInt(localStorage.getItem("xp")) || 0;
  xp += 20; // ✅ 20 XP per completed session
  localStorage.setItem("xp", xp);

  save();
}

/* =========================
   CLEAR ALL
========================= */
function clearAll() {
  if (!confirm("Clear all subjects?")) return;

  timetable = [];
  activeTimers = {};

  localStorage.removeItem("timetable");
  localStorage.removeItem("plannedSlots");
  localStorage.removeItem("completedSlots");
  localStorage.removeItem("weeklyStudyData");

  save();
  render();
}

/* =========================
   SAVE STATS
========================= */
function save() {
  localStorage.setItem("timetable", JSON.stringify(timetable));
  localStorage.setItem("plannedSlots", timetable.length);
}

/* =========================
   RENDER UI
========================= */
function render() {
  const list = document.getElementById("timetableList");
  const totalSubjects = document.getElementById("totalSubjects");
  const totalSlots = document.getElementById("totalSlots");

  list.innerHTML = "";

  timetable.forEach((item, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${item.subject}</strong><br>
      ${item.fromTime} - ${item.toTime}<br>
      Mode: ${item.mode}<br>
      ⏱ ${formatTime(item.remaining)}<br>

      <button onclick="startTimer(${i})" ${item.running ? "disabled" : ""}>
        ▶ Start
      </button>

      <button class="danger" onclick="stopTimer(${i})" ${!item.running ? "disabled" : ""}>
        ⏸ Stop
      </button>
    `;

    list.appendChild(li);
  });

  totalSubjects.innerText = timetable.length;
  totalSlots.innerText = timetable.length;
}

/* =========================
   FORMAT TIME
========================= */
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
}

/* =========================
   INIT
========================= */
render();
