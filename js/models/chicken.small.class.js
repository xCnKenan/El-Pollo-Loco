/**
 * Represents a small chicken enemy in the game.
 * Extends MovableObject and handles walking animation and death state.
 */
class ChickenSmall extends MovableObject {
  y = 360;
  height = 60;
  width = 60;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  offset = {
    top: 5,
    left: 5,
    right: 10,
    bottom: 10,
  };

  /**
   * Initializes a small chicken by loading walking images, setting a random x position and speed, and starting animation.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 400 + Math.random() * 2900;
    this.speed = 0.25 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Animates the chicken by moving it left and playing the walking animation.
   * If the chicken is dead, switches to the dead image.
   */
  animate() {
    setStoppableInterval(() => {
      if (this.isDead()) {
        this.loadImage(this.IMAGES_DEAD);
      } else if (!this.isDead()) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 60);
  }
}
