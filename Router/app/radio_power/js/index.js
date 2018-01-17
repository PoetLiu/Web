$(document).ready(function () {
    powerBarUpdate("high");
    $(".power .select-bar a").click(function (e) {
        powerBarUpdate($(this).attr('mode'));
        getPower();
        resizePage();
    });
    getPower();
    resizePage();
});

function getPower(onSuccess) {
    var postData = {action: "get"};
    $.post("/app/radio_power/radio_power.cgi",
        postData,
        function (data) {
            try {
                console.log(data);
            } catch (e) {
                showMessage("get power failed.");
            }
        });
}

function setPower() {

}

function powerBarUpdate(mode) {
    var modes = {
        "low": {
            width: 40,
            intro: "2%的WiFi发射功率，准妈妈再也不用担心辐射问题",
            power: 2
        },
        "middle": {
            width: 316,
            intro: "WiFi发射功率50%，既能轻松上网，又能降低辐射",
            power: 50
        },
        "high": {
            width: 630,
            intro: "P+内核信号增益已开，手机WiFi信号较弱时自动增强发射功率，家中信号死角地区也能畅快上网",
            power: 100
        }
    };
    var m = modes[mode];
    if (m) {
        $("#pw-select").animate({width: m.width + "px"}, 500);
        $("#pw-intro").html(m.intro);
        $("#pwa-" + mode).addClass("selected").siblings().removeClass("selected");
    }
}

function resizePage() {
    if (window.top != window.self && parent.document.getElementById("app_iframe") != null) {
        var yScroll;
        parent.document.getElementById("app_iframe").height = 450;
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

        var pageHeight = Math.max(yScroll, windowHeight);
        parent.document.getElementById("app_iframe").height = pageHeight;
    }
}
