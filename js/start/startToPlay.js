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

  console.log(mainScreen);

  boundingRect = screenCanvas.getBoundingClientRect();
}

// check hier collision with btn image when click
let tip = {};
window.addEventListener("mousedown", (event) => {

  boundingRect = screenCanvas.getBoundingClientRect();
  tip.x = event.clientX - boundingRect.left;
  tip.y = event.clientY - boundingRect.top;

  console.log(tip);
  let btn = mainScreen.startButton;
  let ctrl = mainScreen.controllsButton;

  if (collisionWithStartButton(btn)) {
    console.log("clicked start game");
    initLevel1();
    init();
  } else if(collisionWithControllsButton(ctrl)){
    console.log('clicked ctrl');
    toggleOverlay(event);
  }
    
});

function collisionWithStartButton(ctrl){
    return tip.x >= ctrl.x &&
    tip.x <= ctrl.x + ctrl.width &&
    tip.y >= ctrl.y &&
    tip.y <= ctrl.y + ctrl.height
}

function collisionWithControllsButton(btn){
    return tip.x >= btn.x &&
    tip.x <= btn.x + btn.width &&
    tip.y >= btn.y &&
    tip.y <= btn.y + btn.height
}

function removeButtons() {
  let canvasRef = document.getElementById("canvas");
  canvasRef.style.backgroundImage = "none";
  let controllsOverlayRef = document.getElementById("controllsOverlay");
  controllsOverlayRef.classList.add("d-none");
  remove("startButton");
  remove("controllsButton");
}

function remove(id) {
  let idRef = document.getElementById(id);
  idRef.remove();
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
