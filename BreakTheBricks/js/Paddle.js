function Paddle(ctx, x, y, width, height, color) {
    Rect.apply(this, [ctx, x, y, width, height, color]);
    this.speedX = 30;
    var _this = this;
    window.addEventListener('keydown', function (event) {
        var k = event.key;
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
        if (_this.paused) {
            return
        }
        if (k === 'j' || k === 'J') {
            _this.moveLeft();
            event.preventDefault();
        }
        if (k === 'k' || k === 'K') {
            _this.movedRight();
            event.preventDefault();
        }
    }, true);
}

Paddle.prototype = Object.create(Rect.prototype);
Paddle.prototype.constructor = Paddle;

Paddle.prototype.moveTo = function (x, y) {
    var c = this.ctx.canvas;
    this.x = numInSection(x, 0, c.width - this.w);
    this.y = y;
    this.reDraw = (this.x !== this.oldX || this.y !== this.oldY);
}

Paddle.prototype.moveLeft = function () {
    this.moveTo(this.x - this.speedX, this.y);
}
Paddle.prototype.movedRight = function () {
    this.moveTo(this.x + this.speedX, this.y);
}

Paddle.prototype.draw = function () {
    if (this.reDraw) {
        log('paddle:redraw.');
        this.clearSelf();
        var c = this.ctx;
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
        this.reDraw = false;
        this.oldX = this.x;
        this.oldY = this.y;
    }
}

Paddle.prototype.update = function () {
    this.draw();
}