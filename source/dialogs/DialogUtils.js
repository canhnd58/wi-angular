exports.newProjectDialog = function ($mainScope, ModalService, callback) {
    function ModalController($scope, close, wiApiService) {
        let self = this;
        this.disabled = false;
        this.error = null;

        this.onOkButtonClicked = function () {
            self.disabled = true;
            let data = {
                name: $scope.name,
                company: $scope.company,
                department: $scope.department,
                description: $scope.description
            };
            console.log("This data: ", data);


            wiApiService.post('/project/new', data)
                .then(function (response) {
                    console.log('response', response);

                    return close(response, 500);
                })
                .catch(function (err) {
                    return self.error = err;
                })
                .then(function () {
                    self.disabled = false;
                });
        };

        this.onCancelButtonClicked = function () {
            console.log('onCancelButtonClicked');
            // close(null, 500);
        }
    }

    ModalService.showModal({
        templateUrl: 'new-project/new-project-modal.html',
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (data) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');

            if (data) {
                callback(data);
            }
        });
    });
};

exports.openProjectDialog = function ($mainScope, ModalService, callback) {
    function ModalController($scope, close, wiApiService) {
        let self = this;
        this.error = null;
        this.projects = [];
        this.idProject = null;
        this.disabled = false;
        this.selectedProject = {};

        wiApiService.post('/project/list', null)
            .then(function (projects) {
                console.log('response', projects);

                self.projects = projects;
            })
            .catch(function (err) {
                return self.error = err;
            })
            .then(function () {
                $scope.$apply();
            });

        this.fillInfo = function () {
            self.projects.forEach(function(item) {
                if (self.idProject == item.idProject) {
                    self.selectedProject = item;
                }
            });
        };

        this.onOkButtonClicked = function () {
            self.disabled = true;
            let data = {
                idProject : self.idProject
            };

            wiApiService.post('/project/fullinfo', data)
                .then(function (response) {

                    return close(response, 500);
                })
                .catch(function (err) {
                    return self.error = err;
                })
                .then(function () {
                    self.disabled = false;
                });
        };

        this.onCancelButtonClicked = function () {
            console.log('onCancelButtonClicked');
        }
    }

    ModalService.showModal({
        templateUrl: 'open-project/open-project-modal.html',
        controller: ModalController,
        controllerAs: 'wiModal'
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (data) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');

            if (data) {
                callback(data);
            }
        })
    });
};

