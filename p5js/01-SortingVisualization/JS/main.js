let step = 0;
function generateRandomData() {
    let array = [];
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
    InsertionSort.init(generateRandomData());
    BubbleSort.init(generateRandomData());
    CanvasHelper.clearCanvas();
}

function draw(){
    if(step % 2){
        InsertionSort.visualizate();
    }
    else{
        BubbleSort.visualizate();
    }
    step++;
}

let Sort = {
    swap: function(data, i, j){
        let temp = data[i].y;
        data[i].y = data[j].y;
        data[j].y = temp;
    }
}

let BubbleSort = {
    name: 'Bubble sort',
    i: 0,
    j: 0,
    finished: false,
    init: function(data){
        this.data = data;
    },
    visualizate: function(){
        if(this.i < this.data.length)
            this.sort();
        else
            this.finished = true;
    },
    sort: function() {
        if(this.j < this.data.length - 1){
            this.data[this.j].drawSelected(340);
            this.data[this.i].drawSelected(340);
            if(this.data[this.j].y >= this.data[this.i].y){
                Sort.swap(this.data, this.i, this.j);
                CanvasHelper.clearCanvas(340);
                this.data.forEach(point => point.draw(340));
            }
            this.j++;
            this.data[this.j - 1].clear(340);
            this.data[this.j - 1].draw(340);
        } else {
            this.data[this.i].clear(340);
            this.data[this.i].draw(340);
            this.i++;
            this.j = 0;
        }
    }
}

let InsertionSort = {
    name: 'Insertion sort',
    i: 0,
    j: 0,
    finished: false,
    init: function(data){
        this.data = data;
        this.dataElement = this.data[this.i].y
    },
    visualizate: function(){
        if(this.i < this.data.length) {
            this.sort();
        } else {
            this.sort();
            this.finished = true;
        }
    },
    sort: function(){
        if(this.j >= 0 && this.data[this.j].y > this.dataElement){
            this.data[this.j + 1].y = this.data[this.j].y;
            this.j = this.j - 1;
        } else {
            this.data[this.j + 1].y = this.dataElement;
            if(this.data.length > this.i){
                this.dataElement = this.data[this.i].y;
                this.j = this.i - 1;
                this.i = this.i + 1;
            }
        }
        CanvasHelper.clearCanvas();
        this.data.forEach(point => point.draw());
    },
}

let CanvasHelper = {
    init(width, height, numberOfElements){
        this.width = width || 700;
        this.height = height || 320;
        this.numberOfElements = numberOfElements || 32;
    },

    clearCanvas(offsetX){
        offsetX = offsetX || 0;
        noStroke();
        fill(color(255, 255, 255));
        rect(0 + offsetX, 0, 320, this.height);
    },
}

let Point = {
    init(x, y, width){
        this.x = x;
        this.y = y;
        this.width = width || 10;
    },
    draw(offsetX){
        offsetX = offsetX || 0;
        noStroke();
        fill(color(map(this.y, 0, 200, 0, 100), 50, 50));
        rect(this.x * this.width + offsetX, 320, this.width, -this.y);
    },
    drawSelected(offsetX){
        offsetX = offsetX || 0;
        stroke(0);
        fill(color(map(this.y, 0, 200, 0, 100), 50, 50));
        rect(this.x * this.width + offsetX, 320, this.width, -this.y);
    },
    clear(offsetX){
        offsetX = offsetX || 0;
        noStroke();
        fill(color(255,255,255));
        rect(this.x * width, + offsetX, this.y, this.width, CanvasHelper.height);
    }
}
