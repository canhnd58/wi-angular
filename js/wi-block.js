const name = 'wiBlock';
const moduleName = 'wi-block';

function Controller() {
    var self = this;
}

var app = angular.module(moduleName, []);

app.component(name, {
    template:'<div><div ng-transclude></div></div>',
    transclude: true,
    controller: Controller,
    controllerAs: name
});

exports.name = moduleName;
