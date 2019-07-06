const Caveman = require("../moving_objects/npcs/caveman");
const Spider = require("../moving_objects/npcs/spider");
const Eagle = require("../moving_objects/npcs/eagle");
const Mammoth = require("../moving_objects/npcs/Mammoth");

const generateInteger = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
  generateInteger,
  Caveman,
  Spider,
  Eagle,
  Mammoth
};