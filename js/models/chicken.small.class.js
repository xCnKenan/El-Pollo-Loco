class ChickenSmall extends MovableObject{
    y = 330;
    height = 100;
    width = 100;
    IMAGES_WALKING =[
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    offset = {
        top: 5, 
        left: 9,
        right: 18,
        bottom: 13
    };
    

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        // this.x = 250 + Math.random() * 500;
        this.x = 350;
        this.speed = 0.15 + Math.random() * 0.25;
        // this.animate()
    }   

    animate(){

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }
}