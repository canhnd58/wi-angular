(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiRibbon = require('./wi-button.js');
wiToolbar = require('./wi-toolbar.js');

app=angular.module('helloapp', ['ui.bootstrap', wiToolbar.name, wiRibbon.name]);
app.controller('WiDummy', function($scope) {
        $scope.buttonCfg = buttonCfg;
        $scope.buttonCfg2 = buttonCfg2;
    });
buttonCfg = {
    icon: 'project-new-32x32',
    label: 'New Project',
    layout: 'icon-left',
    handlers: {
        onclick: function() {
            console.log('click');
        },
        onmouseover: function() {
            console.log('mouseOver');
        }
    }
};
buttonCfg2 = {
    icon: 'project-open-32x32',
    label: 'Open Project',
    layout: 'icon-top'
};

},{"./wi-button.js":2,"./wi-toolbar.js":3}],2:[function(require,module,exports){
const wiButtonName = 'wiButton';
const moduleName = 'wi-button';

function ButtonController() {
    var self = this;
    this.default = {
        label: 'Button',
        layout: 'icon-top',
        icon: 'project-new-32x32'
    };
}
var app = angular.module(moduleName, []);
app.component(wiButtonName, {
    template:'<div><button ng-click="wiButton.handlers.onclick()" ng-mouseover="wiButton.handlers.onmouseover()"><img class="{{wiButton.icon || wiButton.config.icon || wiButton.default.icon}}" alt="icon"><p class="{{wiButton.layout || wiButton.config.layout || wiButton.default.layout}}">{{wiButton.label || wiButton.config.label}}</p></button></div>',
    controller: ButtonController,
    controllerAs: wiButtonName,
    bindings: {
        config: '<',
        label: '@',
        layout: '@',
        icon: '@',
        handlers: '<'
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
    template:'<div class="toolbar-wrapper"><div ng-transclude></div><p class="wi-toolbar-label">{{wiToolbar.label}}</p></div>',
    transclude: true,
    controller: Controller,
    controllerAs: name,
    bindings: {
        label: '@'
    }
});

exports.name = moduleName;

},{}]},{},[1]);
