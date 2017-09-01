function Paddle(ctx, x, y, width, height, color) {
    RectImage.call(this, ctx, x, y, width, height, color);
    this.speedX = 30;
    this.dragble = true;
}

Paddle.prototype = Object.create(RectImage.prototype);
Paddle.prototype.constructor = Paddle;

Paddle.prototype.onDragTo = function (x) {
   this.moveTo(x-this.w/2, this.y);
   this.draw();
};
Paddle.prototype.moveTo = function (x, y) {
    let c = this.ctx.canvas;
    this.x = numInSection(x, 0, c.width - this.w);
    this.y = y;
    this.reDraw = (this.x !== this.oldX || this.y !== this.oldY);
};

Paddle.prototype.moveLeft = function () {
    this.moveTo(this.x - this.speedX, this.y);
};
Paddle.prototype.movedRight = function () {
    this.moveTo(this.x + this.speedX, this.y);
};

Paddle.prototype.onCollide = function () {
    //log(area);
    this.reDraw = true;
};

Paddle.prototype.draw = function () {
    if (this.reDraw) {
        // log('paddle:redraw.');
        this.clearSelf();
        let c = this.ctx;
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
        this.reDraw = false;
        this.oldX = this.x;
        this.oldY = this.y;
    }
};

Paddle.prototype.update = function (paused) {
    if (paused) {
        return;
    }
    this.draw();
};