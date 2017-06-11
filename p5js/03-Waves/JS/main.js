const numberOfPoints = 150;
const vh = 768;
const vw = 1024;

let points = [];

function setup(){
    let canvas = createCanvas(vw, vh);
    canvas.parent('canvas');
    background(0);
    for(let i = 0; i < numberOfPoints; i++){
        createPoint();
    }
}

function createPoint(){
    let randomY = random() * vh;
    let randomVx = (random() * -2) - 1;

    let point = Object.create(Point);
    point.init(vw, randomY, randomVx, 0);

    points.push(point)
}

function draw(){
    clearCanvas();
    points.forEach(point => point.draw());
    update();
}

function update(){
    points.forEach(point => point.update());
}

function drawLines(){
    // check distance between each point and draw line if d < some value.
}

function clearCanvas(){
    fill(color(0, 0, 0));
    rect(0, 0, vw, vh);
}

let Point = {
    init(x, y, vx, vy){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    },
    draw(){
        fill(color(255,255,255));
        rect(this.x, this.y, 5, 5);
    },
    update(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.x < 0){
            this.x = vw;
        }
    }
}
