(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let wiButton = require('./wi-button');
let wiSlidingbar = require('./wi-slidingbar.js');
let wiWorkingtabs = require('./wi-workingtabs');
let wiLogplot = require('./wi-logplot.js');

let wiComponentService = require('./wi-component-service');

let WORKING_TABS = [
    {
        type: 'dogs',
        name: 'dogsTab',
        heading: 'Item 1.2.1 (dogs)',
        closable: 'true',
        active: false
    },
    {
        type: 'cars',
        name: 'carTab',
        heading: 'Item 1.2.2 (cars)',
        closable: 'true',
        active: false
    },
    {
        type: 'logplot',
        name: 'MyLogplot1',
        heading: 'blank logplot',
        closable: 'true',
        active: false
    },
    {
        type: 'logplot',
        name: 'MyLogplot2',
        heading: 'blank logplot',
        closable: 'true',
        active: false
    }
];

let app = angular.module('helloapp', [wiButton.name, wiSlidingbar.name, wiWorkingtabs.name, wiLogplot.name, wiComponentService.name]);
app.controller('WiDummy', function ($scope, wiComponentService) {
    $scope.workingTabs = WORKING_TABS;
});


},{"./wi-button":2,"./wi-component-service":3,"./wi-logplot.js":4,"./wi-slidingbar.js":5,"./wi-workingtabs":6}],2:[function(require,module,exports){
const wiButtonName = 'wiButton';
const moduleName = 'wi-button';

function ButtonController(wiComponentService) {
    let self = this;

    this.default = {
        type: 'normal',
        label: '',
        layout: 'icon-top',
        icon: 'project-new-32x32'
    };

    this.onClick = function () {
        if (self.handler) self.handler();
    };

    this.$onInit = function() {
        if (self.name) wiComponentService.putComponent(self.name, self);
    }
}

let app = angular.module(moduleName, []);
app.component(wiButtonName, {
    template:'<div><button ng-click="wiButton.onClick()" class="button-{{wiButton.type || wiButton.config.type || wiButton.default.type}}"><img class="{{wiButton.icon || wiButton.config.icon || wiButton.default.icon}}" alt="icon wi-button"><p class="{{wiButton.layout || wiButton.config.layout || wiButton.default.layout}}" ng-show="wiButton.label != null || wiButton.config.label != null">{{wiButton.label || wiButton.config.label || wiButton.default.label}}</p></button></div>',
    controller: ButtonController,
    controllerAs: wiButtonName,
    bindings: {
        config: '<',
        type: '@',
        name: '@',
        label: '@',
        layout: '@',
        icon: '@',
        handler: '<'
    }
});

exports.name = moduleName;

},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
const componentName = 'wiLogplot';
const moduleName = 'wi-logplot';

//Utils for object checking and object cloning
function objcpy(destObj, sourceObj) {
    if (destObj) {
        for (let attr in sourceObj) {
            destObj[attr] = sourceObj[attr];
        }
    }
}

function isEqual(a, b) {
    if (!a || !b) return false;
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}

function Controller(wiComponentService) {
    let self = this;
    let previousSlidingBarState = {};

    this.$onInit = function () {
        self.slidingbarName = self.name + 'Slidingbar';
        self.wiD3AreaName = self.name + 'D3Area';

        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.$doCheck = function () {
        if (!self.slidingBar) return;
        if (!isEqual(previousSlidingBarState, self.slidingBar.slidingBarState)) {
            objcpy(previousSlidingBarState, self.slidingBar.slidingBarState);
            let wiD3Controller = wiComponentService.getComponent(self.wiD3AreaName);
            let max = wiD3Controller.getMaxDepth();
            let low = max * previousSlidingBarState.top / 100;
            let high = max * ( previousSlidingBarState.top + previousSlidingBarState.range ) / 100;
            wiD3Controller.setDepthRange([low, high]);
            wiD3Controller.plotAll();
        }
    };

    this.getSlidingbarCtrl = function () {
        return self.slidingBar = wiComponentService.getComponent(self.slidingbarName);
    };
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="logplot-toolbar-wrapper"><wi-toolbar name="Toolbar" label icon><wi-button name="Button1Button" label icon="help-32x32" handler="handlers.Button1ButtonClicked"></wi-button><wi-button name="Button2Button" label icon="info-frp-32x32" handler="handlers.Button2ButtonClicked"></wi-button><wi-button name="Button3Button" label icon handler="handlers.Button3ButtonClicked"></wi-button></wi-toolbar></div><div class="logplot-main-content"><div class="slidingbar"><wi-slidingbar name="{{wiLogplot.slidingbarName}}" ng-init="wiLogplot.getSlidingbarCtrl()"></wi-slidingbar></div><div class="track-area"><wi-d3 style="width: 100%; flex: 1; display: flex;" name="{{wiLogplot.wiD3AreaName}}"></wi-d3></div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        name: '@'
    }
});

