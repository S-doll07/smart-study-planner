/* ================= ELEMENTS ================= */
const goalInput = document.getElementById("goalInput");
const timetableSelect = document.getElementById("timetableSelect");
const goalList = document.getElementById("goalList");

/* ================= TIME HELPERS ================= */
// supports: 2.00 | 2:00 | 3.35 | 4.00pm | 10.30am
function parseTimeToMinutes(raw) {
  if (!raw) return null;

  let str = raw.toLowerCase().trim();
  const isPM = str.includes("pm");
  const isAM = str.includes("am");

  str = str.replace("am", "").replace("pm", "").trim();
  str = str.replace(".", ":");

  let [h, m] = str.split(":").map(Number);
  if (isNaN(h)) return null;
  if (isNaN(m)) m = 0;

  if (isPM && h < 12) h += 12;
  if (isAM && h === 12) h = 0;

  return h * 60 + m;
}

function buildSlotTime(slotTime) {
  if (!slotTime || !slotTime.includes("-")) return null;

  const [startStr, endStr] = slotTime.split("-");
  const startMin = parseTimeToMinutes(startStr);
  const endMin = parseTimeToMinutes(endStr);

  if (startMin === null || endMin === null || endMin <= startMin) return null;

  const today = new Date();
  const start = new Date(today);
  const end = new Date(today);

  start.setHours(Math.floor(startMin / 60), startMin % 60, 0, 0);
  end.setHours(Math.floor(endMin / 60), endMin % 60, 0, 0);

  return {
    startTS: start.getTime(),
    endTS: end.getTime()
  };
}

/* ================= LOAD TIMETABLE ================= */
function loadTimetable() {
  const timetable = JSON.parse(localStorage.getItem("timetable")) || [
    { subject: "ToFC", time: "2.00-3.00" },
    { subject: "OS", time: "3.00-4.00" },
    { subject: "GK", time: "4.00-4.30" }
  ];

  localStorage.setItem("timetable", JSON.stringify(timetable));

  timetableSelect.innerHTML = `<option value="">Select Time Slot</option>`;
  timetable.forEach((slot, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${slot.subject} (${slot.time})`;
    timetableSelect.appendChild(opt);
  });
}

/* ================= ADD GOAL ================= */
function addGoal() {
  const text = goalInput.value.trim();
  const idx = timetableSelect.value;

  if (!text || idx === "") {
    alert("Enter goal and select time slot");
    return;
  }

  const timetable = JSON.parse(localStorage.getItem("timetable"));
  const slot = timetable[idx];
  const slotData = buildSlotTime(slot.time);

  if (!slotData) {
    alert("Invalid time format");
    return;
  }

  const goals = JSON.parse(localStorage.getItem("goals")) || [];
  goals.push({
    text,
    subject: slot.subject,
    time: slot.time,
    completed: false,
    ...slotData
  });

  localStorage.setItem("goals", JSON.stringify(goals));
  goalInput.value = "";
  timetableSelect.value = "";
  renderGoals();
}

/* ================= START MODE ================= */
function startSelectedMode(index) {
  const mode = document.getElementById(`mode-${index}`).value;
  if (!mode) return alert("Select a mode");

  const goals = JSON.parse(localStorage.getItem("goals"));
  const goal = goals[index];
  const now = Date.now();

  if (goal.completed) return;

  if (mode !== "instant") {
    if (now < goal.startTS) return alert("⏳ Slot not started yet");
    if (now > goal.endTS) return alert(`⏰ Time allotted (${goal.time}) is over`);
  }

  if (mode === "focus") {
    const remaining = goal.endTS - now;
    alert(`🎯 Focus started for ${Math.ceil(remaining / 60000)} minutes`);
    setTimeout(() => completeGoal(index), remaining);
  }

  if (mode === "reflection") {
    const text = prompt("🧠 What did you learn?");
    if (!text) return;
    goal.reflection = text;
    completeGoal(index);
  }

  if (mode === "streak") {
    let streak = Number(localStorage.getItem("streak")) || 0;
    streak++;
    localStorage.setItem("streak", streak);
    completeGoal(index);
  }

  if (mode === "instant") completeGoal(index);
}

/* ================= COMPLETE ================= */
function completeGoal(index) {
  const goals = JSON.parse(localStorage.getItem("goals"));
  goals[index].completed = true;
  localStorage.setItem("goals", JSON.stringify(goals));
  renderGoals();
}

/* ================= CLEAR FINISHED ================= */
function clearFinishedSlots() {
  const now = Date.now();
  let goals = JSON.parse(localStorage.getItem("goals")) || [];

  goals = goals.filter(g => !(g.completed && now > g.endTS));

  localStorage.setItem("goals", JSON.stringify(goals));
  renderGoals();
}

/* ================= RENDER ================= */
function renderGoals() {
  const goals = JSON.parse(localStorage.getItem("goals")) || [];
  const now = Date.now();
  goalList.innerHTML = "";

  goals.forEach((g, i) => {
    let status;

    if (g.completed) status = "✅ Completed";
    else if (now < g.startTS) status = "🕒 Upcoming";
    else if (now <= g.endTS) status = "🟢 Active";
    else status = "🔴 Time Over";

    const li = document.createElement("li");
    li.innerHTML = `
      ${g.text} → ${g.subject} (${g.time})
      <b>${status}</b><br>
      ${
        g.completed
          ? ""
          : `
          <select id="mode-${i}">
            <option value="">Select Mode</option>
            <option value="focus">🎯 Focus</option>
            <option value="reflection">🧠 Reflection</option>
            <option value="streak">🔥 Streak</option>
            <option value="instant">⚡ Instant</option>
          </select>
          <button onclick="startSelectedMode(${i})">Start</button>
        `
      }
    `;
    goalList.appendChild(li);
  });
}

/* ================= INIT ================= */
loadTimetable();
renderGoals();
