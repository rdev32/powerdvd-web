let x;
let y;

let xspeed;
let yspeed;

let dvd;

let r, g, b;

function preload() {
  dvd = loadImage('assets\\logo.png');
}

function setup() {
  createCanvas(windowWidth-10, windowHeight-10);
  x = random(width);
  y = random(height);
  xspeed = 10;
  yspeed = 10;
  pickColor();
}

function pickColor() {
  r = random(190, 220);
  g = random(190, 220);
  b = random(190, 220);
}

function draw() {
  background(0); 
  tint(r, g, b);
  image(dvd, x, y);

  x = x + xspeed;
  y = y + yspeed;

  if (x + dvd.width >= width) {
    xspeed = -xspeed;
    x = width - dvd.width;
    pickColor();
  } else if (x <= 0) {
    xspeed = -xspeed;
    x = 0;
    pickColor();
  }

  if (y + dvd.height >= height) {
    yspeed = -yspeed;
    y = height - dvd.height;
    pickColor();
  } else if (y <= 0) {
    yspeed = -yspeed;
    y = 0;
    pickColor();
  }
}
