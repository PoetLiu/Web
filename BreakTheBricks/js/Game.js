function Game(canvas, fps) {
    this.status = "init";
    this.score = 0;
    this.level = 1;
    this.canvas = canvas;
    this.fps = fps;
    this.paused = true;
    this.timeoutId = 0;
    this.debugMode = true;
    this.input = document.getElementById('game-input');
    this.images = {
        bricks: null,
        ball:null,
        paddle:null,
        debugText:null,
    };
    this.dragItems = [];
}

Game.prototype.getDebugText = function () {
    var b = this.images['ball'];
    var t = '';
    t += 'FPS:' + this.fps + ' Status:' + this.status + ' Paused:' + this.paused;
    t += ' Score:' + this.score + ' Level:' + this.level;
    t += ' Ball:(' + b.x + ', ' + b.y + ')';

    return t;
}

Game.prototype.init = function () {
    log("Game init.", this);
    this.ctx = this.canvas.getContext('2d');
    this.images['ball']     = new Ball(this.ctx, 300, 20, 20, 'red');
    this.images['bricks']   = new Brick(this.ctx, 0, 0, 100, 20, 'gray');
    this.images['paddle']   = new Paddle(this.ctx, 300, 500, 200, 30, 'black');
    if (this.debugMode) {
        var text = this.getDebugText();
        this.dragItems.push(this.images['ball']);
        this.dragItems.push(this.images['paddle']);
        this.images['debugText'] = new Text(this.ctx, 0, 630, 20, 'gray', 'serif', text);
    }

    var _this = this;
    window.addEventListener('keydown', function (event) {
        var k = event.key;
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
        if (_this.debugMode && (k === 'p' || k === 'P' || k === ' ')) {
            _this.paused = !_this.paused;
            event.preventDefault();
        }
        if (k === 's' || k === 'S') {
            _this.paused = false;
            event.preventDefault();
        }
    }, true);

    if (!this.debugMode) {
       return;
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

    var input = this.input;
    input.value = this.fps.toString();
    input.style.display = 'block';
    window.addEventListener('change', function (event) {
        if (event.target === input) {
            _this.fps   = Number(event.target.value);
        }
    });
}

Game.prototype.clearCanvas = function () {
    var c = this.ctx;
    c.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.update = function () {
    //log('update');
    var _this = this;
    this.timeoutId  = setTimeout(function () {
        _this.update();
    }, 1000/_this.fps);

    if (this.status !== 'init' && this.paused) {
        return;
    }

    if (this.status === 'init') {
        this.status = 'running';
    }

    if (this.debugMode) {
       var text = this.getDebugText();
       this.images['debugText'].setText(text);
    }

    //log('update');
    // update
    var names = Object.getOwnPropertyNames(this.images);
    var ball = this.images['ball'];
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var img = this.images[name];
        // collide check.
        if (img && img.collideAble) {
            var c = ball.checkCollideWith(img);
            if (c.collide) {
                ball.onCollide(c);
                img.onCollide(c);
                if (name === 'bricks') {
                    this.score += img.point;
                }
            }
        }
        img.update();
    }
}

Game.prototype.run = function() {
    log("Game run.");
    this.update();
}

Game.prototype.start = function () {
    this.init();
    this.run();
}

Game.prototype.stop = function () {
    window.clearTimeout(this.timeoutId);
}