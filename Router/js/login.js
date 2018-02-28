$(document).ready(function () {
   current_html = 'login';
    $("#login-input").focus();
    $("#login-btn").on("click", login);
});
var errNo = [
    "48",
    "49",
    "50",
    "51",
    "52"
];

function login() {
    if ($.cookie("Qihoo_360_login")) {
        $.cookie("Qihoo_360_login", null, {
            path: "/",
            expires: 1
        });
    }

    var login = {};
    login.user = 'admin';
    login.pass = aesEncrypt($("#login-input").val());
    login.from = 1;

    console.log(login);
    $.post("/router/web_login.cgi", login, function (data) {
        try {
            data = eval("(" + data + ")");
            if (data["success"] == "1" && data["token_id"] != "") {
                location.href = "./index.html?token_id=" + data["token_id"];
            } else {
                showMessage(MsgType.ERROR, "login_failure:<br/>" + data["err_msg"]);
            }
        } catch (e) {
            showMessage(MsgType.ERROR, "login_failure:<br/>"+e);
        }
    });
}
