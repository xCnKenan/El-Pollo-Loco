let pepeHit = new Audio("audio/pepe_hit.wav");
let pepeJump = new Audio("audio/pepe_jump.wav");
let coinCollect = new Audio("audio/collect-coin.wav");
let bottleCollect = new Audio("audio/collect-bottle.wav");
let throwing = new Audio("audio/throwing.wav");
let enemy_dead = new Audio("audio/enemy-dead.wav");
let gameMusic = new Audio("audio/gameMusic.wav");
let snoring = new Audio("audio/snoring.mp3");
let endgame_level = new Audio("audio/endgame_level.mp3");
let attackMode = new Audio("audio/attackMode.mp3");
let endboss_hit = new Audio("audio/endboss_hit.mp3");
let game_over = new Audio("audio/game_over.mp3");
let success = new Audio("audio/you-win.m4a");

let gameSounds = [
  pepeHit,
  pepeJump,
  coinCollect,
  bottleCollect,
  throwing,
  enemy_dead,
  gameMusic,
  snoring,
  endgame_level,
  attackMode,
  endboss_hit,
  game_over,
  success,
];

coinCollect.volume = 0.1;
bottleCollect.volume = 0.5;
enemy_dead.volume = 0.2;
gameMusic.volume = 0.4;
game_over.volume = 0.4;
snoring.volume = 0.1;
endgame_level.volume = 0.4;
game_overPlayed = false;
successPlayed = false;

/**
 * Represents the main game world where all game logic is executed,
 * including rendering, collision detection, object management, and audio control.
 *
 * @class World
 */
