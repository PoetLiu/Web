function Rule(data) {
    this.data = data || {};
}

Rule.prototype.WEEK = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日"
];

Rule.prototype.CGI = "/app/radio_power/radio_power.cgi";

Rule.prototype.serialize = function () {
    var d = this.data;
    return {
        id: Number(d.idx) + 1,
        timeSlot: this.getTimeStr(true),
        date: this.getDayStr(),
        mode: powerToMode(d.power, true).text,
        option: this.getOptionHTML()
    };
};

Rule.prototype.getHTML = function () {
    var h = "<tr>";
    var s = this.serialize();

    $.each(s, function (i, e) {
        h += "<td>" + e + "</td>";
    });
    h += "</tr>";
    return h;
};

Rule.prototype.toggle = function () {
    this.data.timer_enable = (this.isEnable() ? '0' : '1');
    console.log(this);
};

Rule.prototype.getOptionHTML = function () {
    var d = this.data;
    return "<a href=\"javascript:void(0)\" onclick=\"showRulePage(true,\'" + d.idx + "\')\">修改</a>" +
        " <a href=\"javascript:void(0)\" onclick=\"ruleDel(\'" + d.idx + "\')\">删除</a>" +
        " <a href=\"javascript:void(0)\" onclick=\"ruleMod(\'" + d.idx + "\', \'toggle\')\">" +
        (this.isEnable() ? "禁用" : "启用") + "</a>";
};

Rule.prototype.isEnable = function () {
    var en = Number(this.data.timer_enable);
    return en === 1;
};

Rule.prototype.getDayStr = function () {
    var day = this.data.timer_day.split(' ');
    if (day.length === 7) {
        return "每天";
    }

    var ret = "";
    for (var i = 0; i < day.length; i++) {
        ret += this.WEEK[day[i] - 1];
        if (i !== day.length - 1) {
            ret += " ";
        }
    }
    return ret;
};

Rule.prototype.getTimeStr = function (isString) {
    var d = this.data;
    if (!isString) {
        return {
            start_hour: timeStrFormat(d.start_hour),
            start_minute: timeStrFormat(d.start_minute),
            end_hour: timeStrFormat(d.end_hour),
            end_minute: timeStrFormat(d.end_minute)
        }
    } else {
        return timeStrFormat(d.start_hour) + ":" + timeStrFormat(d.start_minute)
            + "~" + timeStrFormat(d.end_hour) + ":" + timeStrFormat(d.end_minute);
    }

    function timeStrFormat(t) {
        if (typeof(t) !== "string") {
            t = t.toString();
        }
        if (t.length < 2) {
            return "0" + t;
        }
        return t;
    }
};

Rule.prototype.sync = function (dir) {
    var data = this.data;
    dir = dir || "view2Model";

    if (dir === "view2Model") {
        data["start_hour"] = $(".start.hour").val() || 0;
        data["start_minute"] = $(".start.minute").val() || 0;
        data["end_hour"] = $(".end.hour").val() || 0;
        data["end_minute"] = $(".end.minute").val() || 0;
        data["timer_day"] = getTimerDayStr();
        data["power"] = getPowerStr();
        if (!data["timer_enable"]) {
            data["timer_enable"] = "1";
        }
    } else {    // model2View
        var t = this.getTimeStr();
        // console.log(t);
        $(".start.hour").val(t.start_hour);
        $(".start.minute").val(t.start_minute);
        $(".end.hour").val(t.end_hour);
        $(".end.minute").val(t.end_minute);

        // week
        $("#week-slot span").each(function (id, obj) {
            id++;
            if (data["timer_day"].indexOf(id) === -1) {
                $(obj).removeClass("active");
            }
        });

        // mode
        var m = powerToMode(data.power);
        $("#mode-set ." + m).prop("checked", true);

        $("#add-rule-btn").text("修改");
    }
    return data;

    function getPowerStr() {
        var p;
        $("#mode-set input").each(function (id, obj) {
            if (!p && $(obj).is(":checked")) {
                p = $(obj).attr("value");
            }
        });
        return p;
    }

    function getTimerDayStr() {
        var ret = "";
        $("#week-slot span").each(function (id, obj) {
            id++;
            if ($(obj).hasClass('active')) {
                ret += id + " ";
            }
        });
        // remove tailing space.
        return ret.substring(0, ret.length - 1);
    }
};

Rule.prototype.check = function () {
    var d = this.data;
    var startH = d.start_hour;
    var startM = d.start_minute;
    var endH = d.end_hour;
    var endM = d.end_minute;

    if (startH === endH) {
        if (startM === endM || endM - startM <= 5) {
            showMessage("End time must at least latter than Start time 5s.");
            return false;
        }
    }
    return true;
};

Rule.prototype.add = function (fn) {
    if (!this.check()) {
        return false;
    }

    var d = this.data;
    d["action"] = 'add';
    // console.log(data);
    $.post(this.CGI, d, function (data) {
        data = eval("(" + data + ")");
        console.log(data);
        if (data[0] === "SUCCESS") {
            console.log("Add rule success!");
            fn && fn();
            return true;
        }
    });
};

Rule.prototype.modify = function (fn) {
    var d = this.data;
    d.action = "mod";
    $.post(this.CGI, d, function (data) {
        data = eval("(" + data + ")");
        if (data[0] === "SUCCESS") {
            console.log("Mod rule success!");
            fn && fn();
            return true;
        }
    });
};

Rule.prototype.delete = function (fn) {
    var d = this.data;
    $.post(this.CGI, {action: "del", idx: d.idx}, function (data) {
        data = eval("(" + data + ")");
        if (data[0] === "SUCCESS") {
            console.log("del rule success!");
            fn && fn();
            return true;
        }
    });
};

Rule.prototype.checkEqual = function (id) {
    return Number(this.data.idx) === Number(id);
};

