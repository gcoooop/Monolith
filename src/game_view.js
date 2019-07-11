class GameView {
  constructor(game, ui, htp, ctx) {
    this.game = game;
    this.ui = ui;
    this.htp = htp;
    this.ctx = ctx;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const dt = time - this.lastTime;

    this.game.step(dt);
    this.game.draw(this.ctx);
    this.ui.updateControlPanel();
    this.htp.draw()
    this.lastTime = time;

    if (this.game.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
};

module.exports = GameView;