(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
wiFileUpload = require('./wi-file-upload');

var app = angular.module('app', [wiFileUpload.name]);

app.controller('dummy', function($scope) {
    $scope.successHandler = function (responseSuccess) {
        console.log('success', responseSuccess);
    };
    $scope.errorHandler = function(responseError) {
        console.log('error:', responseError);
    };
    $scope.progressHandler = function(evt) {
        console.log('progress:', evt);
    };
});
},{"./wi-file-upload":2}],2:[function(require,module,exports){
const componentName = 'wiFileUpload';
const moduleName = 'wi-file-upload';

function Controller(Upload, wiComponentService) {
    var self = this;

    this.uploadPic = function (file) {
        file.upload = Upload.upload({
            url: 'http://localhost:3000/file',
            data: {file: file}
        });

        file.upload.then(
            function (responseSuccess) {
                file.result = responseSuccess.data;
                if(self.successHandler) self.successHandler(responseSuccess);
            },
            function (responseError) {
                self.errorMsg = responseError.status + ': ' + responseError.data;
                if(self.errorHandler) self.errorHandler(responseError)
            },
            function (evt) {
                file.progress = Math.round(100.0 * evt.loaded / evt.total);
                if(self.progressHandler) self.progressHandler(evt);
            }
        );
    }

    this.$onInit = function() {
        if (self.name) wiComponentService.putComponent(self.name, this);
    }
}

var app = angular.module(moduleName, ['ngFileUpload']);
app.component('wiFileUpload', {
    template:'<form name="uploadForm"><br>File: <input type="file" ngf-select ng-model="wiFileUpload.picFile" name="file" ngf-max-size="2MB" required ngf-model-invalid="errorFile"><div><p class="file-error-message" ng-show="uploadForm.file.$error.maxSize">File too large {{errorFile.size / 1000000|number:1}}MB: max 2M</p><button ng-disabled="!uploadForm.$valid" ng-click="wiFileUpload.uploadPic(wiFileUpload.picFile)">Submit</button></div><span class="progress" ng-show="wiFileUpload.picFile.progress >= 0"><div style="width:{{wiFileUpload.picFile.progress}}%" ng-bind="wiFileUpload.picFile.progress + \'%\'"></div></span> <span ng-show="wiFileUpload.picFile.result">Upload Successful</span> <span class="err" ng-show="wiFileUpload.errorMsg">{{wiFileUpload.errorMsg}}</span></form>',
    controller: Controller,
    controllerAs: componentName,
    bindings: {
        name: '<',
        successHandler: '<',
        errorHandler: '<',
        progressHandler: '<'
    }
});

module.exports.name = moduleName;
},{}]},{},[1]);
