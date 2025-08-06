class BottleOnGround extends MovableObject{

    y = 360;
    // x = 400;
    height = 70;
    width = 70;
    IMAGES_BOTTLE_ON_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);
        this.x = 250 + Math.random() * 2000;
        this.animate(); 
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ON_GROUND);            
        }, 2000);
    }
}