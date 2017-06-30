(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var registeredPlots = new Array();
setInterval(function() {
    registeredPlots.forEach(function(plot) {
        if(plot.periodicTask) plot.periodicTask();
    });
}, 2000);

function roundUp(value, granularity) {
    return Math.ceil(value / granularity) * granularity;
}
function roundDown(value, granularity) {
    return Math.floor(value / granularity) * granularity;
}

function appendTrackHeader(container, trackName) {
    container.append('div')
        .attr('class', 'track-header text-center')
            .append('label')
            .attr('class', 'track-name text-center')
                .text(trackName);
}

function appendDepthHeader(base, unit) {
    var trackHeader = base.selectAll('.track-header');
    trackHeader.append('label')
        .attr('class', 'data-header double-height text-center')
        .text(unit);
}

function appendToTrackHeader(base, dataSetName, unit, minVal, maxVal) {
    var unitHeaderData = [minVal, unit, maxVal];
    var trackHeader = base.selectAll('.track-header');
    var temp = trackHeader.append('label')
        .attr('class', 'data-header text-center')
        .text(dataSetName);

    trackHeader.append('label')
        .attr('class', 'unit-header flex-row')
        .selectAll('div').data(unitHeaderData).enter()
            .append('div')
                .attr('class', function(d, i) {
                    switch(i) {
                        case 0:
                            return 'text-left';
                        case 1:
                            return 'flex-1 text-center';
                        case 2:
                            return 'text-right';
                    }
                    return '';
                })
                .text(function(d) { return d; });
}

function appendTrack(baseElement, trackName, plotWidth) {
    var trackContainer = d3.select(baseElement).append('div')
        .attr('class', 'track-container')
        .style('width', plotWidth + 'px');
    appendTrackHeader(trackContainer, trackName);
    trackContainer.append('div')
        .attr('class', 'plot-container');
    return trackContainer;
}

function DepthTrack(config) {
    var self = this;
    var _viewportX = new Array(), _viewportY = new Array();
    
    if( !config ) {
        console.error("config must not be null");
        return;
    }
    var unit = config.unit || 'm';
    var root;
    var base;
    var svg;
    var clientRect;
    var yAxisGroup;
    var yAxisGroup1;
    var transformY;
    var yAxisClass = 'depthtrack';
    var yNTicks = config.yNTicks || 20;
    var plotWidth = config.plotWidth || 200;
    var yStep = config.yStep || 1.0;
    var yFormatter = d3.format(config.yFormatter || 'g');
    var xPadding = config.xPadding || 0, yPadding = config.yPadding || 0;
    this.getYStep = function() { 
        return yStep; 
    }
    this.init = function(baseElement) {
        root = appendTrack(baseElement, 'Depth', plotWidth);
        base = root.select('.plot-container');
        appendDepthHeader(root, unit);
        clientRect = base.node().getBoundingClientRect();

        svg = base.append('svg')
                .attr('width', clientRect.width)
                .attr('height', clientRect.height);
        yAxisGroup = svg.append('g')
            .attr('class', yAxisClass)
            .attr('transform', 'translate(' + (clientRect.width - xPadding) + ', 0)');
        yAxisGroup1 = svg.append('g')
            .attr('class', yAxisClass);
            //.attr('transform', 'translate(' + (clientRect.width - xPadding) + ', 0)');
    }
    function _doPlot() {
        transformY = d3.scaleLinear().domain(_viewportY).range([yPadding, clientRect.height - yPadding]);
        function setupAxes() {
            var start = roundUp(_viewportY[0], yStep);
            var end = roundDown(_viewportY[1], yStep);
            var yAxis = d3.axisLeft(transformY)
                .tickValues(d3.range(start, end, (end - start)/yNTicks))
                .tickFormat(yFormatter)
                .tickSize(5);
            var yAxis1 = d3.axisRight(transformY)
                .tickValues(d3.range(start, end, (end - start)/yNTicks))
                .tickFormat('')
                .tickSize(5);

            yAxisGroup.call(yAxis);
            yAxisGroup1.call(yAxis1);
        }
        setupAxes();
    }
    this.doPlot = function() {
        _doPlot();
    }
    this.setYRange = function(vY) {
        _viewportY[0] = vY[0];
        _viewportY[1] = vY[1];
    }
}
function Plot(config) {
    var self = this;
    var _data, _viewportX = new Array(), _viewportY = new Array();
    if( !config ) {
        console.error("config must not be null");
        return;
    }
    var root;
    var base;
    var svg;
    var clientRect;
    var translateOpts = new Object();
    var ctx;
    var xAxisGroup, yAxisGroup;
    var transformX;
    var transformY;
    var xAxisClass = 'grid', yAxisClass = 'grid';
    var xAxisPosition = config.xAxisPosition || 'top', yAxisPosition = config.yAxisPosition || 'left';
    var xNTicks = config.xNTicks || 4;
    var yNTicks = config.yNTicks || 20;
    var plotWidth = config.plotWidth || 200;
    var yStep = config.yStep || 1.0;

    var xPadding = config.xPadding || 0, yPadding = config.yPadding || 0;
    var xFormatter = d3.format(config.xFormatter || 'g'), 
        yFormatter = d3.format(config.yFormatter || 'g');
    

    var axisCfg = {
        top: function(transformX) {
            return d3.axisTop(transformX);
        },
        bottom: function(transformX) {
            return d3.axisBottom(transformX);
        },
        left: function(transformY) {
            return d3.axisLeft(transformY);
        },
        right: function(transformY) {
            return d3.axisRight(transformY);
        }
    }
    this.getYStep = function() { 
        return yStep; 
    }
    this.getYMax = function() {
        console.log('getYMax:', _data);
        if (!_data || _data.length == 0) return null;
        return (_data.length - 1) * yStep;
    }
    this.getYMin = function() {
        if (!_data || _data.length == 0) return null;
        return 0;
    }
    function updateTranslateOpts(translateOpts, clientRect) {
        translateOpts.top = 'translate(0, ' + yPadding + ')';
        translateOpts.bottom = 'translate(0, ' + (clientRect.height - yPadding) + ')';
        translateOpts.left = 'translate(' + xPadding + ', 0)';
        translateOpts.right = 'translate(' + (clientRect.width - xPadding) + ', 0)';
    }
    this.init = function(baseElement) {
        root = appendTrack(baseElement, 'Track', plotWidth);
        base = root.select('.plot-container');
        clientRect = base.node().getBoundingClientRect();
        updateTranslateOpts(translateOpts, clientRect);

        canvas = base.append('canvas')
                .attr('width', clientRect.width)
                .attr('height', clientRect.height);
        
        svg = base.append('svg')
                .attr('width', clientRect.width)
                .attr('height', clientRect.height);

        ctx = canvas.node().getContext('2d');

        // Axes
        xAxisGroup = svg.append('g')
            .attr('class', xAxisClass)
            .attr('transform', translateOpts[xAxisPosition]);
        yAxisGroup = svg.append('g')
            .attr('class', yAxisClass)
            .attr('transform', translateOpts[yAxisPosition]);

        new ResizeSensor(base.node(), function() {
            clientRect = base.node().getBoundingClientRect();

            updateTranslateOpts(translateOpts, clientRect);

            canvas
                .attr('width', clientRect.width)
                .attr('height', clientRect.height);
            svg
                .attr('width', clientRect.width)
                .attr('height', clientRect.height);
            xAxisGroup.attr('transform', translateOpts[xAxisPosition]);
            yAxisGroup.attr('transform', translateOpts[yAxisPosition]);
            if(_data) _doPlot();
        });
    }
    function _doPlot() {
        console.log(_viewportX, _viewportY);
        var axisRange = {
            top: [yPadding, clientRect.height - yPadding],
            bottom: [yPadding, clientRect.height - yPadding].reverse(),
            left: [xPadding, clientRect.width - xPadding],
            right: [xPadding, clientRect.width - xPadding].reverse()
        }
        transformX = d3.scaleLinear().domain(_viewportX).range(axisRange[yAxisPosition]);
        transformY = d3.scaleLinear().domain(_viewportY).range(axisRange[xAxisPosition]);
        function setupAxes() {
            var xAxis = axisCfg[xAxisPosition](transformX)
                .tickValues(d3.range(_viewportX[0], _viewportX[1], (_viewportX[1] - _viewportX[0])/xNTicks))
                //.tickFormat(xFormatter)
                .tickFormat("")
                .tickSize(-(clientRect.height - 2 * yPadding));
            var start = roundUp(_viewportY[0], yStep);
            var end = roundDown(_viewportY[1], yStep);
            var yAxis = axisCfg[yAxisPosition](transformY)
                .tickValues(d3.range(start, end, (end - start)/yNTicks))
                .tickFormat(yFormatter)
                .tickSize(-(clientRect.width - 2 * xPadding));

            xAxisGroup.call(xAxis);
            yAxisGroup.call(yAxis);
        }
        function plotOnCanvas() {
            ctx.clearRect(0, 0, clientRect.width, clientRect.height);
            var plotSamples = _data.filter(function(item){
                var ret =(item.x >= _viewportX[0] && 
                       item.x <= _viewportX[1] && 
                       item.y * yStep >= _viewportY[0] &&
                       item.y * yStep <= _viewportY[1]);
                return ret;
            });
            ctx.beginPath();
            plotSamples.forEach(function(item) {
                ctx.lineTo(transformX(item.x), transformY(item.y * yStep));
            });
            ctx.stroke();
        }
        setupAxes();
        plotOnCanvas();
    }
    this.doPlot = function() {
        _doPlot();
    }
    this.plotPoint = function(samples, viewportX, viewportY) {
        _data = samples;
        _viewportX[0] = viewportX[0];
        _viewportX[1] = viewportX[1];
        _viewportY[0] = viewportY[0];
        _viewportY[1] = viewportY[1];
        _doPlot();
    }
    this.onClick = function(callback) {
        svg.on('click', function() {callback();});
    }

    var freshness = 0;
    function mousemoveHandler() {
        freshness = Date.now();
        var coordinate = d3.mouse(svg.node());
        svg.selectAll('text.wi-tooltip').remove();
        svg.selectAll('rect.tooltipBg').remove();
        svg.selectAll('line.tooltipLine').remove();
        var lines = [
            {x1: 0, y1:coordinate[1], x2: clientRect.width, y2:coordinate[1]},
            {x1: coordinate[0], y1:0, x2: coordinate[0], y2: clientRect.height}
        ];
        svg.selectAll('line.tooltipLine').data(lines).enter().append('line')
            .attr('class', 'tooltipLine')
            .attr('x1', function(d) {
                return d.x1;
            })
            .attr('y1', function(d) {
                return d.y1;
            })
            .attr('x2', function(d) {
                return d.x2;
            })
            .attr('y2', function(d) {
                return d.y2;
            })
            .style('stroke', 'red');
            
        var tooltip = svg.append('text')
            .attr('class', 'wi-tooltip')
            .attr('y', coordinate[1])
            .attr('fill', 'red');
        tooltip.append('tspan').attr('dy', '1.2em')
            .attr('x', coordinate[0] + 5)
            .text("X:" + xFormatter(transformX.invert(coordinate[0])));
        tooltip.append('tspan').attr('dy', '1.2em')
            .attr('x', coordinate[0] + 5)
            .text('Y:' + yFormatter(transformY.invert(coordinate[1])));

        var textRect = tooltip.node().getBBox();
        var tooltipBg = svg.append('rect')
            .attr('class', 'tooltipBg')
            .attr('x', textRect.x)
            .attr('y', textRect.y)
            .attr('width', textRect.width)
            .attr('height', textRect.height);
        tooltip.raise();
    }
    function mouseleaveHandler() {
        svg.selectAll('.wi-tooltip, .tooltipBg, .tooltipLine').remove();
    }
    this.trackPointer = function(isOn) {
        if( isOn && transformX && transformY ) {
            svg.on('mousemove', mousemoveHandler)
                .on('mouseleave', mouseleaveHandler);
        }
        else {
            svg.on('mousemove', null)
                .on('mouseleave', null);
        }
    }
    this.setData = function(data, dataSetName, unit, min, max) {
        appendToTrackHeader(root, dataSetName, unit, min, max);
        _data = data;
    }
    this.setYRange = function(vY) {
        _viewportY[0] = vY[0];
        _viewportY[1] = vY[1];
    }
    this.setXRange = function(vX) {
        _viewportX[0] = vX[0];
        _viewportX[1] = vX[1];
    }
    this.adjustXRange = function(kFactor) {
        if( _data ) {
            var tempVport= d3.extent(_data, function(d) { return d.x; });
            _viewportX[0] = 0;
            _viewportX[1] = tempVport[1] * kFactor;
        }
    }
    const trackerLifetime = 10 * 1000; // 1 seconds
    this.periodicTask = function() {
        if( Date.now() - freshness > trackerLifetime )
            svg.selectAll('.wi-tooltip, .tooltipBg, .tooltipLine').remove();
    }
    registeredPlots.push(this);
}
exports.createLogTrack = function(config, domElem) {
    var plot = new Plot(config);
    plot.init(domElem);
    return plot;
}
exports.createDepthTrack = function(config, domElem) {
    var depthTrack = new DepthTrack(config);
    depthTrack.init(domElem);
    return depthTrack;
}

},{}],2:[function(require,module,exports){
let wiButton = require('./wi-button.js');
let wiToolbar = require('./wi-toolbar.js');
let wiSlidingbar = require('./wi-slidingbar.js');

let graph = require('./graph.js');
let wiD3 = require('./wi-d3.js');
let wiLogplot = require('./wi-logplot.js');

let wiComponentService = require('./wi-component-service');

let app = angular.module('helloapp',
    [wiLogplot.name, wiButton.name, wiToolbar.name, wiSlidingbar.name, wiD3.name, wiComponentService.name]);

app.controller('WiDummy', function ($scope, wiComponentService) {
    wiComponentService.putComponent("GRAPH", graph);

    $scope.handlers = handlers;

    $scope.doClick = function () {
        let myPlot = wiComponentService.getComponent('myPlot').getwiD3Ctrl();
        let idx = myPlot.addTrack();
        myPlot.setData(idx, genSamples(1000));
        myPlot.setDepthRange([10, 100]);
        myPlot.plotAll();
    };

    function genSamples(nSamples) {
        let samples = [];
        for (let i = 0; i < nSamples; i++) {
            samples.push({y: i, x: Math.random()});
        }
        return samples;
    }
});

handlers = {
    Button1ButtonClicked: function () {
        console.log('Button1Button is clicked');
    },

    Button2ButtonClicked: function () {
        console.log('Button2Button is clicked');
    },

    Button3ButtonClicked: function () {
        console.log('Button3Button is clicked');
    }
};
},{"./graph.js":1,"./wi-button.js":3,"./wi-component-service":4,"./wi-d3.js":5,"./wi-logplot.js":6,"./wi-slidingbar.js":7,"./wi-toolbar.js":8}],3:[function(require,module,exports){
const wiButtonName = 'wiButton';
const moduleName = 'wi-button';

function ButtonController(wiComponentService) {
    let self = this;

    this.default = {
        type: 'normal',
        label: '',
        layout: 'icon-top',
        icon: 'project-new-32x32',
        disabled: false
    };

    this.onClick = function () {
        if (self.handler) self.handler();
    };

    this.$onInit = function() {
        if (self.disabled === 'true'){
            self.disabled = true;
        } else {
            self.disabled = self.default.disabled;
        }

        if (self.name) wiComponentService.putComponent(self.name, self);
    }
}

let app = angular.module(moduleName, []);
app.component(wiButtonName, {
    template:'<div><button ng-click="wiButton.onClick()" class="button-{{wiButton.type || wiButton.config.type || wiButton.default.type}}" ng-disabled="wiButton.disabled"><img class="{{wiButton.icon || wiButton.config.icon || wiButton.default.icon}}" alt="icon wi-button"><p class="{{wiButton.layout || wiButton.config.layout || wiButton.default.layout}}" ng-show="wiButton.label != null || wiButton.config.label != null">{{wiButton.label || wiButton.config.label || wiButton.default.label}}</p></button></div>',
    controller: ButtonController,
    controllerAs: wiButtonName,
    bindings: {
        config: '<',
        type: '@',
        name: '@',
        label: '@',
        layout: '@',
        icon: '@',
        handler: '<',
        disabled: '@'
    }
});

exports.name = moduleName;

},{}],4:[function(require,module,exports){
const wiServiceName = 'wiComponentService';
const moduleName = 'wi-component-service';

let app = angular.module(moduleName, []);
app.factory(wiServiceName, function () {
    let __Controllers = {};
    let handlers = {};

    return {
        treeFunctions: {},

        getComponent: function (componentName) {
            return __Controllers[componentName];
        },
        putComponent: function (componentName, controller) {
            __Controllers[componentName] = controller;
        },

        on: function (eventName, handlerCb) {
            let eventHandlers = handlers[eventName];
            if (!Array.isArray(eventHandlers)) {
                handlers[eventName] = [];
            }

            handlers[eventName].push(handlerCb);
        },
        emit: function (eventName, data) {
            let eventHandlers = handlers[eventName];
            if (Array.isArray(eventHandlers)) {
                eventHandlers.forEach(function (handler) {
                    handler(data);
                })
            }
        }
    };
});

exports.name = moduleName;
},{}],5:[function(require,module,exports){
const componentName = 'wiD3';
const moduleName = 'wi-d3';

let TRACK_CFG = {
    xNTicks: 4,
    yNTicks: 10,
    xAxisPosition: 'top',
    xFormatter: '.2f',
    yFormatter: '.2f',
    xPadding: 1,
    yPadding: 5,
    yStep: 0.25,
    plotWidth: 120
};

let DTRACK_CFG = {
    xNTicks: 4,
    yNTicks: 10,
    xAxisPosition: 'top',
    xFormatter: '.2f',
    yFormatter: '.2f',
    xPadding: 1,
    yPadding: 5,
    yStep: 0.25,
    plotWidth: 60
};

function Controller($scope, wiComponentService) {
    let self = this;
    let tracks = [];

    this.addTrack = function () {
        let graph = wiComponentService.getComponent('GRAPH');
        let track = graph.createLogTrack(TRACK_CFG, document.getElementById(self.plotAreaId));
        track.trackPointer(true);
        let len = tracks.push(track);

        return len - 1;
    };

    this.addDepthTrack = function () {
        let graph = wiComponentService.getComponent('GRAPH');
        let track = graph.createDepthTrack(DTRACK_CFG, document.getElementById(self.plotAreaId));
        let len = tracks.push(track);

        return len - 1;
    };

    this.setDepthRange = function (deepRange) {
        tracks.forEach(function (track) {
            track.setYRange(deepRange);
        });
    };

    this.getMaxDepth = function () {
        return d3.max(tracks, function (track) {
            if (track.getYMax) return track.getYMax();
            return -1;
        });
    };

    this.setData = function (trackIdx, data) {
        tracks[trackIdx].setData(data, 'Rock', 'm3', 0, 200);
        tracks[trackIdx].adjustXRange(1);
    };

    this.plot = function (trackIdx) {
        tracks[trackIdx].doPlot();
    };

    this.plotAll = function () {
        tracks.forEach(function (track) {
            track.doPlot();
            if (track.trackPointer) track.trackPointer(true);
        });
    };

    this.$onInit = function () {
        self.plotAreaId = self.name + 'PlotArea';
        if (self.name) {
            wiComponentService.putComponent(self.name, self);
        }
    };
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div id="{{wiD3.plotAreaId}}" class="d3-region"></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        name: '@'
    }
});

