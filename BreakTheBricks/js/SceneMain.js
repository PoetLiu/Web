function SceneMain(game) {
    Scene.call(this, game);
    this.ball = null;
    this.paddle = null;
    this.bricks = [];
    this.debugText = null;
    this.images = [];
    this.score = 0;
    this.level = 1;
    this.maxLevel = 0;
}

SceneMain.prototype = Object.create(Scene.prototype);
SceneMain.constructor = SceneMain;

SceneMain.prototype.getDebugText = function () {
    var t = '';
    var g = this.game;
    t += 'FPS:' + g.fps + ' State:' + g.state + ' Paused:' + g.paused;
    t += ' Score:' + this.score + ' Level:' + this.level;
    return t;
};

SceneMain.prototype.loadBricks = function () {
    var g = this.game;
    var l = loadLevel(this.level);

    if (!l) {
        g.setGameState('win');
        return;
    }
    var b = l.bricks;
    var images = this.images;
    for (var i = 0; i < b.length; i += 3) {
        images.push(new Brick(g.ctx, b[i + 0], b[i + 1], 80, 25, getBrickColorByLife(b[i + 2]), b[i + 2]));
    }
};

SceneMain.prototype.init = function () {
    var g = this.game;
    var images = this.images;
    var _this = this;

    this.ball = new Ball(g.ctx, 300, 20, 20, 'red');
    this.paddle = new Paddle(g.ctx, 300, 500, 180, 20, 'black');
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

SceneMain.prototype.update = function () {
    var g = this.game;
    var ball = this.ball;
    var images = this.images;
    var ctx = g.ctx;
    var aliveBricks = 0;

    // log('SceneMain update.');
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        // collide check.
        if (!g.paused && img && img.collideAble) {
            var c = ball.checkCollideWith(img);
            if (c.collide) {
                ball.onCollide(c);
                img.onCollide(c);
                if (img instanceof Brick) {
                    this.score += img.point;
                }
            }
        }

        if (img instanceof Brick && img.visible) {
            aliveBricks++;
        }
        img.update(g.paused);
    }

    // next level
    if (!aliveBricks) {
        this.level++;
        this.loadBricks();
    }

    // game over check
    if (ball.collideWallDir === 'bottom') {
        g.setGameState('over');
    }
};
