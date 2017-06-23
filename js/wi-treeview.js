const componentName = 'wiTreeview';
const moduleName = 'wi-treeview';

function Controller(wiComponentService) {
    let self = this;

    this.$onInit = function () {
        self.items = self.config;
        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.onDoubleClick = function ($index) {
        if (self.config[$index].data.handler) self.config[$index].data.handler();
    };

    this.addItem = function (parentName, item) {
        let parentItem = getItemByName(parentName);

        console.log('items', self.items);
        console.log('parentName', parentName)
        console.log('item', item)
        if (parentItem) {
            parentItem.children.push(item);

            console.log('addItem, push to ', parentItem);
        }
    };

    function getItemByName(name) {
        let itemSelect = null;

        for (let item of self.items) {
            if (item.name === name) {
                return item;
            }

            itemSelect = findChildItemByName(item, name);
            if (itemSelect) {
                return itemSelect;
            }
        }

        return itemSelect;
    }

    function findChildItemByName(item, name) {
        if (!item || !item.children) return;

        let childSelect = null;
        for (let child of item.children) {
            if (child.name === name) {
                return child;
            } else if (child.children.length !== 0) {
                childSelect = findChildItemByName(child, name);
                if (childSelect) {
                    return childSelect;
                }
            }
        }

        return childSelect;
    }
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="wi-treeview-container" ng-repeat="item in wiTreeview.items track by $index"><div class="wi-parent-node" ng-click="item.data.childExpanded = !item.data.childExpanded" ng-dblclick="wiTreeview.onDoubleClick($index)"><div><i aria-hidden="true" class="fa icon-expanded" ng-class="{\'fa-caret-down\': item.data.childExpanded, \'fa-caret-right\': !item.data.childExpanded, \'wi-hidden\': item.children == null || item.children.length == 0}"></i> <img class="{{item.data.icon}}" alt="img item treeview"> <span>{{item.data.label}}</span></div><div class="wi-parent-description text-right" ng-show="item.data.description">{{item.data.description}}</div></div><div ng-show="item.data.childExpanded"><wi-treeview config="item.children"></wi-treeview></div></div>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name: '@',
        config: '<'
    }
});

exports.name = moduleName;
