(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let wiSlidingbar = require('./wi-slidingbar');
let wiComponentService = require('./wi-component-service');

let app = angular.module('helloapp', [wiSlidingbar.name, wiComponentService.name]);
app.controller('WiDummy', function ($scope, wiComponentService) {
    $scope.getSlidingbarComponent = function () {
        $scope.wiSlidingbar = wiComponentService.getComponent('MySlidingBar1');
    };
});

},{"./wi-component-service":2,"./wi-slidingbar":3}],2:[function(require,module,exports){
const wiServiceName = 'wiComponentService';
const moduleName = 'wi-component-service';

let app = angular.module(moduleName, []);
app.factory(wiServiceName, function () {
    let __Controllers = {};
    let handlers = {};

    return {
        treeFunctions: {},

        getComponent: function (componentName) {
            return __Controllers[componentName];
        },
        putComponent: function (componentName, controller) {
            __Controllers[componentName] = controller;
        },

        on: function (eventName, handlerCb) {
            let eventHandlers = handlers[eventName];
            if (!Array.isArray(eventHandlers)) {
                handlers[eventName] = [];
            }

            handlers[eventName].push(handlerCb);
        },
        emit: function (eventName, data) {
            let eventHandlers = handlers[eventName];
            if (Array.isArray(eventHandlers)) {
                eventHandlers.forEach(function (handler) {
                    handler(data);
                })
            }
        }
    };
});

exports.name = moduleName;
},{}],3:[function(require,module,exports){
const componentName = 'wiSlidingbar';
const moduleName = 'wi-slidingbar';

const MIN_RANGE = 1;

function Controller($scope, wiComponentService) {
    let self = this;

    this.tinyWindow = null;
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
        self.handleId = '#sliding-handle' + self.name;

        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.onReady = function () {
        parentHeight = parseInt($(self.contentId).height());
        let initialHeight = Math.round(parentHeight * (MIN_RANGE) / 100);

        self.tinyWindow = {
            top: (parentHeight - initialHeight * 4) * Math.random(),
            height: initialHeight * 4
        };


        // init tiny window height
        $(self.handleId).height(self.tinyWindow.height);
        $(self.handleId).css('top', self.tinyWindow.top + 'px');

        self.slidingBarState.top = Math.round(self.tinyWindow.top / parentHeight * 100);
        self.slidingBarState.range = Math.round(self.tinyWindow.height / parentHeight * 100);

        $(self.handleId).draggable({
            axis: "y",
            containment: "parent"
        }).resizable({
            minHeight: initialHeight,
            containment: "parent",
            handles: "n, s"
        });

        $(self.handleId).on("resize", function (event, ui) {
            update(ui);
        });

        $(self.handleId).on("drag", function (event, ui) {
            update(ui);
        });
    };
    /*
     this.setSlidingHandleHeight = function () {
     console.log('set slidingHandleHeight');
     parentHeight = parseInt($(self.contentId).height());

     let initialHeight = Math.round(parentHeight * MIN_RANGE / 100);
     $(self.handleId).height(initialHeight);
     self.tinyWindow.height = initialHeight;
     }
     */
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div id="sliding-bar-content{{wiSlidingbar.name}}" class="sliding-bar-content" ng-transclude elem-ready="wiSlidingbar.onReady()"></div><div id="sliding-handle{{wiSlidingbar.name}}" class="ui-widget-content sliding-handle"><div class="sliding-handle-border"></div></div>',
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
                    let func = $parse(attrs.elemReady);
                    func($scope);
                })
            })
        }
    }
});

exports.name = moduleName;
exports.componentName = componentName;

},{}]},{},[1]);
