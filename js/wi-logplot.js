const componentName = 'wiLogplot';
const moduleName = 'wi-logplot';

//Utils for object checking and object cloning
function objcpy(destObj, sourceObj) {
    if (destObj) {
        for (let attr in sourceObj) {
            destObj[attr] = sourceObj[attr];
        }
    }
}

function isEqual(a, b) {
    if (!a || !b) return false;
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}

function Controller($scope, wiComponentService) {
    let self = this;
    let previousSlidingBarState = {};

    this.$onInit = function () {
        self.slidingbarName = self.name + 'Slidingbar';
        self.wiD3AreaName = self.name + 'D3Area';

        // hook globalHandlers into scope
        $scope.handlers = wiComponentService.getComponent("GLOBAL_HANDLERS");

        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.$doCheck = function () {
        if (!self.slidingBar) return;
        if (!isEqual(previousSlidingBarState, self.slidingBar.slidingBarState)) {
            objcpy(previousSlidingBarState, self.slidingBar.slidingBarState);
            let wiD3Controller = self.getwiD3Ctrl();
            let max = wiD3Controller.getMaxDepth();
            let low = max * previousSlidingBarState.top / 100;
            let high = max * ( previousSlidingBarState.top + previousSlidingBarState.range ) / 100;
            wiD3Controller.setDepthRange([low, high]);
            wiD3Controller.plotAll();
        }
    };

    this.getSlidingbarCtrl = function () {
        return self.slidingBar = wiComponentService.getComponent(self.slidingbarName);
    };

    this.getwiD3Ctrl = function () {
        return self.slidingBar = wiComponentService.getComponent(self.wiD3AreaName);
    };
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="logplot-toolbar-wrapper"><wi-toolbar name="Databases1Toolbar" icon label layout description type><wi-button name="Test1Button" icon="project-new-32x32" label layout description type="small" handler="handlers.Test1ButtonClicked"></wi-button><wi-button name="Test2Button" icon="project-open-32x32" label layout description type="small" handler="handlers.Test2ButtonClicked"></wi-button><wi-button name="Test3Button" icon="project-close-32x32" label layout description type="small" handler="handlers.Test3ButtonClicked"></wi-button></wi-toolbar></div><div class="logplot-main-content"><div class="slidingbar"><wi-slidingbar name="{{wiLogplot.slidingbarName}}" ng-init="wiLogplot.getSlidingbarCtrl()"></wi-slidingbar></div><div class="track-area"><wi-d3 style="width: 100%; flex: 1; display: flex;" name="{{wiLogplot.wiD3AreaName}}"></wi-d3></div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        name: '@'
    }
});

exports.name = moduleName;
