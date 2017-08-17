let Utils = require('./visualize-utils');
let Track = require('./visualize-track');

module.exports = ZoneTrack;

Utils.extend(Track, ZoneTrack);

/**
 * Represents a zone track
 * @constructor
 * @param {Object} config - Contain configurations.
 * @param {Number} [config.id] - The id of this track in backend (idZoneTrack field)
 * @param {String} [config.type] - The type of this track ('depth-track' or 'log-track' or 'zone-track')
 * @param {Boolean} [config.showTitle] - Flag to indicate whether to show title
 * @param {Boolean} [config.justification] - Alignment of the title (left, center, right)
 * @param {String} [config.name] - Name of the track
 * @param {Number} [config.width] - Width in pixel of the bounding rectangle. Default: 60
 * @param {Number} [config.minY] - Min y value to show
 * @param {Number} [config.maxY] - Max y value to show
 * @param {String} [config.bgColor] - Background color for the track
 * @param {Number} [config.yDecimal] - Precision of float number. Default: 2
 * @param {Number} [config.idZoneSet] - The id of the zoneset in backend
 * @param {Number} [config.nameZoneSet] - The name of the zoneset
 * @param {Array} [config.zones] - Visualize zones in this zoneset
 * @param {Number} [config.xPadding] - Horizontal padding for inner drawings. Default: 1
 * @param {Number} [config.yPadding] - Vertical padding for inner drawings. Default: 5
 */
function ZoneTrack(config) {
    Track.call(this, config);
    this.MIN_WIDTH = 60;

    this.id = config.id;
    this.name = config.name || 'Zone';
    this.width = config.width || 60;
    this.minY = config.minY;
    this.maxY = config.maxY;
    this.yDecimal = (config.decimal == null) ? 2 : config.decimal;

    this.idZoneSet = config.idZoneSet;
    this.nameZoneSet = config.nameZoneSet;
    this.zones = config.zones || []; // Array of visualize zones
}

/**
 * @returns {Object} Params to send to backend
 */
ZoneTrack.prototype.getProperties = function() {
    return {
        idZoneTrack: this.id,
        title: this.name,
        showTitle: this.showTitle,
        topJustification: Utils.capitalize(this.justification),
        bottomJustification: 'Center',
        color: Utils.convertColorToRGB(this.color),
        width: this.width,
        nameZoneSet: this.nameZoneSet,
        idZoneSet: this.idZoneSet
    }
}

/**
 * @param {Object} props - New properties of zone track
 */
ZoneTrack.prototype.setProperties = function(props) {
    Utils.setIfNotNull(this, 'id', props.idZoneTrack);
    Utils.setIfNotNull(this, 'name', props.title);
    Utils.setIfNotNull(this, 'showTitle', props.showTitle);
    Utils.setIfNotNull(this, 'justification', Utils.lowercase(props.topJustification));
    Utils.setIfNotNull(this, 'color', Utils.convertColorToRGB(props.color));
    Utils.setIfNotNull(this, 'width', props.width);
    Utils.setIfNotNull(this, 'nameZoneSet', props.nameZoneSet);
    Utils.setIfNotNull(this, 'idZoneSet', props.idZoneSet);

    let self = this;
    if (!props.zones) return;
    props.zones.forEach(function(z) {
        self.addZone(z);
    })
}

/**
 * @returns {Array} All visualize zones in this track
 */
ZoneTrack.prototype.getZones = function() {
    return this.zones;
}

/**
 * Initialize DOM elements for the track
 * param {Object} domElem - The DOM element to contain the track
 */
ZoneTrack.prototype.init = function(baseElement) {
    Track.prototype.init.call(this, baseElement);

    this.svgContainer = this.plotContainer.append('svg')
        .attr('class', 'vi-track-drawing vi-track-svg-container');
}


/**
 * Actually draw the track
 * @param {Boolean} [highlight] - Indicate whether to call highlight callback
 */
ZoneTrack.prototype.doPlot = function(highlight) {
    Track.prototype.doPlot.call(this, highlight);
    this.updateAllZones();
}

/**
 * Plot all zones
 */
ZoneTrack.prototype.plotAllZones = function() {
    let self = this;
    this.zones.forEach(function(z) {
        self.plotZone(z);
    });
}

/**
 * Plot a specific zone
 */
ZoneTrack.prototype.plotZone = function(zone) {

}
