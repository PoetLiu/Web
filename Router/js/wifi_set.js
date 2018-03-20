function initWifiSetPage() {
   showPathNav("我的安全路由", "WiFi设置");

   paintView();
   function paintView() {
       var p = {
           ap_id:       0,
           network_mode:999,
           port_id:     "WIFI1"
       };

       $.post("/router/wireless_base_show.cgi", p, function (data) {
           var data = eval("("+data+")");
           console.log(data);
       });
   }
}