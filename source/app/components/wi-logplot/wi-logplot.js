const componentName = 'wiLogplot';
const moduleName = 'wi-logplot';

//Utils for object checkings and object cloning
function objcpy(destObj, sourceObj) {
    if(destObj) {
        for(var attr in sourceObj) {
            destObj[attr] = sourceObj[attr];
        }
    }
}
function isEqual(a, b) {
    if (!a || !b) return false;
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}

function Controller(wiComponentService) {
    var self = this;
    var previousSlidingBarState = new Object();

    this.$onInit = function () {
        self.slidingbarName = self.name + 'Slidingbar';
        self.wiD3AreaName = self.name + 'D3Area';

        if (self.name) wiComponentService.putComponent(self.name, self);
    };
    this.$doCheck = function() {
        if( !self.slidingBar ) return;
        if(!isEqual(previousSlidingBarState, self.slidingBar.slidingBarState)) {
            objcpy(previousSlidingBarState, self.slidingBar.slidingBarState);
            var wiD3Controler = wiComponentService.getComponent(self.wiD3AreaName);
            var max = wiD3Controler.getMaxDepth();
            var low = max * previousSlidingBarState.top / 100;
            var high = max * ( previousSlidingBarState.top + previousSlidingBarState.range ) / 100;
            wiD3Controler.setDepthRange([low, high]);
            wiD3Controler.plotAll();
        }
    }

    this.getSlidingbarCtrl = function () {
        return self.slidingBar = wiComponentService.getComponent(self.slidingbarName);
    }
}

var app = angular.module(moduleName, []);
app.component(componentName, {
    templateUrl: 'wi-logplot.html',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        name: '@'
    }
});

exports.name = moduleName;