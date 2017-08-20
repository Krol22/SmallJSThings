const physicsSystem = {
    init: function(){},
    tick: function(entities){
        let playerEntity = entities.filter( entity => entity.components.PlayerControled )[0];

        playerEntity.components.Block.angle += 10;

        entities.filter( entity => {
            return entity.components.Position && entity.components.Physic;
        }).forEach( entity => {
            let position = entity.components.Position;
            let physic = entity.components.Physic;

            position.x += physic.vx;
            position.y += physic.vy;

            physic.vx += physic.ax;
            physic.vy += physic.ay;
        });

    }
};
