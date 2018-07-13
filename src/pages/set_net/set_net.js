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
    }
    //获取网络配置




    
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