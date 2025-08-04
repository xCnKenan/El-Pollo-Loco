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
                this.position_y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround(){
        if (this instanceof ThrowableObject){ // Throwable Object should always fall
            return true;
        } else {
        return this.position_y < 130
        }
    }

    // e.g. character.isColliding(chicken);
    isColliding(movableObj){
        return this.position_x + this.width > movableObj.position_x &&
            this.position_y + this.height > movableObj.position_y &&
            this.position_x < movableObj.position_x &&
            this.position_y < movableObj.position_y + movableObj.height;
    }

    // subtracts amount of energy when getting hits
    hit(){
        this.energy -= 10;
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
        this.position_x += this.speed;
    }

    moveLeft(){
        //run left
        this.position_x -= this.speed;   
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