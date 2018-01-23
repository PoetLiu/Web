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
    var timeSlot = {
        check: function () {
            console.log("new rule");
            var startH = $(".start.hour").val() >> 0;
            var startM = $(".start.minute").val() >> 0;
            var endH = $(".end.hour").val() >> 0;
            var endM = $(".end.minute").val() >> 0;

            if (startH === endH) {
                if (startM === endM || endM - startM <= 5) {
                    console.log("End time must at least latter than Start time 5s.");
                    return false;
                }
            }
            return true;
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
        $("#week-slot span").click(function (e) {
            $(this).toggleClass("active");
        });
        $("#new-rule-form").delegate("#add-rule-btn", "click", function (e) {
            e.preventDefault();
            addNewRule();
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

    function addNewRule() {
        if (!timeSlot.check()) {
            return false;
        }
        var data    = {
            "start_hour": $(".start.hour").val() || 0,
            "start_minute": $(".start.minute").val() || 0,
            "end_hour": $(".end.hour").val() || 0,
            "end_minute": $(".end.minute").val() || 0,
            "timer_day": "1 2 3 4 5 6 7",
            "power": 100,
            "timer_enable": 1,
            "action": "add"
        };
        $.post("/app/radio_power/radio_power.cgi", data, function (data) {
            data    = eval("(" + data + ")");
            if (data[0] === "SUCCESS") {
                console.log("Add rule success!");
                showNewRulePage(false);
                return true;
            }
        });
    }

    function getPower() {
        var postData = {action: "get"};
        $.post("/app/radio_power/radio_power.cgi",
            postData,
            function (data) {
                try {
                    var j = JSON.parse(data);
                    var m = powerToMode(j["now_power"]);
                    powerModeSet(m);
                } catch (e) {
                    showMessage("get power failed.");
                }
            }
        );
    }

    function powerToMode(p) {
        var m = null;
        p = Number(p);
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
