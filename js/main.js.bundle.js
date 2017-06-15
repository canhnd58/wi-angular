(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var WORKING_TABS = [
    // {
    //     type: 'dogs',
    //     heading: 'Dogs',
    //     closable: 'true'
    // },
    // {
    //     type: 'tuts',
    //     heading: 'Tuts',
    //     closable: 'true'
    // },
    // {
    //     type: 'cars',
    //     heading: 'Cars',
    //     closable: 'true'
    // }
];

const TREE_CONFIG_TEST = [
    {
        data: {
            icon: 'project-new-16x16',
            label: 'Item 1 (cars)',
            description: 'description 1',
            childExpanded: false,
            handler: function () {
                WORKING_TABS.push({
                    type: 'cars',
                    heading: 'Item 1 (cars)',
                    closable: 'true'
                });
            }
        },
        children: [
            {
                data: {
                    icon: 'project-new-16x16',
                    label: 'Item 1.1 (tuts)',
                    description: '',
                    childExpanded: false,
                    handler: function () {
                        WORKING_TABS.push({
                            type: 'tuts',
                            heading: 'Item 1.1 (tuts)',
                            closable: 'true'
                        });
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
                                    closable: 'true'
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
                                    closable: 'true'
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
                            closable: 'true'
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
                    closable: 'true'
                });
            }
        }
    }
];

exports.TREE_CONFIG_TEST = TREE_CONFIG_TEST;
exports.WORKING_TABS = WORKING_TABS;
},{}],2:[function(require,module,exports){
wiButton = require('./wi-button.js');
wiDropdown = require('./wi-dropdown.js');
wiToolbar = require('./wi-toolbar.js');
wiTabs = require('./wi-tabs.js');
wiWorkingtabs = require('./wi-workingtabs.js');
wiTreeview = require('./wi-treeview');
wiStatusBar = require('./wi-status-bar');
wiSlidingbar = require('./wi-slidingbar');
appConfig = require('./app.config');

var app = angular.module('wiapp',
    [
        wiButton.name,
        wiDropdown.name,
        wiToolbar.name,
        wiTabs.name,
        wiWorkingtabs.name,
        wiTreeview.name,
        wiStatusBar.name,
        wiSlidingbar.name
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
},{"./app.config":1,"./wi-button.js":3,"./wi-dropdown.js":4,"./wi-slidingbar":5,"./wi-status-bar":6,"./wi-tabs.js":7,"./wi-toolbar.js":8,"./wi-treeview":9,"./wi-workingtabs.js":10}],3:[function(require,module,exports){
const wiButtonName = 'wiButton';
const moduleName = 'wi-button';

function ButtonController() {
    var self = this;
    this.default = {
        label: 'Button',
        layout: 'icon-top',
        icon: 'project-new-32x32'
    };
}
var app = angular.module(moduleName, []);
app.component(wiButtonName, {
    template:'<div><button ng-click="wiButton.handlers.onclick()" ng-mouseover="wiButton.handlers.onmouseover()"><img class="{{wiButton.icon || wiButton.config.icon || wiButton.default.icon}}" ng-class="{{wiButton.layout || wiButton.config.layout || wiButton.default.layout}}" alt="icon"><p class="{{wiButton.layout || wiButton.config.layout || wiButton.default.layout}}">{{wiButton.label || wiButton.config.label}}</p></button></div>',
    controller: ButtonController,
    controllerAs: wiButtonName,
    bindings: {
        config: '<',
        label: '@',
        layout: '@',
        icon: '@',
        handlers: '<'
    }
});

exports.name = moduleName;

},{}],4:[function(require,module,exports){
const componentName = 'wiDropdown';
const moduleName = 'wi-dropdown';

function Controller() {
    var self = this;

}
var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown" ng-click="wiButton.handlers.onclick()" ng-mouseover="wiButton.handlers.onmouseover()"><img class="{{wiDropdown.layout || wiDropdown.config.layout}}" ng-src="{{wiDropdown.imgurl || wiDropdown.config.imgUrl}}" alt="folder"><div class="label-wrapper {{wiDropdown.layout || wiDropdown.config.layout}}"><span class="{{wiDropdown.layout || wiDropdown.config.layout}}">{{wiDropdown.label || wiDropdown.config.label}}</span> <span class="caret"></span></div></button><ul class="dropdown-menu"><div ng-transclude></div></ul></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        config: '<',
        label: '@',
        layout: '@',
        imgurl: '@',
        handlers: '<'
    }
});

exports.name = moduleName;

},{}],5:[function(require,module,exports){
const componentName = 'wiSlidingbar';
const moduleName = 'wi-slidingbar';

function Controller() {
    var self = this;
    this.$onInit = function () {
        $("#tiny-screen").draggable({
            axis: "y",
            containment: "parent"
        });

        $("#tiny-screen").resizable({
            containment: "parent",
            minHeight: 150,
            minWidth: 300,
            maxWidth: 300,
            handles: "n, s"
        });

        $( "#tiny-screen" ).on( "resize", function( event, ui ) {
            console.log(ui);
        } );
    }
}
var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="sliding-container" id="sliding-container"><div class="sliding-content" ng-transclude></div><div id="tiny-screen" class="ui-widget-content"></div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {}
});

exports.name = moduleName;

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
const componentName = 'wiTreeview';
const moduleName = 'wi-treeview';

function Controller() {
    var self = this;

    this.onSelectItem = function ($index) {
        self.config[$index].data.handler();
    };
}

var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="wi-treeview-container" ng-repeat="item in wiTreeview.config track by $index"><div class="wi-parent-node" ng-click="item.data.childExpanded = !item.data.childExpanded" ng-dblclick="wiTreeview.onSelectItem($index)"><i aria-hidden="true" class="fa icon-expanded" ng-class="{\'fa-caret-down\': item.data.childExpanded, \'fa-caret-right\': !item.data.childExpanded, \'wi-hidden\': item.children == null || item.children.length == 0}"></i> <img class="{{item.data.icon}}" alt="img item treeview"> <span>{{item.data.label}}</span></div><div ng-show="item.data.childExpanded"><wi-treeview config="item.children"></wi-treeview></div></div>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        config: '<'
    }
});

exports.name = moduleName;

},{}],10:[function(require,module,exports){
const tabsetComponentName = 'wiWorkingtabset';
const tabComponentName = 'wiWorkingtab';
const moduleName = 'wi-workingtabs';

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
        self.tabConfigs.splice(index, 1);

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
    template:'<div><ul class="nav nav-tabs"><li class="wi-tab" ng-repeat="tab in wiWorkingtabset.tabs track by $index" ng-class="{\'active\': tab.active}" ng-click="wiWorkingtabset.selectTab($index)"><a>{{tab.heading}}</a> <i class="ti-close" ng-show="tab.closable == \'true\'" ng-click="wiWorkingtabset.closeTab($index)"></i></li></ul><div ng-transclude></div></div>',
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
    template:'<div ng-transclude ng-show="wiWorkingtab.active"></div>',
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
