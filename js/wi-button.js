const wiButtonName = 'wiButton';
const moduleName = 'wi-button';

function ButtonController() {
    var self = this;
    this.default = {
        label: 'Button',
        layout: 'icon-top',
        icon: 'project-new-32x32'
    };
}
var app = angular.module(moduleName, []);
app.component(wiButtonName, {
    template:'<div><button ng-click="wiButton.handlers.onclick()" ng-mouseover="wiButton.handlers.onmouseover()"><img class="{{wiButton.icon || wiButton.config.icon || wiButton.default.icon}}" ng-class="{{wiButton.layout || wiButton.config.layout || wiButton.default.layout}}" alt="icon"><p class="{{wiButton.layout || wiButton.config.layout || wiButton.default.layout}}">{{wiButton.label || wiButton.config.label}}</p></button></div>',
    controller: ButtonController,
    controllerAs: wiButtonName,
    bindings: {
        config: '<',
        label: '@',
        layout: '@',
        icon: '@',
        handlers: '<'
    }
});

exports.name = moduleName;
