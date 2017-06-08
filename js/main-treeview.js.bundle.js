(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiTreeview = require('./wi-treeview');

var app = angular.module('helloapp', ['ui.bootstrap', wiTreeview.name]);
app.controller('WiDummy', function($scope) {
    $scope.myConfig = TREE_CONFIG_TEST;
});

const TREE_CONFIG_TEST = [
    {
        data: {
            imgUrl: 'img/32x32/project_new_32x32.png',
            label: 'item 1',
            description: 'description 1',
            childExpanded: false,
            handler: ''
        },
        children: [
            {
                data: {
                    imgUrl: 'img/32x32/project_new_32x32.png',
                    label: 'item 1.1',
                    description: '',
                    childExpanded: true,
                    handler: ''
                },
                children: [
                    {
                        data: {
                            imgUrl: 'img/32x32/project_new_32x32.png',
                            label: 'item 1.2.1',
                            description: '',
                            childExpanded: true,
                            handler: ''
                        },
                        children: [
                            {
                                data: {
                                    imgUrl: 'img/32x32/project_new_32x32.png',
                                    label: 'item 1.2.1.1',
                                    description: '',
                                    childExpanded: true,
                                    handler: ''
                                },
                                children: [
                                    {
                                        data: {
                                            imgUrl: 'img/32x32/project_new_32x32.png',
                                            label: 'item 1.2.1.1.1',
                                            description: '',
                                            childExpanded: true,
                                            handler: ''
                                        },
                                        children: [

                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        data: {
                            imgUrl: 'img/32x32/project_new_32x32.png',
                            label: 'item 1.2.2',
                            description: '',
                            childExpanded: true,
                            handler: ''
                        },
                        children: [

                        ]
                    }
                ]
            },
            {
                data: {
                    imgUrl: 'img/32x32/project_new_32x32.png',
                    label: 'item 1.2',
                    description: '',
                    childExpanded: true,
                    handler: ''
                },
                children: []
            }
        ]
    },
    {
        data: {
            imgUrl: 'img/32x32/project_new_32x32.png',
            label: 'item 2',
            description: 'description 2',
            childExpanded: true,
            handler: ''
        }
    }
];
},{"./wi-treeview":2}],2:[function(require,module,exports){
const componentName = 'wiTreeview';
const moduleName = 'wi-treeview';

function Controller() {
    var self = this;

    this.onCaretClick = function () {
        self.data.childExpanded = !self.data.childExpanded;
    }
}
var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="wi-treeview-container" ng-repeat="item in wiTreeview.config"><div class="wi-parent-node" ng-click="item.data.childExpanded = !item.data.childExpanded"><i aria-hidden="true" class="fa icon-expanded" ng-class="{\'fa-caret-down\': item.data.childExpanded, \'fa-caret-right\': !item.data.childExpanded, \'wi-hidden\': item.children == null || item.children.length == 0}"></i> <img ng-src="{{item.data.imgUrl}}" alt="img item treeview"> <span>{{item.data.label}}</span></div><div ng-show="item.data.childExpanded"><wi-treeview config="item.children"></wi-treeview></div></div>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        config: '<'
    }
});

exports.name = moduleName;

},{}]},{},[1]);
