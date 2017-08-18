function Ball(ctx, x, y, radius) {
    Rect.apply(this, [ctx, x, y, radius, radius]);
    this.speedX = 8;
    this.speedY = 8;
    this.radius = radius;
}

Ball.prototype = Object.create(Rect.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function () {
    // draw balls
    if (this.reDraw) {
        var c = this.ctx;
        c.clearRect(this.oldX - this.radius - 1, this.oldY - this.radius - 1, this.radius * 2 + 2, this.radius * 2 + 2);
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.stroke();
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

    x = numInSection(this.x, this.w, c.width - this.w);
    if (this.x !== x) {
        this.x = x;
        this.bounceX();
    }

    y = numInSection(this.y, this.h, c.height - this.h);
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