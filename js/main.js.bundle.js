(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
TREE_FUNCTIONS = {
    'item11000': function () {
        console.log('item11000');
    },
    'item11': function () {
        console.log('item11');
    },
    'item121': function () {
        console.log('item121');
    },
    'item12': function () {
        console.log('item12');
    },
    'item2': function () {
        console.log('item2');
    },
    'newitem': function () {
        console.log('newitem');
    },
    'logplot': function () {
        this.wiComponentService.emit('new-logplot-tab', 'new logplot');
        console.log('$scope ', this.$scope);
    }
};

EXPLORER_TREE_CONFIG = [
    {
        name: 'item11000',
        type: 'item11000',
        data: {
            icon: 'project-new-16x16',
            label: 'item 11000',
            description: 'mm',
            childExpanded: false
        },
        children: [
            {
                name: 'item11',
                type: 'item11',
                data: {
                    icon: 'project-new-16x16',
                    label: 'item 1.1',
                    description: 'hu hu hu',
                    childExpanded: false
                },
                children: [
                    {
                        name: 'item1211',
                        type: 'item121',
                        data: {
                            icon: 'project-new-16x16',
                            label: 'item 1.2.1.1',
                            description: 'hic',
                            childExpanded: false
                        },
                        children: []
                    },
                    {
                        name: 'item1212',
                        type: 'item121',
                        data: {
                            name: 'item122',
                            icon: 'project-new-16x16',
                            label: 'item 1.2.1.2',
                            description: '',
                            childExpanded: false
                        },
                        children: []
                    }
                ]
            },
            {
                name: 'item12',
                type: 'item12',
                data: {
                    icon: 'project-new-16x16',
                    label: 'item 1.2',
                    description: '',
                    childExpanded: false
                },
                children: []
            }
        ]
    },
    {
        name: 'item2',
        type: 'item2',
        data: {
            icon: 'project-new-16x16',
            label: 'item 2',
            description: 'description 2',
            childExpanded: false
        }
    },
    {
        name: 'logplot1',
        type: 'logplot',
        data: {
            icon: 'project-new-16x16',
            label: 'Logplot',
            description: 'Logplot',
            childExpanded: false
        }
    }
];

PROPERTIES_LIST_CONFIG = [
    {
        name: 'list1',
        heading: 'List 1',
        data: [
            {
                key: 'key1',
                value: 'value'
            },
            {
                key: 'key1',
                value: 'value'
            },
            {
                key: 'key1',
                value: 'value'
            }
        ]
    },
    {
        name: 'list2',
        heading: 'List 2',
        data: [
            {
                key: 'key2',
                value: 'value'
            },
            {
                key: 'key2',
                value: 'value'
            }
        ]
    }
];


exports.TREE_CONFIG_TEST = EXPLORER_TREE_CONFIG;
exports.LIST_CONFIG_TEST = PROPERTIES_LIST_CONFIG;
exports.TREE_FUNCTIONS = TREE_FUNCTIONS;
},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
exports.NewProjectButtonClicked = function() {
    console.log('NewProjectButton is clicked ', this);
    var wiComponentService = this.wiComponentService;
    wiComponentService.getComponent('OpenProjectButton').label = "hic hic";
}

function genSamples(nSamples) {
    var samples = new Array();
    for( let i = 0; i < nSamples; i++ ) {
        samples.push({y:i, x: Math.random()});
    }
    return samples;
}

exports.OpenProjectButtonClicked = function() {
    console.log('OpenProjectButtoon is clicked');
    console.log('Do click');
    var myPlot = this.wiComponentService.getComponent('myLogPlotD3Area');
    var slidingBar = this.wiComponentService.getComponent('myLogPlotSlidingbar');
    var idx = myPlot.addTrack();

    myPlot.setData(idx, genSamples(1000));

    var maxDepth = myPlot.getMaxDepth();

    var low = slidingBar.slidingBarState.top * maxDepth / 100;
    var high = (slidingBar.slidingBarState.top + slidingBar.slidingBarState.range) * maxDepth / 100;
    console.log(slidingBar.slidingBarState, low, high, maxDepth);
    myPlot.setDepthRange([low, high]);
    myPlot.plotAll();
}

exports.CloseProjectButtonClicked = function() {
    console.log('CloseProjectButton is clicked');
}

exports.UnitSettingsButtonClicked = function() {
    console.log('UnitSettingsButton is clicked');
}

exports.SaveProjectButtonClicked = function() {
    console.log('SaveProjectButton is clicked');
}

