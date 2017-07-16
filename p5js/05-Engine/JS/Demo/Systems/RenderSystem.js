const renderSystem = {
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

