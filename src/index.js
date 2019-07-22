const Game = require("./game");
const GameView = require("./game_view");
const UI = require("./ui");
const CUI = require("./ui/canvas_ui");
const HowToPlayAnimation = require("./instructions/instructions_animation");

document.addEventListener("DOMContentLoaded", () => {
  const canvasGame = document.getElementById("monolith-canvas-game");
  const canvasUI = document.getElementById("monolith-canvas-ui");

  const game = new Game();
  const htp = new HowToPlayAnimation();
  const cui = new CUI(canvasUI.getContext("2d"), game, htp);
  const gameView = new GameView(game, cui, htp);
  gameView.start();
});