const componentName = 'wiList';
const moduleName = 'wi-list';

function Controller(wiComponentService) {
    var self = this;

    this.$onInit = function() {
        if (self.name) wiComponentService.putComponent(self.name, self);
    }
}

var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<h4>{{wiList.heading}}</h4><table><tr ng-repeat="item in wiList.items"><td>{{item.key}}</td><td>{{item.value}}</td></tr></table>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name : '@',
        heading: '@',
        items: '<',
        handler: '<'
    }
});

exports.name = moduleName;
