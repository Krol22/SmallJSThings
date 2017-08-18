kt.Engine.Scene = function(config){
    this.name = config.name;
    this.init = config.init;
    this.destroy = config.destroy;
    this.update = config.update;

    kt.Engine.SceneManager._scenes[this.name] = this;
};

kt.Engine.SceneManager = {
    _scenes: {},
    scenesStack: [],
    pushScene(sceneName){
        let scene = this._scenes[sceneName];
        if(scene.init) {
            scene.init();
        }
        this.scenesStack.push(scene);
    },
    popScene(){
        this.scenesStack.pop();
    },
    changeScene(sceneName){
        this.popScene();
        this.pushScene(sceneName);
    },
    tick(){
        let currentScene = this.scenesStack[this.scenesStack.length - 1];
        currentScene.update();
    }
};

