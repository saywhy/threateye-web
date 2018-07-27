'use strict';
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
            $scope.get_data();
        };

        $scope.get_data = function(){
            var loading = zeroModal.loading(4);
            $http({
                method: 'get',
                url: './yiiapi/alert/alert-details',
                params:{
                    'id':$scope.detail_data.id
                }
            }).success(function (data) {
                console.log(data);
                zeroModal.close(loading);
                if (data.status == 0) {
                    $scope.alert_details = data.data
                    console.log(JSON.parse($scope.alert_details.alert_description));
                    $scope.alert_details.alert_raw  =  JSON.parse($scope.alert_details.alert_description).session.raw;
                }
            }).error(function (err) {
                zeroModal.close(loading);
                console.log(err);
            })

        }
   $scope.show = function (params) {
        $scope.selected = params;
        console.log(params);
    };
        $scope.init();
    },
]);