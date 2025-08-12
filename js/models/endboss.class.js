class Endboss extends MovableObject {
  height = 400;
  width = 400;
  y = 40;
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  offset = {
    top: 70,
    left: 60,
    right: 45,
    bottom: 85,
  };
  speed = 2;
  hadFirstContact = false;
  inAlertMode = false;
  inAttackMode = false;

  // energy = 100;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = 3300;

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.inAlertMode) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.inAttackMode) {
        console.log('in attackMode');
        this.stopMoving();
        this.playAnimation(this.IMAGES_ATTACK);
      } else if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.hadFirstContact){
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
        
      }

      if (world.character.x >= 3000 && !this.hadFirstContact) {
        this.hadFirstContact = true;
        this.startAlertMode();
      }
    }, 150);

    setInterval(() => {
        if(this.hadFirstContact) {
          this.inAttackMode = true;
        }
      setTimeout(() => {
            this.inAttackMode = false;
      }, 1200);
    }, 5000);
  }

  startAlertMode() {
    this.inAlertMode = true;
    console.log('alertmode', this.inAlertMode);
    
    setTimeout(() => {
      this.inAlertMode = false;
    }, 1500);
  }

  moveLeft(){
    this.speed = 2;
    this.x -= this.speed; 
  }

  stopMoving(){
    this.speed = 0; 
  }
}
