function Game(canvas, fps) {
    this.state = '';
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
    this.setGameState('init');

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
            _this.setGameState('run');
            event.preventDefault();
        }
        if (k === 'r' || k === 'R') {
            _this.setGameState('init');
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

Game.prototype.update = function () {
    //log('update');
    var _this = this;
    this.timeoutId  = setTimeout(function () {
        _this.update();
    }, 1000/_this.fps);

    // update
    this.sceneCurrent.update();
};

Game.prototype.setGameState = function (state) {
    if (this.state === state) {
        return;
    }
    switch (state) {
        case 'init':
            this.replaceScene(new SceneStart(this));
            this.paused = false;
            break;
        case 'run':
            this.replaceScene(new SceneMain(this));
            this.paused = false;
            break;
        case 'over':
        case 'win':
            this.paused = true;
            this.replaceScene(new SceneEnd(this));
            break;
        default:
            log('unknown state:' + state);
            return;
    }
    log('state:' + state);
    this.state = state;
};

Game.prototype.replaceScene = function (newScene) {
    this.sceneCurrent && this.sceneCurrent.fini();
    this.sceneCurrent = newScene;
    this.sceneCurrent.init();
};

Game.prototype.run = function() {
    log("Game run.", this);
    this.update();
};

Game.prototype.start = function () {
    this.init();
    this.run();
};

Game.prototype.stop = function () {
    window.clearTimeout(this.timeoutId);
};