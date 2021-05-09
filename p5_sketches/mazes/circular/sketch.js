// grid width and height
w = 40;
h = 8;

lx = 0;
ly = 0;

hlx = lx / 2;
hly = ly / 2;

nodes = []

stack = []
visited = []

innerRadius = 0.2;
cellWidth = 0.0;

dfsFinished = false;

function drawLineBetweenIndices(i1, i2) {
  strokeWeight(lx / 2);

  i1x = i1 % w;
  i2x = i2 % w;
  i1y = floor(i1 / w);
  i2y = floor(i2 / w);

  

  // console.log("Point data:");
  // console.log("i1=" + i1 + " i2=" + i2);
  
  if(i1y == i2y) {
    angle1 = lerp(0.0, TWO_PI, i1x / w);
    angle2 = lerp(0.0, TWO_PI, i2x / w);

    arcWidth = lerp(height, innerRadius * height, i2y / h) - 2*cellWidth;

    // console.log("a1=" + angle1 + " a2=" + angle2);
    // console.log("arcWidth=" + arcWidth);

    arc(0, 0, arcWidth, arcWidth, min(angle1, angle2), max(angle1, angle2));
  }else{
    angle = lerp(0.0, TWO_PI, i1x / w);

    p1 = p5.Vector.fromAngle(angle, lerp(height, innerRadius * height, i1y / h)/2 - cellWidth);
    p2 = p5.Vector.fromAngle(angle, lerp(height, innerRadius * height, i2y / h)/2 - cellWidth);
    line(p1.x, p1.y, p2.x, p2.y);
    if(i1x==0 || i1x == w/2) console.log("p1=" + p1 + " p2=" + p2);
  }
}

function setup() {
  createCanvas(400, 400);
  translate(200, 200);
  scale(0.9);
  frameRate(60);
  background(0);

  stroke(255);
  strokeWeight(0.25)

  lx = width / w;
  ly = height / h;
  hlx = lx / 2;
  hly = ly / 2;
  cellWidth = (1 - innerRadius) * height / (4 * h);

  for(let i = 0; i < w; i++) {
    firstPoint = p5.Vector.fromAngle((i + 0.5) * TWO_PI / w, height/2 * innerRadius);
    otherPoint = p5.Vector.fromAngle((i + 0.5) * TWO_PI / w, height/2);
    line(firstPoint.x, firstPoint.y, otherPoint.x, otherPoint.y);
  }

  for(let i = 0; i <= h; i++) {
    noFill();
    circle(0, 0, lerp(height, innerRadius * height, i / h));
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

  translate(200, 200);
  scale(0.9);

  if (!dfsFinished) {
    dfsStep(drawLineBetweenIndices);
  } else {
    line(200/0.9 + 10, 0, 200 - cellWidth, 0);
    line(0, 0, -width * innerRadius / 2 - cellWidth, 0);
    fill(255);
    circle(0, 0, 20);
    noLoop();
  }
}