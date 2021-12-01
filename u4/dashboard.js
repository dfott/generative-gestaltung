const config = {
  hours: {
    maxVal: 24,
    tickDiff: 4,
    getMainValue: (time) => {
      return time.getHours();
    },
    getSubValue: (time) => {
      return time.getMinutes();
    },
    subDivider: 60,
  },
  minutes: {
    maxVal: 60,
    tickDiff: 5,
    getMainValue: (time) => {
      return time.getMinutes();
    },
    getSubValue: (time) => {
      return time.getSeconds();
    },
    subDivider: 60,
  },
  seconds: {
    maxVal: 60,
    tickDiff: 10,
    getMainValue: (time) => {
      return time.getSeconds();
    },
    getSubValue: (time) => {
      return time.getMilliseconds();
    },
    subDivider: 1000,
  },
};

class Dashboard {
  time;

  constructor(colors) {
    this.colors = colors;
    this.mainColor = this.colors.primary.current;
  }

  setTime(time) {
    this.time = time;
  }

  drawLeftSpeedo() {
    const speedoConf = config.hours;
    const main = speedoConf.getMainValue(this.time);
    const sub = speedoConf.getSubValue(this.time);
    push();
    const r = 230;
    translate(-675, 170);
    push();
    rotate(-55);
    fill(this.colors.speedoOuter2.current);
    ellipse(25, -70, r * 2 + 75, r * 2 + 200);
    fill(this.colors.speedoOuter.current);
    ellipse(5, -65, r * 2 + 65, r * 2 + 185);
    fill(this.colors.speedoShadow.current);
    ellipse(0, -75, r * 2 + 25, r * 2 + 150);
    pop();
    fill(this.colors.speedoBackground.current);
    ellipse(0, 0, r * 2, r * 2);
    strokeWeight(10);
    this.drawTicks(0, 0, r, speedoConf.maxVal, speedoConf.tickDiff);
    this.drawNumbers(0, 0, r, speedoConf.maxVal, speedoConf.tickDiff);
    push();
    rotate(
      map(main + sub / speedoConf.subDivider, 0, speedoConf.maxVal, -25, 205)
    );
    stroke(12);
    strokeWeight(12);
    beginShape();
    vertex(0, -10);
    vertex(0, 10);
    vertex(-r + 10, 1.5);
    vertex(-r + 10, -1.5);
    endShape(CLOSE);
    stroke(this.mainColor);
    strokeWeight(10);
    beginShape();
    vertex(0, -3);
    vertex(0, 3);
    vertex(-r + 20, 0.25);
    vertex(-r + 20, -0.25);
    endShape(CLOSE);
    pop();
    noFill();
    textSize(100);
    textAlign(CENTER, CENTER);
    fill(51);
    stroke(11);
    ellipse(0, 0, 200, 200);
    fill(this.mainColor);
    textFont(speedoFont);
    text(main, 0, 0);
    pop();
  }

  drawCenterSpeedo() {
    const speedoConf = config.minutes;
    const main = speedoConf.getMainValue(this.time);
    const sub = speedoConf.getSubValue(this.time);
    push();
    const r = 350;
    translate(0, 50);
    fill(this.colors.speedoOuter2.current);
    ellipse(0, -50, r * 2 + 85, r * 2 + 110);
    fill(this.colors.speedoOuter.current);
    ellipse(0, -25, r * 2 + 85, r * 2 + 110);
    fill(this.colors.speedoShadow.current);
    ellipse(0, -25, r * 2 + 50, r * 2 + 75);
    fill(this.colors.speedoBackground.current);
    ellipse(0, 0, r * 2, r * 2);
    strokeWeight(10);
    this.drawTicks(0, 0, r, speedoConf.maxVal, speedoConf.tickDiff);
    this.drawNumbers(0, 0, r, speedoConf.maxVal, speedoConf.tickDiff);
    push();
    rotate(
      map(main + sub / speedoConf.subDivider, 0, speedoConf.maxVal, -25, 205)
    );
    stroke(12);
    strokeWeight(12);
    beginShape();
    vertex(0, -10);
    vertex(0, 10);
    vertex(-r + 10, 1.5);
    vertex(-r + 10, -1.5);
    endShape(CLOSE);
    stroke(this.mainColor);
    strokeWeight(10);
    beginShape();
    vertex(0, -3);
    vertex(0, 3);
    vertex(-r + 20, 0.25);
    vertex(-r + 20, -0.25);
    endShape(CLOSE);
    pop();
    push();
    fill(32);
    stroke(20);
    rotate(180);
    arc(0, 0, 350, 350, -35, 215, CHORD);
    pop();
    noFill();
    textSize(150);
    textAlign(CENTER);
    noStroke();
    fill(51);
    fill(this.mainColor);
    textFont(speedoFont);
    text(main, -10, 50);
    textFont(perlinFont);
    textSize(100);
    fill(51);
    stroke(0);
    text("perlin", 0, 250);
    pop();
  }

