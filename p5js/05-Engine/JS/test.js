let Scene = kt.Engine.Scenes.createScene('GAME');

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

var playerEntity = new kt.Engine.Entity()
                        .addComponent(new ApperanceComponent())
                        .addComponent(new PositionComponent(300, 200))
                        .addComponent(new BlockComponent(13, 13))
                        .addComponent(new PhysicComponent())
                        .addComponent(new PlayerControledComponent());


var enemies = [];
for(let j = 0; j < NUMBER_OF_WAVES; j++){
    for(let i = 0; i < BLOCKS_PER_WAVE; i++) {
        enemies.push(new kt.Engine.Entity()
                            .addComponent(new PositionComponent(300 + 300 * j, -400))
                            .addComponent(new PhysicComponent(- 6, 0, 0, 0))
                            .addComponent(new BlockComponent(15, 15, j))
                            .addComponent(new ApperanceComponent()));
    }

}


let lines = [];
for(let j = 0; j < NUMBER_OF_WAVES; j++){
    for(let i = 0; i < BLOCKS_PER_WAVE - 1; i++){
        lines.push(new kt.Engine.Entity().addComponent(new PositionComponent())
                                         .addComponent(new LineComponent(0, 0, j)));
    }
}

var scoreEntity = new kt.Engine.Entity()
                        .addComponent(new PositionComponent(20, 30))
                        .addComponent(new TextComponent('Score: ', '25px Arial'))
                        .addComponent(new ValueComponent(0));

let particles = [];
for(let i = 0; i < 200; i++){
    particles.push(new kt.Engine.Entity().addComponent(new PositionComponent())
                                         .addComponent(new BlockComponent(2, 2, -1))
                                         .addComponent(new PhysicComponent(-6, 0))
                                         .addComponent(new ParticleComponent()));
}

Scene.addEntities([playerEntity, scoreEntity]);
Scene.addEntities(enemies);
Scene.addEntities(lines);
Scene.addEntities(particles);

kt.Engine.Graphics.init('canvas', 600, 320);
kt.Engine.Systems.push(
    userInputSystem,
    renderSystem,
    physicsSystem,
    blockSystem,
    collisionSystem,
    UISystem,
    particleSystem
);
kt.Engine.Scene.setScene('GAME');
kt.Engine.debugging = true;

kt.Engine.start();
