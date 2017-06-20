const wiButtonName = 'wiButton';
const moduleName = 'wi-button';

function ButtonController() {
    var self = this;

    this.default = {
        label: '',
        layout: 'icon-top',
        icon: 'project-new-32x32'
    };

    this.onClick = function () {
        if (self.handler) self.handler();
    };
}
var app = angular.module(moduleName, []);
app.component(wiButtonName, {
    template:'<div><button ng-click="wiButton.onClick()"><img class="{{wiButton.icon || wiButton.config.icon || wiButton.default.icon}}" alt="icon wi-button"><p class="{{wiButton.layout || wiButton.config.layout || wiButton.default.layout}}" ng-show="wiButton.label != null || wiButton.config.label != null">{{wiButton.label || wiButton.config.label || wiButton.default.label}}</p></button></div>',
    controller: ButtonController,
    controllerAs: wiButtonName,
    bindings: {
        config: '<',
        name: '@',
        label: '@',
        layout: '@',
        icon: '@',
        handler: '<'
    }
});

exports.name = moduleName;
