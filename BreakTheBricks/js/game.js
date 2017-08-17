function Game(canvas, images) {
    this.status = "Init";
    this.score = 0;
    this.level = 1;
    this.canvas = canvas;
    this.images = {
        block:null,
        ball:null,
        paddle:null,
    };
}

Game.prototype.init = function () {
    log("Game init.");
    var c = this.canvas;
    if (c.getContext) {
        var ctx = c.getContext('2d');

        // draw bricks
        ctx.fillRect(0, 0, 50, 50);

        // draw paddle
        ctx.fillRect(300, 300, 200, 50);

        // draw balls
        ctx.beginPath();
        ctx.arc(75, 75, 30, 0, Math.PI * 2, true);
        ctx.stroke();
    }
}

Game.prototype.run = function() {
    log("Game run.", this.run);
}

Game.prototype.start = function () {
    this.init();
    this.run();
}