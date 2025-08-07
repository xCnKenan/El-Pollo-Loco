class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    /**
     * @type {object} - Numerical offsets for this instance´s coordinates and dimensions,
     * used for collision check.
     */
    offset = {
        top: 0, 
        left: 0,
        right: 0,
        bottom: 0
    };
    amountOfBottle = 0;
    
    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0 ){ // fall down animation
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround(){
        if (this instanceof ThrowableObject){ // Throwable Object should always fall
            return true;
        } else {
        return this.y < 130
        }
    }

    // e.g. character.isColliding(chicken);
    isColliding(movableObj){
        // return this.x + this.width > movableObj.x && // R -> L
        //     this.y + this.height > movableObj.y && // T -> B
        //     this.x < movableObj.x + movableObj.width && // L -> R
        //     this.y < movableObj.y + movableObj.height; // B -> T

        return this.x + this.offset.left + this.width - this.offset.right > movableObj.x + movableObj.offset.left && // R -> L
            this.y + this.offset.top + this.height - this.offset.bottom > movableObj.y + movableObj.offset.top && // T -> B
            this.x + this.offset.left < movableObj.x + movableObj.offset.left + movableObj.width - movableObj.offset.right && // L -> R
            this.y + this.offset.top < movableObj.y + movableObj.offset.top + movableObj.height - movableObj.offset.bottom; // B -> T
    }

    // subtracts amount of energy when getting hits
    hit(){
        this.energy -= 2;
        if(this.energy < 0){
            this.energy = 0;
        } else{
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){   
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; //Difference in s
        return timePassed < 0.3;
    }

    // returns value energy 0
    isDead(){
        return this.energy == 0;
    }

    moveRight(){
        //run right
        this.x += this.speed;
    }

    moveLeft(){
        //run left
        this.x -= this.speed;   
    }

    //walking animation
    playAnimation(images){
        let i = this.currentImage % images.length; // let i = 7 % 6 => 1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage ++;
    }

    jump(){
        this.speedY = 20;
    }

    bottleAdded(){
        this.amountOfBottle += 20;
        if(this.amountOfBottle > 100){
            this.amountOfBottle = 100;
        } else{
            // this.lastHit = new Date().getTime();
            console.log('percentage of amount bottle is going high');
            
        }
    }
}