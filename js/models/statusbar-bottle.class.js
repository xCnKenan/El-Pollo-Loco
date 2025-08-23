/**
 * Represents the bottle status bar of the character.
 * Displays different images depending on the number of bottles the character has.
 * Extends {@link DrawableObject}.
 */
class StatusBarBottle extends DrawableObject {
  IMAGES_STATUSBAR_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];
  percentage = 0;

  /**
   * Creates a new bottle status bar instance, loads images, and sets default position and size.
   * Initializes the bar with the default number of bottles.
   *
   * @constructor
   */
  constructor() {
    super().loadImages(this.IMAGES_STATUSBAR_BOTTLE);
    this.x = 30;
    this.y = 20;
    this.height = 60;
    this.width = 200;
    this.setPercentage(this.percentage);
  }

  /**
   * Updates the bottle status bar based on the current number of bottles.
   *
   * @param {number} amountOfBottle - Number of bottles the character currently has (0–5).
   * @returns {void}
   */
  setPercentage(amountOfBottle) {
    this.amountOfBottle = amountOfBottle; // => 0...5
    let path = this.IMAGES_STATUSBAR_BOTTLE[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the correct image index based on the current number of bottles.
   *
   * @returns {number} The index of the corresponding bottle status bar image.
   */
  resolveImageIndex() {
    if (this.amountOfBottle >= 5) {
      return 5;
    } else if (this.amountOfBottle == 4) {
      return 4;
    } else if (this.amountOfBottle == 3) {
      return 3;
    } else if (this.amountOfBottle == 2) {
      return 2;
    } else if (this.amountOfBottle == 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
