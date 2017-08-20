const GameoverScene = new kt.Engine.Scene({
    name: 'GameoverScene',
    init: init,
    update: update
});

let gameoverInputSystem, uiComponents;

function init() {
    gameoverInputSystem = {
        tick: function() {
            if(kt.Engine.InputManager.keys[32].isDown) {
                kt.Engine.SceneManager.pushScene('GameScene');
            }
        }
    }

    uiComponents = [];

    restartText = new kt.Engine.UI.Text('Press space to RESTART', kt.Engine.Graphics._width / 2 - 100, kt.Engine.Graphics._height / 2);
    gameoverText = new kt.Engine.UI.Text('GAME OVER', kt.Engine.Graphics._width / 2 - 50, kt.Engine.Graphics._height / 2 - 30);

    uiComponents.push(restartText, gameoverText);

}

function update() {
    kt.Engine.Graphics.clear();
    kt.Engine.Graphics.drawBackground("#111");

    uiComponents.forEach(component => {
        component.update();
    });

    gameoverInputSystem.tick();
}

function destroy() {

}
