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
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");

const volumeSlider = document.getElementById("volume-control");
const volDown = document.getElementById("vol-down");
const volUp = document.getElementById("vol-up");
const volPercent = document.getElementById("vol-percent");

let musicPlaying = false;


/* =========================
   VOLUME HANDLER (LOG SCALE)
========================= */
function updateVolume(value) {
  value = Math.min(1, Math.max(0, value)); // clamp 0–1
  volumeSlider.value = value;

  // Ultra-low quiet curve
  music.volume = value ** 3;

  volPercent.textContent = Math.round(value * 100) + "%";
}

// Initialize volume on load
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
// Slider
volumeSlider.addEventListener("input", () => {
  updateVolume(parseFloat(volumeSlider.value));
});

// Minus
volDown.addEventListener("click", () => {
  updateVolume(parseFloat(volumeSlider.value) - 0.05);
});

// Plus
volUp.addEventListener("click", () => {
  updateVolume(parseFloat(volumeSlider.value) + 0.05);
});

updateVolume(parseFloat(volumeSlider.value));


/* =========================
   UNIVERSAL PAGE / TAB NAVIGATION
========================= */
function showTab(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
    page.style.display = "none"; // hide everything 
  });

  // Show the requested page
  const page = document.getElementById(pageId);
  page.classList.add("active");
  page.style.display = ""; // use CSS default (flex/grid)

  // If home, show its internal sections
  if (pageId === "home") {
    const homeSections = ["hero", "tutorials", "template"];
    homeSections.forEach(sel => {
      const el = document.querySelector(`.${sel}`);
      if (el) el.style.display = ""; // reset to CSS
    });
  }

  // If video, show the videos-page section
  if (pageId === "video") {
    const videosPage = document.getElementById("videos-page");
    if (videosPage) videosPage.style.display = "";
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}
// HEXAGON DOWNLOAD
document.querySelectorAll(".hex").forEach(hex => {
  hex.addEventListener("click", () => {
    const fileUrl = hex.dataset.download;
    if (!fileUrl) return;

    // Create a temporary <a> element just like your download buttons
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileUrl.split("/").pop(); // use the filename from URL
    a.style.display = "none";             // keep it hidden
    document.body.appendChild(a);
    a.click();                             // trigger download
    document.body.removeChild(a);          // clean up
  });
});

/* =========================
   YOUTUBE VIDEO PLAYER
========================= */
function openVideo(videoId) {
  const modal = document.getElementById("videoModal");
  const player = document.getElementById("ytPlayer");

  player.src =
    `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  modal.style.display = "flex";
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const player = document.getElementById("ytPlayer");

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
