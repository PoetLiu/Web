window.debug    = true;

function funCall(f, param) {
    console.log(param);
    if (f != null && f !== "") {
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

function loadHtml(html, onSuccess) {
    currentHtml = html;
    var params = Array.prototype.slice.apply(arguments, [2, arguments.length]);
    $.ajax({
        type: "get",
        url: "./" + html + ".html",
        dataType: "html",
        success: function (ret) {
            var container = $("#container");
            container.html(ret);
            funCall(onSuccess, params);
        }
    });
}

function get_rand_key() {
    var calleeFn = arguments.callee;
    var ret = {
        "rand_key": "",
        "key_index": ""
    };

    $.ajax({
        url: "/router/get_rand_key.cgi",
        data: {
            "noneed": "noneed",
            "key_index": ""
        },
        dataType: "json",
        async: false,
        error: function (XMLHttpRequest, textStatus) {
            console.log(XMLHttpRequest, textStatus);
        },
        success: function (data) {
            if (data.rand_key) {
                ret["rand_key"] = data.rand_key.substring(32, 64);
                ret["key_index"] = data.rand_key.substring(0, 32);
            } else {
                console.log("Get rand key error, data:"+data);
            }
        }
    });
    return ret;
}

function aesEncrypt(data, key) {
    key = key || get_rand_key();
    var keyHex  = CryptoJS.enc.Hex.parse(key.rand_key);
    var iv  = CryptoJS.enc.Latin1.parse("360luyou@install");
    var cipher  = CryptoJS.AES.encrypt(data, keyHex, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    console.log(data, key, cipher.ciphertext.toString());
    return key.key_index + cipher.ciphertext.toString();
}

function showMessage(title, message) {
    console.log(title, message);
}