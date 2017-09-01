class Text extends RectImage {
    constructor(ctx, x, y, size, color, font, alpa, text_cb) {
        super(ctx, x, y, 0, size, color);
        this.updateText = text_cb;
        this.size = size;
        this.font = font;
        this.collideAble = false;
        this.text = '';
        this.alpha = alpa;
    };

    setText(text) {
        if (text !== this.text) {
            this.text = text;
            this.reDraw = true;
        }
    };

    draw() {
        if (this.reDraw) {
            this.reDraw = false;
            let c = this.ctx;
            this.clearSelf();
            c.fillStyle = this.color;
            c.globalAlpha = this.alpha;
            c.font = this.size + 'px ' + this.font;
            this.w = c.measureText(this.text).width;
            c.fillText(this.text, this.x, this.y + this.h);
        }
    };

    update() {
        this.setText(this.updateText());
        this.draw();
    };
}