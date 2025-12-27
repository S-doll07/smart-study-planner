function updateStreakAuto() {
  const today = new Date().toDateString();
  const lastDay = localStorage.getItem("lastStudyDay");
  let streak = parseInt(localStorage.getItem("streak")) || 0;

  if (lastDay !== today) {
    streak++;
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastStudyDay", today);
  }

  // 🎉 Trigger celebration
  if (streak > 0 && streak % 3 === 0) {
    const lastCelebrated =
      parseInt(localStorage.getItem("lastCelebrated")) || 0;

    if (lastCelebrated !== streak) {
      localStorage.setItem("lastCelebrated", streak);

      // 🔥 FORCE redirect (works 100%)
      setTimeout(() => {
        window.location.replace("streak-celebration.html");
      }, 500);
    }
  }
}
