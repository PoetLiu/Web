function initWifiSetPage() {
    var testCircle = 0, testMode = false;
    var wifi_cfg, wifiEnableId = "#wifi_24g_enable",
        wifiEncryptModeId = "#wifi_24g_encrypt_mode",
        wifiPwdId = "#wifi_24g_pwd", wifiPwdSectionId = "#wifi_24g_pwd_section";

    var dom = {
        "AP_SSID": {
            id: "#wifi_24g_ssid"
        },
        "wire_enable": {
            id: wifiEnableId,
            val: function (v) {
                wifiEnable(this.id, v === "1");
            }
        },
        "channel_width": {
            id: "#wifi_24g_bandwidth"
        },
        "ap_mode": {
            id: wifiEncryptModeId,
            val: function (v) {
                $(this.id).val(v);
                wifiPwdSectionShow($(this.id).val() !== "0");
            }
        },
        "password": {
            id: wifiPwdId
        },
        "channel_num": {
            id: "#wifi_24g_channel"
        },
        "SSID_broadcast": {
            id: "#wifi_24g_hide_ssid",
            val: function (v) {
                $(this.id).prop("checked", v === "0");
            }
        }
    };

    function wifiPwdSectionShow(en) {
        en ? $(wifiPwdSectionId).show() : $(wifiPwdSectionId).hide();
    }

    function wifiEnable(id, en) {
        $(id).removeClass(en ? "radio_off" : "radio_on")
            .addClass(en ? "radio_on" : "radio_off");
    }

    function wifiEnableToggle(id) {
        wifiEnable(id, $(id).hasClass("radio_off"));
    }

    function paintView(data) {
        $.each(dom, function (id, item) {
            // console.log(id, item, data[id]);
            if (data[id] !== undefined) {
                item.val ? item.val(data[id]) : $(item.id).val(data[id]);
            }
        });
    }

    function autoTest() {
        var ret = 0;
        switch (testCircle) {
            case 0:
                paintView({
                    "SSID_broadcast": "1"
                });
                break;
            case 1:
                paintView({
                    "SSID_broadcast": "0"
                });
                break;
            case 2:
                paintView({
                    "wire_enable": "0"
                });
                break;
            case 3:
                paintView({
                    "wire_enable": "1"
                });
                break;
            case 4:
                paintView({
                    "ap_mode": "0"
                });
                break;
            case 5:
                paintView({
                    "ap_mode": "4"
                });
                break;
            default:
                ret = -1;
        }
        if (ret === 0) {
            testCircle++;
        }
        return ret;
    }

    function autoTestRun() {
        window.setTimeout(function () {
            if (autoTest() !== -1) {
                autoTestRun();
            } else {
                console.log("auto Test Finished!");
            }
        }, 1000);
    }

    function initView() {
        var p = {
            ap_id: 0,
            network_mode: 999,
            port_id: "WIFI1",
            ap_mode: 0
        };

        $(wifiEnableId).click(function (e) {
            //console.log(e);
            wifiEnableToggle("#" + e.target.id);
        });

        $(wifiEncryptModeId).change(function (e) {
            // console.log(e);
            wifiPwdSectionShow($("#" + e.target.id).val() !== "0");
        });

        if (testMode) {
            console.log("auto Test Begin!");
            autoTestRun();
            return;
        }

        $.post("/router/wireless_base_show.cgi", p, function (data) {
            data = eval("(" + data + ")");
            paintView(data);
        });

        $.post("/router/wireless_sec_show.cgi", p, function (data) {
            data = eval("(" + data + ")");
            data.password = aesDecrypt(data.wpa_key);
            paintView(data);
        });
    }

    showPathNav("我的安全路由", "WiFi设置");
    initView();
}