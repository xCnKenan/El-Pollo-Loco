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
class World {
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
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.startDrawLoop();
  }

  /**
   * Assigns the world reference to the character.
   * @returns {void}
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the main update loop (collision checks, throw logic, etc.).
   * Runs every 200ms.
   * @returns {void}
   */
  run() {
    setStoppableInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  /**
   * Checks if the player throws a bottle when pressing "D".
   * Adds the bottle to the throwable objects list if available.
   * @returns {void}
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.character.amountOfBottles) {
      let bottle;
      if (!world.character.otherDirection) {
        bottle = new ThrowableObject(
          this.character.x + 80,
          this.character.y + 100
        );
      }
      if (world.character.otherDirection) {
        bottle = new ThrowableObject(
          this.character.x + 10,
          this.character.y + 100
        );
      }
      throwing.play();
      this.throwableObjects.push(bottle);
      this.character.bottleSubtracted();
      this.statusBarBottle.setPercentage(this.character.amountOfBottles);
      world.character.lastTimeWalking = new Date().getTime();
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
    // here check if character colliding with enemy
    this.level.enemies.forEach((enemy) => {
      if (
        (this.character.jumpCollision(enemy) && enemy instanceof Chicken) ||
        (this.character.jumpCollision(enemy) && enemy instanceof ChickenSmall)
      ) {
        // try to kill enemy when jumping on them
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

    // here check if character colliding with bottles
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        bottleCollect.play();
        this.character.bottleAdded();
        this.statusBarBottle.setPercentage(this.character.amountOfBottles);
        this.removeItem(bottle, this.level.bottles);
      }
    });

    // here check if character colliding with coin
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        coinCollect.play();
        this.character.coinsAdded();
        this.statusBarCoins.setPercentage(this.character.amountOfCoins);
        this.removeItem(coin, this.level.coins);
      }
    });

    // here check if bottle colliding with enemy
    if (world.throwableObjects != 0) {
      this.checkCollisionWithEnemy();
    }
  }

  /**
   * Checks if thrown bottles collide with enemies and applies effects.
   * @returns {void}
   */
  checkCollisionWithEnemy() {
    // go through array of bottles
    this.throwableObjects.forEach((bottle) => {
      // go through array of enemies
      this.level.enemies.forEach((enemy) => {
        //check if colliding with endboss
        if (bottle.isColliding(enemy) && enemy instanceof Endboss) {
          this.againstFinalBoss(bottle, enemy);
        }
        //check if bottle is colliding with enemy
        else if (
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
   * Starts the animation loop that continuously redraws the game.
   * @returns {void}
   */
  startDrawLoop() {
    let loop = () => {
      this.draw();
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  /**
   * Draws all game objects, background, UI, and checks for game-ending conditions.
   * @returns {void}
   */
  draw() {
    //clear old Frames
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // ctx wird verschoben nach vorna
    this.ctx.translate(this.camera_x, 0);

    // render background img
    this.addObjectsToMap(this.level.backgroundObject);
    // render cloud img
    this.addObjectsToMap(this.level.clouds);

    // ctx wird in gegenrichtung verschoben
    this.ctx.translate(-this.camera_x, 0);
    //render statusBar img
    // -------- Space for fixed objects ------//
    this.addToMap(this.statusBar);
    // ctx wird verschoben nach vorne
    this.ctx.translate(this.camera_x, 0);

    // ctx wird in gegenrichtung verschoben
    this.ctx.translate(-this.camera_x, 0);
    //render statusBarBottle img
    // -------- Space for fixed objects ------//
    this.addToMap(this.statusBarBottle);
    // ctx wird verschoben nach vorned
    this.ctx.translate(this.camera_x, 0);

    // ctx wird in gegenrichtung verschoben
    this.ctx.translate(-this.camera_x, 0);
    //render statusBarCoins img
    // -------- Space for fixed objects ------//
    this.addToMap(this.statusBarCoins);
    // ctx wird verschoben nach vorne
    this.ctx.translate(this.camera_x, 0);

    // ctx wird in gegenrichtung verschoben
    this.ctx.translate(-this.camera_x, 0);
    //render statusBarEndboss img
    // -------- Space for fixed objects ------//
    this.addToMap(this.statusBarEndboss);
    // ctx wird verschoben nach vorne
    this.ctx.translate(this.camera_x, 0);

    // img source and positions in x and y
    this.addToMap(this.character);
    // render enemies img
    this.addObjectsToMap(this.level.enemies);

    // img of bottle to throw
    this.addObjectsToMap(this.throwableObjects);
    // bottles to pick up on Ground
    this.addObjectsToMap(this.level.bottles);
    //coins to pick up
    this.addObjectsToMap(this.level.coins);

    // ctx wird in gegenrichtung verschoben
    this.ctx.translate(-this.camera_x, 0);

    // try to render game over img
    if (this.character.isDead()) {
      this.stopSounds();
      this.youLoseSound();
      this.gameEnding(this.level.youLost);
      let mobileButtonsRef = document.getElementById("mobileButtons");
      mobileButtonsRef.classList.add("d-none");
    }
    // check if enemy is dead and show you won img
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead() && enemy instanceof Endboss) {
        this.stopSounds();
        if (!successPlayed) {
          success.play();
          successPlayed = true;
        }
        this.gameEnding(this.level.youWon);
        let mobileButtonsRef = document.getElementById("mobileButtons");
        mobileButtonsRef.classList.add("d-none");
      }
    });
  }

  /**
   * Plays the game-over sound only once.
   * @returns {void}
   */
  youLoseSound() {
    if (!game_overPlayed) {
      game_over.play();
      game_overPlayed = true;
    }
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
    this.keyboard = ""; // no longer availabe
    this.level.enemies.forEach((movableObject) => {
      // enemys cant move after losing game
      movableObject.speed = 0;
    });
  }

  /**
   * Stops background sounds/music.
   * @returns {void}
   */
  stopSounds() {
    pepeHit.pause();
    gameMusic.pause();
    endgame_level.pause();
  }

  /**
   * Displays restart and home buttons on the end screen.
   * @returns {void}
   */
  endScreenButtons() {
    let restartRef = document.getElementById("restart");
    restartRef.classList.remove("d-none");

    let homeRef = document.getElementById("home");
    homeRef.classList.remove("d-none");
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
    //here draw hitbox for all classes, e.g. character, enemies
    moveObj.drawFrame(this.ctx);

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
