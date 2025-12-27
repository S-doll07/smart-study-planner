const chart = document.getElementById("chart");
let goals = JSON.parse(localStorage.getItem("goals")) || [];

let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
let data = {};

goals.forEach(g => {
  let day = new Date(g.date).getDay();
  if (!data[day]) data[day] = { total: 0, done: 0 };
  data[day].total++;
  if (g.done) data[day].done++;
});

days.forEach((d, i) => {
  let percent = data[i]
    ? Math.round((data[i].done / data[i].total) * 100)
    : 0;

  let bar = document.createElement("div");
  bar.className = "bar";
  bar.style.height = percent + "%";
  bar.innerHTML = `<span>${d}</span>`;
  chart.appendChild(bar);
});
