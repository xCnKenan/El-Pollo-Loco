class Backgroundimage extends Buttons {
  // x = 0;
  // y = 0;
  height = 720;
  width = 480;
  // height = 480;

  constructor(imagePath, x, y) {
    super().loadStartImage(imagePath);
    this.x = x;
    this.y = y;
  }
}
