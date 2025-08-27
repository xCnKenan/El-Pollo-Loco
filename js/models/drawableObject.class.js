/**
 * Represents a drawable object in the game.
 * Handles image loading, drawing, and optional hitbox rendering.
 */
class DrawableObject {
  x = 130;
  y = 135;
  height = 300;
  width = 150;
  img;
  imageCache = [];
  currentImage = 0;

  /**
   * Draws the object on the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context to draw on.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (error) {
      console.warn("Error loading image", error);
      console.log("Could not load img:", this.img.src);
    }
  }

  /**
   *
   * @param {Array} path - ('img/test.png');
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ... ];
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
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
   * @returns {void}
   */
  run() {
    setStoppableInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);

    setStoppableInterval(() => {
      this.checkElementsToPickUp();
    }, 30);
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
   * Stops background sounds/music.
   * @returns {void}
   */
  stopSounds() {
    pepeHit.pause();
    pepeHit.currentTime = 0;
    gameMusic.pause();
    gameMusic.currentTime = 0;
    endgame_level.pause();
    endgame_level.currentTime = 0;
    attackMode.pause();
    endgame_level.currentTime = 0;
    endboss_hit.pause();
    endboss_hit.currentTime = 0;
  }

  /**
   * Renders all background objects in the game.
   * Applies camera translation to correctly position the objects on the canvas.
   */
  backGroundObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * Renders all status bars in the game, such as health, bottles, coins, and endboss bar.
   * Applies camera translation where necessary to ensure correct positioning.
   */
  statusBarsInGame() {
    this.ctx.translate(-this.camera_x, 0);
    this.statusBars.forEach((statusbar) => this.addToMap(statusbar));
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Renders all movable objects in the game.
   * This includes the player character, enemies, throwable objects, bottles, and coins.
   * Reverses camera translation after drawing to maintain correct canvas state.
   */
  movableObjectsInGame() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0);
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
  getBottlesOnGround() {
    this.level.bottles = this.level.bottles.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        bottleCollect.play();
        this.character.bottleAdded();
        let bottleBar = this.statusBars[1];
        bottleBar.setValue(this.character.amountOfBottles);
        return false;
      }
      return true;
    });
  }

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
  getCoinsInMap() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        coinCollect.play();
        this.character.coinsAdded();
        let coinsBar = this.statusBars[2];
        coinsBar.setValue(this.character.amountOfCoins);
        return false;
      }
      return true;
    });
  }
}
