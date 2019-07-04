class Tower {
  constructor(options) {
    this.pos = options.pos;
    this.range = options.range;
    this.damage = options.damage;
    this.reload = options.reload;
    this.sprite = document.getElementById(`${options.type}-tower`);
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.pos[0], this.pos[1]);
  }
}

module.exports = Tower;