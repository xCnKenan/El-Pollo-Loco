class Buttons {
  x = 100;
  y = 100;
  img;
  height;
  width;

  loadStartImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
}
