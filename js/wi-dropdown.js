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
