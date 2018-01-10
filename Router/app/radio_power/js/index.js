$(document).ready(function () {
    powerBarUpdate("high");
});

function powerBarUpdate(mode) {
    var modes = {
        "low": {
           width: 40,
           intro: "2%的WiFi发射功率，准妈妈再也不用担心辐射问题"
        },
        "middle": {
           width: 316,
           intro: "WiFi发射功率50%，既能轻松上网，又能降低辐射"
        },
        "high": {
           width: 630,
           intro: "P+内核信号增益已开，手机WiFi信号较弱时自动增强发射功率，家中信号死角地区也能畅快上网"
        }
    };
    var m   = modes[mode];
    if (m) {
        $("#pw-select").animate({width: m.width+"px"}, 500);
        $("#pw-intro").html(m.intro);
    }
}