class Branch {
  constructor(begin, end) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
  }

  show() {
    stroke(101);
    strokeWeight(1);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  branchA() {
    const dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(PI / 6);
    dir.mult(0.67);
    const newEnd = p5.Vector.add(this.end, dir);
    const right = new Branch(this.end, newEnd);
    return right;
  }

  branchB() {
    const dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-PI / 4);
    dir.mult(0.67);
    const newEnd = p5.Vector.add(this.end, dir);
    const left = new Branch(this.end, newEnd);
    return left;
  }
}
