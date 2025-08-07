class StatusBar extends DrawableObject{
    IMAGES_STATUSBAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png', // index 5
    ];
    percentage = 100;

    constructor(){
        super().loadImages(this.IMAGES_STATUSBAR);
        this.x = 30;
        this.y = 60;
        this.height = 60;
        this.width = 200;
        this.setPercentage(this.percentage);
    }

    //setPercentage(50)
    setPercentage(percentage){
        this.percentage = percentage; // => 0...5
        // console.log('current status health', this.percentage);
        let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
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