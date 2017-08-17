let Track = require('./visualize-track.js');
let Curve = require('./visualize-curve.js');
let Shading = require('./visualize-shading.js');
let Utils = require('./visualize-utils.js');

module.exports = LogTrack;

Utils.extend(Track, LogTrack);

/**
 * Represents a log track
 * @constructor
 * @param {Object} config - Contain configurations.
 * @param {Number} [config.id] - The id of this track in backend (idTrack field)
 * @param {String} [config.type] - The type of this track ('depth-track' of 'log-track')
 * @param {String} [config.name] - Name of the track
 * @param {Boolean} [config.showTitle] - Indicate whether to show title
 * @param {Boolean} [config.showXGrids] - Indicate whether to show value grids
 * @param {Boolean} [config.showYGrids] - Indicate whether to show depth grids
 * @param {Boolean} [config.justification] - Alignment of the title (left, center, right)
 * @param {Number} [config.xMajorTicks] - Number of major ticks shown in x axis. Default: 4
 * @param {Number} [config.xMinorTicks] - Number of minor ticks shown in x axis. Default: 2
 * @param {Number} [config.yTicks] - Number of ticks shown in y axis. Default: 10
 * @param {Number} [config.width] - Width in pixel of the bounding rectangle. Default: 120
 * @param {String} [config.bgColor] - Background color for the track
 * @param {Number} [config.yStep] - Y gap between two consecutive points
 * @param {Number} [config.offsetY] - Offset to increase all y coordinates
 * @param {Number} [config.xPadding] - Horizontal padding for inner drawings. Default: 1
 * @param {Number} [config.yPadding] - Vertical padding for inner drawings. Default: 5
 * @param {Number} [config.xDecimal] - Precision of float number in x axis. Default: 2
 * @param {Number} [config.yDecimal] - Precision of float number in y axis. Default: 2
 * @param {Boolean} [config.showLabels] - Indicate whether to show labels
 * @param {Boolean} [config.showEndLabels] - Indicate whether to show labels at two ends
 */
function LogTrack(config) {
    Track.call(this, config);

    this.id = config.id;
    this.idPlot = config.idPlot;

    this.showYGrids = (config.showYGrids == null) ? true : config.showYGrids;
    this.showXGrids = (config.showXGrids == null) ? true : config.showXGrids;
    this.xMajorTicks = config.xMajorTicks || 4;
    this.xMinorTicks = config.xMinorTicks || 4;
    this.yTicks = config.yTicks || 10;

    this.name = config.name || 'Track';
    this.width = config.width || 120;

    this.drawings = [];
    this.minX = config.minX;
    this.maxX = config.maxX;
    this.minY = config.minY;
    this.maxY = config.maxY;

    this.xDecimal = (config.xDecimal == null) ? 2 : config.xDecimal;
    this.yDecimal = (config.yDecimal == null) ? 2 : config.yDecimal;
    this.scale = config.scale || 'linear';

    this.showLabels = config.showLabels == null ? false : config.showLabels;
    this.showEndLabels = config.showEndLabels == null ? true : config.showEndLabels;
    this.gridColor = 'gray';

    this.curvesRemoved = 0;
}

LogTrack.prototype.getProperties = function() {
    return {
        idTrack: this.id,
        idPlot: this.idPlot,
        orderNum: this.orderNum,
        showTitle: this.showTitle,
        title: this.name,
        topJustification: Utils.capitalize(this.justification),
        bottomJustification: 'Center',
        showLabels: this.showLabels,
        showValueGrid: this.showXGrids,
        showDepthGrid: this.showYGrids,
        majorTicks: this.xMajorTicks,
        minorTicks: this.xMinorTicks,
        width: this.width,
        color: this.bgColor,
        showEndLabels: this.showEndLabels,
        displayType: Utils.capitalize(this.scale)
    }
}

