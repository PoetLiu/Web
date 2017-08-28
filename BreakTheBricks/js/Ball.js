function Ball(ctx, x, y, radius, color) {
    RectImage.call(this, ctx, x, y, radius * 2, radius * 2, color);
    this.speedX = 4;
    this.speedY = 4;
    this.r = radius;
    this.dragble    = true;
    this.collideWallDir = 'none';
}

Ball.prototype = Object.create(RectImage.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function () {
    // draw balls
    if (this.reDraw) {
        var c = this.ctx;
        this.clearSelf();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x+this.r, this.y+this.r, this.r, 0, Math.PI * 2, true);
        c.fillStyle = this.color;
        c.fill();
        this.reDraw = false;
        this.oldX = this.x;
        this.oldY = this.y;
    }
};

Ball.prototype.onCollide = function (collideResult) {
    var c = collideResult;
    var a = c.area;

    // log(c, this);
    if (a.w >= a.h) {
        this.bounceY();
    } else {
        this.bounceX();
    }

    // wait until the ball escaped from target.
    do {
        this.update();
    } while (this.checkCollideWith(c.target).collide);
};

Ball.prototype.bounceX = function () {
    this.speedX *= -1;
};
Ball.prototype.bounceY = function () {
    this.speedY *= -1;
};

Ball.prototype.onDragTo = function (x, y) {
    // log(this, x, y);
    this.moveTo(x-this.r, y-this.r);
    this.draw();
};

Ball.prototype.moveTo = function (x, y) {
    var c = this.ctx.canvas;
    this.x = x;
    this.y = y;

    x = numInSection(this.x, 0, c.width - this.w);
    if (this.x !== x) {
        this.x = x;
        this.bounceX();
        this.collideWallDir = (x === 0 ? 'left' : 'right');
    }

    y = numInSection(this.y, 0, c.height - this.h);
    if (this.y !== y) {
        this.y = y;
        this.bounceY();
        this.collideWallDir = (y === 0 ? 'top' : 'bottom');
    }
    this.reDraw = (this.x !== this.oldX || this.y !== this.oldY);
};

Ball.prototype.move = function () {
    this.moveTo(this.x + this.speedX, this.y + this.speedY);
};

Ball.prototype.update = function (paused) {
    if (paused) {
        return;
    }
    this.move();
    this.draw();
};