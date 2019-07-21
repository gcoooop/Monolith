const canvasUI = document.getElementById("monolith-canvas-ui");
const canvasGame = document.getElementById("monolith-canvas-game");

class GameView {
  constructor(game, ui, cui, htp) {
    this.game = game;
    this.ui = ui;
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

    this.game.step(dt);
    this.game.draw(this.gameCtx);
    this.cui.draw(this.UICtx);
    this.ui.updateControlPanel();
    this.htp.draw(this.UICtx);
    this.lastTime = time;

    if (this.game.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
};

module.exports = GameView;