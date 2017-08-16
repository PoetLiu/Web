/**
 * Created by LP on 2017/8/16.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function NumGuessGame(min, max, retry) {
    this.min = min;
    this.max = max;
    this.maxRetryTimes = retry;
};

NumGuessGame.prototype.init = function(restart) {
    this.retryTimes = 0;
    this.history = "";
    this.target = getRandomInt(this.min, this.max);

    if (restart) {
        this.clearInput();
        $('#input-box,#check-btn').attr('disabled', false);
        $("#reset-btn").css('display', 'none');
        $("#history,#result").html("");
    } else {
        this.addBtnEventListener();
    }
    //console.log(this.target);
};

NumGuessGame.prototype.clearInput = function() {
    $('#input-box').val('');
};

NumGuessGame.prototype.addBtnEventListener = function() {
    var _this = this;
    $('button').on("click",
        function() {
            var btnId = $(this).attr("id");
            if (btnId === "check-btn") {
                _this.checkBtnClick();
            } else if (btnId === "reset-btn") {
                _this.resetBtnClick();
            } else {
                console.log("Unknown btnId:" + btnId);
            }
        });
    this.btnEventReged = true;
};

NumGuessGame.prototype.gameOver = function() {
    $('#input-box,#check-btn').attr('disabled', true);
    $('#reset-btn').css('display', 'inline-block');
};

NumGuessGame.prototype.checkBtnClick = function() {
    //console.log("Check Btn clicked!");
    //console.log($('#input-box').val);
    var val = $('#input-box').val();
    var num = Number.parseInt(val);

    if (val === '' || Number.isInteger(num) === false) {
        $('#result').html("Please input a Valid num!");
        return;
    }

    $('#history').append((this.retryTimes ? ', ': '') + num);
    this.retryTimes++;
    if (num === this.target) {
        $('#result').html("Wow, You Win!");
        $('#result').addClass('bg-success');
        this.gameOver();
    } else {
        $('#result').addClass('bg-warning');
        if (this.retryTimes >= this.maxRetryTimes) {
            $('#result').html("GAME OVER! You Lose!");
            this.gameOver();
        } else if (num > this.target) {
            $('#result').html("Too big!");
        } else {
            $('#result').html("Too small!");
        }
    }
};

NumGuessGame.prototype.resetBtnClick = function() {
    //console.log("Reset Btn clicked!");
    this.init(true);
};

$(document).ready(function() {
    var gameApp = new NumGuessGame(1, 100, 10);
    gameApp.init();
});