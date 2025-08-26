/**
 * Represents the "You Won" screen object that is shown when the player wins the game.
 * Inherits from {@link MovableObject}.
 *
 * @class YouWon
 * @extends MovableObject
 */
class YouWon extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates an instance of the "You Won" screen.
   * Loads the victory image and sets its position at the bottom of the canvas.
   *
   * @constructor
   */
  constructor() {
    super().loadImage("img/You won, you lost/You won A.png");
    this.x = 0;
    this.y = 480 - this.height;
  }
}
