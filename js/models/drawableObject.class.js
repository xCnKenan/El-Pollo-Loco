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
}
