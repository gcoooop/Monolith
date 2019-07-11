const Game = require("./game");
const GameView = require("./game_view");
const UI = require("./ui");
const HowToPlayAnimation = require("./instructions/instructions_animation");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("monolith-canvas");

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const ui = new UI(canvasEl, game);
  const htp = new HowToPlayAnimation(canvasEl, ctx);
  const gameView = new GameView(game, ui, htp, ctx);
  gameView.start();
});