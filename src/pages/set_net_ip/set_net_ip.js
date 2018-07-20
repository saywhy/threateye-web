/* Controllers */
app.controller('Set_net_ipController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        $scope.get_net_ip();
        $scope.reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    }
    $scope.get_net_ip = function () {
        var loading = zeroModal.loading(4);
        $http({
            method: 'get',
            url: './yiiapi/seting/get-ip-segment'
        }).success(function (data) {
            console.log(data);
            if (data.status == 0) {
                $scope.net_ip = data.data.ip_segment
            }
            zeroModal.close(loading);
        }).error(function () {
            zeroModal.close(loading);
        })
    };
    //设置
    $scope.keep = function () {
        if ($scope.net_ip == '') {
            var loading = zeroModal.loading(4);
            $http({
                method: 'put',
                url: './yiiapi/seting/set-ip-segment',
                data: {
                    "ip_segment": $scope.net_ip
                },
            }).success(function (data) {
                console.log(data);
                if (data.status == 0) {
                    zeroModal.success('设置成功！');
                    $scope.get_net_ip();
                }
                zeroModal.close(loading);
            }).error(function () {
                zeroModal.close(loading);
                zeroModal.error('设置失败！');
            })
        } else {
            if ($scope.reg.test($scope.net_ip)) {
                var loading = zeroModal.loading(4);
                $http({
                    method: 'put',
                    url: './yiiapi/seting/set-ip-segment',
                    data: {
                        "ip_segment": $scope.net_ip
                    },
                }).success(function (data) {
                    console.log(data);
                    if (data.status == 0) {
                        zeroModal.success('设置成功！');
                        $scope.get_net_ip();
                    }
                    zeroModal.close(loading);
                }).error(function () {
                    zeroModal.close(loading);
                    zeroModal.error('设置失败！');
                })
            } else {
                zeroModal.error('IP格式不正确');
            }
        }


    }

    $scope.init();
}]);