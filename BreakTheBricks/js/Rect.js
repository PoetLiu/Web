function Rect(ctx, x, y, width, heigth, color) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = heigth;
    this.ctx = ctx;
    this.oldX = x;
    this.oldY = y;
    this.color = color;
    this.reDraw = true;
    this.collideAble = true;
    this.dragble = false;
    this.onDraging = false;
    this.alpha = 1;
}

Rect.prototype.clearSelf = function () {
   var c = this.ctx;
    c.clearRect(this.oldX, this.oldY, this.w, this.h);
};

Rect.prototype.checkCollideWith = function (rect) {
    if (this === rect || !rect) {
        return collideResult(false, 0, 0, rect);
    }
    var a = rect;
    var b = this;
    var w = Math.max(Math.min(a.x+a.w-b.x, b.x+b.w-a.x, a.w, b.w), 0);
    var h = Math.max(Math.min(a.y+a.h-b.y, b.y+b.h-a.y, a.h, b.h), 0);

    return collideResult(w*h>0, w, h, rect);
};

Rect.prototype.hasPoint = function (x, y) {
    return numIsInSection(x, this.x, this.x+this.w) && numIsInSection(y, this.y, this.y+this.h);
};