const NPC = require("./npc");

class Caveman extends NPC {
  constructor(options) {
    options.dimensions = [ Caveman.DIMENSION_X, Caveman.DIMENSION_Y ];
    options.speed = Caveman.SPEED;
    options.sprite = "caveman";
    super(options);
  }
}

Caveman.DIMENSION_X = 25;
Caveman.DIMENSION_Y = 25;
Caveman.SPEED = Math.sqrt(2);

module.exports = Caveman;