function funCall(f, param) {
    console.log(param);
    if (f != null && f !== "")  {
        try {
            if (typeof(window[f]) === "function") {
                window[f].apply(this, param);
            } else if (typeof(f) === "function") {
                f.apply(this, param);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}

function setCurClass(id, curName) {
    curName = curName || 'current';
    $(id).addClass(curName);
    $(id).siblings().removeClass(curName);
}

function loadHtml(html, init) {
    currentHtml = html;
    var params  = Array.prototype.slice.apply(arguments, [2, arguments.length]);
    $.ajax({
        type: "get",
        url:    "./"+html+".html",
        dataType: "html",
        error: function (XMLHttpRequest, testStatus) {
            return;
        },
        success: function (ret) {
            var container    = $("#container");
            container.html(ret);
            funCall(init, params);
        }
    });
}