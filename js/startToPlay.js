
let screen;
let play;

function loadStartScreen(){
    screen = document.getElementById('canvas');
    play = new StartScreen(screen);
}


function removeButtons(){
    let canvasRef = document.getElementById('canvas');
    canvasRef.style.backgroundImage = 'none';
    let controllsOverlayRef = document.getElementById('controllsOverlay');
    controllsOverlayRef.classList.add('d-none');
    remove('startButton');
    remove('controllsButton');
}

function remove(id){
    let idRef = document.getElementById(id);
    idRef.remove();
}

// function toggleOverlay(event){
//     event.stopPropagation(event);
//     let controllsOverlayRef = document.getElementById('controllsOverlay');
//     controllsOverlayRef.classList.toggle('d-none');
// }

function stopPropagation(event){
    event.stopPropagation(event);   
}

// function closeOverlay(){
//     let controllsOverlayRef = document.getElementById('controllsOverlay');
//     controllsOverlayRef.classList.add('d-none');
// }