(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiRibbon = require('./wi-button.js');
wiToolbar = require('./wi-toolbar.js');

wiComponentService = require('./wi-component-service');

app = angular.module('helloapp', [wiToolbar.name, wiRibbon.name, wiComponentService.name]);
app.controller('WiDummy', function ($scope, wiComponentService) {

});
},{"./wi-button.js":2,"./wi-component-service":3,"./wi-toolbar.js":4}],2:[function(require,module,exports){
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