LogTrack.prototype.setProperties = function(props) {
    Utils.setIfNotNull(this, 'id', props.idTrack);
    Utils.setIfNotNull(this, 'idPlot', props.idPlot);
    Utils.setIfNotNull(this, 'orderNum', props.orderNum);
    Utils.setIfNotNull(this, 'showTitle', props.showTitle);
    Utils.setIfNotNull(this, 'name', props.title);
    Utils.setIfNotNull(this, 'justification', Utils.lowercase(props.topJustification));
    Utils.setIfNotNull(this, 'showLabels', props.showLabels);
    Utils.setIfNotNull(this, 'showEndLabels', props.showEndLabels);
    Utils.setIfNotNull(this, 'showXGrids', props.showValueGrid);
    Utils.setIfNotNull(this, 'showYGrids', props.showDepthGrid);
    Utils.setIfNotNull(this, 'xMajorTicks', parseInt(props.majorTicks));
    Utils.setIfNotNull(this, 'xMinorTicks', parseInt(props.minorTicks));
    Utils.setIfNotNull(this, 'width', parseInt(props.width));
    Utils.setIfNotNull(this, 'bgColor', Utils.convertColorToRGB(props.color));
    Utils.setIfNotNull(this, 'scale', Utils.lowercase(props.displayType));
}

/**
 * Get x window of track
 * @returns {Array} Range of actual x values to show
 */
LogTrack.prototype.getWindowX = function() {
    return (this.minX == null || this.maxX == null)
        ? [1, 2]
        : [this.minX, this.maxX];
}

/**
 * Get y window of track
 * @returns {Array} Range of actual y values to show
 */
LogTrack.prototype.getWindowY = function() {
    let windowY = (this.minY != null && this.maxY != null)
        ? [this.minY, this.maxY]
        : [0, 10000];

    windowY[0] = this.offsetY + Utils.roundUp(windowY[0] - this.offsetY, this.yStep);
    windowY[1] = this.offsetY + Utils.roundDown(windowY[1] - this.offsetY, this.yStep);
    return windowY;
}

/**
 * Get x viewport of track
 * @returns {Array} Range of transformed x values to show
 */
LogTrack.prototype.getViewportX = function() {
    return [0, this.plotContainer.node().clientWidth];
}

/**
 * Get y viewport of track
 * @returns {Array} Range of transformed y values to show
 */
LogTrack.prototype.getViewportY = function() {
    return [0, this.plotContainer.node().clientHeight]
}

/**
 * Get current curve object
 * @returns {Object}
 */
LogTrack.prototype.getCurrentCurve = function() {
    let current = this.currentDrawing;
    if (current && current.isCurve()) return current;
    return null;
}

/**
 * Get current shading object
 * @returns {Object}
 */
LogTrack.prototype.getCurrentShading = function() {
    let current = this.currentDrawing;
    if (current && current.isShading()) return current;
    return null;
}

/**
 * Get all the curves
 * @returns {Array}
 */
LogTrack.prototype.getCurves = function() {
    return this.drawings.filter(function(d) {
        return d.isCurve();
    });
}

/**
 * Get all the shadings
 * @returns {Array}
 */
LogTrack.prototype.getShadings = function() {
    return this.drawings.filter(function(d) {
        return d.isShading();
    })
}

/**
 * Get temporary curve to create pair shading
 */
LogTrack.prototype.getTmpCurve = function() {
    return this.tmpCurve;
}

/**
 * Get extent of y value among all drawings, [-1, -1] if there is no drawing
 * @return {Array}
 */
LogTrack.prototype.getExtentY = function() {
    if (this.drawings.length == 0) return [-1, -1];
    let ys = [];
    this.drawings.forEach(function(d) {
        ys = ys.concat(d.getExtentY());
    })
    let minY = Utils.roundDown(d3.min(ys), 100 * this.yStep);
    let maxY = Utils.roundUp(d3.max(ys), 100 * this.yStep);
    return [minY, maxY];
}

/**
 * Set temporary curve to create pair shading
 * @param {Object} curve - The temporary curve
 */
LogTrack.prototype.setTmpCurve = function(curve) {
    let currentCurve = this.getCurrentCurve();
    this.tmpCurve = (currentCurve && curve && curve.isCurve && curve.isCurve()) ? curve : null;
    if (this.tmpCurve) {
        this.plotAllDrawings();
        this.highlightHeader();
    }
}

/**
 * Set current drawing and re-draw to highlight
 * @param {Object} drawing - The drawing to be current
 */
LogTrack.prototype.setCurrentDrawing = function(drawing) {
    this.currentDrawing = drawing;
    this.tmpCurve = null;
    this.plotAllDrawings();
    this.highlightHeader();
}

/**
 * Initialize DOM elements for the track
 * param {Object} domElem - The DOM element to contain the track
 */
