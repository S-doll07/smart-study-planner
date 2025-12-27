function resetDailyGoals() {
  let today = new Date().toDateString();
  let lastReset = localStorage.getItem("lastReset");

  if (lastReset !== today) {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];

    goals.forEach(g => g.done = false);

    localStorage.setItem("goals", JSON.stringify(goals));
    localStorage.setItem("lastReset", today);
  }
}

resetDailyGoals();
