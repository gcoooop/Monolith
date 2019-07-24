/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const NPC = __webpack_require__(/*! ./moving_objects/npcs/npc */ \"./src/moving_objects/npcs/npc.js\");\nconst Tower = __webpack_require__(/*! ./towers/tower */ \"./src/towers/tower.js\");\nconst Artillery = __webpack_require__(/*! ./moving_objects/artillery/artillery */ \"./src/moving_objects/artillery/artillery.js\");\nconst Monolith = __webpack_require__(/*! ./monolith/monolith */ \"./src/monolith/monolith.js\");\n\nconst Waves = __webpack_require__(/*! ./waves/waves */ \"./src/waves/waves.js\");\n\nclass Game {\n  constructor() {\n    this.running = true;\n    this.towers = [];\n    this.npcs = [];\n    this.artillery = [];\n    this.flint = 200;\n    this.monolith = new Monolith();\n    this.wave = 1;\n    this.waveProgress = \"complete\";\n  }\n\n  sendWave() {\n    if (this.waveProgress === \"complete\") {\n      Waves[this.wave](this);\n      this.waveProgress = \"incomplete\";\n    }\n  }\n\n  add(object) {\n    if (object instanceof NPC) {\n      this.npcs.push(object); \n    } else if (object instanceof Tower)  {    \n      this.spendFlint(object.flint);\n      this.towers.push(object);\n    } else if (object instanceof Artillery) {\n      this.artillery.push(object);\n    } else {\n      throw new Error(\"unknown object!!!\")\n    }\n  }\n\n  allObjects() {\n    return [].concat(this.npcs, this.artillery, this.towers, this.monolith);\n  }\n\n  allMoveableObjects() {\n    return [].concat(this.npcs, this.artillery);\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, 1850, 1200);\n    this.allObjects().forEach(object => {\n      object.draw(ctx);\n    });\n  }\n\n  moveObjects(dt) {\n    this.allMoveableObjects().forEach(object => {\n      object.move(dt);\n    });\n  }\n\n  runTargeting() {\n    this.towers.forEach(tower => {\n      tower.calcTargets(this.npcs);\n    });\n  }\n\n  launchArtillery() {\n    this.towers.forEach(tower => {\n      if (!tower.noTargets()) tower.throttledFire();\n    });\n  }\n\n  damageMonolith(damage) {\n    this.monolith.takeDamage(damage);\n  }\n\n  earnFlint(amount) {\n    this.flint += amount;\n    this.ui.draw()\n  }\n  \n  spendFlint(amount) {\n    this.flint -= amount;\n  }\n\n  step(dt) {\n    this.moveObjects(dt);\n    this.runTargeting();\n    this.launchArtillery();\n    this.checkForLost();\n  }\n\n  remove(object) {\n    if (object instanceof NPC) {\n      this.earnFlint(object.flint);\n      this.npcs.splice(this.npcs.indexOf(object), 1);\n      if (this.waveComplete()) {\n        this.wave++;\n        this.waveProgress = \"complete\";\n      }\n    } else if (object instanceof Tower) {\n      this.towers.splice(this.towers.indexOf(object), 1);\n    } else if (object instanceof Artillery) {\n      this.artillery.splice(this.artillery.indexOf(object), 1);\n    } else {\n      throw new Error(\"unknown object!!!\")\n    }\n  }\n\n  checkForLost() {\n    if (this.monolith.health <= 0) this.running = false;\n  }\n\n  waveComplete() {\n    return !this.npcs.length;\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util/util */ \"./src/util/util.js\");\n\nconst gameContainer = document.getElementById(\"monolith-game\");\nconst gameBackground = document.getElementById(\"monolith-background\");\nconst canvasUI = document.getElementById(\"monolith-canvas-ui\");\nconst canvasGame = document.getElementById(\"monolith-canvas-game\");\n\nconst personalLinksContainer = document.getElementById(\"personal-links\");\n\nconst gameAspectRatio = 1850 / 1200;\n\nclass GameView {\n  constructor(game, cui, htp) {\n    this.game = game;\n    this.cui = cui;\n    this.htp = htp;\n    this.UICtx = canvasUI.getContext(\"2d\");\n    this.gameCtx = canvasGame.getContext(\"2d\");\n\n    this.scaleWindow = this.scaleWindow.bind(this);\n  }\n\n  start() {\n    this.lastTime = 0;\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  animate(time) {\n    const dt = time - this.lastTime;\n\n    this.scaleWindow();\n\n    this.game.step(dt);\n    this.game.draw(this.gameCtx);\n    // pass in gameCTX instead of uiCTX because game clears the canvas every frame\n    this.htp.draw(this.gameCtx);\n    this.lastTime = time;\n\n    if (this.game.running) {\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n\n  scaleWindow() {\n    const windowW = window.innerWidth;\n    const windowH = window.innerHeight;\n    const windowAspectRatio = windowW / windowH;\n\n    let newWidth\n    let newHeight;\n    if (windowAspectRatio > gameAspectRatio) {\n      newWidth = windowH * gameAspectRatio;\n      newHeight = windowH;\n      gameContainer.style.width = `${newWidth}px`;\n      gameContainer.style.height = `${windowH}px`;\n    } else {\n      newHeight = windowW / gameAspectRatio;\n      newWidth = windowW;\n      gameContainer.style.width = `${windowW}px`;\n      gameContainer.style.height = `${newHeight}px`;\n    }\n    gameContainer.style.marginTop = `${-newHeight * 0.5}px`;\n    gameContainer.style.marginLeft = `${-newWidth * 0.5}px`;\n    const scale = newWidth / 1850;\n    gameBackground.style.backgroundPositionY = `${150 * scale}px`;\n    gameBackground.style.backgroundSize = `${1500 * scale}px`;\n\n    personalLinksContainer.style.width = `${500 * scale}px`;\n    personalLinksContainer.style.height = `${(150 - 15) * scale}px`;\n    personalLinksContainer.style.top = `${15 * scale}px`;\n    personalLinksContainer.style.right = `${30 * scale}px`\n    this.cui.setScale(scale);\n  }\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\nconst CUI = __webpack_require__(/*! ./ui/canvas_ui */ \"./src/ui/canvas_ui.js\");\nconst HowToPlayAnimation = __webpack_require__(/*! ./instructions/instructions_animation */ \"./src/instructions/instructions_animation.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasGame = document.getElementById(\"monolith-canvas-game\");\n  const canvasUI = document.getElementById(\"monolith-canvas-ui\");\n\n  const game = new Game();\n  const htp = new HowToPlayAnimation();\n  const ui = new CUI(canvasUI.getContext(\"2d\"), game, htp);\n  game.ui = ui;\n  const gameView = new GameView(game, ui, htp);\n  gameView.start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/instructions/instructions_animation.js":
/*!****************************************************!*\
  !*** ./src/instructions/instructions_animation.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class HowToPlayAnimation {\n  constructor() {\n    this.page = 0;\n    this.nextPage = this.nextPage.bind(this);\n  }\n\n  nextPage(origin) {\n    if (this.page === 0 && origin === \"click\") {\n      this.page++;\n      setTimeout(() => this.nextPage(\"timeout\"), 4000);\n    } else if (this.page > 0 && origin === \"timeout\") {\n      this.page++;\n      setTimeout(() => this.nextPage(\"timeout\"), 4000);\n    }\n  }\n\n  draw(ctx) {\n    ctx.translate(0, 150);\n    switch (this.page) {\n      case 0:\n        break;\n      case 1:\n        this.monolithIntro(ctx);\n        break;\n      case 2:\n        this.objectiveIntro(ctx);\n        break;\n      case 3:\n        this.healthBarIntro(ctx);\n        break;\n      case 4:\n        this.healthBarJoke(ctx);\n        break;\n      case 5:\n        this.enemiesIntro(ctx);\n        break;\n      case 6:\n        this.towersIntro(ctx);\n        break;\n      case 7:\n        this.towersUtility(ctx);\n        break;\n      case 8:\n        this.towersHint(ctx);\n        break;\n      case 9:\n        this.experimentHint(ctx);\n        break;\n      case 10:\n        this.towerSelection(ctx);\n        break;\n      case 11:\n        this.towerPlacement(ctx);\n        break;\n      case 12:\n        this.towerCancel(ctx);\n        break;\n      case 13:\n        this.towerPurchasing(ctx);\n        break;\n      case 14:\n        this.earningFlint(ctx);\n        break;\n      case 15:\n        this.purchaseMechanics1(ctx);\n        break;\n      case 16:\n        this.purchaseMechanics2(ctx);\n        break;\n      case 17:\n        this.purchaseHint(ctx);\n        break;\n      case 18:\n        this.conclusion1(ctx);\n        break;\n      case 19:\n        this.conclusion2(ctx);\n        break;\n      case 20:\n        this.goodLuck(ctx);\n        break;\n      default: \n        this.page = 0;\n        break;\n    }\n    ctx.translate(0, -150);\n  }\n\n  monolithIntro(ctx) {\n    ctx.font = \"64px Arial\";\n    ctx.fillStyle = \"black\";\n    ctx.textAlign = \"center\";\n    ctx.fillText(\"This is the monolith\", 750, 500);\n    this.arrow(ctx, 1150, 215, 0);\n  }\n\n  objectiveIntro(ctx) {\n    this.monolithIntro(ctx);\n    ctx.fillText(\"It is up to you to protect it!\", 750, 600);\n  }\n\n  healthBarIntro(ctx) {\n    ctx.fillStyle = \"black\";\n    ctx.textAlign = \"center\";\n    ctx.fillText(\"This is the monolith's health bar\", 750, 500);\n    this.arrow(ctx, 250, 950, Math.PI * 0.5);\n    this.arrow(ctx, 1250, 950, Math.PI * 0.5);\n    this.arrow(ctx, 750, 950, Math.PI * 0.5);\n  }\n\n  healthBarJoke(ctx) {\n    this.healthBarIntro(ctx);\n    ctx.fillText(\"Don't let it deplete!\", 750, 600);\n  }\n\n  enemiesIntro(ctx) {\n    ctx.fillStyle = \"black\";\n    ctx.textAlign = \"center\";\n    ctx.fillText(\"Enemies will attack from these four paths\", 750, 500);\n    this.arrow(ctx, 250, 100, Math.PI * 0.1);\n    this.arrow(ctx, 175, 750, -Math.PI * 0.15);\n    this.arrow(ctx, 650, 825, -Math.PI * 0.35);\n    this.arrow(ctx, 1150, 825, -Math.PI * 0.65);\n  }\n\n  towersIntro(ctx) {\n    ctx.fillStyle = \"black\";\n    ctx.textAlign = \"center\";\n    ctx.fillText(\"These are your towers!\", 750, 500);\n    this.arrow(ctx, 1475, 220, 0);\n    this.arrow(ctx, 1475, 440, 0);\n    this.arrow(ctx, 1475, 660, 0);\n  }\n\n  towersUtility(ctx) {\n    this.towersIntro(ctx);\n    ctx.fillText(\"Towers will target and damage enemies in range\", 750, 600);\n  }\n  \n  towersHint(ctx) { \n    ctx.fillStyle = \"black\";\n    ctx.textAlign = \"center\";\n    ctx.fillText(\"Each tower has its own srengths and weaknesses\", 750, 500);\n  }\n\n  experimentHint(ctx) { \n    this.towersHint(ctx);\n    ctx.fillText(\"Experiment!\", 750, 600);\n  }\n\n  towerSelection(ctx) {\n    ctx.fillStyle = \"black\";\n    ctx.textAlign = \"center\";\n    ctx.fillText(\"Click to select a tower\", 750, 400);\n  }\n\n  towerPlacement(ctx) {\n    this.towerSelection(ctx);\n    ctx.fillText(\"Then, click on the map to place the tower\", 750, 500);\n  }\n\n  towerCancel(ctx) {\n    this.towerPlacement(ctx);\n    ctx.fillText(\"Or, click outside the map to cancel\", 750, 600);\n  }\n\n  towerPurchasing(ctx) {\n    ctx.fillStyle = \"black\";\n    ctx.textAlign = \"center\";\n    ctx.fillText(\"Towers are not free! You must have enough flint\", 750, 500);\n  }\n\n  earningFlint(ctx) {\n    this.towerPurchasing(ctx);\n    ctx.fillText(\"Stopping enemies rewards you with more flint\", 750, 600);\n  }\n\n  purchaseMechanics1(ctx) {\n    ctx.fillStyle = \"black\";\n    ctx.textAlign = \"center\";\n    ctx.fillText(\"The more towers you buy,\", 750, 400);\n  }\n\n  purchaseMechanics2(ctx) {\n    this.purchaseMechanics1(ctx)\n    ctx.fillText(\"the more expensive they get\", 750, 500);\n  }\n\n  purchaseHint(ctx) {\n    this.purchaseMechanics2(ctx);\n    ctx.fillText(\"Spend wisely and diversify your arsenal!\", 750, 600);\n  }\n\n  conclusion1(ctx) {\n    ctx.fillStyle = \"black\";\n    ctx.textAlign = \"center\";\n    ctx.fillText(\"Place towers strategically around the map!\", 750, 500);\n  }\n\n  conclusion2(ctx) {\n    this.conclusion1(ctx);\n    ctx.fillText(\"If the monolith runs out of health, you lose!\", 750, 600);\n  }\n\n  goodLuck(ctx) {\n    ctx.fillStyle = \"black\";\n    ctx.textAlign = \"center\";\n    ctx.fillText(\"GOOD LUCK!\", 750, 500);\n  }\n\n  arrow(ctx, x = 0, y = 0, theta = 0) {\n    ctx.save();\n\n    ctx.translate(x, y);\n    ctx.rotate(theta);\n\n    ctx.beginPath();\n    ctx.lineWidth = 10;\n    ctx.strokeStyle = \"black\";\n    ctx.moveTo(0, 0);\n    ctx.lineTo(-50, 30);\n    ctx.lineTo(-50, 10);\n    ctx.lineTo(-150, 10);\n    ctx.lineTo(-150, -10);\n    ctx.lineTo(-50, -10);\n    ctx.lineTo(-50, -30);\n    ctx.closePath();\n    ctx.stroke();\n    ctx.fillStyle = \"yellow\";\n    ctx.fill();\n\n    ctx.restore();\n  };\n}\n\nmodule.exports = HowToPlayAnimation;\n\n//# sourceURL=webpack:///./src/instructions/instructions_animation.js?");

/***/ }),

