class Boid {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.type = "";
    this.r = 3.0;
    this.maxspeed = 3; // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
    this.eaten = false;

    this.cohesionDist = 50;
    this.alignDist = 50;
    this.seperateDist = 25;
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // We accumulate a new acceleration each time based on three rules
  flock(boids) {
    let sep = this.separate(boids); // Separation
    let ali = this.align(boids); // Alignment
    let coh = this.cohesion(boids); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
  }

  render() {
    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading();
    fill(127);
    stroke(200);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    imageMode(CENTER);
    image(fishImg, 0, 0, 160, 120);
    // beginShape();
    // vertex(0, -this.r * 2);
    // vertex(-this.r, this.r * 2);
    // vertex(this.r, this.r * 2);
    // endShape(CLOSE);
    pop();
  }

  // Wraparound
  borders() {
    if (this.position.x < 0) this.position.x = windowWidth - 1;
    if (this.position.y < 0) this.position.y = windowHeight - 1;
    if (this.position.x > windowWidth + 0) this.position.x = 1;
    if (this.position.y > windowHeight + 0) this.position.y = 1;
  }

  // Separation
  // Method checks for nearby boids and steers away
  separate(boids) {
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (d > 0 && d < this.seperateDist && boids[i].type === this.type) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(boids) {
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < this.alignDist && boids[i].type === this.type) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  cohesion(boids) {
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < this.cohesionDist && boids[i].type === this.type) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }
}

class Fish extends Boid {
  constructor(x, y) {
    super(x, y);
    this.type = "fish";
  }

  flee(boids) {
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (d > 0 && d < 200 && boids[i].type !== this.type) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  flock(boids) {
    super.flock(boids);
    const flee = this.flee(boids);
    this.applyForce(flee);
  }

  run(boids) {
    this.wasEaten(boids);
    super.run(boids);
  }

  wasEaten(boids) {
    const fishRadius = {
      piranha: 15,
      shark: 40,
    };
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (d > 0 && boids[i].type !== "fish") {
        this.eaten = d < fishRadius[boids[i].type];
      }
    }
  }
}

class Shark extends Boid {
  constructor(x, y) {
    super(x, y);
    this.type = "shark";

    this.seperateDist = 400;
    this.alignDist = 0;
    this.cohesionDist = 0;
  }

  render() {
    let theta = this.velocity.heading();
    fill(127);
    stroke(200);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    imageMode(CENTER);
    image(sharkImg, 0, 0, 270, 150);
    pop();
  }

  flock(boids) {
    super.flock(boids);
    const pur = this.pursuit(boids);
    this.applyForce(pur);
  }

  pursuit(boids) {
    let neighbordist = 100;
    let nearest = {};
    let min = Number.MAX_VALUE;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist && boids[i].type === "fish") {
        if (d < min) {
          nearest = boids[i];
          min = d;
        }
      }
    }
    if (nearest.position) {
      this.maxspeed = 5;
      const seek = this.seek(nearest.position); // Steer towards the location
      // seek.normalize();
      return seek;
    } else {
      this.maxspeed = 1;

      return createVector(0, 0);
    }
  }
}

class Piranha extends Boid {
  constructor(x, y) {
    super(x, y);
    this.type = "piranha";
    // this.maxspeed = 0.8;
    this.maxforce = 0.1;
    this.inPursuit = false;

    this.cohesionDist = 250;
    this.alignDist = 250;
  }

  flock(boids) {
    super.flock(boids);
    const pur = this.pursuit(boids);
    this.applyForce(pur);
  }

  render() {
    let theta = this.velocity.heading();
    fill(127);
    stroke(200);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    imageMode(CENTER);
    if (this.inPursuit) {
      image(piranhaActiveImg, 0, 0, 150, 100);
    } else {
      image(piranhaImg, 0, 0, 150, 100);
    }
    pop();
  }

  pursuit(boids) {
    let neighbordist = 75;
    let nearest = {};
    let min = Number.MAX_VALUE;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist && boids[i].type === "fish") {
        if (d < min) {
          nearest = boids[i];
          min = d;
        }
      }
    }
    if (nearest.position) {
      this.inPursuit = true;
      this.maxspeed = 5;
      const seek = this.seek(nearest.position); // Steer towards the location
      // seek.normalize();
      // seek.mult(2);
      return seek;
    } else {
      this.maxspeed = 1;

      this.inPursuit = false;
      return createVector(0, 0);
    }
  }
}
