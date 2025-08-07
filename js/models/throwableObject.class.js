class ThrowableObject extends MovableObject{

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'); 
        this.loadImages(this.IMAGES_THROW); 
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.throw();
    }

    throw(){
        this.speedY = 15;
        this.applyGravity();
        this.checkDirection(world.character.otherDirection);
  
    }
    
    checkDirection(leftSide){
         if(leftSide){

            setInterval(()=>{
                this.x -= 10; // throw to left
            }, 25);    

        } else {

            setInterval(()=>{
                this.x += 10; // throw to right
            }, 25);

        }
    }
}