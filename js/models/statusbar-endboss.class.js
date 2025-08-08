class StatusBarEndboss extends DrawableObject{

    IMAGES_STATUSBAR_ENDBOSS = [
       'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
       'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
       'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
       'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
       'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
       'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];
    percentage = 100;

    constructor(){
        super().loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
        this.x = 480;
        this.y = 20;
        this.height = 60;
        this.width = 200;
        this.setPercentage(this.percentage);
    }

    //setPercentage(50)
   setPercentage(percentage){
        this.percentage = percentage; // => 0...5
        // console.log('current status health', this.percentage);
        let path = this.IMAGES_STATUSBAR_ENDBOSS[this.resolveImageIndex()];
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