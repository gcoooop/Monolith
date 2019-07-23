const Game = require("./game");
const GameView = require("./game_view");
const CUI = require("./ui/canvas_ui");
const HowToPlayAnimation = require("./instructions/instructions_animation");

document.addEventListener("DOMContentLoaded", () => {
  const canvasGame = document.getElementById("monolith-canvas-game");
  const canvasUI = document.getElementById("monolith-canvas-ui");

  const game = new Game();
  const htp = new HowToPlayAnimation();
  const ui = new CUI(canvasUI.getContext("2d"), game, htp);
  game.ui = ui;
  const gameView = new GameView(game, ui, htp);
  gameView.start();
});