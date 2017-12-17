/**
 * Created by LP on 2017/8/16.
 */
var app = angular.module('ClockApp', []);
app.controller('MainCtrl', function($scope, $interval) {
    $scope.time = "Loading";
    $scope.secDegrees = 0;
    $scope.minDegrees = 0;
    $scope.hourDegrees = 0;
    var runTimer = false;

    function updateTime() {
        var d = new Date();
        $scope.time = d.toString();
        $scope.secDegrees = d.getSeconds() * (360/60);
        $scope.minDegrees = d.getMinutes() * (360/60);
        $scope.hourDegrees = d.getHours() * (360/12);
        $scope.secHeight = $scope.secDegrees + "px";
    }
    runTimer  = $interval(updateTime, 1000);

});

app.directive('rotate', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.degrees, function (deg) {
                var r = 'rotate(' + deg + 'deg)';
                element.css({
                    'transform':r,
                    '-moz-transform': r,
                    '-webkit-transform': r,
                    '-o-transform': r,
                    '-ms-transform': r
                });
            });
        }
    }
});