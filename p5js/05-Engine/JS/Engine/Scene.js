kt.Engine.Scenes = {};

kt.Engine.Scene = function(name){
    this.name = name;
    this.Entities = [];
};

kt.Engine.Scene.setScene = function(sceneName){
    if(kt.Engine.debugging){
        console.log('Switching from state ', kt.Engine.Scene._currentScene, ' to ', sceneName);
    }

    if(kt.Engine.Scenes[sceneName]) {
        kt.Engine.Scene._currentScene = sceneName;
    }
};

kt.Engine.Scene.getScene = function(){
    return kt.Engine.Scene._currentScene;
};

kt.Engine.Scene.prototype.addEntities = function(entities) {
    this.Entities = this.Entities.concat(entities);
};

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
