let data = [];

function generateRandomData(array) {
    for (let i = 0; i < CanvasHelper.numberOfElements; i++){
        let randomValue = round(random(200));
        let point = Object.create(Point);
        point.init(i, randomValue);
        array.push(point);
    }
    return array;
}

function setup() {
    colorMode(HSL, 100);
    CanvasHelper.init();
    let canvas = createCanvas(CanvasHelper.width, CanvasHelper.height);
    data = generateRandomData(data);
    InsertionSort.init(data);
    CanvasHelper.clearCanvas();
}

function draw(){
    InsertionSort.visualizate(); 
}

let Sort = {
    swap: function(data, i, j){
        let temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }
}

let InsertionSort = {
    name: 'Insertion sort',
    i: 0,
    j: 0,
    finished: false,
    init: function(data){
        this.data = data;
        this.j = 0;
        this.dataElement = this.data[this.i].y
    },
    visualizate: function(){
        this.sort();
    },
    sort: function(){
        if(this.j >= 0 && this.data[this.j].y > this.dataElement){
            this.data[this.j + 1].y = this.data[this.j].y;
            this.j = this.j - 1;
        } else {
            this.data[this.j + 1].y = this.dataElement;
            this.dataElement = this.data[this.i].y;
            this.j = this.i - 1;
        }
        CanvasHelper.clearCanvas();
        this.data.forEach(point => point.draw());
    },
}

let CanvasHelper = {
    init(width, height, numberOfElements){
        this.width = width || 640;
        this.height = height || 320;
        this.numberOfElements = numberOfElements || 40;
    },

    clearCanvas(){
        noStroke();
        fill(color(255, 255, 255));
        rect(0, 0, this.width, this.height);
    },
}

let Point = {
    init(x, y, width){
        this.x = x;
        this.y = y;
        this.width = width || 10;
    },
    draw(){
        fill(color(map(this.y, 0, 200, 0, 100), 50, 50));
        rect(this.x * this.width, this.y, this.width, -this.y);
    },
    clear(){
        rect(this.x * width, this.y, this.width, CanvasHelper.height);
    }
}



