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
  // throwableObjects = new ThrowableObject(this.character.x + 100, this.character.y + 100);

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  //throw bottle with D
  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      // this.throwableObjects.playAnimation(bottle);
    }
  }

  checkCollisions() {
    // here check if character colliding with enemy
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });

    // here check if character colliding with bottles
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.bottleAdded();
        this.statusBarBottle.setPercentage(this.character.amountOfBottles);
        this.removeItem(bottle, this.level.bottles);
      }
    });

    // here check if character colliding with coin
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
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
        else if (bottle.isColliding(enemy)) {
          this.againstNormalEnemy(bottle, enemy);
        }
      });
    });
  }

  againstNormalEnemy(bottle, enemy) {
    enemy.energy = 0;
    this.removeItem(bottle, this.throwableObjects);
    enemy.speed = 0;
    enemy.isDead();
    setInterval(() => {
      this.removeItem(enemy, this.level.enemies);
    }, 250);
  }

  againstFinalBoss(bottle, enemy) {
    enemy.hit();
    this.removeItem(bottle, this.throwableObjects);
    this.statusBarEndboss.setPercentage(enemy.energy);
    console.log("Endboss energy is", enemy.energy);
  }

  // remove item on ground after picked up
  removeItem(item, array) {
    let itemToRemove = array.indexOf(item);
    if (itemToRemove > -1) {
      array.splice(itemToRemove, 1);
    }
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

    // draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
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
