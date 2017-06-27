(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const wiTreeview = require('./wi-treeview');

const wiComponentService = require('./wi-component-service');

let app = angular.module('helloapp', [wiTreeview.name, wiComponentService.name]);

app.controller('WiDummy', function ($scope, wiComponentService) {
    $scope.myConfig = TREE_CONFIG_TEST;

    $scope.addItem = function (parentName) {
        let item = {
            name: 'item' + Date.now(),
            type: 'newitem',
            data: {
                icon: 'project-new-16x16',
                label: 'item ' + Date.now(),
                description: 'hic',
                childExpanded: false
            },
            children: []
        };

        wiComponentService.getComponent('MyTreeview').addItem(parentName, item);
    };

    wiComponentService.treeFunctions = TREE_FUNCTIONS;
});

TREE_FUNCTIONS = {
    'item11000' : function () {
        console.log('item11000');
    },
    'item11' : function () {
        console.log('item11');
    },
    'item121' : function () {
        console.log('item121');
    },
    'item12' : function () {
        console.log('item12');
    },
    'item2' : function () {
        console.log('item2');
    },
    'newitem' : function () {
        console.log('newitem');
    }
};

TREE_CONFIG_TEST = [
    {
        name: 'item11000',
        type: 'item11000',
        data: {
            icon: 'project-new-16x16',
            label: 'item 11000',
            description: 'mm',
            childExpanded: false
        },
        children: [
            {
                name: 'item11',
                type: 'item11',
                data: {
                    icon: 'project-new-16x16',
                    label: 'item 1.1',
                    description: 'hu hu hu',
                    childExpanded: false
                },
                children: [
                    {
                        name: 'item1211',
                        type: 'item121',
                        data: {
                            icon: 'project-new-16x16',
                            label: 'item 1.2.1.1',
                            description: 'hic',
                            childExpanded: false
                        },
                        children: []
                    },
                    {
                        name: 'item1212',
                        type: 'item121',
                        data: {
                            name: 'item122',
                            icon: 'project-new-16x16',
                            label: 'item 1.2.1.2',
                            description: '',
                            childExpanded: false
                        },
                        children: []
                    }
                ]
            },
            {
                name: 'item12',
                type: 'item12',
                data: {
                    icon: 'project-new-16x16',
                    label: 'item 1.2',
                    description: '',
                    childExpanded: false
                },
                children: []
            }
        ]
    },
    {
        name: 'item2',
        type: 'item2',
        data: {
            icon: 'project-new-16x16',
            label: 'item 2',
            description: 'description 2',
            childExpanded: false
        }
    }
];

},{"./wi-component-service":2,"./wi-treeview":3}],2:[function(require,module,exports){
const wiServiceName = 'wiComponentService';
const moduleName = 'wi-component-service';

let app = angular.module(moduleName, []);
app.factory(wiServiceName, function () {
    let __Controllers = {};
    let handlers = {};

    return {
        treeFunctions: {},

        getComponent: function (componentName) {
            return __Controllers[componentName];
        },
        putComponent: function (componentName, controller) {
            __Controllers[componentName] = controller;
        },

        on: function (eventName, handlerCb) {
            let eventHandlers = handlers[eventName];
            if (!Array.isArray(eventHandlers)) {
                handlers[eventName] = [];
            }

            handlers[eventName].push(handlerCb);
        },
        emit: function (eventName, data) {
            let eventHandlers = handlers[eventName];
            if (Array.isArray(eventHandlers)) {
                eventHandlers.forEach(function (handler) {
                    handler(data);
                })
            }
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

    this.onClick = function ($index) {
        self.config[$index].data.childExpanded = !self.config[$index].data.childExpanded;

        if (!self.config[$index].children || self.config[$index].children.length === 0)
            wiComponentService.itemActiveName = self.config[$index].name;
    };

    this.onDoubleClick = function ($index) {
        if (self.config[$index].data.handler) {
            self.config[$index].data.handler();
        } else if (wiComponentService.treeFunctions) {
            // get func from component service
            wiComponentService.treeFunctions[self.config[$index].type]();
        }
    };

    this.getItemActiveName = function () {
        return wiComponentService.itemActiveName;
    };

    this.addItem = function (parentName, item) {
        let parentItem = getItemByName(parentName);

        if (parentItem) parentItem.children.push(item);
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
    template:'<div class="wi-treeview-container" ng-repeat="item in wiTreeview.items track by $index"><div class="wi-parent-node" ng-class=\'{"item-active": item.name == wiTreeview.getItemActiveName()}\' ng-click="wiTreeview.onClick($index)" ng-dblclick="wiTreeview.onDoubleClick($index)"><div><i aria-hidden="true" class="fa icon-expanded" ng-class="{\'fa-caret-down\': item.data.childExpanded, \'fa-caret-right\': !item.data.childExpanded, \'wi-hidden\': item.children == null || item.children.length == 0}"></i> <img class="{{item.data.icon}}" alt="img item treeview"> <span>{{item.data.label}}</span></div><div class="wi-parent-description text-right" ng-show="item.data.description">{{item.data.description}}</div></div><div ng-show="item.data.childExpanded"><wi-treeview config="item.children"></wi-treeview></div></div>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name: '@',
        config: '<'
    }
});

exports.name = moduleName;

},{}]},{},[1]);
