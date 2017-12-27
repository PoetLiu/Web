var currentHtml = '';
const pages = {
   'index_page': initIndexPage,
    'functions': initFuncPage,
    'settings': initSetPage,
    'management': initManagePage,
};

function funCall(f, param) {
   if (f != null && f !== "")  {
      try {
          if (typeof(window[f]) === "function") {
              window[f].apply(null, param);
          } else if (typeof(f) === "function") {
              f.call(this);
          }
      }
      catch (e) {
         console.log(e);
      }
   }
}

function loadHtml(html, init) {
    currentHtml = html;
    var params  = Array.prototype.slice.apply(arguments, [2, arguments.length]);
    $.ajax({
        type: "get",
        url:    "./"+html+".html",
        dataType: "html",
        error: function (XMLHttpRequest, testStatus) {
           return; 
        },
        success: function (ret) {
           var container    = $("#container");
           container.html(ret);
           funCall(init, params);
        }
    });
}

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