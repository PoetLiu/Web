function initWifiSetPage() {
    var testCircle = 0, testMode = false;
    var wifiCfg = {}, wifiEnableId = "#wifi_24g_enable",
        wifiEncryptModeId = "#wifi_24g_encrypt_mode",
        wifiPwdId = "#wifi_24g_pwd", wifiPwdSectionId = "#wifi_24g_pwd_section",
        wifiSubmitId ="#wifi_24g_submit_btn", bestChannelId="#best_channel";
    var P = {
            ap_id: 0,
            network_mode: 999,
            port_id: "WIFI1",
            ap_mode: 0
        };
    var dom = {
        "AP_SSID": {
            id: "#wifi_24g_ssid",
            type:"base"
        },
        "wire_enable": {
            id: wifiEnableId,
            type:"base",
            val: function (v) {
                if (v) {
                    wifiEnable(this.id, v === "1");
                } else {
                    return wifiEnable(this.id) ? "1":"0";
                }
            }
        },
        "channel_width": {
            id: "#wifi_24g_bandwidth",
            type:"base"
        },
        "ap_mode": {
            id: wifiEncryptModeId,
            type:"sec",
            val: function (v) {
                if (v) {
                    $(this.id).val(v);
                    $(this.id).change();
                } else {
                    return $(this.id).val();
                }
            }
        },
        "wpa_key": {
            id: wifiPwdId,
            type:"sec"
        },
        "channel_num": {
            id: "#wifi_24g_channel",
            type:"base",
            val: function (v, data) {
                if (v) {
                    var cur = data["status_channel_num"];
                    $(this.id).val(v);
                    if (v === "0") {
                        $(this.id + ' option[value="0"]').text("自动（当前信道 " + cur + "）");
                    }
                } else {
                    return $(this.id).val();
                }
            }
        },
        "SSID_broadcast": {
            id: "#wifi_24g_hide_ssid",
            type:"base",
            val: function (v) {
                if (v) {
                    $(this.id).prop("checked", v === "0");
                } else {
                    return $(this.id).prop("checked") ? "0":"1";
                }
            }
        }
    };

    function wifiPwdSectionShow(en) {
        en ? $(wifiPwdSectionId).show() : $(wifiPwdSectionId).hide();
    }

    function wifiEnable(id, en) {
        if (en !== undefined) {
            $(id).removeClass(en ? "radio_off" : "radio_on")
                .addClass(en ? "radio_on" : "radio_off");
            wifiFormEnable(en);
        } else {
            return $(id).hasClass("radio_on");
        }
    }

    function wifiFormEnable(en) {
        $.each(dom, function (id, item) {
            $(item.id).prop("disabled", !en);
        });
    }

    function wifiFormCk(cfg) {
       return true;
    }

    function wifiCfgChanged(cfg) {
        var nowCfg = $.extend(true, {}, wifiCfg, cfg);
        return JSON.stringify(wifiCfg) !== JSON.stringify(nowCfg);
    }

    function wifiFormSubmit(cfg) {
        if (!wifiCfgChanged(cfg)) {
            console.log("Form cfg doesn't change, abort.");
            return;
        }

        var base = $.extend({}, P, wifiCfg.base, cfg.base),
        doneCnt = 0;
        console.log(base);
        $.post("/router/wire_bas_ap_set.cgi", base, done);

        var sec = $.extend({}, P, wifiCfg.sec, cfg.sec);
        console.log(sec);
        $.post("/router/wireless_sec_set.cgi", sec, done);

        function done() {
            doneCnt++;
            if (doneCnt === 2) {
                wifiFormGet();
            }
        }
    }

    function wifiEnableToggle(id) {
        wifiEnable(id, $(id).hasClass("radio_off"));
    }

    function data2View(data) {
        $.each(dom, function (id, item) {
            // console.log(id, item, data[id]);
            if (data[id] !== undefined) {
                item.val ? item.val(data[id], data) : $(item.id).val(data[id], data);
            }
        });
    }

    function view2Data() {
        var data = {"sec":{}, "base":{}};
        $.each(dom, function (id, item) {
            data[item.type][id] = item.val ? item.val() : $(item.id).val();
        });
        console.log(data);
        return data;
    }

    function autoTest() {
        var ret = 0, testCases = [
            {"SSID_broadcast": "1"},
            {"SSID_broadcast": "0"},
            {"wire_enable": "0"},
            {"wire_enable": "1"},
            {"ap_mode": "0"},
            {"ap_mode": "4"},
            {
                "channel_num": "0",
                "status_channel_num": "10"
            },
            {
                "channel_num": "11",
                "status_channel_num": "11"
            }
        ];

        if (testCases[testCircle]) {
            data2View(testCases[testCircle]);
            view2Data();
            testCircle++;
        } else {
            ret = -1;
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

    function wifiFormGet() {
        $.post("/router/wireless_base_show.cgi", P, function (data) {
            data = eval("(" + data + ")");
            wifiCfg.base = data;
            data2View(data);
        });

        $.post("/router/wireless_sec_show.cgi", P, function (data) {
            data = eval("(" + data + ")");
            data.wpa_key = aesDecrypt(data.wpa_key);
            wifiCfg.sec = data;
            data2View(data);
        });
    }
    
    function bestChannelAutoSet() {
        var p = {
            port_id: P.port_id,
            channel_width: wifiCfg.base.channel_width
        };
        $.post("/router/wireless_get_best_channel.cgi", p, function (data) {
            data = eval("(" + data + ")");
            if (wifiCfg.base.channel_num === "0") {
                wifiCfg.base.status_channel_num = data.best_channel;
            } else {
                wifiCfg.base.channel_num    = data.best_channel;
            }
            data2View(wifiCfg.base);
        });
    }

    function initView() {
        $(wifiEnableId).click(function (e) {
            //console.log(e);
            wifiEnableToggle("#" + e.target.id);
        });

        $(wifiEncryptModeId).change(function (e) {
            // console.log(e);
            wifiPwdSectionShow($("#" + e.target.id).val() !== "0");
        });

        $(wifiSubmitId).click(function (e) {
            var data = view2Data();
            if (wifiFormCk(data)) {
                wifiFormSubmit(data);
            }
        });

        $(bestChannelId).click(function (e) {
             bestChannelAutoSet();
        });

        if (testMode) {
            console.log("auto Test Begin!");
            autoTestRun();
            return;
        }

        wifiFormGet();
    }

    showPathNav("我的安全路由", "WiFi设置");
    initView();
}