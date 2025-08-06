class Coins extends MovableObject{
    
    y = 250;
    // x = 400;
    height = 150;
    width = 150;
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 250 + Math.random() * 2000;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);            
        }, 2000);
    }

} 