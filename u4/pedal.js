class Pedal {
  props = {
    x: 350,
    y: 600,
    rx: 250,
    ry: 400,
  };

  constructor() {}

  draw() {
    push();
    rectMode(CENTER);
    translate(this.props.x, this.props.y);
    fill(61);
    stroke(21);
    strokeWeight(10);
    rect(0, 0, this.props.rx, this.props.ry, 20);
    line(-20, 50, -20, -200);
    line(20, 50, 20, -200);
    line(-80, 50, -80, -200);
    line(80, 50, 80, -200);
    pop();
  }

  showPedalCursor() {
    if (this.isCursorInsidePedal()) {
      cursor("pointer");
    } else {
      cursor("default");
    }
  }

  isCursorInsidePedal() {
    const xmin = width / 2 + this.props.x - this.props.rx / 2;
    const xmax = width / 2 + this.props.x + this.props.rx / 2;
    const ymin = height / 2 + this.props.y - this.props.ry / 2;
    const ymax = height / 2 + this.props.y + this.props.ry / 2;
    return mouseX >= xmin && mouseX <= xmax && mouseY >= ymin && mouseY <= ymax;
  }
}
