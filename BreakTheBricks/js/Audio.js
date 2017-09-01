class Audio {
    constructor(src, loop) {
        let a = document.createElement('audio');
        a.src = src;
        a.loop = loop;
        a.load();
        this.audio = a;
        this.src = src;
        this.loop = loop;
    };

    play() {
        this.audio.play();
    };

    pause() {
        this.audio.pause();
    };
}
