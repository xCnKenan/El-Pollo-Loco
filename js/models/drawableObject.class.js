/**
 * Represents a drawable object in the game.
 * Handles image loading, drawing, and optional hitbox rendering.
 */
class DrawableObject {
  x = 130;
  y = 135;
  height = 300;
  width = 150;
  img;
  imageCache = [];
  currentImage = 0;

  /**
   * Draws the object on the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context to draw on.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (error) {
      console.warn("Error loading image", error);
      console.log("Could not load img:", this.img.src);
    }
  }

  /**
   *
   * @param {Array} path - ('img/test.png');
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ... ];
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
