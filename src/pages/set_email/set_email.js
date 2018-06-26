/* Controllers */
app.controller('Set_emailController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        console.log(111);
        
        $scope.item ={};
        $scope.item.encryption = 'no';
        $scope.item.send = 'no';
    }
   
   

    
    $scope.search = function (params) {
        console.log($scope.item); 
    };
    $scope.init();
}]);