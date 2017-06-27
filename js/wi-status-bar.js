const componentName = 'wiStatusBar';
const moduleName = 'wi-status-bar';

function Controller() {
    let self = this;
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<span>status bar<span></span></span>',
    controller: Controller,
    controllerAs: componentName
});

exports.name = moduleName;
