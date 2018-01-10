$(document).ready(function () {
    powerBarUpdate("high");
});

function powerBarUpdate(mode) {
    var w   = 0;
    switch (mode) {
        case "low":
            w = 40;
            break;
        case "middle":
            w = 316;
            break;
        case "high":
            w = 630;
            break;
        default:
            console.log("Unknown mode:", mode);
            break;
    }
    if (w) {
        $("#pw-select").animate({width: w+"px"}, 500);
    }
}