function removeButtons(){

    let canvasRef = document.getElementById('canvas');
    canvasRef.style.backgroundImage = 'none';

    let startButtonRef = document.getElementById('startButton');
    startButtonRef.remove();

    let controllsButtonRef = document.getElementById('controllsButton');
    controllsButtonRef.remove();
}