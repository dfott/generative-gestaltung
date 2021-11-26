class Indicators {
  isIndicatorOn = false;
  _interval;

  constructor(activeColor, inactiveColor) {
    this.activeColor = activeColor;
    this.inactiveColor = inactiveColor;
  }

  turnOnIndicatorAnimation() {
    this._interval = setInterval(() => {
      this.isIndicatorOn = !this.isIndicatorOn;
    }, 1000);
  }

  turnOffIndicatorAnimation() {
    clearInterval(this._interval);
  }

  drawLeft() {
    fill(this.isIndicatorOn ? this.activeColor : this.inactiveColor);
    push();
    beginShape();
    translate(-375, -250);
    vertex(0, 0);
    vertex(-100, 0);
    vertex(-100, -20);
    vertex(-150, 10);
    vertex(-100, 40);
    vertex(-100, 20);
    vertex(0, 20);
    endShape(CLOSE);
    pop();
  }

  drawRight() {
    push();
    beginShape();
    fill(this.inactiveColor);
    translate(375, -250);
    vertex(0, 0);
    vertex(100, 0);
    vertex(100, -20);
    vertex(150, 10);
    vertex(100, 40);
    vertex(100, 20);
    vertex(0, 20);
    endShape(CLOSE);
    pop();
  }
}
