(function () {
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

    $(document).ready(function () {
        $(".power .select-bar a").click(function (e) {
            powerModeSet($(this).attr('mode'), true);
        });
        $("#new-rule-btn").click(function (e) {
            showNewRulePage(true);
        });
        $("#cancel-edit-btn").click(function (e) {
            showNewRulePage(false);
        });
        init();
    });

    function showNewRulePage(en) {
        if (en) {
            $("#pw-index-page").hide();
            $("#pw-new-rule-page").show();
        } else {
            $("#pw-index-page").show();
            $("#pw-new-rule-page").hide();
        }
    }

    function init() {
        showNewRulePage(false);
        getPower();
        resizeAppPage();
    }

    function getPower() {
        var postData = {action: "get"};
        $.post("/app/radio_power/radio_power.cgi",
            postData,
            function (data) {
                try {
                    var j = JSON.parse(data);
                    var m = powerToMode(j.now_power);
                    powerModeSet(m);
                } catch (e) {
                    showMessage("get power failed.");
                }
            }
        );
    }

    function powerToMode(p) {
        var m = null;
        p   = Number(p);
        $.each(modes, function (i) {
            if (!m && p <= modes[i].power) {
                m = i;
            }
        });
        return m || "high";
    }

    function setPower(p) {
        $.get("/web360/updateradiopower.cgi",
            {'power': p},
            function (data) {
                var j = JSON.parse(data);
                if (j["err_no"] !== "0") {
                    showMessage("set power failed.");
                }
            }
        );
    }

    function powerModeSet(mode, cgi) {
        var m = modes[mode];
        if (m) {
            console.log("Set to mode:" + mode);
            cgi && setPower(m.power);
            $("#pw-select").animate({width: m.width + "px"}, 500);
            $("#pw-intro").html(m.intro);
            $("#pwa-" + mode).addClass("selected").siblings().removeClass("selected");
        }
    }
})();
