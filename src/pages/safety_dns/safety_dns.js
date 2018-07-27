'use strict';
/* Controllers */
app.controller('Safety_dnsController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        $scope.dns = {};
        $scope.pages = {
            data: [],
            count: 0,
            maxPage: "...",
            pageNow: 1,
            rows: 10
        };
        // 解析结果选择
        $scope.resolve_result = [{
            num: 'failed',
            type: '失败'
        }, {
            num: 'success',
            type: '成功'
        }, {
            num: 'all',
            type: '所有'
        }];
        $scope.dns.resolves_res = 'all';
        $scope.default_time = {
            startTime: moment().subtract(1, 'days').unix(),
            endTime: moment().unix()
        };
        $scope.timerange(); // 时间插件初始化
        $scope.getPage(1);
    };
    //搜索
    $scope.search = function () {
        $scope.getPage(1);
    };
    // 获取数据
    $scope.getPage = function (pageNow) {
        pageNow = pageNow ? pageNow : 1;
        $scope.params_data = {
            host_ip: $scope.dns.host_ip,
            dns_ip: $scope.dns.server_ip,
            domain: $scope.dns.domain_ip,
            resolve_ip: $scope.dns.resolves_ip,
            ttl: $scope.dns.ttl,
            resolve_result: $scope.dns.resolves_res,
            start_time: $scope.default_time.startTime,
            end_time: $scope.default_time.endTime,
            current_page: pageNow,
            per_page_count: '10'
        };
        console.log($scope.params_data);
        // var loading = zeroModal.loading(4);
        $http({
            method: 'get',
            url: './yiiapi/investigate/dns-investigation',
            params: $scope.params_data,
        }).success(function (data) {
            console.log(data);
            if (data.status == 0) {
                $scope.pages = data.data;
                console.log($scope.pages);
            }
            if (data.status == 1) {
                zeroModal.error(data.msg);
            }
            // zeroModal.close(loading);
        }).error(function () {
            // zeroModal.close(loading);
        })
    };
    //导出csv 
    $scope.export = function (params) {
        console.log($scope.dns);
        console.log($scope.searchData);
    };
    // 时间插件
    $scope.timerange = function (params) {
        $('.timerange').daterangepicker({
            timePicker: true,
            timePickerIncrement: 10,
            startDate: moment().subtract(1, 'days'),
            endDate: moment(),
            locale: {
                applyLabel: '确定',
                cancelLabel: '取消',
                format: 'YYYY-MM-DD HH:mm',
                customRangeLabel: '指定时间范围'
            },
            ranges: {
                '今天': [moment().startOf('day'), moment().endOf('day')],
                '7日内': [moment().startOf('day').subtract(7, 'days'), moment().endOf('day')],
                '本月': [moment().startOf('month'), moment().endOf('day')],
                '今年': [moment().startOf('year'), moment().endOf('day')],
            }
        }, function (start, end, label) {
            $scope.default_time.startTime = start.unix();
            console.log($scope.default_time.startTime);

            $scope.default_time.endTime = end.unix();
            console.log($scope.default_time.endTime);
        });
    };
    $scope.init();
}]);