exports.SaveProjectAsButtonClicked = function() {
    console.log('SaveProjectAsButton is clicked');
}

exports.ProjectButtonClicked = function() {
    console.log('ProjectButton is clicked');
}

exports.WorkflowsButtonClicked = function() {
    console.log('WorkflowsButton is clicked');
}

exports.PropertyGridButtonClicked = function() {
    console.log('PropertyGridButton is clicked');
}

exports.ExitButtonClicked = function() {
    console.log('ExitButton is clicked');
}

exports.AddNewButtonClicked = function() {
    console.log('AddNewButton is clicked');
}

exports.WellHeaderButtonClicked = function() {
    console.log('WellHeaderButton is clicked');
}

exports.DepthConversionButtonClicked = function() {
    console.log('DepthConversionButton is clicked');
}

exports.CurveAliasButtonClicked = function() {
    console.log('CurveAliasButton is clicked');
}

exports.FamilyEditButtonClicked = function() {
    console.log('FamilyEditButton is clicked');
}

exports.ImportASCIIButtonClicked = function() {
    console.log('ImportASCIIButton is clicked');
}

exports.ImportMultiASCIIButtonClicked = function() {
    console.log('ImportMultiASCIIButton is clicked');
}

exports.ImportLASButtonClicked = function() {
    console.log('ImportLASButton is clicked');
}

exports.ImportMultiLASButtonClicked = function() {
    console.log('ImportMultiLASButton is clicked');
}

exports.Interval_CoreLoaderButtonClicked = function() {
    console.log('Interval/CoreLoaderButton is clicked');
}

exports.Multi_wellCoreLoaderButtonClicked = function() {
    console.log('Multi-wellCoreLoaderButton is clicked');
}

exports.ImportWellHeaderButtonClicked = function() {
    console.log('ImportWellHeaderButton is clicked');
}

exports.ImportWellTopButtonClicked = function() {
    console.log('ImportWellTopButton is clicked');
}

exports.ExportASCIIButtonClicked = function() {
    console.log('ExportASCIIButton is clicked');
}

exports.ExportMultiASCIIButtonClicked = function() {
    console.log('ExportMultiASCIIButton is clicked');
}

exports.ExportLASButtonClicked = function() {
    console.log('ExportLASButton is clicked');
}

exports.ExportMultiLASButtonClicked = function() {
    console.log('ExportMultiLASButton is clicked');
}

exports.ExportCoreDataButtonClicked = function() {
    console.log('ExportCoreDataButton is clicked');
}

exports.Multi_wellCoreLoaderButtonClicked = function() {
    console.log('Multi-wellCoreLoaderButton is clicked');
}

exports.ExportWellHeaderButtonClicked = function() {
    console.log('ExportWellHeaderButton is clicked');
}

exports.ExportWellTopButtonClicked = function() {
    console.log('ExportWellTopButton is clicked');
}

exports.BlankLogplotButtonClicked = function() {
    console.log('BlankLogplotButton is clicked');
}

exports.TrippleComboButtonClicked = function() {
    console.log('TrippleComboButton is clicked');
}

exports.DensityNeutronButtonClicked = function() {
    console.log('DensityNeutronButton is clicked');
}

exports.ResistivitySonicButtonClicked = function() {
    console.log('ResistivitySonicButton is clicked');
}

exports.TriTracksBlankButtonClicked = function() {
    console.log('3TracksBlankButton is clicked');
}

exports.InputCurveButtonClicked = function() {
    console.log('InputCurveButton is clicked');
}

exports.LithoPlusSyn_CurveButtonClicked = function() {
    console.log('Litho+Syn.CurveButton is clicked');
}

exports.Syn_CurveButtonClicked = function() {
    console.log('Syn.CurveButton is clicked');
}

exports.ResultButtonClicked = function() {
    console.log('ResultButton is clicked');
}

exports.BlankCrossPlotButtonClicked = function() {
    console.log('BlankCrossPlotButton is clicked');
}

exports.SonicPHI_TOTALButtonClicked = function() {
    console.log('SonicPHI_TOTALButton is clicked');
}

exports.NeutronDensityButtonClicked = function() {
    console.log('NeutronDensityButton is clicked');
}

exports.NeutronGammaButtonClicked = function() {
    console.log('NeutronGammaButton is clicked');
}

exports.SonicGammaButtonClicked = function() {
    console.log('SonicGammaButton is clicked');
}

