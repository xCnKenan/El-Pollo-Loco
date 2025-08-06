class StatusBarBottle extends DrawableObject{

    IMAGES_STATUSBAR_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];
    percentage = 100;

    constructor(){
        super().loadImages(this.IMAGES_STATUSBAR_BOTTLE);
        this.x = 10;
        this.y = 0;
        this.height = 70;
        this.width = 210;
        this.setPercentage(0);
    }

    //setPercentage(50)
    setPercentage(percentage){
        this.percentage = percentage; // => 0...5
        console.log('current status bottle', this.percentage);
        let path = this.IMAGES_STATUSBAR_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
         if(this.percentage == 100){
                return 5; 
            } else if(this.percentage == 80){
                return 4; 
            } else if(this.percentage == 60){
                return 3; 
            } else if(this.percentage == 40){
                return 2; 
            } else if(this.percentage == 20){
                return 1; 
            } else {
                return 0; 
            }
    }
}