exports.name = moduleName;

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
const componentName = 'wiSlidingbar';
const moduleName = 'wi-slidingbar';

const MIN_RANGE = 1;

function Controller($scope, wiComponentService) {
    let self = this;

    this.tinyWindow = null;
    let parentHeight = 0;
    this.slidingBarState = {
        top: 0,
        range: MIN_RANGE
    };

    function update(ui) {
        parentHeight = parseInt($(self.contentId).height());

        if (ui.size) {
            self.tinyWindow.height = (ui.size.height > parentHeight) ? parentHeight : ui.size.height;
        }
        if (ui.position) {
            self.tinyWindow.top = (ui.position.top > 0) ? ui.position.top : 0;
        }
        self.slidingBarState.top = Math.round(self.tinyWindow.top / parentHeight * 100);
        self.slidingBarState.range = Math.round(self.tinyWindow.height / parentHeight * 100);

        // call apply to call all parent scope watcher
        $scope.$apply();
    }

    this.$onInit = function () {
        self.contentId = '#sliding-bar-content' + self.name;
        self.handleId = '#sliding-handle' + self.name;

        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.onReady = function () {
        parentHeight = parseInt($(self.contentId).height());
        let initialHeight = Math.round(parentHeight * (MIN_RANGE) / 100);

        self.tinyWindow = {
            top: (parentHeight - initialHeight * 4) * Math.random(),
            height: initialHeight * 4
        };


        // init tiny window height
        $(self.handleId).height(self.tinyWindow.height);
        $(self.handleId).css('top', self.tinyWindow.top + 'px');

        self.slidingBarState.top = Math.round(self.tinyWindow.top / parentHeight * 100);
        self.slidingBarState.range = Math.round(self.tinyWindow.height / parentHeight * 100);

        $(self.handleId).draggable({
            axis: "y",
            containment: "parent"
        }).resizable({
            minHeight: initialHeight,
            containment: "parent",
            handles: "n, s"
        });

        $(self.handleId).on("resize", function (event, ui) {
            update(ui);
        });

        $(self.handleId).on("drag", function (event, ui) {
            update(ui);
        });
    };
    /*
     this.setSlidingHandleHeight = function () {
     console.log('set slidingHandleHeight');
     parentHeight = parseInt($(self.contentId).height());

     let initialHeight = Math.round(parentHeight * MIN_RANGE / 100);
     $(self.handleId).height(initialHeight);
     self.tinyWindow.height = initialHeight;
     }
     */
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div id="sliding-bar-content{{wiSlidingbar.name}}" class="sliding-bar-content" ng-transclude elem-ready="wiSlidingbar.onReady()"></div><div id="sliding-handle{{wiSlidingbar.name}}" class="ui-widget-content sliding-handle"><div class="sliding-handle-border"></div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        name: '@'
    }
});

app.directive('elemReady', function ($parse) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            elem.ready(function () {
                $scope.$apply(function () {
                    let func = $parse(attrs.elemReady);
                    func($scope);
                })
            })
        }
    }
});

exports.name = moduleName;
exports.componentName = componentName;

},{}],8:[function(require,module,exports){
const name = 'wiToolbar';
const moduleName = 'wi-toolbar';

function Controller() {
    let self = this;

    this.default = {
        type: 'vertical',
        label: ''
    }
}

let app = angular.module(moduleName, []);

app.component(name, {
    template:'<div class="toolbar-wrapper"><div ng-transclude class="toolbar-{{wiToolbar.type || wiToolbar.default.type}}"></div><p class="wi-toolbar-label text-center" ng-show="wiToolbar.label && wiToolbar.label.length > 0">{{wiToolbar.label}}</p></div>',
    transclude: true,
    controller: Controller,
    controllerAs: name,
    bindings: {
        name: '@',
        type: '@',
        label: '@'
    }
});

exports.name = moduleName;
},{}]},{},[2]);
