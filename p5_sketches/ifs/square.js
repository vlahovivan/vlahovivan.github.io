class Square {
  constructor() {
    this.verts = [];

    this.verts.push(new Point(-width/2, height/2));
    this.verts.push(new Point(width/2, height/2));
    this.verts.push(new Point(width/2, -height/2));
    this.verts.push(new Point(-width/2, -height/2));
    
    this.rotation = 0.0;
    this.translation = new Point(0.0, 0.0);
    this.scale = 1.0;
  }
  
  drawSquare(r, g, b, a, withDot) {
    noFill();
    stroke(r, g, b, a);
    strokeWeight(1);
    
    beginShape();
    for(var v in this.verts) {
      let x = this.verts[v].x;
      let y = this.verts[v].y;
      
      let transformedPoint = this.transformPoint(x, y);
      
      if(v==0 && withDot) {
        fill(r, g, b, a);
        circle(transformedPoint.x, transformedPoint.y, 8);
        noFill();
      }
      vertex(transformedPoint.x, transformedPoint.y);
    }
    endShape(CLOSE);
  }

  transformPoint(x, y) {
    let sinth = sin(this.rotation);
    let costh = cos(this.rotation);

    var newX = x*costh - y*sinth;
    var newY = x*sinth + y*costh;
    
    newX *= this.scale;
    newY *= this.scale;
    
    newX += this.translation.x * height/2.0;
    newY += this.translation.y * height/2.0;

    return new Point(newX, newY);
  }  
}