class StatusBarCoins extends DrawableObject{
    IMAGES_STATUSBAR_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];
    percentage = 100;

    constructor(){
        super().loadImages(this.IMAGES_STATUSBAR_COINS);
        this.x = 30;
        this.y = 105;
        this.height = 60;
        this.width = 200;
        this.setPercentage(0);
    }

    //setPercentage(50)
    setPercentage(amountOfCoins){
        this.amountOfCoins = amountOfCoins; // => 0...5
        console.log('current status coins', this.amountOfCoins);
        let path = this.IMAGES_STATUSBAR_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
         if(this.amountOfCoins == 5){
                return 5; 
            } else if(this.amountOfCoins == 4){
                return 4; 
            } else if(this.amountOfCoins == 3){
                return 3; 
            } else if(this.amountOfCoins == 2){
                return 2; 
            } else if(this.amountOfCoins == 1){
                return 1; 
            } else {
                return 0; 
            }
    }
}