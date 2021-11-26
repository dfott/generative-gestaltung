class Vehicle {
  constructor() {
    this.speed = 0;
    this.vel = 0;
    this.acc = 0;
    // this.maxSpeed = 1000;
  }

  applyForce(f) {
    this.acc += f;
  }

  update() {
    this.speed += this.vel;
    this.vel += this.acc;
    // constrain(this.vel, 0, this.maxSpeed);
    this.acc = 0;
  }
}
