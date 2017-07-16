kt.Engine.Physics = {
    rectCollision(x1, y1, w1, h1, x2, y2, w2, h2){
        return (x1 < x2 + w2 &&
                x1 + w1 > x2 &&
                y1 < y2 + h2 &&
                y1 + h1 > y2);

    },
    segmentsCollistion(x1, y1, x2, y2, x3, y3, x4, y4){
        let o1 = orientation(x1, y1, x2, y2, x3, y3);
        let o2 = orientation(x1, y1, x2, y2, x4, y4);
        let o3 = orientation(x3, y3, x4, y4, x1, y1);
        let o4 = orientation(x3, y3, x4, y4, x2, y2);

        if(o1 != o2 && o3 != o4)
            return true;

        if(!o1 && onSegment(x1, y1, x3, y3, x2, y2)) return true;
        if(!o2 && onSegment(x1, y1, x4, y4, x2, y2)) return true;
        if(!o3 && onSegment(x3, y3, x1, y1, x4, y4)) return true;
        if(!o4 && onSegment(x3, y3, x2, y2, x4, y4)) return true;

        return false;
    },
};

kt.Engine.Physics.Vector = function(x, y){
    this.x = x;
    this.y = y;

    this.add = function(x, y){
        if(typeof x === 'object'){
            let vector = x;
            this.x += vector.x;
            this.y += vector.y;
        } else {
            this.x += x;
            this.y += y;
        }
    };

    this.sub = function(x, y){
        if(typeof x === 'object'){
            let vector = x;
            this.x -= vector.x;
            this.y -= vector.y;
        } else {
            this.x -= x;
            this.y -= y;
        }
    };

    this.mul = function(number){
        if(typeof x === 'object'){
            let vector = x;
            this.x = this.x * vector.x;
            this.y = this.y * vector.y;
        } else {
            this.x = this.x * x;
            this.y = this.y * y;
        }
    };

};


let orientation = function(x1, y1, x2, y2, x3, y3){
    let val = (y2 - y1) * (x3 - x2) -
              (x2 - x1) * (y3 - y2);
    if (val === 0) return 0;
    return val > 0 ? 1 : 2;
};

let onSegment = function(x1, y1, x2, y2, x3, y3) {
    if(x2 <= Math.max(x1, x3) && x2 >= Math.min(x1, x3) &&
       y2 <= Math.max(y1, y3) && y2 >= Math.min(y1, y3))
    return true;

    return false;
};