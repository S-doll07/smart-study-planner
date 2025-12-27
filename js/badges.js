let badges = JSON.parse(localStorage.getItem("badges")) || [];

function unlockBadge(name, emoji) {
  if (!badges.includes(name)) {
    badges.push(name);
    localStorage.setItem("badges", JSON.stringify(badges));
    alert(`🏅 Badge Unlocked: ${emoji} ${name}`);
  }
}

function checkBadges() {
  const streak = parseInt(localStorage.getItem("streak")) || 0;
  const completed = parseInt(localStorage.getItem("completedSlots")) || 0;
  const deepFocus = parseInt(localStorage.getItem("deepFocusCount")) || 0;

  if (streak >= 3) unlockBadge("3-Day Streak", "🔥");
  if (completed >= 10) unlockBadge("10 Focus Sessions", "⏱");
  if (deepFocus >= 5) unlockBadge("Deep Focus Master", "🧠");

  const hour = new Date().getHours();
  if (hour >= 22) unlockBadge("Late Night Learner", "🌙");
}
