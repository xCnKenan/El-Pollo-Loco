class Coins extends MovableObject{
    
    y = 250;
    // x = 400;
    height = 150;
    width = 150;
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];
    offset = {
        top: 47, 
        left: 47,
        right: 94,
        bottom: 95
    };
 
    // offset = {
    //     top: 0, 
    //     left: 0,
    //     right: 0,
    //     bottom: 0
    // };

    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 500 + Math.random() * 1000;
        // this.x = 250 
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);            
        }, 2000);
    }

} 