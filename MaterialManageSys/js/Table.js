function Table(id, pageSize) {
    this.id = id;
    this.dom = document.getElementById(id);
    this.pageId = 0;
    this.pageSize = pageSize;
}

Table.prototype.setPageSize = function (size, autoUpdate) {
    autoUpdate  = autoUpdate || true;
    this.pageSize   = size;
    console.log('Set page size:'+size);
    if (autoUpdate) {
        this.update();
    }
};

Table.prototype.update = function (data, keys) {
    var t = this.dom;
    data    = data || this.data;
    keys    = keys || this.keys;

    this.keys   = keys;
    this.data   = data;

    t.innerHTML = '';

    // update head
    var tr = document.createElement('tr');
    var html = '';
    keys.forEach(function (key) {
        html += '<th>' + key + '</th>';
    });
    tr.innerHTML = html;
    t.appendChild(tr);

    // update content
    var itemCnt = 0, pageCnt = 0, self = this;
    data.forEach(function (value) {
        // console.log(value);
        if (itemCnt === self.pageSize) {
            pageCnt++;
            itemCnt = 0;
        }
        itemCnt++;

        // only display current page's item.
        if (pageCnt !== self.pageId) {
            return;
        }

        tr = document.createElement('tr');
        var o = value, html = '';
        keys.forEach(function (key) {
            html += '<td>' + o[key] + '</td>';
        });
        tr.innerHTML = html;
        t.appendChild(tr);
    });
};

Table.prototype.nextPage    = function () {
    var maxId   = Math.floor((this.data.length-1)/this.pageSize);
    console.log(maxId);
    if (this.pageId < maxId) {
        this.pageId++;
        this.update();
    }
};

Table.prototype.prevPage   = function () {
    if (this.pageId > 0) {
        this.pageId--;
        this.update();
    }
};