const MenuScene = new kt.Engine.Scene({
    name: 'MenuScene',
    init: init,
    update: update,
    destroy: destroy
});

let menuInputSystem, titleText;

function init() {

    menuInputSystem = {
        tick: function(){
            if(kt.Engine.InputManager.keys[32].isDown){
                kt.Engine.SceneManager.pushScene('GameScene');
            }
        }
    }

    titleText = new kt.Engine.UI.Text('Press space to START', kt.Engine.Graphics._width / 2 - 100, kt.Engine.Graphics._height / 2);
};

function update() {
    kt.Engine.Graphics.clear();
    kt.Engine.Graphics.drawBackground("#111");
    titleText.update();
    menuInputSystem.tick();
}

function destroy() {

}
