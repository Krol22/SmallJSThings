function setup(){
    // setup code goes here
    let canvas = createCanvas(640, 480);
    canvas.parent('canvas');
}

function draw(){
    // draw code goes here
    translate(100, 100);
    drawPolygon(0, 0, 20, 5);
}

function drawPolygon(Sx, Sy, r, n){
    let angle = ((n - 2) * PI) / n;
    for(let alpha = 0; alpha < TWO_PI; alpha += angle){
        let x = Sx + r * cos(alpha);
        let y = Sy + r * sin(alpha);
        rect(x, y, 5, 5);
    }
}
