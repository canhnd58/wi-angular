const componentName = 'wiFileUpload';
const moduleName = 'wi-file-upload';

function Controller(Upload, wiComponentService) {
    let self = this;

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
    };

    this.$onInit = function() {
        if (self.name) wiComponentService.putComponent(self.name, this);
    }
}

let app = angular.module(moduleName, ['ngFileUpload']);
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