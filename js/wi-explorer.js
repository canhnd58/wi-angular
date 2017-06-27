const componentName = 'wiExplorer';
const moduleName = 'wi-explorer';

function Controller(wiComponentService) {
    let self = this;

    this.$onInit = function () {
        if (self.name) wiComponentService.putComponent(self.name, self);
    };
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<wi-toolbar name="Toolbar" label icon><wi-button name="Button1Button" label icon="help-16x16" handler="handlers.Button1ButtonClicked"></wi-button><wi-button name="Button2Button" label icon="info-frp-16x16" handler="handlers.Button2ButtonClicked"></wi-button><wi-button name="Button3Button" label icon="project-new-16x16" handler="handlers.Button3ButtonClicked"></wi-button></wi-toolbar><div class="filter-block"><span>Filter:</span> <input type="text" placeholder="well or .../dataset or .../curve or ..."></div><div class="treeview-header"><span>Name</span> <span class="header-description">Unit</span></div><wi-treeview config="wiExplorer.treeConfig"></wi-treeview>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name: '@',
        treeConfig: '<'
    }
});

exports.name = moduleName;
