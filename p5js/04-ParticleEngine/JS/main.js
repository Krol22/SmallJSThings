let canvasWidth, canvasHeight;

function setup(){
    canvasWidth = document.querySelector('#canvas').offsetWidth;
    canvasHeight = document.querySelector('#canvas').offsetHeight;
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas');

    Engine.init();
    Gui.init();
    ParticleSource.init(600, 400, 50);
    noStroke();
}

function draw(){
    CanvasHelper.clear();
    Engine.draw();
    update();
}

function update(){
    Engine.update();
    InputManager.update();
}

function windowResized() {
    canvasWidth = document.querySelector('#canvas').offsetWidth;
    canvasHeight = document.querySelector('#canvas').offsetHeight;

    resizeCanvas(canvasWidth - 200, canvasHeight);
}

let CanvasHelper = {
    clear(){
        fill(color(255, 255, 255));
        rect(0, 0, canvasWidth, canvasHeight);
    }
};

let InputManager = {
    update(){
        if(mouseIsPressed)
            this.mousePressed = true;
        else
            this.mousePressed = false;
    }
};
