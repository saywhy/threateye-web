/* Controllers */
app.controller('Set_netController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        $scope.net = {
            type:{}
        };
        $scope.statusData = [{
            num: 0,
            type: 'eth0'
        }];
        $scope.net.statusData = 0;
        $scope.ip_type = [{
                num: 0,
                type: '自动获取'
            },
            {
                num: 1,
                type: '手动获取'
            }
        ];
        $scope.net.type.ip_type = 0;
        $scope.net.type.enable = 'no';
    }

    //保存
    $scope.keep = function (params) {
        console.log( $scope.net);
        
    }
    $scope.init();
}]);