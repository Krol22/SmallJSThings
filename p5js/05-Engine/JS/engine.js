const kt = {};

kt.Engine = {
    start(){
        this.running = true;
        kt.Engine.Systems.forEach(system => {
            if(system.init)
                system.init();
        });
        this.gameLoop();
    },

    gameLoop(){
        let hardBinded = this.gameLoop.bind(this);
        window.requestAnimationFrame(hardBinded);
        kt.Engine.Systems.forEach(system => {
            system.tick(kt.Engine.Scenes[kt.Engine.Scene._currentScene].Entities);
        });
    }
};

kt.Engine.Components = [];
kt.Engine.Systems = [];
