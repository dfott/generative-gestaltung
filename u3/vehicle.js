class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.target = this.pos.copy();
    this.vel = createVector();
    this.acc = createVector();
    this.maxspeed = 5;
    this.maxforce = 0.5;
  }

  behaviors() {

      const arrive = this.arrive();
      arrive.mult(1);
      this.applyForce(arrive);


    const mouse = createVector(mouseX, mouseY);
    const flee = this.flee(mouse);

    flee.mult(5);

    this.applyForce(flee);
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

  flee(target) {
    const desired = p5.Vector.sub(target, this.pos);
    const d = desired.mag();
    const dx = abs(target.x - this.pos.x);
    const dy = abs(target.y - this.pos.y);
    const tdy = abs(target.y - this.target.y);
    if (dx < 60 && dx > -60 && dy < (1.25*tdy) && dy > -(1.25*tdy)) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      const steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  applyForce(f) {
    this.acc.add(createVector(0, f.y));
  }

  update(begin, end) {
    this.pos.add(this.vel);
    begin.add(this.vel)
    end.add(this.vel)
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    stroke(255);
    strokeWeight(3);
    line(
      this.begin.x,
      this.begin.y,
      this.end.x,
      this.end.y
    )
    // point(this.pos.x, this.pos.y);

  }
}
