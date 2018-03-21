function initWifiSetPage() {
    var dom = {
        "AP_SSID":      {
            id:"#wifi_24g_ssid"
        },
        "wire_enable":  {
            id:"#wifi_24g_enable",
            val: function (v) {
                if (v === "1") {
                    $(this.id).removeClass("radio_off").addClass("radio_on");
                } else {
                    $(this.id).removeClass("radio_on").addClass("radio_off");
                }
            }
        },
        "channel_width": {
            id:"#wifi_24g_bandwidth"
        },
        "ap_mode":      {
            id:"#wifi_24g_encrypt_mode"
        },
        "password":     {
            id:"#wifi_24g_pwd"
        },
        "channel_num":   {
            id:"#wifi_24g_channel"
        },
        "SSID_broadcast": {
            id:"#wifi_24g_hide_ssid",
            val: function (v) {
                $(this.id).prop("checked", v==="0");
            }
        }
    };
   showPathNav("我的安全路由", "WiFi设置");

   initView();

   var wifi_cfg;
   function paintView(data) {
        $.each(dom, function (id, item) {
            // console.log(id, item, data[id]);
            if (data[id] !== undefined) {
                if (item.val) {
                    item.val(data[id]);
                } else {
                    $(item.id).val(data[id]);
                }
            }
        });
   }

   function initView() {
       var p = {
           ap_id:       0,
           network_mode:999,
           port_id:     "WIFI1",
           ap_mode:     0
       };

       $.post("/router/wireless_base_show.cgi", p, function (data) {
           data = eval("("+data+")");
           paintView(data);
       });

       $.post("/router/wireless_sec_show.cgi", p, function (data) {
           data = eval("("+data+")");
           data.password    = aesDecrypt(data.wpa_key);
           paintView(data);
       });
   }
}