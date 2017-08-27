function Brick(ctx, x, y, width, height, color, lifes) {
    Rect.call(this, ctx, x, y, width, height, color);
    this.visible = true;
    this.point = 1;
    this.lifes = lifes;
}

Brick.prototype = Object.create(Rect.prototype);
Brick.constructor = Brick;

Brick.prototype.draw = function (forceReDraw) {
    if (this.visible && (this.reDraw || forceReDraw)) {
        // clear old.
        this.clearSelf();

        // draw new.
        var c = this.ctx;
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;
        c.fillRect(this.x, this.y, this.w, this.h);

        // clear state.
        this.reDraw = false;
        this.oldX = this.x;
        this.oldY = this.y;
    }
};

Brick.prototype.updateColor = function () {
    this.color = getBrickColorByLife(this.lifes);
};

Brick.prototype.onCollide = function () {
    this.lifes -= this.point;
    if (this.lifes <= 0) {
        this.lifes = 0;
        this.hide();
    }
    this.updateColor();
    this.reDraw = true;
};

Brick.prototype.hide = function () {
    this.visible = false;
    this.collideAble = false;
    this.clearSelf();
};

Brick.prototype.update = function (paused, forceReDraw) {
    if (paused) {
        return;
    }
    this.draw(forceReDraw);
};