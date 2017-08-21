function Scene(game) {
    this.game = game;
    this.ball = null;
    this.paddle = null;
    this.bricks = [];
    this.debugText = null;
    this.images = [];
}

Scene.prototype.getDebugText = function () {
    var t = '';
    var g = this.game;
    t += 'FPS:' + g.fps + ' State:' + g.state + ' Paused:' + g.paused;
    t += ' Score:' + g.score + ' Level:' + g.level;
    return t;
};

Scene.prototype.loadBricks = function () {
    var g = this.game;
    var l = loadLevel(g.level);

    if (!l) {
        g.setGameState('win');
        return;
    }
    var b = l.bricks;
    var images = this.images;
    for (var i = 0; i < b.length; i += 3) {
        images.push(new Brick(g.ctx, b[i + 0], b[i + 1], 100, 20, getBrickColorByLife(b[i + 2]), b[i + 2]));
    }
};

Scene.prototype.init = function () {
    var g = this.game;
    var images = this.images;
    var _this = this;
    var onBallCollideCtxBorder = function (dir) {
        if (dir === 'bottom') {
            g.setGameState('over');
        }
        // log(dir);
    };
    this.ball = new Ball(g.ctx, 300, 20, 20, 'red', onBallCollideCtxBorder);
    this.paddle = new Paddle(g.ctx, 300, 500, 200, 30, 'black');
    images.push(this.ball);
    images.push(this.paddle);
    if (g.debugMode) {
        this.debugText = new Text(g.ctx, 0, 630, 20, 'gray', 'serif', this.getDebugText.bind(this));
        images.push(this.debugText);
    }
    this.loadBricks();

    window.addEventListener('mousedown', function (event) {
        var x = event.offsetX, y = event.offsetY;
        var items = _this.images;
        for (var i = 0; i < items.length; i++) {
            var t = items[i];
            if (t.dragble && t.hasPoint(x, y)) {
                t.onDraging = true;
            }
        }
    });

    window.addEventListener('mousemove', function (event) {
        var x = event.offsetX, y = event.offsetY;
        var items = _this.images;
        for (var i = 0; i < items.length; i++) {
            var t = items[i];
            if (t.onDraging) {
                t.onDragTo && t.onDragTo(x, y);
            }
        }
    });

    window.addEventListener('mouseup', function (event) {
        var items = _this.images;
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
    var ball = this.ball;
    var images = this.images;
    var ctx = g.ctx;
    var aliveBricks = 0;

    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        // collide check.
        if (!g.paused && img && img.collideAble) {
            var c = ball.checkCollideWith(img);
            if (c.collide) {
                ball.onCollide(c);
                img.onCollide(c);
                if (img instanceof Brick) {
                    g.score += img.point;
                }
            }
        }

        if (img instanceof Brick && img.visible) {
            aliveBricks++;
        }
        img.update(g.paused);
    }

    if (!aliveBricks) {
        g.level++;
        this.loadBricks();
    }
};
