/**
 * Represents the Endboss health status bar.
 * Displays different images depending on the current Endboss health percentage.
 * Extends {@link DrawableObject}.
 */
class StatusBarEndboss extends DrawableObject {
  IMAGES_STATUSBAR_ENDBOSS = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];
  percentage = 100;

  /**
   * Creates a new Endboss status bar instance, loads images, and sets default position and size.
   * Initializes the bar with the default percentage.
   *
   * @constructor
   */
  constructor() {
    super().loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
    this.x = 480;
    this.y = 20;
    this.height = 60;
    this.width = 200;
    this.setPercentage(this.percentage);
  }

  /**
   * Updates the Endboss status bar to reflect the current percentage.
   *
   * @param {number} percentage - The current Endboss health percentage (0–100).
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_STATUSBAR_ENDBOSS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the correct image index based on the current Endboss health percentage.
   *
   * @returns {number} The index of the corresponding status bar image.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage == 80) {
      return 4;
    } else if (this.percentage == 60) {
      return 3;
    } else if (this.percentage == 40) {
      return 2;
    } else if (this.percentage == 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
