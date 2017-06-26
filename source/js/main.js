var appConfig = require('./app.config');
var wiButton = require('./wi-button.js');
var wiDropdown = require('./wi-dropdown.js');
var wiToolbar = require('./wi-toolbar.js');
var wiTabs = require('./wi-tabs.js');
var wiWorkingtabs = require('./wi-workingtabs.js');
var wiTreeview = require('./wi-treeview');
var wiStatusBar = require('./wi-status-bar');
var wiSlidingbar = require('./wi-slidingbar');
var wiD3 = require('./wi-d3');
var wiLogplot = require('./wi-logplot.js');

var wiList = require('./wi-list');

var layoutManager = require('./layout.js');

var handlers = require('./handlers.js');

var graph = require('./graph.js');

function genSamples(nSamples) {
    var samples = new Array();
    for( let i = 0; i < nSamples; i++ ) {
        samples.push({y:i, x: Math.random()});
    }
    return samples;
}

wiComponentService = require('./wi-component-service.js');

var app = angular.module('wiapp',
    [
        wiButton.name,
        wiDropdown.name,
        wiToolbar.name,
        wiTabs.name,
        wiWorkingtabs.name,
        wiTreeview.name,
        wiStatusBar.name,
        wiSlidingbar.name,
        wiLogplot.name,
        wiD3.name,
        wiList.name,
        wiComponentService.name
    ]);

app.controller('AppController', function ($scope, $timeout, $compile, wiComponentService) {
    $scope.myConfig = appConfig.TREE_CONFIG_TEST;
    function bindAll($scope, wiComponentService) {
        var newHandlers = new Object();
        for (var handler in handlers) {
            newHandlers[handler] = handlers[handler].bind({
                $scope:$scope, 
                wiComponentService: wiComponentService
            });
        }
        return newHandlers;
    }

    $scope.handlers = bindAll($scope, wiComponentService);

    wiComponentService.putComponent('GRAPH', graph);

    $scope.listItems = [
        {
            key: 'key',
            value: 'value'
        },
        {
            key: 'key',
            value: 'value'
        },
        {
            key: 'key',
            value: 'value'
        },
        {
            key: 'key',
            value: 'value'
        }
    ];

    $scope.listItems2 = [
        {
            key: 'key',
            value: 'value'
        },
        {
            key: 'key',
            value: 'value'
        },
        {
            key: 'key',
            value: 'value'
        }
    ];

    $scope.workingTabs = appConfig.WORKING_TABS;

    layoutManager.createLayout('myLayout', $scope, $compile);
    layoutManager.putLeft('explorer-block', 'Explorer');
    layoutManager.putLeft('property-block', 'Properties');
    layoutManager.putRight('vovan', 'Vo va vovan');
    layoutManager.putRight('working-block', 'Working Block');
    layoutManager.putRight('working-block', 'Working Block 2');

    layoutManager.putWiLogPlotRight('myLogPlot', 'plot 1');
});

