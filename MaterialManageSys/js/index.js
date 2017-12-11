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

    // get file name from path.
    uploadFile = str.replace(/^.*[\\\/]/, '');
    window.setTimeout(function () {
        fetchAndUpdateBomTable(uploadFile);
    }, 1000);
}

function fetchAndUpdateBomTable(uploadFile) {
    $.post('php/api.php/getBomData',
        {
            name: uploadFile
        },
        function (data) {
            updateBom(JSON.parse(data)['msg']);
        });
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
    10,
    'stock-tb',
    'item-num-select',
    'next-btn',
    'prev-btn',
    'total-num',
    'total-page',
    'cur-page',
    'jump-input',
    'jump-btn'
    );

var bomTB = new Table(
    10,
    'bom-tb',
    'bom-item-num-select',
    'bom-next-btn',
    'bom-prev-btn',
    'bom-total-num',
    'bom-total-page',
    'bom-cur-page',
    'bom-jump-input',
    'bom-jump-btn'
    );

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
    $('#bom-table-box').show();
    $('#upload-bom-notice').hide();
}

$(document).ready(function () {
    (function init() {
        var searchBtn   = document.getElementById('search-btn');
        searchBtn.addEventListener('click', search.bind(this));

        $('#bom-table-box').hide();

        function search() {
            var field   = document.getElementById('search-fields').value;
            var keyword = document.getElementById('search-input').value;
            // console.log(field, keyword);
            stockTB.search(keyword, field);
        }

        $.post('php/api.php/getStock', function (data) {
            updateStock(data);
        });
    })();
});
