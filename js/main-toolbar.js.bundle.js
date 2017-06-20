(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiRibbon = require('./wi-button.js');
wiToolbar = require('./wi-toolbar.js');

app = angular.module('helloapp', [wiToolbar.name, wiRibbon.name]);
app.controller('WiDummy', function ($scope) {

});
},{"./wi-button.js":2,"./wi-toolbar.js":3}],2:[function(require,module,exports){
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
