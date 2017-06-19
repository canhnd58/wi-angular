const componentName = 'wiLogplot';
const moduleName = 'wi-logplot';

wiButton = require('./wi-button.js');
wiToolbar = require('./wi-toolbar.js');
wiSlidingbar = require('./wi-slidingbar.js');

function Controller(wiSlidingbar) {
    var self = this;
    this.wiSlidingbar = wiSlidingbar;
}

var app = angular.module(moduleName, [wiButton.name, wiToolbar.name, wiSlidingbar.name]);
app.component(componentName, {
    template:'<div class="logplot-toolbar-wrapper"><wi-toolbal><wi-button layout="icon-left"></wi-button><wi-button layout="icon-left"></wi-button></wi-toolbal><wi-toolbar><wi-button layout="icon-left"></wi-button><wi-button layout="icon-left"></wi-button></wi-toolbar></div><div class="logplot-main-content"><wi-slidingbar><p>Some thing like curve</p></wi-slidingbar><div class="logplot-sub-content">Some tracks: {{wiLogplot.wiSlidingbar.top}} -- {{wiLogplot.wiSlidingbar.range}}</div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true
});

exports.name = moduleName;
