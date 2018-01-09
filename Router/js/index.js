var currentHtml = '';
const pages = {
    'index_page': initIndexPage,
    'functions': initFuncPage,
    'settings': initSetPage,
    'management': initManagePage
};

function loadApp(name) {
   var src = "app/" + name +"/webs/index.html";
    $(".functions .app-list").hide();
    $("#app_iframe").attr("src", src);
}

function onWinHashChange() {
    var hash = window.location.hash || "#index_page";
    var p = hash.substring(1).split('/');
    var pageName    = p[0], subPage = p[1] || null;

    console.log("Window loc hash changed, now:" + window.location.hash);
    setCurClass("#"+pageName);

    switch (pageName) {
        case "index_page":
        case "functions":
        case "settings":
        case "management":
            loadHtml(pageName, pages[pageName], subPage);
            break;
        case "app":
            loadApp(subPage);
            break;
        default:
            console.log("Unknown page:"+pageName);
            break;
    }
}

function init_menu() {
    $(window).on("hashchange", onWinHashChange);
    $("#nav-pages li").unbind("click").bind("click", function () {
        window.location.hash = $(this).attr("id");
    });
    onWinHashChange();
}

$(document).ready(function () {
    init_menu();
});