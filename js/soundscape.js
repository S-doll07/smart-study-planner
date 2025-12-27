let audio = new Audio();
audio.loop = true;
audio.volume = 0.6;

const sounds = {
  forest: "assets/sounds/forest.mp3",
  rain: "assets/sounds/rain.mp3",
  noise: "assets/sounds/noise.mp3"
};

// USER CLICK → PLAY (allowed by browser)
function playSound(type) {
  if (!sounds[type]) return;

  audio.src = sounds[type];
  audio.currentTime = 0;

  audio.play().then(() => {
    localStorage.setItem("soundPlaying", "true");
    localStorage.setItem("soundType", type);
  }).catch(err => {
    console.log("Playback blocked:", err);
  });
}

// STOP SOUND
function stopSound() {
  audio.pause();
  audio.currentTime = 0;
  localStorage.removeItem("soundPlaying");
  localStorage.removeItem("soundType");
}

// PAGE LOAD → RESUME ONLY IF USER ALREADY STARTED SOUND
window.addEventListener("DOMContentLoaded", () => {
  const isPlaying = localStorage.getItem("soundPlaying");
  const soundType = localStorage.getItem("soundType");

  if (isPlaying === "true" && soundType && sounds[soundType]) {
    audio.src = sounds[soundType];

    // resume only after any click (browser rule)
    document.body.addEventListener("click", () => {
      audio.play().catch(() => {});
    }, { once: true });
  }
});
