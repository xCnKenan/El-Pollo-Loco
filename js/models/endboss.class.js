/**
 * Represents the final boss enemy in the game.
 * Extends MovableObject and handles animations, movement, and attack behavior.
 */
class Endboss extends MovableObject {
  height = 400;
  width = 400;
  y = 40;
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  offset = {
    top: 70,
    left: 60,
    right: 45,
    bottom: 85,
  };
  speed = 2;
  hadFirstContact = false;
  inAlertMode = false;
  inAttackMode = false;

  /**
   * Initializes the endboss by loading all animation images and starting animation.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = 3300;
    this.animate();
  }

  /**
   * Controls the Endboss's animations and behavior based on its state.
   * 
   * - Plays walking, alert, attack, hurt, or dead animations.
   * - Moves towards the character after the first contact.
   * - Triggers alert mode and endgame music when the character reaches a certain position.
   * - Sets up a repeating attack mode every 5 seconds for 1.2 seconds.
   *
   * @fires setStoppableInterval - Repeatedly updates animation and attack state.
   * @fires setTimeout - Temporarily sets attack mode duration.
   * @memberof Endboss
   */
  animate() {
    setStoppableInterval(() => {
      if (this.isDead()) { this.playAnimation(this.IMAGES_DEAD); this.inAttackMode = false; }
      else if (this.isHurt()) { this.playAnimation(this.IMAGES_HURT); endboss_hit.play(); }
      else if (this.inAlertMode) this.playAnimation(this.IMAGES_ALERT);
      else if (this.inAttackMode) { attackMode.play(); this.stopMoving(); this.playAnimation(this.IMAGES_ATTACK); }
      else { this.playAnimation(this.IMAGES_WALKING); if (this.hadFirstContact) this.moveToCharacter(); }

      if (world.character.x >= 3000 && !this.hadFirstContact) {
        this.hadFirstContact = true; this.startAlertMode(); gameMusic.pause(); endgame_level.play(); endgame_level.loop = true;
      }
    }, 150);

    setStoppableInterval(() => {
      if (this.hadFirstContact && !this.isDead()) this.inAttackMode = true;
      setTimeout(() => this.inAttackMode = false, 1200);
    }, 5000);
  }

  /**
   * Activates alert mode for a short duration.
   */
  startAlertMode() {
    this.inAlertMode = true;
    setTimeout(() => {
      this.inAlertMode = false;
    }, 1500);
  }

  /**
   * Moves the Endboss towards the character based on their relative positions.
   *
   * The Endboss will move left if the character is to the left beyond a certain distance,
   * or move right if the character is to the right beyond that distance.
   * The `otherDirection` property is updated to flip the Endboss image correctly.
   *
   * Additionally, attack and hit sounds are paused during movement.
   *
   * @returns {void}
   */
  moveToCharacter() {
    let characterX = world.character.x;
    let endbossX = this.x;

    let throughCharacter = 200;
    if (characterX <= endbossX + throughCharacter) {
      this.x -= 45;
      this.otherDirection = false;
    } else if (characterX > endbossX - throughCharacter) {
      this.x += 45;
      this.otherDirection = true;
    }
    attackMode.pause();
    endboss_hit.pause();
  }

  /**
   * Stops the endboss movement.
   */
  stopMoving() {
    this.speed = 0;
  }
}
