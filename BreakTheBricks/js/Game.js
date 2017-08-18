function Game(canvas, fps) {
    this.status = "init";
    this.score = 0;
    this.level = 1;
    this.canvas = canvas;
    this.fps = fps;
    this.paused = true;
    this.intervalId = 0;
    this.images = {
        bricks: null,
        ball:null,
        paddle:null,
    };
}

Game.prototype.init = function () {
    log("Game init.", this);
    this.ctx = this.canvas.getContext('2d');
    this.images['ball'] = new Ball(this.ctx, 300, 20, 20);
    this.images['bricks'] = new Brick(this.ctx, 0, 0, 100, 20);
    this.images['paddle'] = new Paddle(this.ctx, 300, 500, 200, 30);
    var _this = this;
    window.addEventListener('keydown', function (event) {
        var k = event.key;
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
        if (k === 'p' || k === 'P') {
            _this.paused = !_this.paused;
            event.preventDefault();
        }
        if (k === 's' || k === 'S') {
            _this.paused = false;
            event.preventDefault();
        }
    }, true);
}

Game.prototype.clearCanvas = function () {
    var c = this.ctx;
    c.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.update = function () {
    if (this.status !== 'init' && this.paused) {
        return;
    }

    if (this.status === 'init') {
        this.status = 'running';
    }

    //log('update');
    // update
    var names = Object.getOwnPropertyNames(this.images);
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let img = this.images[name];
        img.update();
    }
}

Game.prototype.run = function() {
    log("Game run.");
    var _this = this;
    this.intervalId = window.setInterval(function () {
        _this.update();
    }, 1000 / _this.fps);
}

Game.prototype.start = function () {
    this.init();
    this.run();
}

Game.prototype.stop = function () {
    window.clearInterval(this.intervalId);
}