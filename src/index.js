const Game = require("./game");
const GameView = require("./game_view");
const UI = require("./ui");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("monolith-canvas");

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx);
  new UI(canvasEl, game);
  gameView.start();
});