/***/ "./src/instructions/story.js":
/*!***********************************!*\
  !*** ./src/instructions/story.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const instructionsEle = document.getElementById(\"instructions-window\");\nconst xButton = document.getElementById(\"x-button\");\n\nconst showInstructionsWindow = () => {\n  instructionsEle.className = instructionsEle.className.replace(\"-hide\", \"-show\");\n};\n\nconst hideInstructionsWindow = () => {\n  instructionsEle.className = instructionsEle.className.replace(\"-show\", \"-hide\");\n};\n\nxButton.addEventListener(\"click\", hideInstructionsWindow);\n\nmodule.exports = { showStory: showInstructionsWindow };\n\n//# sourceURL=webpack:///./src/instructions/story.js?");

/***/ }),

/***/ "./src/monolith/monolith.js":
/*!**********************************!*\
  !*** ./src/monolith/monolith.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Monolith {\n  constructor() {\n    this.pos = Monolith.POS;\n    this.fullHealth = Monolith.HEALTH;\n    this.health = Monolith.HEALTH;\n  }\n\n  draw(ctx) {\n    const width = 50;\n    const height = 100;\n    const topLeftX = this.pos[0] - (0.5 * width);\n    const topLeftY = this.pos[1] - (0.5 * height);\n\n    ctx.fillStyle = \"#201e23\";\n    ctx.fillRect(topLeftX, topLeftY, width, height);\n\n    ctx.fillStyle = \"#3f3f3f\";\n    ctx.fillRect(0, 1150, 1500, 50);\n\n    ctx.beginPath();\n    ctx.rect(5, 1150, 1490, 45);\n    ctx.strokeStyle = \"black\";\n    ctx.lineWidth = 10;\n    ctx.stroke();\n\n\n    const x0Health = 10;\n    const y = 1172;\n    const x100Health = 1490;\n    const xNHealth = (x100Health - x0Health) * (this.health / this.fullHealth) + x0Health;\n\n    const healthPercentage = this.health / this.fullHealth * 100;\n    let healthColor;\n    switch (true) {\n      case healthPercentage >= 80:\n        healthColor = \"#00FF00\";\n        break;\n      case healthPercentage < 80 && healthPercentage >= 60:\n        healthColor = \"#96FF02\";\n        break;\n      case healthPercentage < 60 && healthPercentage >= 40:\n        healthColor = \"#FFFF00\";\n        break;\n      case healthPercentage < 40 && healthPercentage >= 20:\n        healthColor = \"#FF7F00\";\n        break;\n      case healthPercentage < 20 && healthPercentage > 0:\n        healthColor = \"#FF0000\";\n        break;\n      case healthPercentage < 0:\n        healthColor = \"transparent\";\n        break;\n    }\n\n    ctx.beginPath();\n    ctx.moveTo(x0Health, y);\n    ctx.lineTo(xNHealth, y);\n    ctx.lineWidth = 31;\n    ctx.strokeStyle = healthColor;\n    ctx.stroke();\n  }\n\n  takeDamage(damage) {\n    this.health -= damage;\n  }\n}\n\nMonolith.POS = [1200, 365];\nMonolith.HEALTH = 200;\n\nmodule.exports = Monolith;\n\n//# sourceURL=webpack:///./src/monolith/monolith.js?");

/***/ }),

