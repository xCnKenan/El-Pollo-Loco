class Cloud extends MovableObject{
    y = 40;
    height = 400;
    width = 500;
    speed = 0.15;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 100 +  Math.random() * 2500;
        this.animate();
    }

    animate(){
        this.moveLeft();
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed; 
        }, 1000 / 60);
    }
}