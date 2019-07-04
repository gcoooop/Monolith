class TargetingQueue {
  constructor() {
    this.targets = [];
    this.order = "first";
  }

  includes(target) {
    return this.targets.includes(target);
  }

  addTarget(target) {
    this.targets.push(target);
    return target
  }

  removeTarget(target) {
    this.targets = this.targets.filter(ele => ele != target);
    return target;
  }

  reorder(order) {

  }
}

module.exports = TargetingQueue;