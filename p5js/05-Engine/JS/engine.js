const kt = {};

kt.Engine = {
    start(){
        this.running = true;
        this.gameLoop();
    },

    gameLoop(){
        let hardBinded = this.gameLoop.bind(this);
        window.requestAnimationFrame(hardBinded);
        kt.Engine.SceneManager.tick();
    }
};

kt.Engine.Components = [];
kt.Engine.Systems = [];
