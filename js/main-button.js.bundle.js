(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiRibbon = require('./wi-button');

var app = angular.module('helloapp', [ wiRibbon.name]);
app.controller('WiDummy', function($scope) {
    $scope.buttonCfg = buttonCfg;
    $scope.myHandlers = myHandlers;
    $scope.ProjectTab = ProjectTab;
});

buttonCfg = {
    type: 'button',
    imgUrl: 'img/32x32/project_new_32x32.png',
    label: 'New Project',
    layout: 'icon-left',
    handler: function (thisButton) {
        console.log(thisButton.label);
    }
};

myHandlers = {
    onclick:function() {console.log('click');},
    onmouseover:function() {console.log('mouseOver');}
}

},{"./wi-button":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
