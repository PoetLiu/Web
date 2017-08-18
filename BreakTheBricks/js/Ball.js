function Ball(ctx, x, y, radius, color) {
    Rect.apply(this, [ctx, x, y, radius*2, radius*2, color]);
    this.speedX = 8;
    this.speedY = 8;
    this.r = radius;
}

Ball.prototype = Object.create(Rect.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function () {
    // draw balls
    if (this.reDraw) {
        var c = this.ctx;
        c.clearRect(this.oldX, this.oldY, this.r*2, this.r*2);
        c.beginPath();
        c.arc(this.x+this.r, this.y+this.r, this.r, 0, Math.PI * 2, true);
        c.fillStyle = this.color;
        c.fill();
        this.reDraw = false;
        this.oldX = this.x;
        this.oldY = this.y;
    }
}

Ball.prototype.bounceX = function () {
    this.speedX *= -1;
}
Ball.prototype.bounceY = function () {
    this.speedY *= -1;
}

Ball.prototype.moveTo = function (x, y) {
    var c = this.ctx.canvas;
    this.x = x;
    this.y = y;

    x = numInSection(this.x, 0, c.width - this.w);
    if (this.x !== x) {
        this.x = x;
        this.bounceX();
    }

    y = numInSection(this.y, 0, c.height - this.h);
    if (this.y !== y) {
        this.y = y;
        this.bounceY();
    }
    this.reDraw = (this.x !== this.oldX || this.y !== this.oldY);
}

Ball.prototype.update = function () {
    this.moveTo(this.x + this.speedX, this.y + this.speedY);
    this.draw();
}