class SceneStart extends Scene {
    constructor(game) {
        super(game);
        this.texts = [];
        this.bgAudio = null;
    };

    init() {
        let g = this.game;
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

    fini() {
        Scene.prototype.fini.call(this);
        this.bgAudio.pause();
    };

    playBgMusic() {
        this.bgAudio.play();
    };

    update() {
        // log('SceneStart update.');
        for (let i = 0; i < this.texts.length; i++) {
            let t = this.texts[i];
            t.update();
        }
    };
}
