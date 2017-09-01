function Audio(src, loop) {
    let a = document.createElement('audio');
    a.src   = src;
    a.loop  = loop;
    a.load();
    this.audio = a;
    this.src = src;
    this.loop    = loop;
}

Audio.prototype.play = function () {
    this.audio.play();
};

Audio.prototype.pause = function () {
    this.audio.pause();
};
