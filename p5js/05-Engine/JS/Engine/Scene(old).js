kt.Engine.Scenes = {};

kt.Engine.Scene = function(name, init = function(){}, destroy = function(){} ){
    this.name = name;
    this.Entities = [];
    this.Systems = [];
    this.init = function(){};
    this.destroy = function(){};
};

kt.Engine.Scene.setScene = function(sceneName){
    if(kt.Engine.debugging){
        console.log('Switching from state ', kt.Engine.Scene._currentScene, ' to ', sceneName);
    }


    if(kt.Engine.Scenes[sceneName]) {

        if(kt.Engine.Scene._currentScene)
            kt.Engine.Scene._currentScene.destroy();

        kt.Engine.Scene._currentScene = sceneName;
        kt.Engine.Scenes[kt.Engine.Scene._currentScene].init();
    }
};

kt.Engine.Scene.getScene = function(){
    return kt.Engine.Scene._currentScene;
};

kt.Engine.Scene.prototype.addEntities = function(entities) {
    this.Entities = this.Entities.concat(entities);
};

kt.Engine.Scene.prototype.addSystems = function(systems) {
    this.Systems = this.Systems.concat(systems);
}

kt.Engine.Scenes.createScene = function(sceneName) {
    if(!sceneName) {
        throw new Error('Scene has to have a name!');
    }

    if(kt.Engine.Scenes[sceneName]){
        throw new Error('Scene: ', sceneName, ' is already defined.');
    }

    kt.Engine.Scenes[sceneName] = new kt.Engine.Scene(sceneName);

    return kt.Engine.Scenes[sceneName];
};

kt.Engine.Scenes.removeScene = function(sceneName) {
    if(typeof sceneName === 'function'){
        sceneName = sceneName.name;
    }

    delete this[sceneName];
    return this;
};
