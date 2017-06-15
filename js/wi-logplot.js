const componentName = 'wiLogplot';
const moduleName = 'wi-logplot';

function Controller() {
    var self = this;

}

var app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<p>hello logplot</p>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true
});

exports.name = moduleName;
