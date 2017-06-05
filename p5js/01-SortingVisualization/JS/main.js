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
    InsertionSort.init(data.slice());
    BubbleSort.init(data.slice());
    CanvasHelper.clearCanvas();
}

function draw(){
    InsertionSort.visualizate();
    //BubbleSort.visualizate();
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
            if(this.data[this.j].y >= this.data[this.i].y){
                Sort.swap(this.data, this.i, this.j);
                CanvasHelper.clearCanvas();
                this.data.forEach(point => point.draw());
            }
            this.j++;
        } else {
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
        if(this.i <= this.data.length)
            this.sort();
        else
            this.finished = true;
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
        this.width = width || 640;
        this.height = height || 320;
        this.numberOfElements = numberOfElements || 64;
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
        rect(this.x * this.width, 320, this.width, -this.y);
    },
    clear(){
        rect(this.x * width, this.y, this.width, CanvasHelper.height);
    }
}
