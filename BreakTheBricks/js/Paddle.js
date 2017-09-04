class Paddle extends RectImage {
    constructor(ctx, x, y, width, height, color) {
        super(ctx, x, y, width, height, color);
        this.speedX = 30;
        this.dragble = true;
    };

    onDragTo(x) {
        this.moveTo(x - this.w / 2, this.y);
        this.draw();
    };

    getSpeed() {
        return this.speedX;
    };

    setSpeed(speed) {
        if (speed.x) {
            this.speedX = speed.x;
        }
    };

    moveTo(x, y) {
        let c = this.ctx.canvas;
        this.x = numInSection(x, 0, c.width - this.w);
        this.y = y;
        this.reDraw = (this.x !== this.oldX || this.y !== this.oldY);
    };

    moveLeft() {
        this.moveTo(this.x - this.speedX, this.y);
    };

    movedRight() {
        this.moveTo(this.x + this.speedX, this.y);
    };

    onCollide() {
        //log(area);
        this.reDraw = true;
    };

    draw() {
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

    update(paused) {
        if (paused) {
            return;
        }
        this.draw();
    };
}