LogTrack.prototype.init = function(baseElement) {
    Track.prototype.init.call(this, baseElement);

    let self = this;
    this.plotContainer
        .on('mousedown', function(){
            self.plotMouseDownCallback();
        });

    this.axisContainer = this.plotContainer.append('svg')
        .attr('class', 'vi-track-drawing')
        .style('cursor', 'crosshair')
        .style('overflow', 'visible');

    this.svgContainer = this.plotContainer.append('svg')
        .attr('class', 'vi-track-drawing vi-track-svg-container')
        .style('cursor', 'crosshair')
        .style('overflow', 'visible');

    this.xAxisGroup = this.axisContainer.append('g')
        .attr('class', 'vi-track-axis');

    this.yAxisGroup = this.axisContainer.append('g')
        .attr('class', 'vi-track-axis');
}

/**
 * Draw axes, curves and shadings
 * @param {Boolean} [highlight] - Indicate whether to call highlight callback
 */
LogTrack.prototype.doPlot = function(highlight) {
    Track.prototype.doPlot.call(this, highlight);
    this.plotAllDrawings();
    this.updateAxis();
}


/**
 * Add curve to track
 * @param {Object} data - Array of objects containing x, y coordinates
 * @param {Object} config - Configurations of new curve
 * @param {Number} [config.id] - The id of this line in backend (idLine field)
 * @param {String} [config.name] - Name of new curve. Default: auto generate
 * @param {String} [config.unit] - Unit of data. Default: 'm3'
 * @param {Number} [config.minX] - Mininum x value to show. Default: auto detect
 * @param {Number} [config.maxX] - Maximum x value to show. Default: auto detect
 * @param {String} [config.color] - CSS color of new curve. Default: auto generate
 * @return {Object} The created curve
 */
LogTrack.prototype.addCurve = function(data, config) {
    config.name = config.name || ('Curve ' + (this.getCurves().length + this.curvesRemoved));
    if (!config.line && !config.symbol) {
        config.line = {
            color: this.genColor(),
            width: 1,
            dash: null
        };
    }
    config.data = data;
    config.yStep = config.yStep || this.yStep;
    config.offsetY = config.offsetY || this.offsetY;

    let curve = new Curve(config);

    curve.init(this.plotContainer);
    curve.header = this.addCurveHeader(curve);
    this.drawings.push(curve);

    return curve;
}


/**
 * Add shading to track
 * @param {Object} leftCurve - Left curve, null if drawing left shading
 * @param {Object} rightCurve - Right curve, null if drawing right shading
 * @param {Number} refX - x coordiate of reference line for custom shading
 * @param {Object} config - Configurations of new shading
 * @param {String} [config.name] - Name of new shading. Default: auto generate
 * @param {String} [config.fillStyle] - Canvas fillStyle of new shading. Default: auto generate
 * @returns {Object} The created shading
 */
LogTrack.prototype.addShading = function(leftCurve, rightCurve, refX, config) {
    if (!leftCurve && !rightCurve) return;

    let leftName = leftCurve ? leftCurve.name : 'left';
    let rightName = rightCurve ? rightCurve.name : 'right';
    config.name = config.name || (leftName + ' - ' + rightName);

    if (config.isNegPosFilling == null && !config.fill) {
        config.fill = {
            pattern: {
                name: 'none',
                background: this.genColor(),
                foreground: 'black'
            }
        }
    }
    config.refX = refX;
    config.leftCurve = leftCurve;
    config.rightCurve = rightCurve;
    config.idTrack = this.id;
    let shading = new Shading(config);
    shading.init(this.plotContainer);
    shading.header = this.addShadingHeader(shading);

    let self = this;
    shading.onRefLineDrag(function() {
        let rWidth = shading.refLineWidth;
        let leftMost = rWidth / 2;
        let rightMost = self.plotContainer.node().clientWidth - rWidth / 2;
        let vpRefX = d3.event.x;
        vpRefX = vpRefX > rightMost ? rightMost : vpRefX;
        vpRefX = vpRefX < leftMost ? leftMost : vpRefX;
        shading.refX = shading.getTransformX(shading.selectedCurve).invert(vpRefX);
        self.plotShading(shading);
    });

    this.drawings.push(shading);
    return shading;
}

/**
 * Remove a drawing from track
 * @param {Object} drawing - The curve or shading object to remove
 */
LogTrack.prototype.removeDrawing = function(drawing) {
    if (!drawing) return;
    drawing.destroy();

    let idx = this.drawings.indexOf(drawing);
    this.drawings.splice(idx, 1);

    if (drawing == this.currentDrawing)
        this.currentDrawing = null;
}

