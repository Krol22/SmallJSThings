const UISystem = {
    init(){},
    tick(entities){
        entities
        .filter(entity => entity.components.Position && entity.components.Text && entity.components.Value)
        .forEach(entity => {
            entity.components.Text.text = 'Score: ' + entity.components.Value.value;
            kt.Engine.EntityComponentSystem.Graphics.UI.drawText(entity);
        });
    }
};
