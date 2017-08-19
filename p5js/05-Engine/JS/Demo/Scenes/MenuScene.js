const MenuScene = new kt.Engine.Scene({
    name: 'MenuScene',
    init: init,
    update: update
});

let menuInputSystem;

function init() {

    menuInputSystem = {
        tick: function(){
            if(this.keys[32]){
                kt.Engine.SceneManager.pushScene('GameScene');
            }
        }
    }

    menuInputSystem = Object.assign(menuInputSystem, kt.Engine.Systems.InputSystem);
    menuInputSystem.init();
};

function update() {
    menuInputSystem.tick();
}

