class BottleOnGround extends MovableObject{

    y = 360;
    // x = 400;
    height = 70;
    width = 70;
    IMAGES_BOTTLE_ON_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    // offset = {
    //     top: 0, 
    //     left: 0,
    //     right: 0,
    //     bottom: 0
    // };

    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);
        this.x = 250 + Math.random() * 2000;
        // this.x = 600
        this.animate(); 
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ON_GROUND);            
        }, 2000);
    }
}