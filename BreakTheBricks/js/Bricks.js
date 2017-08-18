function Brick(ctx, x, y, width, height, color) {
    Rect.apply(this, [ctx, x, y, width, height, color]);
    this.visible = true;
    this.point = 1;
}

Brick.prototype = Object.create(Rect.prototype);
Brick.prototype.constructor = Brick;
Brick.prototype.clear = function () {
    var c = this.ctx;
    c.clearRect(this.oldX, this.oldY, this.w, this.h);
}

Brick.prototype.draw = function () {
    if (this.visible && this.reDraw) {
        // clear old.
        this.clear();

        // draw new.
        var c = this.ctx;
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);

        // clear state.
        this.reDraw = false;
        this.oldX = this.x;
        this.oldY = this.y;
    }
}

Brick.prototype.update = function () {
    this.draw();
}

Brick.prototype.hide = function () {
    this.visible = false;
    this.clear();
}