exports.NeuTronSonicButtonClicked = function() {
    console.log('NeuTronSonicButton is clicked');
}

exports.DenityGammaButtonClicked = function() {
    console.log('DenityGammaButton is clicked');
}

exports.NeuTronRtButtonClicked = function() {
    console.log('NeuTronRtButton is clicked');
}

exports.DensitySonicButtonClicked = function() {
    console.log('DensitySonicButton is clicked');
}

exports.DensityRtButtonClicked = function() {
    console.log('DensityRtButton is clicked');
}

exports.SonicDensityButtonClicked = function() {
    console.log('SonicDensityButton is clicked');
}

exports.SonicRtButtonClicked = function() {
    console.log('SonicRtButton is clicked');
}

exports.RtRx0ButtonClicked = function() {
    console.log('RtRx0Button is clicked');
}

exports.PickettButtonClicked = function() {
    console.log('PickettButton is clicked');
}

exports.BlankHistogramButtonClicked = function() {
    console.log('BlankHistogramButton is clicked');
}

exports.PHI_TOTALButtonClicked = function() {
    console.log('PHI_TOTALButton is clicked');
}

exports.GammaRayButtonClicked = function() {
    console.log('GammaRayButton is clicked');
}

exports.NeutronButtonClicked = function() {
    console.log('NeutronButton is clicked');
}

exports.DensityButtonClicked = function() {
    console.log('DensityButton is clicked');
}

exports.SonicButtonClicked = function() {
    console.log('SonicButton is clicked');
}

exports.SallowResistivityButtonClicked = function() {
    console.log('SallowResistivityButton is clicked');
}

exports.DeepResistivityButtonClicked = function() {
    console.log('DeepResistivityButton is clicked');
}

exports.MSFLHistogramButtonClicked = function() {
    console.log('MSFLHistogramButton is clicked');
}

exports.AddCurveButtonClicked = function() {
    console.log('AddCurveButton is clicked');
}

exports.EditTextCurveButtonClicked = function() {
    console.log('EditTextCurveButton is clicked');
}

exports.CurveListing_EditButtonClicked = function() {
    console.log('CurveListing/EditButton is clicked');
}

exports.InteractiveCurveEditButtonClicked = function() {
    console.log('InteractiveCurveEditButton is clicked');
}

exports.InteractiveBaselineShiftButtonClicked = function() {
    console.log('InteractiveBaselineShiftButton is clicked');
}

exports.SplitCurvesButtonClicked = function() {
    console.log('SplitCurvesButton is clicked');
}

exports.InteractiveCurveSplitButtonClicked = function() {
    console.log('InteractiveCurveSplitButton is clicked');
}

exports.MergeCurvesButtonClicked = function() {
    console.log('MergeCurvesButton is clicked');
}

exports.CurvesHeaderButtonClicked = function() {
    console.log('CurvesHeaderButton is clicked');
}

exports.FillDataGapsButtonClicked = function() {
    console.log('FillDataGapsButton is clicked');
}

exports.CurveFilterButtonClicked = function() {
    console.log('CurveFilterButton is clicked');
}

exports.CurveConvolutionButtonClicked = function() {
    console.log('CurveConvolutionButton is clicked');
}

exports.CurveDeconvolutionButtonClicked = function() {
    console.log('CurveDeconvolutionButton is clicked');
}

exports.CurveDerivativeButtonClicked = function() {
    console.log('CurveDerivativeButton is clicked');
}

exports.CurveRescaleButtonClicked = function() {
    console.log('CurveRescaleButton is clicked');
}

exports.CurveComrarisonButtonClicked = function() {
    console.log('CurveComrarisonButton is clicked');
}

exports.CurveAverageButtonClicked = function() {
    console.log('CurveAverageButton is clicked');
}

exports.FormationResistivityButtonClicked = function() {
    console.log('FormationResistivityButton is clicked');
}

exports.Badhole_Coal_SaltButtonClicked = function() {
    console.log('Badhole/Coal/SaltButton is clicked');
}

exports.UserFormulaButtonClicked = function() {
    console.log('UserFormulaButton is clicked');
}

exports.UserProgramButtonClicked = function() {
    console.log('UserProgramButton is clicked');
}

exports.PythonProgramButtonClicked = function() {
    console.log('PythonProgramButton is clicked');
}

exports.TVDConversionButtonClicked = function() {
    console.log('TVDConversionButton is clicked');
}

exports.PCAAnalysisButtonClicked = function() {
    console.log('PCAAnalysisButton is clicked');
}

