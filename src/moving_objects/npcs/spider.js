const NPC = require("./npc");

class Spider extends NPC {
  constructor(options) {
    options.speed = Spider.SPEED;
    options.hitRadius = Spider.HIT_RADIUS;
    options.health = Spider.HEALTH;
    options.damage = Spider.DAMAGE;
    options.flint = Spider.FLINT;
    options.scale = Spider.SCALE;
    options.sprite = "spider";
    super(options);
  }
}

Spider.SPEED = Math.sqrt(2);
Spider.HIT_RADIUS = 7;
Spider.HEALTH = 1;
Spider.DAMAGE = 1;
Spider.FLINT = 5;
Spider.SCALE = 1;

module.exports = Spider;