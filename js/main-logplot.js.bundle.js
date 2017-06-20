(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiLogplot = require('./wi-logplot.js');

var app = angular.module('helloapp', [wiLogplot.name]);
app.controller('WiDummy', function ($scope) {

});
},{"./wi-logplot.js":3}],2:[function(require,module,exports){
const wiButtonName = 'wiButton';
const moduleName = 'wi-button';

function ButtonController() {
    var self = this;

    this.default = {
        label: '',
        layout: 'icon-top',
        icon: 'project-new-32x32'
    };

    this.onClick = function () {
        if (self.handler) self.handler();
    };
}
var app = angular.module(moduleName, []);
app.component(wiButtonName, {
    template:'<div><button ng-click="wiButton.onClick()"><img class="{{wiButton.icon || wiButton.config.icon || wiButton.default.icon}}" alt="icon wi-button"><p class="{{wiButton.layout || wiButton.config.layout || wiButton.default.layout}}" ng-show="wiButton.label != null || wiButton.config.label != null">{{wiButton.label || wiButton.config.label || wiButton.default.label}}</p></button></div>',
    controller: ButtonController,
    controllerAs: wiButtonName,
    bindings: {
        config: '<',
        name: '@',
        label: '@',
        layout: '@',
        icon: '@',
        handler: '<'
    }
});

exports.name = moduleName;

},{}],3:[function(require,module,exports){
const componentName = 'wiLogplot';
const moduleName = 'wi-logplot';

wiButton = require('./wi-button.js');
wiToolbar = require('./wi-toolbar.js');
wiSlidingbar = require('./wi-slidingbar.js');

function Controller(wiSlidingbar) {
    var self = this;
    this.wiSlidingbar = wiSlidingbar;
}

var app = angular.module(moduleName, [wiButton.name, wiToolbar.name, wiSlidingbar.name]);
app.component(componentName, {
    template:'<div class="logplot-toolbar-wrapper"><wi-toolbal><wi-button layout="icon-left"></wi-button><wi-button layout="icon-left"></wi-button></wi-toolbal><wi-toolbar><wi-button layout="icon-left"></wi-button><wi-button layout="icon-left"></wi-button></wi-toolbar></div><div class="logplot-main-content"><wi-slidingbar><p>Some thing like curve</p></wi-slidingbar><div class="logplot-sub-content">Some tracks: {{wiLogplot.wiSlidingbar.top}} -- {{wiLogplot.wiSlidingbar.range}}</div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true
});

exports.name = moduleName;

},{"./wi-button.js":2,"./wi-slidingbar.js":4,"./wi-toolbar.js":5}],4:[function(require,module,exports){
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

    this.$postLink = function () {
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

        //setSlidingHandleHeight();
        $timeout(function () {
            setSlidingHandleHeight();
        }, 0);

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

},{}],5:[function(require,module,exports){
const name = 'wiToolbar';
const moduleName = 'wi-toolbar';

function Controller() {
    var self = this;
}

var app = angular.module(moduleName, []);

app.component(name, {
    template:'<div class="toolbar-wrapper"><div ng-transclude></div><p class="wi-toolbar-label" ng-show="wiToolbar.label && wiToolbar.label.length > 0">{{wiToolbar.label}}</p></div>',
    transclude: true,
    controller: Controller,
    controllerAs: name,
    bindings: {
        label: '@'
    }
});

exports.name = moduleName;

},{}]},{},[1]);
