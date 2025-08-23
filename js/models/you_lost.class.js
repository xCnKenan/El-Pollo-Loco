class YouLost extends MovableObject {
  width = 720;
  height = 480;

  constructor() {
    super().loadImage("img/You won, you lost/You lost.png");
    // this.x = x;
    this.x = 0;
    this.y = 480 - this.height;
  }
}
