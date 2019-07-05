const NPC = require("./npc");

class Eagle extends NPC {
  constructor(options) {
    options.dimensions = [ Caveman.DIMENSION_X, Caveman.DIMENSION_Y ];
    options.speed = Eagle.SPEED;
    options.sprite = "eagle";
    super(options);
  }

}

Eagle.DIMENSION_X = 50;
Eagle.DIMENSION_Y = 19;
Eagle.SPEED = Math.sqrt(2);

module.exports = Eagle;