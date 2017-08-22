function EventListenerManager() {
    this.liseners = [];
}

EventListenerManager.prototype.addEventListenerTo = function (target) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    target.addEventListener.apply(target, args);
    this.liseners.push({t: target, args: args});
};

EventListenerManager.prototype.removeAll = function () {
    for (var i = 0; i < this.liseners.length; i++) {
        var o = this.liseners[i];
        o.t.removeEventListener.apply(o.t, o.args);
    }
};
