// grid width and height
w = 20;
h = 20;

lx = 0;
ly = 0;

hlx = lx / 2;
hly = ly / 2;

nodes = []

stack = []
visited = []

dfsFinished = false;

function drawLineBetweenIndices(i1, i2) {
  strokeWeight(lx / 2);

  i1x = i1 % w;
  i2x = i2 % w;
  i1y = floor(i1 / w);
  i2y = floor(i2 / w);

  line(i1x * lx + hlx, i1y * ly + hly, i2x * lx + hlx, i2y * ly + hly);
}

function setup() {
  createCanvas(400, 400);
  frameRate(60);
  background(0);

  stroke(255);
  strokeWeight(0.25)

  lx = width / w;
  ly = height / h;
  hlx = lx / 2;
  hly = ly / 2;

  if (w < 50 && h < 50) {
    for (let i = 1; i < w; i++) {
      line(i * width / w, 0, i * width / w, height);
    }
    for (let i = 1; i < h; i++) {
      line(0, i * height / h, width, i * height / h)
    }
  }


  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      let index = i * w + j;
      let value = random(1.0);

      let t = new TreeNode(index, value);
      nodes.push(t);
    }
  }

  for (let i = 0; i < w * h; i++) {
    if (i % w > 0) nodes[i].neighbours.push(nodes[i - 1]);
    if (i % w < w - 1) nodes[i].neighbours.push(nodes[i + 1]);
    if (floor(i / w) > 0) nodes[i].neighbours.push(nodes[i - w]);
    if (floor(i / w) < h - 1) nodes[i].neighbours.push(nodes[i + w]);

    nodes[i].neighbours.sort((a, b) => (a.value - b.value));

    visited.push(false);
  }

  stack.push(0);
}

function draw() {
  if (!dfsFinished) {
    dfsStep(drawLineBetweenIndices);
  } else {
    line(-hlx, hly, hlx, hly);
    line(width - hlx, height - hly, width + hlx, height - hly);
    noLoop();
  }
}