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

eval("const NPC = __webpack_require__(/*! ./moving_objects/npcs/npc */ \"./src/moving_objects/npcs/npc.js\");\nconst Tower = __webpack_require__(/*! ./towers/tower */ \"./src/towers/tower.js\");\nconst Artillery = __webpack_require__(/*! ./moving_objects/artillery/artillery */ \"./src/moving_objects/artillery/artillery.js\");\nconst Monolith = __webpack_require__(/*! ./monolith/monolith */ \"./src/monolith/monolith.js\");\n\nconst Waves = __webpack_require__(/*! ./waves/waves */ \"./src/waves/waves.js\");\n\nclass Game {\n  constructor() {\n    this.running = true;\n    this.towers = [];\n    this.npcs = [];\n    this.artillery = [];\n    this.flint = 200;\n    this.monolith = new Monolith();\n    this.wave = 1;\n    this.waveProgress = \"complete\";\n  }\n\n  sendWave() {\n    Waves[this.wave](this);\n    this.waveProgress = \"incomplete\";\n  }\n\n  add(object) {\n    if (object instanceof NPC) {\n      this.npcs.push(object); \n    } else if (object instanceof Tower)  {    \n      this.spendFlint(object.flint);\n      this.towers.push(object);\n    } else if (object instanceof Artillery) {\n      this.artillery.push(object);\n    } else {\n      throw new Error(\"unknown object!!!\")\n    }\n  }\n\n  allObjects() {\n    return [].concat(this.npcs, this.artillery, this.towers, this.monolith);\n  }\n\n  allMoveableObjects() {\n    return [].concat(this.npcs, this.artillery);\n  }\n\n  draw(ctx) {\n    // clears the canvas area\n    ctx.clearRect(0, 0, 1500, 1000);\n\n    this.allObjects().forEach(object => {\n      object.draw(ctx);\n    });\n  }\n\n  moveObjects(dt) {\n    this.allMoveableObjects().forEach(object => {\n      object.move(dt);\n    });\n  }\n\n  runTargeting() {\n    this.towers.forEach(tower => {\n      tower.calcTargets(this.npcs);\n    });\n  }\n\n  launchArtillery() {\n    this.towers.forEach(tower => {\n      if (!tower.noTargets()) tower.throttledFire();\n    });\n  }\n\n  damageMonolith(damage) {\n    this.monolith.takeDamage(damage);\n  }\n\n  earnFlint(amount) {\n    this.flint += amount;\n  }\n  \n  spendFlint(amount) {\n    this.flint -= amount;\n  }\n\n  step(dt) {\n    this.moveObjects(dt);\n    this.runTargeting();\n    this.launchArtillery();\n    this.checkForLost();\n  }\n\n  remove(object) {\n    if (object instanceof NPC) {\n      this.earnFlint(object.flint);\n      this.npcs.splice(this.npcs.indexOf(object), 1);\n      if (this.waveComplete()) {\n        this.wave++;\n        this.waveProgress = \"complete\";\n      }\n    } else if (object instanceof Tower) {\n      this.towers.splice(this.towers.indexOf(object), 1);\n    } else if (object instanceof Artillery) {\n      this.artillery.splice(this.artillery.indexOf(object), 1);\n    } else {\n      throw new Error(\"unknown object!!!\")\n    }\n  }\n\n  checkForLost() {\n    if (this.monolith.health <= 0) this.running = false;\n  }\n\n  waveComplete() {\n    return !this.npcs.length;\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameView {\n  constructor(game, ui, ctx) {\n    this.game = game;\n    this.ui = ui;\n    this.ctx = ctx;\n  }\n\n  start() {\n    this.lastTime = 0;\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  animate(time) {\n    const dt = time - this.lastTime;\n\n    this.game.step(dt);\n    this.game.draw(this.ctx);\n    this.ui.updateControlPanel();\n    this.lastTime = time;\n\n    if (this.game.running) {\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\nconst UI = __webpack_require__(/*! ./ui */ \"./src/ui.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEl = document.getElementById(\"monolith-canvas\");\n\n  const ctx = canvasEl.getContext(\"2d\");\n  const game = new Game();\n  const ui = new UI(canvasEl, game);\n  const gameView = new GameView(game, ui, ctx);\n  gameView.start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/monolith/monolith.js":
/*!**********************************!*\
  !*** ./src/monolith/monolith.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Monolith {\n  constructor() {\n    this.pos = Monolith.POS;\n    this.fullHealth = Monolith.HEALTH;\n    this.health = Monolith.HEALTH;\n  }\n\n  draw(ctx) {\n    const width = 50;\n    const height = 100;\n    const topLeftX = this.pos[0] - (0.5 * width);\n    const topLeftY = this.pos[1] - (0.5 * height);\n\n    ctx.fillStyle = \"#201e23\";\n    ctx.fillRect(topLeftX, topLeftY, width, height);\n\n    ctx.fillStyle = \"#3f3f3f\";\n    ctx.fillRect(0, 1000, 1500, 50);\n\n    ctx.beginPath();\n    ctx.rect(5, 1000, 1490, 45);\n    ctx.strokeStyle = \"black\";\n    ctx.lineWidth = 10;\n    ctx.stroke();\n\n\n    const x0Health = 10;\n    const y = 1022;\n    const x100Health = 1490;\n    const xNHealth = (x100Health - x0Health) * (this.health / this.fullHealth) + x0Health;\n\n    const healthPercentage = this.health / this.fullHealth * 100;\n    let healthColor;\n    switch (true) {\n      case healthPercentage >= 80:\n        healthColor = \"#00FF00\";\n        break;\n      case healthPercentage < 80 && healthPercentage >= 60:\n        healthColor = \"#96FF02\";\n        break;\n      case healthPercentage < 60 && healthPercentage >= 40:\n        healthColor = \"#FFFF00\";\n        break;\n      case healthPercentage < 40 && healthPercentage >= 20:\n        healthColor = \"#FF7F00\";\n        break;\n      case healthPercentage < 20 && healthPercentage > 0:\n        healthColor = \"#FF0000\";\n        break;\n      case healthPercentage < 0:\n        healthColor = \"transparent\";\n        break;\n    }\n\n    ctx.beginPath();\n    ctx.moveTo(x0Health, y);\n    ctx.lineTo(xNHealth, y);\n    ctx.lineWidth = 31;\n    ctx.strokeStyle = healthColor;\n    ctx.stroke();\n  }\n\n  takeDamage(damage) {\n    this.health -= damage;\n  }\n}\n\nMonolith.POS = [1200, 215];\nMonolith.HEALTH = 200;\n\nmodule.exports = Monolith;\n\n//# sourceURL=webpack:///./src/monolith/monolith.js?");

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

eval("const Queue = __webpack_require__(/*! ../util/queue */ \"./src/util/queue.js\");\n\nclass Path {\n  constructor(number) {\n    this.points = new Queue();\n    this[`path${number}`]();\n    this.generateEnpoint();\n  }\n\n  enqueue(point) {\n    return this.points.enqueue(point);\n  }\n\n  dequeue() {\n    return this.points.dequeue();\n  }\n\n  pointCount() {\n    return this.points.length();\n  }\n\n  path1() {\n    // randomly determine which coordinate of the staring position is negative\n    // this is necessary because the path starts in a corner\n    if (Math.random() < 0.5) {\n      this.enqueue( [ -50, this.generateInteger(65) ] );\n    } else {\n      this.enqueue( [ this.generateInteger(90), -50 ] );\n    }\n    this.enqueue( [ this.generateInteger(190, 180), this.generateInteger(100, 50) ] );\n    this.enqueue( [ 675, 140 ] );\n    this.enqueue( [ 1090, 220 ] );\n  }\n  \n  path2() {\n    this.enqueue( [ -50, this.generateInteger(915, 800) ] );\n    this.enqueue( [ this.generateInteger(290, 260), this.generateInteger(700, 675) ] );\n    this.enqueue( [ 750, 240 ] );\n    this.enqueue( [ 1090, 220 ] );\n  }\n  \n  path3() {\n    this.enqueue( [ this.generateInteger(590, 490), 1050 ] );\n    this.enqueue( [ 750, 625 ] );\n    this.enqueue( [ 820, 460 ] );\n    this.enqueue( [ 900, 400 ] );\n    this.enqueue( [ 930, 250 ] );\n    this.enqueue( [ 1090, 220 ] );\n  }\n  \n  path4() {\n    this.enqueue( [ this.generateInteger(1315, 1250), 1050 ] );\n    this.enqueue( [ 1030, 655 ] );\n    this.enqueue( [ 900, 400 ] );\n    this.enqueue( [ 930, 250 ] );\n    this.enqueue( [ 1090, 220 ] );\n  }\n\n  generateEnpoint() {\n    const endpointNumber = this.generateInteger(4);\n\n    let endpoint;\n    switch (endpointNumber) {\n      case 0:\n        endpoint = [ [1160, this.generateInteger(265, 165)] ];\n        break;\n      case 1:\n        endpoint = [ [1155, 135], [1265, 135], [1240, this.generateInteger(265, 165)] ];\n        break;\n      case 2:\n        endpoint = [ [1155, 135], [this.generateInteger(1225, 1175), 150] ];\n        break;\n      case 3:\n        endpoint = [ [1155, 305], [1255, 305], [1240, this.generateInteger(265, 165)] ];\n        break;\n      case 4:\n        endpoint = [ [1155, 305], [this.generateInteger(1225, 1175), 250] ];\n        break;\n    }\n    endpoint.forEach(ep => this.enqueue(ep));\n  }\n\n  generateInteger(max, min = 0) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n  }\n}\n\nmodule.exports = Path;\n\n//# sourceURL=webpack:///./src/pathing/path.js?");

