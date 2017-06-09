(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiButton = require('./wi-button.js');
wiToolbar = require('./wi-toolbar.js');
wiTabs = require('./wi-tabs.js');
wiTreeview = require('./wi-treeview');
wiStatusBar = require('./wi-status-bar');

var app = angular.module('wiapp', [wiButton.name, wiToolbar.name, wiTabs.name, wiTreeview.name, wiStatusBar.name]);

app.controller('AppController', function ($scope) {
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
},{"./wi-button.js":2,"./wi-status-bar":3,"./wi-tabs.js":4,"./wi-toolbar.js":5,"./wi-treeview":6}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
const tabsetComponentName = 'wiTabset';
const tabComponentName = 'wiTab';
const moduleName = 'wi-tabs';

function TabsetController() {
    var self = this;

    this.tabs = [];

    this.selectTab = function (index) {
        deactiveAllTabs(self.tabs);

        self.tabs[index].active = true;
    };

    this.closeTab = function (index) {
        deactiveAllTabs(self.tabs);

        self.tabs.splice(index, 1);
        if (self.tabs.length !== 0){
            if (index < self.tabs.length){
                self.tabs[index].active = true;
            } else {
                self.tabs[self.tabs.length - 1].active = true;
            }
        }
    };

    this.addTab = function (tab) {
        self.tabs.push(tab);
        self.tabs[self.tabs.length - 1].active = (self.tabs.length === 1);
    };

    function deactiveAllTabs(tabs) {
        for(var i=0; i < tabs.length; i++){
            tabs[i].active = false;
        }
    }
}

var app = angular.module(moduleName, []);
app.component(tabsetComponentName, {
    template:'<div><ul class="nav nav-tabs"><li class="wi-tab" ng-repeat="tab in wiTabset.tabs track by $index" ng-class="{\'active\': tab.active}" ng-click="wiTabset.selectTab($index)"><a>{{tab.heading}}</a> <i class="ti-close" ng-show="tab.closable == \'true\'" ng-click="wiTabset.closeTab($index)"></i></li></ul><div ng-transclude></div></div>',
    controller: TabsetController,
    controllerAs: tabsetComponentName,
    transclude: true
});


function TabController() {
    var self = this;

    this.$onInit = function () {
        self.wiTabsetCtrl.addTab(self);
    };
}

app.component(tabComponentName, {
    template:'<div ng-transclude ng-show="wiTab.active"></div>',
    controller: TabController,
    controllerAs: tabComponentName,
    transclude: true,
    require: {
        'wiTabsetCtrl': '^wiTabset'
    },
    bindings: {
        heading: '@',
        closable: '@'
    }
});


exports.name = moduleName;

},{}],5:[function(require,module,exports){
const name = 'wiToolbar';
const moduleName = 'wi-toolbar';

function Controller() {
    var self = this;
}

var app = angular.module(moduleName, []);

app.component(name, {
    template:'<div class="toolbar-wrapper"><div ng-transclude></div><p class="wi-toolbar-label">{{wiToolbar.label}}</p></div>',
    transclude: true,
    controller: Controller,
    controllerAs: name,
    bindings: {
        label: '@'
    }
});

exports.name = moduleName;

},{}],6:[function(require,module,exports){
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
