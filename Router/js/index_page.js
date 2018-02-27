function initIndexPage() {
    console.log("Init index page.");
    $(".app-list .menu-item").unbind("click").bind("click", function () {
        var id = $(this).attr("id");
        window.location.hash = "index_page/"+id;
    });
}