function initFuncPage(curPage) {
    console.log("Init Functions page."+curPage);
    $("#functions-nav li").unbind("click").bind("click", function() {
        var id = $(this).attr("id");
        window.location.hash = "functions/"+id.substring(0, id.length-4);
    });

    curPage  = curPage || "fast-tool";
    curPage = "#" + curPage;
    setCurClass(curPage+'-nav');
    setCurClass(curPage);
}