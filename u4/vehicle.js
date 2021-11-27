class Vehicle {
  constructor() {
    this.speed = createVector();
    this.vel = createVector();
    this.acc = createVector();
    this.maxSpeed = 80000;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.speed.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.acc.mult(0);
  }
}
