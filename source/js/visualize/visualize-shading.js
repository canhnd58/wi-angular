let Utils = require('./visualize-utils');
let Drawing = require('./visualize-drawing');

module.exports = Shading;

Utils.extend(Drawing, Shading);

/**
 * Represents a Shading
 * @constructor
 * @param {Object} config - Configurations of new shading
 * @param {Number} [config.id] - Id of the shading
 * @param {String} [config.name] - Name of new shading
 * @param {Object} [config.leftCurve] - Left side of the shading, null if plotting left shading
 * @param {Object} [config.rightCurve] - Right side of the shading, null if plotting right shading
 * @param {Object} [config.selectedCurve] - The curve to compare values against
 * @param {Number} [config.refX] - x coordiate of reference line for custom shading
 * @param {Number} [config.leftX] - Fix value of left curve
 * @param {Number} [config.rightX] - Fix value of right curve
 * @param {Number} [config.minY] - Mininum y value to show
 * @param {Number} [config.maxY] - Maximum y value to show
 * @param {Object} [config.fill] - Configurations of fill style (contain only one key: color, pattern, or gradient)
 * @param {String} [config.fill.color]
 * @param {Object} [config.fill.pattern]
 * @param {String} [config.fill.pattern.name]
 * @param {String} [config.fill.pattern.foreground]
 * @param {String} [config.fill.pattern.background]
 * @param {Object} [config.fill.gradient]
 * @param {Number} [config.fill.gradient.startX]
 * @param {Number} [config.fill.gradient.endX]
 * @param {String} [config.fill.gradient.startColor]
 * @param {String} [config.fill.gradient.endColor]
 * @param {Boolean} [config.isNegPosFilling] - Indicate whether to plot with negative and positive styles
 * @param {Object} [config.negativeFill] - Configurations of fill style for negative values
 * @param {Object} [config.positiveFill] - Configurations of fill style for positive values
 * @param {Number} [config.refLineWidth] - Width in pixel of reference line
 * @param {String} [config.refLineColor] - Color of reference line
 * @param {Boolean} [config.showRefLine] - Indicate whether to plot reference line
 */
function Shading(config) {
    Drawing.call(this);
    if (typeof config != 'object') config = {};

    this.id = config.id;
    this.name = config.name || 'Noname';

    this.fill = config.fill;
    this.negativeFill = config.negativeFill;
    this.positiveFill = config.positiveFill;
    this.isNegPosFilling = config.isNegPosFilling;

    this.leftCurve = config.leftCurve;
    this.rightCurve = config.rightCurve;
    this.refX = config.refX;
    this.leftX = config.leftX;
    this.rightX = config.rightX;

    this.minY = config.minY;
    this.maxY = config.maxY;

    this.refLineWidth = config.refLineWidth || 2;
    this.refLineColor = config.refLineColor || '#3e3e3e';
    this.showRefLine = config.showRefLine;

    this.vpX = {
        left: null,
        right: null,
        ref: null
    };

    this.leftCurve = config.leftCurve;
    this.rightCurve = config.rightCurve;
    this.selectedCurve = config.selectedCurve || this.leftCurve || this.rightCurve;

    if (this.showRefLine == null && this.refX != null) {
        this.showRefLine = true;
    }

    if (this.refX == null){
        this.refX = (this.leftCurve && !this.rightCurve)
            ? this.selectedCurve.maxX
            : this.selectedCurve.minX;
    }
}

/**
 * Get y window of shading
 * @returns {Array} Range of y values to show
 */
Shading.prototype.getWindowY = function() {
    return [this.minY, this.maxY];
}

/**
 * Get y extent of shading
 * @returns {Array}
 */
Shading.prototype.getExtentY = function() {
    let ys = [];
    if (this.leftCurve) ys = ys.concat(this.leftCurve.getExtentY());
    if (this.rightCurve) ys = ys.concat(this.rightCurve.getExtentY());
    return [d3.min(ys), d3.max(ys)];
}

/**
 * Initialize DOM elements
 * @param {Object} plotContainer - The DOM element to contain the shading
 * @param {Object} leftCurve - Left curve, null if drawing left shading
 * @param {Object} rightCurve - Right curve, null if drawing right shading
 */
Shading.prototype.init = function(plotContainer) {
    let self = this;
    this.root = plotContainer;

    this.canvas = plotContainer.append('canvas')
        .attr('class', 'vi-track-drawing')
        .style('cursor', 'crosshair')
        .style('position', 'absolute');

    this.ctx = this.canvas.node().getContext('2d');
    this.svg = plotContainer.select('svg');

    this.refLine = this.svg.append('line')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', 0)
        .style('cursor', 'col-resize')
        .style('z-index', 2);

    return this;
}

/**
 * Destroy DOM element of the shading
 */
Shading.prototype.destroy = function() {
    Drawing.prototype.destroy.call(this);
    this.refLine.remove();
}

/**
 * Adjust shading when bounding rectangle changes
 * @param {Object} rect - The bounding rectangle
 */
Shading.prototype.adjustSize = function(rect) {
    let vpRefX = this.getTransformX(this.selectedCurve)(this.refX);
    this.refLine
        .attr('x1', vpRefX)
        .attr('x2', vpRefX);
    Drawing.prototype.adjustSize.call(this, rect);
    return this;
}

/**
 * Check if the shading near a point
 * @param {Number} x - x coordinate of the point
 * @param {Number} y - y coordinate of the point
 * @returns {Boolean}
 */
Shading.prototype.nearPoint = function(x, y) {
    return Drawing.prototype.nearPoint.call(this, x, y, 1);
}

