const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("monolith-canvas");

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  // new GameView(game, ctx).start();

  const Caveman = require("./caveman");

  const caveman = new Caveman({ pos: [100, 100] });
  caveman.draw(ctx)

});

