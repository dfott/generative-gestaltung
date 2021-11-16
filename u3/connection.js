/**
 * Base Class used to display a Connection between two points. Multiple connections are used to display a letter
 */
class Connection {
  /**
   * The constructor creates an object of type vehicle, which will control the moving behavior of this connection.
   * This vehicle will be positionend between the given begin and end Vector
   * @param {p5.Vector} begin - first point
   * @param {p5.Vector} end - second point
   */
  constructor(begin, end) {
    this.begin = begin.copy();
    this.end = end.copy();

    const dVec = p5.Vector.sub(end, begin);
    this.dir = dVec.copy();
    this.dir.mult(0.5);
    dVec.mult(0.5);
    const center = p5.Vector.add(begin, dVec);
    this.vehicle = new Vehicle(center.x, center.y);
  }

  fleeScreen(fleeScreen) {
    this.vehicle.fleeScreen(fleeScreen);
  }

  applyForce(f) {
    this.vehicle.applyForce(f);
  }

  behaviors() {
    this.vehicle.behaviors();
  }

  isOffscreen() {
    return this.vehicle.isOffscreen();
  }

  update() {
    this.vehicle.update(this.begin, this.end);
  }

  show() {
    strokeWeight(3);
    const begin = p5.Vector.sub(this.vehicle.pos, this.dir);
    const end = p5.Vector.add(this.vehicle.pos, this.dir);
    line(begin.x, begin.y, end.x, end.y);
  }
}
