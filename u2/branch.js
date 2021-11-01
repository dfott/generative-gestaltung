/**
 * Base class used to display a "Fractal Tree".
 */
class Branch {
  constructor(begin, end) {
    this.begin = begin;
    this.end = end;
    // becomes true after the 'branchOut' method was called
    this.finished = false;
  }

  /**
   * Used to display the branch on a canvas. If the forcefield is active, a jitter is added
   * @param {boolean} isForcefieldActive
   */
  show(isForcefieldActive) {
    stroke(101);
    strokeWeight(8);
    if (isForcefieldActive) {
      this.end.add(this.jitter());
      line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    } else {
      line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }
  }

  /**
   * Calculates the perlin noise for the current branch end position and z-offset and maps the value to simulate a jitter effect for the tree
   * @returns {number}
   */
  jitter() {
    const branchLength = p5.Vector.sub(this.end, this.begin).mag();
    return map(
      noise(this.end.x, this.end.y, zoff),
      0,
      1,
      -branchLength / 300,
      branchLength / 300
    );
  }

  /**
   * Creates a new vector, which is the current branch vector rotated by a given angle and returns it
   * @param {number} angle - angle by which the new vector is rotated by
   * @returns {p5.Vector}
   */
  getNewEnd(angle) {
    const dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(angle);
    dir.mult(0.67);
    return dir;
  }

  /**
   * Creates two new branches, which start at the current branch-end and returns them
   * @returns {[Branch, Branch]}
   */
  branchOut() {
    const dirA = this.getNewEnd(PI / 6);
    const right = new Branch(this.end, p5.Vector.add(this.end, dirA));

    const dirB = this.getNewEnd(-PI / 4);
    const left = new Branch(this.end, p5.Vector.add(this.end, dirB));

    this.finished = true;
    return [left, right];
  }
}
