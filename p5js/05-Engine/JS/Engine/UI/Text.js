kt.Engine.UI = {};
kt.Engine.UI.Text = function(text, x = 0, y = 0, color = '#fff', font = '20px Arial', filled = true){
    this.text = text;
    this.position = {
        x: x,
        y: y
    }
    this.color = color;
    this.font = font;
    this.filled = filled;

    this.update = function(){
        let context = kt.Engine.Graphics._context;

        context.font = this.font;
        if(this.filled){
            context.fillStyle = this.color;
            context.fillText(this.text, this.position.x, this.position.y);
            return;
        }

        context.strokeStyle = this.color;
        context.strokeText(this.text, this.position.x, this.position.y);
    }
}