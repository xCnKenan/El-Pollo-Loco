/**
 * Represents a background image in the game.
 * Extends the {@link Buttons} class to reuse positioning and image loading.
 *
 * @class Backgroundimage
 * @extends Buttons
 */
class Backgroundimage extends Buttons {
  height = 720;
  width = 480;

   /**
   * Creates a new background image instance.
   *
   * @constructor
   * @param {string} imagePath - The path or URL of the background image.
   * @param {number} x - The x-coordinate of the background image.
   * @param {number} y - The y-coordinate of the background image.
   */
  constructor(imagePath, x, y) {
    super().loadStartImage(imagePath);
    this.x = x;
    this.y = y;
  }
}