/**
 * Get all colors used by the shading
 * @returns {Array}
 */
Shading.prototype.getAllColors = function() {
    let colors = [];
    let fills = [this.fill, this.negativeFill, this.positiveFill];

    fills.forEach(function(f) {
        if (f && f.color && d3.color(f.color))
            colors.push(d3.color(f.color).toString());
    });
    return colors;
}

/**
 * Actually draw the shading
 * @param {Boolean} highlight
 */
Shading.prototype.doPlot = function(highlight) {
    if (!this.leftCurve && !this.rightCurve) return;
    let rect = this.root.node().getBoundingClientRect();
    this.adjustSize(rect);

    let leftData = this.prepareData(this.leftCurve);
    let rightData = this.prepareData(this.rightCurve).reverse();
    let vpRefX = this.vpX.ref = this.getTransformX(this.selectedCurve)(this.refX);
    let vpLeftX = this.vpX.left;
    let vpRightX = this.vpX.right;

    leftData = (vpLeftX == null && leftData.length > 0) ? leftData : [
            {x: vpLeftX == null ? vpRefX : vpLeftX, y: 0},
            {x: vpLeftX == null ? vpRefX : vpLeftX, y: rect.height}
        ];
    rightData = (vpRightX == null && rightData.length > 0) ? rightData : [
            {x: vpRightX == null ? vpRefX : vpRightX, y: rect.height},
            {x: vpRightX == null ? vpRefX : vpRightX, y: 0}
        ];
    let plotSamples = leftData.concat(rightData);
    if (plotSamples.length == 0) return;

    let ctx = this.ctx;
    let self = this;

    Utils.createFillStyles(this.ctx, [this.fill, this.positiveFill, this.negativeFill], function(fillStyles) {
        let fill = fillStyles[0];
        let posFill = fillStyles[1];
        let negFill = fillStyles[2];

        if (!self.isNegPosFilling) {
            posFill = negFill = fill;
        }

        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.lineWidth = 0;
        // Draw negative regions
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = negFill;
        drawCurveLine(ctx, plotSamples);
        ctx.clip();
        ctx.fillRect(0, 0, vpRefX, rect.height);
        ctx.restore();

        // Draw postive regions
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = posFill;
        drawCurveLine(ctx, plotSamples);
        ctx.clip();
        ctx.fillRect(vpRefX, 0, rect.width - vpRefX, rect.height);
        ctx.restore();

        drawHeader(self);
        drawRefLine(self);
    });
    return this;
}

/**
 * Register drag event on ref line
 * @param {Function} cb - Callback function
 */
Shading.prototype.onRefLineDrag = function(cb) {
    this.refLine.call(d3.drag().on('drag', cb));
    return this;
}

Shading.prototype.prepareData = function(curve) {
    if (!curve) return [];
    let rect = this.root
        .node()
        .getBoundingClientRect();

    let windowY = this.getWindowY();
    let scaleX = curve.getScaleFunc();
    let transformX = scaleX()
        .domain(curve.getWindowX())
        .range([0, rect.width]);

    let transformY = d3.scaleLinear()
        .domain(windowY)
        .range([0, rect.height]);

    if (curve == this.leftCurve && this.leftX != null)
        this.vpX.left = transformX(this.leftX);

    if (curve == this.rightCurve && this.rightX != null)
        this.vpX.right = transformX(this.rightX);

    let self = this;
    let data = curve.data
        .filter(function(item) {
            return Utils.isWithinYRange(item, windowY);
        })
        .map(function(item) {
            return {
                x: transformX(item.x),
                y: transformY(item.y)
            }
        });
    return data.slice();
}

Shading.prototype.getTransformX = function(curve) {
    return curve.getScaleFunc()()
        .domain(curve.getWindowX())
        .range([0, this.root.node().clientWidth]);
}

function drawCurveLine(ctx, data) {
    ctx.moveTo(data[0].x, data[0].y);
    data.forEach(function(item) {
        ctx.lineTo(item.x, item.y);
    });
}

function drawRefLine(shading) {
    if (shading.vpX.ref < 0 || shading.vpX.ref > shading.root.node().clientWidth)
        return;

    shading.refLine
        .attr('x1', shading.vpX.ref)
        .attr('x2', shading.vpX.ref)
        .attr('y1', 0)
        .attr('y2', shading.root.node().clientHeight)
        .attr('stroke', shading.refLineColor)
        .attr('stroke-width', shading.refLineWidth)
        .style('display', shading.showRefLine ? 'block' : 'none')
        .raise();
}

function drawHeader(shading) {
    let header = shading.header;
    if (!header) return;
    header
        .select('.vi-shading-name')
        .text(shading.name);

    let rect = header.node().getBoundingClientRect();
    let width = rect.width -2;
    let height = rect.height -2;
    let hCanvas = header
        .select('canvas')
        .attr('width', width)
        .attr('height', height)

    let hCtx = hCanvas.node().getContext('2d');
    Utils.createFillStyles(hCtx, [shading.fill, shading.positiveFill, shading.negativeFill], function(fillStyles) {
        hCtx.save();
        if (shading.isNegPosFilling) {
            hCtx.fillStyle = fillStyles[2];
            hCtx.fillRect(0, 0, width / 2, height);
            hCtx.fillStyle = fillStyles[1];
            hCtx.fillRect(width / 2, 0, width / 2, height);
        }
        else {
            hCtx.fillStyle = fillStyles[0];
            hCtx.fillRect(0, 0, width, height);
        }
        hCtx.restore();
        hCanvas.lower();
    });
}
