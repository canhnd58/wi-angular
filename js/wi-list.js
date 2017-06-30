const componentName = 'wiList';
const moduleName = 'wi-list';

function Controller(wiComponentService) {
    let self = this;
    this.shown = true;

    this.$onInit = function() {
        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.addItem = function (key, value) {
        self.items.push({key, value});
    }
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<p ng-click="wiList.shown = !wiList.shown" class="list-heading position-relative cursor-pointer"><span class="text-left">{{wiList.heading}}</span> <span ng-show="!wiList.shown" class="block-right"><i class="ti-plus"></i></span> <span ng-show="wiList.shown" class="block-right"><i class="ti-minus"></i></span></p><table ng-show="wiList.shown"><tr ng-repeat="item in wiList.items"><td>{{item.key}}</td><td>{{item.value}}</td></tr></table>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name : '@',
        heading: '@',
        items: '<'
    }
});

exports.name = moduleName;
