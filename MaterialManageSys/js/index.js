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

var totalNum    = document.getElementById('total-num');
function updateTotalNum(total) {
    totalNum.innerHTML  = total;
}

$(document).ready(function () {
    var tb = new Table('stock-tb', 10);
    function update(data) {
        data = JSON.parse(data);
        var keys = Object.keys(data[0]);
        searchKeyListUpdate(keys);
        tb.update(data, keys);
        updateTotalNum(data.length);
    }

    var pageItemNumSelect = document.getElementById('item-num-select');
    function onPageItemNumSelected(e) {
        var t   = pageItemNumSelect;
        var page    = t.options[t.selectedIndex].value;
        console.log(page);
        tb.setPageSize(Number(page));
        e.preventDefault();
    }

    var prevBtn = document.getElementById('prev-btn');
    function onPrevBtnClick() {
       tb.prevPage();
    }

    var nextBtn = document.getElementById('next-btn');
    function onNextBtnClick() {
        tb.nextPage();
    }

    (function init() {
        pageItemNumSelect.addEventListener('click', onPageItemNumSelected);
        prevBtn.addEventListener('click', onPrevBtnClick);
        nextBtn.addEventListener('click', onNextBtnClick);
        $.post('php/api.php/getStock', function (data) {
            update(data);
        });
    })();
});