/**
 * Remove a curve from track
 * @param {Object} curve - The curve object to remove
 */
LogTrack.prototype.removeCurve = function(curve) {
    if (curve && curve.isCurve())
        this.removeDrawing(curve);
}

/**
 * Remove a shading from track
 * @param {Object} shading - The shading object to remove
 */
LogTrack.prototype.removeShading = function(shading) {
    if (shading && shading.isShading())
        this.removeDrawing(shading);
}

/**
 * Remove curve by its id
 */
LogTrack.prototype.removeCurveById = function(id) {
    let curves = this.getCurves().filter(function(c) {
        return c.id == id;
    });
    this.removeCurve(curves[0]);
}

/**
 * Remove shading by its id
 */
LogTrack.prototype.removeShadingById = function(id) {
    let shadings = this.getShadings().filter(function(sh) {
        return sh.id == id;
    });
    this.removeShading(shadings[0]);
}

LogTrack.prototype.findCurveById = function(id) {
    return this.getCurves().filter(function(c) {
        return c.id == id;
    })[0];
}

LogTrack.prototype.findShadingById = function(id) {
    return this.getShadings().filter(function(sh) {
        return sh.id == id;
    })[0];
}

LogTrack.prototype.findCurves = function(props) {
    return this.getCurves().filter(function(c) {
        let cProps = c.getProperties();
        let match = true;
        Object.keys(props).forEach(function(k) {
            match = match && (cProps[k] == props[k]);
        });
        return match;
    });
}

LogTrack.prototype.findShadings = function(props) {
    return this.getShadings().filter(function(sh) {
        let shProps = sh.getProperties();
        let match = true;
        Object.keys(props).forEach(function(k) {
            match = match && (shProps[k] == props[k]);
        });
        return match;
    });
}

/**
 * Remove current curve from track
 */
LogTrack.prototype.removeCurrentCurve = function() {
    this.removeCurve(this.currentDrawing);
}

/**
 * Remove current shading from track
 */
LogTrack.prototype.removeCurrentShading = function() {
    this.removeShading(this.currentDrawing);
}

/**
 * Remove current drawing (curve or shading) from track
 */
LogTrack.prototype.removeCurrentDrawing = function() {
    this.removeDrawing(this.currentDrawing);
}

/**
 * Remove all drawings from (curves and shadings) from track
 */
LogTrack.prototype.removeAllDrawings = function() {
    this.currentDrawing = null;
    this.drawings.forEach(function(d) {
        d.destroy();
    });
    this.drawings = [];
}

/**
 * Plot one draw (curve or shading)
 * @param {Object} drawing - The drawing to plot
 */
LogTrack.prototype.plotDrawing = function(drawing) {
    if (!drawing || !drawing.doPlot) return;
    let windowY = this.getWindowY();
    drawing.minY = windowY[0];
    drawing.maxY = windowY[1];
    if (drawing == this.currentDrawing || drawing == this.tmpCurve) {
        drawing.doPlot(true);
        drawing.raise();
    }
    else {
        drawing.doPlot();
    }
    this.svgContainer.raise();
}

/**
 * Plot one curve
 * @param {Object} curve - The curve to plot
 */
LogTrack.prototype.plotCurve = function(curve) {
    if (!curve || !curve.isCurve || !curve.isCurve()) return;
    this.plotDrawing(curve);
}

/**
 * Plot one shading
 * @param {Object} shading - The shading to plot
 */
LogTrack.prototype.plotShading = function(shading) {
    if (!shading || !shading.isShading || !shading.isShading()) return;
    this.plotDrawing(shading);
}

/**
 * Plot all drawings (curves and shadings)
 */
LogTrack.prototype.plotAllDrawings = function() {
    let self = this;
    this.drawings.forEach(function(d) {
        self.plotDrawing(d);
    });
}

/**
 * Register event when mouse over the plot area
 */
LogTrack.prototype.onPlotMouseOver = function(cb){
    this.plotContainer
        .on('mouseover', cb);
}

/**
 * Register event when mouse leave the plot area
 */
LogTrack.prototype.onPlotMouseLeave = function(cb) {
    this.plotContainer
        .on('mouseleave', cb);
}

/**
 * Register event when mouse wheel on the plot area
 */
LogTrack.prototype.onPlotMouseWheel = function(cb) {
    this.plotContainer
        .on('mousewheel', cb);
}

