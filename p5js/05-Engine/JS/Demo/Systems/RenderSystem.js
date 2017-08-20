const renderSystem = {
    init: function(){
    },
    tick: function(entities){
        kt.Engine.Graphics.clear();
        kt.Engine.Graphics.drawBackground("#111");

        entities.filter( entity => entity.components.Line && entity.components.Line.visible )
        .forEach( entity => {
            kt.Engine.EntityComponentSystem.Graphics.drawLine(entity);
        });

        entities.filter( entity => {
            return entity.components.Apperance && entity.components.Position && !entity.components.PlayerControled;
        }).forEach( entity => {
            kt.Engine.EntityComponentSystem.Graphics.draw(entity);
        });

        let playerEntity = entities.filter( entity => entity.components.PlayerControled )[0];
        if(playerEntity.components.PlayerControled.live)
            kt.Engine.EntityComponentSystem.Graphics.draw(playerEntity);

        entities
        .filter( entity => entity.components.Particle )
        .forEach(particle => {
            kt.Engine.EntityComponentSystem.Graphics.draw(particle);
        })

    }
};

