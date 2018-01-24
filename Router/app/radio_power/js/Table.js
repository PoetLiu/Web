function Table(body) {
    this.items = [];
    this.body = body;
}

Table.prototype.parseRules = function (rules) {
    var self = this;
    $.each(rules, function (id, r) {
        self.items.push(new Rule(r));
    });
};

Table.prototype.ruleFind = function (id) {
    console.log(id);
    for (var i = 0; i < this.items.length; i++) {
        var r = this.items[i];
        if (r.data.idx === id) {
            return r;
        }
    }
};

Table.prototype.render = function () {
    $(this.body).empty();
    for (var i = 0; i < this.items.length; i++) {
        var r = this.items[i].getHTML();
        $(this.body).append(r);
    }
};