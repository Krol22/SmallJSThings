const maxR = 105;
const minR = 0;

function setup(){
    // setup code goes here
    let canvas = createCanvas(640, 480);
    canvas.parent('canvas');
    colorMode(HSL, 100);
}

function draw(){
    // draw code goes here
    translate(150, 100);
    drawPolygon(0, 0, 12, 3);
    drawPolygon(0, 0, 20, 4);
    drawPolygon(0, 0, 30, 5);
    drawPolygon(0, 0, 45, 6);
    drawPolygon(0, 0, 60, 7);
    drawPolygon(0, 0, 75, 8);
    drawPolygon(0, 0, 90, 9);
    drawPolygon(0, 0, 105, 10);
}

function drawPolygon(Sx, Sy, r, n){
    let angle = TWO_PI / n;
    stroke(color(map(r, 0, maxR, 0, 100), 50, 50));
    strokeWeight(1);
    for(let alpha = (-(PI) / n) + (PI / 2); alpha < TWO_PI - (-(PI) / n) + (PI / 2); alpha += angle){
        let x = Sx + r * cos(alpha);
        let y = Sy + r * sin(alpha);
        let x2 = Sx + r * cos(alpha + angle);
        let y2 = Sy + r * sin(alpha + angle);
        line(x, y, x2, y2);
    }
}
