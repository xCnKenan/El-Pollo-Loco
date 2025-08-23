let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  checkAudioOnload();
  startGameMusicFromBeginning();
  removeDisplayNone("mobileButtons");
}

function checkAudioOnload() {
  let audioStatus = JSON.parse(localStorage.getItem("gameAudio"));
  if (!audioStatus) {
    muteAllSounds();
  } else {
    unmuteAllSounds();
  }
  toggleSoundImg(audioStatus);
}

function startGameMusicFromBeginning() {
  gameMusic.play();
  gameMusic.loop = true;
  game_over.currentTime = 0;
  game_over.pause();
}

// desktop version
function toggleAudio() {
  let audioStatus = JSON.parse(localStorage.getItem("gameAudio"));
  if (audioStatus) {
    localStorage.setItem("gameAudio", JSON.stringify(false));
    muteAllSounds();
  } else if (!audioStatus) {
    localStorage.setItem("gameAudio", JSON.stringify(true));
    unmuteAllSounds();
  }
  let newStatus = JSON.parse(localStorage.getItem("gameAudio"));
  toggleSoundImg(newStatus);
}

function toggleSoundImg(newStatus) {
  if (newStatus) {
    removeImg("speaker");
    addImg("no-audio");
    removeImg("speakerMobile");
    addImg("no-audioMobile");
  } else if (!newStatus) {
    addImg("speaker");
    removeImg("no-audio");
    addImg("speakerMobile");
    removeImg("no-audioMobile");
  }
}

function addImg(id) {
  let idRef = document.getElementById(id);
  if (!idRef) return;
  idRef.classList.add("d-none");
}

function removeImg(id) {
  let idRef = document.getElementById(id);
  if (!idRef) return;
  idRef.classList.remove("d-none");
}

function muteAllSounds() {
  gameSounds.forEach((sound) => (sound.muted = true));
}

function unmuteAllSounds() {
  gameSounds.forEach((sound) => (sound.muted = false));
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    // right
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    // left
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    // up
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    // down
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    // space
    keyboard.SPACE = true;
  }
  if (event.keyCode == 68) {
    // d
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    // right
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    // left
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    // up
    keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    // down
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    // space
    keyboard.SPACE = false;
  }
  if (event.keyCode == 68) {
    // d
    keyboard.D = false;
  }
  if (event.keyCode == 77) {
    toggleAudio(); // M to Mute or unmute Gamesounds
  }
});

// test mobile version
window.addEventListener("load", checkMobileButtons);
window.addEventListener("resize", checkMobileButtons);

function checkMobileButtons() {
  let isMobile = window.matchMedia(
    "(max-width: 768px) and (orientation: landscape)"
  ).matches;

  let isTablet = window.matchMedia(
    "(max-width: 1024px) and (orientation: landscape)"
  ).matches;

  if (isMobile || isTablet) {
    document.getElementById("mobileButtons").style.display = "flex";
    bindMobileButtons();
  } else {
    document.getElementById("mobileButtons").style.display = "none";
  }
}

function bindMobileButtons() {
  addButtonEvents("btn-left", "LEFT");
  addButtonEvents("btn-right", "RIGHT");
  addButtonEvents("btn-space", "SPACE");
  addButtonEvents("btn-d", "D");
}

function addButtonEvents(elementId, key) {
  let elementIdRef = document.getElementById(elementId);
  elementIdRef.addEventListener("touchstart", () => (keyboard[key] = true));
  elementIdRef.addEventListener("mousedown", () => (keyboard[key] = true));
  elementIdRef.addEventListener("touchend", () => (keyboard[key] = false));
  elementIdRef.addEventListener("mouseup", () => (keyboard[key] = false));
  elementIdRef.addEventListener("mouseleave", () => (keyboard[key] = false));
}
