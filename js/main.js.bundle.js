(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var WORKING_TABS = [];

const TREE_CONFIG_TEST = [
    {
        data: {
            icon: 'project-new-16x16',
            label: 'Item 1',
            description: 'description 1',
            childExpanded: false,
            handler: function () {
                console.log('do nothing');
            }
        },
        children: [
            {
                data: {
                    icon: 'project-new-16x16',
                    label: 'Item 1.1',
                    description: 'des 1',
                    childExpanded: false,
                    handler: function () {
                        console.log('do nothing');
                    }
                },
                children: [
                    {
                        data: {
                            icon: 'project-new-16x16',
                            label: 'Item 1.2.1 (dogs)',
                            description: 'des 1.2',
                            childExpanded: false,
                            handler: function () {
                                WORKING_TABS.push({
                                    type: 'dogs',
                                    heading: 'Item 1.2.1 (dogs)',
                                    closable: 'true',
                                    active: false
                                });
                            }
                        },
                        children: []
                    },
                    {
                        data: {
                            icon: 'project-new-16x16',
                            label: 'Item 1.2.2 (cars)',
                            description: 'cars',
                            childExpanded: false,
                            handler: function () {
                                WORKING_TABS.push({
                                    type: 'cars',
                                    heading: 'Item 1.2.2 (cars)',
                                    closable: 'true',
                                    active: false
                                });
                            }
                        },
                        children: []
                    },
                    {
                        data: {
                            icon: 'project-new-16x16',
                            label: 'Logplot',
                            description: 'logplot',
                            childExpanded: false,
                            handler: function () {
                                WORKING_TABS.push({
                                    type: 'logplot',
                                    name: 'MyLogplot' + Date.now(),
                                    heading: 'blank logplot',
                                    closable: 'true',
                                    active: false
                                });
                            }
                        },
                        children: []
                    }
                ]
            },
            {
                data: {
                    icon: 'project-new-16x16',
                    label: 'Item 1.2 (cars)',
                    description: 'cars',
                    childExpanded: false,
                    handler: function () {
                        WORKING_TABS.push({
                            type: 'cars',
                            heading: 'Item 1.2 (cars)',
                            closable: 'true',
                            active: false
                        });
                    }
                },
                children: []
            }
        ]
    },
    {
        data: {
            icon: 'project-new-16x16',
            label: 'Item 2 (cars)',
            description: 'car',
            childExpanded: false,
            handler: function () {
                WORKING_TABS.push({
                    type: 'cars',
                    heading: 'Item 2 (cars)',
                    closable: 'true',
                    active: false
                });
            }
        }
    }
];

exports.TREE_CONFIG_TEST = TREE_CONFIG_TEST;
exports.WORKING_TABS = WORKING_TABS;
},{}],2:[function(require,module,exports){
appConfig = require('./app.config');
wiButton = require('./wi-button.js');
wiDropdown = require('./wi-dropdown.js');
wiToolbar = require('./wi-toolbar.js');
wiTabs = require('./wi-tabs.js');
wiWorkingtabs = require('./wi-workingtabs.js');
wiTreeview = require('./wi-treeview');
wiStatusBar = require('./wi-status-bar');
wiSlidingbar = require('./wi-slidingbar');
wiLogplot = require('./wi-logplot.js');

wiList = require('./wi-list');

wiComponentService = require('./wi-component-service.js');

var app = angular.module('wiapp',
    [
        wiButton.name,
        wiDropdown.name,
        wiToolbar.name,
        wiTabs.name,
        wiWorkingtabs.name,
        wiTreeview.name,
        wiStatusBar.name,
        wiSlidingbar.name,
        wiLogplot.name,
        wiList.name,
        wiComponentService.name
    ]);

app.controller('AppController', function ($scope, $timeout) {
    $scope.myConfig = appConfig.TREE_CONFIG_TEST;

    $scope.config = {
        ProjectTab: {
            heading: 'Project'
        },
        WellTab: {
            heading: 'Well'
        }
    };

    $scope.listItems = [
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

    $scope.listItems2 = [
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

    $scope.workingTabs = appConfig.WORKING_TABS;

    /**
     * debug working tabs
     */
    // $timeout(function () {
    //     console.log($scope.workingTabs);
    //     printLog();
    // }, 5000);
    //
    // function printLog() {
    //     $timeout(function () {
    //         console.log($scope.workingTabs);
    //         printLog();
    //     }, 5000);
    // }
});

},{"./app.config":1,"./wi-button.js":3,"./wi-component-service.js":4,"./wi-dropdown.js":5,"./wi-list":6,"./wi-logplot.js":7,"./wi-slidingbar":8,"./wi-status-bar":9,"./wi-tabs.js":10,"./wi-toolbar.js":11,"./wi-treeview":12,"./wi-workingtabs.js":13}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
const componentName = 'wiDropdown';
const moduleName = 'wi-dropdown';

function Controller(wiComponentService) {
    var self = this;

    this.default = {
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

var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown" ng-click="wiDropdown.onClick()"><img class="{{wiDropdown.icon || wiDropdown.config.icon || wiDropdown.default.icon}}" alt="icon wi-dropdown"><div class="label-wrapper {{wiDropdown.layout || wiDropdown.config.layout || wiDropdown.default.layout}}"><span class="{{wiDropdown.layout || wiDropdown.config.layout || wiDropdown.default.layout}}" ng-show="wiDropdown.label || wiDropdown.config.label">{{wiDropdown.label || wiDropdown.config.label}}</span> <span class="caret"></span></div></button><ul class="dropdown-menu"><div ng-transclude></div></ul></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        config: '<',
        name: '@',
        label: '@',
        layout: '@',
        icon: '@',
        handler: '<'
    }
});

exports.name = moduleName;

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
const componentName = 'wiLogplot';
const moduleName = 'wi-logplot';

function Controller(wiComponentService) {
    var self = this;

    this.$onInit = function () {
        self.slidingbarName = self.name + 'Slidingbar';

        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.getSlidingbarCtrl = function () {
        return self.slidingBar = wiComponentService.getComponent(self.slidingbarName);
    }
}

var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="logplot-toolbar-wrapper"><wi-toolbal><wi-button layout="icon-left"></wi-button><wi-button layout="icon-left"></wi-button></wi-toolbal><wi-toolbar><wi-button layout="icon-left"></wi-button><wi-button layout="icon-left"></wi-button></wi-toolbar></div><div class="logplot-main-content"><wi-slidingbar name="{{wiLogplot.slidingbarName}}" ng-init="wiLogplot.getSlidingbarCtrl()"><p>Some thing like curve</p></wi-slidingbar><div class="logplot-sub-content">Some tracks: {{wiLogplot.slidingBar.slidingBarState.top}} -- {{wiLogplot.slidingBar.slidingBarState.range}}</div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        name: '@'
    }
});