/***/ }),

/***/ "./src/towers/earth_tower.js":
/*!***********************************!*\
  !*** ./src/towers/earth_tower.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tower = __webpack_require__(/*! ./tower */ \"./src/towers/tower.js\");\nconst Boulder = __webpack_require__(/*! ../moving_objects/artillery/boulder */ \"./src/moving_objects/artillery/boulder.js\");\n\nclass EarthTower extends Tower {\n  constructor(options) {\n    options.type = EarthTower.TYPE;\n    options.range = EarthTower.RANGE;\n    options.damage = EarthTower.DAMAGE;\n    options.reload = EarthTower.RELOAD;\n    options.flint = EarthTower.FLINT;\n    options.artillery = Boulder;\n    super(options);\n    EarthTower.FLINT += 20;\n  }\n\n  strikeReport(target, artillery) {\n    this.allTargets().forEach(target => {\n      if (this.inAOE(target, artillery)) {\n        target.takeDamage(this.damage);\n      }\n    });\n  }\n\n  inAOE(target, artillery) {\n    const minDist = target.hitRadius + artillery.hitRadius;\n    const dx = target.pos[0] - artillery.pos[0];\n    const dy = target.pos[1] - artillery.pos[1];\n    const actualDist = Math.sqrt(dx**2 + dy**2);\n    return actualDist < minDist;\n  }\n}\n\nEarthTower.TYPE = \"earth\";\nEarthTower.RANGE = 225;\nEarthTower.DAMAGE = 1;\nEarthTower.RELOAD = 1000;\nEarthTower.FLINT = 100;\n\nmodule.exports = EarthTower;\n\n//# sourceURL=webpack:///./src/towers/earth_tower.js?");

