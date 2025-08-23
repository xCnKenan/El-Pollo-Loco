let screenCanvas;
let mainScreen; // wie world
let boundingRect;
let ctxStart;
let intervallIds = [];
let animationFrameId = null;

function getFullScreen() {
  let divRef = document.getElementById("relativeDiv");
  openFullscreen(divRef);
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

function loadStartScreen() {
  screenCanvas = document.getElementById("canvas");
  ctxStart = screenCanvas.getContext("2d");
  mainScreen = new Mainscreen(screenCanvas);
  checkCharacterEnergy();
  checkAudioStatus();
  game_over.pause();
  success.pause();
  success.currentTime = 0;
  if (animationFrameId != null) {
    stopDrawLoop();
  }
}

function checkAudioStatus() {
  if (localStorage.getItem("gameAudio") === null) {
    localStorage.setItem("gameAudio", JSON.stringify(true));
  }
  let newStatus = JSON.parse(localStorage.getItem("gameAudio"));
  toggleSoundImg(newStatus);
}

function checkCharacterEnergy() {
  if (world) {
    world.character.energy = 100;
  } else {
    return;
  }
}

function removeButtons() {
  let canvasRef = document.getElementById("canvas");
  canvasRef.style.backgroundImage = "none";
  let controllsOverlayRef = document.getElementById("controllsOverlay");
  controllsOverlayRef.classList.add("d-none");
  addDisplayNone("startButton");
  addDisplayNone("controllsButton");
}

function stopDrawLoop() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function removeEndScreenButtons() {
  addDisplayNone("restart");
  addDisplayNone("home");
}

// Wrapper für setInterval
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervallIds.push(id);
}

// Stoppt alle Intervalle
function clearStoppableIntervals() {
  intervallIds.forEach((id) => clearInterval(id));
}

function restartGame() {
  clearStoppableIntervals();
  stopDrawLoop();
  world = null;
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  initLevel1();
  init();
  removeEndScreenButtons();
  endgame_level.pause();
  endgame_level.currentTime = 0;
  success.pause();
  success.currentTime = 0;
}

function addDisplayNone(id) {
  let idRef = document.getElementById(id);
  // idRef.remove();
  idRef.classList.add("d-none");
}

function toggleOverlay(event) {
  event.stopPropagation(event);
  let controllsOverlayRef = document.getElementById("controllsOverlay");
  controllsOverlayRef.classList.toggle("d-none");
}

function stopPropagation(event) {
  event.stopPropagation(event);
}

function closeOverlay() {
  let controllsOverlayRef = document.getElementById("controllsOverlay");
  controllsOverlayRef.classList.add("d-none");
}

function backToHomeScreen() {
  removeDisplayNone("startButton");
  removeDisplayNone("controllsButton");
  addDisplayNone("restart");
  addDisplayNone("home");
  endgame_level.pause();
  endgame_level.currentTime = 0;
}

function removeDisplayNone(id) {
  let idRef = document.getElementById(id);
  // idRef.remove();
  idRef.classList.remove("d-none");
}
