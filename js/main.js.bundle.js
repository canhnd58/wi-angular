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
                    description: '',
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
                            description: '',
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
                            description: '',
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
                            description: '',
                            childExpanded: false,
                            handler: function () {
                                WORKING_TABS.push({
                                    type: 'logplot',
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
                    description: '',
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
            description: 'description 2',
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
        wiLogplot.name
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
},{"./app.config":1,"./wi-button.js":3,"./wi-dropdown.js":4,"./wi-logplot.js":5,"./wi-slidingbar":6,"./wi-status-bar":7,"./wi-tabs.js":8,"./wi-toolbar.js":9,"./wi-treeview":10,"./wi-workingtabs.js":11}],3:[function(require,module,exports){
const wiButtonName = 'wiButton';
const moduleName = 'wi-button';

function ButtonController() {
    var self = this;

    this.default = {
        label: '',
        layout: 'icon-top',
        icon: 'project-new-32x32'
    };

    this.onClick = function () {
        if (self.handler) self.handler();
    };
}
var app = angular.module(moduleName, []);
app.component(wiButtonName, {
    template:'<div><button ng-click="wiButton.onClick()"><img class="{{wiButton.icon || wiButton.config.icon || wiButton.default.icon}}" alt="icon wi-button"><p class="{{wiButton.layout || wiButton.config.layout || wiButton.default.layout}}" ng-show="wiButton.label != null || wiButton.config.label != null">{{wiButton.label || wiButton.config.label || wiButton.default.label}}</p></button></div>',
    controller: ButtonController,
    controllerAs: wiButtonName,
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

},{}],4:[function(require,module,exports){
const componentName = 'wiDropdown';
const moduleName = 'wi-dropdown';

function Controller() {
    var self = this;

    this.default = {
        label: 'Dropdown',
        layout: 'icon-top',
        icon: 'project-new-32x32'
    };

    this.onClick = function () {
        if (self.handler) self.handler();
    };
}
var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown" ng-click="wiDropdown.onClick()"><img class="{{wiDropdown.icon || wiDropdown.config.icon || wiDropdown.default.icon}}" alt="icon wi-dropdown"><div class="label-wrapper {{wiDropdown.layout || wiDropdown.config.layout || wiDropdown.default.layout}}"><span class="{{wiDropdown.layout || wiDropdown.config.layout || wiDropdown.default.layout}}">{{wiDropdown.label || wiDropdown.config.label || wiDropdown.default.label}}</span> <span class="caret"></span></div></button><ul class="dropdown-menu"><div ng-transclude></div></ul></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        config: '<',
        label: '@',
        layout: '@',
        icon: '@',
        handler: '<'
    }
});

exports.name = moduleName;

},{}],5:[function(require,module,exports){
const componentName = 'wiLogplot';
const moduleName = 'wi-logplot';

wiButton = require('./wi-button.js');
wiToolbar = require('./wi-toolbar.js');
wiSlidingbar = require('./wi-slidingbar.js');

function Controller(wiSlidingbar) {
    var self = this;
    this.wiSlidingbar = wiSlidingbar;
}

var app = angular.module(moduleName, [wiButton.name, wiToolbar.name, wiSlidingbar.name]);
app.component(componentName, {
    template:'<div class="logplot-toolbar-wrapper"><wi-toolbal><wi-button layout="icon-left"></wi-button><wi-button layout="icon-left"></wi-button></wi-toolbal><wi-toolbar><wi-button layout="icon-left"></wi-button><wi-button layout="icon-left"></wi-button></wi-toolbar></div><div class="logplot-main-content"><wi-slidingbar><p>Some thing like curve</p></wi-slidingbar><div class="logplot-sub-content">Some tracks: {{wiLogplot.wiSlidingbar.top}} -- {{wiLogplot.wiSlidingbar.range}}</div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true
});

exports.name = moduleName;

},{"./wi-button.js":3,"./wi-slidingbar.js":6,"./wi-toolbar.js":9}],6:[function(require,module,exports){
const componentName = 'wiSlidingbar';
const moduleName = 'wi-slidingbar';

const MIN_RANGE = 30;

var slidingBarState = {
    top: 0,
    range: MIN_RANGE
};

function Controller($scope, $timeout, wiSlidingbar) {
    var self = this;
    self.tinyWindow = null;
    var parentHeight = 0;

    function update(ui) {
        parentHeight = parseInt($("#sliding-bar-content").height());

        if (ui.size) {
            self.tinyWindow.height = (ui.size.height > parentHeight) ? parentHeight : ui.size.height;
        }
        if (ui.position) {
            self.tinyWindow.top = (ui.position.top > 0) ? ui.position.top : 0;
        }
        wiSlidingbar.top = Math.round(self.tinyWindow.top / parentHeight * 100);
        wiSlidingbar.range = Math.round(self.tinyWindow.height / parentHeight * 100);

        // call apply to call all parent scope watcher
        $scope.$apply();
    }

    this.$postLink = function () {
        parentHeight = parseInt($("#sliding-bar-content").height());
        var initialHeight = Math.round(parentHeight * MIN_RANGE / 100);

        self.tinyWindow = {
            height: initialHeight,
            top: 0
        };

        $("#sliding-handle").draggable({
            axis: "y",
            containment: "parent"
        }).resizable({
            minHeight: initialHeight,
            containment: "parent",
            handles: "n, s"
        });

        //setSlidingHandleHeight();
        $timeout(function () {
            setSlidingHandleHeight();
        }, 0);

        $("#sliding-handle").on("resize", function (event, ui) {
            update(ui);
        });

        $("#sliding-handle").on("drag", function (event, ui) {
            update(ui);
        });
    };

    function setSlidingHandleHeight() {
        parentHeight = parseInt($("#sliding-bar-content").height());

        var initialHeight = Math.round(parentHeight * MIN_RANGE / 100);
        $('#sliding-handle').height(initialHeight);
        self.tinyWindow.height = initialHeight;
    }
}
var app = angular.module(moduleName, []);

app.factory(componentName, function () {
    return slidingBarState;
});

app.component(componentName, {
    template:'<div id="sliding-bar-content" ng-transclude></div><div id="sliding-handle" class="ui-widget-content"><div class="sliding-handler-border"></div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {}
});

exports.name = moduleName;
exports.componentName = componentName;

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
const name = 'wiToolbar';
const moduleName = 'wi-toolbar';

function Controller() {
    var self = this;
}

var app = angular.module(moduleName, []);

app.component(name, {
    template:'<div class="toolbar-wrapper"><div ng-transclude></div><p class="wi-toolbar-label" ng-show="wiToolbar.label && wiToolbar.label.length > 0">{{wiToolbar.label}}</p></div>',
    transclude: true,
    controller: Controller,
    controllerAs: name,
    bindings: {
        label: '@'
    }
});

exports.name = moduleName;

},{}],10:[function(require,module,exports){
const componentName = 'wiTreeview';
const moduleName = 'wi-treeview';

function Controller() {
    var self = this;

    this.onDoubleClick = function ($index) {
        if (self.config[$index].data.handler) self.config[$index].data.handler();
    };
}

var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="wi-treeview-container" ng-repeat="item in wiTreeview.config track by $index"><div class="wi-parent-node" ng-click="item.data.childExpanded = !item.data.childExpanded" ng-dblclick="wiTreeview.onDoubleClick($index)"><i aria-hidden="true" class="fa icon-expanded" ng-class="{\'fa-caret-down\': item.data.childExpanded, \'fa-caret-right\': !item.data.childExpanded, \'wi-hidden\': item.children == null || item.children.length == 0}"></i> <img class="{{item.data.icon}}" alt="img item treeview"> <span>{{item.data.label}}</span></div><div ng-show="item.data.childExpanded"><wi-treeview config="item.children"></wi-treeview></div></div>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        config: '<'
    }
});

exports.name = moduleName;

},{}],11:[function(require,module,exports){
const tabsetComponentName = 'wiWorkingtabset';
const tabComponentName = 'wiWorkingtab';
const moduleName = 'wi-workingtabs';

function TabsetController() {
    var self = this;

    this.tabs = [];

    this.selectTab = function (index) {
        deactiveAllTabs(self.tabs);
        deactiveAllTabs(self.tabConfigs);

        self.tabs[index].active = true;
        self.tabConfigs[index].active = true;
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


function TabController() {
    var self = this;

    this.$onInit = function () {
        self.wiTabsetCtrl.addTab(self);
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
        heading: '@',
        closable: '@'
    }
});


exports.name = moduleName;

},{}]},{},[2]);
