/**
 * Represents any object that can move in the game world.
 * Extends {@link DrawableObject}.
 */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lastHit = 0;
  lastTimeWalking = new Date().getTime();
  /**
   * @type {object} - Numerical offsets for this instance´s coordinates and dimensions,
   * used for collision check.
   */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Applies gravity to the object, causing it to fall if above the ground.
   * @returns {void}
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        // fall down animation
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above ground.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 130;
    }
  }

  /**
   * Checks if this object is colliding with another MovableObject.
   * @param {MovableObject} movableObj - Another object to check collision with.
   * @returns {boolean} True if objects are colliding.
   */
  isColliding(movableObj) {
    return (
      this.x + this.offset.left + this.width - this.offset.right >
        movableObj.x + movableObj.offset.left &&
      this.y + this.offset.top + this.height - this.offset.bottom >
        movableObj.y + movableObj.offset.top &&
      this.x + this.offset.left <
        movableObj.x +
          movableObj.offset.left +
          movableObj.width -
          movableObj.offset.right &&
      this.y + this.offset.top <
        movableObj.y +
          movableObj.offset.top +
          movableObj.height -
          movableObj.offset.bottom
    );
  }

  /**
   * Checks if the object collides with another object while jumping.
   * @param {MovableObject} movableObj - Another object to check jump collision with.
   * @returns {boolean} True if colliding while jumping.
   */
  jumpCollision(movableObj) {
    let jump = this.speedY < 0;
    return this.isColliding(movableObj) && jump;
  }

  /**
   * Reduces the object's energy when hit.
   * @returns {void}
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently hurt (recently hit).
   * @returns {boolean} True if the object was hit less than 0.3 seconds ago.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.3;
  }

  /**
   * Checks if the object is dead (energy is 0).
   * @returns {boolean} True if the object is dead.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the object to the right.
   * @returns {void}
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   * @returns {void}
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Plays an animation from an array of images.
   * @param {string[]} images - Array of image paths for the animation.
   * @returns {void}
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   * @returns {void}
   */
  jump() {
    this.speedY = 20;
  }

  /**
   * Increases the number of bottles the character possesses.
   * @returns {void}
   */
  bottleAdded() {
    this.amountOfBottles += 1;
  }

  /**
   * Decreases the number of bottles the character possesses.
   * @returns {void}
   */
  bottleSubtracted() {
    this.amountOfBottles -= 1;
  }

  /**
   * Increases the number of coins the character has collected.
   * @returns {void}
   */
  coinsAdded() {
    this.amountOfCoins += 1;
  }
}
