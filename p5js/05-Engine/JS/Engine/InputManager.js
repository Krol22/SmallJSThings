kt.Engine.InputManager = {
    init: function(){
        this.keys = {};
        window.addEventListener('keydown', (event) => {
            this.keys[event.code] = 1;
            this.keys[event.code].isPressed = event.repeat;
        });
        window.addEventListener('keyup', (event) => {
            this.keys[event.code] = 0;
            this.keys[event.code].isPressed = false;
        });
    }
};

kt.Engine.InputManager.init();
