class Particle {
  constructor(x, y, color, index) {
    this.pos = createVector(x, y);
    this.color = color;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.lifespan = 255;
    this.index = index;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  isDone() {}

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {}
}

class LetterParticle extends Particle {
  constructor(pos, target, color) {
    super(pos.x, pos.y, color, 0);
    this.target = target;
    this.vel = p5.Vector.random2D();
    this.r = 8;
    this.maxspeed = 10;
    this.maxforce = 1;
  }

  behaviors() {
    const arrive = this.arrive(this.target);
    this.applyForce(arrive);
  }

  arrive(target) {
    const desired = p5.Vector.sub(target, this.pos);
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

  applyForce(f) {
    this.acc.add(f);
  }

  isDone() {
    return this.lifespan <= 0;
  }

  update() {
    this.behaviors();
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.lifespan -= 0.5;
  }

  show() {
    if (this.lifespan >= 0) {
      const randomNum = random(-5, 5);
      this.color = color(
        this.color.levels[0] + randomNum,
        this.color.levels[1] + randomNum,
        this.color.levels[2] + randomNum,
        this.lifespan
      );
      stroke(this.color);
      strokeWeight(this.r);
      point(this.pos.x, this.pos.y);
    }
  }
}

class ExplodingParticle extends Particle {
  constructor(x, y, color, index) {
    super(x, y, color, index);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 6));
  }

  isDone() {
    return this.lifespan <= 0;
  }

  show() {
    const size = random(2, 8);
    stroke(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      this.lifespan
    );
    strokeWeight(size);
    point(this.pos.x, this.pos.y);
  }

  update() {
    this.lifespan -= random(2, 5);
    super.update();
  }
}

class SlowlyExplodingParticle extends ExplodingParticle {
  constructor(x, y, color, index) {
    super(x, y, color, index);
  }

  update() {
    this.vel.mult(0.9);
    super.update();
  }

  show() {
    const randomNum = random(-20, 20);
    this.color = color(
      this.color.levels[0] + randomNum,
      this.color.levels[1] + randomNum,
      this.color.levels[2] + randomNum
    );
    super.show();
  }
}

class OneSideExplodingParticle extends SlowlyExplodingParticle {
  constructor(x, y, col, index) {
    super(x, y, col, index);
    this.color = color(random(125, 255), random(125, 255), 0);
    if (index >= 0.5) {
      this.vel = createVector(random(-10), random(-8, -4));
    } else {
      this.vel = createVector(random(10), random(-8, -4));
    }
  }

  update() {
    this.vel.mult(1.1);
    super.update();
  }
}

class CrazyExplodingParticle extends SlowlyExplodingParticle {
  constructor(x, y, color, index) {
    super(x, y, color, index);
    this.vel.mult(20);
  }
}

class HeartParticle extends SlowlyExplodingParticle {
  constructor(x, y, color, index) {
    // Formula: https://blogs.lcps.org/academiesonline/2021/02/13/the-equation-of-the-heart/
    const newX = 16 * pow(sin(index), 3);
    const newY = -(
      13 * cos(index) -
      5 * cos(2 * index) -
      2 * cos(3 * index) -
      cos(4 * index)
    );
    const newPos = createVector((newX + x) * 2, (newY + y) * 2);
    const centeredPos = p5.Vector.sub(newPos, createVector(x, y));

    super(centeredPos.x, centeredPos.y, color, index);
  }

  update() {
    this.vel.mult(0.2);
    super.update();
  }
}

class RocketParticle extends Particle {
  constructor(x, y, color, index) {
    super(x, y, color, index);
    this.vel = createVector(random(-5, 5), random(-15, -10));
    this.startingVel = this.vel.copy();
  }

  isDone() {
    return this.vel <= 0;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(
      this.pos.angleBetween(
        p5.Vector.add(
          this.pos,
          p5.Vector.mult(this.startingVel, this.startingVel.x > 0 ? -40 : 40)
        )
      )
    );
    imageMode(CENTER);
    image(rocketImg, 0, 0, 15, 30);
    pop();
  }
}
