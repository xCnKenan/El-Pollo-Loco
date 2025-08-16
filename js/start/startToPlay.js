let screenCanvas;
let mainScreen; // wie world
let boundingRect;
let ctxStart;

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

  if (
    tip.x >= btn.x &&
    tip.x <= btn.x + btn.width &&
    tip.y >= btn.y &&
    tip.y <= btn.y + btn.height
  ) {
    console.log("clicked");
    initLevel1();
    init();
  }
});

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

// function toggleOverlay(event){
//     event.stopPropagation(event);
//     let controllsOverlayRef = document.getElementById('controllsOverlay');
//     controllsOverlayRef.classList.toggle('d-none');
// }

function stopPropagation(event) {
  event.stopPropagation(event);
}

// function closeOverlay(){
//     let controllsOverlayRef = document.getElementById('controllsOverlay');
//     controllsOverlayRef.classList.add('d-none');
// }
