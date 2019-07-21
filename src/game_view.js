class GameView {
  constructor(game, ui, cui, htp, ctx) {
    this.game = game;
    this.ui = ui;
    this.cui = cui;
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
    this.ctx.translate(0, 150)
    this.game.draw(this.ctx);
    this.ctx.translate(1500, 0);
    this.cui.draw(this.ctx);
    this.ctx.translate(-1500, -150)
    this.ui.updateControlPanel();
    this.htp.draw()
    this.lastTime = time;

    if (this.game.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
};

module.exports = GameView;