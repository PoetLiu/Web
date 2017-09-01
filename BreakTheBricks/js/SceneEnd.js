class SceneEnd extends Scene {
    constructor(game) {
        super(game);
        this.texts = [];
        this.bgAudio = null;
    };

    init() {
        let g = this.game;
        let score = g.sceneOld.score;
        this.texts.push(new Text(g.ctx, 220, 200, 50, 'black', 'serif', 1.0, function () {
            return g.state === 'win' ? 'Wow, you win!' : 'Oops! You lose.';
        }));
        this.texts.push(new Text(g.ctx, 360, 260, 40, 'red', 'serif', 0.8, function () {
            return score + '';
        }));
        this.texts.push(new Text(g.ctx, 220, 300, 30, 'black', 'serif', 0.8, function () {
            return 'Press r to restart the game.';
        }));
        this.bgAudio = new Audio('data/game' + (g.state === 'win' ? 'Win' : 'Over') + '.mp3', false);
        log(g.state, this.bgAudio.src);
        this.bgAudio.play();
    };

    update() {
        // log('SceneEnd update.');
        for (let i = 0; i < this.texts.length; i++) {
            let t = this.texts[i];
            t.update();
        }
    };
}