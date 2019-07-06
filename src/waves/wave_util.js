const Caveman = require("../moving_objects/npcs/caveman");
const Spider = require("../moving_objects/npcs/spider");
const Eagle = require("../moving_objects/npcs/eagle");
const Mammoth = require("../moving_objects/npcs/Mammoth");

const NPC = {
  Caveman,
  Spider,
  Eagle,
  Mammoth
};

const generateInteger = (max, min = 1) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const defWave = game => {
  return (num, type, delay) => {
    for (let i = 1; i <= num; i++) {
      setTimeout(() => {
        game.add( new NPC[type]({ path: generateInteger(4), game, id: i }) );
      }, delay);
    };
  };
}

module.exports = { defWave };