function Game(canvas, fps) {
    this.status = "init";
    this.score = 0;
    this.level = 1;
    this.canvas = canvas;
    this.fps = fps;
    this.paused = true;
    this.intervalId = 0;
    this.debugMode = true;
    this.input = document.getElementById('game-input');
    this.images = {
        bricks: null,
        ball:null,
        paddle:null,
        debugText:null,
    };
}

Game.prototype.getDebugText = function () {
    return 'FPS:'+this.fps+' Status:'+this.status+' Paused:'+this.paused+' Score:'+this.score+' Level'+this.level;
}

Game.prototype.init = function () {
    log("Game init.", this);
    this.ctx = this.canvas.getContext('2d');
    this.images['ball']     = new Ball(this.ctx, 300, 20, 20, 'red');
    this.images['bricks']   = new Brick(this.ctx, 0, 0, 100, 20, 'gray');
    this.images['paddle']   = new Paddle(this.ctx, 300, 500, 200, 30, 'black');
    if (this.debugMode) {
        var text = this.getDebugText();
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
    var drag = false;
    window.addEventListener('mousedown', function (event) {
        var x = event.offsetX, y = event.offsetY;
        var b = _this.images['ball'];
        if (b.hasPoint(x, y)) {
            drag = true;
        }
    });
    window.addEventListener('mousemove', function (event) {
        if (drag) {
            var x = event.offsetX, y = event.offsetY;
            var b = _this.images['ball'];
            b.moveTo(x-b.r, y-b.r);
            b.draw();
            //log('Drag.', event);
        }
    });
    window.addEventListener('mouseup', function (event) {
        drag = false;
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
    setTimeout(function () {
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

    // collide check.
    var ball = this.images['ball'];
    var paddle = this.images['paddle'];
    var c = ball.collideWith(paddle);
    if (c.collide) {
        //log('Paddle collide');
        paddle.reDraw = true;
        ball.onCollideWithRectArea(c.area);
    }

    var brick = this.images['bricks'];
    c = brick.visible && ball.collideWith(brick);
    if (c && c.collide) {
        this.score += brick.point;
        brick.hide();
        ball.onCollideWithRectArea(c.area);
    }

    //log('update');
    // update
    var names = Object.getOwnPropertyNames(this.images);
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var img = this.images[name];
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
    window.clearTimeout(this.intervalId);
}