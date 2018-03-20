function initWifiSetPage() {
    var dom = {
        "AP_SSID":"#wifi_24g_ssid",
        "wire_enable":"#wifi_24g_enable",
        "channel_width":"#wifi_24g_bandwidth"
    };
   showPathNav("我的安全路由", "WiFi设置");

   initView();

   function paintView(data) {
        $.each(dom, function (id, item) {
            console.log(id, item, data[id]);
            $(item).val(data[id]);
        });
   }

   function initView() {
       var p = {
           ap_id:       0,
           network_mode:999,
           port_id:     "WIFI1"
       };

       $.post("/router/wireless_base_show.cgi", p, function (data) {
           var data = eval("("+data+")");
           paintView(data);
       });
   }
}