let zoff = 0;

const tree = [];
const leaves = [];
const stumpLength = 25;
let clickCount = 0;
let isForcefieldActive = false;
let sound;

let leavesCanvas;

function setup() {
  createCanvas(windowWidth, windowHeight);
  leavesCanvas = createGraphics(windowWidth, windowHeight);

  sound = loadSound("assets/wind.wav");

  const stumpBegin = createVector(width / 2, height);
  const stumpEnd = createVector(width / 2, height - stumpLength);
  const root = new Branch(stumpBegin, stumpEnd);

  tree[0] = root;
}

function growTree() {
  for (let i = tree.length - 1; i >= 0; i--) {
    const branch = tree[i];
    if (!branch.finished) {
      tree.push(...branch.branchOut());
    }
    branch.finished = true;
  }
}

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
  textSize(5);
  fill("darkblue");
  text("ENTERING AUTUMN IN", width / 4, height / 4);
  text(
    `${8 - clickCount} ${8 - clickCount > 1 ? "CLICKS" : "CLICK"}`,
    width / 2.5,
    height / 4 + 10
  );
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
  leaves.forEach((leaf) => {
    leaf.show();
    if (isForcefieldActive) {
      leaf.follow(zoff);
      leaf.update();
    }
  });
  zoff += 0.01;
}
