(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiList = require('./wi-list');
wiComponentService = require('./wi-component-service');

var app = angular.module('helloapp', [wiList.name, wiComponentService.name]);
app.controller('WiDummy', function ($scope, $timeout, wiComponentService) {
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

    $scope.myHandler = function () {
        var wiListController = wiComponentService.getComponent('MyList1');
        wiListController.heading = 'New heading ' + Date.now();
    };

    var itemCount = 0;
    $scope.tick = function () {
        var newItem = {
            imgUrl: '',
            key: 'key',
            value: 'value'
        };
        $scope.myListItems.push(newItem);
        itemCount++;

        if (itemCount < 5) {
            $timeout($scope.tick, 1000);
        }
    };
    $timeout($scope.tick, 1000);
});
},{"./wi-component-service":2,"./wi-list":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
const componentName = 'wiList';
const moduleName = 'wi-list';

function Controller(wiComponentService) {
    var self = this;

    this.$onInit = function() {
        if (self.name) wiComponentService.putComponent(self.name, self);
    }
}

var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<h4>{{wiList.heading}}</h4><table><tr ng-repeat="item in wiList.items"><td>{{item.key}}</td><td>{{item.value}}</td></tr></table>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name : '@',
        heading: '@',
        items: '<',
        handler: '<'
    }
});

exports.name = moduleName;

},{}]},{},[1]);
