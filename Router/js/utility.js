window.debug = true;
var current_html = null;

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
                console.log("Get rand key error, data:" + data);
            }
        }
    });
    return ret;
}

function aesEncrypt(data, key) {
    key = key || get_rand_key();
    var keyHex = CryptoJS.enc.Hex.parse(key.rand_key);
    var iv = CryptoJS.enc.Latin1.parse("360luyou@install");
    var cipher = CryptoJS.AES.encrypt(data, keyHex, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    console.log(data, key, cipher.ciphertext.toString());
    return key.key_index + cipher.ciphertext.toString();
}

function resizeAppPage() {
    if (window.top != window.self && parent.document.getElementById("app_iframe") != null) {
        var yScroll;
        if (window.innerHeight && window.scrollMaxY) {
            yScroll = window.innerHeight + window.scrollMaxY;
        } else {
            yScroll = Math.max(document.body.scrollHeight, document.body.offsetHeight);
        }

        var windowHeight;
        if (self.innerHeight) {
            windowHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) {
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) {
            windowHeight = document.body.clientHeight;
        }
        parent.document.getElementById("app_iframe").height = Math.max(yScroll, windowHeight);
    }
}

var msgBox;
function showMessage(type, title, message) {
    msgBox = msgBox || new MsgBox("init");
    msgBox.showMsg({
        msg: title,
        autoHide: true,
        type: type
    });
    console.log(title, message);
}

/*
*  MsgBox begin.
* */
function MsgBox(msg, cfg) {
    this.msg = msg;
    this.cfg = cfg || {
        autoHide: true,
    };

    this.init();
    this.setup();
}

MsgBox.prototype.getImgSrc = function() {
    var s;
    switch (this.cfg.type)  {
        case MsgType.NOTICE:
            s   = "./image/msg-info.png";
            break;
        case MsgType.ERROR:
            s   = "./image/msg-error.png";
            break;
        case MsgType.SUCCESS:
            s   = "./image/msg-success.png";
            break;
    }
    console.log(this, s);
    return s;
};

MsgBox.prototype.init = function () {
    var parent = window.top.document.body;
    var $cover = $("<div></div>").addClass('cover').appendTo(parent).hide();
    var $box = $("<div></div>").addClass('msg-box').appendTo(parent).hide();
    var $img = $("<img>").appendTo($box);
    var $msg = $("<p></p>").addClass('title').appendTo($box);
    this.$box = $box;
    this.$msg = $msg;
    this.$img = $img;
    this.$cover = $cover;

    var c = this.cfg;

    c.duration = 2000;
    c.type  = MsgType.NOTICE;
};

MsgBox.prototype.setup = function (cfg) {
    var c = this.cfg;

    if (cfg) {
        c.autoHide = cfg.autoHide || c.autoHide;
        c.type = cfg.type || c.type;
        c.msg = cfg.msg || c.msg;
        c.duration = cfg.duration || c.duration;
        console.log(c, cfg);
    }

    this.$img.attr('src', this.getImgSrc());
    this.$msg.text(c.msg);
};

MsgBox.prototype.showMsg = function (cfg) {
    cfg && this.setup(cfg);
    this.show();
};

MsgBox.prototype.show = function () {
    var c = this.cfg;
    this.$cover.show();
    this.$box.show();
    if (c.autoHide) {
        window.setTimeout(this.hide.bind(this), c.duration);
    }
};

MsgBox.prototype.hide = function () {
    this.$cover.hide();
    this.$box.hide();
};

var MsgType = {
    NOTICE: 1,
    ERROR:  2,
    SUCCESS: 3
};

