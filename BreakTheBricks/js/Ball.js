class Ball extends RectImage {
    constructor(ctx, x, y, radius, color) {
        super(ctx, x, y, radius * 2, radius * 2, color);
        this.speedX = 4;
        this.speedY = 4;
        this.r = radius;
        this.dragble = true;
        this.collideWallDir = 'none';
    };

    draw() {
        // draw balls
        if (this.reDraw) {
            let c = this.ctx;
            this.clearSelf();
            c.globalAlpha = this.alpha;
            c.beginPath();
            c.arc(this.x + this.r, this.y + this.r, this.r, 0, Math.PI * 2, true);
            c.fillStyle = this.color;
            c.fill();
            this.reDraw = false;
            this.oldX = this.x;
            this.oldY = this.y;
        }
    };

    onCollide(collideResult) {
        let c = collideResult;
        let a = c.area;

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

    bounceX() {
        this.speedX *= -1;
    };

    bounceY() {
        this.speedY *= -1;
    };

    onDragTo(x, y) {
        // log(this, x, y);
        this.moveTo(x - this.r, y - this.r);
        this.draw();
    };

    moveTo(x, y) {
        let c = this.ctx.canvas;
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

    move() {
        this.moveTo(this.x + this.speedX, this.y + this.speedY);
    };

    update(paused) {
        if (paused) {
            return;
        }
        this.move();
        this.draw();
    };
}
