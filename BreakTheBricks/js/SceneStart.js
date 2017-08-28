function SceneStart(game) {
    Scene.call(this, game);
    this.texts = [];
    this.bgAudio = null;
}

SceneStart.prototype = Object.create(Scene.prototype);
SceneStart.prototype.constructor = SceneStart;

SceneStart.prototype.init = function () {
    var g = this.game;
    this.texts.push(new Text(g.ctx, 220, 200, 50, 'black', 'serif', 1.0, function () {
        return 'Break The Bricks';
    }));
    this.texts.push(new Text(g.ctx, 220, 280, 30, 'black', 'serif', 0.8, function () {
        return 'Press j to move left the paddle.';
    }));
    this.texts.push(new Text(g.ctx, 220, 310, 30, 'black', 'serif', 0.8, function () {
        return 'Press k to move right the paddle.';
    }));
    this.texts.push(new Text(g.ctx, 220, 340, 30, 'black', 'serif', 0.8, function () {
        return 'Press s to start game.';
    }));
    if (g.debugMode) {
        this.texts.push(new Text(g.ctx, 220, 370, 30, 'black', 'serif', 0.8, function () {
            return 'Press space to pause/continue game.';
        }));
    }
    this.bgAudio = new Audio('data/background.mp3', true);
    this.playBgMusic();
};

SceneStart.prototype.fini = function () {
    Scene.prototype.fini.call(this);
    this.bgAudio.pause();
};

SceneStart.prototype.playBgMusic = function () {
    this.bgAudio.play();
};

SceneStart.prototype.update = function () {
    // log('SceneStart update.');
    for (var i = 0; i < this.texts.length; i++) {
        var t = this.texts[i];
        t.update();
    }
};