'use strict';

/* Controllers */
// Alarm controller
app.controller('Alarm_detailController', [
    '$scope',
    '$http',
    '$stateParams',
    '$state',
    function ($scope, $http, $stateParams, $state) {
        // 初始化
        $scope.init = function (params) {
            $scope.detail_data = JSON.parse(unescape($stateParams.data));
            console.log($scope.detail_data);
            $scope.selected = 0;
            $scope.tab_data =[{
                name:'当前告警资产',
                content:'11111'
            },{
                name:'历史告警资产',
                content:'22222'
            }]
        };
   $scope.show = function (params) {
        $scope.selected = params;
        console.log(params);
    };
        $scope.init();
    },
]);