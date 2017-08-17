let Utils = require('./visualize-utils');
let Drawing = require('./visualize-drawing');

module.exports = Zone;

Utils.extend(Drawing, Zone);

function Zone(config) {
    Drawing.call(this, config);

    this.id = config.idZone;
    this.idZoneSet = config.idZoneSet;
    this.idZoneTrack = config.idZoneTrack;
    this.fill = config.fill;

    this.name = config.name || 'Zone';
    this.showName = config.showName == null ? true : config.showName;
}

Zone.prototype.getProperties = function() {
    return {
        idZone: this.id,
        idZoneSet: this.idZoneSet,
        idZoneTrack: this.idZoneTrack,
        name: this.name,
        showName: this.showName,
        startDepth: this.minY,
        endDepth: this.maxY,
        fill: this.fill
    }
}

Zone.prototype.setProperties = function(props) {
    Utils.setIfNotNull(this, 'id', props.idZone);
    Utils.setIfNotNull(this, 'idZoneSet', props.idZoneSet);
    Utils.setIfNotNull(this, 'idZoneTrack', props.idZoneTrack);
    Utils.setIfNotNull(this, 'name', props.name);
    Utils.setIfNotNull(this, 'showName', props.showName);
    Utils.setIfNotNull(this, 'minY', props.startDepth);
    Utils.setIfNotNull(this, 'maxY', props.endDepth);
    Utils.setIfNotNull(this, 'fill', Utils.isJson(props.fill) ? JSON.parse(props.fill) : props.fill);
}

Zone.prototype.init = function(plotContainer) {
    Drawing.prototype.init.call(this, plotContainer);

    this.svgGroup = plotContainer.select('.vi-track-svg-container')
        .append('g.vi-track-svg-group');

    this.rect = this.svgGroup.append('rect')
        .attr('x', 0);
        .attr('y', 0);
        .attr('width', 0);
        .attr('height', 0);
}

Zone.prototype.doPlot = function(highlight) {
    if (this.minY == null || this.maxY == null) return;

    let transformY = this.getTransformY();
    let viewportX = this.getViewportX();
    let x1 = viewportX[0];
    let x2 = viewportX[1];

    this.lines = this.svgGroup.selectAll('line')
        .data([
            { x1: viewportX[0], y1: 0, x2: 0, y2: 0 },
            { x1: 0, y1: 0, x2: 0, y2: 0 }
        ]);

    this.lines.enter().append('line');
    this.lines
        .attr('x1', function(d) { return d.x1; })
        .attr('x2', function(d) { return d.x2; })
        .attr('y1', function(d) { return d.y1; })
        .attr('y2', function(d) { return d.y2; });
}
