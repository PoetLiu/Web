function initSetPage(curPage) {
    console.log("Init Settings page."+curPage);
    $("#settings-nav li").unbind("click").bind("click", function() {
        var id = $(this).attr("id");
        window.location.hash = "settings/"+id.substring(0, id.length-4);
    });

    curPage  = curPage || "fast-set";
    curPage = "#" + curPage;
    setCurClass(curPage+'-nav');
    setCurClass(curPage);
}