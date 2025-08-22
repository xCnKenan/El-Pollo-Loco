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
  attackMode
];

coinCollect.volume = 0.1;
bottleCollect.volume = 0.5;
enemy_dead.volume = 0.2;
gameMusic.volume = 0.4; 
snoring.volume = 0.1;
endgame_level.volume = 0.4;

class World {
  character = new Character();
  // level = level1;
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
  // throwableObjects = new ThrowableObject(this.character.x + 100, this.character.y + 100);

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.startDrawLoop();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setStoppableInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  //throw bottle with D
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
      // render statusbar and subtract from array
      this.character.bottleSubtracted();
      this.statusBarBottle.setPercentage(this.character.amountOfBottles);
      world.character.lastTimeWalking = new Date().getTime();
    }
  }

  checkCollisions() {
    // here check if character colliding with enemy
    this.level.enemies.forEach((enemy) => {
      if (
        (this.character.jumpCollision(enemy) && enemy instanceof Chicken) ||
        (this.character.jumpCollision(enemy) && enemy instanceof ChickenSmall)
      ) {
        // try to kill enemy when jumping on them
        console.log("colliding top");
        enemy.energy = 0;
        enemy.speed = 0;
        enemy.isDead();
        enemy_dead.play();
        setStoppableInterval(() => {
          this.removeItem(enemy, this.level.enemies);
        }, 250);
      } else if (this.character.isColliding(enemy) && !enemy.isDead()) {
        console.log("colliding right left");
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

  againstNormalEnemy(bottle, enemy) {
    enemy.energy = 0;
    this.removeItem(bottle, this.throwableObjects);
    enemy.speed = 0;
    enemy.isDead();

    setStoppableInterval(() => {
      this.removeItem(enemy, this.level.enemies);
    }, 250);
  }

  againstFinalBoss(bottle, enemy) {
    enemy.hit();
    this.removeItem(bottle, this.throwableObjects);
    this.statusBarEndboss.setPercentage(enemy.energy);
  }

  // remove item on ground after picked up
  removeItem(item, array) {
    let itemToRemove = array.indexOf(item);
    if (itemToRemove > -1) {
      array.splice(itemToRemove, 1);
    }
  }

  startDrawLoop() {
    let loop = () => {
      this.draw();
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

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

      setStoppableInterval(()=>{
      clearStoppableIntervals();
      this.endScreenButtons();
      }, 1000);
      this.addObjectsToMap(this.level.youLost);
      this.keyboard = ''; // no longer availabe
      this.level.enemies.forEach((movableObject) => { // enemys cant move after losing game
          movableObject.speed = 0;
      });
      
    }

    // check if enemy is dead and show you won img
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead() && enemy instanceof Endboss) {
        setStoppableInterval(() => {
          clearStoppableIntervals();
          this.endScreenButtons();
          console.log("stopGame");
        }, 1000);
        this.addObjectsToMap(this.level.youWon);
        console.log("Endboss dead, You Won");
      }
    });
  }

  endScreenButtons() {
    let restartRef = document.getElementById("restart");
    restartRef.classList.remove("d-none");

    let homeRef = document.getElementById("home");
    homeRef.classList.remove("d-none");
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

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

  flipImage(moveObj) {
    this.ctx.save();
    this.ctx.translate(moveObj.width, 0);
    this.ctx.scale(-1, 1);
    moveObj.x = moveObj.x * -1;
  }

  flipImageBack(moveObj) {
    moveObj.x = moveObj.x * -1;
    this.ctx.restore();
  }
}
