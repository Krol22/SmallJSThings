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
        this.red = 0;
        this.green = 0;
        this.blue = 0;
    },
    clear(){
        fill(color(this.red, this.green, this.blue));
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
