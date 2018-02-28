var pages = {
    'index_page': initIndexPage,
    'functions': initFuncPage,
    'settings': initSetPage,
    'management': initManagePage,
    'wifi_set': initWifiSetPage
};

function onWinHashChange() {
    var hash = window.location.hash || "#index_page";
    var p = hash.substring(1).split('/');
    var pageName = p[0];

    console.log("Window loc hash changed, now:" + hash);
    setCurClass("#" + pageName);

    switch (pageName) {
        case "index_page":
        case "settings":
            pageName = p[p.length-1];
            break;
    }
    loadHtml(pageName, pages[pageName], p);
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