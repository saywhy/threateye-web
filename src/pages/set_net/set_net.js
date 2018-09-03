/* Controllers */
app.controller('Set_netController', ['$scope', '$http', '$state','$rootScope', function ($scope, $http, $state,$rootScope) {
    // 初始化
    $scope.init = function (params) {
        clearInterval($rootScope.insideInterval);
        clearInterval($rootScope.startInterval);
        $rootScope.pageNow= 0;
        $scope.net = {};
        $scope.net_detail={};
        $scope.net_names = [];
        $scope.ip_type = [{
                num: 0,
                name: '自动获取',
                type: 'dhcp'
            },
            {
                num: 1,
                name: '手动获取',
                type: 'static'
            }
        ];
        $scope.get_network(); //获取网络配置
    }
    //获取网络配置
    $scope.get_network = function () {
        var loading = zeroModal.loading(4);
        $http({
            method: 'get',
            url: './yiiapi/seting/get-network'
        }).success(function (data) {
            // console.log(data);
            if (data.status == 0) {
                $scope.net_names = [];
                $scope.net_info_array = data.data.data;
                angular.forEach($scope.net_info_array, function (item) {
                    $scope.net_names.push(item.NAME);
                });
                // console.log($scope.net_names);
                // 默认初始值
                $scope.net.index = $scope.net_names[0];
                $scope.net_detail = $scope.net_info_array[0];
            }
            if (data.status == 1) {
                zeroModal.error(data.msg);
            }
            zeroModal.close(loading);
        }).error(function (error) {
            console.log(error);
            zeroModal.close(loading);
        })
    }
    // 网卡切换
    $scope.net_card = function (name) {
        angular.forEach($scope.net_info_array, function (item) {
            if (name == item.NAME) {
                $scope.net_detail = item;
            }
        });
    }
    //设置网络配置
    $scope.set_network = function () {
        var loading = zeroModal.loading(4);
        $http({
            method: 'put',
            url: './yiiapi/seting/set-network',
            data: {
                NAME: $scope.net.index,
                ONBOOT: $scope.net_detail.ONBOOT,
                BOOTPROTO: $scope.net_detail.BOOTPROTO,
                IPADDR: $scope.net_detail.IPADDR,
                MASK: $scope.net_detail.MASK,
                GATEWAY: $scope.net_detail.GATEWAY,
                DNS1: $scope.net_detail.DNS1,
                DNS2: $scope.net_detail.DNS2,
            }
        }).success(function (data) {
            // console.log($scope.net_detail);
            // console.log(data);
            if (data.status == 0) {
                zeroModal.success('网络配置成功');
                $scope.get_network(); //获取网络配置
            }
            if (data.status == 1) {
                zeroModal.error(data.msg);
            }
            zeroModal.close(loading);
        }).error(function (error) {
            console.log(error);
            zeroModal.close(loading);
        })
    }




    //获取代理设置
    $scope.getProxy = function (params) {
        $http.get('/seting/proxy/status/proxy').then(function success(rsp) {
            //  console.log(rsp.data.result.HTTPS_PROXY);
            if (rsp.data.result.HTTPS_PROXY || rsp.data.result.HTTP_PROXY) {
                $scope.httpsModel = rsp.data.result.HTTPS_PROXY
                $scope.httpModel = rsp.data.result.HTTP_PROXY

            } else {
                $scope.httpsModel = '';
                $scope.httpModel = '';
            }

        }, function err(rsp) {

        });
    }
    //设置代理服务器
    $scope.saveHttps = function () {
        var params = {
            HTTPS_PROXY: $scope.httpsModel,
            HTTP_PROXY: $scope.httpModel
        };
        params = JSON.stringify(params);
        // console.log(params);

        $.ajax({
            url: '/seting/proxy/status/proxy',
            method: 'put',
            data: params,
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                if (data.result) {
                    $scope.httpsMode = data.result.HTTPS_PROXY;
                    $scope.httpMode = data.result.HTTPS_PROXY;
                    zeroModal.success("保存成功!");
                    $scope.getProxy();
                }
                if (data.error_info == "代理服务器格式填写有误!") {
                    zeroModal.error("代理服务器格式填写有误!");
                }
            },
            error: function (params) {
                console.log(params);
                zeroModal.err("保存失败!");
            }
        })
    }

    //保存
    $scope.keep = function (params) {
        // console.log($scope.net);

    }
    $scope.init();
}]);