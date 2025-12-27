let today = new Date().toDateString();
let reflections = JSON.parse(localStorage.getItem("reflections")) || {};

document.getElementById("reflection").value =
  reflections[today] || "";

function saveReflection() {
  reflections[today] =
    document.getElementById("reflection").value;

  localStorage.setItem(
    "reflections",
    JSON.stringify(reflections)
  );

  document.getElementById("savedMsg").innerText =
    "Reflection saved ✔";
}
