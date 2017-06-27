const componentName = 'wiList';
const moduleName = 'wi-list';

function Controller(wiComponentService) {
    let self = this;
    this.expanded = true;

    this.$onInit = function() {
        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.addItem = function (key, value) {
        self.items.push({key, value});
    }
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="list-header-wrapper"><p class="list-heading">{{wiList.heading}}</p><i class="fa list-expanded" aria-hidden="true" ng-class="{\'fa-caret-down\' : wiList.expanded, \'fa-caret-right\' : !wiList.expanded}" ng-click="wiList.expanded = !wiList.expanded"></i></div><table ng-show="wiList.expanded"><tr ng-repeat="item in wiList.items"><td>{{item.key}}</td><td>{{item.value}}</td></tr></table>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name : '@',
        heading: '@',
        items: '<'
    }
});

exports.name = moduleName;
