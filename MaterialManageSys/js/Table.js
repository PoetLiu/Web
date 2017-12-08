function Table(pageSize, id, selectId, nextId, prevId, totalNumId, totalPageId) {
    this.id = id;
    this.pageId = 0;
    this.dom    = document.getElementById(id);
    this.select = document.getElementById(selectId);
    this.nextPageBtn = document.getElementById(nextId);
    this.prevPageBtn = document.getElementById(prevId);
    this.totalNum   = document.getElementById(totalNumId);
    this.totalPage  = document.getElementById(totalPageId);
    this.pageSize   = pageSize;

    this.setup();
}

Table.prototype.updateTotalNum  = function(total) {
    this.totalNum.innerHTML  = total;
};

Table.prototype.updateTotalPage= function(total) {
    this.totalPage.innerHTML  = total;
};

Table.prototype.setup   = function () {
    this.select.addEventListener('click', onPageItemNumSelected.bind(this));
    this.prevPageBtn.addEventListener('click', onPrevBtnClick.bind(this));
    this.nextPageBtn.addEventListener('click', onNextBtnClick.bind(this));

    function onPageItemNumSelected(e) {
        var t   = this.select;
        var page    = t.options[t.selectedIndex].value;
        console.log(page);
        this.setPageSize(Number(page));
        e.preventDefault();
    }

    function onPrevBtnClick() {
       this.prevPage();
    }

    function onNextBtnClick() {
        this.nextPage();
    }
};

Table.prototype.setPageSize = function (size, autoUpdate) {
    autoUpdate  = autoUpdate || true;
    this.pageSize   = size;
    console.log('Set page size:'+size);
    if (autoUpdate) {
        this.update();
    }
};

Table.prototype.update = function (data, head) {
    var t = this.dom;
    data    = data || this.data;
    head    = head || this.head;

    this.head   = head;
    this.data   = data;

    t.innerHTML = '';

    // update head
    var tr = document.createElement('tr');
    var html = '';
    head.forEach(function (key) {
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
        var o = value, html = '', keys = Object.keys(value);
        keys.forEach(function (key) {
            html += '<td>' + o[key] + '</td>';
        });
        tr.innerHTML = html;
        t.appendChild(tr);
    });

    this.updateTotalNum(data.length);
    this.updateTotalPage(Math.ceil(data.length/this.pageSize));
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