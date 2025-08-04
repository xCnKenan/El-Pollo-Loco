class DrawableObject{
    position_x = 130;
    position_y = 135;
    height = 300;
    width = 150;
    img;
    imageCache = [];
    currentImage = 0;


    draw(ctx){
        ctx.drawImage(this.img, this.position_x, this.position_y, this.width, this.height);
    }

     drawFrame(ctx){
        // because of instanceof frames are only shown for given classes
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss){
            //hitbox here
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.position_x,
                this.position_y, 
                this.width,
                this.height
                );
            ctx.stroke();
            //hitbox end here
        }
    }

    /**
     * 
     * @param {Array} path - ('img/test.png');
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ... ];
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}