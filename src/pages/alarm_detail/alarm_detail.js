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
        };

        $scope.init();
    },
]);