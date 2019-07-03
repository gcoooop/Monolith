class Path {
  constructor(number) {
    this.points = [];
    this[`path${number}`]();
  }

  path1() {
    // randomly determine which coordinate of the staring position is negative
    // this is necessary because the path starts in a corner
    if (Math.random() < 0.5) {
      this.points.push( [ -50, this.generateInteger(65) ] );
    } else {
      this.points.push( [ this.generateInteger(90), -50 ] );
    }
    this.points.push( [ this.generateInteger(190, 180), this.generateInteger(100, 50) ] );
    this.points.push( [ 650, 150 ] );
    this.points.push( [ 1200, 215 ] );
  }


  generateInteger(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = Path;