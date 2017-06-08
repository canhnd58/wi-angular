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
