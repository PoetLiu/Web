function Rule(data) {
    this.data = data;
    if (!data) {
        this.sync();
    }
}

Rule.prototype.week = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日"
];

Rule.prototype.serialize = function () {
    var d = this.data;
    return {
        id: Number(d.idx) + 1,
        timeSlot: this.getTimeStr(),
        date: this.getDayStr(),
        mode: "均衡模式",
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
    var d = this.data;
    d.timer_enable = (d.timer_enable === '0' ? '1' : '0');
};

Rule.prototype.getOptionHTML = function () {
    var d = this.data;
    return "<a href=\"javascript:void(0)\" onclick=\"showRulePage(true,\'" + d.idx + "\')\">修改</a>" +
        " <a href=\"javascript:void(0)\" onclick=\"ruleDel(\'" + d.idx + "\')\">删除</a>" +
        " <a href=\"javascript:void(0)\" onclick=\"ruleMod(\'" + d.idx + "\', \'toggle\')\">" +
        (d.timer_enable === '1' ? "禁用" : "启用") + "</a>";
};

Rule.prototype.getDayStr = function () {
    var day = this.data.timer_day.split(' ');
    if (day.length === 7) {
        return "每天";
    }

    var ret = "";
    for (var i = 0; i < day.length; i++) {
        ret += this.week[day[i] - 1];
        if (i !== day.length - 1) {
            ret += " ";
        }
    }
    return ret;
};

Rule.prototype.getTimeStr = function () {
    var d = this.data;
    return timeStrFormat(d.start_hour) + ":" + timeStrFormat(d.start_minute)
        + "~" + timeStrFormat(d.end_hour) + ":" + timeStrFormat(d.end_minute);

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

Rule.prototype.sync = function () {
    var data = this.data;

    data["start_hour"] = $(".start.hour").val() || 0;
    data["start_minute"] = $(".start.minute").val() || 0;
    data["end_hour"] = $(".end.hour").val() || 0;
    data["end_minute"] = $(".end.minute").val() || 0;
    data["timer_day"] = getTimerDayStr();
    data["power"] = getPowerStr();
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
            console.log("End time must at least latter than Start time 5s.");
            return false;
        }
    }
    return true;
};

