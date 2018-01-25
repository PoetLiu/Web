function Table(body) {
    this.items = [];
    this.body = body;
}

Table.prototype.parseRules = function (rules) {
    var self = this;
    this.items  = [];
    $.each(rules, function (id, r) {
        self.items.push(new Rule(r));
    });
};

Table.prototype.itemForEach = function (iterator) {
    if (!iterator) {
        return;
    }
    for (var i = 0; i < this.items.length; i++) {
        iterator(i, this.items[i]);
    }
};

Table.prototype.ruleFind    = function(id) {
    var r = null;
    this.itemForEach(function (idx, item) {
        if (item.idEqualWith(idx)) {
            r = item;
        }
    });
    return r;
};

Table.prototype.render = function () {
    $(this.body).empty();
    for (var i = 0; i < this.items.length; i++) {
        var r = this.items[i].getHTML();
        // console.log(r);
        $(this.body).append(r);
    }
};