/* Controllers */
app.controller('Set_netController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        $scope.net = {
            type: {}
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
        $scope.get_network();//获取网络配置
    }
    //获取网络配置
    $scope.get_network = function(){
        var loading = zeroModal.loading(4);
        $http({
            method: 'get',
            url: './yiiapi/seting/get-network'
        }).success(function (data) {
            console.log(data);
            if (data.status == 0) {

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


    //设置网络配置
    $scope.set_network = function () {
        var loading = zeroModal.loading(4);
        $http({
            method: 'put',
            url: './yiiapi/seting/set-network',
            data: {
                "ens192": {
                    "BOOTPROTO": "static",
                    "BROWSER_ONLY": "no",
                    "DEFROUTE": "yes",
                    "DEVICE": "ens192",
                    "DNS1": "8.8.8.8",
                    "DNS2": "114.114.114.77",
                    "GATEWAY": "192.168.1.2",
                    "IPADDR": "192.168.1.243",
                    "IPV4_FAILURE_FATAL": "no",
                    "IPV6INIT": "no",
                    "NAME": "ens192",
                    "NETMASK": "255.255.255.0",
                    "ONBOOT": "yes",
                    "PREFIX": "24",
                    "PROXY_METHOD": "none",
                    "TYPE": "Ethernet",
                    "UUID": "0fe5ff3d-4508-47ad-b2a5-336cf26e0354"
                }
            }
        }).success(function (data) {
            console.log(data);
            if (data.status == 0) {

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
        console.log($scope.net);

    }
    $scope.init();
}]);