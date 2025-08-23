/**
 * Represents a background object in the game.
 * Extends MovableObject and sets its position and size.
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates a background object.
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The x-coordinate where the background object is placed.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
