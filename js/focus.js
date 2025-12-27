let focusInterval = null;
let remainingSeconds = 25 * 60; // default 25 min

const TIMER_KEY = "focusRemaining";
const RUNNING_KEY = "focusRunning";

// format seconds → MM:SS
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// update UI
function updateDisplay() {
  const el = document.getElementById("timer");
  if (el) el.innerText = formatTime(remainingSeconds);
}

// ▶️ START
function startFocus() {
  if (focusInterval) return; // prevent multiple timers

  localStorage.setItem(RUNNING_KEY, "true");

  focusInterval = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopFocus();
      alert("🎉 Focus session completed!");
      return;
    }

    remainingSeconds--;
    localStorage.setItem(TIMER_KEY, remainingSeconds);
    updateDisplay();
  }, 1000);
}

// ⏹ STOP (resets timer)
function stopFocus() {
  clearInterval(focusInterval);
  focusInterval = null;

  remainingSeconds = 25 * 60;
  localStorage.removeItem(TIMER_KEY);
  localStorage.removeItem(RUNNING_KEY);

  updateDisplay();
}

// 🔁 Restore on page load
window.addEventListener("load", () => {
  const saved = localStorage.getItem(TIMER_KEY);
  const running = localStorage.getItem(RUNNING_KEY);

  if (saved) remainingSeconds = parseInt(saved, 10);

  updateDisplay();

  if (running === "true") {
    startFocus();
  }
});