class World extends DrawableObject {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarBottle = new StatusBarBottle();
  statusBarCoins = new StatusBarCoins();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];

  /**
   * Creates the game world.
   *
   * @param {HTMLCanvasElement} canvas - The canvas where the world is drawn.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.startDrawLoop();
  }

  /**
   * Checks if the player can throw a bottle.
   * - A bottle can only be thrown if the "D" key is pressed
   *   and the character still has bottles available.
   * - A cooldown of 1000 ms (1 sec) is enforced between throws.
   *
   * Effects:
   * - Creates a new `ThrowableObject` at the character's position.
   * - Plays the throwing sound effect.
   * - Decreases the character's bottle count.
   * - Updates the bottle status bar.
   * - Saves the timestamp of the last throw.
   *
   * @method checkThrowObjects
   * @returns {void}
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.character.amountOfBottles) {
      let nowThrown = new Date().getTime();
      if (!this.lastBottleThrowTime) {
        this.lastBottleThrowTime = 0;
      }
      if (nowThrown - this.lastBottleThrowTime < 700) return
      let offsetX = world.character.otherDirection ? 10 : 80;
      let offsetY = 100;
      let bottle = new ThrowableObject(this.character.x + offsetX, this.character.y + offsetY);
      throwing.play();
      this.throwableObjects.push(bottle);
      this.character.bottleSubtracted();
      this.statusBarBottle.setPercentage(this.character.amountOfBottles);
      this.lastBottleThrowTime = nowThrown;
    }
  }

  /**
   * Handles all collision checks:
   * - Player with enemies
   * - Player with coins
   * - Player with bottles
   * - Thrown bottles with enemies
   * @returns {void}
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        (this.character.jumpCollision(enemy) && enemy instanceof Chicken) ||
        (this.character.jumpCollision(enemy) && enemy instanceof ChickenSmall)
      ) {
        enemy.energy = 0;
        enemy.speed = 0;
        enemy.isDead();
        enemy_dead.play();
        setStoppableInterval(() => {
          this.removeItem(enemy, this.level.enemies);
        }, 250);
      } else if (this.character.isColliding(enemy) && !enemy.isDead()) {
        pepeHit.play();
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks ELements in World which can be picked up
   * runs every 30ms
   */
  checkElementsToPickUp() {
    /**
     * Checks all bottles in the level for collisions with the character
     * and removes collected bottles from the array.
     *
     * On collision:
     * - plays the collection sound,
     * - increases the character's bottle count,
     * - updates the bottle status bar.
     *
     * @returns {Array<Object>} A new array containing only the bottles that have not been collected.
     */
    this.level.bottles = this.level.bottles.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        bottleCollect.play();
        this.character.bottleAdded();
        this.statusBarBottle.setPercentage(this.character.amountOfBottles);
        return false;
      }
      return true;
    });

    /**
     * Checks all coins in the level for collisions with the character
     * and removes collected coins from the array.
     *
     * On collision:
     * - plays the coin collection sound,
     * - increases the character's coin count,
     * - updates the coin status bar.
     *
     * @returns {Array<Object>} A new array containing only the coins that have not been collected.
     */
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        coinCollect.play();
        this.character.coinsAdded();
        this.statusBarCoins.setPercentage(this.character.amountOfCoins);
        return false;
      }
      return true;
    });
    if (world.throwableObjects != 0) {
      this.checkCollisionWithEnemy();
    }
  }

  /**
   * Checks if thrown bottles collide with enemies and applies effects.
   * @returns {void}
   */
  checkCollisionWithEnemy() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && enemy instanceof Endboss) {
          this.againstFinalBoss(bottle, enemy);
        } else if (
          (bottle.isColliding(enemy) && enemy instanceof Chicken) ||
          (bottle.isColliding(enemy) && enemy instanceof ChickenSmall)
        ) {
          this.againstNormalEnemy(bottle, enemy);
          enemy_dead.play();
        }
      });
    });
  }

  /**
   * Handles collision when a bottle hits a normal enemy (e.g., Chicken).
   * @param {ThrowableObject} bottle - The thrown bottle.
   * @param {MovableObject} enemy - The enemy being hit.
   * @returns {void}
   */
  againstNormalEnemy(bottle, enemy) {
    enemy.energy = 0;
    this.removeItem(bottle, this.throwableObjects);
    enemy.speed = 0;
    enemy.isDead();
    setStoppableInterval(() => {
      this.removeItem(enemy, this.level.enemies);
    }, 250);
  }

  /**
   * Handles collision when a bottle hits the Endboss.
   * @param {ThrowableObject} bottle - The thrown bottle.
   * @param {Endboss} enemy - The Endboss being hit.
   * @returns {void}
   */
  againstFinalBoss(bottle, enemy) {
    enemy.hit();
    this.removeItem(bottle, this.throwableObjects);
    this.statusBarEndboss.setPercentage(enemy.energy);
  }

  /**
   * Removes an item from a given array (e.g., bottles, coins, enemies).
   * @param {any} item - The object to remove.
   * @param {Array<any>} array - The array containing the item.
   * @returns {void}
   */
  removeItem(item, array) {
    let itemToRemove = array.indexOf(item);
    if (itemToRemove > -1) {
      array.splice(itemToRemove, 1);
    }
  }

  /**
   * Draws all game objects, background, UI, and checks for game-ending conditions.
   * @returns {void}
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarBottle);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarCoins);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarEndboss);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0);
    this.checkGameStatus();
  }

  /**
 * Checks the current status of the game.
 * - If the player's character is dead, triggers the losing sequence.
 * - If any enemy that is an instance of Endboss is dead, triggers the winning sequence.
 */
  checkGameStatus() {
    if (this.character.isDead()) {
      this.youLostGame();
    }
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead() && enemy instanceof Endboss) {
        this.youWonGame();
      }
    });
  }

  /**
 * Handles the actions when the player loses the game.
 * Stops all sounds, plays the losing sound, triggers the game ending with
 * a losing message, and hides the mobile buttons.
 */
  youLostGame() {
    this.stopSounds();
    this.youLoseSound();
    this.gameEnding(this.level.youLost);
    let mobileButtonsRef = document.getElementById("mobileButtons");
    mobileButtonsRef.classList.add("d-none");
  }

  /**
 * Handles the actions when the player wins the game.
 * Stops all sounds, plays the success sound once, triggers the game ending
 * with a winning message, and hides the mobile buttons.
 */
  youWonGame() {
    this.stopSounds();
    if (!successPlayed) {
      success.play();
      successPlayed = true;
    }
    this.gameEnding(this.level.youWon);
    let mobileButtonsRef = document.getElementById("mobileButtons");
    mobileButtonsRef.classList.add("d-none");
  }

  /**
   * Handles the end of the game (win or lose).
   * @param {Array<MovableObject>} status - The objects to display (YouWon or YouLost screen).
   * @returns {void}
   */
  gameEnding(status) {
    this.endScreenButtons();
    setStoppableInterval(() => {
      clearStoppableIntervals();
    }, 1000);
    this.addObjectsToMap(status);
    this.keyboard = "";
    this.level.enemies.forEach((movableObject) => {
      movableObject.speed = 0;
    });
  }

  /**
   * Adds multiple objects to the canvas.
   * @param {Array<MovableObject>} objects - List of objects to draw.
   * @returns {void}
   */
  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * Adds a single object to the canvas, including its hitbox and flipped orientation if needed.
   * @param {MovableObject} moveObj - The object to draw.
   * @returns {void}
   */
  addToMap(moveObj) {
    if (moveObj.otherDirection) {
      this.flipImage(moveObj);
    }
    moveObj.draw(this.ctx);
    if (moveObj.otherDirection) {
      this.flipImageBack(moveObj);
    }
  }

  /**
   * Flips an object horizontally for rendering.
   * @param {MovableObject} moveObj - The object to flip.
   * @returns {void}
   */
  flipImage(moveObj) {
    this.ctx.save();
    this.ctx.translate(moveObj.width, 0);
    this.ctx.scale(-1, 1);
    moveObj.x = moveObj.x * -1;
  }

  /**
   * Restores the flipped image back to its original orientation.
   * @param {MovableObject} moveObj - The object to restore.
   * @returns {void}
   */
  flipImageBack(moveObj) {
    moveObj.x = moveObj.x * -1;
    this.ctx.restore();
  }
}
