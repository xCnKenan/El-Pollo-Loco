/**
 * Represents the "You Lost" screen object that is shown when the player loses the game.
 * Inherits from {@link MovableObject}.
 *
 * @class YouLost
 * @extends MovableObject
 */
class YouLost extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates an instance of the "You Lost" screen.
   * Loads the defeat image and positions it at the bottom of the canvas.
   *
   * @constructor
   */
  constructor() {
    super().loadImage("img/You won, you lost/You lost.png");
    this.x = 0;
    this.y = 480 - this.height;
  }
}
