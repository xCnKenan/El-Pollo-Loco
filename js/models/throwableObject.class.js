/**
 * Represents a throwable object (e.g., a bottle) that the character can throw.
 * Extends {@link MovableObject}.
 */
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

  /**
   * Creates a throwable object at a specific position.
   * @param {number} x - The horizontal position.
   * @param {number} y - The vertical position.
   */
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

  /**
   * Initiates the throw by applying gravity and moving in the correct direction.
   * @returns {void}
   */
  throw() {
    this.speedY = 7;
    this.applyGravity();
    this.checkDirection(world.character.otherDirection);
  }

  /**
   * Checks the direction of the throw (left or right) and updates the object's movement.
   * @param {boolean} leftSide - Whether the character is facing left.
   * @returns {void}
   */
  checkDirection(leftSide) {
    if (leftSide) {
      setStoppableInterval(() => {
        this.x -= 10;
      }, 25);
    } else if (!leftSide) {
      setStoppableInterval(() => {
        this.x += 10;
      }, 25);
    }
    this.animate();
  }

  /**
   * Starts the animation for the bottle rotation while flying.
   * @returns {void}
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_THROW);
    }, 80);
  }
}
