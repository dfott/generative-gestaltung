/**
 * Base Class used to display a single letter
 */
class Letter {
  constructor(points, color) {
    this.connections = [];
    this.color = color;
    this.initConnections(points);
  }

  initConnections(points) {
    for (let i = 0; i < points.length; i += 2) {
      const pt1 = points[i];
      const pt2 = points[i + 1];
      if (pt1 && pt2) {
        this.connections.push(
          new Connection(createVector(pt1.x, pt1.y), createVector(pt2.x, pt2.y))
        );
      }
    }
  }

  applyForce(f) {
    this.connections.forEach((c) => c.applyForce(f));
  }

  fleeScreen(fleeScreen) {
    this.connections.forEach((c) => c.fleeScreen(fleeScreen));
  }

  isOffscreen() {
    return this.connections.every((c) => c.isOffscreen());
  }

  show(hide) {
    this.connections.forEach((c) => {
      stroke(this.color);
      c.update();
      c.behaviors();
      if (!hide) {
        c.show();
      }
    });
  }
}
