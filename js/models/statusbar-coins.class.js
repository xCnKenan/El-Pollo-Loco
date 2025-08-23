/**
 * Represents the coin collection status bar of the character.
 * Displays different images depending on the number of collected coins.
 * Extends {@link DrawableObject}.
 */
class StatusBarCoins extends DrawableObject {
  IMAGES_STATUSBAR_COINS = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];
  percentage = 100;

   /**
   * Creates a new coin status bar instance, loads images, and sets default position and size.
   * Initializes the bar to show 0 coins collected.
   *
   * @constructor
   */
  constructor() {
    super().loadImages(this.IMAGES_STATUSBAR_COINS);
    this.x = 30;
    this.y = 105;
    this.height = 60;
    this.width = 200;
    this.setPercentage(0);
  }

   /**
   * Updates the coin status bar based on the current number of collected coins.
   *
   * @param {number} amountOfCoins - Number of coins collected by the character (0–5).
   * @returns {void}
   */
  setPercentage(amountOfCoins) {
    this.amountOfCoins = amountOfCoins; // => 0...5
    // console.log('current status coins', this.amountOfCoins);
    let path = this.IMAGES_STATUSBAR_COINS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the correct image index based on the number of collected coins.
   *
   * @returns {number} The index of the corresponding coin status bar image.
   */
  resolveImageIndex() {
    if (this.amountOfCoins >= 5) {
      return 5;
    } else if (this.amountOfCoins == 4) {
      return 4;
    } else if (this.amountOfCoins == 3) {
      return 3;
    } else if (this.amountOfCoins == 2) {
      return 2;
    } else if (this.amountOfCoins == 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
