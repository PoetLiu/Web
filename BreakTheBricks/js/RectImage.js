function RectImage(ctx, x, y, width, height, color) {
    Rect.call(this, x, y, width, height);
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

RectImage.prototype = Object.create(Rect.prototype);
RectImage.prototype.constructor = RectImage;

RectImage.prototype.clearSelf = function () {
   var c = this.ctx;
    c.clearRect(this.oldX, this.oldY, this.w, this.h);
};

RectImage.prototype.hasPoint = function (x, y) {
    return numIsInSection(x, this.x, this.x+this.w) && numIsInSection(y, this.y, this.y+this.h);
};