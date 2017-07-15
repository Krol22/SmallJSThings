kt.Engine.Math = {
    map(value, a, b, c, d){
        return (value - a)/(b - a) * (d - c) + c;
    }
};