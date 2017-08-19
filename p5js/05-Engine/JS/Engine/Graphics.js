kt.Engine.Graphics = {
    init(canvasSelector, width, height){
        this._canvas = document.getElementById(canvasSelector);
        this._context = this._canvas.getContext("2d");
        this._width = width;
        this._height = height;
    },
    clear(){
        this._context.clearRect(0, 0, this._width, this._height);
    },
    drawBackground(colorHex){
        this._context.fillStyle = colorHex;
        this._context.fillRect(0, 0, this._width, this._height);
    },
    drawText(text, positionX = 0, positionY = 0, font = "20px Arial", color = '#fff') {
        this._context.font = font;
        this._context.fillStyle = color;
        this._context.fillText(text, positionX, positionY);
    }
};

kt.Engine.EntityComponentSystem.Graphics = {
    draw(entity){
        let position = entity.components.Position;
        let block = entity.components.Block;
        let _context = kt.Engine.Graphics._context;
        _context.save();

        _context.fillStyle = block.color;
        _context.shadowColor = block.color;
        _context.shadowBlur = 9;
        _context.translate(position.x + block.width / 2, position.y + block.height / 2);
        _context.rotate(block.angle * Math.PI/180);
        _context.fillRect(0 - block.width / 2, 0 - block.height / 2, block.width, block.height);
        _context.restore();
    },
    drawLine(entity){
        let position = entity.components.Position;
        let lineProperties = entity.components.Line;
        let _context = kt.Engine.Graphics._context;

        _context.lineWidth = lineProperties.weight;
        _context.beginPath();
        _context.moveTo(position.x, position.y);
        _context.lineTo(lineProperties.x1, lineProperties.y1);
        _context.strokeStyle = lineProperties.color.value;
        _context.stroke();
        _context.lineWidth = 1;
    },
};

kt.Engine.EntityComponentSystem.Graphics.UI = {
    init(){
        kt.Engine.Graphics._context.font = '20px Arial';
    },
    drawText(entity){
        let position = entity.components.Position;
        let text = entity.components.Text.text;
        let font = entity.components.Text.font;
        if(font)
            kt.Engine.Graphics._context.font = font;

        kt.Engine.Graphics._context.fillStyle = '#fff';
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
