class Endboss extends MovableObject{

    height = 400;
    width = 400;
    y = 50;

    IMAGES_WALKING =[
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    offset = {
        top: 120, 
        left: 30,
        right: 40,
        bottom: 30
    };

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 700*2;
        this.animate();
        
        
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            
        }, 150);
    }
}