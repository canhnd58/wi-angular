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
            if (typeof $scope.name == 'undefined') {
                var err = 'NewProject: Project Name is required!';
                return {error: err};
            } else if (typeof $scope.location == 'undefined') {
                var err = 'NewProject: Location is required';
                return {error: err};
            } else {
                return {
                    name: $scope.name,
                    location: $scope.location,
                    company: $scope.company,
                    department: $scope.department,
                    description: $scope.description
                }
            }
        }
    }

    ModalService.showModal({
        template:'<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="wiModal.close(\'Cancel\')" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">New Project</h4></div><div class="modal-body"><div class="form-horizontal"><div class="form-group"><label class="control-label">Project Name:</label> <input type="text" ng-model="name" class="form-control"></div><div class="form-group"><label class="control-label">Location:</label> <input type="text" ng-model="location" class="form-control"></div><div class="form-group"><label class="control-label">Company:</label> <input type="text" ng-model="company" class="form-control"></div><div class="form-group"><label class="control-label">Department:</label> <input type="text" ng-model="department" class="form-control"></div><div class="form-group"><label class="control-label">Description:</label> <textarea name="des" cols="30" rows="10" ng-model="description" class="form-control"></textarea></div></div></div><div class="modal-footer"><button type="button" ng-click="wiModal.close(wiModal.onOK())" class="btn btn-default" data-dismiss="modal">OK</button> <button type="button" ng-click="wiModal.close(\'Cancel\')" class="btn btn-primary" data-dismiss="modal">Cancel</button></div></div></div></div>',
        controller: ModalController,
        controllerAs: "wiModal"
    }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (ret) {
            console.log("Modal finally close: ", ret);
        });
    });
};
},{}],2:[function(require,module,exports){
// todo: write some services
var DialogUtils = require('./DialogUtils');
var app = angular.module('app', ['angularModalService']);

app.controller('SampleController', ["$scope", "ModalService", function($scope, ModalService) {
    $scope.show = function() {
        // console.log(DialogUtils);
        DialogUtils.newProjectDialog($scope, ModalService);
    }

}]);

},{"./DialogUtils":1}]},{},[2]);