exports.Multi_LinearRegressionButtonClicked = function() {
    console.log('Multi-LinearRegressionButton is clicked');
}

exports.NeuralNetworkButtonClicked = function() {
    console.log('NeuralNetworkButton is clicked');
}

exports.EditZonesButtonClicked = function() {
    console.log('EditZonesButton is clicked');
}

exports.InputCurvesButtonClicked = function() {
    console.log('InputCurvesButton is clicked');
}

exports.InputFuidButtonClicked = function() {
    console.log('InputFuidButton is clicked');
}

exports.BuildMineralParametersButtonClicked = function() {
    console.log('BuildMineralParametersButton is clicked');
}

exports.InputMineralZonesButtonClicked = function() {
    console.log('InputMineralZonesButton is clicked');
}

exports.Multi_MineralSolverButtonClicked = function() {
    console.log('Multi-MineralSolverButton is clicked');
}

exports.ClayMineralsVolumeButtonClicked = function() {
    console.log('ClayMineralsVolumeButton is clicked');
}

exports.Fracture_VugPorosityButtonClicked = function() {
    console.log('Fracture-VugPorosityButton is clicked');
}

exports.OpenPorosityButtonClicked = function() {
    console.log('OpenPorosityButton is clicked');
}

exports.SecondaryPorosityButtonClicked = function() {
    console.log('SecondaryPorosityButton is clicked');
}

exports.FracturePorosityButtonClicked = function() {
    console.log('FracturePorosityButton is clicked');
}

exports.FilteringFractureButtonClicked = function() {
    console.log('FilteringFractureButton is clicked');
}

exports.MicroAndMacroPorosityButtonClicked = function() {
    console.log('Micro&MacroPorosityButton is clicked');
}

exports.WaterSaturationButtonClicked = function() {
    console.log('WaterSaturationButton is clicked');
}

exports.PermeabilityButtonClicked = function() {
    console.log('PermeabilityButton is clicked');
}

exports.CutoffandSummationButtonClicked = function() {
    console.log('CutoffandSummationButton is clicked');
}

exports.FilteringButtonClicked = function() {
    console.log('FilteringButton is clicked');
}

exports.BasicAnalysisButtonClicked = function() {
    console.log('BasicAnalysisButton is clicked');
}

exports.ClayVolumeButtonClicked = function() {
    console.log('ClayVolumeButton is clicked');
}

exports.PorosityAndWaterSaturationButtonClicked = function() {
    console.log('Porosity&WaterSaturationButton is clicked');
}

exports.CutoffandSummationButtonClicked = function() {
    console.log('CutoffandSummationButton is clicked');
}

exports.HelpButtonClicked = function() {
    console.log('HelpButton is clicked');
}

exports.AboutButtonClicked = function() {
    console.log('AboutButton is clicked');
}