/***/ }),

/***/ "./src/towers/fire_tower.js":
/*!**********************************!*\
  !*** ./src/towers/fire_tower.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tower = __webpack_require__(/*! ./tower */ \"./src/towers/tower.js\");\nconst Flame = __webpack_require__(/*! ../moving_objects/artillery/flame */ \"./src/moving_objects/artillery/flame.js\");\nconst Util = __webpack_require__(/*! ../util/util */ \"./src/util/util.js\");\n\nclass FireTower extends Tower {\n  constructor(options) {\n    options.type = FireTower.TYPE;\n    options.range = FireTower.RANGE;\n    options.damage = FireTower.DAMAGE;\n    options.reload = FireTower.RELOAD;\n    options.flint = FireTower.FLINT;\n    options.artillery = Flame;\n    super(options);\n    this.throttledStrikeReport = Util.throttle(this.strikeReport.bind(this), 100);\n    FireTower.FLINT += 20;\n  }\n\n  fire() {\n    this.createFlames();\n  }\n\n  createFlames() {\n    const amtFlames = 40;\n    for (let n = 0; n < amtFlames; n++) {\n      const theta = 2 * Math.PI * (n / amtFlames);\n      const vel = [Flame.SPEED * Math.cos(theta), Flame.SPEED * Math.sin(theta)];\n      const artillery = new this.artillery({ vel, tower: this, game: this.game });\n      this.game.add(artillery);\n    }\n  }\n\n  strikeReport() {\n    this.allTargets().forEach(target => {\n      target.takeDamage(this.damage);\n    });\n  }\n}\n\nFireTower.TYPE = \"fire\";\nFireTower.RANGE = 175;\nFireTower.DAMAGE = 5;\nFireTower.RELOAD = 4000;\nFireTower.FLINT = 100;\n\nmodule.exports = FireTower;\n\n//# sourceURL=webpack:///./src/towers/fire_tower.js?");

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

