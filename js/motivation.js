// Study-related motivational quotes
const studyQuotes = [
  "📚 Success is the sum of small efforts repeated every day.",
  "⏳ Focus on progress, not perfection.",
  "🔥 One focused hour today beats ten distracted hours tomorrow.",
  "🎯 Discipline now creates freedom later.",
  "📖 Study while others sleep. Succeed while others dream.",
  "🚀 Your future self will thank you for studying today.",
  "🧠 Consistency turns knowledge into mastery.",
  "🏆 Hard work today leads to success tomorrow."
];

// Button + text reference
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".primary-btn");
  const text = button.previousElementSibling;

  button.addEventListener("click", () => {
    const randomQuote =
      studyQuotes[Math.floor(Math.random() * studyQuotes.length)];
    text.textContent = randomQuote;
  });
});
