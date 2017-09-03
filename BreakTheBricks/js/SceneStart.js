class SceneStart extends Scene {
    constructor(game) {
        super(game);
        this.bgAudio = null;
    };

    init() {
        let g = this.game;
        this.addTexture(new Text(g.ctx, 220, 200, 50, 'black', 'serif', 1.0, function () {
            return 'Break The Bricks';
        }));
        this.addTexture(new Text(g.ctx, 220, 280, 30, 'black', 'serif', 0.8, function () {
            return 'Press j to move left the paddle.';
        }));
        this.addTexture(new Text(g.ctx, 220, 310, 30, 'black', 'serif', 0.8, function () {
            return 'Press k to move right the paddle.';
        }));
        this.addTexture(new Text(g.ctx, 220, 340, 30, 'black', 'serif', 0.8, function () {
            return 'Press s to start game.';
        }));
        if (g.debugMode) {
            this.addTexture(new Text(g.ctx, 220, 370, 30, 'black', 'serif', 0.8, function () {
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
        super.update();
    };
}
