const componentName = 'wiProperties';
const moduleName = 'wi-properties';

function Controller(wiComponentService) {
    let self = this;

    this.$onInit = function () {
        if (self.name) wiComponentService.putComponent(self.name, self);
    };
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<wi-list name="{{item.name}}" heading="{{item.heading}}" items="item.data" ng-repeat="item in wiProperties.listConfig"></wi-list>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name: '@',
        listConfig: '<'
    }
});

exports.name = moduleName;
