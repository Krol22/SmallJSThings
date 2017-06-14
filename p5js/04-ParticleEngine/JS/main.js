let canvasWidth, canvasHeight;

function setup(){
    colorMode(RGB);

    canvasWidth = document.querySelector('#canvas').offsetWidth;
    canvasHeight = document.querySelector('#canvas').offsetHeight;
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas');

    CanvasHelper.init();
    Engine.init();
    Gui.init();
    ParticleSource.init(600, 300, 50);
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

    resizeCanvas(canvasWidth, canvasHeight);
}

let CanvasHelper = {
    init(){
        this.grey = 0;
    },
    clear(){
        fill(color(this.grey, this.grey, this.grey));
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
