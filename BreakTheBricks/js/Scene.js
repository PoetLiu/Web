class Scene {
    constructor(game) {
        this.game = game;
        this.eventManager = new EventListenerManager();
        this.textures = [];
    };

    init() {
    };

    fini() {
        this.eventManager.removeAll();
        this.clearSelf();
    };

    addTexture (t) {
       this.textures.push(t);
    }

    update () {
        for (let i = 0; i < this.textures.length; i++) {
            let t = this.textures[i];
            t.update();
        }
    };

    clearSelf() {
        let g = this.game;
        let ctx = g.ctx;
        let can = g.canvas;
        // log(this, can.width, can.height);
        ctx.clearRect(0, 0, can.width, can.height);
    };
}