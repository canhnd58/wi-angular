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
