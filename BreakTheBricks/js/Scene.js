function Scene(game) {
    this.game = game;
    this.eventManager = new EventListenerManager();
}

Scene.prototype.init = function () {
};

Scene.prototype.fini = function () {
    this.eventManager.removeAll();
    this.clearSelf();
};

Scene.prototype.clearSelf = function () {
    let g = this.game;
    let ctx = g.ctx;
    let can = g.canvas;
    // log(this, can.width, can.height);
    ctx.clearRect(0, 0, can.width, can.height);
};