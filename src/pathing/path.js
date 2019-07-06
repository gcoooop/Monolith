const Queue = require("../util/queue");

class Path {
  constructor(number) {
    this.points = new Queue();
    this[`path${number}`]();
    this.generateEnpoint();
  }

  enqueue(point) {
    return this.points.enqueue(point);
  }

  dequeue() {
    return this.points.dequeue();
  }

  pointCount() {
    return this.points.length();
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
    this.enqueue( [ 1090, 220 ] );
  }
  
  path2() {
    this.enqueue( [ -50, this.generateInteger(915, 800) ] );
    this.enqueue( [ this.generateInteger(290, 260), this.generateInteger(700, 675) ] );
    this.enqueue( [ 750, 240 ] );
    this.enqueue( [ 1090, 220 ] );
  }
  
  path3() {
    this.enqueue( [ this.generateInteger(590, 490), 1050 ] );
    this.enqueue( [ 750, 625 ] );
    this.enqueue( [ 820, 460 ] );
    this.enqueue( [ 900, 400 ] );
    this.enqueue( [ 930, 250 ] );
    this.enqueue( [ 1090, 220 ] );
  }
  
  path4() {
    this.enqueue( [ this.generateInteger(1315, 1250), 1050 ] );
    this.enqueue( [ 1030, 655 ] );
    this.enqueue( [ 900, 400 ] );
    this.enqueue( [ 930, 250 ] );
    this.enqueue( [ 1090, 220 ] );
  }

  generateEnpoint() {
    const endpointNumber = this.generateInteger(4);

    let endpoint;
    switch (endpointNumber) {
      case 0:
        endpoint = [ [1175, this.generateInteger(265, 165)] ];
        break;
      case 1:
        endpoint = [ [1155, 135], [1265, 135], [1225, this.generateInteger(265, 165)] ];
        break;
      case 2:
        endpoint = [ [1155, 135], [this.generateInteger(1225, 1175), 165] ];
        break;
      case 3:
        endpoint = [ [1155, 305], [1255, 305], [1225, this.generateInteger(265, 165)] ];
        break;
      case 4:
        endpoint = [ [1155, 305], [this.generateInteger(1225, 1175), 265] ];
        break;
    }
    endpoint.forEach(ep => this.enqueue(ep));
  }

  generateInteger(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = Path;