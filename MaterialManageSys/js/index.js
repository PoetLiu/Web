var form = $('#upload_form');
var uploadFile = '';
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
    uploadFile  = str.replace(/^.*[\\\/]/, '');
    window.setTimeout(function () {
        $.post('php/api.php/getBomData',
            {
                name: uploadFile
            },
            function (data) {
                console.log(data);
        });
    }, 1000);
}

var searchKeyList = document.getElementById("search-fields");
function searchKeyListUpdate(keys) {
    keys.forEach(function (key) {
        var op = document.createElement('option');
        op.innerHTML = key;
        searchKeyList.appendChild(op);
    });
}

$(document).ready(function () {
    var tb = new Table(
        'stock-tb',
        'item-num-select',
        'next-btn',
        'prev-btn',
        'total-num',
        10);
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