exports.UnlockButtonClicked = function() {
    console.log('UnlockButton is clicked');
}


},{}],4:[function(require,module,exports){
let layoutManager;
let compileFunc;
let scopeObj;
let layoutConfig = {
    settings: {
        hasHeaders: true,
        showCloseIcon: false,
        showPopoutIcon: false
    },
    content: [
        {
            type: "row",
            content: [
                {
                    type: 'column',
                    id: 'left',
                    isClosable: false,
                    width: 30,
                    content: []
                },
                {
                    type: 'stack',
                    id: 'right',
                    isClosable: false,
                    content: []
                }
            ]
        }
    ]
};
function createLayout(domId, $scope, $compile) {
    scopeObj = $scope;
    compileFunc = $compile;
    layoutManager = new GoldenLayout(layoutConfig, document.getElementById(domId));

    layoutManager.registerComponent('wi-block', function (container, componentState) {
        let templateHtml = $('template#' + componentState.templateId).html();
        //console.log('template#' + componentState.templateId, templateHtml);
        container.getElement().html(compileFunc(templateHtml)(scopeObj));
    });

    layoutManager.registerComponent('html-block', function (container, componentState) {
        let html = componentState.html;
        container.getElement().html(compileFunc(html)(scopeObj));

        container.on('shown', function (e) {
            console.log('componentState', componentState)
        })
    });

    layoutManager.init();
}
function putLeft(templateId, title) {
    //layoutManager.root.contentItems[0].contentItems[0].addChild({
    layoutManager.root.getItemsById('left')[0].addChild({
        type: 'component',
        componentName: 'wi-block',
        componentState: {
            templateId: templateId
        },
        title: title
    });
}
function putRight(templateId, title) {
    //layoutManager.root.contentItems[0].contentItems[1].addChild({
    layoutManager.root.getItemsById('right')[0].addChild({
        type: 'component',
        componentName: 'wi-block',
        componentState: {
            templateId: templateId
        },
        title: title
    });
}
function putWiLogPlotRight(logPlotName, title) {
    layoutManager.root.getItemsById('right')[0].addChild({
        type: 'component',
        componentName: 'html-block',
        componentState: {
            html: '<wi-logplot name="' + logPlotName + '"></wi-logplot>'
        },
        title: title
    });
}
function putWiLogPlotLeft(logPlotName, title) {
    layoutManager.root.getItemsById('left')[0].addChild({
        type: 'component',
        componentName: 'html-block',
        componentState: {
            html: '<wi-logplot name="' + logPlotName + '"></wi-logplot>'
        },
        title: title
    });
}

exports.createLayout = createLayout;
exports.putLeft = putLeft;
exports.putRight = putRight;
exports.putWiLogPlotRight = putWiLogPlotRight;
exports.putWiLogPlotLeft = putWiLogPlotLeft;

},{}],5:[function(require,module,exports){
let appConfig = require('./app.config');
let wiButton = require('./wi-button');
let wiDropdown = require('./wi-dropdown');
let wiToolbar = require('./wi-toolbar');
let wiWorkingtabs = require('./wi-workingtabs');
let wiTreeview = require('./wi-treeview');
let wiStatusBar = require('./wi-status-bar');
let wiSlidingbar = require('./wi-slidingbar');

let wiList = require('./wi-list');

let wiD3 = require('./wi-d3');
let wiLogplot = require('./wi-logplot');
let wiExplorer = require('./wi-explorer');
let wiProperties = require('./wi-properties');

let layoutManager = require('./layout');

let handlers = require('./handlers');
let logplotHandlers = require('./wi-logplot-handlers');

let graph = require('./graph');


function genSamples(nSamples) {
    let samples = [];
    for (let i = 0; i < nSamples; i++) {
        samples.push({y: i, x: Math.random()});
    }
    return samples;
}

let wiComponentService = require('./wi-component-service');

let app = angular.module('wiapp',
    [
        wiButton.name,
        wiDropdown.name,
        wiToolbar.name,
        wiWorkingtabs.name,
        wiTreeview.name,
        wiStatusBar.name,
        wiSlidingbar.name,
        wiList.name,

        wiD3.name,
        wiLogplot.name,
        wiExplorer.name,
        wiProperties.name,

        wiComponentService.name
    ]);

app.controller('AppController', function ($scope, $timeout, $compile, wiComponentService) {
    // config explorer block - treeview
    $scope.myTreeviewConfig = appConfig.TREE_CONFIG_TEST;
    wiComponentService.treeFunctions = bindAll(appConfig.TREE_FUNCTIONS, $scope, wiComponentService);

    // config properties - list block
    $scope.myPropertiesConfig = appConfig.LIST_CONFIG_TEST;

    $scope.handlers = bindAll(handlers, $scope, wiComponentService);

    wiComponentService.putComponent('GRAPH', graph);

    layoutManager.createLayout('myLayout', $scope, $compile);
    layoutManager.putLeft('explorer-block', 'Explorer');
    layoutManager.putLeft('property-block', 'Properties');

    wiComponentService.on('new-logplot-tab', function (title) {
        layoutManager.putWiLogPlotRight('myLogPlot' + Date.now(), title);
    });
});

function bindAll(handlers, $scope, wiComponentService) {
    let newHandlers = {};
    for (let handler in handlers) {
        newHandlers[handler] = handlers[handler].bind({
            $scope: $scope,
            wiComponentService: wiComponentService
        });
    }

    for (let handler in logplotHandlers) {
        newHandlers[handler] = logplotHandlers[handler].bind({
            $scope: $scope,
            wiComponentService: wiComponentService
        });
    }

    return newHandlers;
}
},{"./app.config":1,"./graph":2,"./handlers":3,"./layout":4,"./wi-button":6,"./wi-component-service":7,"./wi-d3":8,"./wi-dropdown":9,"./wi-explorer":10,"./wi-list":11,"./wi-logplot":13,"./wi-logplot-handlers":12,"./wi-properties":14,"./wi-slidingbar":15,"./wi-status-bar":16,"./wi-toolbar":17,"./wi-treeview":18,"./wi-workingtabs":19}],6:[function(require,module,exports){
const wiButtonName = 'wiButton';
const moduleName = 'wi-button';

function ButtonController(wiComponentService) {
    let self = this;

    this.default = {
        type: 'normal',
        label: '',
        layout: 'icon-top',
        icon: 'project-new-32x32'
    };

    this.onClick = function () {
        if (self.handler) self.handler();
    };

    this.$onInit = function() {
        if (self.name) wiComponentService.putComponent(self.name, self);
    }
}

let app = angular.module(moduleName, []);
app.component(wiButtonName, {
    template:'<div><button ng-click="wiButton.onClick()" class="button-{{wiButton.type || wiButton.config.type || wiButton.default.type}}"><img class="{{wiButton.icon || wiButton.config.icon || wiButton.default.icon}}" alt="icon wi-button"><p class="{{wiButton.layout || wiButton.config.layout || wiButton.default.layout}}" ng-show="wiButton.label != null || wiButton.config.label != null">{{wiButton.label || wiButton.config.label || wiButton.default.label}}</p></button></div>',
    controller: ButtonController,
    controllerAs: wiButtonName,
    bindings: {
        config: '<',
        type: '@',
        name: '@',
        label: '@',
        layout: '@',
        icon: '@',
        handler: '<'
    }
});

exports.name = moduleName;

},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
const componentName = 'wiDropdown';
const moduleName = 'wi-dropdown';

function Controller(wiComponentService) {
    let self = this;

    this.default = {
        label: '',
        layout: 'icon-top',
        icon: 'project-new-32x32'
    };

    this.onClick = function () {
        if (self.handler) self.handler();
    };

    this.$onInit = function() {
        if (self.name) wiComponentService.putComponent(self.name, self);
    };
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown" ng-click="wiDropdown.onClick()"><img class="{{wiDropdown.icon || wiDropdown.config.icon || wiDropdown.default.icon}}" alt="icon wi-dropdown"><div class="label-wrapper {{wiDropdown.layout || wiDropdown.config.layout || wiDropdown.default.layout}}"><span class="{{wiDropdown.layout || wiDropdown.config.layout || wiDropdown.default.layout}}" ng-show="wiDropdown.label || wiDropdown.config.label">{{wiDropdown.label || wiDropdown.config.label}}</span> <span class="caret"></span></div></button><ul class="dropdown-menu"><div ng-transclude></div></ul></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        config: '<',
        name: '@',
        label: '@',
        layout: '@',
        icon: '@',
        handler: '<'
    }
});

