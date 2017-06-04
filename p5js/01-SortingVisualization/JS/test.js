let i = 0;
let j = 0;
let bubbleSort, insertionSort;
let numberOfElements = 1280;
let startTime, endTime;
let finished = false;

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
            }
        }
        this.data.forEach((point) => { point.draw(); });
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

let sortObjects = [insertionSort, bubbleSort];

class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    draw(){
        fill(color(map(this.y, 0, 200, 0, 100), 50, 50));
        rect(this.x, 480, 1, - this.y);
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
    let canvas = createCanvas(1280, 480);
    canvas.parent('canvas');

    bubbleSort.init();
    insertionSort.init();
    colorMode(HSL, 100);
    startTime = new Date();
}

function draw(){
    if(i < numberOfElements){
        sortObjects[j].stepSort(i);
        i++;
    } else {
        finished = true;
    }

    if(finished && !endTime){
        endTime = new Date();
        let time = (endTime.getTime() - startTime.getTime()) / 1000;
        let timeElement = document.createElement('div');
        timeElement.textContent = time + 's - ' + sortObjects[j].name;
        document.querySelector('#canvas').appendChild(timeElement);
        if(j < sortObjects.length - 1){
            finished = false;
            startTime = new Date();
            j++;
            i = 0;
            endTime = false;
        }
    }
}


function clearCanvas(){
    noStroke();
    fill(color(255, 255, 255));
    rect(0, 0, 1280, 480);
}
