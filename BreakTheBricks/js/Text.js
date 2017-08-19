function Text(ctx, x, y, size, color, font, text) {
    var w = ctx.measureText(text).width;
    Rect.call(this, ctx, x, y, w, size, color);
    this.text   = text;
    this.size   = size;
    this.font   = font;
    this.collideAble    = false;
}

Text.prototype  = Object.create(Rect.prototype);

Text.prototype.constructor = Text;

Text.prototype.setText = function (text) {
    if (text !== this.text) {
        this.clearSelf();
        this.w  = this.ctx.measureText(text).width;
        this.text   = text;
        this.reDraw = true;
    }
}

Text.prototype.draw = function () {
    if (this.reDraw) {
        var c = this.ctx;
        this.clearSelf();
        c.fillStyle = this.color;
        c.font = this.size + 'px ' + this.font;
        c.fillText(this.text, this.x, this.y+this.h);
    }
}

Text.prototype.update = function () {
    this.draw();
}

