let wiButton = require('./wi-button.js');
let wiToolbar = require('./wi-toolbar.js');
let wiSlidingbar = require('./wi-slidingbar.js');
let wiContextMenu = require('./wi-context-menu.js');
let wiDropdown = require('./wi-dropdown');

let graph = require('./visualize/visualize.js');
let wiD3 = require('./wi-d3.js');
let wiD3Crossplot = require('./wi-d3-crossplot');
let wiCrossplot = require('./wi-crossplot');
let wiLogplot = require('./wi-logplot.js');
let wiExplorer = require('./wi-explorer');
let wiProperties = require('./wi-properties');
let wiElementReadyDirective = require('./wi-element-ready');

let wiRightClick = require('./wi-right-click');

let wiComponentService = require('./wi-component-service');
let wiApiService = require('./wi-api-service');
let wiTreeConfig = require('./wi-tree-config.model');
let wiTreeItem = require('./wi-tree-item.model');
let wiWell = require('./wi-well.model');
let wiProperty = require('./wi-property.model');
let wiListview = require('./wi-listview.model');
let wiDataset = require('./wi-dataset.model');
let wiDepth = require('./wi-depth.model');
let wiCurve = require('./wi-curve.model');
let wiLogplotsModel = require('./wi-logplots.model');
let wiLogplotModel = require('./wi-logplot.model');

let utils = require('./utils');

let dragMan = {
    dragging: false,
    draggedObj: null,
    cancelingId: null
};


let app = angular.module('helloapp', [
    wiLogplot.name,
    wiCrossplot.name,
    wiButton.name,
    wiToolbar.name,
    wiSlidingbar.name,
    wiContextMenu.name,
    wiD3.name,
    wiD3Crossplot.name,
    wiComponentService.name,
    wiElementReadyDirective.name,
    'angularModalService',
    'ngFileUpload',
    wiDropdown.name,
    wiApiService.name,
    wiExplorer.name,
    wiProperties.name,
    wiWell.name,
    wiTreeItem.name,
    wiTreeConfig.name,
    wiProperty.name,
    wiListview.name,
    wiDataset.name,
    wiCurve.name,
    wiDepth.name,
    wiLogplotModel.name,
    wiLogplotsModel.name
]);

app.controller('WiDummy', function ($scope, wiComponentService) {
    wiComponentService.putComponent("GRAPH", graph);
    wiComponentService.putComponent("UTILS", utils);
    wiComponentService.putComponent('DRAG_MAN', dragMan);

    let functionBindingProp = {
        wiComponentService
    };
    utils.setGlobalObj(functionBindingProp);

    var wiD3Ctrl = null;
    wiComponentService.on('myPlotD3Area', function(param) {
        wiD3Ctrl = wiComponentService.getComponent('myPlotD3Area');
    });

    $scope.depthTrackButtonClick = function() {
        wiD3Ctrl.pushDepthTrack({
            orderNum: '0'
        });
    }

    $scope.trackButtonClick = function() {
        wiD3Ctrl.pushLogTrack({
            orderNum: '1'
        });
    }

    $scope.addData1ButtonClick = function() {
        let track = wiD3Ctrl.getCurrentTrack();
        let data = genSamples([0,1], [0,1000]).map(function(d) {
            return {
                x: (d.y > 100 && d.y < 200) ? null : d.x,
                y: d.y
            }
        })
        wiD3Ctrl.addCurveToTrack(track, data, {
            symbol: {
                style: 'circle'
            },
            line: {
                color: 'green'
            }
        });
    }

    $scope.addData2ButtonClick = function() {
        let track = wiD3Ctrl.getCurrentTrack();
        let data = genSamples([1,2], [0,1100]).map(function(d) {
            return {
                x: (d.y > 150 && d.y < 250) ? null : d.x,
                y: d.y
            }
        })
        wiD3Ctrl.addCurveToTrack(track, data, {
            wrapMode: 'both',
            minX: 1.2,
            maxX: 1.8
        });
    }

    $scope.changeColor = function() {
        wiD3Ctrl.setColor(wiD3Ctrl.getCurrentTrack(), $scope.color);
    }

    $scope.removeCurveButtonClick = function() {
        let track = wiD3Ctrl.getCurrentTrack();
        track.removeCurrentCurve();
    }

    $scope.removeTrackButtonClick = function() {
        wiD3Ctrl.removeTrack(wiD3Ctrl.getCurrentTrack());
    }

    $scope.addLeftShadingButtonClick = function() {
        let track = wiD3Ctrl.getCurrentTrack();
        wiD3Ctrl.addLeftShadingToTrack(track, track.getCurrentCurve(), {
            fill: {
                gradient: {
                    startColor: 'red',
                    endColor: 'blue',
                    startX: 1,
                    endX: 2
                }
            },
            positiveFill: {
                color: 'red'
            },
            negativeFill: {
                pattern: {
                    foreground: 'black',
                    background: 'white',
                    name: 'chert'
                }
            }
        });
    }

    $scope.addRightShadingButtonClick = function() {
        let track = wiD3Ctrl.getCurrentTrack();
        wiD3Ctrl.addRightShadingToTrack(track, track.getCurrentCurve(), {});
    }

    $scope.addCustomShadingButtonClick = function() {
        let track = wiD3Ctrl.getCurrentTrack();
        wiD3Ctrl.addCustomShadingToTrack(track, track.getCurrentCurve(), 0.5, {});
    }

    $scope.addPairShadingButtonClick = function() {
        let track = wiD3Ctrl.getCurrentTrack();
        let curves = track.getCurves();
        if (curves.length < 2) return;
        wiD3Ctrl.addPairShadingToTrack(track, curves[0], curves[1], {
            fill: {
                pattern: {
                    foreground: 'red',
                    background: 'blue',
                    name: 'basement'
                }
            }
        });
    }

    $scope.removeShadingButtonClick = function() {
        wiD3Ctrl.removeCurrentShading();
    }

    function genSamples(extentX, extentY) {
        let samples = [];
        let transform = d3.scaleLinear().domain([0,1]).range(extentX);

        for (let i = extentY[0]; i <= extentY[1]; i++) {
            samples.push({y: i, x: transform(Math.random())});
        }
        return samples;
    }
});
