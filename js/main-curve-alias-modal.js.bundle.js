(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by cuong on 6/15/2017.
 */
exports.newProjectDialog = function ($scope, ModalService) {
    var self = this;
    console.log("new project dialog");
    function ModalController($scope, close) {
        this.close = function (ret) {
            close(ret, 500); // close, but give 500ms for bootstrap to animate
        };

        this.onOK = function () {
            // if (typeof $scope.name == 'undefined') {
            //     var err = 'NewProject: Project Name is required!';
            //     return {error: err};
            // } else if (typeof $scope.location == 'undefined') {
            //     var err = 'NewProject: Location is required';
            //     return {error: err};
            // } else {
                // $scope.newProjectInfo{
                //     name: $scope.projectName,
                //     company: $scope.company,
                //     department: $scope.department,
                //     description: $scope.description
                // }
            // console.log($scope.newProjectInfo);
        }
        // $http({
        //     method : 'GET',
        //     url : '54.255.212.141/'
        // }).then(function newProject(req, res) {
        //     $scope.newProjectInfo = req.data.projectInfo;
        // });
    }

    ModalService.showModal({
        template:'<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="wiModal.close(\'Cancel\')" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"><span class="project-new-16x16"></span>&nbsp;New Project</h4><h5 class="modal-infomation-title"><span class="project-normal-16x16"></span>&nbsp;Project Infomation</h5></div><div class="modal-body"><div><form class="form-horizontal" name="modalNewProject"><div class="form-group"><label class="control-label col-sm-3" for="projectName">Project name:</label><div class="col-sm-9"><input type="text" class="form-control" id="projectName" name="projectName" ng-model="projectName" required> <span ng-show="modalNewProject.projectName.$dirty && modalNewProject.projectName.$error.required">Required*</span></div></div><div class="form-group"><label class="control-label col-sm-3" for="location">Location:</label><div class="col-sm-9"><div class="area text-center">Browser Location</div></div></div><div class="form-group"><label class="control-label col-sm-3" for="company">Company</label><div class="col-sm-9"><input type="text" class="form-control" id="company" name="company" ng-model="company"></div></div><div class="form-group"><label class="control-label col-sm-3" for="department">Department:</label><div class="col-sm-9"><input type="text" class="form-control" id="department" name="department" ng-model="department"></div></div><div class="form-group"><label class="control-label col-sm-3" for="descriptions">Descriptions:</label><div class="col-sm-9"><textarea class="form-control" rows="8" value id="descriptions" name="descriptions" ng-model="descriptions"></textarea></div></div></form></div></div><div class="modal-footer"><button type="button" ng-click="wiModal.close(wiModal.onOK())" class="btn btn-default" data-dismiss="modal"><span class="ok-16x16"></span>&nbsp;OK</button> <button type="button" ng-click="wiModal.close(\'Cancel\')" class="btn btn-default" data-dismiss="modal"><span class="close-16x16"></span>&nbsp;Cancel</button></div></div></div></div>',
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            console.log("Modal finally close: ", ret);
        });
    });
};
exports.openProjectDialog = function($scope, ModalService, callback) {
    function ModalController($scope, close) {
        console.log("modal controller created");
        this.close = function(retValue) {
            console.log("returnValue:", retValue);
            close(retValue);
        }
    }
    ModalService.showModal({
        template:'<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="wiModal.close(\'Cancel\')" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"><span class="project-open-16x16"></span>&nbsp;Open Project</h4></div><div class="modal-body"><div><form class="form-horizontal" name="modalOpenProject"><div class="form-group"><div class="col-sm-12"><div class="area text-center padding-50px">Open project</div></div></div><h4 class="modal-infomation-title"><span class="project-normal-16x16"></span>&nbsp;Project Information</h4><div class="form-group"><label class="control-label col-sm-3" for="projectName">Project name:</label><div class="col-sm-9"><input type="text" class="form-control" name="projectName" ng-model="wiModal.projectName" required> <span ng-show="modalOpenProject.projectName.$dirty && modalOpenProject.projectName.$error.required">Required*</span></div></div><div class="form-group"><label class="control-label col-sm-3" for="project-name">Company</label><div class="col-sm-9"><input type="text" class="form-control" name="company" ng-model="wiModal.company"></div></div><div class="form-group"><label class="control-label col-sm-3" for="department">Department:</label><div class="col-sm-9"><input type="text" class="form-control" name="department" ng-model="wiModal.department"></div></div><div class="form-group"><label class="control-label col-sm-3" for="createDate">Create date:</label><div class="col-sm-9"><input type="datetime-local" class="form-control" value="{{ date | date: \'yyyy-MM-dd\' }}" name="createDate" ng-model="wiModal.createDate"></div></div><div class="form-group"><label class="control-label col-sm-3" for="descriptions">Descriptions:</label><div class="col-sm-9"><textarea class="form-control" rows="8" value name="descriptions" ng-model="wiModal.descriptions"></textarea></div></div></form></div></div><div class="modal-footer"><button type="button" ng-click="wiModal.close(wiModal.projectName);" class="btn btn-default" data-dismiss="modal" ng-disabled="!modalOpenProject.$dirty || (modalOpenProject.$dirty && modalOpenProject.$invalid)"><span class="ok-16x16"></span>&nbsp;OK</button> <button type="button" ng-click="wiModal.close(\'Cancel click\')" class="btn btn-default" data-dismiss="modal"><span class="cancel-16x16"></span>&nbsp;Cancel</button></div></div></div></div>',
        controller: ModalController,
        controllerAs: 'wiModal'
    }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        })
    });
}
exports.confirmDialog = function(ModalService, titleMessage, confirmMessage, callback) {
    function ModalController($scope, close) {
        this.title = titleMessage;
        this.confirmMsg = confirmMessage;
        this.close = function(ret) {
            close(ret);
        }
    }
    ModalService.showModal({
        template:'<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="wiModal.close(\'Cancel\')" data-dismiss="modal" aria-hidden="true">&times;</button><h4>{{wiModal.title}}</h4></div><div class="modal-body text-center"><span>{{wiModal.confirmMsg}}</span></div><div class="modal-footer"><button class="btn btn-default" ng-click="wiModal.close(true)">Ok</button> <button class="btn btn-default" ng-click="wiModal.close(false)">Cancel</button></div></div></div></div>',
        controller: ModalController,
        controllerAs: 'wiModal'
    }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}

exports.unitSettingDialog = function(ModalService, callback) {
    function ModalController($scope, close) {
        this.defaultData = {
            Default : {
                unitSystem: "Default",
                caliper : "in", 
                neutron : "v/v",
                gammaRay : "api",
                acoustic : "us/ft",
                pressure : "psi",
                bitSize : "in",
                density : "g/cm3",
                concentration : "v/v",
                permeability : "mD",
                porosity : "v/v",
                angle : "deg",
                resistivity : "ohm.m",
                saturation : "v/v",
                temperature : "degC",
                volume : "v/v",
                sp : "mv",
                length : "m",
                time : "s",
                area : "m2",
                flow : "t",
                speed : "m/s",
                force : "N"    
            },
            Canadian : {
                unitSystem : "Canadian",
                caliper : "cm", 
                neutron : "%",
                gammaRay : "api",
                acoustic : "us/m",
                pressure : "psi",
                bitSize : "cm",
                density : "kg/m3",
                concentration : "ppm",
                permeability : "mD",
                porosity : "v/v",
                angle : "deg",
                resistivity : "ohm.m",
                saturation : "v/v",
                temperature : "degC",
                volume : "v/v",
                sp : "mv",
                length : "m",
                time : "s",
                area : "m2",
                flow : "t",
                speed : "m/s",
                force : "N"    
            },
            English : {
                unitSystem : "English",
                caliper : "in", 
                neutron : "%",
                gammaRay : "api",
                acoustic : "us/ft",
                pressure : "psi",
                bitSize : "in",
                density : "g/cm3",
                concentration : "ppm",
                permeability : "mD",
                porosity : "v/v",
                angle : "deg",
                resistivity : "ohm.m",
                saturation : "v/v",
                temperature : "degC",
                volume : "v/v",
                sp : "mv",
                length : "m",
                time : "s",
                area : "m2",
                flow : "t",
                speed : "m/s",
                force : "N"    
            },
            Metric : {
                unitSystem : "Metric",
                caliper : "cm", 
                neutron : "%",
                gammaRay : "api",
                acoustic : "us/ft",
                pressure : "mBar",
                bitSize : "cm",
                density : "g/cm3",
                concentration : "ppm",
                permeability : "mD",
                porosity : "v/v",
                angle : "deg",
                resistivity : "ohm.m",
                saturation : "v/v",
                temperature : "degC",
                volume : "v/v",
                sp : "mv",
                length : "m",
                time : "s",
                area : "m2",
                flow : "t",
                speed : "m/s",
                force : "N"    
            },
            Russian : {
                unitSystem : "Russian",
                caliper : "cm", 
                neutron : "%",
                gammaRay : "api",
                acoustic : "us/ft",
                pressure : "mBar",
                bitSize : "cm",
                density : "g/cm3",
                concentration : "ppm",
                permeability : "mD",
                porosity : "v/v",
                angle : "deg",
                resistivity : "ohm.m",
                saturation : "v/v",
                temperature : "degC",
                volume : "v/v",
                sp : "mv",
                length : "m",
                time : "s",
                area : "m2",
                flow : "t",
                speed : "m/s",
                force : "N"                 
            }
        };
        this.allData = {
            unitSystem : ["Default", "Canadian", "English", "Metric", "Russian"],
            caliper : ["in", "m", "cm", "Ft", "1.Ft", "mm", "um"],
            neutron : ["v/v", "Trac", "%", "pu", "imp/min"],
            gammaRay : ["api", "GAPI", "uR/h", "GAMA"], 
            acoustic : ["us/ft", "us/m"],
            pressure : ["psi", "Pa", "kPa", "MPa", "mBar", "Bar", "kg/m2", "atm", "torr"],
            bitSize : ["in", "m", "cm", "Ft", "1.Ft", "mm", "um"],
            density : ["g/cm3", "kg/m3"],
            concentration : ["v/v", "%", "ppm", "kpp", "m", "1/L", "mS/m", "1/kg", "dB/m", "mV", "galUS/min", "mD/cP", "b/elec", "b/cm3", "m3/d", "MV"],
            permeability : ["mD", "D"],
            porosity : ["v/v", "m3/m3", "ft3/ft3", "%", "imp/min", "ratio"],
            angle : ["deg", "dega", "grad", "rad"],
            resistivity : ["ohm.m", "ratio"],
            saturation : ["v/v", "m3/m3", "ft3/ft3",  "%", "ratio"],
            temperature : ["degC", "degF"],
            volume : ["v/v", "cm3", "L.m"],
            sp : ["mv"],
            length : ["m"],
            time : ["s"],
            area : ["m2"],
            flow : ["t"],
            speed : ["m/s", "m2", "ft/h", "ratio", "ft/s", "m/min", "rpm", "mn/m"],
            force : ["N"]
        };
        function copyObj(sourceObj, destObj) {
            for( var attr in sourceObj ) {
                destObj[attr] = sourceObj[attr];
            }
        };
        this.selectedData = {};
        var self = this;
        copyObj(self.defaultData.Default, self.selectedData);
        this.setDefault = function(){
            copyObj(self.defaultData.Default, self.selectedData);
        };
        this.changeDefault = function(){
            switch (self.selectedData.unitSystem) {
                case "Default":
                    copyObj(self.defaultData.Default, self.selectedData);
                    break;
                case "Canadian":
                    copyObj(self.defaultData.Canadian, self.selectedData);
                    break;
                case "English":
                    copyObj(self.defaultData.English, self.selectedData);
                    break;
                case "Metric":
                    copyObj(self.defaultData.Metric, self.selectedData);
                    break;
                case "Russian":
                    copyObj(self.defaultData.Russian, self.selectedData);
                    break;
                default:
                    console.log("Error: NULL");
                    break;
            }
        };
        console.log(self.selectedData.unitSystem)
        this.close = function(ret) {
            close(ret);
            
        }                    
    }
    ModalService.showModal({
        template:'<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="wiModal.close()" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"><span class="project-open-16x16"></span>&nbsp;FRMUnitSettings</h4></div><div class="modal-body"><form class="form-horizontal" name="modalUnitSetting"><div class="row"><div class="col-sm-6"><div class="form-group"><label class="control-label col-sm-4 small-text" for="unitSystem">Unit System</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.unitSystem" name="unitSystem" value class="form-control wi-form-control" ng-options="item for item in wiModal.allData.unitSystem track by item" ng-change="wiModal.changeDefault();"></select></div></div></div><div class="col-sm-6"><button class="btn btn-default" ng-click="wiModal.setDefault();">Default</button></div></div><div class="row"><div class="col-sm-6"><div class="form-group"><label class="control-label col-sm-4 small-text" for="caliper">Caliper</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.caliper" name="caliper" value class="form-control wi-form-control" ng-options="item for item in wiModal.allData.caliper track by item"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="neutron">Neutron</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.neutron" name="neutron" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.neutron track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="gammaRay">Gamma Ray</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.gammaRay" name="gammaRay" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.gammaRay track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="acoustic">Acoustic</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.acoustic" name="acoustic" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.acoustic track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="pressure">Pressure</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.pressure" name="pressure" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.pressure track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="bitSize">BitSize</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.bitSize" name="bitSize" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.bitSize track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="density">Density</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.density" name="density" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.density track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="concentration">Concentration</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.concentration" name="concentration" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.concentration track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="permeability">Permeability</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.permeability" name="permeability" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.permeability track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="porosity">Porosity</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.porosity" name="porosity" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.porosity track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="angle">Angle</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.angle" name="angle" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.angle track by x"></select></div></div></div><div class="col-sm-6"><div class="form-group"><label class="control-label col-sm-4 small-text" for="resistivity">Resistivity</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.resistivity" name="resistivity" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.resistivity track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="saturation">Saturation</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.saturation" name="saturation" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.saturation track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="temperature">Temperature</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.temperature" name="temperature" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.temperature track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="volume">Volume</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.volume" name="volume" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.volume track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="sp">Sp</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.sp" name="sp" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.sp track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="length">Length</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.length" name="length" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.length track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="time">Time</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.time" name="time" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.time track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="area">Area</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.area" name="area" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.area track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="flow">Flow</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.flow" name="flow" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.flow track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="speed">Speed</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.speed" name="speed" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.speed track by x"></select></div></div><div class="form-group"><label class="control-label col-sm-4 small-text" for="force">Force</label><div class="col-sm-8"><select ng-model="wiModal.selectedData.force" name="force" value class="form-control wi-form-control" ng-options="x for x in wiModal.allData.force track by x"></select></div></div></div></div></form></div><div class="modal-footer"><button type="button" ng-click="wiModal.close(wiModal.selectedData);" class="btn btn-default" data-dismiss="modal"><span class="ok-16x16"></span>&nbsp;OK</button> <button type="button" ng-click="wiModal.close(\'Cancel click\')" class="btn btn-default" data-dismiss="modal"><span class="close-16x16"></span>&nbsp;Cancel</button></div></div></div></div>',
        controller: ModalController,
        controllerAs: 'wiModal'
    }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });

}

