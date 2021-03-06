/**
 * A module for data visualization
 * @module visualize
 */

let DepthTrack = require('./visualize-depth-track');
let LogTrack = require('./visualize-log-track');
let Crossplot = require('./visualize-crossplot');
let Curve = require('./visualize-curve');
let CanvasHelper = require('./visualize-canvas-helper');

exports.CanvasHelper = CanvasHelper;

/**
 * Create and draw a new Log Track inside a specified DOM element
 * @param {Object} config - Configurations of new Log Track
 * @param {Object} domElem - The DOM element to contain the track
 * @returns {Object} The created track
 */
exports.createLogTrack = function(config, domElem) {
    let logTrack = new LogTrack(config);
    logTrack.init(domElem);
    return logTrack;
}

/**
 * Create and draw a new Depth Track inside a specified DOM element
 * @param {Object} config - Configurations of new Depth Track
 * @param {Object} domElem - The DOM element to contain the track
 * @returns {Object} The created track
 */
exports.createDepthTrack = function(config, domElem) {
    let depthTrack = new DepthTrack(config);
    depthTrack.init(domElem);
    return depthTrack;
}


/**
 * Remove a track
 * @param {Object} - The track object to remove
 */
exports.removeTrack = function(track, domElem) {
    track.destroy();
}

/**
 * Create a curve inside a specified DOM element
 * @param {Object} config - Configurations of new Curve
 * @param {Array} data - Curve data
 * @param {Object} domElem - The DOM element containing the curve
 * @returns {Object} The created curve
 */
exports.createCurve = function(config, data, domElem) {
    config.data = data;
    let curve = new Curve(config);
    curve.init(domElem);
    return curve;
}

/**
 * Build a new visualize depth track object without creating DOM element
 * @param {Object} config - Configurations of new Depth Track
 * @returns {Object} The built track
 */
exports.buildDepthTrack = function(config) {
    return new DepthTrack(config);
}

/**
 * Build a new visualize log track object without creating DOM element
 * @param {Object} config - Configurations of new Log Track
 * @returns {Object} The built track
 */
exports.buildLogTrack = function(config) {
    return new LogTrack(config);
}

/**
 * Build a new visualize curve object without creating DOM element
 * @param {Object} config - Configurations of new Curve
 * @param {Array} data - Curve data
 * @returns {Object} The built curve
 */
exports.buildCurve = function(config, data) {
    config.data = data;
    return new Curve(config);
}
/**
 * Rearange tracks in wi-d3 area
 */
exports.rearangeTracks = function(wiD3Ctrl) {
    let wiD3Name = wiD3Ctrl.name;
    d3.select('[name=' + wiD3Name + ']').selectAll('.vi-track-container, .vi-track-vertical-resizer').sort();
}

/**
 * Create tooltip lines on a DOM SVG at mouse position
 */
exports.createTooltipLines = function(domSvg) {
    let svg = d3.select(domSvg);
    let mousePosition = d3.mouse(domSvg);
    let x = mousePosition[0];
    let y = mousePosition[1];
    let lineData = [
        {x1: x, y1: 0, x2: x, y2: domSvg.clientHeight},
        {x1: 0, y1: y, x2: domSvg.clientWidth, y2: y}
    ];
    let lines = svg.selectAll('line.tooltip-line')
        .data(lineData);

    lines.enter().append('line')
        .attr('class', 'tooltip-line');

    lines
        .attr('x1', function(d) { return d.x1; })
        .attr('x2', function(d) { return d.x2; })
        .attr('y1', function(d) { return d.y1; })
        .attr('y2', function(d) { return d.y2; })
        .style('stroke', 'black')
        .style('stroke-dasharray', '2, 1')
        .style('stroke-width', '1px');
}

/**
 * Remove tooltip lines from a DOM SVG
 */
exports.removeTooltipLines = function(domSvg) {
    d3.select(domSvg).selectAll('line.tooltip-line').remove();
}

exports.sheetDraggable = function(domElem) {
    d3.select(domElem)
        .datum({baseX:0})
        .call(d3.drag()
            .on('start', function(d) {
                console.log('drag start');
                d.cursor = d3.select(this).style('cursor');
                d3.select(this).classed('moving', true);
            })
            .on('drag', function(d) {
                d3.event.sourceEvent.preventDefault();
                d3.event.sourceEvent.stopPropagation();
                d.baseX += d3.event.dx;
                d3.select(this).style('left', d.baseX + "px");
            })
            .on("end", function(d) {
                if (d.baseX > 0) {
                    d.baseX = 0;
                }
                else {
                    let logplotWidth = d3.select('.logplot-main-content').node().clientWidth;
                    let slidingBarWidth = d3.select('.slidingbar').node().clientWidth;
                    let offsetMax = this.clientWidth - (logplotWidth - slidingBarWidth - 16);
                    if (-d.baseX > offsetMax) d.baseX = -offsetMax;
                }
                d3.select(this).style('left', d.baseX + "px");
                d3.select(this).classed('moving', false);
            })
        );
}

/**
 * Create and draw a new Crossplot inside a specified DOM element
 * @param {Object} xCurve - The curve in x axis
 * @param {Object} yCurve - The curve in y axis
 * @param {Object} config - Configurations of new Crossplot
 * @param {Object} domElem - The DOM element to contain the crossplot
 * @returns {Object} The created crossplot
 */
exports.createCrossplot = function(xCurve, yCurve, config, domElem) {
    config.xCurve = xCurve;
    config.yCurve = yCurve;
    let crossplot = new Crossplot(config);
    crossplot.init(domElem);
    return crossplot;
}

