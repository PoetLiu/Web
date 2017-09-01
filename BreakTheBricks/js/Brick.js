class Brick extends RectImage {
    constructor(ctx, x, y, width, height, color, life) {
        super(ctx, x, y, width, height, color);
        this.visible = true;
        this.point = 1;
        this.lifes = life;
    };

    draw(forceReDraw) {
        if (this.visible && (this.reDraw || forceReDraw)) {
            // clear old.
            this.clearSelf();

            // draw new.
            let c = this.ctx;
            c.fillStyle = this.color;
            c.globalAlpha = this.alpha;
            c.fillRect(this.x, this.y, this.w, this.h);

            // clear state.
            this.reDraw = false;
            this.oldX = this.x;
            this.oldY = this.y;
        }
    };

    updateColor() {
        this.color = getBrickColorByLife(this.lifes);
    };

    onCollide() {
        this.lifes -= this.point;
        if (this.lifes <= 0) {
            this.lifes = 0;
            this.hide();
        }
        this.updateColor();
        this.reDraw = true;
    };

    hide() {
        this.visible = false;
        this.collideAble = false;
        this.clearSelf();
    };

    update(paused, forceReDraw) {
        if (paused) {
            return;
        }
        this.draw(forceReDraw);
    };
}
