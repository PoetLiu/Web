class EventListenerManager {
    constructor() {
        this.liseners = [];
    };

    addEventListenerTo(target) {
        let args = Array.prototype.slice.call(arguments);
        args.shift();
        target.addEventListener.apply(target, args);
        this.liseners.push({t: target, args: args});
    };

    removeAll() {
        for (let i = 0; i < this.liseners.length; i++) {
            let o = this.liseners[i];
            o.t.removeEventListener.apply(o.t, o.args);
        }
    };
}
