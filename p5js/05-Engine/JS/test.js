var Scene = kt.Engine.Scenes.createScene('GAME');

let Colors = {
    red: { max: 40, value: '#ff0000', points: 5 },
    orange: { min: 40, max: 70, value: '#ff7f50', points: 4 },
    yellow: { min: 70, max: 110, value: '#ffff00', points: 3 },
    green: { min: 110, max: 140, value: '#00ff00', points: 2 },
    cyan: { min: 140, value: '#00ffff', points: 1 }
};

var ApperanceComponent = function(){
    return { name: 'Apperance', };
};

var PositionComponent = function(x = 0, y = 0, width = 10, height = 10){
    return { name: 'Position', x, y, width, height, angle: 0 };
};

var PhysicComponent = function(vx = 0, vy = 0, ax = 0, ay = 0){
    return { name: 'Physic', vx, vy, ax, ay, collided: false };
};

var PlayerControledComponent = function(){
    return {
        name: 'PlayerControled',
        live: true,
    };
};

var TextComponent = function(text, font){
    return {
        name: 'Text',
        text, font
    };
};

var ValueComponent = function(value) {
    return { name: 'Value', value };
};

var EnemyCompoenent = function(){
    return { name: 'Enemy' };
};

var LineComponent = function(weight){
    return { name: 'Line', length: 0, weight: 2, color: '#fff'};
};

var playerEntity = new kt.Engine.Entity()
                        .addComponent(new ApperanceComponent())
                        .addComponent(new PositionComponent(200, 200, 13, 13))
                        .addComponent(new PhysicComponent())
                        .addComponent(new PlayerControledComponent());

var graphicEntity2 = new kt.Engine.Entity()
                        .addComponent(new ApperanceComponent())
                        .addComponent(new PositionComponent(150, 150));

var enemies = [];
for(let i = 0; i < 5; i++){
    enemies.push(new kt.Engine.Entity()
                        .addComponent(new PositionComponent(0, 0, 15, 15))
                        .addComponent(new PhysicComponent(- 6, 0, 0, 0))
                        .addComponent(new EnemyCompoenent())
                        .addComponent(new ApperanceComponent()));
}

let lines = [];
for(let i = 0; i < 4; i++){
    lines.push(new kt.Engine.Entity().addComponent(new PositionComponent())
                                     .addComponent(new LineComponent())
                                     .addComponent(new EnemyCompoenent()));
}

var scoreEntity = new kt.Engine.Entity()
                        .addComponent(new PositionComponent(20, 30))
                        .addComponent(new TextComponent('Score: ', '25px Arial'))
                        .addComponent(new ValueComponent(0));

Scene.addEntities([playerEntity, scoreEntity]);
Scene.addEntities(enemies);
Scene.addEntities(lines);

var renderSystem = {
    init: function(){
    },
    tick: function(entities){
        kt.Engine.Graphics.clear();
        kt.Engine.Graphics.drawBackground("#111");

        entities.filter( entity => entity.components.Line )
        .forEach( entity => {
            kt.Engine.Graphics.drawLine(entity);
        });

        entities.filter( entity => {
            return entity.components.Apperance && entity.components.Position;
        }).forEach( entity => {
            kt.Engine.Graphics.draw(entity);
        });

    }
};

var userInputSystem = {
    init: function(){
        this.keys = {};
        window.addEventListener('keydown', (event) => {
            this.keys[event.keyCode] = 1;
        });
        window.addEventListener('keyup', (event) => {
            this.keys[event.keyCode] = 0;
        });
    },
    tick: function(entities){
        let scoreEntity = entities.filter( entity => entity.components.Value)[0];
        if(this.keys[32] && !scoreEntity.components.Value.counting){
            scoreEntity.components.Value.counting = true;
        }

        entities.filter( entity => {
            return entity.components.Position && entity.components.PlayerControled && entity.components.Physic;
        }).forEach( entity => {
            if(this.keys[32]){
                let entityPosition = entity.components.Physic;
                entityPosition.ay = 0.2;
                entityPosition.vy = -4.5;
            }
        });

    }
};

var physicsSystem = {
    init: function(){},
    tick: function(entities){
        entities.filter( entity => {
            return entity.components.Position && entity.components.Physic;
        }).forEach( entity => {
            var position = entity.components.Position;
            var physic = entity.components.Physic;

            position.x += physic.vx;
            position.y += physic.vy;

            physic.vx += physic.ax;
            physic.vy += physic.ay;
        });

        let playerEntity = entities.filter( entity => entity.components.PlayerControled )[0];

        playerEntity.components.Position.angle += 10;
    }
};

