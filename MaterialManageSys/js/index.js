function upload() {
    var form = $('#upload_form');
    var uploadFile = '';
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
    uploadFile = str.replace(/^.*[\\\/]/, '');
    window.setTimeout(function () {
        $.post('php/api.php/getBomData',
            {
                name: uploadFile
            },
            function (data) {
                updateBom(JSON.parse(data)['msg']);
            });
    }, 1000);
}

function searchKeyListUpdate(keys) {
    var searchKeyList = document.getElementById("search-fields");
    keys.forEach(function (key) {
        var op = document.createElement('option');
        op.innerHTML = key;
        searchKeyList.appendChild(op);
    });
}

var stockTB = new Table(
    'stock-tb',
    'item-num-select',
    'next-btn',
    'prev-btn',
    'total-num',
    10);

var bomTB = new Table(
    'bom-tb',
    'bom-item-num-select',
    'bom-next-btn',
    'bom-prev-btn',
    'bom-total-num',
    10);

function updateStock(data) {
    data = JSON.parse(data);
    var head = Object.keys(data[0]);
    searchKeyListUpdate(head);
    stockTB.update(data, head);
}

function updateBom(data) {
    data = JSON.parse(data);
    var newData = [], head = [];

    // console.log(data);
    jQuery.each(data, function (i, val) {
        console.log(i, val);
        if (Number(i) === 1) {
            head = Object.values(val);
            // console.log(val);
        } else {
            newData.push(val);
        }
    });

    bomTB.update(newData, head);
}

$(document).ready(function () {
    (function init() {
        $.post('php/api.php/getStock', function (data) {
            updateStock(data);
        });
    })();
});
