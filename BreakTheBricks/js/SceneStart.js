function SceneStart(game) {
    Scene.call(this, game);
    this.texts = [];
}

SceneStart.prototype = Object.create(Scene.prototype);
SceneStart.constructor = SceneStart;

SceneStart.prototype.init = function () {
    var g = this.game;
    this.texts.push(new Text(g.ctx, 220, 200, 50, 'black', 'serif', function () {
        return 'Break The Bricks';
    }));
    this.texts.push(new Text(g.ctx, 220, 280, 30, 'black', 'serif', function () {
        return 'Press j to move left the paddle.';
    }));
    this.texts.push(new Text(g.ctx, 220, 310, 30, 'black', 'serif', function () {
        return 'Press k to move right the paddle.';
    }));
    this.texts.push(new Text(g.ctx, 220, 340, 30, 'black', 'serif', function () {
        return 'Press s to start game.';
    }));
    if (g.debugMode) {
        this.texts.push(new Text(g.ctx, 220, 370, 30, 'black', 'serif', function () {
            return 'Press space to pause/continue game.';
        }));
    }
};

SceneStart.prototype.update = function () {
    // log('SceneStart update.');
    for (var i = 0; i < this.texts.length; i++) {
        var t = this.texts[i];
        t.update();
    }
};