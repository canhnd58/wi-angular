(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiStatusBar = require('./wi-status-bar');

var app = angular.module('helloapp', [wiStatusBar.name]);
app.controller('WiDummy', function($scope) {

});
// tung.hoang@gmail.com
},{"./wi-status-bar":2}],2:[function(require,module,exports){
const componentName = 'wiStatusBar';
const moduleName = 'wi-status-bar';

function Controller() {
    var self = this;
}
var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<h3>status bar</h3>',
    controller: Controller,
    controllerAs: componentName
});

exports.name = moduleName;

},{}]},{},[1]);
