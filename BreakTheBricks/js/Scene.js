function Scene(game) {
    this.game = game;
    this.images = {};
    this.dragItems = [];
}

Scene.prototype.getDebugText = function () {
    var t = '';
    var g = this.game;
    t += 'FPS:' + g.fps + ' Status:' + g.status + ' Paused:' + g.paused;
    t += ' Score:' + g.score + ' Level:' + g.level;
    return t;
};

Scene.prototype.init = function () {
    var g = this.game;
    this.images['ball'] = new Ball(g.ctx, 300, 20, 20, 'red');
    this.images['brick'] = new Brick(g.ctx, 0, 0, 100, 20, 'gray');
    this.images['paddle'] = new Paddle(g.ctx, 300, 500, 200, 30, 'black');
    if (g.debugMode) {
        this.dragItems.push(this.images['ball']);
        this.dragItems.push(this.images['paddle']);
        this.images['debugText'] = new Text(g.ctx, 0, 630, 20, 'gray', 'serif', this.getDebugText.bind(this));
    }

    var _this = this;
    window.addEventListener('mousedown', function (event) {
        var x = event.offsetX, y = event.offsetY;
        var items = _this.dragItems;
        for (var i = 0; i < items.length; i++) {
            var t = items[i];
            if (t.dragble && t.hasPoint(x, y)) {
                t.onDraging = true;
            }
        }
    });

    window.addEventListener('mousemove', function (event) {
        var x = event.offsetX, y = event.offsetY;
        var items = _this.dragItems;
        for (var i = 0; i < items.length; i++) {
            var t = items[i];
            if (t.onDraging) {
                t.onDragTo && t.onDragTo(x, y);
            }
        }
    });

    window.addEventListener('mouseup', function (event) {
        var items = _this.dragItems;
        for (var i = 0; i < items.length; i++) {
            var t = items[i];
            if (t.onDraging) {
                t.onDraging = false;
            }
        }
    });
};

Scene.prototype.update = function () {
    var g = this.game;

    var names = Object.getOwnPropertyNames(this.images);
    var ball = this.images['ball'];
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var img = this.images[name];
        // collide check.
        if (!g.paused && img && img.collideAble) {
            var c = ball.checkCollideWith(img);
            if (c.collide) {
                ball.onCollide(c);
                img.onCollide(c);
                if (name === 'bricks') {
                    this.score += img.point;
                }
            }
        }
        img.update(g.paused);
    }
};
