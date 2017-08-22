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
    var l = this.liseners;

    for (var i = 0; i < l.length; l++) {
        var o = l[i];
        var t = o.t;
        var args = o.args;
        t.removeEventListener.apply(t, args);
    }
    this.liseners   = [];
};
