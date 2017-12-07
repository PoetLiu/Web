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

$(document).ready(function () {
    var tb = new Table('stock-tb', 10);
    function update(data) {
        data = JSON.parse(data);
        var keys = Object.keys(data[0]);
        searchKeyListUpdate(keys);
        tb.update(data, keys);
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
