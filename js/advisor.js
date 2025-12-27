let goals = JSON.parse(localStorage.getItem("goals")) || [];
let reflections = JSON.parse(localStorage.getItem("reflections")) || {};
let streak = Number(localStorage.getItem("streak")) || 0;

let completed = goals.filter(g => g.done).length;
let today = new Date().toDateString();
let reflectionLength = reflections[today]
  ? reflections[today].length
  : 0;

let advice = "Start with one small goal today 💡";

if (completed >= 10 && streak >= 3) {
  advice = "🔥 Great consistency! Try increasing difficulty tomorrow.";
}
else if (completed >= 5 && reflectionLength < 30) {
  advice = "✍️ You’re doing well—try writing deeper reflections.";
}
else if (streak >= 5) {
  advice = "⚖️ You’ve been consistent. Remember to take breaks.";
}
else if (completed === 0) {
  advice = "🚀 Let’s begin! One goal can change your day.";
}

document.getElementById("advisorText").innerText = advice;