  drawRightSpeedo() {
    const speedoConf = config.seconds;
    const main = speedoConf.getMainValue(this.time);
    const sub = speedoConf.getSubValue(this.time);
    push();
    const r = 230;
    translate(675, 170);
    push();
    rotate(55);
    fill(this.colors.speedoOuter2.current);
    ellipse(-25, -70, r * 2 + 75, r * 2 + 200);
    fill(this.colors.speedoOuter.current);
    ellipse(-5, -65, r * 2 + 65, r * 2 + 185);
    fill(this.colors.speedoShadow.current);
    ellipse(0, -75, r * 2 + 25, r * 2 + 150);
    pop();
    fill(this.colors.speedoBackground.current);
    ellipse(0, 0, r * 2, r * 2);
    this.drawTicks(0, 0, r, speedoConf.maxVal, speedoConf.tickDiff, 5, true);
    this.drawNumbers(0, 0, r, speedoConf.maxVal, speedoConf.tickDiff, 5);
    strokeWeight(10);
    push();
    let min = -25;
    if (vehicle.vel.x > 10000) {
      min = 160;
    }
    rotate(
      map(main + sub / speedoConf.subDivider, 0, speedoConf.maxVal, min, 205)
    );
    stroke(12);
    strokeWeight(12);
    beginShape();
    vertex(0, -10);
    vertex(0, 10);
    vertex(-r + 10, 1.5);
    vertex(-r + 10, -1.5);
    endShape(CLOSE);
    stroke(this.mainColor);
    strokeWeight(10);
    beginShape();
    vertex(0, -3);
    vertex(0, 3);
    vertex(-r + 20, 0.25);
    vertex(-r + 20, -0.25);
    endShape(CLOSE);
    pop();
    noFill();
    textSize(100);
    textAlign(CENTER, CENTER);
    fill(51);
    stroke(11);
    ellipse(0, 0, 200, 200);
    fill(this.mainColor);
    textFont(speedoFont);
    text(main, 0, 0);
    pop();
  }

  drawNumbers(x, y, r, step, numDiff) {
    let count = 0;
    for (let i = -25; i <= 207; i += 230 / step) {
      push();
      translate(x, y);
      strokeWeight(4);

      fill(81);
      stroke(41);
      textSize(25);
      textAlign(CENTER, CENTER);
      if (count % numDiff === 0 || count === 0) {
        const x1 = (-r + 70) * cos(i);
        const y1 = (-r + 70) * sin(i);
        text(count, x1, y1);
      }
      pop();
      count++;
    }
  }

  drawTicks(x, y, r, step, tickDiff, tickDiff2, showRedTicks) {
    let count = 0;
    for (let angle = -25; angle <= 207; angle += 230 / step) {
      push();
      translate(x, y);
      strokeWeight(4);
      stroke("white");
      rotate(angle);

      if (showRedTicks && angle > 165) {
        stroke(this.colors.redTicks.current);
      }

      if (count % tickDiff === 0 || count === 0) {
        line(-r + 2, -4, -r + 40, -4);
        line(-r + 2, 4, -r + 40, 4);
      } else if (tickDiff2 && count % tickDiff2 === 0) {
        line(-r + 2, -4, -r + 30, -4);
        line(-r + 2, 4, -r + 30, 4);
      } else {
        line(-r + 2, 0, -r + 20, 0);
      }
      pop();
      count++;
    }
  }
}
