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
     var week = [
                   "星期一",
                    "星期二",
                    "星期三",
                    "星期四",
                    "星期五",
                    "星期六",
                    "星期日"
     ];
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
    var powerData;

    $(document).ready(function () {
        $(".power .select-bar a").click(function (e) {
            powerModeSet($(this).attr('mode'), true);
        });
        $("#new-rule-btn").click(function (e) {
            showNewRulePage(true);
        });
        $("#cancel-edit-btn").click(function (e) {
            init();
        });
        $("#week-slot span").click(function (e) {
            $(this).toggleClass("active");
        });
        $("#new-rule-form").delegate("#add-rule-btn", "click", function (e) {
            e.preventDefault();
            addNewRule();
        });
        window.ruleDel = ruleDel;
        window.ruleMod = ruleMod;
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
        var data = {
            "start_hour": $(".start.hour").val() || 0,
            "start_minute": $(".start.minute").val() || 0,
            "end_hour": $(".end.hour").val() || 0,
            "end_minute": $(".end.minute").val() || 0,
            "timer_day": "1 2 3 4 5 6 7",
            "power": 100,
            "timer_enable": 1,
            "action": "add"
        };
        $.post(CGI.common, data, function (data) {
            data = eval("(" + data + ")");
            if (data[0] === "SUCCESS") {
                console.log("Add rule success!");
                init();
                return true;
            }
        });
    }

    function ruleFindByIdx(idx) {
        var rules = powerData["time"];
        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            if (r.idx === idx) {
                return r;
            }
        }
    }

    function ruleMod(idx, action) {
        var r = ruleFindByIdx(idx);
        var data = jQuery.extend(true, {}, r);

        data.action = "mod";
        action = action || "mod";
        if (!r) {
            console.log("Can't find rule by idx:" + idx);
            return false;
        }

        if (action === "toggle") {
            ruleEnToggle(data);
        }
        $.post(CGI.common, data, function (data) {
            data = eval("(" + data + ")");
            if (data[0] === "SUCCESS") {
                console.log("Mod rule success!");
                init();
                return true;
            }
        });
    }

    function ruleEnToggle(r) {
        r.timer_enable = (r.timer_enable === '0' ? '1' : '0');
    }

    function ruleDel(id) {
        $.post(CGI.common, {action: "del", idx: id}, function (data) {
            data = eval("(" + data + ")");
            if (data[0] === "SUCCESS") {
                console.log("del rule success!");
                init();
                return true;
            }
        });
    }

    function paintRules(rules) {
        var root = $("#pw-rule-tb tbody");
        root.empty();
        for (var i = 0; i < rules.length; i++) {
            var c = "";
            var r = rules[i];
            c += "<tr><td>" + r.idx + "</td><td>" + getRuleTimeStr(r) + "</td><td>" + getRuleDayStr(r)
                + "</td><td>" + getRuleModeStr(r) + "</td><td>" + getRuleEditStr(r) + "</td></tr>";
            // console.log(c);
            root.append(c);
        }

        function getRuleEditStr(r) {
            console.log(r);
            return "<a href=\"javascript:void(0)\" onclick=\"ruleMod(\'" + r.idx + "\')\">修改</a>" +
                " <a href=\"javascript:void(0)\" onclick=\"ruleDel(\'" + r.idx + "\')\">删除</a>" +
                " <a href=\"javascript:void(0)\" onclick=\"ruleMod(\'" + r.idx + "\', \'toggle\')\">" +
                (r.timer_enable === '1' ? "禁用" : "启用") + "</a>";
        }

        function getRuleModeStr(r) {
            return modes[powerToMode(r.power)].text;
        }

        function getRuleDayStr(r) {
            var day = r.timer_day.split(' ');
            if (day.length === 7) {
                return "每天";
            }

            var ret = "";
            for (var i = 0; i < day.length; i++) {
                ret += week[day[i]-1];
                if (i !== day.length-1) {
                    ret += " ";
                }
            }
            return ret;
        }

        function getRuleTimeStr(r) {
            return timeStrFormat(r.start_hour) + ":" + timeStrFormat(r.start_minute)
                + "~" + timeStrFormat(r.end_hour) + ":" + timeStrFormat(r.end_minute);

            function timeStrFormat(t) {
                if (typeof(t) !== "string") {
                    t = t.toString();
                }
                if (t.length < 2) {
                    return "0" + t;
                }
                return t;
            }
        }
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
                    paintRules(j["time"]);
                    resizeAppPage();
                    powerData = j;
                } catch (e) {
                    showMessage("get power failed.", e);
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
