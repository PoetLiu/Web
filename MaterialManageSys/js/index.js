var form = $('#upload_form');
function upload() {
    form.submit(function (e) {
        e.preventDefault();
    });
    var str = $('#uploadFile').val();
    if (str.length === 0) {
        console.log("empty file name.");
        return;
    }
    form.unbind('submit').bind('submit');
    form.submit();
}

var searchKeyList = document.getElementById("search-fields");
function searchKeyListUpdate(keys) {
    keys.forEach(function (key) {
        var op = document.createElement('option');
        op.innerHTML = key;
        searchKeyList.appendChild(op);
    });
}

function Table(id, pageSize) {
    this.id = id;
    this.dom = document.getElementById(id);
    this.pageSize = pageSize;
}

Table.prototype.setPageSize = function (size, autoUpdate) {
    autoUpdate  = autoUpdate || true;
    this.pageSize   = size;
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

    // update head
    var tr = document.createElement('tr');
    var html = '';
    keys.forEach(function (key) {
        html += '<th>' + key + '</th>';
    });
    tr.innerHTML = html;
    t.appendChild(tr);

    // update content
    var itemCnt = 0, self = this;
    data.forEach(function (value) {
        // console.log(value);
        if (itemCnt === self.pageSize) {
            return;
        }
        itemCnt++;
        tr = document.createElement('tr');
        var o = value, html = '';
        keys.forEach(function (key) {
            html += '<td>' + o[key] + '</td>';
        });
        tr.innerHTML = html;
        t.appendChild(tr);
    });
};

$(document).ready(function () {
    var tb = new Table('stock-tb', 10);

    function update(data) {
        data = JSON.parse(data);
        var keys = Object.keys(data[0]);
        searchKeyListUpdate(keys);
        tb.update(data, keys);
    }

    (function init() {
        $.post('php/api.php/getStock', function (data) {
            update(data);
        });
    })();
});
