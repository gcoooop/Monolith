class GameView {
  constructor(game, ctx) {
    this.game = game;
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
    this.lastTime = time;

    console.log(this.game.running)
    if (this.game.running) {
      requestAnimationFrame(this.animate.bind(this));
    } else {

    }
  }
};

module.exports = GameView;