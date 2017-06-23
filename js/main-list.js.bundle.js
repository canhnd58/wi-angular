(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let wiList = require('./wi-list');

let wiComponentService = require('./wi-component-service');

let app = angular.module('helloapp', [wiList.name, wiComponentService.name]);

app.controller('WiDummy', function ($scope, wiComponentService) {
    $scope.myListItems = [
        {
            key: 'key',
            value: 'value'
        },
        {
            key: 'key',
            value: 'value'
        },
        {
            key: 'key',
            value: 'value'
        }
    ];

    $scope.myListItems2 = [
        {
            key: 'key',
            value: 'value'
        },
        {
            key: 'key',
            value: 'value'
        }
    ];

    $scope.myHandler = function () {
        let wiListController = wiComponentService.getComponent('MyList1');
        wiListController.heading = 'New heading ' + Date.now();
    };

    $scope.addMoreItem = function () {
        wiComponentService.getComponent('MyList2').addItem('key' + Date.now(), 'value' + Date.now());
    };
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
    let self = this;

    this.$onInit = function() {
        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.addItem = function (key, value) {
        self.items.push({key, value});
    }
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<p class="list-heading">{{wiList.heading}}</p><table><tr ng-repeat="item in wiList.items"><td>{{item.key}}</td><td>{{item.value}}</td></tr></table>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name : '@',
        heading: '@',
        items: '<'
    }
});

exports.name = moduleName;

},{}]},{},[1]);
