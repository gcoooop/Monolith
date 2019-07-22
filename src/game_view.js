const gameContainer = document.getElementById("monolith-game");
const gameBackground = document.getElementById("monolith-background");
const canvasUI = document.getElementById("monolith-canvas-ui");
const canvasGame = document.getElementById("monolith-canvas-game");

const gameAspectRatio = 1850 / 1200;

class GameView {
  constructor(game, cui, htp) {
    this.game = game;
    this.cui = cui;
    this.htp = htp;
    this.UICtx = canvasUI.getContext("2d");
    this.gameCtx = canvasGame.getContext("2d");
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const dt = time - this.lastTime;

    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    const windowAspectRatio = windowW / windowH;

    let newWidth
    let newHeight;
    if (windowAspectRatio > gameAspectRatio) {
      newWidth = windowH * gameAspectRatio;
      newHeight = windowH;
      gameContainer.style.width = `${newWidth}px`;
      gameContainer.style.height = `${windowH}px`;
    } else {
      newHeight = windowW / gameAspectRatio;
      newWidth = windowW;
      gameContainer.style.width = `${windowW}px`;
      gameContainer.style.height = `${newHeight}px`;
    }
    gameContainer.style.marginTop = `${-newHeight * 0.5}px`;
    gameContainer.style.marginLeft = `${-newWidth * 0.5}px`;
    const scale = newWidth / 1850;
    gameBackground.style.backgroundPositionY = `${150 * scale}px`;
    gameBackground.style.backgroundSize = `${1500 * scale}px`;

    this.game.step(dt);
    this.game.draw(this.gameCtx);
    this.cui.setScale(scale);
    // pass in gameCTX instead of uiCTX because game clears the canvas every frame
    this.htp.draw(this.gameCtx);
    this.lastTime = time;

    if (this.game.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
};

module.exports = GameView;