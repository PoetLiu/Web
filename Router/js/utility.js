function funCall(f, param) {
    if (f != null && f !== "")  {
        try {
            if (typeof(window[f]) === "function") {
                window[f].apply(null, param);
            } else if (typeof(f) === "function") {
                f.call(this);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
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