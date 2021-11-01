/*
  Quellen:

  - Konzept eines Forcefields und der Partikel (Leaf)
    Daniel Shiffman: Coding Challenge #24: Perlin Noise Flow Field
    Video auf YouTube: https://youtu.be/BjoM9oKOAKY

  - Konzept eines wachsenden Fractal Trees
    Daniel Shiffman: Coding Challenge #15: Object Oriented Fractal Trees
    Video auf YouTube: https://youtu.be/fcdNSZ9IzJM

  - Konzept für eine Optimierung der Framerate
    Edzard Höfig: 21WS GG - 12 Tipps
    Video auf YouTube: https://youtu.be/jq4EUSCMPXg
*/

let zoff = 0;

const tree = [];
const leaves = [];
const stumpLength = 150;
let clickCount = 0;
let isForcefieldActive = false;
let sound;
let leafHeadImages;

let leafHeadCanvas;
let leavesCanvas;

function setup() {
  createCanvas(windowWidth, windowHeight);
  leavesCanvas = createGraphics(windowWidth, windowHeight);
  leafHeadCanvas = createGraphics(windowWidth, windowHeight);

  // Quelle Bild: https://pixabay.com/vectors/autumn-colours-fall-leaf-leaves-2027870
  leafHeadImages = [
    loadImage("assets/leaf1.svg"),
    loadImage("assets/leaf2.svg"),
    loadImage("assets/leaf3.svg"),
    loadImage("assets/leaf4.svg"),
    loadImage("assets/leaf5.svg"),
  ];

  // Quelle Audio: https://freesound.org/people/piwilliwillski/sounds/585288/
  sound = loadSound("assets/wind.wav");
  sound.setVolume(0.25);
  sound.setLoop(true);

  const stumpBegin = createVector(width / 2, height);
  const stumpEnd = createVector(width / 2, height - stumpLength);
  const root = new Branch(stumpBegin, stumpEnd);

  tree[0] = root;
}

function draw() {
  background("lightblue");
  image(leavesCanvas, 0, 0);
  if (!isForcefieldActive) {
    drawHeaderText();
  }
  tree.forEach((tree) => {
    if (isForcefieldActive) {
      tree.show(zoff);
    } else {
      tree.show();
    }
  });
  image(leafHeadCanvas, 0, 0);
  leafHeadCanvas.clear();
  leaves.forEach((leaf) => {
    leaf.show();
    if (isForcefieldActive) {
      leaf.follow(zoff);
      leaf.update();
    }
  });
  zoff += 0.01;
}

/**
 * Calls the `branchOut` method for every "outer" branch.
 * It creates two additional branches, which start at the end of the specific branch
 */
function growTree() {
  for (let i = tree.length - 1; i >= 0; i--) {
    const branch = tree[i];
    if (!branch.finished) {
      tree.push(...branch.branchOut());
    }
  }
}

/**
 * Creates a leaf for every "outer" branch, for which the `branchOut` method was not called
 */
function createLeaves() {
  for (let i = 0; i < tree.length; i++) {
    if (!tree[i].finished) {
      const leaf = tree[i].end.copy();
      leaves.push(new Leaf(leaf.x, leaf.y));
    }
  }
}

function mousePressed() {
  if (clickCount < 7) {
    growTree();
  }
  clickCount++;
  if (clickCount === 7) {
    createLeaves();
  }
  if (clickCount === 8) {
    sound.play();
    isForcefieldActive = true;
  }
}

function drawHeaderText() {
  noStroke();
  textSize(25);
  fill("darkblue");
  textAlign(CENTER);
  text("ENTERING AUTUMN IN", width / 2, height / 3);
  text(
    `${8 - clickCount} ${8 - clickCount > 1 ? "CLICKS" : "CLICK"}`,
    width / 2,
    height / 2.5
  );
}
