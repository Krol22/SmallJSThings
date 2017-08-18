kt.Engine.EntityComponentSystem = function(entities = [], systems = []){
    this.Entities = entities;
    this.Systems = systems;

    this.update = function(){
        if(!this.Systems) {
            return;
        }

        this.Systems.forEach(system => {
            system.tick(this.Entities);
        });
    }
}

kt.Engine.EntityComponentSystem.prototype.addEntities = function(entities){
    this.Entities = this.Entities.concat(entities);
};

kt.Engine.EntityComponentSystem.prototype.addSystems = function(systems){
    systems.forEach(system => {
        system.init();
    });
    this.Systems = this.Systems.concat(systems);
};