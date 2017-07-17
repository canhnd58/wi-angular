const componentName = 'wiContextMenu';
const moduleName = 'wi-context-menu';

__WICS = null;
function Controller($scope, wiComponentService) {
    let self = this;
    self.shown = false;
    this.buttons = null;
    self.contextMenus = [];
    this.$onInit = function () {
        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.dismissAll = function () {
        self.shown = false;
        self.contextMenus = [];
    };
    this.open = function (x, y, buttons) {
        if (!buttons || buttons.length === 0) return;
        let contextMenu = {};
        if (buttons) contextMenu.buttons = buttons;
        contextMenu.top = y;
        contextMenu.left = x;
        self.contextMenus.push(contextMenu);
        // console.log('contextmenus', self.contextMenus);
        self.shown = true;
    };
    this.ngRepeatFinished = function () {
        let contextMenuElements = $(".context-menu-wrapper");
        let firstCxtMenuElement = contextMenuElements[0];
        let contextMenuBackdrop = firstCxtMenuElement.offsetParent;
        let backdropHeight = contextMenuBackdrop.offsetHeight;
        let backdropWidth = contextMenuBackdrop.offsetWidth;
        for (let i = 0; i < contextMenuElements.length; i++) {
            let contextMenuElement = contextMenuElements[i];
            let height = contextMenuElement.offsetHeight
            let width = contextMenuElement.offsetWidth;
            let top = contextMenuElement.offsetTop;
            let left = contextMenuElement.offsetLeft;
            if (top + height >= backdropHeight) {
                top = backdropHeight - height - 5;
                $($(".context-menu-wrapper").get(i)).css('top', top);
            }
            if (left + width >= backdropWidth) {
                if (i === 0) {
                    left = backdropWidth - width - 5;
                    $(".context-menu-wrapper").css('left', left);
                } else {
                    parentMenuWidth = firstCxtMenuElement.offsetWidth;
                    left = backdropWidth - width - parentMenuWidth - 5;
                    $($(".context-menu-wrapper").get(i)).css('left', left);
                }
            }
        }
    }

    var droppingMenu = [];
    this.onMouseEnterButton = function (button, $event, $index) {
        // console.log('droppingMenu', droppingMenu);
        for (let menu of droppingMenu) {
            if (button == menu) {
                clearTimeout(self.dismissChildCtxMenuTimeout);
                break;
            }
        }
        if (button.childContextMenu && button.childContextMenu.length) {
            let childContextMenu = button.childContextMenu;
            // let parentWidth = $event.currentTarget.firstChild.clientWidth;
            let buttonHeight = $event.currentTarget.firstChild.clientHeight;
            let parentMenuX = $event.currentTarget.parentElement.offsetLeft;
            let parentMenuY = $event.currentTarget.parentElement.offsetTop;
            let parentMenuWidth = $event.currentTarget.parentElement.offsetWidth;
            // let menuHeight = $event.currentTarget.parentElement.offsetHeight;
            let x = parentMenuX + parentMenuWidth;
            let y = parentMenuY + (buttonHeight * $index);
            self.open(x, y, childContextMenu);
        }
    }
    this.onMouseLeaveButton = function (button) {
        if (button.childContextMenu && button.childContextMenu.length) {
            console.log('mouse leave menu with children');
            droppingMenu = button.childContextMenu;
            self.dismissChildCtxMenuTimeout = setTimeout(function () {
                self.contextMenus.pop();
            }, 100);
        } else {
            droppingMenu = [];
        }
    }
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    templateUrl: 'wi-context-menu.html',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name: '@'
    }
});

exports.name = moduleName;
