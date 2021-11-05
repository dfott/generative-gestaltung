let font;
let points;
let vehicles = [];
const letters = [];

function preload() {
  font = loadFont("RobotoMono-Regular.ttf");
}

let conns = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  textFont(font);
  textSize(192);
  fill(255);
  noStroke();
  //   text("train", 100, 200);

  const chars = "train".split("");
  // const chars = "t".split("");
  let count = 0;
  chars.forEach((c) => {
    points = font.textToPoints(c, 200 + count, height / 2);
    count += 125;
    letters.push(new Letter(points, "blue"));
  });
  conns.push(
    new Connection(createVector(200, 200), createVector(200, 230))
  );
  conns.push(
    new Connection(createVector(200, 250), createVector(200, 280))
  );

}

function draw() {
  background(51);
  stroke('lightblue')
  noFill()
  // ellipse(mouseX, mouseY, 170, 170)
  letters.forEach((letter) => {
    letter.show();
  });
  // conns.forEach(c => {
  //   c.behaviors();
  //   c.update();
  //   c.show();
  // })
}
