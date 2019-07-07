const Game = require("./game");
const GameView = require("./game_view");
const UI = require("./ui");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("monolith-canvas");

  const canvasMapEl = document.getElementById("monolith-map-canvas");
  const mapCtx = canvasMapEl.getContext("2d");

  const map = new Image();
  // map.crossOrigin = "anonymous";
  map.onload = () => {
    mapCtx.drawImage(map, 0, 0);
  };
  // map.src = "https://www.dropbox.com/s/xmddx2jbkwvvz7e/MonolithMap_wide.png?raw=1";
  // map.src = "https://monolith-game.s3-us-west-1.amazonaws.com/MonolithMap_wide.png";
  map.src = "../assets/map/MonolithMap_wide.png";

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const ui = new UI(canvasEl, game, mapCtx);
  const gameView = new GameView(game, ui, ctx);
  gameView.start();
});

// function getCursorPosition(canvas, event) {
//   const rect = canvas.getBoundingClientRect()
//   const x = event.clientX - rect.left
//   const y = event.clientY - rect.top
//   console.log("x: " + x + " y: " + y)
// }

// canvasEl.addEventListener('mousedown', function (e) {
//   getCursorPosition(canvasEl, e)
// })