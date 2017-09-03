class SceneMain extends Scene {
    constructor(game) {
        super(game);
        this.ball = null;
        this.paddle = null;
        this.bricks = [];
        this.debugText = null;
        this.images = [];
        this.score = 0;
        this.level = 1;
        this.bounceAudio = null;
    };

    getDebugText() {
        let t = '';
        let g = this.game;
        t += 'FPS:' + g.fps + ' State:' + g.state + ' Paused:' + g.paused;
        t += ' Score:' + this.score + ' Level:' + this.level;
        return t;
    };

    loadBricks() {
        let g = this.game;
        let l = loadLevel(this.level);

        if (!l) {
            g.setGameState('win');
            return;
        }
        let b = l.bricks;
        let images = this.images;
        for (let i = 0; i < b.length; i += 3) {
            images.push(new Brick(g.ctx, b[i], b[i + 1], 80, 25, getBrickColorByLife(b[i + 2]), b[i + 2]));
        }
    };

    playBounceMusic() {
        this.bounceAudio.play();
    };

    init() {
        let g = this.game;
        let images = this.images;

        this.ball = new Ball(g.ctx, 300, 15, 15, 'red');
        this.paddle = new Paddle(g.ctx, 300, 500, 180, 20, 'black');
        images.push(this.ball);
        images.push(this.paddle);
        if (g.debugMode) {
            this.debugText = new Text(g.ctx, 0, 630, 20, 'gray', 'serif', 0.5, this.getDebugText.bind(this));
            images.push(this.debugText);
        }
        this.loadBricks();

        let _this = this;
        let e = this.eventManager;
        e.addEventListenerTo(window, 'mousedown', function (event) {
            let x = event.offsetX, y = event.offsetY;
            let items = _this.images;
            for (let i = 0; i < items.length; i++) {
                let t = items[i];
                if (t.dragble && t.hasPoint(x, y)) {
                    t.onDraging = true;
                }
            }
        });

        e.addEventListenerTo(window, 'mousemove', function (event) {
            let x = event.offsetX, y = event.offsetY;
            let items = _this.images;
            for (let i = 0; i < items.length; i++) {
                let t = items[i];
                if (t.onDraging) {
                    t.onDragTo && t.onDragTo(x, y);
                }
            }
        });

        e.addEventListenerTo(window, 'mouseup', function () {
            let items = _this.images;
            for (let i = 0; i < items.length; i++) {
                let t = items[i];
                if (t.onDraging) {
                    t.onDraging = false;
                }
            }
        });

        e.addEventListenerTo(window, 'keydown', function (event) {
            let k = event.key;
            let p = _this.paddle;
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }
            if (g.paused) {
                return;
            }
            if (k === 'j' || k === 'J') {
                p.moveLeft();
                event.preventDefault();
            } else if (k === 'k' || k === 'K') {
                p.movedRight();
                event.preventDefault();
            } else {
            }
        }, true);

        this.bounceAudio = new Audio('data/bounce.mp3', false);
    };

    fini() {
        super.fini();
    };

    update() {
        let g = this.game;
        let ball = this.ball;
        let images = this.images;
        let aliveBricks = 0;
        let hadCollide = false;

        // log('SceneMain update.');
        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            // collide check.
            if (!g.paused && img && img.collideAble) {
                let c = ball.checkCollideWith(img);
                if (c.collide) {
                    hadCollide = true;
                    ball.onCollide(c);
                    img.onCollide(c);
                    if (img instanceof Brick) {
                        this.score += img.point;
                    }
                }
            }

            if (img instanceof Brick && img.visible) {
                aliveBricks++;
            }
            img.update(g.paused, hadCollide);
        }

        if (hadCollide) {
            this.playBounceMusic();
        }

        // next level
        if (!aliveBricks) {
            this.level++;
            this.loadBricks();
        }

        // game over check
        if (ball.collideWallDir === 'bottom') {
            g.setGameState('over');
        }
    };
}