/***/ "./src/moving_objects/artillery/artillery.js":
/*!***************************************************!*\
  !*** ./src/moving_objects/artillery/artillery.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ../moving_object */ \"./src/moving_objects/moving_object.js\");\n\nclass Artillery extends MovingObject {\n  constructor(options) {\n    super(options);\n    this.game = options.game;\n    this.tower = options.tower;\n    this.pos = options.tower.pos;\n    this.speed = options.speed;\n    this.target = options.target\n    this.calculateVelocity();\n  }\n\n  move(dt) {\n    if (this.isAtTargetLocation() || this.isOutOfBounds() || this.beyondTowerRange()) {\n      this.explode();\n    } else {\n      this.calculateVelocity();\n      super.move(dt)\n    }\n  }\n\n  explode() {\n    // not checking if the target has health before issuing a strike report leads to an interesting bug\n    // in the instance where a strike report was issued causing an NPC to be sent to the hospital,\n    // the game will remove the NPC as soon as the fatal damage is dealt.\n    // however, the water tower, since its fire rate is very quick, still has artillery in motion\n    // targeting the already removed target. in this case, if a strike report is issued on an already removed NPC,\n    // the game will remove the next NPC on the towers target list regardless of their health \n    // this.tower.strikeReport(this.target, this);\n    if (this.target.hasHealth()) this.tower.strikeReport(this.target, this);\n    this.remove();\n  }\n\n  calcTargetLocation() {\n    this.targetLocation = this.target.pos;\n  }\n\n  calculateVelocity() {\n    this.calcTargetLocation();\n    const dx = this.pos[0] - this.targetLocation[0];\n    const dy = this.pos[1] - this.targetLocation[1];\n    let theta = Math.atan(dy / dx);\n    if (dx > 0 && dy > 0) {\n      theta += Math.PI;\n    } else if (dx > 0 && dy < 0) {\n      theta -= Math.PI;\n    }\n    this.theta = theta;\n    this.vel = [this.speed * Math.cos(theta), this.speed * Math.sin(theta)];\n  }\n\n  isAtTargetLocation() {\n    if (!this.targetLocation) return null;\n    const dx = Math.floor(this.pos[0] - this.targetLocation[0]);\n    const dy = Math.floor(this.pos[1] - this.targetLocation[1]);\n    return dx >= -5 && dx <= 5 && dy >= -5 && dy <= 5;\n  }\n\n  beyondTowerRange() {\n    const dx = this.tower.pos[0] - this.pos[0];\n    const dy = this.tower.pos[1] - this.pos[1];\n    const d = Math.sqrt(dx**2 + dy**2);\n    return d > this.tower.range;\n  }\n}\n\nmodule.exports = Artillery;\n\n//# sourceURL=webpack:///./src/moving_objects/artillery/artillery.js?");

/***/ }),

/***/ "./src/moving_objects/artillery/boulder.js":
/*!*************************************************!*\
  !*** ./src/moving_objects/artillery/boulder.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Artillery = __webpack_require__(/*! ./artillery */ \"./src/moving_objects/artillery/artillery.js\");\n\nclass Boulder extends Artillery {\n  constructor(options) {\n    options.speed = Boulder.SPEED;\n    options.hitRadius = Boulder.HIT_RADIUS;\n    options.scale = Boulder.SCALE;\n    options.sprite = \"boulder\"\n    super(options);\n  }\n}\n\nBoulder.SPEED = 7;\nBoulder.HIT_RADIUS = 12;\nBoulder.SCALE = 1.25;\n\nmodule.exports = Boulder;\n\n//# sourceURL=webpack:///./src/moving_objects/artillery/boulder.js?");

/***/ }),

/***/ "./src/moving_objects/artillery/droplet.js":
/*!*************************************************!*\
  !*** ./src/moving_objects/artillery/droplet.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Artillery = __webpack_require__(/*! ./artillery */ \"./src/moving_objects/artillery/artillery.js\");\n\nclass Droplet extends Artillery {\n  constructor(options) {\n    options.speed = Droplet.SPEED;\n    options.scale = Droplet.SCALE;\n    options.hitRadius = Droplet.HIT_RADIUS;\n    options.sprite = \"droplet\";\n    super(options);\n  }\n}\n\nDroplet.SPEED = 10;\nDroplet.HIT_RADIUS = 4;\nDroplet.SCALE = 0.75;\n\nmodule.exports = Droplet;\n\n//# sourceURL=webpack:///./src/moving_objects/artillery/droplet.js?");

/***/ }),

/***/ "./src/moving_objects/artillery/flame.js":
/*!***********************************************!*\
  !*** ./src/moving_objects/artillery/flame.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Artillery = __webpack_require__(/*! ./artillery */ \"./src/moving_objects/artillery/artillery.js\");\n\nclass Flame extends Artillery {\n  constructor(options) {\n    options.speed = Flame.SPEED;\n    // does not need a hitRadius because AOE is determined by the range of the tower\n    options.sprite = \"flame\";\n    super(options);\n    this.vel = options.vel;\n  }\n\n  explode() {\n    this.tower.throttledStrikeReport();\n    this.remove();\n  }\n\n  calculateVelocity(theta) {\n    // \n  }\n\n  calcTargetLocation() {\n    // do nothing\n  }\n}\n\n\nFlame.SPEED = 10;\n\nmodule.exports = Flame;\n\n//# sourceURL=webpack:///./src/moving_objects/artillery/flame.js?");

/***/ }),

/***/ "./src/moving_objects/moving_object.js":
/*!*********************************************!*\
  !*** ./src/moving_objects/moving_object.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class MovingObject {\n  constructor(options = {}) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.hitRadius = options.hitRadius;\n    this.game = options.game;\n    this.scale = options.scale || 1;\n    this.sprite = document.getElementById(options.sprite);\n  }\n\n  draw(ctx) {\n    const x = this.pos[0];\n    const y = this.pos[1];\n    ctx.save();\n    ctx.translate(x, y);\n    ctx.rotate(this.theta + Math.PI * 0.5);\n    ctx.scale(this.scale, this.scale);\n    ctx.drawImage(this.sprite, -this.sprite.width * 0.5, -this.sprite.height * 0.5);\n    ctx.restore();\n  }\n\n  move(dt) {\n    const x = this.pos[0] + this.vel[0] * (dt / normalFrameRate);\n    const y = this.pos[1] + this.vel[1] * (dt / normalFrameRate);\n    this.pos = [ x, y ];\n  }\n\n  remove() {\n    this.game.remove(this);\n  }\n\n  isOutOfBounds() {\n    return this.pos[0] < 0 || this.pos[0] > 1500 || this.pos[1] < 0 || this.pos[1] > 1000;\n  }\n}\n\nconst normalFrameRate = 1000 / 60;\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_objects/moving_object.js?");

/***/ }),

/***/ "./src/moving_objects/npcs/Mammoth.js":
/*!********************************************!*\
  !*** ./src/moving_objects/npcs/Mammoth.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const NPC = __webpack_require__(/*! ./npc */ \"./src/moving_objects/npcs/npc.js\");\n\nclass Mammoth extends NPC {\n  constructor(options) {\n    options.speed = Mammoth.SPEED;\n    options.hitRadius = Mammoth.HIT_RADIUS;\n    options.health = Mammoth.HEALTH;\n    options.damage = Mammoth.DAMAGE;\n    options.flint = Mammoth.FLINT;\n    options.scale = Mammoth.SCALE;\n    options.sprite = \"mammoth\";\n    super(options);\n  }\n}\n\nMammoth.SPEED = 0.8;\nMammoth.HIT_RADIUS = 50;\nMammoth.HEALTH = 35;\nMammoth.DAMAGE = 20;\nMammoth.FLINT = 30;\nMammoth.SCALE = 2;\n\nmodule.exports = Mammoth;\n\n//# sourceURL=webpack:///./src/moving_objects/npcs/Mammoth.js?");

/***/ }),

/***/ "./src/moving_objects/npcs/caveman.js":
/*!********************************************!*\
  !*** ./src/moving_objects/npcs/caveman.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const NPC = __webpack_require__(/*! ./npc */ \"./src/moving_objects/npcs/npc.js\");\n\nclass Caveman extends NPC {\n  constructor(options) {\n    options.speed = Caveman.SPEED;\n    options.hitRadius = Caveman.HIT_RADIUS;\n    options.health = Caveman.HEALTH;\n    options.damage = Caveman.DAMAGE;\n    options.flint = Caveman.FLINT;\n    options.scale = Caveman.SCALE;\n    options.sprite = \"caveman\";\n    super(options);\n  }\n}\n\nCaveman.SPEED = 1.25;\nCaveman.HIT_RADIUS = 25;\nCaveman.HEALTH = 5;\nCaveman.DAMAGE = 5;\nCaveman.FLINT = 15;\nCaveman.SCALE = 1.5;\n\nmodule.exports = Caveman;\n\n//# sourceURL=webpack:///./src/moving_objects/npcs/caveman.js?");

/***/ }),

