(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiSlidingbar = require('./wi-slidingbar');

var app = angular.module('helloapp', [wiSlidingbar.name]);
app.controller('WiDummy', function($scope) {

});

},{"./wi-slidingbar":2}],2:[function(require,module,exports){
const componentName = 'wiSlidingbar';
const moduleName = 'wi-slidingbar';

function Controller() {
    var self = this;
    this.$onInit = function () {
        $("#tiny-screen").draggable({
            axis: "y",
            containment: "parent"
        });

        $("#tiny-screen").resizable({
            containment: "parent",
            minHeight: 150,
            minWidth: 300,
            maxWidth: 300,
            handles: "n, s"
        });

        $( "#tiny-screen" ).on( "resize", function( event, ui ) {
            console.log(ui);
        } );
    }
}
var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="sliding-container" id="sliding-container"><div class="sliding-content" ng-transclude></div><div id="tiny-screen" class="ui-widget-content"></div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {}
});

exports.name = moduleName;

},{}]},{},[1]);
