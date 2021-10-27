class Branch {
  constructor(begin, end) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
  }

  show(zoff) {
    stroke(101);
    strokeWeight(1);
    if (zoff) {
      this.end.add(this.jitter());
      line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    } else {
      line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }
  }

  jitter() {
    const branchLength = p5.Vector.sub(this.end, this.begin).mag();
    return map(
      noise(this.end.x, this.end.y, zoff),
      0,
      1,
      -branchLength / 500,
      branchLength / 500
    );
  }

  getNewEnd(angle) {
    const dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(angle);
    dir.mult(0.67);
    return dir;
  }

  branchOut() {
    const dirA = this.getNewEnd(PI / 6);
    const right = new Branch(this.end, p5.Vector.add(this.end, dirA));

    const dirB = this.getNewEnd(-PI / 4);
    const left = new Branch(this.end, p5.Vector.add(this.end, dirB));

    return [left, right];
  }
}
