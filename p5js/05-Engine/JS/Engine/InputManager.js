kt.Engine.InputManager = {
    update: function() {
        let i;
        for(i = 8; i < 222; i++){
            if(!this.keys[i].isDown)
                continue;

            if(this.keys[i].isDown === this.keys[i].prevIsDown){
                this.keys[i].isPressed = true;
            } else {
                this.keys[i].isPressed = false;
            }

            this.keys[i].prevIsDown = this.keys[i].isDown;
        }

    },
    init: function(){

        /* keyboard handling */

        this.keys = {};

        for (let i = 8; i < 222; i++){
            this.keys[i] = {
                isDown: false,
                isPressed: false
            };
        }

        window.addEventListener('keydown', (event) => {
            this.keys[event.which].isDown = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.which].isDown = false;
            this.keys[event.which].isPressed = false;
            this.keys[event.which].prevIsDown = false;
        });

        /* mouse handling */

        this.mouse = {
            position: {},
            LEFT: false,
            RIGHT: false,
            MIDDLE: false
        };
        
        window.addEventListener('mousedown', (event) => {
            event.preventDefault();

            this.mouse.position.x = event.clientX;
            this.mouse.position.y = event.clientY;

            this.mouse.LEFT = false;
            this.mouse.MIDDLE = false;
            this.mouse.RIGHT = false;

            if(event.button === 0) {
                this.mouse.LEFT = true;
            } else if(event.button === 1) {
                this.mouse.MIDDLE = true;
            } else if(event.button === 2) {
                this.mouse.RIGHT = true;
            }

        });

    }
};

kt.Engine.InputManager.init();
