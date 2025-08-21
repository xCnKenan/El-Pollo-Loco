let canvas;
let world;

let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    console.log('All Data', world);

    let audioStatus = JSON.parse(localStorage.getItem('gameAudio'));
    if (!audioStatus) {
        muteAllSounds();
    } else {
        unmuteAllSounds();
    }

    toggleSoundImg(audioStatus);
}

function toggleAudio(){
    let audioStatus = JSON.parse(localStorage.getItem('gameAudio'));
    if(audioStatus){
        localStorage.setItem('gameAudio', JSON.stringify(false));
        muteAllSounds();
        console.log('ton aus');
    } else if(!audioStatus){
        localStorage.setItem('gameAudio', JSON.stringify(true));
        unmuteAllSounds();
        console.log('ton an');   
    }
    let newStatus = JSON.parse(localStorage.getItem('gameAudio'));
    toggleSoundImg(newStatus);
}

function toggleSoundImg(newStatus){
    let speakerRef = document.getElementById('speaker');
    let no_audioRef = document.getElementById('no-audio');
    if(newStatus){
        speakerRef.classList.remove('d-none');
        no_audioRef.classList.add('d-none');
        console.log('audio ist an');
    } else if(!newStatus){
        speakerRef.classList.add('d-none');
        no_audioRef.classList.remove('d-none');
        console.log('audio ist aus');
    }
}

function muteAllSounds(){
    gameSounds.forEach(sound => sound.muted = true);
}

function unmuteAllSounds(){
    gameSounds.forEach(sound => sound.muted = false);
}

window.addEventListener("keydown", (event)=>{    
    if(event.keyCode == 39){ // right
        keyboard.RIGHT = true;
    }
    if(event.keyCode == 37){ // left
        keyboard.LEFT = true;
    }
    if(event.keyCode == 38){ // up
        keyboard.UP = true;
    }
    if(event.keyCode == 40){ // down
        keyboard.DOWN = true;
    }
    if(event.keyCode == 32){ // space
        keyboard.SPACE = true;
    }
    if(event.keyCode == 68){ // d 
        keyboard.D = true;
    }
    if(event.keyCode == 13){
        keyboard.ENTER = true; // startgame enter
    }
})

window.addEventListener("keyup", (event)=>{
    if(event.keyCode == 39){ // right
        keyboard.RIGHT = false;
    }
    if(event.keyCode == 37){ // left
        keyboard.LEFT = false;
    }
    if(event.keyCode == 38){ // up
        keyboard.UP = false;
    }
    if(event.keyCode == 40){ // down
        keyboard.DOWN = false;
    }
    if(event.keyCode == 32){ // space
        keyboard.SPACE = false;
    }
    if(event.keyCode == 68){ // d 
        keyboard.D = false;
    }
    if(event.keyCode == 13){            // remove after collision detection works
        keyboard.ENTER = false; // startgame enter
        removeButtons(); 
        initLevel1();
        init();
    }
    if(event.keyCode == 77){ // M to Mute or unmute Gamesounds
        toggleAudio();
    }
})