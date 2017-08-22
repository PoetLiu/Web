function Text(ctx, x, y, size, color, font, text_cb) {
    Rect.call(this, ctx, x, y, 0, size, color);
    this.updateText = text_cb;
    this.size   = size;
    this.font   = font;
    this.collideAble    = false;
    this.text = '';
    this.alpha = 0.5;
}

Text.prototype  = Object.create(Rect.prototype);
Text.prototype.constructor = Text;

Text.prototype.setText = function (text) {
    if (text !== this.text) {
        this.text   = text;
        this.reDraw = true;
    }
};

Text.prototype.draw = function () {
    if (this.reDraw) {
        this.reDraw = false;
        var c = this.ctx;
        this.clearSelf();
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;
        c.font = this.size + 'px ' + this.font;
        this.w = c.measureText(this.text).width;
        c.fillText(this.text, this.x, this.y+this.h);
    }
};

Text.prototype.update = function () {
    this.setText(this.updateText());
    this.draw();
};