/***/ "./src/moving_objects/npcs/eagle.js":
/*!******************************************!*\
  !*** ./src/moving_objects/npcs/eagle.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const NPC = __webpack_require__(/*! ./npc */ \"./src/moving_objects/npcs/npc.js\");\n\nclass Eagle extends NPC {\n  constructor(options) {\n    options.speed = Eagle.SPEED;\n    options.hitRadius = Eagle.HIT_RADIUS;\n    options.health = Eagle.HEALTH;\n    options.damage = Eagle.DAMAGE;\n    options.flint = Eagle.FLINT;\n    options.scale = Eagle.SCALE;\n    options.sprite = \"eagle\";\n    super(options);\n  }\n}\n\nEagle.SPEED = 2.5;\nEagle.HIT_RADIUS = 25;\nEagle.HEALTH = 4;\nEagle.DAMAGE = 10;\nEagle.FLINT = 10;\nEagle.SCALE = 2;\n\nmodule.exports = Eagle;\n\n//# sourceURL=webpack:///./src/moving_objects/npcs/eagle.js?");

/***/ }),

/***/ "./src/moving_objects/npcs/npc.js":
/*!****************************************!*\
  !*** ./src/moving_objects/npcs/npc.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ../moving_object */ \"./src/moving_objects/moving_object.js\");\nconst Path = __webpack_require__(/*! ../../pathing/path */ \"./src/pathing/path.js\");\nconst Util = __webpack_require__(/*! ../../util/util */ \"./src/util/util.js\");\n\nclass NPC extends MovingObject {\n  constructor(options) {\n    super(options);\n    this.id = options.id;\n    this.fullHealth = options.health;\n    this.health = options.health;\n    this.damage = options.damage;\n    this.flint = options.flint;\n    this.speed = options.speed;\n    this.path = new Path(options.path);\n    this.pos = this.path.dequeue();\n    this.dest = this.path.dequeue();\n    this.throttledDealDamage = Util.throttle(this.dealDamage.bind(this), 1000);\n    this.followPath();\n  }\n  \n  draw(ctx) {\n    super.draw(ctx);\n    const x0Health = this.pos[0] - this.sprite.width * 0.5;\n    const y = this.pos[1] - this.sprite.height * 0.5;\n    const x100Health = this.pos[0] + this.sprite.width * 0.5;\n    const xNHealth = (x100Health - x0Health) * (this.health / this.fullHealth) + x0Health;\n\n    const healthPercentage = this.health / this.fullHealth * 100;\n    let healthColor;\n    switch (true) {\n      case healthPercentage >= 80:\n        healthColor = \"#00FF00\";\n        break;\n      case healthPercentage < 80 && healthPercentage >= 60:\n        healthColor = \"#96FF02\";\n        break;\n      case healthPercentage < 60 && healthPercentage >= 40:\n        healthColor = \"#FFFF00\";\n        break;\n      case healthPercentage < 40 && healthPercentage >= 20:\n        healthColor = \"#FF7F00\";\n        break;\n      case healthPercentage < 20:\n        healthColor = \"#FF0000\";\n        break;\n    }\n\n    ctx.beginPath();\n    ctx.moveTo(x0Health, y);\n    ctx.lineTo(x100Health, y);\n    ctx.lineWidth = 3;\n    ctx.strokeStyle = \"black\";\n    ctx.stroke();\n\n    ctx.beginPath();\n    ctx.moveTo(x0Health, y);\n    ctx.lineTo(xNHealth, y);\n    ctx.lineWidth = 3;\n    ctx.strokeStyle = healthColor;\n    ctx.stroke();\n  }\n\n  move(dt) {\n    if (this.dest) {\n      if (this.isAtDest()) this.updateDest();\n    } else {\n      this.throttledDealDamage(this.damage);\n    }\n    super.move(dt)\n  }\n  \n  followPath() {\n    const dx = this.pos[0] - this.dest[0];\n    const dy = this.pos[1] - this.dest[1];\n    let theta = Math.atan( dy / dx );\n    if (dx > 0 && dy > 0) {\n      theta += Math.PI;\n    } else if (dx > 0 && dy < 0) {\n      theta -= Math.PI;\n    }\n    this.theta = theta;\n    this.vel = [ this.speed * Math.cos(theta), this.speed * Math.sin(theta)];\n  }\n  \n  isAtDest() {\n    const dx = this.pos[0] - this.dest[0];\n    const dy = this.pos[1] - this.dest[1];\n    return (dx > -2 && dx < 2) && (dy > -2 && dy < 2);\n  }\n\n  updateDest() {\n    if (this.path.pointCount()) {\n      this.dest = this.path.dequeue();\n      this.followPath();\n    } else {\n      this.dest = null;\n      this.vel = [0, 0];\n    }\n  }\n  \n  takeDamage(artilleryDamage) {\n    this.health -= artilleryDamage;\n    if (!this.hasHealth()) this.sendToHospital();\n  }\n\n  dealDamage() {\n    this.game.damageMonolith(this.damage);\n  }\n  \n  hasHealth() {\n    return this.health > 0;\n  }\n  \n  sendToHospital() {\n    this.remove();\n  }\n}\n\nmodule.exports = NPC;\n\n//# sourceURL=webpack:///./src/moving_objects/npcs/npc.js?");

/***/ }),

/***/ "./src/moving_objects/npcs/spider.js":
/*!*******************************************!*\
  !*** ./src/moving_objects/npcs/spider.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const NPC = __webpack_require__(/*! ./npc */ \"./src/moving_objects/npcs/npc.js\");\n\nclass Spider extends NPC {\n  constructor(options) {\n    options.speed = Spider.SPEED;\n    options.hitRadius = Spider.HIT_RADIUS;\n    options.health = Spider.HEALTH;\n    options.damage = Spider.DAMAGE;\n    options.flint = Spider.FLINT;\n    options.scale = Spider.SCALE;\n    options.sprite = \"spider\";\n    super(options);\n  }\n}\n\nSpider.SPEED = 4;\nSpider.HIT_RADIUS = 20;\nSpider.HEALTH = 2;\nSpider.DAMAGE = 5;\nSpider.FLINT = 5;\nSpider.SCALE = 1;\n\nmodule.exports = Spider;\n\n//# sourceURL=webpack:///./src/moving_objects/npcs/spider.js?");

/***/ }),

/***/ "./src/pathing/path.js":
/*!*****************************!*\
  !*** ./src/pathing/path.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Queue = __webpack_require__(/*! ../util/queue */ \"./src/util/queue.js\");\n\nclass Path {\n  constructor(number) {\n    this.points = new Queue();\n    this[`path${number}`]();\n    this.generateEnpoint();\n  }\n\n  enqueue(point) {\n    return this.points.enqueue(point);\n  }\n\n  dequeue() {\n    return this.points.dequeue();\n  }\n\n  pointCount() {\n    return this.points.length();\n  }\n\n  path1() {\n    // randomly determine which coordinate of the staring position is negative\n    // this is necessary because the path starts in a corner\n    if (Math.random() < 0.5) {\n      this.enqueue( [ -50, this.generateInteger(215) ] );\n    } else {\n      this.enqueue( [ this.generateInteger(90), 100 ] );\n    }\n    this.enqueue( [ this.generateInteger(190, 180), this.generateInteger(250, 200) ] );\n    this.enqueue( [ 675, 290 ] );\n    this.enqueue( [ 1090, 370 ] );\n  }\n  \n  path2() {\n    this.enqueue( [ -50, this.generateInteger(1065, 950) ] );\n    this.enqueue( [ this.generateInteger(290, 260), this.generateInteger(850, 825) ] );\n    this.enqueue( [ 750, 390 ] );\n    this.enqueue( [ 1090, 370 ] );\n  }\n  \n  path3() {\n    this.enqueue( [ this.generateInteger(590, 490), 1200 ] );\n    this.enqueue( [ 750, 775 ] );\n    this.enqueue( [ 820, 610 ] );\n    this.enqueue( [ 900, 550 ] );\n    this.enqueue( [ 930, 400 ] );\n    this.enqueue( [ 1090, 370 ] );\n  }\n  \n  path4() {\n    this.enqueue( [ this.generateInteger(1315, 1250), 1200 ] );\n    this.enqueue( [ 1030, 805 ] );\n    this.enqueue( [ 900, 550 ] );\n    this.enqueue( [ 930, 400 ] );\n    this.enqueue( [ 1090, 370 ] );\n  }\n\n  generateEnpoint() {\n    const endpointNumber = this.generateInteger(4);\n\n    let endpoint;\n    switch (endpointNumber) {\n      case 0:\n        endpoint = [ [1160, this.generateInteger(415, 315)] ];\n        break;\n      case 1:\n        endpoint = [ [1155, 285], [1265, 285], [1240, this.generateInteger(415, 315)] ];\n        break;\n      case 2:\n        endpoint = [ [1155, 285], [this.generateInteger(1225, 1175), 300] ];\n        break;\n      case 3:\n        endpoint = [ [1155, 455], [1255, 455], [1240, this.generateInteger(415, 315)] ];\n        break;\n      case 4:\n        endpoint = [ [1155, 455], [this.generateInteger(1225, 1175), 400] ];\n        break;\n    }\n    endpoint.forEach(ep => this.enqueue(ep));\n  }\n\n  generateInteger(max, min = 0) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n  }\n}\n\nmodule.exports = Path;\n\n//# sourceURL=webpack:///./src/pathing/path.js?");

