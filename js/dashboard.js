// Load timetable data
const timetable = JSON.parse(localStorage.getItem("timetable")) || [];
const streak = localStorage.getItem("streak") || 0;

// Dashboard elements
const countEl = document.getElementById("count");
const streakEl = document.getElementById("streak");

// Calculate unique subjects
const uniqueSubjects = new Set(
  timetable.map(slot => slot.subject)
);

// Update dashboard
if (countEl) {
  countEl.innerText = uniqueSubjects.size;
}

if (streakEl) {
  streakEl.innerText = streak;
}
