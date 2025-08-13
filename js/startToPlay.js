function removeButtons(){
    let canvasRef = document.getElementById('canvas');
    canvasRef.style.backgroundImage = 'none';
    let controllsOverlayRef = document.getElementById('controllsOverlay');
    controllsOverlayRef.classList.add('d-none');
    remove('startButton');
    remove('controllsButton');
}

function toggleOverlay(){
    let controllsOverlayRef = document.getElementById('controllsOverlay');
    controllsOverlayRef.classList.toggle('d-none');
}

function remove(id){
    let idRef = document.getElementById(id);
    idRef.remove();
}