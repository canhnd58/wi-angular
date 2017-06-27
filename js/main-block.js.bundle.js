(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let wiBlock = require('./wi-block.js');
let wiButton = require('./wi-button.js');

let app = angular.module('helloapp', ['ui.bootstrap', wiBlock.name, wiButton.name]);
app.controller('WiBlockController', WiBlockController);

function WiBlockController($scope) {
    $scope.myHandlers = {
        onclick: function () {
            console.log('click');
        },
        onmouseover: function () {
            console.log('onmouseover');
        }
    };
}
},{"./wi-block.js":2,"./wi-button.js":3}],2:[function(require,module,exports){
const name = 'wiBlock';
const moduleName = 'wi-block';

function Controller() {
    let self = this;
}

let app = angular.module(moduleName, []);

app.component(name, {
    template:'<div><div ng-transclude></div></div>',
    transclude: true,
    controller: Controller,
    controllerAs: name
});

exports.name = moduleName;

},{}],3:[function(require,module,exports){
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

},{}]},{},[1]);