/***/ }),

/***/ "./src/towers/earth_tower.js":
/*!***********************************!*\
  !*** ./src/towers/earth_tower.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tower = __webpack_require__(/*! ./tower */ \"./src/towers/tower.js\");\nconst Boulder = __webpack_require__(/*! ../moving_objects/artillery/boulder */ \"./src/moving_objects/artillery/boulder.js\");\n\nclass EarthTower extends Tower {\n  constructor(options) {\n    options.type = EarthTower.TYPE;\n    options.range = EarthTower.RANGE;\n    options.damage = EarthTower.DAMAGE;\n    options.reload = EarthTower.RELOAD;\n    options.flint = EarthTower.FLINT;\n    options.sprite = EarthTower.SPRITE;\n    options.artillery = Boulder;\n    super(options);\n    EarthTower.FLINT += 20;\n  }\n\n  strikeReport(target, artillery) {\n    this.allTargets().forEach(target => {\n      if (this.inAOE(target, artillery)) {\n        target.takeDamage(this.damage);\n      }\n    });\n  }\n\n  inAOE(target, artillery) {\n    const minDist = target.hitRadius + artillery.hitRadius;\n    const dx = target.pos[0] - artillery.pos[0];\n    const dy = target.pos[1] - artillery.pos[1];\n    const actualDist = Math.sqrt(dx**2 + dy**2);\n    return actualDist < minDist;\n  }\n}\n\nEarthTower.TYPE = \"earth\";\nEarthTower.RANGE = 225;\nEarthTower.DAMAGE = 1;\nEarthTower.RELOAD = 750;\nEarthTower.FLINT = 100;\nEarthTower.SPRITE = document.getElementById(\"earth-tower\");\n\nmodule.exports = EarthTower;\n\n//# sourceURL=webpack:///./src/towers/earth_tower.js?");

/***/ }),

/***/ "./src/towers/fire_tower.js":
/*!**********************************!*\
  !*** ./src/towers/fire_tower.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tower = __webpack_require__(/*! ./tower */ \"./src/towers/tower.js\");\nconst Flame = __webpack_require__(/*! ../moving_objects/artillery/flame */ \"./src/moving_objects/artillery/flame.js\");\nconst Util = __webpack_require__(/*! ../util/util */ \"./src/util/util.js\");\n\nclass FireTower extends Tower {\n  constructor(options) {\n    options.type = FireTower.TYPE;\n    options.range = FireTower.RANGE;\n    options.damage = FireTower.DAMAGE;\n    options.reload = FireTower.RELOAD;\n    options.flint = FireTower.FLINT;\n    options.sprite = FireTower.SPRITE;\n    options.artillery = Flame;\n    super(options);\n    this.throttledStrikeReport = Util.throttle(this.strikeReport.bind(this), 100);\n    FireTower.FLINT += 20;\n  }\n\n  fire() {\n    this.createFlames();\n  }\n\n  createFlames() {\n    const amtFlames = 40;\n    for (let n = 0; n < amtFlames; n++) {\n      const theta = 2 * Math.PI * (n / amtFlames);\n      const vel = [Flame.SPEED * Math.cos(theta), Flame.SPEED * Math.sin(theta)];\n      const artillery = new this.artillery({ vel, tower: this, game: this.game });\n      this.game.add(artillery);\n    }\n  }\n\n  strikeReport() {\n    this.allTargets().forEach(target => {\n      target.takeDamage(this.damage);\n    });\n  }\n}\n\nFireTower.TYPE = \"fire\";\nFireTower.RANGE = 175;\nFireTower.DAMAGE = 6;\nFireTower.RELOAD = 4000;\nFireTower.FLINT = 100;\nFireTower.SPRITE = document.getElementById(\"fire-tower\");\n\nmodule.exports = FireTower;\n\n//# sourceURL=webpack:///./src/towers/fire_tower.js?");

/***/ }),

/***/ "./src/towers/targeting_queue.js":
/*!***************************************!*\
  !*** ./src/towers/targeting_queue.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class TargetingQueue {\n  constructor() {\n    this.targets = [];\n  }\n\n  empty() {\n    return !this.targets.length;\n  }\n\n  includes(target) {\n    return this.targets.includes(target);\n  }\n\n  addTarget(target) {\n    this.targets.push(target);\n    return target\n  }\n\n  removeTarget(target) {\n    this.targets = this.targets.filter(ele => ele != target);\n    return target;\n  }\n\n  primaryTarget() {\n    return this.targets[0] || null;\n  }\n\n  allTargets() {\n    return this.targets;\n  }\n\n  reorder(order) {\n\n  }\n}\n\nmodule.exports = TargetingQueue;\n\n//# sourceURL=webpack:///./src/towers/targeting_queue.js?");

/***/ }),

/***/ "./src/towers/tower.js":
/*!*****************************!*\
  !*** ./src/towers/tower.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const TargetingQueue = __webpack_require__(/*! ./targeting_queue */ \"./src/towers/targeting_queue.js\");\nconst Util = __webpack_require__(/*! ../util/util */ \"./src/util/util.js\");\n\nclass Tower {\n  constructor(options) {\n    this.game = options.game;\n    this.sprite = options.sprite;\n    this.scale = Tower.SCALE;\n    this.pos = options.pos;\n    this.range = options.range;\n    this.damage = options.damage;\n    this.reload = options.reload;\n    this.flint = options.flint;\n    this.artillery = options.artillery;\n    this.targets = new TargetingQueue();\n    this.throttledFire = Util.throttle(this.fire.bind(this), this.reload);\n  } \n\n  draw(ctx) {\n    // const x = this.pos[0];\n    // const y = this.pos[1];\n    // ctx.save();\n    // ctx.translate(x, y);\n    // ctx.scale(this.scale, this.scale);\n    // ctx.drawImage(this.sprite, - this.sprite.width * 0.5, - this.sprite.height * 0.5 );\n    // ctx.restore();\n  }\n\n  allTargets() {\n    return this.targets.allTargets();\n  }\n\n  calcTargets(npcs) {\n    npcs.forEach(npc => {\n      const inRange = this.inRange(npc);\n      const inQueue = this.targets.includes(npc);\n      if (inRange && !inQueue) {\n        this.addTarget(npc);\n      } else if (!inRange && inQueue) {\n        this.removeTarget(npc);\n      }\n    });\n\n    this.targets.targets.forEach(target => {\n      const inGame = npcs.includes(target);\n      if (!inGame) this.removeTarget(target);\n    });\n  }\n\n  inRange(npc) {\n    const dx = npc.pos[0] - this.pos[0];\n    const dy = npc.pos[1] - this.pos[1];\n    const d = Math.sqrt(dx**2 + dy**2);\n    return d <= this.range;\n  }\n\n  addTarget(target) {\n    this.targets.addTarget(target);\n  }\n\n  removeTarget(target) {\n    this.targets.removeTarget(target);\n  }\n\n  noTargets() {\n    return this.targets.empty();\n  }\n\n  primaryTarget() {\n    return this.targets.primaryTarget();\n  }\n\n  fire() {\n    const target = this.primaryTarget();\n    if (target) {\n      const artillery = new this.artillery({ target, tower: this, game: this.game });\n      this.game.add(artillery);\n    }\n  }\n\n  strikeReport() {\n    // do nothing\n  }\n}\n\nTower.SCALE = 0.75;\n\nmodule.exports = Tower;\n\n//# sourceURL=webpack:///./src/towers/tower.js?");

/***/ }),

/***/ "./src/towers/water_tower.js":
/*!***********************************!*\
  !*** ./src/towers/water_tower.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tower = __webpack_require__(/*! ./tower */ \"./src/towers/tower.js\");\nconst Droplet = __webpack_require__(/*! ../moving_objects/artillery/droplet */ \"./src/moving_objects/artillery/droplet.js\");\n\nclass WaterTower extends Tower {\n  constructor(options) {\n    options.type = WaterTower.TYPE;\n    options.range = WaterTower.RANGE;\n    options.damage = WaterTower.DAMAGE;\n    options.reload = WaterTower.RELOAD;\n    options.flint = WaterTower.FLINT;\n    options.sprite = WaterTower.SPRITE;\n    options.artillery = Droplet;\n    super(options);\n    WaterTower.FLINT += 20;\n  }\n\n  strikeReport(target, artillery) {\n    target.takeDamage(this.damage);\n  }\n}\n\nWaterTower.TYPE = \"water\";\nWaterTower.RANGE = 350;\nWaterTower.DAMAGE = 0.2;\nWaterTower.RELOAD = 100;\nWaterTower.FLINT = 100;\nWaterTower.SPRITE = document.getElementById(\"water-tower\");\n\nmodule.exports = WaterTower;\n\n//# sourceURL=webpack:///./src/towers/water_tower.js?");

