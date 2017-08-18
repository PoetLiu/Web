function Game(canvas, fps) {
    this.status = "init";
    this.score = 0;
    this.level = 1;
    this.canvas = canvas;
    this.fps = fps;
    this.paused = true;
    this.intervalId = 0;
    this.debugMode = true;
    this.images = {
        bricks: null,
        ball:null,
        paddle:null,
    };
}

Game.prototype.init = function () {
    log("Game init.", this);
    this.ctx = this.canvas.getContext('2d');
    this.images['ball']     = new Ball(this.ctx, 300, 20, 20, 'red');
    this.images['bricks']   = new Brick(this.ctx, 0, 0, 100, 20, 'gray');
    this.images['paddle']   = new Paddle(this.ctx, 300, 500, 200, 30, 'black');
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

    var input = document.getElementById('game-input');
    input.value = this.fps.toString();
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
    var _this = this;
    setTimeout(function () {
        _this.update();
    }, 1000/_this.fps);

    if (this.status !== 'init' && (this.paused || this.debugMode)) {
        return;
    }

    if (this.status === 'init') {
        this.status = 'running';
    }

    var ball = this.images['ball'];
    var paddle = this.images['paddle'];
    var brick = this.images['bricks'];
    var c = ball.collideWith(paddle);

    if (c.collide) {
        log('Paddle collide');
        paddle.reDraw = true;
        if (c.w > c.h) {
            ball.bounceY();
        } else if (c.w < c.h) {
            ball.bounceX();
        } else {
            ball.bounceX();
            ball.bounceY();
        }
    }

    c = ball.collideWith(brick);
    if (c.collide) {
        this.score += brick.point;
        brick.hide();
        if (c.w > c.h) {
            ball.bounceY();
        } else if (c.w < c.h) {
            ball.bounceX();
        } else {
            ball.bounceX();
            ball.bounceY();
        }
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
    window.clearInterval(this.intervalId);
}