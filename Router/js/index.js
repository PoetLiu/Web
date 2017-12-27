var currentHtml = '';
const pages = {
   'index_page': initIndexPage,
    'functions': initFuncPage,
    'settings': initSetPage,
    'management': initManagePage
};

function onWinHashChange() {
    // console.log("Window loc hash changed, now:" + window.location.hash);
    var id  = window.location.hash.substring(1);
    loadHtml(id, pages[id]);
}

function navToPage(id) {
    var self    = $(this);

    if (typeof(id) === "string") {
       self = $(id);
    } else {
        id  = self.attr("id");
    }

    self.addClass("current");
    self.siblings().removeClass("current");

    window.location.hash    = id;
}

function init_menu() {
    $(window).on("hashchange", onWinHashChange);
    $("#nav-pages li").unbind("click").bind("click", navToPage);
    navToPage("#index_page");
}

$(document).ready(function () {
     init_menu();
});