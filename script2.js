/* =========================
   SAFE ELEMENT QUERY HELPER
========================= */
function $(id) {
  return document.getElementById(id);
}

/* =========================
   HOVER GLOW EFFECTS
========================= */
document.querySelectorAll("button, .card, .hex").forEach(el => {
  el.addEventListener("mouseenter", () => {
    el.style.boxShadow = "0 0 20px rgba(0,242,195,0.3)";
  });
  el.addEventListener("mouseleave", () => {
    el.style.boxShadow = "";
  });
});


/* =========================
   BACKGROUND MUSIC
========================= */
const music = $("bg-music");
const musicBtn = $("music-toggle");

const volumeSlider = $("volume-control");
const volDown = $("vol-down");
const volUp = $("vol-up");
const volPercent = $("vol-percent");

let musicPlaying = false;

/* ---- Guard: run only if music exists on page ---- */
if (music && musicBtn && volumeSlider && volDown && volUp && volPercent) {

  /* =========================
     VOLUME HANDLER (LOG SCALE)
  ========================= */
  function updateVolume(value) {
    value = Math.min(1, Math.max(0, value));
    volumeSlider.value = value;
    music.volume = value ** 3;
    volPercent.textContent = Math.round(value * 100) + "%";
  }

  updateVolume(parseFloat(volumeSlider.value));

  /* =========================
     MUSIC TOGGLE BUTTON
  ========================= */
  musicBtn.addEventListener("click", () => {
    if (!musicPlaying) {
      music.play();
      updateVolume(parseFloat(volumeSlider.value));
      musicBtn.textContent = "🔊";
      musicPlaying = true;
    } else {
      music.pause();
      musicBtn.textContent = "🔇";
      musicPlaying = false;
    }
  });

  /* =========================
     VOLUME CONTROLS
  ========================= */
  volumeSlider.addEventListener("input", () => {
    updateVolume(parseFloat(volumeSlider.value));
  });

  volDown.addEventListener("click", () => {
    updateVolume(parseFloat(volumeSlider.value) - 0.05);
  });

  volUp.addEventListener("click", () => {
    updateVolume(parseFloat(volumeSlider.value) + 0.05);
  });
}


/* =========================
   HEXAGON DOWNLOAD (MULTI-PAGE SAFE)
========================= */
document.querySelectorAll(".hex").forEach(hex => {
  hex.addEventListener("click", () => {
    const fileUrl = hex.dataset.download;
    if (!fileUrl) return;

    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileUrl.split("/").pop();
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});


/* =========================
   YOUTUBE VIDEO PLAYER
========================= */
function openVideo(videoId) {
  const modal = $("videoModal");
  const player = $("ytPlayer");

  if (!modal || !player) return;

  player.src =
    `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  modal.style.display = "flex";
}

function closeVideo() {
  const modal = $("videoModal");
  const player = $("ytPlayer");

  if (!modal || !player) return;

  player.src = "";
  modal.style.display = "none";
}

document.addEventListener("click", () => {
  if (!musicPlaying) {
    music.play().then(() => {
      musicPlaying = true;
      musicBtn.textContent = "🔊";
    }).catch(() => {});
  }
}, { once: true });


/* =========================
   YOUTUBE VIDEO PLAYER
========================= */
function openVideo(videoId) {
  const modal = $("videoModal");
  const player = $("ytPlayer");

  if (!modal || !player) return;

  // Remove unavailable message if it exists
  const msg = document.getElementById("video-unavailable-msg");
  if (msg) msg.remove();

  // Show iframe again
  player.style.display = "block";

  player.src =
    `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  modal.style.display = "flex";
}

function closeVideo() {
  const modal = $("videoModal");
  const player = $("ytPlayer");

  if (!modal || !player) return;

  player.src = "";

  // Remove message if present
  const msg = document.getElementById("video-unavailable-msg");
  if (msg) msg.remove();

  player.style.display = "block";

  modal.style.display = "none";
}


/* =========================
   COMING SOON VIDEO MESSAGE
========================= */
function comingSoonVideo() {
  const modal = $("videoModal");
  const player = $("ytPlayer");

  if (!modal || !player) return;

  // Stop any video
  player.src = "";

  // Hide iframe
  player.style.display = "none";

  // Create message
  let msg = document.getElementById("video-unavailable-msg");

  if (!msg) {
    msg = document.createElement("div");
    msg.id = "video-unavailable-msg";

    msg.style.cssText = `
      width:100%;
      height:450px;
      display:flex;
      align-items:center;
      justify-content:center;
      color:white;
      font-size:22px;
      text-align:center;
      font-weight:500;
    `;

    msg.innerHTML = "This video is currently unavailable.<br>Check back later!";

    player.parentElement.appendChild(msg);
  }

  modal.style.display = "flex";
}