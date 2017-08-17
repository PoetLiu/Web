/**
 * Created by LP on 2017/8/16.
 */
$(document).ready(function() {
});

$("#search-btn").on("click", function(){
    $("#search-btn").hide(500);
    $("#search-box").show(500);
});

api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
cb = "&callback=?";
pageUrl = "https://en.wikipedia.org/?curid=";

$("#search-go-btn").on("click", function(){
    var keyWords = $("#search-input").val();
    if (keyWords.length <= 0)
        return jumpToRandomPage();
    else
        return searchDo(keyWords);
});

function jumpToRandomPage() {
    window.location.href="https://en.wikipedia.org/wiki/Special:Random";
}
function searchDo(keyWords) {
    $.getJSON(api+keyWords+cb, function(json) {
        clearResult();
        data  = json.query.pages;
        for (obj in data) {
            _obj = data[obj];
            pushResult({title:_obj.title, content:_obj.extract, pageId:_obj.pageid});
        }
        $("#keyWords").html(keyWords);
        $("#jumbotron").removeClass("vertical-center");
        $("#results").show(500);
    });
}

function pushResult(result)
{
    var li= document.createElement("li");
    var list = document.getElementById("results-list");
    li.innerHTML='<a href="'+pageUrl+result.pageId+'" target="_blank"><p><span class="lead">'+result.title+'</span><br/>'+result.content+'</p></a>';
    list.appendChild(li);
    return 0;
}

function clearResult()
{
    return $("#results-list").empty();
}

function keyPressCheck()
{
    var event = window.event || arguments.callee.caller.arguments[0];
    var key = event.keyCode;
    var btn = document.getElementById("search-go-btn");

    if (key == 13) {
        btn.click();
    }
}