exports.name = moduleName;

},{}],5:[function(require,module,exports){
const componentName = 'wiSlidingbar';
const moduleName = 'wi-slidingbar';

const MIN_RANGE = 5;

function Controller($scope, wiComponentService) {
    let self = this;

    this.tinyWindow = null;
    let parentHeight = 0;
    this.slidingBarState = {
        top: 0,
        range: MIN_RANGE
    };

    function update(ui) {
        parentHeight = parseInt($(self.contentId).height());

        if (ui.size) {
            self.tinyWindow.height = (ui.size.height > parentHeight) ? parentHeight : ui.size.height;
        }
        if (ui.position) {
            self.tinyWindow.top = (ui.position.top > 0) ? ui.position.top : 0;
        }
        self.slidingBarState.top = Math.round(self.tinyWindow.top / parentHeight * 100);
        self.slidingBarState.range = Math.round(self.tinyWindow.height / parentHeight * 100);

        // call apply to call all parent scope watcher
        $scope.$apply();
    }

    this.$onInit = function () {
        self.contentId = '#sliding-bar-content' + self.name;
        self.handleId = '#sliding-handle' + self.name;

        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.onReady = function () {
        parentHeight = parseInt($(self.contentId).height());
        let initialHeight = Math.round(parentHeight * (MIN_RANGE) / 100);

        self.tinyWindow = {
            top: (parentHeight - initialHeight * 4) * Math.random(),
            height: initialHeight * 4
        };


        // init tiny window height
        $(self.handleId).height(self.tinyWindow.height);
        console.log($(self.handleId));
        $(self.handleId).css('top', self.tinyWindow.top + 'px');

        self.slidingBarState.top = Math.round(self.tinyWindow.top / parentHeight * 100);
        self.slidingBarState.range = Math.round(self.tinyWindow.height / parentHeight * 100);

        $(self.handleId).draggable({
            axis: "y",
            containment: "parent"
        }).resizable({
            minHeight: initialHeight,
            containment: "parent",
            handles: "n, s"
        });

        $(self.handleId).on("resize", function (event, ui) {
            update(ui);
        });

        $(self.handleId).on("drag", function (event, ui) {
            update(ui);
        });
    };
    /*
     this.setSlidingHandleHeight = function () {
     console.log('set slidingHandleHeight');
     parentHeight = parseInt($(self.contentId).height());

     let initialHeight = Math.round(parentHeight * MIN_RANGE / 100);
     $(self.handleId).height(initialHeight);
     self.tinyWindow.height = initialHeight;
     }
     */
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div id="sliding-bar-content{{wiSlidingbar.name}}" class="sliding-bar-content" ng-transclude elem-ready="wiSlidingbar.onReady()"></div><div id="sliding-handle{{wiSlidingbar.name}}" class="ui-widget-content sliding-handle"><div class="sliding-handle-border"></div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        name: '@'
    }
});

app.directive('elemReady', function ($parse) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            elem.ready(function () {
                $scope.$apply(function () {
                    let func = $parse(attrs.elemReady);
                    func($scope);
                })
            })
        }
    }
});

exports.name = moduleName;
exports.componentName = componentName;

},{}],6:[function(require,module,exports){
const tabsetComponentName = 'wiWorkingtabset';
const tabComponentName = 'wiWorkingtab';
const moduleName = 'wi-workingtabs';

function TabsetController($timeout, wiComponentService) {
    let self = this;

    this.tabs = [];

    this.selectTab = function (index) {
        deactiveAllTabs(self.tabs);
        deactiveAllTabs(self.tabConfigs);

        self.tabs[index].active = true;
        self.tabConfigs[index].active = true;

        let tabSelectCtrl = wiComponentService.getComponent(self.tabs[index].name);
        if (tabSelectCtrl.type === 'logplot') {
            $timeout(wiComponentService.getComponent(tabSelectCtrl.name + 'Logplot').getSlidingbarCtrl().setSlidingHandleHeight);
        }
    };

    this.closeTab = function (index) {
        deactiveAllTabs(self.tabs);
        deactiveAllTabs(self.tabConfigs);

        self.tabs.splice(index, 1);
        self.tabConfigs.splice(index, 1);

        if (self.tabs.length !== 0) {
            if (index < self.tabs.length) {
                self.tabs[index].active = true;
                self.tabConfigs[index].active = true;
            } else {
                self.tabs[self.tabs.length - 1].active = true;
                self.tabConfigs[self.tabs.length - 1].active = true;
            }
        }
    };

    this.addTab = function (tab) {
        deactiveAllTabs(self.tabs);
        deactiveAllTabs(self.tabConfigs);

        tab.active = true;
        self.tabs.push(tab);

        self.tabConfigs[self.tabConfigs.length - 1].active = true;
    };

    function deactiveAllTabs(tabs) {
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].active = false;
        }
    }
}

let app = angular.module(moduleName, []);
app.component(tabsetComponentName, {
    template:'<ul class="nav nav-tabs"><li class="wi-tab" ng-repeat="tab in wiWorkingtabset.tabs track by $index" ng-class="{\'active\': tab.active}" ng-click="wiWorkingtabset.selectTab($index)"><a>{{tab.heading}}</a> <i class="ti-close" ng-show="tab.closable == \'true\'" ng-click="wiWorkingtabset.closeTab($index)"></i></li></ul><div class="wi-working-tabset-content" ng-transclude></div>',
    controller: TabsetController,
    controllerAs: tabsetComponentName,
    transclude: true,
    bindings: {
        tabConfigs: '<'
    }
});


function TabController(wiComponentService) {
    let self = this;

    this.$onInit = function () {
        self.wiTabsetCtrl.addTab(self);

        if (self.name) wiComponentService.putComponent(self.name, self);
    };
}

app.component(tabComponentName, {
    template:'<div class="wi-workingtab-content" ng-transclude ng-show="wiWorkingtab.active"></div>',
    controller: TabController,
    controllerAs: tabComponentName,
    transclude: true,
    require: {
        'wiTabsetCtrl': '^wiWorkingtabset'
    },
    bindings: {
        name: '@',
        type: '@',
        heading: '@',
        closable: '@'
    }
});


exports.name = moduleName;

},{}]},{},[1]);
