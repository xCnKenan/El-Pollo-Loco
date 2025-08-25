/**
 * Represents a collectible coin in the game.
 * Extends MovableObject and handles animation and positioning.
 */
class Coins extends MovableObject {
  y = 125;
  height = 150;
  width = 150;

  IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  offset = {
    top: 50,
    left: 40,
    right: 90,
    bottom: 100,
  };

  /**
   * Initializes a coin, loads images, sets a random x position, and starts animation.
   */
  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);
    this.x = 500 + Math.random() * 2600;
    // this.x = 250
    this.animate();
  }

  /**
   * Animates the coin by cycling through its images at a fixed interval.
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 500);
  }
}
