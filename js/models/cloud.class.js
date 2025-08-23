/**
 * Represents a cloud in the game background.
 * Extends MovableObject and handles automatic leftward movement.
 */
class Cloud extends MovableObject {
  y = 40;
  height = 400;
  width = 500;
  speed = 0.15;

  /**
   * Initializes a cloud by loading its image, setting a random x position, and starting movement.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 3000;
    this.animate();
  }

  /**
   * Starts the cloud's animation by moving it left continuously.
   */
  animate() {
    this.moveLeft();
  }

  /**
   * Moves the cloud to the left at a fixed interval to simulate background movement.
   */
  moveLeft() {
    setStoppableInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