exports.confirmDialog = function (ModalService, titleMessage, confirmMessage, callback) {
    function ModalController($scope, close) {
        this.title = titleMessage;
        this.confirmMsg = confirmMessage;
        this.close = function (ret) {
            close(ret);
        }
    }

    ModalService.showModal({
        templateUrl: "confirm/confirm-modal.html",
        controller: ModalController,
        controllerAs: 'wiModal'
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}

exports.unitSettingDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        this.defaultData = {
            Default: {
                unitSystem: "Default",
                caliper: "in",
                neutron: "v/v",
                gammaRay: "api",
                acoustic: "us/ft",
                pressure: "psi",
                bitSize: "in",
                density: "g/cm3",
                concentration: "v/v",
                permeability: "mD",
                porosity: "v/v",
                angle: "deg",
                resistivity: "ohm.m",
                saturation: "v/v",
                temperature: "degC",
                volume: "v/v",
                sp: "mv",
                length: "m",
                time: "s",
                area: "m2",
                flow: "t",
                speed: "m/s",
                force: "N"
            },
            Canadian: {
                unitSystem: "Canadian",
                caliper: "cm",
                neutron: "%",
                gammaRay: "api",
                acoustic: "us/m",
                pressure: "psi",
                bitSize: "cm",
                density: "kg/m3",
                concentration: "ppm",
                permeability: "mD",
                porosity: "v/v",
                angle: "deg",
                resistivity: "ohm.m",
                saturation: "v/v",
                temperature: "degC",
                volume: "v/v",
                sp: "mv",
                length: "m",
                time: "s",
                area: "m2",
                flow: "t",
                speed: "m/s",
                force: "N"
            },
            English: {
                unitSystem: "English",
                caliper: "in",
                neutron: "%",
                gammaRay: "api",
                acoustic: "us/ft",
                pressure: "psi",
                bitSize: "in",
                density: "g/cm3",
                concentration: "ppm",
                permeability: "mD",
                porosity: "v/v",
                angle: "deg",
                resistivity: "ohm.m",
                saturation: "v/v",
                temperature: "degC",
                volume: "v/v",
                sp: "mv",
                length: "m",
                time: "s",
                area: "m2",
                flow: "t",
                speed: "m/s",
                force: "N"
            },
            Metric: {
                unitSystem: "Metric",
                caliper: "cm",
                neutron: "%",
                gammaRay: "api",
                acoustic: "us/ft",
                pressure: "mBar",
                bitSize: "cm",
                density: "g/cm3",
                concentration: "ppm",
                permeability: "mD",
                porosity: "v/v",
                angle: "deg",
                resistivity: "ohm.m",
                saturation: "v/v",
                temperature: "degC",
                volume: "v/v",
                sp: "mv",
                length: "m",
                time: "s",
                area: "m2",
                flow: "t",
                speed: "m/s",
                force: "N"
            },
            Russian: {
                unitSystem: "Russian",
                caliper: "cm",
                neutron: "%",
                gammaRay: "api",
                acoustic: "us/ft",
                pressure: "mBar",
                bitSize: "cm",
                density: "g/cm3",
                concentration: "ppm",
                permeability: "mD",
                porosity: "v/v",
                angle: "deg",
                resistivity: "ohm.m",
                saturation: "v/v",
                temperature: "degC",
                volume: "v/v",
                sp: "mv",
                length: "m",
                time: "s",
                area: "m2",
                flow: "t",
                speed: "m/s",
                force: "N"
            }
        };
        this.allData = {
            unitSystem: ["Default", "Canadian", "English", "Metric", "Russian"],
            caliper: ["in", "m", "cm", "Ft", "1.Ft", "mm", "um"],
            neutron: ["v/v", "Trac", "%", "pu", "imp/min"],
            gammaRay: ["api", "GAPI", "uR/h", "GAMA"],
            acoustic: ["us/ft", "us/m"],
            pressure: ["psi", "Pa", "kPa", "MPa", "mBar", "Bar", "kg/m2", "atm", "torr"],
            bitSize: ["in", "m", "cm", "Ft", "1.Ft", "mm", "um"],
            density: ["g/cm3", "kg/m3"],
            concentration: ["v/v", "%", "ppm", "kpp", "m", "1/L", "mS/m", "1/kg", "dB/m", "mV", "galUS/min", "mD/cP", "b/elec", "b/cm3", "m3/d", "MV"],
            permeability: ["mD", "D"],
            porosity: ["v/v", "m3/m3", "ft3/ft3", "%", "imp/min", "ratio"],
            angle: ["deg", "dega", "grad", "rad"],
            resistivity: ["ohm.m", "ratio"],
            saturation: ["v/v", "m3/m3", "ft3/ft3", "%", "ratio"],
            temperature: ["degC", "degF"],
            volume: ["v/v", "cm3", "L.m"],
            sp: ["mv"],
            length: ["m"],
            time: ["s"],
            area: ["m2"],
            flow: ["t"],
            speed: ["m/s", "m2", "ft/h", "ratio", "ft/s", "m/min", "rpm", "mn/m"],
            force: ["N"]
        };
        function copyObj(sourceObj, destObj) {
            for (var attr in sourceObj) {
                destObj[attr] = sourceObj[attr];
            }
        };
        this.selectedData = {};
        var self = this;
        copyObj(self.defaultData.Default, self.selectedData);
        this.setDefault = function () {
            copyObj(self.defaultData.Default, self.selectedData);
        };
        this.changeDefault = function () {
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
        this.close = function (ret) {
            close(ret);

        }
    }

    ModalService.showModal({
        templateUrl: "unit-setting/unit-setting-modal.html",
        controller: ModalController,
        controllerAs: 'wiModal'
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });

}
// add new well
exports.addNewDialog = function (ModalService, callback) {
    function ModalController($scope, close, wiApiService, wiComponentService) {
        let self = this;
        this.onOkButtonClicked = function () {
            let utils = wiComponentService.getComponent('UTILS');
            let projectData = utils.openProject;
            let data = {
                name: $scope.name,
                idProject: projectData.idProject,
                topDepth: $scope.topDepth,
                bottomDepth: $scope.bottomDepth,
                step: $scope.step
            };
            console.log("data: ", data);
            wiApiService.post('/project/well/new', data)
                .then(function (response) {
                    console.log('response', response);

                    return close(response, 500);
                })
                .catch(function (err) {
                    return self.error = err;
                });

        }
        this.onCancelButtonClicked = function () {
            console.log("oncCancelButtonClicked");
        }
    }

    ModalService.showModal({
        templateUrl: "add-new/add-new-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}

exports.wellHeaderDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        this.wellHeader = ["well1", "well2", "well3"];
        this.close = function (ret) {
            close(ret);
        }
    }

    ModalService.showModal({
        templateUrl: "well-header/well-header-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}
exports.depthConversionDialog = function (ModalService, DialogUtils, callback) {
    console.log(DialogUtils);
    function ModalController($scope, close) {
        this.close = function (ret) {
            close(ret);
        };


        this.selectWell = "well1";
        this.selectWellList = ["well1", "well2", "well3"];
        this.originalsDepth = {
            step: 5,
            topDepth: 200,
            bottomDepth: 500
        };

        this.runClick = function () {
            console.log("Click run");
            DialogUtils.confirmDialog(ModalService, "Depth Conversion ", "Change wells depth and step?", function (ret) {
                console.log(ret);
                $scope.newDepth = {
                    step: $scope.step,
                    topDepth: $scope.topDepth,
                    bottomDepth: $scope.bottomDepth,
                    fixed: $scope.fixed
                };
                console.log($scope.newDepth);
            });

        }
    }

    ModalService.showModal({
        templateUrl: "depth-conversion/depth-conversion-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}

exports.curveAliasDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        this.addCurveName = function (curveAlias) {

        }
        this.isSelected = function (item) {
            console.log(item);
            return "";
        }


        this.close = function (ret) {
            close(ret);
        }
    }

    ModalService.showModal({
        templateUrl: "curve-alias/curve-alias-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}

exports.familyEditDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        this.close = function (ret) {
            close(ret);
        }
    }

    ModalService.showModal({
        templateUrl: "family-edit/family-edit-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}

exports.blankLogplotDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        let error = null;
        let self = this;
        $scope.name = "blankPlotlog"
        this.onOkButtonClicked = function () {
            self.name = $scope.name;
            console.log(self.name);
        }
        this.close = function (ret) {
            close(ret);
        }
    }

    ModalService.showModal({
        templateUrl: "blank-logplot/blank-logplot-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}
exports.tripleComboDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        let error = null;
        let self = this;
        $scope.name = "TripleCombo"
        this.onOkButtonClicked = function () {
            self.name = $scope.name;
            console.log(self.name);
        }
        this.close = function (ret) {
            close(ret);
        }
    }

    ModalService.showModal({
        templateUrl: "triple-combo/triple-combo-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}
exports.densityNeutronDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        let error = null;
        let self = this;
        $scope.name = "DensityNeutron";
        this.onOkButtonClicked = function () {
            self.name = $scope.name;
            console.log(self.name);
        }
        this.close = function (ret) {
            close(ret);
        }
    }

    ModalService.showModal({
        templateUrl: "density-neutron/density-neutron-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}
exports.resistivitySonicDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        let error = null;
        let self = this;
        $scope.name = "ResistivitySonic";
        this.onOkButtonClicked = function () {
            self.name = $scope.name;
            console.log(self.name);
        }
        this.close = function (ret) {
            close(ret);
        }
    }

    ModalService.showModal({
        templateUrl: "resistivity-sonic/resistivity-sonic-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}
exports.threeTracksBlankDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        let error = null;
        let self = this;
        $scope.name = "3TracksBlank";
        this.onOkButtonClicked = function () {
            self.name = $scope.name;
            console.log(self.name);
        }
        this.close = function (ret) {
            close(ret);
        }
    }

    ModalService.showModal({
        templateUrl: "3-tracks-blank/3-tracks-blank-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}
exports.inputCurveDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        let error = null;
        let self = this;
        $scope.name = "inputCurve";
        this.onOkButtonClicked = function () {
            self.name = $scope.name;
            console.log(self.name);
        }
        this.close = function (ret) {
            close(ret);
        }
    }

    ModalService.showModal({
        templateUrl: "input-curve/input-curve-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}
exports.lithoSynCurveDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        let error = null;
        let self = this;
        $scope.name = "lithoSynCurveDialog";
        this.onOkButtonClicked = function () {
            self.name = $scope.name;
            console.log(self.name);
        }
        this.close = function (ret) {
            close(ret);
        }
    }

    ModalService.showModal({
        templateUrl: "litho-syn-curve/litho-syn-curve-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}

exports.addCurveDialog = function (ModalService, callback) {
    function ModalController($scope, close, wiApiService, wiComponentService) {
        let error = null;
        let self = this;

        this.onOkButtonClicked = function () {
            let utils = wiComponentService.getComponent('UTILS');
        };

        this.onCancelButtonClicked = function () {
            console.log("onCancelButtonClicked");
        }
    }

    ModalService.showModal({
        templateUrl: "add-curve/add-curve-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}

exports.lineStyleDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        this.onOkButtonClicked = function () {

        };
        this.onApplyButtonClicked = function () {

        };
        this.onCancelButtonClicked = function () {

        };
    }
    ModalService.showModal({
        templateUrl: "line-style/line-style-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}

exports.curvePropertiesDialog = function (ModalService, DialogUtils, callback) {
    function ModalController($scope, close) {
        let error = null;
        let self = this;
        // let utils = wiComponentService.getComponent('UTILS');
        // let projectData = utils.openProject;
        // console.log("dataaa ",projectData);

        this.selectData = {
            displayMode : ["Line", "Symbol", "Both", "None"],
            wrapMode : ["None", "Left", "Right", "Both"],
            symbolType : ["Circle", "Cross", "Diamond", "Dot", "Plus", "Square", "Star", "Triangle"],
            blockPosition : ["None", "Start", "Middle", "End", "None"],
            logLinear : ["Linear", "Logarithmic"],
            displayAs : ["Normal", "Culmulative", "Mirror", "Pid"]
        };
        this.defaultElement = {
            displayMode : "Line",
            wrapMode : "None",
            symbolType: "Circle",
            blockPosition: "None",
            logLinear : "Linear",
            displayAs : "Normal"
        };
        this.changeOther = function () {
            switch (self.defaultElement.displayMode) {
                case "Line":
                    $('#wrapMode').prop("disabled", false);
                    $('#symbolType').prop("disabled", true);
                    $('#blockPosition').prop("disabled", false);
                    $('#ignore').prop("disabled", false);
                    $('#symbolSize').prop("disabled", true);
                    $('#editSymbolSize').prop("disabled", true);
                    $('#editLineStyle').prop("disabled", false);
                    break;
                case "Symbol":
                    $('#wrapMode').prop("disabled", false);
                    $('#symbolType').prop("disabled", false);
                    $('#blockPosition').prop("disabled", true);
                    $('#ignore').prop("disabled", false);
                    $('#symbolSize').prop("disabled", false);
                    $('#editSymbolSize').prop("disabled", false);
                    $('#editLineStyle').prop("disabled", true);
                    break;
                case "Both":
                    $('#wrapMode').prop("disabled", false);
                    $('#symbolType').prop("disabled", false);
                    $('#blockPosition').prop("disabled", true);
                    $('#ignore').prop("disabled", false);
                    $('#symbolSize').prop("disabled", false);
                    $('#editSymbolSize').prop("disabled", false);
                    $('#editLineStyle').prop("disabled", false);
                    break;
                case "None":
                    $('#wrapMode').prop("disabled", true);
                    $('#symbolType').prop("disabled", true);
                    $('#blockPosition').prop("disabled", true);
                    $('#ignore').prop("disabled", true);
                    $('#symbolSize').prop("disabled", true);
                    $('#editSymbolSize').prop("disabled", true);
                    $('#editLineStyle').prop("disabled", true);
                    break;
                default:
                    console.log("Error: NULL");
                    break;
            }
        };
        this.onEditLineButtonClicked = function () {
            DialogUtils.lineStyleDialog(ModalService, function () {
                console.log("Line Style");
            });
        };
        this.onOkButtonClicked = function () {

        }
        this.onCancelButtonClicked = function () {
            console.log("onCancelButtonClicked");
        }
    }

    ModalService.showModal({
        templateUrl: "curve-properties/curve-properties-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            $('.modal-dialog').draggable();
            callback(ret);
        });
    });
};
exports.importLASDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        let error = null;
        let self = this;
        this.objcpy = function (destObj, sourceObj) {
            if (destObj) {
                for (let attr in sourceObj) {
                    destObj[attr] = sourceObj[attr];
                }
            }
        };
        // var file = this.lasFile;
        this.chooseFile = function (){

        }
        this.depthUnit = ["M", "Ft"];
        this.fileLAS = {
            step: 10,
            topDepth: 100,
            bottomDepth: 500,
            depthUnit: "M"
        };
        this.listLAS =[{
            lasName: "LAS1",
            inputName: "Name1",
            unit: "M"
        },
        {
            lasName: "LAS2",
            inputName: "Name2",
            unit: "Ft"
        }
        ];

        this.file = {};
        this.objcpy(this.file, this.fileLAS);
        this.inputLAS = {};
        this.objcpy(this.inputLAS, this.fileLAS);

        this.onLoadButtonClicked = function () {
            if (self.inputLAS.topDepth < self.fileLAS.topDepth || self.inputLAS.topDepth > self.fileLAS.bottomDepth) {
                err = "Input top depth couldn't less than las top depth or greater than las bottom depth";
            };
            if (self.inputLAS.bottomDepth > self.fileLAS.bottomDepth || self.inputLAS.bottomDepth < self.fileLAS.bottomDepth) {
                err = "Input bottom depth couldn't less than las top depth or greater than las bottom depth";
            };
            console.log(err);

        };

        this.onCancelButtonClicked = function () {
            console.log("onCancelButtonClicked");
        };
    }
    ModalService.showModal({
        templateUrl: "import-LAS/import-LAS-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
};

exports.trackPropertiesDialog = function (ModalService, callback) {
    function ModalController($scope, close) {
        let error = null;
        let self = this;
        $scope.propertyTab = 'general';
        this.showTitle = false;
        this.showLabel = false;
        this.setTitle = function () {
            if (self.showTitle == true) {
                $('#title').prop("disabled", true);
                $('#topJust').prop("disabled", true);
                $('#bottomJust').prop("disabled", true);
            }else {
                $('#title').prop("disabled", false);
                $('#topJust').prop("disabled", false);
                $('#bottomJust').prop("disabled", false);
            }
        };
        this.setLabel = function () {
            if (self.showLabel == true) {
                $('#format').prop("disabled", true);
                $('#font').prop("disabled", true);
                $('#preview').prop("disabled", true);
            }else {
                $('#format').prop("disabled", false);
                $('#font').prop("disabled", false);
                $('#preview').prop("disabled", false);
            }
        };
        this.setValueGrid = function () {
            if (self.showValueGrid == true) {
                $('#majorTicks').prop("disabled", true);
                $('#minorTicks').prop("disabled", true);
            }else{
                $('#majorTicks').prop("disabled", false);
                $('#minorTicks').prop("disabled", false);
            }
        };
        this.header = {
            title : "Track1",
            topJust : ["center", "left", "right"],
            bottomJust : ["center", "left", "right"]
        };
        this.topJust = "center";
        this.bottomJust = "center";

        this.curveName = ["DTCO3", "ECGR"];
        this.logLinear = ["Logarithmic", "Linear"];
        this.displayMode = ["Line", "Symbol", "Both", "None"];
        this.displayAs = ["Normal", "Culmulative", "Mirror", "Pid"];

        this.colorTrack = "#888";
        this.getColor = function () {
            console.log("pick: ", self.colorTrack);
        };

        this.setClickedRow = function(index){
            self.selectedRow = index;           
        }
        // this.curveAttr = [];
        self.curveAttr = [
            {
                curveName : "ECGR",
                alias : "ECGR",
                leftScale : "20",
                rightScale : "200",
                logLinear : "Linear",
                displayMode : "",
                lineStyle : "",
                displayAs : ""
            }, 
            {
                curveName : "DTCO3",
                alias : "DTCO3",
                leftScale : "10",
                rightScale : "100",
                logLinear : "Logarithmic",
                displayMode : "Line",
                lineStyle : "",
                displayAs : "Normal"
            },
            {
                curveName : "balla",
                alias : "balal",
                leftScale : "10",
                rightScale : "100",
                logLinear : "Logarithmic",
                displayMode : "Line",
                lineStyle : "",
                displayAs : "Normal"
            },
            {
                curveName : "curveName",
                alias : "blalalal",
                leftScale : "10",
                rightScale : "100",
                logLinear : "Logarithmic",
                displayMode : "Line",
                lineStyle : "",
                displayAs : "Normal"
            }
        ];
        this.hide = function (index) {
            // self.curveAttr = [];
            index = null;
        }
        
        this.arrowUp = function (index) {
            self.selectedRow = index;
            for(let i = 0; i < self.curveAttr.length; i++) {
                index = self.curveAttr.indexOf(this.curveAttr[i]);
                console.log("index:", index);
                if (index > 0) {
                    let itemToMove = this.curveAttr.splice(index, 1);
                    console.log("item: ", itemToMove[0]);
                    this.curveAttr.splice(index-1, 0, itemToMove[0]);                
                }
            }
        };
        this.arrowDown = function (index) {        
        };
        this.onOkButtonClicked = function () {
            self.name = $scope.name;
            console.log(self.name);
        }
        this.onCancelButtonClicked = function (ret) {
            close(ret);
        }
    }

    ModalService.showModal({
        templateUrl: "track-properties/track-properties-modal.html",
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            callback(ret);
        });
    });
}