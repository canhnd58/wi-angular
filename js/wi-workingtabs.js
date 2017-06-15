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
