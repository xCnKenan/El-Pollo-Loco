class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    
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
        return this.x + this.width > movableObj.x &&
            this.y + this.height > movableObj.y &&
            this.x < movableObj.x &&
            this.y < movableObj.y + movableObj.height;
    }

    // e.g. character.isColliding(chicken);
    isCollidingBack(movableObj){
        return this.x + this.width > movableObj.x &&
        this.x < movableObj.x + movableObj.width;
    }

    // subtracts amount of energy when getting hits
    hit(){
        this.energy -= 20;
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
}