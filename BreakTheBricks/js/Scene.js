class Scene {
    constructor(game) {
        this.game = game;
        this.eventManager = new EventListenerManager();
    };

    init() {
    };

    fini() {
        this.eventManager.removeAll();
        this.clearSelf();
    };

    clearSelf() {
        let g = this.game;
        let ctx = g.ctx;
        let can = g.canvas;
        // log(this, can.width, can.height);
        ctx.clearRect(0, 0, can.width, can.height);
    };
}