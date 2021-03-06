const componentName = 'wiTreeview';
const moduleName = 'wi-treeview';

function Controller(wiComponentService, wiApiService, WiProperty, WiWell) {
    let self = this;

    this.$onInit = function () {
        // if it is rootview
        if (self.name) {
            wiComponentService.putComponent(self.name, self);

            wiComponentService.on(wiComponentService.UPDATE_WELL_EVENT, function (well) {
                self.updateWellItem(well);
            });
            wiComponentService.on(wiComponentService.UPDATE_MULTI_WELLS_EVENT, function (wells) {
                self.updateWellsItem(wells);
            });
            wiComponentService.on(wiComponentService.UPDATE_LOGPLOT_EVENT, function (logplot) {
                self.updateLogplotItem(logplot);
            });
        }
    };

    this.onReady = function () {
        let utils = wiComponentService.getComponent(wiComponentService.UTILS);

        let typeItemDragable = 'curve';
        let element = $('.wi-parent-node' + `[type='${typeItemDragable}']`);
        utils.setupCurveDraggable(element, wiComponentService, wiApiService);
    };

    this.onCollapse = function ($index) {
        self.config[$index].data.childExpanded = !self.config[$index].data.childExpanded;
    };

    this.onClick1 = function($index) {
        console.log('onClick:', $index, self);
        wiComponentService.setState(wiComponentService.ITEM_ACTIVE_STATE, self.config[$index].name);
        wiComponentService.putComponent(wiComponentService.ITEM_ACTIVE_PAYLOAD, self.config[$index].data.payload);

        if (self.config[$index].data.properties) {
            wiComponentService.emit('update-properties', self.config[$index].data.properties.listConfig);

            console.log('properties', self.config[$index].data.properties.listConfig);
        }
    };

    this.onClick = function($index) {
        if(self.container && self.container.selectHandler) {
            self.container.selectHandler(self.config[$index]);
        }
    }

    this.onDoubleClick = function ($index) {
        let utils = wiComponentService.getComponent(wiComponentService.UTILS);
        let selectedNode = utils.getSelectedNode();
        if (selectedNode.children && selectedNode.children.length) {
            selectedNode.data.childExpanded = !selectedNode.data.childExpanded;
            return;
        }
        if (selectedNode.handler) {
            selectedNode.handler();
        }
    }

    this.onDoubleClick1 = function ($index) {
        if (self.config[$index].data.handler) {
            self.config[$index].data.handler();
        } else if (self.config[$index].children && self.config[$index].children.length !== 0) {
            self.onCollapse($index);
        } else {
            let treeFunctions = wiComponentService.getComponent(wiComponentService.TREE_FUNCTIONS);
            if (treeFunctions) {
                // get func from component service
                if (self.config && self.config[$index] && self.config[$index].type
                    && treeFunctions[self.config[$index].type]) {
                    treeFunctions[self.config[$index].type](self.config[$index].data.payload);
                }
                else {
                    console.log(treeFunctions, self.config, self.config[$index]);
                }
            }
        }
    };

    this.getItemActiveName = function () {
        return wiComponentService.getState(wiComponentService.ITEM_ACTIVE_STATE);
    };

    this.addItem = function (parentName, item) {
        let parentItem = getItemByName(parentName);

        if (parentItem) parentItem.children.push(item);
    };

    this.addItemToFirst = function (parentName, item) {
        let parentItem = getItemByName(parentName);
        if (parentItem) {
            parentItem.children.unshift(item);
        }
    };

    this.updateWellItem = function (well) {
        let wellSelected = self.findWellById(well.idWell);

        let newWell = new WiWell(well);

        if (wellSelected) {
            angular.copy(newWell, wellSelected);
        } else {
            let wells = getItemByName('wells');

            if (wells) wells.children.unshift(newWell);
        }
    };

    this.updateWellsItem = function(wells) {
        for(let well of wells) {
            self.updateWellItem(well);
        }
    };

    this.updateLogplotItem = function (logplot) {
        let plotSelected = self.findWellById(logplot.idPlot);

        let newPlotItem = new WiLogplotModel();

        let newWell = new WiWell(well);

        if (wellSelected) {
            angular.copy(newWell, wellSelected);
        } else {
            let wells = getItemByName('wells');

            if (wells) wells.children.unshift(newWell);
        }
    };

    // item has id to identify
    this.updateChildItem = function (parentItemName, item) {

    };

    this.findWellById = function (idWell) {
        let wells = getItemByName('wells');
        let wellName = idWell + 'well';

        if (!wells) return null;

        for (let itemTree of wells.children) {
            if (itemTree.type === 'well' && itemTree.name === wellName) {
                return itemTree;
            }
        }

        return null;
    };

    function getItemByName(name) {
        let itemSelect = null;
        for (let item of self.config) {
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

    this.expand = function ($index) {
        self.config[$index].data.childExpanded = true;
        for (let child of self.config[$index].children) {
            child.data.childExpanded = true;
        }
    };
    this.collapse = function ($index) {
        self.config[$index].data.childExpanded = false;
        for (let child of self.config[$index].children) {
            child.data.childExpanded = false;
        }
    };

    this.expandAll = function (rootConfig) {
        for (let config of rootConfig) {
            config.data.childExpanded = true;
            expandAll(config.children);
        }
    };

    function expandAll(children) {
        if (!children) {
            return;
        }
        for (let child of children) {
            child.data.childExpanded = true;
            expandAll(child.children);
        }
    }

    this.collapseAll = function (rootConfig) {
        for (let config of rootConfig) {
            config.data.childExpanded = false;
            collapseAll(config.children);
        }
    };

    function collapseAll(children) {
        if (!children) {
            return;
        }
        for (let child of children) {
            child.data.childExpanded = false;
            collapseAll(child.children);
        }
    }

    this.showContextMenu = function ($event, $index) {
        console.log('self.name', self.name);
        console.log('$index', $index);
        console.log('self.config', self.config);
        let nodeType = self.config[$index].type;
        let contextMenuHolderCtrl = wiComponentService.getComponent(self.contextmenuholder);
        let defaultContextMenu = contextMenuHolderCtrl.getDefaultTreeviewCtxMenu($index, self);
        let itemContextMenu = contextMenuHolderCtrl.getItemTreeviewCtxMenu(nodeType, self);
        let contextMenu = itemContextMenu.concat(defaultContextMenu);
        wiComponentService.getComponent('ContextMenu').open($event.clientX, $event.clientY, contextMenu);
    }
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    templateUrl: 'wi-treeview.html',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name: '@',
        config: '<',
        contextmenuholder: '@',
        container: '<'
    }
});

exports.name = moduleName;
