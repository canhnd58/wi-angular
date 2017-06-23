(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const wiTreeview = require('./wi-treeview');

const wiComponentService = require('./wi-component-service');

let app = angular.module('helloapp', [wiTreeview.name, wiComponentService.name]);

app.controller('WiDummy', function ($scope, wiComponentService) {
    $scope.myConfig = TREE_CONFIG_TEST;

    $scope.addItem = function (parentName) {
        let item = {
            name: 'item' + Date.now(),
            data: {
                icon: 'project-new-16x16',
                label: 'item ' + Date.now(),
                description: 'hic',
                childExpanded: false,
                handler: function () {
                    console.log('handler');
                }
            },
            children: []
        };

        wiComponentService.getComponent('MyTreeview').addItem(parentName, item);
    }
});

TREE_CONFIG_TEST = [
    {
        name: 'item11000',
        data: {
            icon: 'project-new-16x16',
            label: 'item 11000',
            description: 'mm',
            childExpanded: false,
            handler: function () {
                console.log('handler');
            }
        },
        children: [
            {
                name: 'item11',
                data: {
                    icon: 'project-new-16x16',
                    label: 'item 1.1',
                    description: 'hu hu hu',
                    childExpanded: false,
                    handler: function () {
                        console.log('handler');
                    }
                },
                children: [
                    {
                        name: 'item121',
                        data: {
                            icon: 'project-new-16x16',
                            label: 'item 1.2.1',
                            description: 'hic',
                            childExpanded: false,
                            handler: function () {
                                console.log('handler');
                            }
                        },
                        children: []
                    },
                    {
                        name: 'item122',
                        data: {
                            name: 'item122',
                            icon: 'project-new-16x16',
                            label: 'item 1.2.2',
                            description: '',
                            childExpanded: false,
                            handler: function () {
                                console.log('handler');
                            }
                        },
                        children: []
                    }
                ]
            },
            {
                name: 'item12',
                data: {
                    icon: 'project-new-16x16',
                    label: 'item 1.2',
                    description: '',
                    childExpanded: false,
                    handler: function () {
                        console.log('handler');
                    }
                },
                children: []
            }
        ]
    },
    {
        name: 'item2',
        data: {
            icon: 'project-new-16x16',
            label: 'item 2',
            description: 'description 2',
            childExpanded: false,
            handler: function () {
                console.log('handler');
            }
        }
    }
];

},{"./wi-component-service":2,"./wi-treeview":3}],2:[function(require,module,exports){
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
const componentName = 'wiTreeview';
const moduleName = 'wi-treeview';

function Controller(wiComponentService) {
    let self = this;

    this.$onInit = function () {
        self.items = self.config;
        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.onDoubleClick = function ($index) {
        if (self.config[$index].data.handler) self.config[$index].data.handler();
    };

    this.addItem = function (parentName, item) {
        let parentItem = getItemByName(parentName);

        console.log('items', self.items);
        console.log('parentName', parentName)
        console.log('item', item)
        if (parentItem) {
            parentItem.children.push(item);

            console.log('addItem, push to ', parentItem);
        }
    };

    function getItemByName(name) {
        let itemSelect = null;

        for (let item of self.items) {
            if (item.name === name) {
                return item;
            }

            itemSelect = findChildItemByName(item, name);
            if (itemSelect) {
                return itemSelect;
            }
        }

        return itemSelect;
    }

    function findChildItemByName(item, name) {
        if (!item || !item.children) return;

        let childSelect = null;
        for (let child of item.children) {
            if (child.name === name) {
                return child;
            } else if (child.children.length !== 0) {
                childSelect = findChildItemByName(child, name);
                if (childSelect) {
                    return childSelect;
                }
            }
        }

        return childSelect;
    }
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="wi-treeview-container" ng-repeat="item in wiTreeview.items track by $index"><div class="wi-parent-node" ng-click="item.data.childExpanded = !item.data.childExpanded" ng-dblclick="wiTreeview.onDoubleClick($index)"><div><i aria-hidden="true" class="fa icon-expanded" ng-class="{\'fa-caret-down\': item.data.childExpanded, \'fa-caret-right\': !item.data.childExpanded, \'wi-hidden\': item.children == null || item.children.length == 0}"></i> <img class="{{item.data.icon}}" alt="img item treeview"> <span>{{item.data.label}}</span></div><div class="wi-parent-description text-right" ng-show="item.data.description">{{item.data.description}}</div></div><div ng-show="item.data.childExpanded"><wi-treeview config="item.children"></wi-treeview></div></div>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name: '@',
        config: '<'
    }
});

exports.name = moduleName;

},{}]},{},[1]);
