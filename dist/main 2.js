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

eval("const NPC = __webpack_require__(/*! ./npcs/npc */ \"./src/npcs/npc.js\");\nconst Caveman = __webpack_require__(/*! ./npcs/caveman */ \"./src/npcs/caveman.js\");\nconst Spider = __webpack_require__(/*! ./npcs/spider */ \"./src/npcs/spider.js\");\nconst Eagle = __webpack_require__(/*! ./npcs/eagle */ \"./src/npcs/eagle.js\");\nconst Mammoth = __webpack_require__(/*! ./npcs/mammoth */ \"./src/npcs/mammoth.js\");\n\nclass Game {\n  constructor() {\n    this.towers = [];\n    this.npcs = [];\n    this.projectiles = [];\n    this.test();\n  }\n\n  test() {\n    const sample = new Caveman({ pos: [100, 100] });\n    // const sample = new Spider({ pos: [100, 100] });\n    // const sample = new Eagle({ pos: [100, 100] });\n    // const sample = new Mammoth({ pos: [100, 100] });\n    this.add(sample);\n  }\n\n  add(object) {\n    if (object instanceof NPC) {\n      this.npcs.push(object);\n    } else {\n      throw new Error(\"unknown object!!!\")\n    }\n  }\n\n  allObjects() {\n    return [].concat(this.npcs, this.projectiles, this.towers);\n  }\n\n  draw(ctx) {\n    // clears the canvas area\n    ctx.clearRect(0, 0, 1500, 1000);\n\n    this.allObjects().forEach(object => {\n      object.draw(ctx);\n    });\n  }\n\n  moveObjects(dt) {\n    this.allObjects().forEach(object => {\n      object.move(dt);\n    });\n  }\n\n  step(dt) {\n    this.moveObjects(dt);\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameView {\n  constructor(game, ctx) {\n    this.game = game;\n    this.ctx = ctx;\n  }\n\n  start() {\n    this.lastTime = 0;\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  animate(time) {\n    const dt = time - this.lastTime;\n\n    this.game.step(dt);\n    this.game.draw(this.ctx);\n    this.lastTime = time;\n\n    requestAnimationFrame(this.animate.bind(this));\n  }\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEl = document.getElementById(\"monolith-canvas\");\n\n  const ctx = canvasEl.getContext(\"2d\");\n  const game = new Game();\n  new GameView(game, ctx).start();\n});\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class MovingObject {\n  constructor(options = {}) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.hitRadius = options.hitRadius;\n    this.game = options.game;\n    this.sprite = document.getElementById(options.sprite);\n  }\n\n  draw(ctx) {\n    ctx.drawImage(this.sprite, this.pos[0], this.pos[1]);\n  }\n\n  move(dt) {\n    const x = this.pos[0] + this.vel[0] * (dt / normalFrameRate);\n    const y = this.pos[1] + this.vel[1] * (dt / normalFrameRate);\n    this.pos = [ x, y ];\n  }\n\n  remove() {\n    this.game.remove(this);\n  }\n}\n\nconst normalFrameRate = 1000 / 60;\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/npcs/caveman.js":
/*!*****************************!*\
  !*** ./src/npcs/caveman.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const NPC = __webpack_require__(/*! ./npc */ \"./src/npcs/npc.js\");\n\nclass Caveman extends NPC {\n  constructor(options) {\n    options.vel = [0.5, 0.5];\n    options.sprite = \"caveman\";\n    super(options);\n  }\n}\n\nmodule.exports = Caveman;\n\n//# sourceURL=webpack:///./src/npcs/caveman.js?");

/***/ }),

/***/ "./src/npcs/eagle.js":
/*!***************************!*\
  !*** ./src/npcs/eagle.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const NPC = __webpack_require__(/*! ./npc */ \"./src/npcs/npc.js\");\n\nclass Eagle extends NPC {\n  constructor(options) {\n    options.vel = [0.5, 0.5];\n    options.sprite = \"eagle\";\n    super(options);\n  }\n}\n\nmodule.exports = Eagle;\n\n//# sourceURL=webpack:///./src/npcs/eagle.js?");

/***/ }),

/***/ "./src/npcs/mammoth.js":
/*!*****************************!*\
  !*** ./src/npcs/mammoth.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const NPC = __webpack_require__(/*! ./npc */ \"./src/npcs/npc.js\");\n\nclass Mammoth extends NPC {\n  constructor(options) {\n    options.vel = [0.5, 0.5];\n    options.sprite = \"mammoth\";\n    super(options);\n  }\n}\n\nmodule.exports = Mammoth;\n\n//# sourceURL=webpack:///./src/npcs/mammoth.js?");

/***/ }),

/***/ "./src/npcs/npc.js":
/*!*************************!*\
  !*** ./src/npcs/npc.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ../moving_object */ \"./src/moving_object.js\");\n\nclass NPC extends MovingObject {\n  constructor(options) {\n    super(options);\n    this.health = options.health;\n    this.damage = options.damage;\n  }\n}\n\nmodule.exports = NPC;\n\n//# sourceURL=webpack:///./src/npcs/npc.js?");

/***/ }),

/***/ "./src/npcs/spider.js":
/*!****************************!*\
  !*** ./src/npcs/spider.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const NPC = __webpack_require__(/*! ./npc */ \"./src/npcs/npc.js\");\n\nclass Spider extends NPC {\n  constructor(options) {\n    options.vel = [0.5, 0.5];\n    options.sprite = \"spider\";\n    super(options);\n  }\n}\n\nmodule.exports = Spider;\n\n//# sourceURL=webpack:///./src/npcs/spider.js?");

/***/ })

/******/ });