function setup() {
  createCanvas(400, 400);
  // frameRate(5);

  angleMode(DEGREES);
  
  mustUpdate = false;
  startedIFS = false;
  frameBeforeStart = false;
  pausedIFS = false;

  repeatIFS = 30;
  
  xSlider = createSlider(-1.0, 1.0, 0.0, 0.0);
  ySlider = createSlider(-1.0, 1.0, 0.0, 0.0);
  scaleSlider = createSlider(0.0, 1.0, 1.0, 0.0);
  rotationSlider = createSlider(0.0, 360.0, 0.0, 1.0);
  
  xSlider.mousePressed(updateOn);
  ySlider.mousePressed(updateOn);
  scaleSlider.mousePressed(updateOn);
  rotationSlider.mousePressed(updateOn);
  xSlider.mouseReleased(updateOff);
  ySlider.mouseReleased(updateOff);
  scaleSlider.mouseReleased(updateOff);
  rotationSlider.mouseReleased(updateOff);
  
  // TODO WEIGHTS!!!
  
  addSquareButton = createButton("Add a square");
  addSquareButton.mousePressed(addSquare);

  clearButton = createButton("Clear");
  clearButton.mousePressed(clearIFS);

  pauseButton = createButton("Pause");
  pauseButton.mousePressed(pauseIFS);
  pauseButton.attribute("disabled", "true");
  
  startButton = createButton("Start");
  startButton.mousePressed(startIFS);
  
  s1 = new Square();
  squares = [];
  squares.push(s1);
  addSquare();

  currentPoint = new Point(random()*2 - 1, random()*2 - 1);

  console.log(currentPoint.x + " " + currentPoint.y);
}

function draw() {
  if(!startedIFS) background(255);
  
  translate(width/2.0, height/2.0);
  scale(0.9);
  
  /*
  
  // Testing
  h1.scale = sin(frameCount%360)/2.0 + 0.5;
  h1.rotation = frameCount%360;
  h1.translation.x = 40*cos(frameCount%360);
  h1.translation.y = 40*sin(frameCount%360);
  
  */

  if(startedIFS) {
    // TODO WEIGHTS!!!
    stroke(0);
    strokeWeight(3);

    for(let i = 0; i < repeatIFS; i++) {
      point(currentPoint.x, currentPoint.y);

      currentPoint = randomTransformPoint(currentPoint);
      console.log(currentPoint.x + " " + currentPoint.y);
    }

    console.log("ifs started!");
  }

  if(mustUpdate) updateSquare();
  
  if(!startedIFS) drawSquares();

}

function startIFS() {
  // startedIFS = true;
  frameBeforeStart = true;
  startButton.html("Reset");
  startButton.mousePressed(endIFS);

  xSlider.attribute("disabled", "true");
  ySlider.attribute("disabled", "true");
  rotationSlider.attribute("disabled", "true");
  scaleSlider.attribute("disabled", "true");
  addSquareButton.attribute("disabled", "true");
  clearButton.attribute("disabled", "true");

  pauseButton.removeAttribute("disabled");
}

function endIFS() {
  startedIFS = false;
  startButton.html("Start");
  startButton.mousePressed(startIFS);

  clearIFS();
}

function clearIFS() {
  squares.length = 0;
  squares.push(s1);
  addSquare();

  xSlider.removeAttribute("disabled");
  ySlider.removeAttribute("disabled");
  rotationSlider.removeAttribute("disabled");
  scaleSlider.removeAttribute("disabled");
  addSquareButton.removeAttribute("disabled");
  clearButton.removeAttribute("disabled");

  currentPoint = new Point(random()*2 - 1, random()*2 - 1);

  console.log("aaa");
}

function pauseIFS() {
  if(pausedIFS) {
    pauseButton.html("Pause");
    loop();
    pausedIFS = false;
  } else {
    pauseButton.html("Resume");
    noLoop();
    pausedIFS = true;
  }
}

function addSquare() {
  s = new Square();
  xSlider.value(0.0);
  ySlider.value(0.0);
  rotationSlider.value(0.0);
  scaleSlider.value(1.0);

  squares.push(s);
}

function updateSquare() {
  var n = squares.length;

  squares[n-1].translation.x = xSlider.value();
  squares[n-1].translation.y = ySlider.value();
  squares[n-1].rotation = rotationSlider.value();
  squares[n-1].scale = scaleSlider.value();
}

function drawSquares() {
  var a = 255;
  var withDot = true;
  if(frameBeforeStart) {
    a = 64;
    withDot = false;
    frameBeforeStart = false;
    startedIFS = true;
  }

  for(var s in squares) {
    if(s == squares.length - 1) squares[s].drawSquare(255, 0, 0, a, withDot);
    else squares[s].drawSquare(0, 0, 0, a, withDot);
  }
}

function randomTransformPoint(point) {
  let index = floor(random(squares.length));

  return squares[index].transformPoint(currentPoint.x, currentPoint.y);
}

function updateOn() {
  mustUpdate = true;
}

function updateOff() {
  mustUpdate = false;
}