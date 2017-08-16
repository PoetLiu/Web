/**
 * Created by LP on 2017/8/16.
 */
var app = angular.module('ClockApp', []);
app.controller('MainCtrl', function($scope, $interval, $element, $animate) {
    $scope.time = "Loading";
    $scope.secDegrees = 0;
    $scope.minDegrees = 0;
    $scope.hourDegrees = 0;
    var runTimmer = false;

    function updateTime() {
        var d = new Date();
        $scope.time = d.toString();
        $scope.secDegrees = d.getSeconds() * (360/60);
        $scope.minDegrees = d.getMinutes() * (360/60);
        $scope.hourDegrees = d.getHours() * (360/12);
        $scope.secHeight = $scope.secDegrees + "px";
    }
    runTimer  = $interval(updateTime, 1000);

    $scope.Rotate = function() {
        $scope.secDegrees += 6;
        $scope.minDegrees += 0.1;
        $scope.hourDegrees += 0.00167;
    };
});

app.directive('rotate', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.degrees, function (rotateDegrees) {
                var r = 'rotate(' + rotateDegrees + 'deg)';
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