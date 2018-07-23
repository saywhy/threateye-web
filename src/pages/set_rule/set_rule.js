/* Controllers */
app.controller('Set_ruleController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    
    
    $scope.init = function (params) {
        $scope.selected = 0;
        $scope.tab_data =[{
            name:'规则库更新',
            content:'11111'
        },{
            name:'规则库更新2',
            content:'22222'
        },{
            name:'规则库更新3',
            content:'3333'
        },{
            name:'规则库更新4',
            content:'4444'
        }]
    };
      //tab栏切换
      $scope.show = function (params) {
        $scope.selected = params;
        console.log(params);
    };

    $scope.init();
}]);