exports.addNewDialog = function(ModalService, callbak) {
    function ModalController($scope, close) {

        this.close = function(ret) {
            close(ret);
        }
    }
    ModalService.showModal({
        template:'<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="wiModal.close(\'Cancel\')" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"><span class="well-marker-add-32x32"></span>&nbsp;Create New Well</h4><h5 class="modal-infomation-title">&nbsp;Well Infomation</h5></div><div class="modal-body"><div><form class="form-horizontal" name="modalAddNew"><div class="form-group"><label class="control-label col-sm-3" for="wellName">Well name:</label><div class="col-sm-9"><input type="text" class="form-control" id="wellName" name="wellName" ng-model="wellName" required> <span ng-show="modalAddNew.wellName.$dirty && modalAddNew.wellName.$error.required">Required*</span></div></div><div class="form-group"><label class="control-label col-sm-3" for="topDepth">Top Depth (m)</label><div class="col-sm-9"><input type="number" class="form-control" id="topDepth" name="topDepth" ng-model="topDepth" currency-mask></div></div><div class="form-group"><label class="control-label col-sm-3" for="bottomDepth">Bottom Depth (m):</label><div class="col-sm-9"><input type="number" class="form-control" id="bottomDepth" name="bottomDepth" ng-model="bottomDepth"></div></div><div class="form-group"><label class="control-label col-sm-3" for="step">Step (m):</label><div class="col-sm-9"><input type="number" class="form-control" id="step" name="step" ng-model="step"></div></div><p>&nbsp;Leave blank for loading modules to auto create when loading first file</p></form></div></div><div class="modal-footer"><button type="button" ng-click="wiModal.close(wiModal.onOK())" class="btn btn-default" data-dismiss="modal"><span class="ok-16x16"></span>&nbsp;OK</button> <button type="button" ng-click="wiModal.close(\'Cancel\')" class="btn btn-default" data-dismiss="modal"><span class="close-16x16"></span>&nbsp;Cancel</button></div></div></div></div>',
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}

exports.wellHeaderDialog = function(ModalService, callback) {
    function ModalController($scope, close) {
        this.wellHeader = ["well1", "well2", "well3"];
        this.close = function(ret) {
            close(ret);
        }
    }
    ModalService.showModal({
        template:'<div class="modal fade"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header container-fluid"><button type="button" class="close" ng-click="wiModal.close(\'Cancel\')" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"><span class="project-new-16x16"></span>&nbsp;Well Header</h4></div><div class="modal-body container-fluid"><form class="form-horizontal" name="modalWellHeader"><div class="row"><div class="col-sm-4"><div class="form-group"><label class="control-label col-sm-5 small-text" for="well">Well</label><div class="col-sm-7"><select ng-model="wiModal.well" name="well" ng-options="item for item in wiModal.wellHeader track by item" class="form-control wi-form-control"></select></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="author">Author</label><div class="col-sm-7"><input class="form-control wi-form-control" type="text" name="author" ng-model="wiModal.author"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="date">Date</label><div class="col-sm-7"><input type="text" name="date" class="form-control wi-form-control" ng-model="wiModal.date"></div></div><div class="form-group"><label for="serviceCompany" class="control-label col-sm-5 small-text">Service Company</label><div class="col-sm-7"><input type="text" name="serviceCompany" class="form-control wi-form-control" ng-model="wiModal.serviceCompany"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="company">Company</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="company" name="company" ng-model="company"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="companyLogo">Company Logo</label><div class="col-sm-7"><div class="area text-center padding-tb-small">Browser company logo</div></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="field">Field</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="field" name="field" ng-model="field"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="state">State</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="state" name="state" ng-model="state"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="country">Country</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="country" name="country" ng-model="country"></div></div><div class="form-group"><label class="control-label col-sm-5 tiny-text">Unique Well Identifier (UWI)</label><div class="col-sm-7"><input type="text" name="serviceCompany" class="form-control wi-form-control" ng-model="wiModal.uwi"></div></div><div class="form-group"><label class="control-label col-sm-5 tiny-text" for="coordinateSystem">Coordinate System</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="coordinateSystem" name="coordinateSystem" ng-model="coordinateSystem"></div></div></div><div class="col-sm-4"><div class="form-group"><label class="control-label col-sm-5 small-text">SPUD Day</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" ng-model="wiModal.spudDay"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text">Completion Day</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" ng-model="wiModal.completionDay"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text">Elevation</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" ng-model="wiModal.elevation"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text">Elevation Datum</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" ng-model="wiModal.elevationDatum"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="status">Status</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="status" name="status" ng-model="status"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="operator">Operator</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="operator" name="operator" ng-model="operator"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="longitude">Longitude</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="longitude" name="longitude" ng-model="longitude"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="latitude">Latitude</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="latitude" name="latitude" ng-model="latitude"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="northings">Northings (Y)</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="northings" name="northings" ng-model="northings"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="eastings">Eastings (X)</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="eastings" name="eastings" ng-model="eastings"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="zone">Zone</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="zone" name="zone" ng-model="zone"></div></div></div><div class="col-sm-4"><div class="form-group"><label class="control-label col-sm-5 small-text" for="totalDepth">Total Depth</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="totalDepth" name="totalDepth" ng-model="totalDepth"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="license">License</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="license" name="license" ng-model="license"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="unit">Unit</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="unit" name="unit" ng-model="unit"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="county">County</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="county" name="county" ng-model="county"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="province">Province</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="province" name="province" ng-model="province"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="project">Project</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="project" name="project" ng-model="project"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="gen1">Gen 1</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="gen1" name="gen1" ng-model="gen1"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="gen2">Gen 2</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="gen2" name="gen2" ng-model="gen2"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="gen3">Gen 3</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="gen3" name="gen3" ng-model="gen3"></div></div><div class="form-group"><label class="control-label col-sm-5 small-text" for="gen4">Gen 4</label><div class="col-sm-7"><input type="text" class="form-control wi-form-control" id="gen4" name="gen4" ng-model="gen4"></div></div></div></div></form></div><div class="modal-footer container-fluid"><div class="row"><button type="button" ng-click="wiModal.close(wiModal.onOK())" class="btn btn-default" data-dismiss="modal"><span class="ok-16x16"></span>&nbsp;OK</button> <button type="button" ng-click="wiModal.close(\'Cancel\')" class="btn btn-default" data-dismiss="modal"><span class="close-16x16"></span>&nbsp;Cancel</button></div></div></div></div></div>',
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}
exports.depthConversionDialog = function(ModalService, DialogUtils, callback) {
    console.log(DialogUtils);
    function ModalController($scope, close) {
        this.close = function(ret) {
            close(ret);
        }
        this.runClick = function(){
            console.log("Click run");
            DialogUtils.confirmDialog(ModalService, "Run ", "Project", function(ret) {
                console.log(ret);
            });
        }
    }
    ModalService.showModal({
        template:'<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="wiModal.close()" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">&nbsp;Depth Conversion</h4></div><div class="modal-body"><form class="form-horizontal" name="modalAddNew"><div class="row"><div class="col-sm-7"><div class="form-group"><label class="control-label col-sm-5" for="well">Select well</label><div class="col-sm-7"><select ng-model="wiModal.selectWell" name="selectWell" ng-options="item for item in wiModal.selectWellList track by item" class="form-control"></select></div></div></div></div><div class="row"></div><div class="row"><div class="col-sm-7"><div class="form-group"><label class="control-label col-sm-5" for="step">Step</label><div class="col-sm-7"><input type="number" class="form-control" id="originalStep" name="step" ng-model="wiModal.originalStep"></div></div><div class="form-group"><label class="control-label col-sm-5" for="topDepth">Top Depth</label><div class="col-sm-7"><input type="number" class="form-control" id="originalTopDepth" name="topDepth" ng-model="wiModal.originalTopDepth"></div></div><div class="form-group"><label class="control-label col-sm-5" for="bottomDepth">Bottom Depth</label><div class="col-sm-7"><input type="number" class="form-control" id="originalBottomDepth" name="bottomDepth" ng-model="originalBottomDepth"></div></div></div><div class="col-sm-4"><div class="form-group"><input type="number" class="form-control" id="newStep" name="step" ng-model="newStep"></div><div class="form-group"><input type="number" class="form-control" id="newTopDepth" name="topDepth" ng-model="newTopDepth"></div><div class="form-group"><input type="number" class="form-control" id="newBottomDepth" name="bottomDepth" ng-model="newBottomDepth"></div><div class="areaWrap"><label><input type="radio" name="fixed" value="topFixed" ng-model="wiModal.fixed" ng-checked="true">&nbsp;Fixed Top</label><br><label><input type="radio" name="fixed" value="bottomFixed" ng-model="wiModal.fixed">&nbsp;Fixed Bottom</label> {{wiModal.fixed}}</div></div></div></form></div><div class="modal-footer"><button type="button" ng-click="wiModal.runClick()" class="btn btn-default"><span class="run-16x16"></span>&nbsp;Run</button> <button type="button" ng-click="wiModal.close(\'Cancel\')" class="btn btn-default" data-dismiss="modal"><span class="close-16x16"></span>&nbsp;Cancel</button></div></div></div></div>',
        controller : ModalController,
        controllerAs : "wiModal"
    }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}

exports.curveAliasDialog = function(ModalService, callback) {
    function ModalController($scope, close) {
        this.addCurveName = function(curveAlias){

        }
        this.isSelected = function(item) {
            console.log(item);
            return "";
        }
        
        
        this.close = function(ret) {
            close(ret);
        }
    }
    ModalService.showModal({
        template:'<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="wiModal.close(\'Cancel\')" data-dismiss="modal" aria-hidden="true">&times;</button><h4><span class="curve-header-edit-16x16"></span>&nbsp;Curve Alias</h4></div><div class="modal-body"><form class="form-horizontal" name="modalCurveAlias"><h5>Alias by</h5><div class="areaWrap text-center"><label class="radio-inline"><input type="radio" name="curve" value="none" ng-model="wiModal.curveAlias" ng-checked="true">&nbsp;None</label> <label class="radio-inline"><input type="radio" name="curve" value="curveName" ng-model="wiModal.curveAlias">&nbsp;Curve name</label> <label class="radio-inline"><input type="radio" name="curve" value="familyName" ng-model="wiModal.curveAlias">&nbsp;Family name</label></div><div ng-switch="wiModal.curveAlias"><div ng-switch-when="none"><div class="noneArea fixedHeight"><div class="row"><div class="col-sm-5 text-center"><p>Name</p></div><div class="col-sm-7 text-center"><p>Alias</p></div></div></div></div><div ng-switch-when="curveName"><div class="curveNameArea fixedHeight"><div class="checkbox"><label><input type="checkbox">Use Search Option</label></div></div></div></div></form></div><div class="modal-footer"><button class="btn btn-default" ng-click="wiModal.close()"><span class="ok-16x16"></span>Ok</button> <button class="btn btn-default" ng-click="wiModal.close()"><span class="cancel-16x16"></span>Cancel</button></div></div></div></div>',
        controller : ModalController,
        controllerAs : "wiModal"
    }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}

exports.familyEditDialog = function(ModalService, callback) {
    function ModalController($scope, close) {
        this.close = function(ret) {
            close(ret);
        }
    }

    ModalService.showModal({
        template:'<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="wiModal.close()" data-dismiss="modal" aria-hidden="true">&times;</button><h4><span class="curve-header-edit-16x16"></span>&nbsp;Family Edit</h4></div><div class="modal-body"><table class="table"><thead><tr><td>Dataset Name</td><td>Curve Name</td><td>Family</td><td>Unit</td></tr></thead><tbody><tr><td><select class="form-control" ng-model="datasetName"><option ng-repeat></option></select></td><td><select class="form-control" ng-model="datasetName"><option ng-repeat></option></select></td><td><select class="form-control" ng-model="datasetName"><option ng-repeat></option></select></td><td><input type="text" class="form-control"></td></tr></tbody></table></div><div class="modal-footer"><button class="btn btn-default" ng-click="wiModal.close()"><span class="ok-16x16"></span>Ok</button> <button class="btn btn-default" ng-click="wiModal.close()"><span class="cancel-16x16"></span>Cancel</button></div></div></div></div>',
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}
},{}],2:[function(require,module,exports){
var DialogUtils = require('./DialogUtils');
var app = angular.module('app', ['angularModalService']);

app.controller('SampleController', function($scope, ModalService) {
    $scope.show = function() {
        DialogUtils.curveAliasDialog(ModalService, function(ret) {
        	console.log(ret);
        });
    }
});


},{"./DialogUtils":1}]},{},[2]);
