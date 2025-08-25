let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game and sets up all required components.
 *
 * - Retrieves the canvas element from the DOM.
 * - Creates a new instance of the game world with the canvas and keyboard controls.
 * - Checks if audio has finished loading.
 * - Starts the background music from the beginning.
 * - removes the mobile control buttons.
 *
 * @function init
 * @returns {void} This function does not return a value.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  checkAudioOnload();
  startGameMusicFromBeginning();
  removeDisplayNone("mobileButtons");
  addDisplayNone("allInfoAboutCreatorMobile");
}

/**
 * Checks the saved audio status from localStorage and applies it.
 * - Mutes or unmutes sounds based on the stored value.
 * - Updates the sound icon accordingly.
 *
 * @function checkAudioOnload
 * @returns {void}
 */
function checkAudioOnload() {
  let audioStatus = JSON.parse(localStorage.getItem("gameAudio"));
  if (!audioStatus) {
    muteAllSounds();
  } else {
    unmuteAllSounds();
  }
  toggleSoundImg(audioStatus);
}

/**
 * Starts the main game music from the beginning.
 * - Plays and loops the background music.
 * - Stops and resets the "game over" sound.
 *
 * @function startGameMusicFromBeginning
 * @returns {void}
 */
function startGameMusicFromBeginning() {
  gameMusic.play();
  gameMusic.loop = true;
  game_over.currentTime = 0;
  game_over.pause();
}

/**
 * Toggles the game’s audio state between muted and unmuted.
 * - Saves the new state in localStorage.
 * - Updates sound settings and the sound icon.
 *
 * @function toggleAudio
 * @returns {void}
 */
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

/**
 * Updates the sound icon based on the audio status.
 *
 * @function toggleSoundImg
 * @param {boolean} newStatus - True if sound is enabled, false if muted.
 * @returns {void}
 */
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

/**
 * Adds a CSS class to hide an image element.
 *
 * @function addImg
 * @param {string} id - The DOM element ID.
 * @returns {void}
 */
function addImg(id) {
  let idRef = document.getElementById(id);
  if (!idRef) return;
  idRef.classList.add("d-none");
}

/**
 * Removes a CSS class to show an image element.
 *
 * @function removeImg
 * @param {string} id - The DOM element ID.
 * @returns {void}
 */
function removeImg(id) {
  let idRef = document.getElementById(id);
  if (!idRef) return;
  idRef.classList.remove("d-none");
}

/**
 * Mutes all game sounds by setting the `muted` property to true.
 *
 * @function muteAllSounds
 * @returns {void}
 */
function muteAllSounds() {
  gameSounds.forEach((sound) => (sound.muted = true));
}

/**
 * Unmutes all game sounds by setting the `muted` property to false.
 *
 * @function unmuteAllSounds
 * @returns {void}
 */
function unmuteAllSounds() {
  gameSounds.forEach((sound) => (sound.muted = false));
}

/**
 * Event listeners for keyboard input (keydown).
 * Updates the `keyboard` object depending on the pressed key.
 */
window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (event.keyCode == 68) {
    keyboard.D = true;
  }
});

/**
 * Event listeners for keyboard input (keyup).
 * Updates the `keyboard` object depending on the released key.
 */
window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (event.keyCode == 68) {
    keyboard.D = false;
  }
  if (event.keyCode == 77) {
    toggleAudio();
  }
});

window.addEventListener("load", checkMobileButtons);
window.addEventListener("resize", checkMobileButtons);
window.addEventListener("contextmenu", (event) => { 
  event.preventDefault();
})


/**
 * Checks if the game is being played on mobile or tablet (landscape mode).
 * - Displays mobile buttons if true.
 * - Hides them if false.
 *
 * @function checkMobileButtons
 * @returns {void}
 */
function checkMobileButtons() {
  let hasTouch = window.matchMedia("(pointer: coarse)").matches;
  if (hasTouch) {
    document.getElementById("mobileButtons").style.display = "flex";
    bindMobileButtons();
  } else {
    document.getElementById("mobileButtons").style.display = "none";
  }
}

/**
 * Binds control actions to mobile button elements.
 *
 * @function bindMobileButtons
 * @returns {void}
 */
function bindMobileButtons() {
  addButtonEvents("btn-left", "LEFT");
  addButtonEvents("btn-right", "RIGHT");
  addButtonEvents("btn-space", "SPACE");
  addButtonEvents("btn-d", "D");
}

/**
 * Adds event listeners to a mobile button element for simulating key presses.
 *
 * @function addButtonEvents
 * @param {string} elementId - The DOM ID of the button element.
 * @param {string} key - The corresponding key in the `keyboard` object.
 * @returns {void}
 */
function addButtonEvents(elementId, key) {
  let elementIdRef = document.getElementById(elementId);
  elementIdRef.addEventListener("touchstart", () => (keyboard[key] = true));
  elementIdRef.addEventListener("mousedown", () => (keyboard[key] = true));
  elementIdRef.addEventListener("touchend", () => (keyboard[key] = false));
  elementIdRef.addEventListener("mouseup", () => (keyboard[key] = false));
  elementIdRef.addEventListener("mouseleave", () => (keyboard[key] = false));
}
