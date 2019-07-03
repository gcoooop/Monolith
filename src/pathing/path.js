class Path {
  constructor(number) {
    this.points = [];
    this[`path${number}`]();
  }

  enqueue(point) {
    return this.points.push(point);
  }

  dequeue() {
    return this.points.shift();
  }

  path1() {
    // randomly determine which coordinate of the staring position is negative
    // this is necessary because the path starts in a corner
    if (Math.random() < 0.5) {
      this.enqueue( [ -50, this.generateInteger(65) ] );
    } else {
      this.enqueue( [ this.generateInteger(90), -50 ] );
    }
    this.enqueue( [ this.generateInteger(190, 180), this.generateInteger(100, 50) ] );
    this.enqueue( [ 675, 140 ] );
    this.enqueue( [ 1200, 215 ] );
  }


  generateInteger(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = Path;