exports.name = moduleName;
},{}],8:[function(require,module,exports){
const componentName = 'wiSlidingbar';
const moduleName = 'wi-slidingbar';

const MIN_RANGE = 30;

function Controller($scope, wiComponentService) {
    let self = this;
    self.tinyWindow = null;
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
        self.handlerId = '#sliding-handle' + self.name;

        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.onReady = function () {
        parentHeight = parseInt($(self.contentId).height());
        var initialHeight = Math.round(parentHeight * MIN_RANGE / 100);

        self.tinyWindow = {
            height: initialHeight,
            top: 0
        };

        // init tiny window height
        $(self.handlerId).height(initialHeight);
        self.tinyWindow.height = initialHeight;

        $(self.handlerId).draggable({
            axis: "y",
            containment: "parent"
        }).resizable({
            minHeight: initialHeight,
            containment: "parent",
            handles: "n, s"
        });

        $(self.handlerId).on("resize", function (event, ui) {
            update(ui);
        });

        $(self.handlerId).on("drag", function (event, ui) {
            update(ui);
        });
    };

    this.setSlidingHandleHeight = function () {
        parentHeight = parseInt($(self.contentId).height());

        var initialHeight = Math.round(parentHeight * MIN_RANGE / 100);
        $(self.handlerId).height(initialHeight);
        self.tinyWindow.height = initialHeight;
    }
}

var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div id="sliding-bar-content{{wiSlidingbar.name}}" class="sliding-bar-content" ng-transclude elem-ready="wiSlidingbar.onReady()"></div><div id="sliding-handle{{wiSlidingbar.name}}" class="ui-widget-content sliding-handle"><div class="sliding-handler-border"></div></div>',
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
                    var func = $parse(attrs.elemReady);
                    func($scope);
                })
            })
        }
    }
});

exports.name = moduleName;
exports.componentName = componentName;

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

        console.log(self.tabs);

        self.tabs.splice(index, 1);
        if (self.tabs.length !== 0) {
            if (index < self.tabs.length) {
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
        for (var i = 0; i < tabs.length; i++) {
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

},{}],11:[function(require,module,exports){
const name = 'wiToolbar';
const moduleName = 'wi-toolbar';

function Controller() {
    let self = this;

    this.default = {
        type: 'vertical',
        label: ''
    }


}

let app = angular.module(moduleName, []);

app.component(name, {
    template:'<div ng-transclude class="toolbar-{{wiToolbar.type || wiToolbar.default.type}}"></div><p class="wi-toolbar-label" ng-show="wiToolbar.label && wiToolbar.label.length > 0">{{wiToolbar.label}}</p>',
    transclude: true,
    controller: Controller,
    controllerAs: name,
    bindings: {
        name: '@',
        type: '@',
        label: '@'
    }
});

exports.name = moduleName;

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].active = false;
        }
    }
}

var app = angular.module(moduleName, []);
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
    var self = this;

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

},{}]},{},[2]);
