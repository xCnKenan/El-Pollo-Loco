/**
 * Represents the main character in the game.
 * Handles movement, animations, gravity, interactions, and states like idle, jump, hurt, dead, and sleep.
 * Extends {@link MovableObject}.
 */
class Character extends MovableObject {
  speed = 10;
  currentImage = 0;
  jumpFrameCounter = 0;
  jumpSpeed = 3;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  offset = {
    top: 135,
    left: 25,
    right: 70,
    bottom: 150,
  };
  amountOfBottles = 0;
  amountOfCoins = 0;

  /**
   * Initializes the character by loading all animation images, applying gravity, and starting animation loops.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * Main animation and movement loop.
   * Handles walking, jumping, idle, hurt, dead, and sleeping states.
   * Uses multiple intervals with different refresh rates.
   */
  animate() {
    /**
     * Main animation loop for the character.
     * Runs every 40ms (~25 FPS).
     *
     * State priority (checked in order):
     * 1. Dead  → Plays death animation
     * 2. Hurt  → Plays hurt animation
     * 3. Jumping → Plays jump animation once (slowed by jumpSpeed),
     *              then holds the last jump frame until back on ground
     * 4. Walking → Plays walking animation while moving left or right
     *              (resets lastTimeWalking and stops vertical speed)
     * 5. Idle (not sleeping) → Pauses snoring sound
     *
     * This ensures the correct animation is always shown
     * depending on the character’s current state.
     */
    setStoppableInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        pepeJump.play();
        this.resetJumpAnimation();
        this.jump();
      }
      this.world.camera_x = -this.x + 150;
    }, 1000 / 60);

    /**
     * Animation loop for the main states (dead, hurt, jumping, walking).
     * Runs every 40ms (~25 FPS).
     *
     * - Dead → plays dead animation
     * - Hurt → plays hurt animation
     * - Jumping → plays jump animation once
     * - Walking → plays walking animation
     * - Otherwise (idle but not sleeping) → pauses snoring
     */
    setStoppableInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimationOnce(this.IMAGES_JUMPING);
        this.lastTimeWalking = new Date().getTime();
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
        this.lastTimeWalking = new Date().getTime();
        this.speedY = 0;
      } else if (!this.getSleep()) {
        snoring.pause();
      }
    }, 40);

    /**
     * Idle animation loop.
     * Runs every 250ms (~4 FPS).
     *
     * Plays idle animation when the character:
     * - is not moving left/right
     * - is not jumping
     * - is not sleeping
     */
    setStoppableInterval(() => {
      if (
        !this.world.keyboard.RIGHT &&
        !this.world.keyboard.LEFT &&
        !this.isAboveGround()
      ) {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 250);

    /**
     * Sleep (long idle) animation loop.
     * Runs every 250ms (~4 FPS).
     *
     * Plays long idle animation and triggers snoring sound
     * if the character has been inactive for >= 15s.
     */
    setStoppableInterval(() => {
      if (this.getSleep()) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        snoring.play();
      }
    }, 250);
  }

  /**
   * Plays an animation sequence exactly once.
   * After the last frame, the last image stays displayed until reset.
   *
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimationOnce(images) {
    if (this.currentImage >= images.length) {
      let path = images[images.length - 1];
      this.img = this.imageCache[path];
      return;
    }

    this.jumpFrameCounter++;
    if (this.jumpFrameCounter % this.jumpSpeed === 0) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }

  /**
   * Resets the jump animation to the first frame.
   * Called whenever a new jump is initiated.
   */
  resetJumpAnimation() {
    this.currentImage = 0;
    this.jumpFrameCounter = 0;
  }

  /**
   * Checks if the character should sleep (not moving for >= 15 seconds).
   * @returns {boolean} True if sleeping, otherwise false.
   */
  getSleep() {
    let timePassed = new Date().getTime() - this.lastTimeWalking;
    timePassed = timePassed / 1000;
    return timePassed >= 15;
  }
}
