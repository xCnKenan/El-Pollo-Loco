// ist wie world
class Mainscreen {
  startButton = new Startgame();
  controllsButton = new Controlls();
  screenCanvas;
  ctxStartScreen;
  background = new Backgroundimage(
    "img/9_intro_outro_screens/start/startscreen_1.png",
    0,
    0
  );

  constructor(screenCanvas) {
    this.ctxStartScreen = screenCanvas.getContext("2d");
    this.screenCanvas = screenCanvas;
    this.draw();
  }

  draw() {
    this.ctxStartScreen.clearRect(0,0,this.screenCanvas.width,this.screenCanvas.height);
    this.showOnScreen(this.background);
    this.showOnScreen(this.startButton);
    this.showOnScreen(this.controllsButton);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  showOnScreen(elements) {
    this.ctxStartScreen.drawImage(
      elements.img,
      elements.x,
      elements.y,
      elements.height,
      elements.width
    );
  }
}