/**
 * Register event when mouse down the plot area
 */
LogTrack.prototype.onPlotMouseDown = function(cb) {
    let self = this;
    this.plotContainer
        .on('mousedown', function() {
            self.plotMouseDownCallback();
            cb();
        })
        .on('contextmenu', cb);
}

/**
 * Register event when double click the plot area
 */
LogTrack.prototype.onPlotDoubleClick = function(cb) {
    let self = this;
    this.plotContainer
        .on('dblclick', function() {
            self.plotMouseDownCallback();
            cb();
        });
}

/**
 * Register event when mouse down the header area
 */
LogTrack.prototype.onHeaderMouseDown = function(cb) {
    this.headerContainer
        .on('mousedown',cb);
}

/**
 * Register event when mouse down the shading header area
 */
LogTrack.prototype.onShadingHeaderMouseDown = function(shading, cb) {
    if (!shading) return;
    let self = this;
    shading.header
        .on('mousedown', function() {
            self.drawingHeaderMouseDownCallback(shading);
            cb();
        });
}

/**
 * Register event when mouse down the curve header area
 */
LogTrack.prototype.onCurveHeaderMouseDown = function(curve, cb) {
    if (!curve) return;
    let self = this;
    curve.header
        .on('mousedown', function() {
            self.drawingHeaderMouseDownCallback(curve);
            cb();
        });
}

LogTrack.prototype.getTransformX = function() {
    let self = this;
    let rangeX = this.getViewportX();
    let windowX = this.getWindowX();

    function transformX(x) {
        let majorStep = (windowX[1] - windowX[0]) / (self.xMajorTicks || 1);
        let majorTransformX = d3.scaleLinear()
            .domain(windowX)
            .range(rangeX);
        if ((x - windowX[0]) % majorStep < 0.0001) {
            return majorTransformX(x);
        }
        else {
            let leftSide = windowX[0] + Utils.roundDown(x - windowX[0], majorStep);
            let minorTransformX = Utils.getScaleFunc(self.scale)
                .domain([0.01, majorStep + 0.01])
                .range([0, majorTransformX(windowX[0] + majorStep) - rangeX[0]]);
            return majorTransformX(leftSide) + minorTransformX(x - leftSide + 0.01);
        }
    }

    transformX.range = function() { return rangeX };
    transformX.domain = function() { return windowX };
    transformX.copy = function() { return transformX };

    return transformX;
}

LogTrack.prototype.getTransformY = function() {
    return d3.scaleLinear()
        .domain(this.getWindowY())
        .range(this.getViewportY());
}

/**
 * Update axis or create new if not exist
 */
LogTrack.prototype.updateAxis = function() {
    let self = this;
    let rect = this.plotContainer.node().getBoundingClientRect();
    let windowY = this.getWindowY();
    let windowX = this.getWindowX();

    let xAxis = d3.axisTop(this.getTransformX())
        .tickValues(d3.range(windowX[0], windowX[1], (windowX[1] - windowX[0]) / (this.xMajorTicks * this.xMinorTicks || 1)))
        .tickFormat('')
        .tickSize(-rect.height);

    let start = windowY[0];
    let end = windowY[1];
    let step = (end - start) / this.yTicks;

    let yAxis = d3.axisLeft(this.getTransformY())
        .tickValues(d3.range(start, end + step / 2, step))
        .tickFormat(this.showLabels ? this.getDecimalFormatter(this.yDecimal) : '')
        .tickSize(-rect.width);

    this.xAxisGroup.call(xAxis);
    this.yAxisGroup.call(yAxis);

    this.xAxisGroup
        .style('display', this.showXGrids ? 'block' : 'none');

    this.yAxisGroup
        .style('display', this.showYGrids ? 'block' : 'none')
        .selectAll('.tick text')
            .attr('x', function(d, i) {
                let parentWidth = self.plotContainer.node().clientWidth;
                let textWidth = this.clientWidth;
                let x = (parentWidth + textWidth) / 2;
                return x;
            })
            .style('display', function(d, i) {
                return ((i == 0 || i == self.yTicks) && !self.showEndLabels) ? 'none' : 'block';
            });

    this.bodyContainer.selectAll('.tick line')
        .attr('stroke', this.gridColor)
        .attr('stroke-dasharray', '20, 2')
        .attr('stroke-opacity', 0.8)
        .attr('stroke-width', 1);

    this.xAxisGroup.selectAll('.tick line')
        .attr('stroke-opacity', function(d, i) {
            return (!self.xMinorTicks || i % self.xMinorTicks == 0) ? 0.8 : 0.3;
        });
}

