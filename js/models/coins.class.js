class Coins extends MovableObject {
  y = 125;
  height = 150;
  width = 150;

  IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  offset = {
    top: 47,
    left: 47,
    right: 94,
    bottom: 95,
  };

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);
    this.x = 500 + Math.random() * 2600;
    // this.x = 250
    this.animate();
  }

  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 500);
  }
}
