function initSetPage(p) {
    console.log("Init Settings page."+p);
    $("#settings-nav li").unbind("click").bind("click", function() {
        var id = $(this).attr("id");
        window.location.hash = "settings/"+id.substring(0, id.length-4);
    });

    var sub = p[1] || "fast-set";

    setCurClass("#"+sub);
    setCurClass("#"+sub+"-nav");
}