exports.name = moduleName;

},{}],10:[function(require,module,exports){
const componentName = 'wiExplorer';
const moduleName = 'wi-explorer';

function Controller(wiComponentService) {
    let self = this;

    this.$onInit = function () {
        if (self.name) wiComponentService.putComponent(self.name, self);
    };
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<wi-toolbar name="Toolbar" label icon><wi-button name="Button1Button" label icon="help-16x16" handler="handlers.Button1ButtonClicked"></wi-button><wi-button name="Button2Button" label icon="info-frp-16x16" handler="handlers.Button2ButtonClicked"></wi-button><wi-button name="Button3Button" label icon="project-new-16x16" handler="handlers.Button3ButtonClicked"></wi-button></wi-toolbar><div class="filter-block"><span>Filter:</span> <input type="text" placeholder="well or .../dataset or .../curve or ..."></div><div class="treeview-header"><span>Name</span> <span class="header-description">Unit</span></div><wi-treeview config="wiExplorer.treeConfig"></wi-treeview>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name: '@',
        treeConfig: '<'
    }
});

exports.name = moduleName;

},{}],11:[function(require,module,exports){
const componentName = 'wiList';
const moduleName = 'wi-list';

function Controller(wiComponentService) {
    let self = this;
    this.expanded = true;

    this.$onInit = function() {
        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.addItem = function (key, value) {
        self.items.push({key, value});
    }
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="list-header-wrapper"><p class="list-heading">{{wiList.heading}}</p><i class="fa list-expanded" aria-hidden="true" ng-class="{\'fa-caret-down\' : wiList.expanded, \'fa-caret-right\' : !wiList.expanded}" ng-click="wiList.expanded = !wiList.expanded"></i></div><table ng-show="wiList.expanded"><tr ng-repeat="item in wiList.items"><td>{{item.key}}</td><td>{{item.value}}</td></tr></table>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name : '@',
        heading: '@',
        items: '<'
    }
});

exports.name = moduleName;

},{}],12:[function(require,module,exports){
exports.Button1ButtonClicked = function() {
    console.log('Button1Button is clicked');
}

exports.Button2ButtonClicked = function() {
    console.log('Button2Button is clicked');
}

exports.Button3ButtonClicked = function() {
    console.log('Button3Button is clicked');
}


},{}],13:[function(require,module,exports){
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

function Controller(wiComponentService) {
    let self = this;
    let previousSlidingBarState = {};

    this.$onInit = function () {
        self.slidingbarName = self.name + 'Slidingbar';
        self.wiD3AreaName = self.name + 'D3Area';

        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.$doCheck = function () {
        if (!self.slidingBar) return;
        if (!isEqual(previousSlidingBarState, self.slidingBar.slidingBarState)) {
            objcpy(previousSlidingBarState, self.slidingBar.slidingBarState);
            let wiD3Controller = wiComponentService.getComponent(self.wiD3AreaName);
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
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="logplot-toolbar-wrapper"><wi-toolbar name="Toolbar" label icon><wi-button name="Button1Button" label icon="help-32x32" handler="handlers.Button1ButtonClicked"></wi-button><wi-button name="Button2Button" label icon="info-frp-32x32" handler="handlers.Button2ButtonClicked"></wi-button><wi-button name="Button3Button" label icon handler="handlers.Button3ButtonClicked"></wi-button></wi-toolbar></div><div class="logplot-main-content"><div class="slidingbar"><wi-slidingbar name="{{wiLogplot.slidingbarName}}" ng-init="wiLogplot.getSlidingbarCtrl()"></wi-slidingbar></div><div class="track-area"><wi-d3 style="width: 100%; flex: 1; display: flex;" name="{{wiLogplot.wiD3AreaName}}"></wi-d3></div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        name: '@'
    }
});

exports.name = moduleName;

},{}],14:[function(require,module,exports){
const componentName = 'wiProperties';
const moduleName = 'wi-properties';

function Controller(wiComponentService) {
    let self = this;

    this.$onInit = function () {
        if (self.name) wiComponentService.putComponent(self.name, self);
    };
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<wi-list name="{{item.name}}" heading="{{item.heading}}" items="item.data" ng-repeat="item in wiProperties.listConfig"></wi-list>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name: '@',
        listConfig: '<'
    }
});

exports.name = moduleName;

},{}],15:[function(require,module,exports){
const componentName = 'wiSlidingbar';
const moduleName = 'wi-slidingbar';

const MIN_RANGE = 5;

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
        console.log($(self.handleId));
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

},{}],16:[function(require,module,exports){
const componentName = 'wiStatusBar';
const moduleName = 'wi-status-bar';

function Controller() {
    let self = this;
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<span>status bar<span></span></span>',
    controller: Controller,
    controllerAs: componentName
});

exports.name = moduleName;

},{}],17:[function(require,module,exports){
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
    template:'<div class="toolbar-wrapper"><div ng-transclude class="toolbar-{{wiToolbar.type || wiToolbar.default.type}}"></div><p class="wi-toolbar-label" ng-show="wiToolbar.label && wiToolbar.label.length > 0">{{wiToolbar.label}}</p></div>',
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
},{}],18:[function(require,module,exports){
const componentName = 'wiTreeview';
const moduleName = 'wi-treeview';

function Controller(wiComponentService) {
    let self = this;

    this.$onInit = function () {
        self.items = self.config;

        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.onClick = function ($index) {
        self.config[$index].data.childExpanded = !self.config[$index].data.childExpanded;

        if (!self.config[$index].children || self.config[$index].children.length === 0)
            wiComponentService.itemActiveName = self.config[$index].name;
    };

    this.onDoubleClick = function ($index) {
        if (self.config[$index].data.handler) {
            self.config[$index].data.handler();
        } else if (wiComponentService.treeFunctions) {
            // get func from component service
            wiComponentService.treeFunctions[self.config[$index].type]();
        }
    };

    this.getItemActiveName = function () {
        return wiComponentService.itemActiveName;
    };

    this.addItem = function (parentName, item) {
        let parentItem = getItemByName(parentName);

        if (parentItem) parentItem.children.push(item);
    };

    function getItemByName(name) {
        let itemSelect = null;

        for (let item of self.items) {
            if (item.name === name) {
                return item;
            }

            itemSelect = findChildItemByName(item, name);
            if (itemSelect) {
                return itemSelect;
            }
        }

        return itemSelect;
    }

    function findChildItemByName(item, name) {
        if (!item || !item.children) return;

        let childSelect = null;
        for (let child of item.children) {
            if (child.name === name) {
                return child;
            } else if (child.children.length !== 0) {
                childSelect = findChildItemByName(child, name);
                if (childSelect) {
                    return childSelect;
                }
            }
        }

        return childSelect;
    }
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="wi-treeview-container" ng-repeat="item in wiTreeview.items track by $index"><div class="wi-parent-node" ng-class=\'{"item-active": item.name == wiTreeview.getItemActiveName()}\' ng-click="wiTreeview.onClick($index)" ng-dblclick="wiTreeview.onDoubleClick($index)"><div><i aria-hidden="true" class="fa icon-expanded" ng-class="{\'fa-caret-down\': item.data.childExpanded, \'fa-caret-right\': !item.data.childExpanded, \'wi-hidden\': item.children == null || item.children.length == 0}"></i> <img class="{{item.data.icon}}" alt="img item treeview"> <span>{{item.data.label}}</span></div><div class="wi-parent-description text-right" ng-show="item.data.description">{{item.data.description}}</div></div><div ng-show="item.data.childExpanded"><wi-treeview config="item.children"></wi-treeview></div></div>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name: '@',
        config: '<'
    }
});

exports.name = moduleName;

},{}],19:[function(require,module,exports){
const tabsetComponentName = 'wiWorkingtabset';
const tabComponentName = 'wiWorkingtab';
const moduleName = 'wi-workingtabs';

function TabsetController($timeout, wiComponentService) {
    let self = this;

    this.tabs = [];

    this.selectTab = function (index) {
        deactiveAllTabs(self.tabs);
        deactiveAllTabs(self.tabConfigs);

        self.tabs[index].active = true;
        self.tabConfigs[index].active = true;

        let tabSelectCtrl = wiComponentService.getComponent(self.tabs[index].name);
        if (tabSelectCtrl.type === 'logplot') {
            $timeout(wiComponentService.getComponent(tabSelectCtrl.name + 'Logplot').getSlidingbarCtrl().setSlidingHandleHeight);
        }
    };

    this.closeTab = function (index) {
        deactiveAllTabs(self.tabs);
        deactiveAllTabs(self.tabConfigs);

        self.tabs.splice(index, 1);
        self.tabConfigs.splice(index, 1);

        if (self.tabs.length !== 0) {
            if (index < self.tabs.length) {
                self.tabs[index].active = true;
                self.tabConfigs[index].active = true;
            } else {
                self.tabs[self.tabs.length - 1].active = true;
                self.tabConfigs[self.tabs.length - 1].active = true;
            }
        }
    };

    this.addTab = function (tab) {
        deactiveAllTabs(self.tabs);
        deactiveAllTabs(self.tabConfigs);

        tab.active = true;
        self.tabs.push(tab);

        self.tabConfigs[self.tabConfigs.length - 1].active = true;
    };

    function deactiveAllTabs(tabs) {
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].active = false;
        }
    }
}

