/* Controllers */
app.controller('Set_licenceController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        $scope.get_license();
    }
    
    $scope.get_license = function () {
        $http({
            method: 'get',
            url: './yiiapi/license/get',
        }).then(function successCallback(data) {
            console.log(data.data);
            if(data.data.status == 0){
                console.log(data.data.data);
            }
      
        }, function errorCallback(data) {
            console.log(data);
        });
    };
    $scope.init();
}]);