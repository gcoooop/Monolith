const Game = require("./game");
const GameView = require("./game_view");
const UI = require("./ui");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("monolith-canvas");

  function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

  canvasEl.addEventListener('mousedown', function(e) {
      getCursorPosition(canvasEl, e)
  })

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx);
  new UI(canvasEl, game);
  gameView.start();
});