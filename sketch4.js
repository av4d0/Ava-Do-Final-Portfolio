let vid; 
let vScale = 12;

function setup() {
  createCanvas(640,480);
  
  pixelDensity(1);
  rectMode(CENTER);
  
  vid = createCapture(VIDEO, {flipped: true});
  vid.size(width / vScale, height / vScale);
  vid.hide();
  
  noStroke();
}

function draw() {
  background(0, 10);
  vid.loadPixels();
  
  for (let x = 0; x < vid.width; x++) {
    for (let y = 0; y < vid.height; y++) {
      
      let pix = vid.get(x, y);
      let r = pix[0];
      let g = pix[1];
      let b = pix[2];
      
      let brightness = (r + g + b) / 3;
      
      let prevPix = vid.get(x - 1, y);
      let prevBrightness = (prevPix[0] + prevPix[1] + prevPix[2]) / 3;
      
      let colorShift = map(brightness, 0, 255, 0, 100); 
      let sizeShift = map(brightness, 0, 255, 3, vScale * 1.5); 
      
      let shape = int(random(3)); 
      
      let xPos = x * vScale;
      let yPos = y * vScale;
      
      fill(r + colorShift, g - colorShift, b + colorShift, 200); 
      
      if (abs(brightness - prevBrightness) > 40) {
        if (shape == 0) {
          ellipse(xPos, yPos, sizeShift, sizeShift);
        } else if (shape == 1) {
          rect(xPos, yPos, sizeShift, sizeShift);
        } else {
          triangle(
            xPos - sizeShift / 2, yPos + sizeShift / 2,
            xPos + sizeShift / 2, yPos + sizeShift / 2,
            xPos, yPos - sizeShift / 2
          );
        }
      }
    }
  }
  
  vid.updatePixels();
}
