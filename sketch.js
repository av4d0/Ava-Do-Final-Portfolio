let title, paragraph, myCanvas; 

function setup() {
  myCanvas = createCanvas(200, 100);
  
// these allows us to grab a dom element from the html page 
  title = select("#id1");
  paragraph = select("#id2")
  
}

let x = 0, y = 0;
function draw() {
  
  title.position(100,y);
  paragraph.position(x,y);
  
  myCanvas.position(windowWidth-y,x);
  
  print(myCanvas.position());
  
  myCanvas.style("border-style:dotted; border-    color:green; border-width: 5px");
  
  
  clear()
  ellipse(40,40,x,40);
  
  x++;
  y++;
  
 
}