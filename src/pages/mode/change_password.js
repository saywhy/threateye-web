'use strict';
angular.module('app')
/* Controllers */
// overview controller
.controller('Modal_change_passwordCtrl', ['$scope', '$http', '$state','$modalInstance','data', function ($scope, $http, $state,$modalInstance,data) {
    $scope.data = data;
     //在这里处理要进行的操作
  
     $scope.ok = function() {
        var loading = zeroModal.loading(4);
         console.log( $scope.data);
         $http({
            method: 'POST',
            url: './yiiapi/user/reset-password?'+ $scope.data.token,
            data: {
                "ResetPasswordForm": {
                    "password": $scope.data.new
                },
                "old_password": $scope.data.old
            }
        }).then(function successCallback(data) {
            console.log(data);
            if(data.data.status == 0){
                $state.go('app.overview');
                zeroModal.close(loading);
            } 
        }, function errorCallback(data) {
            console.log(data);
            zeroModal.close(loading);
        });
        // $modalInstance.close();
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);