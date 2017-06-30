const componentName = 'wiExplorer';
const moduleName = 'wi-explorer';

function Controller($scope, wiComponentService) {
    let self = this;

    this.$onInit = function () {
        $scope.handlers = wiComponentService.getComponent('GLOBAL_HANDLERS');

        if (self.name) wiComponentService.putComponent(self.name, self);
    };
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<wi-toolbar name="DatabasesToolbar" icon label layout description type><wi-button name="NewProjectButton" icon="project-new-32x32" label layout description type="small" handler="handlers.NewProjectButtonClicked"></wi-button><wi-button name="OpenProjectButton" icon="project-open-32x32" label layout description type="small" handler="handlers.OpenProjectButtonClicked"></wi-button><wi-button name="CloseProjectButton" icon="project-close-32x32" label layout description type="small" handler="handlers.CloseProjectButtonClicked"></wi-button></wi-toolbar><div class="filter-block"><span>Filter:</span> <input type="text" placeholder="well or .../dataset or .../curve or ..."></div><div class="label_treeview"><span>Name</span><span>Unit</span></div><wi-treeview config="wiExplorer.treeConfig"></wi-treeview>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name: '@',
        treeConfig: '<'
    }
});

exports.name = moduleName;
