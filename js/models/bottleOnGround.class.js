class BottleOnGround extends MovableObject{

    y = 350;
    
    // x = 400;
    height = 70;
    width = 70;
    // height = 50;
    // width = 50;
    IMAGES_BOTTLE_ON_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    offset = {
        top: 10, 
        left: 20,
        right: 30,
        bottom: 15
    };

    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);
        this.x = 300 + Math.random() * 2900;
        this.animate(); 
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ON_GROUND);            
        }, 500);
    }
}