(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiSlidingbar = require('./wi-slidingbar');

var app = angular.module('helloapp', [wiSlidingbar.name]);

app.controller('WiDummy', ['$scope', 'wiSlidingbar', function ($scope, wiSlidingbar) {
    $scope.wiSlidingbar = wiSlidingbar;
}]);

},{"./wi-slidingbar":2}],2:[function(require,module,exports){
const componentName = 'wiSlidingbar';
const moduleName = 'wi-slidingbar';

const MIN_RANGE = 30;

var slidingBarState = {
    top: 0,
    range: MIN_RANGE
};

function Controller($scope, $timeout, wiSlidingbar) {
    var self = this;
    self.tinyWindow = null;
    var parentHeight = 0;

    function update(ui) {
        parentHeight = parseInt($("#sliding-bar-content").height());

        if (ui.size) {
            self.tinyWindow.height = (ui.size.height > parentHeight) ? parentHeight : ui.size.height;
        }
        if (ui.position) {
            self.tinyWindow.top = (ui.position.top > 0) ? ui.position.top : 0;
        }
        wiSlidingbar.top = Math.round(self.tinyWindow.top / parentHeight * 100);
        wiSlidingbar.range = Math.round(self.tinyWindow.height / parentHeight * 100);

        // call apply to call all parent scope watcher
        $scope.$apply();
    }

    this.$onInit = function () {
        parentHeight = parseInt($("#sliding-bar-content").height());
        var initialHeight = Math.round(parentHeight * MIN_RANGE / 100);

        self.tinyWindow = {
            height: initialHeight,
            top: 0
        };

        $("#sliding-handle").draggable({
            axis: "y",
            containment: "parent"
        }).resizable({
            minHeight: initialHeight,
            containment: "parent",
            handles: "n, s"
        });

        setSlidingHandleHeight();
        $timeout(function () {
            setSlidingHandleHeight();
        }, 100);


        $("#sliding-handle").on("resize", function (event, ui) {
            update(ui);
        });

        $("#sliding-handle").on("drag", function (event, ui) {
            update(ui);
        });
    };

    function setSlidingHandleHeight() {
        parentHeight = parseInt($("#sliding-bar-content").height());

        var initialHeight = Math.round(parentHeight * MIN_RANGE / 100);
        $('#sliding-handle').height(initialHeight);
        self.tinyWindow.height = initialHeight;
    }
}
var app = angular.module(moduleName, []);

app.factory(componentName, function () {
    return slidingBarState;
});

app.component(componentName, {
    template:'<div id="sliding-bar-content" ng-transclude></div><div id="sliding-handle" class="ui-widget-content"><div class="sliding-handler-border"></div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {}
});

exports.name = moduleName;
exports.componentName = componentName;

},{}]},{},[1]);
