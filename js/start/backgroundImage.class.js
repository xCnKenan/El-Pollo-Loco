class Backgroundimage extends Buttons {
  height = 720;
  width = 480;

  constructor(imagePath, x, y) {
    super().loadStartImage(imagePath);
    this.x = x;
    this.y = y;
  }
}
