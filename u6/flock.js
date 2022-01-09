class Flock {
  constructor() {
    // An array for all the boids
    this.boids = []; // Initialize the array
    this.grid = [];
    this.emptyGrid();
  }

  run() {
    for (let boid of this.boids) {
      let x = Math.floor(boid.position.x / widthRes);
      let y = Math.floor(boid.position.y / heightRes);
      boid.run(this.grid[x][y]); // Passing the entire list of boids to each boid individually
    }
    this.boids = this.boids.filter((boid) => !boid.eaten);
  }

  addBoid(b) {
    this.boids.push(b);
  }

  emptyGrid() {
    this.grid = Array.from({ length: gridSize }).map((i) => {
      return Array.from({ length: gridSize }).map((i2) => {
        return [];
      });
    });
  }

  updateGrid() {
    this.emptyGrid();
    this.boids.forEach((boid) => {
      const x = Math.floor(boid.position.x / widthRes);
      const y = Math.floor(boid.position.y / heightRes);
      for (let n = -1; n <= 1; n++) {
        for (let m = -1; m <= 1; m++) {
          if (
            x + n >= 0 &&
            x + n < gridSize &&
            y + m >= 0 &&
            y + m < gridSize
          ) {
            this.grid[x + n][y + m].push(boid);
          }
        }
      }
    });
  }
}
