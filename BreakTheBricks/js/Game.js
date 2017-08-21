function Game(canvas, fps) {
    this.status = "init";
    this.score = 0;
    this.level = 1;
    this.canvas = canvas;
    this.fps = fps;
    this.paused = false;
    this.timeoutId = 0;
    this.debugMode = true;
    this.input = document.getElementById('game-input');
    this.sceneCurrent = null;
}

Game.prototype.init = function () {
    log("Game init.");
    this.ctx = this.canvas.getContext('2d');
    this.sceneCurrent = new Scene(this);
    this.sceneCurrent.init();

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

    var input = this.input;
    input.value = this.fps.toString();
    input.style.display = 'block';
    window.addEventListener('change', function (event) {
        if (event.target === input) {
            _this.fps   = Number(event.target.value);
        }
    });
};

Game.prototype.clearSelf = function () {
    var c = this.ctx;
    c.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.update = function () {
    //log('update');
    var _this = this;
    this.timeoutId  = setTimeout(function () {
        _this.update();
    }, 1000/_this.fps);

    // update
    this.sceneCurrent.update();

    if (this.status === 'init') {
        this.status = 'running';
        this.paused = true;
    }
};

Game.prototype.run = function() {
    log("Game run.", this);
    this.update();
};

Game.prototype.start = function () {
    this.init();
    this.clearSelf();
    this.run();
};

Game.prototype.stop = function () {
    window.clearTimeout(this.timeoutId);
};