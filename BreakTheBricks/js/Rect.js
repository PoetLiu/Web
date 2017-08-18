function Rect(ctx, x, y, width, heigth) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = heigth;
    this.ctx = ctx;
    this.needReDraw = true;
    this.oldX = x;
    this.oldY = y;
    this.reDraw = true;
}

