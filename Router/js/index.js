var currentHtml = '';
const pages = {
    'index_page': initIndexPage,
    'functions': initFuncPage,
    'settings': initSetPage,
    'management': initManagePage
};

function onWinHashChange() {
    var id = window.location.hash || "#index_page";
    var idName = id.substring(1);

    console.log("Window loc hash changed, now:" + window.location.hash);
    navSetCurrent(id);
    loadHtml(idName, pages[idName]);
}

function navSetCurrent(id) {
    var nav = $(id);
    nav.addClass("current");
    nav.siblings().removeClass("current");
}

function navToPage(id) {
    if (typeof(id) !== "string") {
        id = $(this).attr("id");
    }

    window.location.hash = id;
}

function init_menu() {
    $(window).on("hashchange", onWinHashChange);
    $("#nav-pages li").unbind("click").bind("click", navToPage);
    onWinHashChange();
}

$(document).ready(function () {
    init_menu();
});