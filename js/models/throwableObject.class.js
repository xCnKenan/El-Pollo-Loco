class ThrowableObject extends MovableObject {
  IMAGES_THROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  offset = {
    top: 7,
    left: 10,
    right: 20,
    bottom: 12,
  };

  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_THROW);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 60;
    this.throw();
  }

  throw() {
    this.speedY = 7;
    this.applyGravity();
    this.checkDirection(world.character.otherDirection);
  }

  checkDirection(leftSide) {
    if (leftSide) {
      setStoppableInterval(() => {
        this.x -= 10; // throw to left
      }, 25);
    } else if (!leftSide) {
      setStoppableInterval(() => {
        this.x += 10; // throw to right
      }, 25);
    }
    this.animate();
  }

  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_THROW);
    }, 80);
  }
}
