/**
 * Base class for status bars like health, coins, bottles, and endboss.
 * Extends DrawableObject to display images representing a value.
 */
class StatusBarBase extends DrawableObject {
  /**
   * Creates a new StatusBarBase.
   * @param {Object} config - Configuration object for the status bar.
   * @param {string[]} config.images - Array of image paths representing different states.
   * @param {number} [config.x=30] - X position on the canvas.
   * @param {number} [config.y=20] - Y position on the canvas.
   * @param {number} [config.width=200] - Width of the status bar.
   * @param {number} [config.height=60] - Height of the status bar.
   * @param {"percentage"|"counter"} [config.mode="percentage"] - Mode of the status bar.
   * @param {number} [config.maxValue=100] - Maximum value for the bar.
   * @param {number} [config.initial=0] - Initial value of the bar.
   */
  constructor(config) {
    super().loadImages(config.images);

    this.images = config.images;
    this.x = config.x || 30;
    this.y = config.y || 20;
    this.width = config.width || 200;
    this.height = config.height || 60;
    this.mode = config.mode || "percentage";
    this.maxValue = config.maxValue || 100;
    this.value = config.initial || 0;
    this.setValue(this.value);
  }

  /**
   * Sets the current value of the status bar and updates its image.
   * @param {number} value - The new value to set.
   */
  setValue(value) {
    this.value = Math.max(0, Math.min(value, this.maxValue));

    let percentage;
    if (this.mode === "percentage") {
      percentage = (this.value / this.maxValue) * 100;
    } else if (this.mode === "counter") {
      percentage = (this.value / this.maxValue) * 100;
    }

    let index = this.resolveImageIndex(percentage);
    this.img = this.imageCache[this.images[index]];
  }

  /**
   * Converts a percentage to an image index.
   * @param {number} percentage - The value in percent (0–100).
   * @returns {number} The index of the image to display.
   */
  resolveImageIndex(percentage) {
    if (percentage >= 100) return 5;
    if (percentage >= 80) return 4;
    if (percentage >= 60) return 3;
    if (percentage >= 40) return 2;
    if (percentage >= 20) return 1;
    return 0;
  }
}
