const NPC = require("./npc");

class Eagle extends NPC {
  constructor(options) {
    options.dimensions = [ Eagle.DIMENSION_X, Eagle.DIMENSION_Y ];
    options.speed = Eagle.SPEED;
    options.hitRadius = Eagle.HIT_RADIUS;
    options.health = Eagle.HEALTH;
    options.damage = Eagle.DAMAGE;
    options.flint = Eagle.FLINT;
    options.sprite = "eagle";
    super(options);
  }

}

Eagle.DIMENSION_X = 50;
Eagle.DIMENSION_Y = 19;
Eagle.SPEED = Math.sqrt(2);
Eagle.HIT_RADIUS = 8;
Eagle.HEALTH = 3;
Eagle.DAMAGE = 5;
Eagle.FLINT = 10;

module.exports = Eagle;