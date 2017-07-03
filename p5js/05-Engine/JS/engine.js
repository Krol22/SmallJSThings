const kt = {};

kt.Engine = {


    start(){
        this.running = true;
        this.gameLoop();
    },

    gameLoop(){
        while (this.running){
            kt.Engine.World.update();
            this.running = false;
        }
    }
};

kt.Engine.Components = [];
kt.Engine.Entities = [];
kt.Engine.Systems = [];

kt.Engine.World = {
    // update all systems of engine;
    update(){
        kt.Engine.Systems.forEach((system) => {
            system(kt.Engine.Entities);
        });
    }
};
