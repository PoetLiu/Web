function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
}

Rect.prototype.checkCollideWith = function (rect) {
    if (this === rect || !rect) {
        return collideResult(false, 0, 0, rect);
    }
    let a = rect;
    let b = this;
    let w = Math.max(Math.min(a.x + a.w - b.x, b.x + b.w - a.x, a.w, b.w), 0);
    let h = Math.max(Math.min(a.y + a.h - b.y, b.y + b.h - a.y, a.h, b.h), 0);

    return collideResult(w*h>0, w, h, rect);
};