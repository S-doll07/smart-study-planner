document.querySelectorAll("[data-count]").forEach(el => {
  let target = +el.dataset.count;
  let count = 0;

  let step = setInterval(() => {
    count++;
    el.innerText = count;
    if (count >= target) clearInterval(step);
  }, 15);
});
