class ThrowableObject extends MovableObject{

    constructor(position_x, position_y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.position_x = position_x;
        this.position_y = position_y;
        this.height = 60;
        this.width = 60;
        this.throw();
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();
        setInterval(()=>{
            this.position_x += 10;
        }, 25);
    }   
}