eval("const TargetingQueue = __webpack_require__(/*! ./targeting_queue */ \"./src/towers/targeting_queue.js\");\nconst Util = __webpack_require__(/*! ../util/util */ \"./src/util/util.js\");\n\nclass Tower {\n  constructor(options) {\n    this.game = options.game;\n    this.pos = options.pos;\n    this.range = options.range;\n    this.damage = options.damage;\n    this.reload = options.reload;\n    this.flint = options.flint;\n    this.artillery = options.artillery;\n    this.targets = new TargetingQueue();\n    this.throttledFire = Util.throttle(this.fire.bind(this), this.reload);\n  } \n\n  draw(ctx) {\n    // do nothing!\n  }\n\n  allTargets() {\n    return this.targets.allTargets();\n  }\n\n  calcTargets(npcs) {\n    npcs.forEach(npc => {\n      const inRange = this.inRange(npc);\n      const inQueue = this.targets.includes(npc);\n      if (inRange && !inQueue) {\n        this.addTarget(npc);\n      } else if (!inRange && inQueue) {\n        this.removeTarget(npc);\n      }\n    });\n\n    this.targets.targets.forEach(target => {\n      const inGame = npcs.includes(target);\n      if (!inGame) this.removeTarget(target);\n    });\n  }\n\n  inRange(npc) {\n    const dx = npc.pos[0] - this.pos[0];\n    const dy = npc.pos[1] - this.pos[1];\n    const d = Math.sqrt(dx**2 + dy**2);\n    return d <= this.range;\n  }\n\n  addTarget(target) {\n    this.targets.addTarget(target);\n  }\n\n  removeTarget(target) {\n    this.targets.removeTarget(target);\n  }\n\n  noTargets() {\n    return this.targets.empty();\n  }\n\n  primaryTarget() {\n    return this.targets.primaryTarget();\n  }\n\n  fire() {\n    const target = this.primaryTarget();\n    if (target) {\n      const artillery = new this.artillery({ target, tower: this, game: this.game });\n      this.game.add(artillery);\n    }\n  }\n\n  strikeReport() {\n    // do nothing\n  }\n}\n\nmodule.exports = Tower;\n\n//# sourceURL=webpack:///./src/towers/tower.js?");

/***/ }),