var enemySystem = {
    init: function(){},
    tick: function(entities) {

        let unvisibleBlocks = 0;

        let player = entities.filter( entity => entity.components.PlayerControled)[0];
        let blocks = entities.filter( entity => entity.components.Enemy && !entity.components.Line );

        blocks.sort((a, b) => { return a.components.Position.y - b.components.Position.y; });

        blocks.forEach( block => {
            let position = block.components.Position;
            if(position.x < 0) {
                unvisibleBlocks++;
            }
        });

        if(unvisibleBlocks == 5){
            let prevYPosition = 0;
            blocks[0].components.Position.y = Math.random() * 15;
            blocks[4].components.Position.y = 300 - Math.random() * 15;

            blocks[1].components.Position.y = 40 + Math.random() * 70;
            blocks[2].components.Position.y = 130 + Math.random() * 70;
            blocks[3].components.Position.y = 210 + Math.random() * 70;

            blocks.forEach( block => {
                let position = block.components.Position;
                position.x = 600 + (Math.random() * 100);
                prevYPosition = position.y;
            });

            player.components.Physic.collided = false;
        }

        let lines = entities.filter( entity => entity.components.Line );

        for(let i = 0; i < 4; i++){
            let linePosition = lines[i].components.Position;
            linePosition.x = blocks[i].components.Position.x + (blocks[i].components.Position.width / 2) ;
            linePosition.y = blocks[i].components.Position.y + (blocks[i].components.Position.height / 2);
            linePosition.width = blocks[i + 1].components.Position.x + (blocks[i + 1].components.Position.width / 2);
            linePosition.height = blocks[i + 1].components.Position.y + (blocks[i + 1].components.Position.height / 2);
            lines[i].components.Line.length = Math.sqrt(
                Math.pow((linePosition.x - linePosition.width), 2) +
                Math.pow((linePosition.y - linePosition.height), 2)
            );

            lines[i].components.Line.color = selectColor(lines[i].components.Line.length);
        }
    }
};

function selectColor(length){
    let selectedColor;
    Object.keys(Colors).forEach( key => {
        Colors[key].min = Colors[key].min || 1;
        Colors[key].max = Colors[key].max || 1000;
        if(length > Colors[key].min && length < Colors[key].max){
            selectedColor = Colors[key];
        }
    });
    return selectedColor;
}

const collisionSystem = {
    init(){},
    tick(entities) {

        let playerEntity = entities.filter( entity => {
            return entity.components.PlayerControled;
        })[0];

        let scoreEntity = entities.filter( entity => {
            return entity.components.Text;
        })[0];

        let playerPosition = playerEntity.components.Position;

        if(playerPosition.y < 0 || playerPosition.y > 320 - playerPosition.width){
            // player collision with world.
            playerPosition.y = 195;
            playerEntity.components.Physic.vy = 0;
            playerEntity.components.Physic.ay = 0;
            playerEntity.components.PlayerControled.live = false;
            scoreEntity.components.Value.value = 0;
            scoreEntity.components.Value.counting = false;
        }

        entities
        .filter( entity => entity.components.Enemy && !entity.components.Line )
        .forEach ( enemyEntity => {
            let enemyPosition = enemyEntity.components.Position;

            if(kt.Engine.Physics.rectCollision(playerPosition.x, playerPosition.y, playerPosition.width, playerPosition.height,
               enemyPosition.x, enemyPosition.y, enemyPosition.width, enemyPosition.height)){

                    playerPosition.y = 195;
                    playerEntity.components.Physic.vy = 0;
                    playerEntity.components.Physic.ay = 0;
                    scoreEntity.components.Value.value = 0;
                    scoreEntity.components.Value.counting = false;
                }
        });

        if(!playerEntity.components.Physic.collided){
            scoreEntity = entities.filter(entity => entity.components.Value)[0];

            entities
            .filter( entity => entity.components.Line )
            .forEach( line => {
                let linePosition = line.components.Position;

                if(kt.Engine.Physics.segmentsCollistion( playerPosition.x + playerPosition.width, playerPosition.y, playerPosition.x + playerPosition.width, playerPosition.y + playerPosition.height,
                    linePosition.x, linePosition.y, linePosition.x + linePosition.width, linePosition.y + linePosition.height )){

                    // now it's just a shot with max length of line
                    scoreEntity.components.Value.value += line.components.Line.color.points;
                    playerEntity.components.Physic.collided = true;
                }
            });
        }
    }
};

var UISystem = {
    init(){},
    tick(entities){
        entities
        .filter(entity => entity.components.Position && entity.components.Text && entity.components.Value)
        .forEach(entity => {
            entity.components.Text.text = 'Score: ' + entity.components.Value.value;
            kt.Engine.Graphics.UI.drawText(entity);
        });
    }
};

kt.Engine.Graphics.init('canvas', 600, 320);
kt.Engine.Systems.push(
    userInputSystem,
    renderSystem,
    physicsSystem,
    enemySystem,
    collisionSystem,
    UISystem
);
kt.Engine.Scene.setScene('GAME');
kt.Engine.debugging = true;

kt.Engine.start();
