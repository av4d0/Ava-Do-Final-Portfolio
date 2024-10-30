let tiles = [];
let numTilesX = 10;
let numTilesY = 10;
let tileWidth, tileHeight;

function preload() {
  img = loadImage('orch1d.png');
}

function setup() {
  createCanvas(2000, 1000);
  tileWidth = width / numTilesX;
  tileHeight = height / numTilesY;
  
  for (let x = 0; x < numTilesX; x++) {
    for (let y = 0; y < numTilesY; y++) {
      let tile = new Tile(x * tileWidth, y * tileHeight, tileWidth, tileHeight, x, y);
      tiles.push(tile);
    }
  }
}

function draw() {
  background(0);
  
  for (let tile of tiles) {
    tile.update();
    tile.display();
  }
}

class Tile {
  constructor(x, y, w, h, imgX, imgY) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imgX = imgX;
    this.imgY = imgY;
    this.hovered = false;
    this.rotation = 0;
    this.colorOffset = 0;
    this.targetX = x;
    this.targetY = y;
  }
  
  isMouseOver() {
    return mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
  }
  
  update() {
  
    if (this.isMouseOver()) {
      this.hovered = true;
      this.rotation += 0.05;
      this.colorOffset = 100;
    } else {
      this.hovered = false;
      this.rotation *= 0.9; 
      this.colorOffset *= 0.9; 
    }
    
    this.x += (this.targetX - this.x) * 0.05;
    this.y += (this.targetY - this.y) * 0.05;
  }

  display() {
    push();
    translate(this.x + this.w / 2, this.y + this.h / 2);
    rotate(this.rotation);
    tint(255, 255 - this.colorOffset); 
    
    if (this.hovered) {
      let zoomFactor = 1.2;
      image(
        img,
        -this.w * zoomFactor / 2,
        -this.h * zoomFactor / 2,
        this.w * zoomFactor,
        this.h * zoomFactor,
        this.imgX * tileWidth,
        this.imgY * tileHeight,
        tileWidth,
        tileHeight
      );
    } else {
      image(
        img,
        -this.w / 2,
        -this.h / 2,
        this.w,
        this.h,
        this.imgX * tileWidth,
        this.imgY * tileHeight,
        tileWidth,
        tileHeight
      );
    }
    
    pop();
  }
  
  clicked() {
    if (this.isMouseOver()) {
      this.targetX = this.x + random(-50, 50);
      this.targetY = this.y + random(-50, 50);

      
      for (let tile of tiles) {
        let d = dist(this.x, this.y, tile.x, tile.y);
        if (d < 100) {
          tile.targetX += random(-20, 20);
          tile.targetY += random(-20, 20);
        }
      }
    }
  }
}

function mousePressed() {
  for (let tile of tiles) {
    tile.clicked();
  }
}
