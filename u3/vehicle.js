/**
 * Base Class which implements a basic steering behavior, which will be used to move the connections
 */
class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.target = this.pos.copy();
    this.yVel = createVector();
    this.xVel = createVector();
    this.acc = createVector();
    this.maxspeed = 5;
    this.maxforce = 0.3;
    this.fleeingScreen = false;
    this.up = false;
  }

  /**
   * Starts the process of fleeing the screen
   * @param {boolean} flee
   */
  fleeScreen(flee) {
    this.fleeingScreen = flee;
    this.yVel = createVector();
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
      const fleeScreenForce = this.fleeScreenForce();
      fleeScreenForce.mult(1);
      this.applyForce(fleeScreenForce);
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
    const steer = p5.Vector.sub(desired, this.yVel);
    steer.x = 0;
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
      const steer = p5.Vector.sub(desired, this.yVel);
      steer.x = 0;
      steer.limit(this.maxforce);
      return steer;
    } else {
      return nullVector;
    }
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update(begin, end) {
    this.pos.y += this.yVel.y;
    this.pos.x += this.xVel.x;
    this.target.x += this.xVel.x;
    this.edges(this.pos);
    this.edges(this.target);
    begin.add(this.yVel);
    end.add(this.yVel);
    this.yVel.add(this.acc);
    this.xVel.x += this.acc.x;
    this.xVel.limit(this.maxspeed);
    this.yVel.limit(this.maxspeed);
    this.acc.mult(0);
  }

  edges(val) {
    if (val.x > width) {
      val.x = 0 + (val.x - width);
    } else if (val.x < 0) {
      val.x = width + val.x;
    }
  }
}
