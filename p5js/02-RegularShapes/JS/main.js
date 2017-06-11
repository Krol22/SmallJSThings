const maxR = 105;
const minR = 0;

const offsetX = 0;
const offsetY = 50;

const Sx = 0;
const Sy = 0;

let Shapes = [
    {r: 12, n: 3},
    {r: 20, n: 4},
    {r: 30, n: 5},
    {r: 45, n: 6},
    {r: 60, n: 7},
    {r: 75, n: 8},
    {r: 90, n: 9},
    {r: 105, n: 10},
    {r: 120, n: 11},
    {r: 135, n: 12},
]

let counter = 0;

function setup(){
    // setup code goes here
    let canvas = createCanvas(640, 480);
    canvas.parent('canvas');
    colorMode(HSL, 100);
}

function draw(){
    // draw code goes here
    translate(150, 100);
    clearScreen();
    drawPolygons();
}

function drawPolygons(){
    Shapes.forEach(shape => {
        drawPolygon(Sx, Sy, shape.r, shape.n);
    })
}

function drawPolygon(Sx, Sy, r, n){
    Sx += offsetX;
    Sy += offsetY;
    let angle = TWO_PI / n;
    stroke(color(map(r, 0, maxR, 0, 100), 50, 50));
    strokeWeight(3);
    for(let alpha = (-(PI) / n) + (PI / 2); alpha < TWO_PI - (-(PI) / n) + (PI / 2); alpha += angle){
        let x = Sx + r * cos(alpha);
        let y = Sy + r * sin(alpha);
        let x2 = Sx + r * cos(alpha + angle);
        let y2 = Sy + r * sin(alpha + angle);
        line(x, y, x2, y2);
    }
    drawLine(r, n);
}

function drawLine(r, n){
    let rmin = r - 5;
    counter+= 0.0005;
    if(counter > 360) counter = 0;
    let x = offsetX + rmin * cos(counter * n);
    let y = offsetY + rmin * sin(counter * n);
    let x2 = offsetX + (r - 4) * cos(counter * n);
    let y2 = offsetY + (r - 4) * sin(counter * n);
    stroke(color(100, 0, 0));
    strokeWeight(4);
    line(x, y, x2, y2);
}

function clearScreen() {
    colorMode(RGB);
    noStroke();
    fill(color(255, 255, 255));
    rect(-150, -100, 390, 380);
    colorMode(HSL, 100);
}

