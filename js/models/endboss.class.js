class Endboss extends MovableObject{

    height = 400;
    width = 400;
    y = 40;

    IMAGES_WALKING =[
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    offset = {
        top: 70, 
        left: 30,
        right: 45,
        bottom: 85
    };

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 700*2;
        // this.x = 300; // test x 
        this.animate();
           
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            
        }, 150);
    }
}