LogTrack.prototype.updateHeader = function() {
    Track.prototype.updateHeader.call(this);
}

LogTrack.prototype.updateBody = function() {
    let rect = this.plotContainer
        .style('top', this.yPadding + 'px')
        .style('bottom', this.yPadding + 'px')
        .style('left', this.xPadding + 'px')
        .style('right', this.xPadding + 'px')
        .node()
        .getBoundingClientRect();

    this.svgContainer
        .attr('width', rect.width)
        .attr('height', rect.height);

    this.axisContainer
        .attr('width', rect.width)
        .attr('height', rect.height);
}

LogTrack.prototype.genColor = function() {
    function rand(x) {
        return Math.floor(Math.random() * x);
    }

    const DEFAULT_COLORS = ['Blue', 'Brown', 'Green', 'DarkGoldenRod', 'DimGray', 'Indigo', 'Navy'];
    let usedColors = [];
    this.drawings.forEach(function(d) {
        usedColors = usedColors.concat(d.getAllColors());
    });

    let color;
    for (let i = 0; i <= this.drawings.length; i++)  {
        if (i >= DEFAULT_COLORS.length) {
            do {
                color = d3.rgb(rand(255), rand(255), rand(255)).toString();
            }
            while (usedColors.indexOf(color) >= 0);
        }
        else color = d3.color(DEFAULT_COLORS[i]).toString();
        if (usedColors.indexOf(color) < 0) break;
    }
    return color;
}

LogTrack.prototype.addCurveHeader = function(curve) {
    let self = this;
    let curveHeader = this.drawingHeaderContainer
        .append('div')
            .attr('class', 'vi-curve-header')
            .on('mousedown', function() {
                self.drawingHeaderMouseDownCallback(curve);
            });

    curveHeader.append('div')
        .attr('class', 'vi-curve-name')
        .style('border', this.HEADER_ITEM_BORDER_WIDTH + 'px solid black')
        .style('margin-bottom', this.HEADER_ITEM_MARGIN_BOTTOM + 'px')
        .style('cursor', 'default')
        .text(name);

    curveHeader.append('div')
        .attr('class', 'vi-curve-data')
        .style('border', this.HEADER_ITEM_BORDER_WIDTH + 'px solid black')
        .style('margin-bottom', this.HEADER_ITEM_MARGIN_BOTTOM + 'px')
        .style('cursor', 'default')
        .style('position', 'relative')
        .style('display', 'flex')
        .style('flex-direction', 'row')
        .selectAll('div')
        .data(['min', 'unit', 'max'])
        .enter()
        .append('div')
            .style('padding', '0 2px')
            .style('text-align', function(d, i) {
                switch(i) {
                    case 0:
                        return 'left';
                    case 1:
                        return 'center';
                    case 2:
                        return 'right';
                }
                return '';
            })
            .style('flex', function(d, i) {
                return i == 1 ? 1 : 0;
            })
            .text(function(d) { return d; });
    return curveHeader;
}

LogTrack.prototype.addShadingHeader = function(shading) {
    let self = this;

    let header = this.drawingHeaderContainer.append('div')
        .attr('class', 'vi-shading-header')
        .style('position', 'relative')
        .style('padding', '2px 0 2px 0')
        .style('border', this.HEADER_ITEM_BORDER_WIDTH + 'px solid black')
        .style('margin-bottom', this.HEADER_ITEM_MARGIN_BOTTOM + 'px')
        .on('mousedown', function() {
            self.drawingHeaderMouseDownCallback(shading);
        });

    let nameBlock = header.append('div')
        .attr('class', 'vi-shading-name')
        .style('display', 'inline-block')
        .style('position', 'relative')
        .style('text-align', 'center')
        .style('background-color', 'white')
        .style('border', '1px solid black')
        .style('padding', '0 2px 0 2px')
        .style('font-size', '10px')
        .style('z-index', 1)
        .style('cursor', 'default')
        .text(name);

    let rect = header.node().getBoundingClientRect();
    let headerCanvas = header.append('canvas')
        .attr('class', 'vi-shading-header-canvas')
        .attr('width', rect.width)
        .attr('height', rect.height)
        .style('position', 'absolute')
        .style('top', 0)
        .style('left', 0);

    return header;
}

