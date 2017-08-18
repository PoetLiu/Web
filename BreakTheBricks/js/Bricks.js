function Brick(ctx, x, y, width, height) {
    Rect.apply(this, [ctx, x, y, width, height]);
    this.visible = true;
}

Brick.prototype = Object.create(Rect.prototype);
Brick.prototype.constructor = Brick;

Brick.prototype.draw = function () {
    if (this.visible && this.reDraw) {
        this.ctx.clearRect(this.oldX, this.oldY, this.w, this.h);
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.reDraw = false;
        this.oldX = this.x;
        this.oldY = this.y;
    }
}

Brick.prototype.update = function () {
    this.draw();
}