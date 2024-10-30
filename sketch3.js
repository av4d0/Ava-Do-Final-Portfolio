let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 182, 200);
  
  for (let i = 0; i < 20; i++) {
    let b = new Bubble(random(width), random(height), random(20, 60));
    bubbles.push(b);
  }
}

function draw() {
  background(255, 182, 193, 20); 
  
  for (let bubble of bubbles) {
    bubble.applyGravity();
    bubble.move();
    bubble.checkEdges();
    bubble.display();
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
    this.hovered = false;
    this.ySpeed = random(0.5, 1.5);
    this.pulseAmount = 0;
  }
  
  applyGravity() {
    this.y += this.ySpeed;
  }
  
  move() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }
  
  checkEdges() {
    if (this.x < this.r || this.x > width - this.r) {
      this.x = constrain(this.x, this.r, width - this.r);
      this.ySpeed *= -1;
    }
    if (this.y < this.r || this.y > height - this.r) {
      this.y = constrain(this.y, this.r, height - this.r);
      this.ySpeed *= -0.9; 
    }
  }
  
  isMouseOver() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    return d < this.r;
  }
  
  display() {
    if (this.isMouseOver()) {
      this.hovered = true;
      this.color = color(random(150, 255), random(150, 255), random(150, 255));
      this.r = lerp(this.r, 90 + this.pulseAmount, 0.1);
      this.pulseAmount = sin(frameCount * 0.1) * 5; 
    } else {
      this.hovered = false;
      this.r = lerp(this.r, 50, 0.1);
    }
    
    fill(this.color);
    noStroke();
    this.drawHeart(this.x, this.y, this.r); 
  }
  
  drawHeart(x, y, r) {
    beginShape();
    vertex(x, y);
    bezierVertex(x - r / 2, y - r / 2, x - r, y + r / 3, x, y + r);
    bezierVertex(x + r, y + r / 3, x + r / 2, y - r / 2, x, y);
    endShape(CLOSE);
  }
  
  clicked() {
    if (this.isMouseOver()) {
      this.color = color(random(255), random(255), random(255));
    }
  }
}

function mouseDragged() {
  let newBubble = new Bubble(mouseX, mouseY, random(20, 60));
  bubbles.push(newBubble);
}

function mousePressed() {
  for (let bubble of bubbles) {
    bubble.clicked();
  }
}
