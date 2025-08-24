let screenCanvas;
let mainScreen; // wie world
let boundingRect;
let ctxStart;
let intervallIds = [];
let animationFrameId = null;

/**
 * Loads the start screen, initializes canvas and UI states.
 * - Prepares the start screen rendering context.
 * - Resets audio elements.
 * - Stops the draw loop if running.
 *
 * @function loadStartScreen
 * @returns {void}
 */
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

/**
 * Opens the game in fullscreen mode using the relative container.
 *
 * @function getFullScreen
 * @returns {void}
 */
function getFullScreen() {
  let divRef = document.getElementById("relativeDiv");
  openFullscreen(divRef);
}

/**
 * Requests fullscreen mode for a given element.
 * Handles compatibility for different browsers (standard, Safari, IE11).
 *
 * @function openFullscreen
 * @param {HTMLElement} elem - The DOM element to display in fullscreen.
 * @returns {void}
 */
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

/**
 * Ensures audio status is initialized in localStorage and updates sound icons.
 *
 * @function checkAudioStatus
 * @returns {void}
 */
function checkAudioStatus() {
  if (localStorage.getItem("gameAudio") === null) {
    localStorage.setItem("gameAudio", JSON.stringify(true));
  }
  let newStatus = JSON.parse(localStorage.getItem("gameAudio"));
  toggleSoundImg(newStatus);
}

/**
 * Resets the character's energy to 100 if the world is initialized.
 *
 * @function checkCharacterEnergy
 * @returns {void}
 */
function checkCharacterEnergy() {
  if (world) {
    world.character.energy = 100;
  } else {
    return;
  }
}

/**
 * Removes start screen buttons and overlays, clearing background images.
 *
 * @function removeButtons
 * @returns {void}
 */
function removeButtons() {
  let canvasRef = document.getElementById("canvas");
  canvasRef.style.backgroundImage = "none";
  let controllsOverlayRef = document.getElementById("controllsOverlay");
  controllsOverlayRef.classList.add("d-none");
  addDisplayNone("startButton");
  addDisplayNone("controllsButton");
}

/**
 * Stops the active drawing loop by canceling requestAnimationFrame.
 *
 * @function stopDrawLoop
 * @returns {void}
 */
function stopDrawLoop() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

/**
 * Removes the end screen buttons (restart and home).
 *
 * @function removeEndScreenButtons
 * @returns {void}
 */
function removeEndScreenButtons() {
  addDisplayNone("restart");
  addDisplayNone("home");
}

/**
 * Starts an interval that can be tracked and cleared later.
 *
 * @function setStoppableInterval
 * @param {Function} fn - Function to be executed repeatedly.
 * @param {number} time - Interval time in milliseconds.
 * @returns {void}
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervallIds.push(id);
}

/**
 * Clears all previously set stoppable intervals.
 *
 * @function clearStoppableIntervals
 * @returns {void}
 */
function clearStoppableIntervals() {
  intervallIds.forEach((id) => clearInterval(id));
}

/**
 * Restarts the game.
 * - Clears intervals and stops the draw loop.
 * - Resets the canvas and world state.
 * - Initializes level 1 and restarts the game.
 * - Stops and resets audio.
 *
 * @function restartGame
 * @returns {void}
 */
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

/**
 * Adds the CSS class `d-none` to hide an element.
 *
 * @function addDisplayNone
 * @param {string} id - The DOM element ID.
 * @returns {void}
 */
function addDisplayNone(id) {
  let idRef = document.getElementById(id);
  idRef.classList.add("d-none");
}

/**
 * Toggles the visibility of the controls overlay.
 *
 * @function toggleOverlay
 * @param {Event} event - The triggering event.
 * @returns {void}
 */
function toggleOverlay(event) {
  event.stopPropagation(event);
  let controllsOverlayRef = document.getElementById("controllsOverlay");
  controllsOverlayRef.classList.toggle("d-none");
}

/**
 * Stops the event from propagating further up the DOM tree.
 *
 * @function stopPropagation
 * @param {Event} event - The triggering event.
 * @returns {void}
 */
function stopPropagation(event) {
  event.stopPropagation(event);
}

/**
 * Closes the controls overlay by adding the `d-none` class.
 *
 * @function closeOverlay
 * @returns {void}
 */
function closeOverlay() {
  let controllsOverlayRef = document.getElementById("controllsOverlay");
  controllsOverlayRef.classList.add("d-none");
}

/**
 * Returns to the home screen.
 * - Shows start and controls buttons.
 * - Hides restart and home buttons.
 * - Stops and resets level end audio.
 * - Removes mobile buttons.
 *
 * @function backToHomeScreen
 * @returns {void}
 */
function backToHomeScreen() {
  removeDisplayNone("startButton");
  removeDisplayNone("controllsButton");
  addDisplayNone("restart");
  addDisplayNone("home");
  endgame_level.pause();
  endgame_level.currentTime = 0;
  addDisplayNone("mobileButtons");
  removeDisplayNone("allInfoAboutCreatorMobile");
}

/**
 * Removes the CSS class `d-none` to make an element visible.
 *
 * @function removeDisplayNone
 * @param {string} id - The DOM element ID.
 * @returns {void}
 */
function removeDisplayNone(id) {
  let idRef = document.getElementById(id);
  idRef.classList.remove("d-none");
}
