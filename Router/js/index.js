function init_menu() {
    function navToPage() {
        var self    = $(this), id = self.attr("id");

        self.addClass("current");
        self.siblings().removeClass("current");
    }

    $("#nav-pages li").unbind("click").bind("click", navToPage);
}

$(document).ready(function () {
     init_menu();
});