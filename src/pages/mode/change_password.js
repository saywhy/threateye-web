'use strict';
angular.module('app')
/* Controllers */
// overview controller
.controller('Modal_change_passwordCtrl', ['$scope', '$http', '$state','$modalInstance','data', function ($scope, $http, $state,$modalInstance,data) {
    $scope.data = data;
    console.log('1212121');
     //在这里处理要进行的操作
     $scope.ok = function() {
         console.log( $scope.data);
        $modalInstance.close();
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);