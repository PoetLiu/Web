class RectImage extends Rect {
    constructor(ctx, x, y, width, height, color) {
        super(x, y, width, height);
        this.ctx = ctx;
        this.oldX = x;
        this.oldY = y;
        this.color = color;
        this.reDraw = true;
        this.collideAble = true;
        this.dragble = false;
        this.onDraging = false;
        this.alpha = 1;
    };

    clearSelf() {
        let c = this.ctx;
        c.clearRect(this.oldX, this.oldY, this.w, this.h);
    };

    hasPoint(x, y) {
        return numIsInSection(x, this.x, this.x + this.w) && numIsInSection(y, this.y, this.y + this.h);
    };
}