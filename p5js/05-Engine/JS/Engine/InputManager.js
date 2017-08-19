kt.Engine.Systems.InputSystem = {
    init: function(){
        this.keys = {};
        window.addEventListener('keydown', (event) => {
            this.keys[event.keyCode] = 1;
        });
        window.addEventListener('keyup', (event) => {
            this.keys[event.keyCode] = 0;
        });
    }
};