/***/ }),

/***/ "./src/ui/canvas_ui.js":
/*!*****************************!*\
  !*** ./src/ui/canvas_ui.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tower = __webpack_require__(/*! ../towers/tower */ \"./src/towers/tower.js\");\nconst UIElements = __webpack_require__(/*! ./ui_elements */ \"./src/ui/ui_elements.js\");\nconst Story = __webpack_require__(/*! ../instructions/story */ \"./src/instructions/story.js\");\nconst gameContainer = document.getElementById(\"monolith-game\");\n\nclass UI {\n  constructor(ctx, game, htp) {\n    this.ctx = ctx;\n    this.game = game;\n    this.htp = htp;\n    this.scale = 1;\n    this.selectedTowerType = null;\n    this.message = \"\";\n    this.cursorPos = [0, 0];\n    this.hoveredEle = null;\n    this.activeEle = null;\n    this.towerId = 0;\n\n    this.setScale = this.setScale.bind(this);\n    this.handleClick = this.handleClick.bind(this);\n    this.getCursorPosition = this.getCursorPosition.bind(this);\n    this.checkHover = this.checkHover.bind(this);\n    this.placeTower = this.placeTower.bind(this);\n    // gameContainer.addEventListener(\"click\", this.handleClick);\n    // gameContainer.addEventListener(\"mousemove\", this.getCursorPosition);\n    document.documentElement.addEventListener(\"click\", this.handleClick);\n    document.documentElement.addEventListener(\"mousemove\", this.getCursorPosition);\n    this.draw()\n  }\n\n  draw(ctx = this.ctx) {\n    ctx.clearRect(0, 0, 1850, 1200);\n    this.findHoveredElement();\n    this.drawUIElements(ctx);\n  }\n\n  findHoveredElement(eles = UIElements) {\n    Object.values(eles).forEach(ele => {\n      if (ele.tag === \"button\" && this.checkHover(ele)) {\n        this.hoveredEle = ele;\n      }\n      \n      if (ele.innerObjs) this.findHoveredElement(ele.innerObjs);\n    });\n  }\n\n  drawUIElements(ctx, eles = UIElements) {\n    Object.values(eles).forEach(ele => {\n      switch (ele.type) {\n        case \"image\":\n          this.drawImage(ctx, ele);\n          break;\n        case \"rect\":\n          this.drawRect(ctx, ele);\n          break;\n        case \"roundRect\":\n          this.drawRoundRect(ctx, ele);\n          break;\n        case \"circle\":\n          this.drawCircle(ctx, ele);\n          break;\n        case \"text\":\n          this.drawText(ctx, ele);\n          break;\n        default:\n          break;\n      }\n      if (ele.innerObjs) {\n        this.drawUIElements(ctx, ele.innerObjs);\n      }\n    });\n\n    if (this.selectedTowerType) {\n      this.followCursor(ctx);\n    }\n  }\n\n  setScale(scale) {\n    this.scale = scale;\n  }\n\n  handleClick(event) {\n    if (this.activeEle) {\n      this.hideTowerOptions();\n    }\n    if (this.hoveredEle) {\n      switch (this.hoveredEle.a) {\n        case \"placeTower\":\n          this.selectTower();\n          break;\n        case \"showTowerOptions\":\n          this.showTowerOptions();\n          break;\n        case \"sendWave\":\n          this.sendWave();\n          break;\n        case \"showStory\":\n          Story.showStory();\n          break;\n        case \"htp\":\n          this.htp.nextPage(\"click\");\n          break;\n        default:\n          break;\n      }\n    } else if (this.selectedTowerType) {\n      this.isInBounds() ? this.placeTower() : this.cancelTower()\n    }\n    this.draw();\n  }\n\n  getCursorPosition(event) {\n    this.hoveredEle = null;\n    const rect = gameContainer.getBoundingClientRect();\n    const x = (event.clientX - rect.left) / this.scale;\n    const y = (event.clientY - rect.top) / this.scale;\n    \n    this.cursorPos = [x, y];\n    this.draw();\n    if (this.hoveredEle) {\n      gameContainer.style.cursor = \"pointer\";\n    } else {\n      gameContainer.style.cursor = \"default\";\n    }\n  }\n\n  selectTower() {\n    const { tower } = this.hoveredEle;\n    if (this.game.flint >= tower.FLINT) {\n      this.selectedTowerType = tower;\n    } else {\n      this.message = \"You do not have enough flint!\";\n      setTimeout(() => {\n        this.message = \"\";\n      }, 4000);\n    }\n  }\n\n  cancelTower() {\n    this.selectedTowerType = null;\n  }\n\n  followCursor(ctx) {\n    const towerRange = {\n      x: this.cursorPos[0],\n      y: this.cursorPos[1],\n      r: this.selectedTowerType.RANGE,\n      f: \"rgba(0,0,0,0.1)\"\n\n    };\n    const towerImg = {\n      image: this.selectedTowerType.SPRITE,\n      x: this.cursorPos[0],\n      y: this.cursorPos[1],\n      dx: -this.selectedTowerType.SPRITE.width * 0.5,\n      dy: -this.selectedTowerType.SPRITE.height * 0.5,\n      s: Tower.SCALE\n    }\n    this.drawCircle(ctx, towerRange);\n    this.drawImage(ctx, towerImg);\n  }\n\n  placeTower() {\n    const pos = [this.cursorPos[0], this.cursorPos[1]];\n    const options = { pos, game: this.game };\n    const tower = new this.selectedTowerType(options);\n    this.game.add(tower);\n    this.addTowerEle(tower);\n    this.cancelTower();\n  }\n\n  addTowerEle(tower) {\n    const uiTowerRange = {};\n    uiTowerRange.type = \"circle\";\n    uiTowerRange.x = tower.pos[0];\n    uiTowerRange.y = tower.pos[1];\n    uiTowerRange.r = tower.range;\n    uiTowerRange.f = \"transparent\";\n    const uiTower = {};\n    uiTower.type = \"image\";\n    uiTower.tag = \"button\";\n    uiTower.a = \"showTowerOptions\";\n    uiTower.id = this.towerId;\n    uiTower.image = tower.sprite;\n    uiTower.x = tower.pos[0] - tower.sprite.width * 0.5 * tower.scale;\n    uiTower.y = tower.pos[1] - tower.sprite.height * 0.5 * tower.scale;\n    uiTower.dx = 0;\n    uiTower.dy = 0;\n    uiTower.s = tower.scale;\n    uiTower.w = tower.sprite.width * tower.scale;\n    uiTower.h = tower.sprite.height * tower.scale;\n    uiTowerRange.innerObjs = { uiTower };\n    UIElements[this.towerId] = uiTowerRange;\n    this.towerId++;\n  }\n\n  showTowerOptions() {\n    this.activeEle = UIElements[this.hoveredEle.id];\n    this.activeEle.f = \"rgb(0,0,0,0.75)\";\n  }\n  \n  hideTowerOptions() {\n    this.activeEle.f = \"transparent\";\n    this.activeEle = null;\n  }\n\n  isInBounds() {\n    return this.cursorPos[0] >= 0 \n    && this.cursorPos[0] <= 1500\n    && this.cursorPos[1] >= 150\n    && this.cursorPos[1] <= 1150\n  }\n\n  checkHover(ele) {\n    return this.cursorPos[0] >= ele.x\n      && this.cursorPos[0] <= ele.x + ele.w\n      && this.cursorPos[1] >= ele.y\n      && this.cursorPos[1] <= ele.y + ele.h;\n  }\n\n  sendWave() {\n    this.game.sendWave();\n  }\n\n  drawImage(ctx, ele) {\n    ctx.translate(ele.x, ele.y);\n    if (ele.s) {\n      ctx.scale(ele.s, ele.s);\n      ctx.drawImage(ele.image, ele.dx, ele.dy);\n      ctx.scale(1 / ele.s, 1 / ele.s);\n    } else {\n      ctx.drawImage(ele.image, ele.dx, ele.dy);\n    }\n    ctx.translate(-ele.x, -ele.y);\n  }\n\n  drawRect(ctx, ele) {\n    if (ele.f) {\n      ctx.fillStyle = ele.f;\n      ctx.fillRect(ele.x, ele.y, ele.w, ele.h);\n    } else {\n      ctx.beginPath();\n      ctx.lineWidth = ele.lw;\n      ctx.strokeStyle = ele.s;\n      ctx.rect(ele.x, ele.y, ele.w, ele.h);\n      ctx.closePath();\n      ctx.stroke();\n    }\n  }\n  \n  drawRoundRect(ctx, ele) {\n    const {x, y, w, h, f, hF, s, lw} = ele;\n    const radiusOptions = ele.r;\n    let tlr, trr, brr, blr;\n    if (typeof radiusOptions === \"number\") {\n      tlr = trr = brr = blr = radiusOptions;\n    } else {\n      tlr = radiusOptions.tlr;\n      trr = radiusOptions.trr || tlr;\n      brr = radiusOptions.brr || tlr;\n      blr = radiusOptions.blr || tlr;\n    }\n\n    const r = x + w;\n    const b = y + h;\n    ctx.beginPath();\n    ctx.moveTo(x + tlr, y);\n    ctx.lineTo(r - trr, y);\n    ctx.quadraticCurveTo(r, y, r, y + trr);\n    ctx.lineTo(r, y + h - brr);\n    ctx.quadraticCurveTo(r, b, r - brr, b);\n    ctx.lineTo(x + blr, b);\n    ctx.quadraticCurveTo(x, b, x, b - blr);\n    ctx.lineTo(x, y + tlr);\n    ctx.quadraticCurveTo(x, y, x + tlr, y);\n    ctx.closePath();\n\n    if (f) {\n      if (ele === this.hoveredEle) {\n        ctx.fillStyle = hF;\n      } else {\n        ctx.fillStyle = f;\n      }\n      ctx.fill();\n    }\n\n    if (s) {\n      ctx.lineWidth = lw;\n      ctx.strokeStyle = s;\n      ctx.stroke();\n    }\n  }\n\n  drawText(ctx, ele) {\n    ctx.textAlign = \"center\";\n    ctx.textBaseline = \"middle\";\n\n    if (typeof ele.f === \"function\") {\n      ctx.fillStyle = ele.f(this.game);\n    } else {\n      ctx.fillStyle = ele.f;\n    }\n\n    ctx.font = ele.font;\n    if (typeof ele.text === \"function\") {\n      ctx.fillText(ele.text(this.game), ele.x, ele.y)\n    } else {\n      ctx.fillText(ele.text, ele.x, ele.y)\n    }\n  }\n\n  drawCircle(ctx, ele) {\n    ctx.beginPath();\n    ctx.arc(ele.x, ele.y, ele.r, 0, Math.PI * 2);\n    if (ele.s) {\n      ctx.strokeStyle = ele.s;\n      ctx.lineWidth = ele.lw;\n      ctx.stroke();\n    }\n    ctx.closePath();\n    if (ele.f) {\n      ctx.fillStyle = ele.f;\n      ctx.fill();\n    }\n  }\n}\n\nmodule.exports = UI;\n\n//# sourceURL=webpack:///./src/ui/canvas_ui.js?");

