let i = 0;
let numberOfElements = 100;
let startTime, endTime;
let finished = false;

class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    draw(){
        fill(color(this.y, this.y, this.y));
        rect(this.x * 6, 480, 6, - this.y);
    }
}

function generateRandomData(){
    let data = [];
    for(let i = 0; i < numberOfElements; i++){
        let randomNumber = round(random(200));
        data.push(new Point(i, randomNumber));
    }
    return data;
}

function setup(){
    let canvas = createCanvas(640, 480);
    canvas.parent('canvas');

    bubbleSort.init();
    insertionSort.init();
    startTime = new Date();
}

function draw(){
    if(i < 100){
        insertionSort.stepSort(i);
        i++;
    } else {
        finished = true;
    }

    if(finished && !endTime){
        endTime = new Date();
        let time = (endTime.getTime() - startTime.getTime()) / 1000;
        let timeElement = document.createElement('div');
        timeElement.textContent = time + 's';
        document.querySelector('#canvas').appendChild(timeElement);
    }
}

bubbleSort = {
    name: 'Bubble sort',
    init: function(){
        this.data = generateRandomData();
    },
    stepSort: function(step){
        clearCanvas();
        for(let j = 0; j < numberOfElements;  j++){
            if(this.data[j].y >= this.data[i].y){
                let temp = this.data[j].y;
                this.data[j].y = this.data[i].y;
                this.data[i].y = temp;
                this.data.forEach((point) => { point.draw(); });
            }
        }
    },
};

insertionSort = {
    name: 'Insertion sort',
    init: function(){
        this.data = generateRandomData();
    },
    stepSort: function(step){
        clearCanvas();
        let element = this.data[step].y;
        let j = step - 1;
        while(j >= 0 && this.data[j].y > element){
            this.data[j + 1].y = this.data[j].y;
            j = j - 1;
        }
        this.data[j + 1].y = element;
        this.data.forEach((point) => { point.draw(); });
    }
};

quickSort = {
    name: 'Quick sort',
    init: function(){
        this.data = generateRandomData();
    },
    stepSort: function(step){

    },
    choosePivot: function(l, r){
        return (l + (r - 1)) / 2;
    },
    divideData: function(){

    },
    swap: function(data, i, j){
        let temp = data[i].y;
        data[i].y = data[j].y;
        data[j].y = temp;
    }
}

function clearCanvas(){
    noStroke();
    fill(color(255, 255, 255));
    rect(0, 0, 640, 480);
}
