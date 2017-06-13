const numberOfPoints = 10;
const minimumDistance = 500;
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
    drawLines();
    points.forEach(point => point.draw());
    update();
}

function update(){
    points.forEach(point => point.update());
}

function drawLines(){
    for(let i = 0; i < numberOfPoints; i++){
        let j = 0;
        points.forEach(point => {
            if(points[i].x === point.x && points[i].y === point.y) return;

            if(sqrt(pow((points[i].x - point.x), 2) + pow((points[i].y + point.y), 2)) < minimumDistance) {
                stroke("white");
                line(points[i].x, points[i].y, point.x, point.y);
            }
        });
    }
}

function clearCanvas(){
    fill(color(0, 0, 0));
    rect(0, 0, vw, vh);
}

let Point = {
    init(x = 0, y = 0, vx = 0, vy = 0){
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