LogTrack.prototype.highlightHeader = function() {
    let self = this;
    this.drawings.forEach(function(d, i) {
        let elem, bgColor;
        if (d.isCurve()) {
            elem = d.header;
            bgColor = (d == self.currentDrawing || d == self.tmpCurve) ? self.HEADER_HIGHLIGHT_COLOR : 'transparent';
        }
        else if (d.isShading()) {
            elem = d.header.select('.vi-shading-name');
            bgColor = d == self.currentDrawing ? self.HEADER_HIGHLIGHT_COLOR : 'white';
        }
        else return;
        elem.style('background-color', bgColor);
    });
}


LogTrack.prototype.drawingHeaderMouseDownCallback = function(drawing) {
    if (d3.event.ctrlKey) {
        this.setTmpCurve(drawing);
    }
    else {
        this.setCurrentDrawing(drawing);
    }
}

LogTrack.prototype.plotMouseDownCallback = function() {
    let current = null;
    let x = d3.event.offsetX;
    let y = d3.event.offsetY;

    if (this.currentDrawing && this.currentDrawing.nearPoint(x, y)) {
        d3.event.currentDrawing = this.currentDrawing;
        return;
    }
    this.getShadings().concat(this.getCurves()).forEach(function(d) {
        if (!current && d.nearPoint(x, y)) {
            current = d;
            d3.event.currentDrawing = current;
        }
    });

    // Current drawing is already set when mouse down
    if (d3.event.type == 'dblclick') return;

    if (d3.event.ctrlKey) {
        this.setTmpCurve(current);
    }
    else {
        this.setCurrentDrawing(current);
    }
}

LogTrack.prototype.drawTooltipText = function(svgDom) {
    let plotMouse = d3.mouse(this.plotContainer.node());
    let svgMouse = d3.mouse(svgDom);
    let plotX = plotMouse[0];
    let plotY = plotMouse[1];
    let svgX = svgMouse[0];
    let svgY = svgMouse[1];
    let svg = d3.select(svgDom);

    svg.selectAll('text.tooltip-text, rect.tooltip-rect').remove();

    let tooltip = svg.append('text')
        .attr('class', 'tooltip-text')
        .attr('y', svgY)
        .attr('font-size', '10');

    let xFormatter = this.getDecimalFormatter(this.xDecimal);
    let yFormatter = this.getDecimalFormatter(this.yDecimal);

    let textData = ['Depth: ' + yFormatter(this.getTransformY().invert(plotY))];
    this.getCurves().forEach(function(curve) {
        let curveY = curve.getTransformY().invert(plotY);
        curveY = curve.offsetY + Utils.round(curveY - curve.offsetY, curve.yStep);

        let value = curve.dataMap[curveY];
        value = value == null ? null : xFormatter(value);
        textData.push(curve.alias + ': ' + value);
    })

    tooltip.selectAll('tspan')
        .data(textData)
        .enter()
        .append('tspan')
            .attr('dy', '1.2em')
            .attr('x', svgX)
            .text(function(d) { return d; });

    let bbox = tooltip.node().getBBox();
    let offset = 10;
    let rectX = bbox.x + offset;
    let rectY = bbox.y - offset - bbox.height;

    if (rectY - this.headerContainer.node().clientHeight < 0)
        rectY = bbox.y + 2;
    if (rectX + bbox.width > svgDom.clientWidth)
        rectX = bbox.x - offset - bbox.width;

    tooltip.attr('y', rectY).selectAll('tspan').attr('x', rectX);

    bbox = tooltip.node().getBBox();
    let padding = 2;
    let rect = svg.append('rect')
        .attr('class', 'tooltip-rect')
        .attr('x', bbox.x - padding)
        .attr('y', bbox.y - padding)
        .attr('width', bbox.width + padding)
        .attr('height', bbox.height + padding)
        .style('stroke', '#666')
        .style('stroke-width', '1px')
        .style('fill', 'ffffa0');
    tooltip.raise();
}

LogTrack.prototype.removeTooltipText = function(svgDom) {
    d3.select(svgDom).selectAll('text.tooltip-text, rect.tooltip-rect').remove();
}

// const trackerLifetime = 1 * 1000; // 1 seconds
// this.periodicTask = function() {
//     if( Date.now() - freshness > trackerLifetime )
//         svg.selectAll('.wi-tooltip, .tooltipBg, .tooltipLine').remove();
// }
