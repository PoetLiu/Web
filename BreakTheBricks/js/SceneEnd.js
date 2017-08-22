function SceneEnd(game) {
    Scene.call(this, game);
    this.texts = [];
}

SceneEnd.prototype = Object.create(Scene.prototype);
SceneEnd.constructor = SceneEnd;

SceneEnd.prototype.init = function () {
    var g = this.game;
    this.texts.push(new Text(g.ctx, 220, 200, 50, 'black', 'serif', function () {
        return g.state === 'win' ? 'Wow, you win!' : 'Oops! You lose.';
    }));
    this.texts.push(new Text(g.ctx, 360, 260, 40, 'red', 'serif', function () {
        return g.score + '';
    }));
    this.texts.push(new Text(g.ctx, 220, 300, 30, 'black', 'serif', function () {
        return 'Press r to restart the game.';
    }));
};

SceneEnd.prototype.update = function () {
    // log('SceneEnd update.');
    for (var i = 0; i < this.texts.length; i++) {
        var t = this.texts[i];
        t.update();
    }
};