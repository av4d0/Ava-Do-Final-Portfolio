let song;
let playButton;
let amplitude;
let video;  
let orangeColor, redColor;  

function preload() {
  song = loadSound("aanything.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide(); 
  
  amplitude = new p5.Amplitude();
  
  orangeColor = color(255, 165, 0);
  redColor = color(255, 0, 0);
  
  playButton = createButton('Play/Pause');
  playButton.position(width / 2 - 40, height - 50);
  playButton.mousePressed(toggleSong);
}

function draw() {
  let level = amplitude.getLevel();
  
  image(video, 0, 0, width, height);
  
  tint(255, 100, 50);
  image(video, 0, 0, width, height); 
  video.loadPixels();
  for (let i = 0; i < video.pixels.length; i += 4) {
    let r = video.pixels[i];
    let g = video.pixels[i + 1]; 
    let b = video.pixels[i + 2];
    
    video.pixels[i] = r + level * 100;
    video.pixels[i + 1] = g * 0.5;
    video.pixels[i + 2] = b * 0.3;
  }
  video.updatePixels();

  image(video, 0, 0, width, height);
  
  if (song.isPlaying()) {
    let lerpAmount = map(sin(millis() * 0.001), -1, 1, 0, 1);
    
    let heartColor = lerpColor(orangeColor, redColor, lerpAmount);
    
    let heartSize = map(level, 0, 0.3, 50, min(width, height) / 2);
    
    fill(heartColor, 150);
    noStroke();
    
    drawHeart(width / 2, height / 2, heartSize);
  }
  
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  if (song.isPlaying()) {
    text('listen to your heart beating', width / 2, height / 4);
  } else {
  }
}

function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  playButton.position(width / 2 - 40, height - 50);
}
