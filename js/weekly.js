let goals = JSON.parse(localStorage.getItem("goals")) || [];

let today = new Date();
let weekAgo = new Date();
weekAgo.setDate(today.getDate() - 6);

let weeklyGoals = goals.filter(g => {
  let d = new Date(g.date);
  return d >= weekAgo && d <= today;
});

let total = weeklyGoals.length;
let completed = weeklyGoals.filter(g => g.done).length;
let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

document.getElementById("weeklyProgress").innerText =
  percent + "% (Last 7 days)";
