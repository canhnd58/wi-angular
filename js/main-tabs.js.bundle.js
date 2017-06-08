(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiButton = require('./wi-button.js');
wiToolbar = require('./wi-toolbar.js');
wiTabs = require('./wi-tabs.js');

var app = angular.module('helloapp', [wiButton.name, wiToolbar.name, wiTabs.name]);
app.controller('TestTabset', function ($scope) {

});
},{"./wi-button.js":2,"./wi-tabs.js":3,"./wi-toolbar.js":4}],2:[function(require,module,exports){
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
const tabsetComponentName = 'wiTabset';
const tabComponentName = 'wiTab';
const moduleName = 'wi-tabs';

function TabsetController() {
    var self = this;

    this.tabs = [];

    this.selectTab = function (tab) {
        for(var i=0; i < self.tabs.length; i++){
            self.tabs[i].active = false;
        }

        self.tabs[tab.index].active = true;
    };

    this.addTab = function (tab) {
        self.tabs.push(tab);
        self.tabs[self.tabs.length - 1].active = (self.tabs.length === 1);
    }
}

var app = angular.module(moduleName, []);
app.component(tabsetComponentName, {
    template:'<div><ul class="nav nav-tabs"><li class="wi-tab border-1px padding-5-10" ng-repeat="tab in wiTabset.tabs track by $index" ng-class="{\'active\': tab.active}"><a class="display-inline-block padding-0 border-none" ng-click="wiTabset.selectTab(tab)">{{tab.heading}}</a> <i class="ti-close fontsize-smaller" ng-show="tab.closable"></i></li></ul><div ng-transclude></div></div>',
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
        index: '@',
        heading: '@',
        closable: '@'
    }
});


exports.name = moduleName;

},{}],4:[function(require,module,exports){
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

},{}]},{},[1]);
