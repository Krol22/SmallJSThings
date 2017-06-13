function setup(){
    // setup code goes here
    let canvasWidth = document.querySelector('#canvas').offsetWidth,
        canvasHeight = document.querySelector('#canvas').offsetHeight;
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas');
}

function draw(){
    // draw code goes here
    translate(500, 400);
    triangle(30, 75, 58, 20, 86, 75);
    line(0,0, 100, 100);
    textSize(30);
    text("#Canvas - Hello world!", 10, 10);
}

function windowResized() {
    let canvasWidth = document.querySelector('#canvas').offsetWidth,
        canvasHeight = document.querySelector('#canvas').offsetHeight;

    resizeCanvas(canvasWidth - 200, canvasHeight);
}
