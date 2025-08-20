let screenCanvas;
let mainScreen; // wie world
let boundingRect;
let ctxStart;

function getFullScreen(){
    let divRef = document.getElementById('relativeDiv');
    openFullscreen(divRef);
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function loadStartScreen() {
  screenCanvas = document.getElementById("canvas");
  ctxStart = screenCanvas.getContext("2d");
  mainScreen = new Mainscreen(screenCanvas);
  // console.log(mainScreen);
//   boundingRect = screenCanvas.getBoundingClientRect();
  // addDisplayNone('restart');
  // addDisplayNone('home');
  checkCharacterEnergy();
}

function checkCharacterEnergy(){
   if(world){    
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

function removeEndScreenButtons(){
  addDisplayNone("restart");
  addDisplayNone("home");
}

function addDisplayNone(id) {
  let idRef = document.getElementById(id);
  // idRef.remove();
  idRef.classList.add('d-none');
}

function toggleOverlay(event){
    event.stopPropagation(event);
    let controllsOverlayRef = document.getElementById('controllsOverlay');
    controllsOverlayRef.classList.toggle('d-none');
}

function stopPropagation(event) {
  event.stopPropagation(event);
}

function closeOverlay(){
  let controllsOverlayRef = document.getElementById('controllsOverlay');
  controllsOverlayRef.classList.add('d-none');
}

function backToHomeScreen(){
  removeDisplayNone("startButton");
  removeDisplayNone("controllsButton");
  addDisplayNone("restart");
  addDisplayNone("home");
}

function removeDisplayNone(id) {
  let idRef = document.getElementById(id);
  // idRef.remove();
  idRef.classList.remove('d-none');
}