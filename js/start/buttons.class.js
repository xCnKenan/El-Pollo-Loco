/**
 * Represents a clickable button element in the game.
 *
 * @class Buttons
 */
class Buttons {
  x = 100;
  y = 100;
  img;
  height;
  width;

   /**
   * Loads an image for the button.
   *
   * @method loadStartImage
   * @param {string} path - The file path or URL of the image.
   * @returns {void}
   */
  loadStartImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
}
