(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiBlock = require('./wi-block.js');
wiButton = require('./wi-button.js');

var app = angular.module('helloapp', ['ui.bootstrap', wiBlock.name, wiButton.name]);
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
    var self = this;
}

var app = angular.module(moduleName, []);

app.component(name, {
    template:'<div><div ng-transclude></div></div>',
    transclude: true,
    controller: Controller,
    controllerAs: name
});

exports.name = moduleName;

},{}],3:[function(require,module,exports){
/**
 * Created by cuong on 6/6/2017.
 */
const wiButtonName = 'wiButton';
const moduleName = 'wi-button';

function ButtonController() {
    var self = this;
}
var app = angular.module(moduleName, []);
app.component(wiButtonName, {
    template:'<div style="display: inline-block"><button ng-click="wiButton.handlers.onclick()" ng-mouseover="wiButton.handlers.onmouseover()"><img class="{{wiButton.layout || wiButton.config.layout}}" ng-src="{{wiButton.imgurl || wiButton.config.imgUrl}}" alt="folder"><p class="{{wiButton.layout || wiButton.config.layout}}">{{wiButton.label || wiButton.config.label}}</p></button></div>',
    controller: ButtonController,
    controllerAs: wiButtonName,
    bindings: {
        config: '<',
        label: '@',
        layout: '@',
        imgurl: '@',
        handlers: '<'
    }
});

exports.name=moduleName;

},{}]},{},[1]);
