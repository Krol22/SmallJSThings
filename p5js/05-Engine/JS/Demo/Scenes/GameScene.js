let GameECS = new kt.Engine.EntityComponentSystem();

let Scene = new kt.Engine.Scene({
    name: 'GameScene',
    init: init,
    update: update,
    destroy: destroy
});

let gameInputSystem = {
    tick: function(entities){
        let scoreEntity = entities.filter( entity => entity.components.Value)[0];
        let playerEntity = entities.filter( entity => entity.components.PlayerControled)[0];

        if(kt.Engine.InputManager.keys[32].isDown && !scoreEntity.components.Value.counting){
            scoreEntity.components.Value.counting = true;
            playerEntity.components.PlayerControled.live = true;
        }

        entities.filter( entity => { return entity.components.PlayerControled; }).forEach( entity => {
            if(kt.Engine.InputManager.keys[32].isDown){
                let entityPosition = entity.components.Physic;
                entityPosition.ay = 0.2;
                entityPosition.vy = -4.5;
            }

            // #TODO: create some game constants
            let blockComponent = entity.components.Block;

            if(kt.Engine.InputManager.keys[40].isDown){
                blockComponent.color = '#ff7f50';

            } else if (kt.Engine.InputManager.keys[38].isDown) {
                blockComponent.color = '#ffff00';

            } else if (kt.Engine.InputManager.keys[39].isDown) {
                blockComponent.color = '#00ff00';

            } else if (kt.Engine.InputManager.keys[37].isDown) {
                blockComponent.color = '#00ffff';

            }

        });
    }
};

function init(){
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

    gameInputSystem = Object.assign(gameInputSystem, kt.Engine.Systems.InputSystem);

    GameECS.addEntities([playerEntity, scoreEntity]);
    GameECS.addEntities(enemies);
    GameECS.addEntities(lines);
    GameECS.addEntities(particles);
    GameECS.addSystems([blocksSystem, collisionSystem, particleSystem, physicsSystem, renderSystem, gameInputSystem, UISystem]);

}

function update() {
    GameECS.update();
}

function destroy() {
    GameECS.destroy();
}
