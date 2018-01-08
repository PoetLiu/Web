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
                if (!isNaN(data.err_no) && errNo.indexOf(data.err_no) !== -1) {
                    showMessage("login_failure" + data.err_no);
                } else {
                    showMessage("login_failure");
                }
            }
        } catch (e) {
            showMessage("login_failure");
        }
    });
}
