var ApperanceComponent = function(){
    return { name: 'Apperance' };
};

var PositionComponent = function(x = 0, y = 0, width = 10, height = 10){
    return {
        name: 'Position',
        x,
        y
    };
};

var BlockComponent = function(width = 10, height = 10, wave) {
    return {
        name: 'Block',
        width,
        height,
        color: '#fff',
        angle: 0,
        visible: true,
        wave,
    };
};

var PhysicComponent = function(vx = 0, vy = 0, ax = 0, ay = 0){
    return {
        name: 'Physic',
        vx,
        vy,
        ax,
        ay
    };
};

var PlayerControledComponent = function(){
    return {
        name: 'PlayerControled',
        live: true,
        collided: false,
        shield: true,
    };
};

var TextComponent = function(text, font){
    return {
        name: 'Text',
        text,
        font
    };
};

var ValueComponent = function(value) {
    return { name: 'Value', value };
};

var LineComponent = function(x1 = 0, y1 = 0, wave, weight = 2){
    return {
        name: 'Line',
        x1,
        y1,
        length: 0,
        weight: 2,
        color: '#fff',
        wave,
        visible: false,
        destroyed: true
    };
};

let ParticleComponent = function(liveTime){
    return {
        name: 'Particle',
        liveTime,
        isAlive: false,
    };
};
