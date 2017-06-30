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
PROPERTIES_LIST_CONFIG_TEST_1 = [
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

PROPERTIES_LIST_CONFIG_TEST_2 = [
    {
        name: 'list3',
        heading: 'List 3',
        data: [
            {
                key: 'key3',
                value: 'value'
            },
            {
                key: 'key3',
                value: 'value'
            },
            {
                key: 'key3',
                value: 'value'
            }
        ]
    },
    {
        name: 'list4',
        heading: 'List 4',
        data: [
            {
                key: 'key4',
                value: 'value'
            },
            {
                key: 'key4',
                value: 'value'
            }
        ]
    }
];

PROPERTIES_LIST_CONFIG_TEST_3 = [
    {
        name: 'list5',
        heading: 'List 5',
        data: [
            {
                key: 'key5',
                value: 'value'
            },
            {
                key: 'key5',
                value: 'value'
            },
            {
                key: 'key5',
                value: 'value'
            }
        ]
    },
    {
        name: 'list6',
        heading: 'List 6',
        data: [
            {
                key: 'key6',
                value: 'value'
            },
            {
                key: 'key6',
                value: 'value'
            }
        ]
    }
];

EXPLORER_TREE_CONFIG = [
    {
        name: 'item11000',
        type: 'item11000',
        data: {
            icon: 'project-new-16x16',
            label: 'item 11000',
            description: 'mm',
            childExpanded: false,
            properties: PROPERTIES_LIST_CONFIG_TEST_2
        },
        children: [
            {
                name: 'item11',
                type: 'item11',
                data: {
                    icon: 'project-new-16x16',
                    label: 'item 1.1',
                    description: 'hu hu hu',
                    childExpanded: false,
                    properties: PROPERTIES_LIST_CONFIG_TEST_3
                },
                children: [
                    {
                        name: 'item1211',
                        type: 'item121',
                        data: {
                            icon: 'project-new-16x16',
                            label: 'item 1.2.1.1',
                            description: 'hic',
                            childExpanded: false,
                            properties: PROPERTIES_LIST_CONFIG_TEST_1
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
                            childExpanded: false,
                            properties: PROPERTIES_LIST_CONFIG_TEST_2
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
                    childExpanded: false,
                    properties: PROPERTIES_LIST_CONFIG_TEST_3
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
            childExpanded: false,
            properties: PROPERTIES_LIST_CONFIG_TEST_2
        }
    },
    {
        name: 'logplot1',
        type: 'logplot',
        data: {
            icon: 'project-new-16x16',
            label: 'Logplot',
            description: 'Logplot',
            childExpanded: false,
            properties: PROPERTIES_LIST_CONFIG_TEST_3
        }
    }
];


exports.TREE_CONFIG_TEST = EXPLORER_TREE_CONFIG;
exports.LIST_CONFIG_TEST = PROPERTIES_LIST_CONFIG_TEST_1;

},{}],3:[function(require,module,exports){
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

function appendTrackHeader(container, trackName) {
    container.append('div')
        .attr('class', 'track-header text-center')
            .append('label')
            .attr('class', 'track-name text-center')
                .text(trackName);
}

function appendDepthHeader(base, unit) {
    var trackHeader = base.selectAll('.track-header');
    trackHeader.append('label')
        .attr('class', 'data-header double-height text-center')
        .text(unit);
}

function appendToTrackHeader(base, dataSetName, unit, minVal, maxVal) {
    var unitHeaderData = [minVal, unit, maxVal];
    var trackHeader = base.selectAll('.track-header');
    var temp = trackHeader.append('label')
        .attr('class', 'data-header text-center')
        .text(dataSetName);

    trackHeader.append('label')
        .attr('class', 'unit-header flex-row')
        .selectAll('div').data(unitHeaderData).enter()
            .append('div')
                .attr('class', function(d, i) {
                    switch(i) {
                        case 0:
                            return 'text-left';
                        case 1:
                            return 'flex-1 text-center';
                        case 2:
                            return 'text-right';
                    }
                    return '';
                })
                .text(function(d) { return d; });
}

function appendTrack(baseElement, trackName, plotWidth) {
    var trackContainer = d3.select(baseElement).append('div')
        .attr('class', 'track-container')
        .style('width', plotWidth + 'px');
    appendTrackHeader(trackContainer, trackName);
    trackContainer.append('div')
        .attr('class', 'plot-container');
    return trackContainer;
}

function DepthTrack(config) {
    var self = this;
    var _viewportX = new Array(), _viewportY = new Array();
    
    if( !config ) {
        console.error("config must not be null");
        return;
    }
    var unit = config.unit || 'm';
    var root;
    var base;
    var svg;
    var clientRect;
    var yAxisGroup;
    var yAxisGroup1;
    var transformY;
    var yAxisClass = 'depthtrack';
    var yNTicks = config.yNTicks || 20;
    var plotWidth = config.plotWidth || 200;
    var yStep = config.yStep || 1.0;
    var yFormatter = d3.format(config.yFormatter || 'g');
    var xPadding = config.xPadding || 0, yPadding = config.yPadding || 0;
    this.getYStep = function() { 
        return yStep; 
    }
    this.init = function(baseElement) {
        root = appendTrack(baseElement, 'Depth', plotWidth);
        base = root.select('.plot-container');
        appendDepthHeader(root, unit);
        clientRect = base.node().getBoundingClientRect();

        svg = base.append('svg')
                .attr('width', clientRect.width)
                .attr('height', clientRect.height);
        yAxisGroup = svg.append('g')
            .attr('class', yAxisClass)
            .attr('transform', 'translate(' + (clientRect.width - xPadding) + ', 0)');
        yAxisGroup1 = svg.append('g')
            .attr('class', yAxisClass);
            //.attr('transform', 'translate(' + (clientRect.width - xPadding) + ', 0)');
    }
    function _doPlot() {
        transformY = d3.scaleLinear().domain(_viewportY).range([yPadding, clientRect.height - yPadding]);
        function setupAxes() {
            var start = roundUp(_viewportY[0], yStep);
            var end = roundDown(_viewportY[1], yStep);
            var yAxis = d3.axisLeft(transformY)
                .tickValues(d3.range(start, end, (end - start)/yNTicks))
                .tickFormat(yFormatter)
                .tickSize(5);
            var yAxis1 = d3.axisRight(transformY)
                .tickValues(d3.range(start, end, (end - start)/yNTicks))
                .tickFormat('')
                .tickSize(5);

            yAxisGroup.call(yAxis);
            yAxisGroup1.call(yAxis1);
        }
        setupAxes();
    }
    this.doPlot = function() {
        _doPlot();
    }
    this.setYRange = function(vY) {
        _viewportY[0] = vY[0];
        _viewportY[1] = vY[1];
    }
}
function Plot(config) {
    var self = this;
    var _data, _viewportX = new Array(), _viewportY = new Array();
    if( !config ) {
        console.error("config must not be null");
        return;
    }
    var root;
    var base;
    var svg;
    var clientRect;
    var translateOpts = new Object();
    var ctx;
    var xAxisGroup, yAxisGroup;
    var transformX;
    var transformY;
    var xAxisClass = 'grid', yAxisClass = 'grid';
    var xAxisPosition = config.xAxisPosition || 'top', yAxisPosition = config.yAxisPosition || 'left';
    var xNTicks = config.xNTicks || 4;
    var yNTicks = config.yNTicks || 20;
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
        root = appendTrack(baseElement, 'Track', plotWidth);
        base = root.select('.plot-container');
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
                //.tickFormat(xFormatter)
                .tickFormat("")
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
        plotOnCanvas();
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
    this.setData = function(data, dataSetName, unit, min, max) {
        appendToTrackHeader(root, dataSetName, unit, min, max);
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
    this.adjustXRange = function(kFactor) {
        if( _data ) {
            var tempVport= d3.extent(_data, function(d) { return d.x; });
            _viewportX[0] = 0;
            _viewportX[1] = tempVport[1] * kFactor;
        }
    }
    const trackerLifetime = 10 * 1000; // 1 seconds
    this.periodicTask = function() {
        if( Date.now() - freshness > trackerLifetime )
            svg.selectAll('.wi-tooltip, .tooltipBg, .tooltipLine').remove();
    }
    registeredPlots.push(this);
}
exports.createLogTrack = function(config, domElem) {
    var plot = new Plot(config);
    plot.init(domElem);
    return plot;
}
exports.createDepthTrack = function(config, domElem) {
    var depthTrack = new DepthTrack(config);
    depthTrack.init(domElem);
    return depthTrack;
}

},{}],4:[function(require,module,exports){
exports.NewProjectButtonClicked = function() {
    console.log('NewProjectButton is clicked ', this);
    var wiComponentService = this.wiComponentService;
    var DialogUtils = wiComponentService.getComponent('DIALOG_UTILS');
    DialogUtils.newProjectDialog(this.$scope, this.ModalService );
}

exports.OpenProjectButtonClicked = function() {
    console.log('OpenProjectButtoon is clicked');
    // var myPlot = this.wiComponentService.getComponent('myLogPlotD3Area');
    // if (!myPlot) return;
    // var slidingBar = this.wiComponentService.getComponent('myLogPlotSlidingbar');
    // if (!slidingBar) return;
    //
    // var idx = myPlot.addDepthTrack();
    //
    // idx = myPlot.addTrack();
    //
    // myPlot.setData(idx, genSamples(10000));
    //
    // var maxDepth = myPlot.getMaxDepth();
    //
    // var low = slidingBar.slidingBarState.top * maxDepth / 100;
    // var high = (slidingBar.slidingBarState.top + slidingBar.slidingBarState.range) * maxDepth / 100;
    // console.log(slidingBar.slidingBarState, low, high, maxDepth);
    // myPlot.setDepthRange([low, high]);
    // myPlot.plotAll();
}

exports.CloseProjectButtonClicked = function() {
    console.log('CloseProjectButton is clicked');
    var wiComponentService = this.wiComponentService;
    var DialogUtils = wiComponentService.getComponent('DIALOG_UTILS');
    DialogUtils.confirmDialog(this.ModalService, "Close project", "Are you sure to close project?", function(yesOrNo){
        console.log("User choose: "+yesOrNo);
    })
}

exports.UnitSettingsButtonClicked = function() {
    console.log('UnitSettingsButton is clicked');
    var wiComponentService = this.wiComponentService;
    var DialogUtils = wiComponentService.getComponent('DIALOG_UTILS');
    DialogUtils.unitSettingDialog(this.ModalService, function(ret) {
        console.log("User Choose: " + ret);
    })
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
    var wiComponentService = this.wiComponentService;
    var DialogUtils = wiComponentService.getComponent('DIALOG_UTILS');
    DialogUtils.confirmDialog(this.ModalService, "Exit Program", "Are you exit program?", function(ret) {
        console.log("User choose: " + ret);
    })
}

exports.AddNewButtonClicked = function() {
    console.log('AddNewButton is clicked');
    var wiComponentService = this.wiComponentService;
    var DialogUtils = wiComponentService.getComponent('DIALOG_UTILS');
    DialogUtils.addNewDialog(this.ModalService, function(ret) {
        console.log("User Choose: " + ret);
    })
}

exports.WellHeaderButtonClicked = function() {
    console.log('WellHeaderButton is clicked');
    var wiComponentService = this.wiComponentService;
    var DialogUtils = wiComponentService.getComponent('DIALOG_UTILS');
    DialogUtils.wellHeaderDialog(this.ModalService, function(ret) {
        console.log("User choose: " + ret);
    })
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


},{}],5:[function(require,module,exports){
let layoutManager;
let compileFunc;
let scopeObj;
let layoutConfig = {
    settings: {
        hasHeaders: true,
        showCloseIcon: false,
        showPopoutIcon: false
    },
    dimensions: {
        borderWidth: 5
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
        container.getElement().html(compileFunc(templateHtml)(scopeObj));
    });

    layoutManager.registerComponent('html-block', function (container, componentState) {
        let html = componentState.html;
        container.getElement().html(compileFunc(html)(scopeObj));

        // container.on('shown', function (e) {
        //     console.log('componentState', componentState)
        // })
    });

    // todo: remove test
    // layoutManager.on('stackCreated' , function (stack) {
    //     stack.on('activeContentItemChanged', function (contentItem) {
    //         console.log('activeContentItemChanged contentItem', contentItem);
    //     })
    // });

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

},{}],6:[function(require,module,exports){
let appConfig = require('./app.config');
let utils = require('./utils');

let DialogUtils = require('./DialogUtils');

let wiButton = require('./wi-button.js');
let wiDropdown = require('./wi-dropdown.js');
let wiToolbar = require('./wi-toolbar.js');
let wiTabs = require('./wi-tabs.js');

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
let explorerHandlers = require('./wi-explorer-handlers');
let treeviewHandlers = require('./wi-treeview-handlers');

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
        wiTabs.name,
        wiTreeview.name,
        wiStatusBar.name,
        wiSlidingbar.name,
        wiList.name,

        wiD3.name,
        wiLogplot.name,
        wiExplorer.name,
        wiProperties.name,

        wiComponentService.name,

        'angularModalService'

    ]);
__WICS = null;
app.controller('AppController', function ($scope, $rootScope, $timeout, $compile, wiComponentService, ModalService) {
    // SETUP HANDLER FUNCTIONS
    let globalHandlers = {};
    let treeHandlers = {};
    bindFunctions(globalHandlers, handlers, $scope, wiComponentService, ModalService);
    bindFunctions(globalHandlers, logplotHandlers, $scope, wiComponentService, ModalService);
    bindFunctions(globalHandlers, explorerHandlers, $scope, wiComponentService, ModalService);
    bindFunctions(treeHandlers, treeviewHandlers, $scope, wiComponentService, ModalService);
    wiComponentService.putComponent('GLOBAL_HANDLERS', globalHandlers);
    wiComponentService.putComponent('TREE_FUNCTIONS', treeHandlers);

    // Hook globalHandler into $scope
    $scope.handlers = wiComponentService.getComponent('GLOBAL_HANDLERS');


    // config explorer block - treeview
    $scope.myTreeviewConfig = appConfig.TREE_CONFIG_TEST;
    //wiComponentService.treeFunctions = bindAll(appConfig.TREE_FUNCTIONS, $scope, wiComponentService);

    // config properties - list block
    $scope.myPropertiesConfig = appConfig.LIST_CONFIG_TEST;

    /* ========== IMPORTANT! ================== */
    wiComponentService.putComponent('GRAPH', graph);
    /* ======================================== */
    wiComponentService.putComponent('DIALOG_UTILS', DialogUtils);

    layoutManager.createLayout('myLayout', $scope, $compile);
    layoutManager.putLeft('explorer-block', 'Explorer');
    layoutManager.putLeft('property-block', 'Properties');
    layoutManager.putWiLogPlotRight('myLogPlot', 'my plot');

    // Install 
    wiComponentService.on('add-logplot-event', function (title) {
        layoutManager.putWiLogPlotRight('myLogPlot' + Date.now(), title);
    });

});
function bindFunctions(destHandlers, sourceHandlers, $scope, wiComponentService, ModalService) {
    for (let handler in sourceHandlers) {
        destHandlers[handler] = sourceHandlers[handler].bind({
            $scope: $scope,
            wiComponentService: wiComponentService,
            ModalService: ModalService
        });
    }
}

},{"./DialogUtils":1,"./app.config":2,"./graph":3,"./handlers":4,"./layout":5,"./utils":7,"./wi-button.js":8,"./wi-component-service":9,"./wi-d3":10,"./wi-dropdown.js":11,"./wi-explorer":13,"./wi-explorer-handlers":12,"./wi-list":14,"./wi-logplot":16,"./wi-logplot-handlers":15,"./wi-properties":17,"./wi-slidingbar":18,"./wi-status-bar":19,"./wi-tabs.js":20,"./wi-toolbar.js":21,"./wi-treeview":23,"./wi-treeview-handlers":22}],7:[function(require,module,exports){
'use strict';

function copyProperties(objectDest, objectCopy) {
    for (let prop in objectCopy) {
        objectDest[prop] = objectCopy[prop];
    }

    console.log(objectDest)
}

exports.copyProperties = copyProperties;
},{}],8:[function(require,module,exports){
const wiButtonName = 'wiButton';
const moduleName = 'wi-button';

function ButtonController(wiComponentService) {
    let self = this;

    this.default = {
        type: 'normal',
        label: '',
        layout: 'icon-top',
        icon: 'project-new-32x32',
        disabled: false
    };

    this.onClick = function () {
        if (self.handler) self.handler();
    };

    this.$onInit = function() {
        if (self.disabled === 'true'){
            self.disabled = true;
        } else {
            self.disabled = self.default.disabled;
        }

        if (self.name) wiComponentService.putComponent(self.name, self);
    }
}

let app = angular.module(moduleName, []);
app.component(wiButtonName, {
    template:'<div><button ng-click="wiButton.onClick()" class="button-{{wiButton.type || wiButton.config.type || wiButton.default.type}}" ng-disabled="wiButton.disabled"><img class="{{wiButton.icon || wiButton.config.icon || wiButton.default.icon}}" alt="icon wi-button"><p class="{{wiButton.layout || wiButton.config.layout || wiButton.default.layout}}" ng-show="wiButton.label != null || wiButton.config.label != null">{{wiButton.label || wiButton.config.label || wiButton.default.label}}</p></button></div>',
    controller: ButtonController,
    controllerAs: wiButtonName,
    bindings: {
        config: '<',
        type: '@',
        name: '@',
        label: '@',
        layout: '@',
        icon: '@',
        handler: '<',
        disabled: '@'
    }
});

exports.name = moduleName;

},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
const componentName = 'wiD3';
const moduleName = 'wi-d3';

let TRACK_CFG = {
    xNTicks: 4,
    yNTicks: 10,
    xAxisPosition: 'top',
    xFormatter: '.2f',
    yFormatter: '.2f',
    xPadding: 1,
    yPadding: 5,
    yStep: 0.25,
    plotWidth: 120
};

let DTRACK_CFG = {
    xNTicks: 4,
    yNTicks: 10,
    xAxisPosition: 'top',
    xFormatter: '.2f',
    yFormatter: '.2f',
    xPadding: 1,
    yPadding: 5,
    yStep: 0.25,
    plotWidth: 60
};

function Controller($scope, wiComponentService) {
    let self = this;
    let tracks = [];

    this.addTrack = function () {
        let graph = wiComponentService.getComponent('GRAPH');
        let track = graph.createLogTrack(TRACK_CFG, document.getElementById(self.plotAreaId));
        track.trackPointer(true);
        let len = tracks.push(track);

        return len - 1;
    };

    this.addDepthTrack = function () {
        let graph = wiComponentService.getComponent('GRAPH');
        let track = graph.createDepthTrack(DTRACK_CFG, document.getElementById(self.plotAreaId));
        let len = tracks.push(track);

        return len - 1;
    };

    this.setDepthRange = function (deepRange) {
        tracks.forEach(function (track) {
            track.setYRange(deepRange);
        });
    };

    this.getMaxDepth = function () {
        return d3.max(tracks, function (track) {
            if (track.getYMax) return track.getYMax();
            return -1;
        });
    };

    this.setData = function (trackIdx, data) {
        tracks[trackIdx].setData(data, 'Rock', 'm3', 0, 200);
        tracks[trackIdx].adjustXRange(1);
    };

    this.plot = function (trackIdx) {
        tracks[trackIdx].doPlot();
    };

    this.plotAll = function () {
        tracks.forEach(function (track) {
            track.doPlot();
            if (track.trackPointer) track.trackPointer(true);
        });
    };

    this.$onInit = function () {
        self.plotAreaId = self.name + 'PlotArea';
        if (self.name) {
            wiComponentService.putComponent(self.name, self);
        }
    };
}

let app = angular.module(moduleName, []);
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
// exports.NewProjectButtonClicked = function() {
//     console.log('NewProjectButton is clicked');
// }

// exports.OpenProjectButtonClicked = function() {
//     console.log('OpenProjectButton is clicked');
// }

// exports.CloseProjectButtonClicked = function() {
//     console.log('CloseProjectButton is clicked');
// }


},{}],13:[function(require,module,exports){
const componentName = 'wiExplorer';
const moduleName = 'wi-explorer';

function Controller($scope, wiComponentService) {
    let self = this;

    this.$onInit = function () {
        $scope.handlers = wiComponentService.getComponent('GLOBAL_HANDLERS');

        if (self.name) wiComponentService.putComponent(self.name, self);
    };
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<wi-toolbar name="DatabasesToolbar" icon label layout description type><wi-button name="NewProjectButton" icon="project-new-32x32" label layout description type="small" handler="handlers.NewProjectButtonClicked"></wi-button><wi-button name="OpenProjectButton" icon="project-open-32x32" label layout description type="small" handler="handlers.OpenProjectButtonClicked"></wi-button><wi-button name="CloseProjectButton" icon="project-close-32x32" label layout description type="small" handler="handlers.CloseProjectButtonClicked"></wi-button></wi-toolbar><div class="filter-block"><span>Filter:</span> <input type="text" placeholder="well or .../dataset or .../curve or ..."></div><div class="label_treeview"><span>Name</span><span>Unit</span></div><wi-treeview config="wiExplorer.treeConfig"></wi-treeview>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name: '@',
        treeConfig: '<'
    }
});

exports.name = moduleName;

},{}],14:[function(require,module,exports){
const componentName = 'wiList';
const moduleName = 'wi-list';

function Controller(wiComponentService) {
    let self = this;
    this.shown = true;

    this.$onInit = function() {
        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.addItem = function (key, value) {
        self.items.push({key, value});
    }
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<p ng-click="wiList.shown = !wiList.shown" class="list-heading position-relative cursor-pointer"><span class="text-left">{{wiList.heading}}</span> <span ng-show="!wiList.shown" class="block-right"><i class="ti-plus"></i></span> <span ng-show="wiList.shown" class="block-right"><i class="ti-minus"></i></span></p><table ng-show="wiList.shown"><tr ng-repeat="item in wiList.items"><td>{{item.key}}</td><td>{{item.value}}</td></tr></table>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name : '@',
        heading: '@',
        items: '<'
    }
});

exports.name = moduleName;

},{}],15:[function(require,module,exports){
function genSamples(nSamples) {
    var samples = new Array();
    for( let i = 0; i < nSamples; i++ ) {
        samples.push({y:i, x: Math.random()});
    }
    return samples;
}

exports.Test1ButtonClicked = function() {
    console.log('Test1Button is clicked');

    var myPlot = this.wiComponentService.getComponent('myLogPlotD3Area');
    if (!myPlot) return;
    var slidingBar = this.wiComponentService.getComponent('myLogPlotSlidingbar');
    if (!slidingBar) return;

    var idx = myPlot.addDepthTrack();

    idx = myPlot.addTrack();

    myPlot.setData(idx, genSamples(10000));

    var maxDepth = myPlot.getMaxDepth();

    var low = slidingBar.slidingBarState.top * maxDepth / 100;
    var high = (slidingBar.slidingBarState.top + slidingBar.slidingBarState.range) * maxDepth / 100;
    console.log(slidingBar.slidingBarState, low, high, maxDepth);
    myPlot.setDepthRange([low, high]);
    myPlot.plotAll();
}

exports.Test2ButtonClicked = function() {
    console.log('Test2Button is clicked');
}

exports.Test3ButtonClicked = function() {
    console.log('Test3Button is clicked');
}


},{}],16:[function(require,module,exports){
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

function Controller($scope, wiComponentService) {
    let self = this;
    let previousSlidingBarState = {};

    this.$onInit = function () {
        self.slidingbarName = self.name + 'Slidingbar';
        self.wiD3AreaName = self.name + 'D3Area';

        // hook globalHandlers into scope
        $scope.handlers = wiComponentService.getComponent("GLOBAL_HANDLERS");

        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.$doCheck = function () {
        if (!self.slidingBar) return;
        if (!isEqual(previousSlidingBarState, self.slidingBar.slidingBarState)) {
            objcpy(previousSlidingBarState, self.slidingBar.slidingBarState);
            let wiD3Controller = self.getwiD3Ctrl();
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

    this.getwiD3Ctrl = function () {
        return self.slidingBar = wiComponentService.getComponent(self.wiD3AreaName);
    };
}

let app = angular.module(moduleName, []);
app.component(componentName, {
    template:'<div class="logplot-toolbar-wrapper"><wi-toolbar name="Databases1Toolbar" icon label layout description type><wi-button name="Test1Button" icon="project-new-32x32" label layout description type="small" handler="handlers.Test1ButtonClicked"></wi-button><wi-button name="Test2Button" icon="project-open-32x32" label layout description type="small" handler="handlers.Test2ButtonClicked"></wi-button><wi-button name="Test3Button" icon="project-close-32x32" label layout description type="small" handler="handlers.Test3ButtonClicked"></wi-button></wi-toolbar></div><div class="logplot-main-content"><div class="slidingbar"><wi-slidingbar name="{{wiLogplot.slidingbarName}}" ng-init="wiLogplot.getSlidingbarCtrl()"></wi-slidingbar></div><div class="track-area"><wi-d3 style="width: 100%; flex: 1; display: flex;" name="{{wiLogplot.wiD3AreaName}}"></wi-d3></div></div>',
    controller: Controller,
    controllerAs: componentName,
    transclude: true,
    bindings: {
        name: '@'
    }
});

exports.name = moduleName;

},{}],17:[function(require,module,exports){
const componentName = 'wiProperties';
const moduleName = 'wi-properties';

function Controller(wiComponentService) {
    let self = this;

    this.$onInit = function () {
        if (self.name) wiComponentService.putComponent(self.name, self);

        wiComponentService.on('update-properties', doUpdateListConfig);
    };

    function doUpdateListConfig(newConfig) {
        self.listConfig = newConfig;
    }

    this.updateListConfig = function(newConfig) {
        doUpdateListConfig(newConfig);       
    }
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

},{}],18:[function(require,module,exports){
const componentName = 'wiSlidingbar';
const moduleName = 'wi-slidingbar';

const MIN_RANGE = 1;

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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
const tabsetComponentName = 'wiTabset';
const tabComponentName = 'wiTab';
const moduleName = 'wi-tabs';

function TabsetController() {
    let self = this;

    this.tabs = [];

    this.selectTab = function (index) {
        deactiveAllTabs(self.tabs);

        self.tabs[index].active = true;
    };

    this.closeTab = function (index) {
        deactiveAllTabs(self.tabs);

        console.log(self.tabs);

        self.tabs.splice(index, 1);
        if (self.tabs.length !== 0) {
            if (index < self.tabs.length) {
                self.tabs[index].active = true;
            } else {
                self.tabs[self.tabs.length - 1].active = true;
            }
        }
    };

    this.addTab = function (tab) {
        self.tabs.push(tab);
        self.tabs[self.tabs.length - 1].active = (self.tabs.length === 1);
    };

    function deactiveAllTabs(tabs) {
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].active = false;
        }
    }
}

let app = angular.module(moduleName, []);
app.component(tabsetComponentName, {
    template:'<div><ul class="nav nav-tabs"><li class="wi-tab" ng-repeat="tab in wiTabset.tabs track by $index" ng-class="{\'active\': tab.active}" ng-click="wiTabset.selectTab($index)"><a>{{tab.heading}}</a> <i class="ti-close" ng-show="tab.closable == \'true\'" ng-click="wiTabset.closeTab($index)"></i></li></ul><div ng-transclude></div></div>',
    controller: TabsetController,
    controllerAs: tabsetComponentName,
    transclude: true
});


function TabController() {
    let self = this;

    this.$onInit = function () {
        self.wiTabsetCtrl.addTab(self);
    };
}

app.component(tabComponentName, {
    template:'<div ng-transclude ng-show="wiTab.active"></div>',
    controller: TabController,
    controllerAs: tabComponentName,
    transclude: true,
    require: {
        'wiTabsetCtrl': '^wiTabset'
    },
    bindings: {
        heading: '@',
        closable: '@'
    }
});


exports.name = moduleName;

},{}],21:[function(require,module,exports){
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
    template:'<div class="toolbar-wrapper"><div ng-transclude class="toolbar-{{wiToolbar.type || wiToolbar.default.type}}"></div><p class="wi-toolbar-label text-center" ng-show="wiToolbar.label && wiToolbar.label.length > 0">{{wiToolbar.label}}</p></div>',
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
},{}],22:[function(require,module,exports){
exports.item11000 = function () {
    console.log('item11000');
};

exports.item11 = function () {
    console.log('item11');
};
exports.item121 = function () {
    console.log('item121');
};
exports.item12 = function () {
    console.log('item12');
};
exports.item2 = function () {
    console.log('item2');
};
exports.newitem = function () {
    console.log('newitem');
};
exports.logplot = function () {
    console.log('$scope ', this.$scope);
    this.wiComponentService.emit('add-logplot-event', 'new logplot');
};
},{}],23:[function(require,module,exports){
const componentName = 'wiTreeview';
const moduleName = 'wi-treeview';

function Controller($scope, wiComponentService) {
    let self = this;

    this.$onInit = function () {
        self.items = self.config;

        if (self.name) wiComponentService.putComponent(self.name, self);
    };

    this.onClick = function ($index) {
        self.config[$index].data.childExpanded = !self.config[$index].data.childExpanded;

        if (!self.config[$index].children || self.config[$index].children.length === 0) {
            let wiExplorerCtrl = wiComponentService.getComponent('WiExplorer');
            wiExplorerCtrl.itemActiveName = self.config[$index].name;

            wiComponentService.emit('update-properties', self.config[$index].data.properties);
        }
    };

    this.onDoubleClick = function ($index) {
        if (self.config[$index].data.handler) {
            self.config[$index].data.handler();
        } 
        else {
            let treeFunctions = wiComponentService.getComponent('TREE_FUNCTIONS');
            if (treeFunctions) {
                // get func from component service
                treeFunctions[self.config[$index].type]();
                //wiComponentService.treeFunctions[self.config[$index].type]();
            }
        }
    };

    this.getItemActiveName = function () {
        return wiComponentService.getComponent('WiExplorer').itemActiveName;
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

},{}]},{},[6]);
