function applyMindBackground() {
  const hour = new Date().getHours();
  document.body.className = "";

  if (hour < 12) document.body.classList.add("morning");
  else if (hour < 17) document.body.classList.add("afternoon");
  else if (hour < 21) document.body.classList.add("evening");
  else document.body.classList.add("night");
}

applyMindBackground();

/* =========================
   SAVE MOOD FUNCTION
========================= */
function saveMood() {
  const moodSelect = document.getElementById("mood");
  if (!moodSelect) return;

  const selectedMood = moodSelect.value;

  // Save mood (KEY MATCHES progress.js)
  localStorage.setItem("mood", selectedMood);

  alert("Mood saved successfully!");
}
