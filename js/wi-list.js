const componentName = 'wiList';
const moduleName = 'wi-list';

function Controller() {
    var self = this;
}

var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<h4>{{wiList.heading}}</h4><table><tr ng-repeat="item in wiList.items"><td>{{item.key}}</td><td>{{item.value}}</td></tr></table>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        heading: '@',
        items: '<'
    }
});

exports.name = moduleName;
