function Rect(ctx, x, y, width, heigth, color) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = heigth;
    this.ctx = ctx;
    this.needReDraw = true;
    this.oldX = x;
    this.oldY = y;
    this.color = color;
    this.reDraw = true;
}

Rect.prototype.collideWith = function (rect) {
    var a = rect;
    var b = this;
    var w1 = Math.max(Math.min(a.x+a.w-b.x, b.x+b.w-a.x, a.w, b.w), 0);
    var h1 = Math.max(Math.min(a.y+a.h-b.y, b.y+b.h-a.y, a.h, b.h), 0);

    return {collide:w1*h1, w:w1, h:h1};
}

Rect.prototype.hasPoint = function (x, y) {
    return numIsInSection(x, this.x, this.x+this.w) && numIsInSection(y, this.y, this.y+this.h);
}