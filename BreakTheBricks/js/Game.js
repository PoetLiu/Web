function Game(canvas, fps) {
    this.state = "init";
    this.score = 0;
    this.level = 1;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.fps = fps;
    this.paused = false;
    this.timeoutId = 0;
    this.debugMode = true;
    this.input = document.getElementById('game-input');
    this.sceneCurrent = null;
}

Game.prototype.init = function () {
    log("Game init.");
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

    this.setGameState('init');
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

    if (this.state === 'win' || this.state === 'over') {
        return;
    }
    // update
    this.sceneCurrent.update();
};

Game.prototype.setGameState = function (state) {
    if (this.state === state) {
        return;
    }
    switch (state) {
        case 'init':
            this.paused = false;
            break;
        case 'run':
            this.paused = true;
            break;
        case 'over':
            alert('Game Over!\nScore '+this.score);
            this.paused = true;
            break;
        case 'win':
            alert('Wow! You Win!\nScore '+this.score);
            this.paused = true;
            break;
        default:
            log('unknown state:' + state);
            return;
    }
    log('state:' + state);
    this.state = state;
};

Game.prototype.run = function() {
    log("Game run.", this);
    this.update();
    this.setGameState('run');
};

Game.prototype.start = function () {
    this.init();
    this.clearSelf();
    this.run();
};

Game.prototype.stop = function () {
    window.clearTimeout(this.timeoutId);
};