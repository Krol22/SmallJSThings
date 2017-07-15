kt.Engine.Graphics = {
    init(canvasSelector, width, height){
        this._canvas = document.getElementById(canvasSelector);
        this._context = this._canvas.getContext("2d");
        this._width = width;
        this._height = height;
    },
    draw(entity){
        let position = entity.components.Position;
        this._context.fillStyle = '#000';
        this._context.fillRect(position.x, position.y, position.width, position.height);
    },
    drawBackground(colorHex){
        this._context.fillStyle = colorHex;
        this._context.fillRect(0, 0, this._width, this._height);
    },
    drawLine(entity){
        let position = entity.components.Position;
        let lineProperties = entity.components.Line;


        this._context.lineWidth = lineProperties.weight;
        this._context.beginPath();
        this._context.moveTo(position.x, position.y);
        this._context.lineTo(position.width, position.height);
        this._context.strokeStyle = hsl(lineProperties.length);
        this._context.stroke();
        this._context.lineWidth = 1;
    },
    clear(){
        this._context.clearRect(0, 0, this._width, this._height);
    },
};

function hsl(value){
    return `hsl(${value}, 100%, 50%)`;
}

kt.Engine.Graphics.UI = {
    init(){
        kt.Engine.Graphics._context.font = '20px Arial';
    },
    drawText(entity){
        let position = entity.components.Position;
        let text = entity.components.Text.text;
        let font = entity.components.Text.font;
        if(font)
            kt.Engine.Graphics._context.font = font;

        kt.Engine.Graphics._context.fillStyle = '#000';
        kt.Engine.Graphics._context.fillText(text, position.x, position.y);
    },
    drawButton(entity){
        let position = entity.components.Position;
        let text = entity.components.Text.text;
        let font = entity.components.Text.font;
        let ctx = kt.Engine.Graphics._context;
        if(font)
            ctx.font = font;

        ctx.strokeRect(position.x, position.y, position.width, position.height);
        ctx.fillText(text, position.x + 10, position.y + 5);
    }
};