/***/ }),

/***/ "./src/ui/ui_elements.js":
/*!*******************************!*\
  !*** ./src/ui/ui_elements.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const EarthTower = __webpack_require__(/*! ../towers/earth_tower */ \"./src/towers/earth_tower.js\");\nconst WaterTower = __webpack_require__(/*! ../towers/water_tower */ \"./src/towers/water_tower.js\");\nconst FireTower = __webpack_require__(/*! ../towers/fire_tower */ \"./src/towers/fire_tower.js\");\n\nconst flintImgEle = document.getElementById(\"flint\");\n\nconst flintFontColor = tower => game => {\n  return game.flint < tower.FLINT ? \"red\" : \"white\";\n};\n\nconst uiElements = {\n  background: {\n    type: \"rect\",\n    x: 1500,\n    y: 150,\n    w: 350,\n    h: 1065,\n    f: \"gray\",\n    innerObjs: {\n      backgroundBorder: {\n        type: \"rect\",\n        x: 1507.5,\n        y: 157.5,\n        w: 335,\n        h: 1035,\n        s: \"black\",\n        lw: 15\n      },\n    }\n  },\n  earthTowerButton: {\n    type: \"roundRect\",\n    tag: \"button\",\n    a: \"placeTower\",\n    tower: EarthTower,\n    disabled: false,\n    x: 1580,\n    y: 275,\n    w: 190,\n    h: 205,\n    r: 20,\n    lw: 5,\n    s: \"black\",\n    f: \"rgb(53, 128, 0)\",\n    hF: \"rgb(86, 154, 37)\",\n    innerObjs: {\n      earthTowerImg: {\n        type: \"image\",\n        image: EarthTower.SPRITE,\n        x: 1675,\n        y: 357.5,\n        dx: -EarthTower.SPRITE.width * 0.5,\n        dy: -EarthTower.SPRITE.height * 0.5,\n      },\n      earthTowerFlintContainer: {\n        type: \"roundRect\",\n        x: 1580,\n        y: 440,\n        w: 190,\n        h: 40,\n        r: {\n          tlr: 0,\n          trr: 0,\n          brr: 20,\n          blr: 20\n        },\n        f: \"rgb(0,0,0,0.3)\",\n        lw: 5,\n        s: \"black\",\n        innerObjs: {\n          flintImg: {\n            type: \"image\",\n            image: flintImgEle,\n            x: 1640,\n            y: 460,\n            dx: -flintImgEle.width * 0.5,\n            dy: -flintImgEle.height * 0.5,\n            s: 1.5\n          },\n          towerPrice: {\n            type: \"text\",\n            text: () => `${EarthTower.FLINT}`,\n            font: \"24px Arial\",\n            f: flintFontColor(EarthTower),\n            x: 1675,\n            y: 460\n          }\n        }\n      },\n    }\n  },\n  waterTowerButton: {\n    type: \"roundRect\",\n    tag: \"button\",\n    a: \"placeTower\",\n    tower: WaterTower,\n    disabled: false,\n    x: 1580,\n    y: 500,\n    w: 190,\n    h: 205,\n    r: 20,\n    lw: 5,\n    s: \"black\",\n    f: \"rgb(0, 65, 145)\",\n    hF: \"rgb(38, 103, 183)\",\n    innerObjs: {\n      waterTowerImg: {\n        type: \"image\",\n        image: WaterTower.SPRITE,\n        x: 1675,\n        y: 582.5,\n        dx: -WaterTower.SPRITE.width * 0.5,\n        dy: -WaterTower.SPRITE.height * 0.5,\n      },\n      waterTowerFlintContainer: {\n        type: \"roundRect\",\n        x: 1580,\n        y: 665,\n        w: 190,\n        h: 40,\n        r: {\n          tlr: 0,\n          trr: 0,\n          brr: 20,\n          blr: 20\n        },\n        f: \"rgb(0,0,0,0.3)\",\n        lw: 5,\n        s: \"black\",\n        innerObjs: {\n          flintImg: {\n            type: \"image\",\n            image: flintImgEle,\n            x: 1640,\n            y: 685,\n            dx: -flintImgEle.width * 0.5,\n            dy: -flintImgEle.height * 0.5,\n            s: 1.5\n          },\n          towerPrice: {\n            type: \"text\",\n            text: () => `${WaterTower.FLINT}`,\n            font: \"24px Arial\",\n            f: flintFontColor(WaterTower),\n            x: 1675,\n            y: 685\n          }\n        }\n      }\n    }\n  },\n  fireTowerButton: {\n    type: \"roundRect\",\n    tag: \"button\",\n    a: \"placeTower\",\n    tower: FireTower,\n    disabled: false,\n    x: 1580,\n    y: 725,\n    w: 190,\n    h: 205,\n    r: 20,\n    lw: 5,\n    s: \"black\",\n    f: \"rgb(125, 0, 0)\",\n    hF: \"rgb(201, 41, 41)\",\n    innerObjs: {\n      fireTowerImg: {\n        type: \"image\",\n        image: FireTower.SPRITE,\n        x: 1675,\n        y: 807.5,\n        dx: -FireTower.SPRITE.width * 0.5,\n        dy: -FireTower.SPRITE.height * 0.5,\n      },\n      fireTowerFlintContainer: {\n        type: \"roundRect\",\n        x: 1580,\n        y: 890,\n        w: 190,\n        h: 40,\n        r: {\n          tlr: 0,\n          trr: 0,\n          brr: 20,\n          blr: 20\n        },\n        f: \"rgb(0,0,0,0.3)\",\n        lw: 5,\n        s: \"black\",\n        innerObjs: {\n          flintImg: {\n            type: \"image\",\n            image: flintImgEle,\n            x: 1640,\n            y: 910,\n            dx: -flintImgEle.width * 0.5,\n            dy: -flintImgEle.height * 0.5,\n            s: 1.5\n          },\n          towerPrice: {\n            type: \"text\",\n            text: () => `${FireTower.FLINT}`,\n            font: \"24px Arial\",\n            f: flintFontColor(FireTower),\n            x: 1675,\n            y: 910\n          }\n        }\n      },\n    }\n  },\n  waveCounter: {\n    type: \"text\",\n    text: game => `Wave ${game.wave}`,\n    font: \"36px Arial\",\n    f: \"white\",\n    x: 1675,\n    y: 225\n  },\n  flintBank: {\n    type: \"text\",\n    text: game => `${game.flint}`,\n    font: \"24px Arial\",\n    f: \"white\",\n    x: 1680,\n    y: 975,\n    innerObjs: {\n      flintImg: {\n        type: \"image\",\n        image: flintImgEle,\n        x: 1640,\n        y: 975,\n        dx: -flintImgEle.width * 0.5,\n        dy: -flintImgEle.height * 0.5,\n        s: 2\n      }\n    }\n  },\n  attackButton: {\n    type: \"roundRect\",\n    tag: \"button\",\n    a: \"sendWave\",\n    disabled: false,\n    x: 1607.5,\n    y: 1025,\n    w: 135,\n    h: 50,\n    r: 10,\n    lw: 2,\n    s: \"black\",\n    f: \"rgb(255, 0, 0)\",\n    hF: \"rgb(255, 50, 50)\",\n    innerObjs: {\n      attackText: {\n        type: \"text\",\n        text: \"Attack!\",\n        font: \"24px Arial\",\n        f: \"white\",\n        x: 1675,\n        y: 1050\n      }\n    }\n  },\n  storyButton: {\n    type: \"roundRect\",\n    tag: \"button\",\n    a: \"showStory\",\n    x: 1525,\n    y: 1125,\n    w: 100,\n    h: 50,\n    r: 30,\n    lw: 2,\n    s: null,\n    f: \"rgb(0, 0, 0)\",\n    hF: \"rgb(35, 35, 35)\",\n    innerObjs: {\n      storyText: {\n        type: \"text\",\n        text: \"Story\",\n        font: \"24px Arial\",\n        f: \"white\",\n        x: 1575,\n        y: 1150\n      }\n    }\n  },\n  htpButton: {\n    type: \"roundRect\",\n    tag: \"button\",\n    a: \"htp\",\n    x: 1650,\n    y: 1125,\n    w: 175,\n    h: 50,\n    r: 30,\n    lw: 2,\n    s: null,\n    f: \"rgb(0, 0, 0)\",\n    hF: \"rgb(35, 35, 35)\",\n    innerObjs: {\n      htpText: {\n        type: \"text\",\n        text: \"How To Play\",\n        font: \"24px Arial\",\n        f: \"white\",\n        x: 1737.5,\n        y: 1150\n      }\n    }\n  },\n  header: {\n    type: \"rect\",\n    x: 0,\n    y: 0,\n    w: 1850,\n    h: 150,\n    f: \"gray\",\n    innerObjs: {\n      headerText: {\n        type: \"text\",\n        text: \"Monolith\",\n        font: \"72px Arial\",\n        f: \"white\",\n        x: 1850 * 0.5,\n        y: 90,\n      },\n      backgroundBorder: {\n        type: \"rect\",\n        x: 7.5,\n        y: 7.5,\n        w: 1835,\n        h: 150,\n        s: \"black\",\n        lw: 15\n      },\n      gameBorder: {\n        type: \"rect\",\n        x: 7.5,\n        y: 7.5,\n        w: 1835,\n        h: 1185,\n        s: \"black\",\n        lw: 15\n      }\n    }\n  }\n};\n\nmodule.exports = uiElements;\n\n//# sourceURL=webpack:///./src/ui/ui_elements.js?");

