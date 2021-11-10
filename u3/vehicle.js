class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.target = this.pos.copy();
    this.vel = createVector();
    this.acc = createVector();
    this.maxspeed = 5;
    this.maxforce = 0.3;
    this.fleeingScreen = false;
    this.up = false;
  }

  fleeScreen(flee) {
    this.fleeingScreen = flee;
    this.vel = createVector();
    this.acc = createVector();
  }

  isOffscreen() {
    return this.pos.y < 0 || this.pos.y > height;
  }

  behaviors() {
    if (!this.fleeingScreen) {
      const arrive = this.arrive();
      arrive.mult(1);
      this.applyForce(arrive);

      const mouse = createVector(mouseX, mouseY);
      const flee = this.flee(mouse);
      flee.mult(5);
      this.applyForce(flee);
    } else {
      const fleeScreen = this.fleeScreenForce();
      fleeScreen.mult(1);
      this.applyForce(fleeScreen);
    }
  }

  arrive() {
    const desired = p5.Vector.sub(this.target, this.pos);
    const d = desired.mag();
    let speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  fleeScreenForce() {
    this.up = this.pos.y < height / 2;
    if (this.fleeingScreen) {
      return createVector(0, this.up ? -1.5 : 1.5);
    } else {
      return nullVector;
    }
  }

  flee(target) {
    const desired = p5.Vector.sub(target, this.pos);
    const d = desired.mag();
    const dx = abs(target.x - this.pos.x);
    const dy = abs(target.y - this.pos.y);
    const tdy = abs(target.y - this.target.y);
    if (
      dx < 100 &&
      dx > -100 &&
      dy < 1.5 + 1.25 * tdy &&
      dy > -(1.25 * tdy) - 1.5
    ) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      const steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return nullVector;
    }
  }

  applyForce(f) {
    this.acc.add(createVector(0, f.y));
  }

  update(begin, end) {
    this.pos.add(this.vel);
    begin.add(this.vel);
    end.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    stroke(0, 255, 0);
    strokeWeight(3);
    point(this.pos.x, this.pos.y);
    // line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }
}
