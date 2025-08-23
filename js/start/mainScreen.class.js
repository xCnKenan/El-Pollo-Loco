/**
 * Represents the game's start screen.
 * Handles rendering of the background and screen updates.
 *
 * @class Mainscreen
 */
class Mainscreen {
  screenCanvas;
  ctxStartScreen;
  background = new Backgroundimage(
    "img/9_intro_outro_screens/start/startscreen_1.png",
    0,
    0
  );

  /**
   * Creates an instance of the start screen.
   *
   * @constructor
   * @param {HTMLCanvasElement} screenCanvas - The canvas where the start screen is drawn.
   */
  constructor(screenCanvas) {
    this.ctxStartScreen = screenCanvas.getContext("2d");
    this.screenCanvas = screenCanvas;
    this.draw();
  }

  /**
   * Continuously draws the start screen.
   * - Clears the canvas.
   * - Draws the background image.
   * - Requests the next animation frame for redrawing.
   *
   * @method draw
   * @returns {void}
   */
  draw() {
    this.ctxStartScreen.clearRect(
      0,
      0,
      this.screenCanvas.width,
      this.screenCanvas.height
    );
    this.showOnScreen(this.background);
    // this.showOnScreen(this.startButton);
    // this.showOnScreen(this.controllsButton);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

    /**
   * Draws an element on the screen.
   *
   * @method showOnScreen
   * @param {Object} elements - The drawable object.
   * @param {HTMLImageElement} elements.img - The image to draw.
   * @param {number} elements.x - The x-coordinate for drawing.
   * @param {number} elements.y - The y-coordinate for drawing.
   * @param {number} elements.height - The height of the drawn image.
   * @param {number} elements.width - The width of the drawn image.
   * @returns {void}
   */
  showOnScreen(elements) {
    this.ctxStartScreen.drawImage(
      elements.img,
      elements.x,
      elements.y,
      elements.height,
      elements.width
    );
  }
}
