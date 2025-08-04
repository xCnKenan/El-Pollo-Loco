class Cloud extends MovableObject{
    position_y = 40;
    height = 400;
    width = 500;
    speed = 0.15;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.position_x = Math.random() * 500;
        this.animate();
    }

    animate(){
        this.moveLeft();
    }

    moveLeft(){
        setInterval(() => {
            this.position_x -= this.speed; 
        }, 1000 / 60);
    }
}