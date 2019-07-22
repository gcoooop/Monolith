const Game = require("./game");
const GameView = require("./game_view");
const UI = require("./ui");
const CUI = require("./ui/canvas_ui");
const HowToPlayAnimation = require("./instructions/instructions_animation");

document.addEventListener("DOMContentLoaded", () => {
  const canvasGame = document.getElementById("monolith-canvas-game");

  const game = new Game();
  // const ui = new UI(canvasGame, game);
  const cui = new CUI(game);
  const htp = new HowToPlayAnimation();
  // const gameView = new GameView(game, ui, cui, htp, ctx);
  // const gameView = new GameView(game, ui, cui, htp);
  const gameView = new GameView(game, cui, htp);
  gameView.start();
});