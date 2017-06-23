(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiButton = require('./wi-button.js');
wiToolbar = require('./wi-toolbar.js');
wiSlidingbar = require('./wi-slidingbar.js');
wiLogplot = require('./wi-logplot.js');

wiComponentService = require('./wi-component-service');

var app = angular.module('helloapp',
    [wiLogplot.name, wiButton.name, wiToolbar.name, wiSlidingbar.name, wiComponentService.name]);
app.controller('WiDummy', function ($scope) {

});
},{"./wi-button.js":2,"./wi-component-service":3,"./wi-logplot.js":4,"./wi-slidingbar.js":5,"./wi-toolbar.js":6}],2:[function(require,module,exports){
const wiButtonName = 'wiButton';
const moduleName = 'wi-button';

function ButtonController(wiComponentService) {
    let self = this;

    this.default = {
        type: 'normal',
        label: '',
        layout: 'icon-top',
        icon: 'project-new-32x32'
    };

    this.onClick = function () {
        if (self.handler) self.handler();
    };

    this.$onInit = function() {
        if (self.name) wiComponentService.putComponent(self.name, self);
    }
}

let app = angular.module(moduleName, []);
app.component(wiButtonName, {
    template:'<div><button ng-click="wiButton.onClick()" class="button-{{wiButton.type || wiButton.config.type || wiButton.default.type}}"><img class="{{wiButton.icon || wiButton.config.icon || wiButton.default.icon}}" alt="icon wi-button"><p class="{{wiButton.layout || wiButton.config.layout || wiButton.default.layout}}" ng-show="wiButton.label != null || wiButton.config.label != null">{{wiButton.label || wiButton.config.label || wiButton.default.label}}</p></button></div>',
    controller: ButtonController,
    controllerAs: wiButtonName,
    bindings: {
        config: '<',
        type: '@',
        name: '@',
        label: '@',
        layout: '@',
        icon: '@',
        handler: '<'
    }
});

exports.name = moduleName;

},{}],3:[function(require,module,exports){
const wiServiceName = 'wiComponentService';
const moduleName = 'wi-component-service';

var app = angular.module(moduleName, []);
app.factory(wiServiceName, function() {
    var __Controllers = new Object();
    return { 
        getComponent: function(componentName){
            console.log("Do you want " + componentName + "'s controller?");
            return __Controllers[componentName];
        },
        putComponent: function(componentName, controller) {
            console.log("put component:" + componentName + " - ", controller); 
            __Controllers[componentName] = controller;
        }
    };
});

exports.name = moduleName;

},{}],4:[function(require,module,exports){
const componentName = 'wiLogplot';
const moduleName = 'wi-logplot';

function Controller(wiComponentService) {
    var self = this;

    this.$onInit = function () {
        self.slidingbarName = self.name + 'Slidingbar';

        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.getSlidingbarCtrl = function () {
        return self.slidingBar = wiComponentService.getComponent(self.slidingbarName);
    }
}

var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="logplot-toolbar-wrapper"><wi-toolbal><wi-button layout="icon-left"></wi-button><wi-button layout="icon-left"></wi-button></wi-toolbal><wi-toolbar><wi-button layout="icon-left"></wi-button><wi-button layout="icon-left"></wi-button></wi-toolbar></div><div class="logplot-main-content"><wi-slidingbar name="{{wiLogplot.slidingbarName}}" ng-init="wiLogplot.getSlidingbarCtrl()"><p>Some thing like curve</p></wi-slidingbar><div class="logplot-sub-content">Some tracks: {{wiLogplot.slidingBar.slidingBarState.top}} -- {{wiLogplot.slidingBar.slidingBarState.range}}</div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        name: '@'
    }
});

exports.name = moduleName;
},{}],5:[function(require,module,exports){
const componentName = 'wiSlidingbar';
const moduleName = 'wi-slidingbar';

const MIN_RANGE = 30;

function Controller($scope, wiComponentService) {
    let self = this;
    self.tinyWindow = null;
    let parentHeight = 0;
    this.slidingBarState = {
        top: 0,
        range: MIN_RANGE
    };

    function update(ui) {
        parentHeight = parseInt($(self.contentId).height());

        if (ui.size) {
            self.tinyWindow.height = (ui.size.height > parentHeight) ? parentHeight : ui.size.height;
        }
        if (ui.position) {
            self.tinyWindow.top = (ui.position.top > 0) ? ui.position.top : 0;
        }
        self.slidingBarState.top = Math.round(self.tinyWindow.top / parentHeight * 100);
        self.slidingBarState.range = Math.round(self.tinyWindow.height / parentHeight * 100);

        // call apply to call all parent scope watcher
        $scope.$apply();
    }

    this.$onInit = function () {
        self.contentId = '#sliding-bar-content' + self.name;
        self.handlerId = '#sliding-handle' + self.name;

        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.onReady = function () {
        parentHeight = parseInt($(self.contentId).height());
        var initialHeight = Math.round(parentHeight * MIN_RANGE / 100);

        self.tinyWindow = {
            height: initialHeight,
            top: 0
        };

        // init tiny window height
        $(self.handlerId).height(initialHeight);
        self.tinyWindow.height = initialHeight;

        $(self.handlerId).draggable({
            axis: "y",
            containment: "parent"
        }).resizable({
            minHeight: initialHeight,
            containment: "parent",
            handles: "n, s"
        });

        $(self.handlerId).on("resize", function (event, ui) {
            update(ui);
        });

        $(self.handlerId).on("drag", function (event, ui) {
            update(ui);
        });
    };

    this.setSlidingHandleHeight = function () {
        parentHeight = parseInt($(self.contentId).height());

        var initialHeight = Math.round(parentHeight * MIN_RANGE / 100);
        $(self.handlerId).height(initialHeight);
        self.tinyWindow.height = initialHeight;
    }
}

var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div id="sliding-bar-content{{wiSlidingbar.name}}" class="sliding-bar-content" ng-transclude elem-ready="wiSlidingbar.onReady()"></div><div id="sliding-handle{{wiSlidingbar.name}}" class="ui-widget-content sliding-handle"><div class="sliding-handler-border"></div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        name: '@'
    }
});

app.directive('elemReady', function ($parse) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            elem.ready(function () {
                $scope.$apply(function () {
                    var func = $parse(attrs.elemReady);
                    func($scope);
                })
            })
        }
    }
});

exports.name = moduleName;
exports.componentName = componentName;

},{}],6:[function(require,module,exports){
const name = 'wiToolbar';
const moduleName = 'wi-toolbar';

function Controller() {
    let self = this;

    this.default = {
        type: 'vertical',
        label: ''
    }


}

let app = angular.module(moduleName, []);

app.component(name, {
    template:'<div ng-transclude class="toolbar-{{wiToolbar.type || wiToolbar.default.type}}"></div><p class="wi-toolbar-label" ng-show="wiToolbar.label && wiToolbar.label.length > 0">{{wiToolbar.label}}</p>',
    transclude: true,
    controller: Controller,
    controllerAs: name,
    bindings: {
        name: '@',
        type: '@',
        label: '@'
    }
});

exports.name = moduleName;

},{}]},{},[1]);
