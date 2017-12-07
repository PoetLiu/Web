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

function Table(id) {
    this.id = id;
    this.dom = document.getElementById(id);
}

Table.prototype.update = function (data, keys) {
    var t = this.dom;

    // update head
    var tr = document.createElement('tr');
    var html = '';
    keys.forEach(function (key) {
        html += '<th>' + key + '</th>';
    });
    tr.innerHTML = html;
    t.appendChild(tr);

    // update content
    data.forEach(function (value) {
        // console.log(value);
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
    var tb = new Table('stock-tb');

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