/***/ "./src/towers/water_tower.js":
/*!***********************************!*\
  !*** ./src/towers/water_tower.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tower = __webpack_require__(/*! ./tower */ \"./src/towers/tower.js\");\nconst Droplet = __webpack_require__(/*! ../moving_objects/artillery/droplet */ \"./src/moving_objects/artillery/droplet.js\");\n\nclass WaterTower extends Tower {\n  constructor(options) {\n    options.type = WaterTower.TYPE;\n    options.range = WaterTower.RANGE;\n    options.damage = WaterTower.DAMAGE;\n    options.reload = WaterTower.RELOAD;\n    options.flint = WaterTower.FLINT;\n    options.artillery = Droplet;\n    super(options);\n    WaterTower.FLINT += 20;\n  }\n\n  strikeReport(target, artillery) {\n    target.takeDamage(this.damage);\n  }\n}\n\nWaterTower.TYPE = \"water\";\nWaterTower.RANGE = 350;\nWaterTower.DAMAGE = 0.2;\nWaterTower.RELOAD = 200;\nWaterTower.FLINT = 100;\n\nmodule.exports = WaterTower;\n\n//# sourceURL=webpack:///./src/towers/water_tower.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tower = __webpack_require__(/*! ./towers/tower */ \"./src/towers/tower.js\");\nconst EarthTower = __webpack_require__(/*! ./towers/earth_tower */ \"./src/towers/earth_tower.js\");\nconst WaterTower = __webpack_require__(/*! ./towers/water_tower */ \"./src/towers/water_tower.js\");\nconst FireTower = __webpack_require__(/*! ./towers/fire_tower */ \"./src/towers/fire_tower.js\");\n\nconst AllTowers = {\n  earth: EarthTower,\n  water: WaterTower,\n  fire: FireTower\n};\n\nconst selectedTowerContainerEle = document.getElementById(\"selected-tower-container\");\nconst selectedTowerImgEle = document.getElementById(\"selected-tower-img\");\n\nconst earthTowerImg = document.getElementById(\"earth-tower\");\nconst waterTowerImg = document.getElementById(\"water-tower\");\nconst fireTowerImg = document.getElementById(\"fire-tower\");\nconst earthTowerPrice = document.getElementById(\"earth-tower-price\");\nconst waterTowerPrice = document.getElementById(\"water-tower-price\");\nconst fireTowerPrice = document.getElementById(\"fire-tower-price\");\n\nconst waveCounterEle = document.getElementById(\"wave-counter\");\nconst towerButtons = [...document.getElementById(\"towers-pane\").children];\nconst flintBankEle = document.getElementById(\"flint-bank\");\nconst waveButton = document.getElementById(\"wave-button\");\nconst messagesEle = document.getElementById(\"messages\");\n\nconst AllTowerImgs = {\n  earth: earthTowerImg.src,\n  water: waterTowerImg.src,\n  fire: fireTowerImg.src\n};\n\nclass UI {\n  constructor(canvasEl, game) {\n    this.canvasEl = canvasEl;\n    this.game = game;\n    this.selectedTowerType = null;\n    this.message = \"\";\n\n    this.initializeControlPanel = this.initializeControlPanel.bind(this);\n    this.sendWave = this.sendWave.bind(this);\n    this.selectTower = this.selectTower.bind(this);\n    this.followMouse = this.followMouse.bind(this);\n    this.placeTower = this.placeTower.bind(this);\n    this.handleClick = this.handleClick.bind(this);\n    this.showRangeIndicator = this.showRangeIndicator.bind(this);\n\n    this.initializeControlPanel();\n    document.addEventListener(\"mousemove\", this.followMouse);\n  }\n\n  initializeControlPanel() {\n    flintBankEle.innerText = `Flint: ${this.game.flint}`;\n    waveButton.addEventListener(\"click\", this.sendWave);\n    towerButtons.forEach( towerButton => towerButton.addEventListener(\"click\", this.selectTower) );\n  }\n\n  updateControlPanel() {\n    waveCounterEle.innerText = `Wave ${this.game.wave}`;\n    \n    flintBankEle.innerText = `Flint: ${this.game.flint}`;\n\n    if (this.game.waveProgress === \"complete\") {\n      waveButton.style.opacity = 1;\n      waveButton.style.pointerEvents = \"all\";\n    } else {\n      waveButton.style.opacity = 0.5;\n      waveButton.style.pointerEvents = \"none\";\n    }\n\n    messagesEle.innerText = this.message;\n\n    towerButtons.forEach( towerButton => {\n      const towerClass = AllTowers[towerButton.id];\n      if (this.game.flint < towerClass.FLINT) {\n        towerButton.style.opacity = 0.75;\n      } else {\n        towerButton.style.opacity = 1;\n      }\n    });\n\n    earthTowerPrice.innerText = EarthTower.FLINT;\n    waterTowerPrice.innerText = WaterTower.FLINT;\n    fireTowerPrice.innerText = FireTower.FLINT;\n  }\n\n  sendWave() {\n    this.game.sendWave();\n  }\n\n  selectTower(event) {\n    if (!this.selectedTowerType) {\n      this.selectedTowerType = event.currentTarget.id;\n      const towerClass = AllTowers[this.selectedTowerType];\n      if (this.game.flint < towerClass.FLINT) {\n        this.selectedTowerType = null;\n        this.message = \"You do not have enough flint!\";\n        setTimeout(() => {\n          this.message = \"\";\n        }, 4000);\n      } else {\n        selectedTowerImgEle.src = AllTowerImgs[this.selectedTowerType];\n        this.followMouse(event)\n    \n        setTimeout(() => {\n          document.addEventListener(\"click\", this.handleClick);\n        }, 50);\n      }\n    }\n  }\n\n  followMouse(event) {\n    if (this.selectedTowerType) {\n      const towerRange = AllTowers[this.selectedTowerType].RANGE;\n      selectedTowerContainerEle.style.left = `${event.pageX - towerRange}px`;\n      selectedTowerContainerEle.style.top = `${event.pageY - towerRange}px`;\n      selectedTowerContainerEle.style.height = `${towerRange * 2}px`;\n      selectedTowerContainerEle.style.width = `${towerRange * 2}px`;\n    }\n  }\n\n  handleClick(event) {\n    if (event.target.nodeName === \"CANVAS\") {\n      this.placeTower(event);\n    } \n    document.removeEventListener(\"click\", this.handleClick);\n    selectedTowerImgEle.src = \"\";\n    this.selectedTowerType = null;\n    selectedTowerContainerEle.style.height = `0px`;\n    selectedTowerContainerEle.style.width = `0px`;\n  }\n\n  getCursorPosition(event) {\n    const rect = this.canvasEl.getBoundingClientRect()\n    const x = event.clientX - rect.left\n    const y = event.clientY - rect.top\n    return [x, y];\n  }\n\n  placeTower(event) {\n    const pos = this.getCursorPosition(event);\n    const options = { pos, game: this.game };\n    const TowerClass = AllTowers[this.selectedTowerType];\n\n    this.game.add( new TowerClass(options) );\n\n    const domTowerImg = document.createElement(\"IMG\");\n    domTowerImg.src = selectedTowerImgEle.src;\n    const domTower = document.createElement(\"DIV\");\n    domTower.className = \"dom-tower\";\n    domTower.id = `${this.selectedTowerType}-dom-tower`;\n    domTower.appendChild(domTowerImg);\n    domTower.style.left = `${event.pageX}px`;\n    domTower.style.top = `${event.pageY}px`;\n    domTower.style.width = \"0px\";\n    domTower.style.height = \"0px\";\n\n    document.body.appendChild(domTower);\n    domTowerImg.addEventListener(\"click\", this.showRangeIndicator);\n  }\n\n  showRangeIndicator(event) {\n    const domTower = event.currentTarget.parentNode;\n    const domTowerType = domTower.id.replace(\"-dom-tower\", \"\");\n    const towerRange = AllTowers[domTowerType].RANGE;\n    if (!domTower.className.includes(\"dom-tower-selected\")) {\n      domTower.className += \" dom-tower-selected\";\n      domTower.style.width = `${2 * towerRange}px`;\n      domTower.style.height = `${2 * towerRange}px`;\n      domTower.style.left = `calc(${domTower.style.left} - ${towerRange}px)`;\n      domTower.style.top = `calc(${domTower.style.top} - ${towerRange}px)`;\n\n      const hideRangeIndicator = function(event) {\n        domTower.className = domTower.className.replace(\" dom-tower-selected\", \"\");\n        domTower.style.width = \"0px\";\n        domTower.style.height = \"0px\";\n        domTower.style.left = `calc(${domTower.style.left} + ${towerRange}px)`;\n        domTower.style.top = `calc(${domTower.style.top} + ${towerRange}px)`;\n        document.removeEventListener(\"click\", hideRangeIndicator);\n      };\n\n      setTimeout(() => {\n        document.addEventListener(\"click\", hideRangeIndicator);\n      }, 50);\n    }\n  }\n}\n\nmodule.exports = UI;\n\n//# sourceURL=webpack:///./src/ui.js?");

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