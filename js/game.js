let canvas;
let world;

let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    console.log('All Data', world);
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
})