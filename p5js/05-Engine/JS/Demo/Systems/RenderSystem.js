const renderSystem = {
    init: function(){
    },
    tick: function(entities){
        kt.Engine.Graphics.clear();
        kt.Engine.Graphics.drawBackground("#111");

        entities.filter( entity => entity.components.Line && entity.components.Line.visible )
        .forEach( entity => {
            kt.Engine.Graphics.drawLine(entity);
        });

        entities.filter( entity => {
            return entity.components.Apperance && entity.components.Position;
        }).forEach( entity => {
            kt.Engine.Graphics.draw(entity);
        });

        entities
        .filter( entity => entity.components.Particle )
        .forEach(particle => {
            kt.Engine.Graphics.draw(particle);
        })

    }
};

