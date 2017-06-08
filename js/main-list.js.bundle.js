(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiList = require('./wi-list');

var app = angular.module('helloapp', ['ui.bootstrap', wiList.name]);
app.controller('WiDummy', function($scope, $timeout) {
    $scope.myListItems = [
        {
            imgUrl: '',
            key: 'key',
            value: 'value'
        },
        {
            imgUrl: '',
            key: 'key',
            value: 'value'
        },
        {
            imgUrl: '',
            key: 'key',
            value: 'value'
        },
        {
            imgUrl: '',
            key: 'key',
            value: 'value'
        }
    ];

    $scope.tick = function() {
        var newItem = {
            imgUrl: '',
            key: 'key',
            value: 'value'
        };
        $scope.myListItems.push(newItem);
        console.log('push', newItem);

        $timeout($scope.tick, 1000);
    };
    $timeout($scope.tick, 1000);
});
},{"./wi-list":2}],2:[function(require,module,exports){
const componentName = 'wiList';
const moduleName = 'wi-list';

function Controller() {
    var self = this;
}

var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<h4>{{wiList.heading}}</h4><table><tr ng-repeat="item in wiList.items"><td>{{item.key}}</td><td>{{item.value}}</td></tr></table>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        heading: '@',
        items: '<'
    }
});

exports.name = moduleName;

},{}]},{},[1]);
