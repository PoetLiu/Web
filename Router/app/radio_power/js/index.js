(function () {
    var modes = {
        "low": {
            width: 40,
            intro: "2%的WiFi发射功率，准妈妈再也不用担心辐射问题",
            power: 2,
            text: "孕妇模式"
        },
        "middle": {
            width: 316,
            intro: "WiFi发射功率50%，既能轻松上网，又能降低辐射",
            power: 50,
            text: "均衡模式"
        },
        "high": {
            width: 630,
            intro: "P+内核信号增益已开，手机WiFi信号较弱时自动增强发射功率，家中信号死角地区也能畅快上网",
            power: 100,
            text: "穿墙模式"
        }
    };
    var CGI = {
        "common": "/app/radio_power/radio_power.cgi",
        "set": "/web360/updateradiopower.cgi"
    };
    var table = new Table("#pw-tbody");

    $(document).ready(function () {
        $(".power .select-bar a").click(function (e) {
            powerModeSet($(this).attr('mode'), true);
        });
        $("#new-rule-btn").click(function (e) {
            showRulePage(true);
        });
        $("#cancel-edit-btn").click(function (e) {
            init();
        });
        $("#week-slot span").click(function (e) {
            $(this).toggleClass("active");
        });
        $("#new-rule-form").delegate("#add-rule-btn", "click", function (e) {
            e.preventDefault();
            if (table.modId !== -1) {
                ruleMod(table.modId);
                table.modId = -1;
            } else {
                ruleAdd();
            }
        });
        window.ruleDel = ruleDel;
        window.ruleMod = ruleMod;
        window.showRulePage = showRulePage;
        window.powerToMode = powerToMode;
        init();
    });

    function showRulePage(en, idx) {
        if (en) {
            $("#pw-index-page").hide();
            $("#pw-new-rule-page").show();
            (typeof idx !== 'undefined') && initRulePage(idx);
        } else {
            $("#pw-index-page").show();
            $("#pw-new-rule-page").hide();
        }
    }

    function initRulePage(idx) {
        var r = table.ruleFind(idx);
        table.modId = idx;
        r.sync("model2View");
    }

    function init() {
        showRulePage(false);
        getPower();
        resizeAppPage();
    }

    function ruleAdd() {
        var r = new Rule();
        r.add(init);
    }

    function ruleMod(idx, action) {
        var r = table.ruleFind(idx);
        if (action === "toggle") {
            r.toggle();
            console.log(r);
        }
        r.modify(init);
    }

    function ruleDel(idx) {
        var r = table.ruleFind(idx);
        r.delete(init);
    }

    function powerToMode(p, obj) {
        var m = null;
        p = Number(p);
        $.each(modes, function (i) {
            if (!m && p <= modes[i].power) {
                m = i;
            }
        });
        return obj ? modes[m] : (m || "high");
    }

    function getPower() {
        var postData = {action: "get"};
        $.post(CGI.common,
            postData,
            function (data) {
                try {
                    var j = JSON.parse(data);
                    var m = powerToMode(j["now_power"]);
                    powerModeSet(m);
                    table.parseRules(j["time"]);
                    table.render();
                    resizeAppPage();
                } catch (e) {
                    showMessage("get power failed.", e);
                }
            }
        );
    }

    function setPower(p) {
        $.get(CGI.set,
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