/***/ }),

/***/ "./src/util/queue.js":
/*!***************************!*\
  !*** ./src/util/queue.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Queue {\n  constructor() {\n    this.queue = [];\n  }\n\n  enqueue(ele) {\n    this.queue.push(ele);\n    return ele;\n  }\n\n  dequeue() {\n    return this.queue.shift();\n  }\n\n  length() {\n    return this.queue.length;\n  }\n}\n\nmodule.exports = Queue;\n\n//# sourceURL=webpack:///./src/util/queue.js?");

/***/ }),

/***/ "./src/util/util.js":
/*!**************************!*\
  !*** ./src/util/util.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const throttle = (fn, interval) => {\n  let tooSoon = false;\n  return (...args) => {\n    if (!tooSoon) {\n      tooSoon = true;\n      setTimeout(() => tooSoon = false, interval);\n      fn(...args);\n    }\n  }\n};\n\nmodule.exports = {\n  throttle\n};\n\n//# sourceURL=webpack:///./src/util/util.js?");

/***/ }),

/***/ "./src/waves/wave1.js":
/*!****************************!*\
  !*** ./src/waves/wave1.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const WaveUtil = __webpack_require__(/*! ./wave_util */ \"./src/waves/wave_util.js\");\n\nconst Wave1 = (game) => {\n  const defWave = WaveUtil.defWave(game);\n  defWave(4, \"Caveman\", 250);\n};\n\nmodule.exports = Wave1;\n\n//# sourceURL=webpack:///./src/waves/wave1.js?");

/***/ }),

/***/ "./src/waves/wave2.js":
/*!****************************!*\
  !*** ./src/waves/wave2.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const WaveUtil = __webpack_require__(/*! ./wave_util */ \"./src/waves/wave_util.js\");\n\nconst Wave2 = (game) => {\n  const defWave = WaveUtil.defWave(game);\n  defWave(2, \"Caveman\", 250, 2);\n  defWave(2, \"Caveman\", 250, 3);\n  defWave(2, \"Caveman\", 250, 4);\n};\n\nmodule.exports = Wave2;\n\n//# sourceURL=webpack:///./src/waves/wave2.js?");

/***/ }),

/***/ "./src/waves/wave3.js":
/*!****************************!*\
  !*** ./src/waves/wave3.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const WaveUtil = __webpack_require__(/*! ./wave_util */ \"./src/waves/wave_util.js\");\n\nconst Wave3 = (game) => {\n  const defWave = WaveUtil.defWave(game);\n  defWave(10, \"Spider\", 500);\n};\n\nmodule.exports = Wave3;\n\n//# sourceURL=webpack:///./src/waves/wave3.js?");

/***/ }),

/***/ "./src/waves/wave4.js":
/*!****************************!*\
  !*** ./src/waves/wave4.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const WaveUtil = __webpack_require__(/*! ./wave_util */ \"./src/waves/wave_util.js\");\n\nconst Wave4 = (game) => {\n  const defWave = WaveUtil.defWave(game);\n  defWave(6, \"Caveman\", 750);\n  defWave(5, \"Eagle\", 750);\n};\n\nmodule.exports = Wave4;\n\n//# sourceURL=webpack:///./src/waves/wave4.js?");

/***/ }),

/***/ "./src/waves/wave5.js":
/*!****************************!*\
  !*** ./src/waves/wave5.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const WaveUtil = __webpack_require__(/*! ./wave_util */ \"./src/waves/wave_util.js\");\n\nconst Wave5 = (game) => {\n  const defWave = WaveUtil.defWave(game);\n  defWave(6, \"Caveman\", 750);\n  defWave(20, \"Spider\", 750);\n  defWave(6, \"Eagle\", 750);\n  defWave(1, \"Mammoth\", 1000)\n};\n\nmodule.exports = Wave5;\n\n//# sourceURL=webpack:///./src/waves/wave5.js?");

/***/ }),

/***/ "./src/waves/wave_util.js":
/*!********************************!*\
  !*** ./src/waves/wave_util.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Caveman = __webpack_require__(/*! ../moving_objects/npcs/caveman */ \"./src/moving_objects/npcs/caveman.js\");\nconst Spider = __webpack_require__(/*! ../moving_objects/npcs/spider */ \"./src/moving_objects/npcs/spider.js\");\nconst Eagle = __webpack_require__(/*! ../moving_objects/npcs/eagle */ \"./src/moving_objects/npcs/eagle.js\");\nconst Mammoth = __webpack_require__(/*! ../moving_objects/npcs/Mammoth */ \"./src/moving_objects/npcs/Mammoth.js\");\n\nconst NPC = {\n  Caveman,\n  Spider,\n  Eagle,\n  Mammoth\n};\n\nconst generateInteger = (max, min = 1) => {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n};\n\nconst defWave = game => {\n  return (num, type, delay, path = null) => {\n    for (let i = 1; i <= num; i++) {\n      setTimeout(() => {\n        if (path) {\n          game.add( new NPC[type]({ path , game }) );\n        } else {\n          game.add( new NPC[type]({ path: generateInteger(4), game }) );\n        }\n      }, delay * i);\n    };\n  };\n}\n\nmodule.exports = { defWave };\n\n//# sourceURL=webpack:///./src/waves/wave_util.js?");

/***/ }),

/***/ "./src/waves/waves.js":
/*!****************************!*\
  !*** ./src/waves/waves.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Wave1 = __webpack_require__(/*! ./wave1 */ \"./src/waves/wave1.js\");\nconst Wave2 = __webpack_require__(/*! ./wave2 */ \"./src/waves/wave2.js\");\nconst Wave3 = __webpack_require__(/*! ./wave3 */ \"./src/waves/wave3.js\");\nconst Wave4 = __webpack_require__(/*! ./wave4 */ \"./src/waves/wave4.js\");\nconst Wave5 = __webpack_require__(/*! ./wave5 */ \"./src/waves/wave5.js\");\n\nmodule.exports = {\n  1: Wave1,\n  2: Wave2,\n  3: Wave3,\n  4: Wave4,\n  5: Wave5,\n};\n\n//# sourceURL=webpack:///./src/waves/waves.js?");

/***/ })

/******/ });