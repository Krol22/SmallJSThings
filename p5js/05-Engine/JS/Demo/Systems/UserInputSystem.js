const userInputSystem = {
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