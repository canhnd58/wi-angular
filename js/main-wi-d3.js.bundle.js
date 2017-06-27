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
function Plot(config) {
    var self = this;
    var _data, _viewportX = new Array(), _viewportY = new Array();
    if( !config ) {
        console.error("config must not be null");
        return;
    }
    var svg;
    var clientRect;
    var translateOpts = new Object();
    var ctx;
    var xAxisGroup, yAxisGroup;
    var transformX;
    var transformY;
    var xAxisClass = 'grid', yAxisClass = 'grid';
    var xAxisPosition = config.xAxisPosition || 'top', yAxisPosition = config.yAxisPosition || 'left';
    var xNTicks = config.xNTicks || 20;
    var yNTicks = config.yNTicks || 4;
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
        var base = d3.select(baseElement).append('div')
            .attr('class', 'plot-container')
            .style('width', plotWidth + 'px');
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
                .tickFormat(xFormatter)
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
        plotOnCanvas()
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
    this.setData = function(data) {
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
    this.adjustXRange = function() {
        if( _data ) {
            _viewportX = d3.extent(_data, function(d) { return d.x; });
        }
    }
    const trackerLifetime = 10 * 1000; // 1 seconds
    this.periodicTask = function() {
        if( Date.now() - freshness > trackerLifetime )
            svg.selectAll('.wi-tooltip, .tooltipBg, .tooltipLine').remove();
    }
    registeredPlots.push(this);
}
exports.createLogPlot = function(config, domElem) {
    var plot = new Plot(config);
    plot.init(domElem);
    return plot;
}

},{}],2:[function(require,module,exports){
var wiD3 = require('./wi-d3.js');
var wiComponentService = require('./wi-component-service');
var graph = require('./graph.js');

var app = angular.module('helloapp', [wiD3.name, wiComponentService.name]);
app.controller('WiDummy', function ($scope, wiComponentService) {
    wiComponentService.putComponent("GRAPH", graph);
    console.log('Fuck');
    function genSamples(nSamples) {
        var samples = new Array();
        for( let i = 0; i < nSamples; i++ ) {
            samples.push({y:i, x: Math.random()});
        }
        return samples;
    }
    $scope.doClick = function() {
        console.log('Do click');
        var myPlot = wiComponentService.getComponent('myPlot')
        var idx = myPlot.addTrack();
        myPlot.setData(idx, genSamples(1000));
        myPlot.setDepthRange([10, 100]);
        myPlot.plotAll();
    }
});

},{"./graph.js":1,"./wi-component-service":3,"./wi-d3.js":4}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
const componentName = 'wiD3';
const moduleName = 'wi-d3';

var TRACK_CFG = {
    xNTicks: 4,
    yNTicks: 10,
    xAxisPosition: 'top',
    xFormatter: '.2f',
    yFormatter: '.2f',
    xPadding: 50,
    yPadding: 1,
    yStep: 0.25,
    plotWidth: 250 
}

function Controller($scope, wiComponentService) {
    var self = this;
    console.log('wi-d3: Init');
    var tracks = new Array();
    this.addTrack = function() {
        var graph = wiComponentService.getComponent('GRAPH');
        var track = graph.createLogPlot(TRACK_CFG, document.getElementById(self.plotAreaId));
        track.trackPointer(true);
        var len = tracks.push(track);

        return len - 1;
    }
    this.setDepthRange = function(deepRange) {
        tracks.forEach(function(track) {
            track.setYRange(deepRange);
        });
    }
    this.getMaxDepth = function() {
        return d3.max(tracks, function(track) { return track.getYMax();});
    }
    this.setData = function(trackIdx, data) {
        tracks[trackIdx].setData(data);
        tracks[trackIdx].adjustXRange();
    }
    this.plot = function(trackIdx) {
        tracks[trackIdx].doPlot();
    }
    this.plotAll = function() {
        tracks.forEach(function(track) {
            track.doPlot();
            track.trackPointer(true);
        } );
    }
    this.$onInit = function () {
        console.log('wi-d3: onInit');
        self.plotAreaId = self.name + 'PlotArea';
        if (self.name) {
            console.log('putComponent:', self.name);
            wiComponentService.putComponent(self.name, self);
        }
    }
}

var app = angular.module(moduleName, []);
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

},{}]},{},[2]);
