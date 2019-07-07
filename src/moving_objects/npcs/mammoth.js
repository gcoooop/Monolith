const NPC = require("./npc");

class Mammoth extends NPC {
  constructor(options) {
    options.dimensions = [ Mammoth.DIMENSION_X, Mammoth.DIMENSION_Y ];
    options.speed = Mammoth.SPEED;
    options.hitRadius = Mammoth.HIT_RADIUS;
    options.health = Mammoth.HEALTH;
    options.damage = Mammoth.DAMAGE;
    options.flint = Mammoth.FLINT;
    options.sprite = "mammoth";
    super(options);
  }
}

Mammoth.DIMENSION_X = 32;
Mammoth.DIMENSION_Y = 50;
Mammoth.SPEED = Math.sqrt(2);
Mammoth.HIT_RADIUS = 20;
Mammoth.HEALTH = 15;
Mammoth.DAMAGE = 10;
Mammoth.FLINT = 30;

module.exports = Mammoth;