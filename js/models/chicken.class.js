class Chicken extends MovableObject {
  y = 330;
  height = 100;
  width = 100;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  offset = {
    top: 4,
    left: 1,
    right: 2,
    bottom: 12,
  };

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 250 + Math.random() * 1500;
   this.speed = 0.25 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.loadImage(this.IMAGES_DEAD);
      } else if (!this.isDead()) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 60);
  }

}