let app = angular.module(moduleName, []);
app.component(tabsetComponentName, {
    template:'<ul class="nav nav-tabs"><li class="wi-tab" ng-repeat="tab in wiWorkingtabset.tabs track by $index" ng-class="{\'active\': tab.active}" ng-click="wiWorkingtabset.selectTab($index)"><a>{{tab.heading}}</a> <i class="ti-close" ng-show="tab.closable == \'true\'" ng-click="wiWorkingtabset.closeTab($index)"></i></li></ul><div class="wi-working-tabset-content" ng-transclude></div>',
    controller: TabsetController,
    controllerAs: tabsetComponentName,
    transclude: true,
    bindings: {
        tabConfigs: '<'
    }
});


function TabController(wiComponentService) {
    let self = this;

    this.$onInit = function () {
        self.wiTabsetCtrl.addTab(self);

        if (self.name) wiComponentService.putComponent(self.name, self);
    };
}

app.component(tabComponentName, {
    template:'<div class="wi-workingtab-content" ng-transclude ng-show="wiWorkingtab.active"></div>',
    controller: TabController,
    controllerAs: tabComponentName,
    transclude: true,
    require: {
        'wiTabsetCtrl': '^wiWorkingtabset'
    },
    bindings: {
        name: '@',
        type: '@',
        heading: '@',
        closable: '@'
    }
});


exports.name = moduleName;

},{}]},{},[5]);
