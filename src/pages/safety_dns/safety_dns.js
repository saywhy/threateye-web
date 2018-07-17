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

        // 假数据
        $scope.pages = [{
                time: '2018-07-10 10:00:00 - 2018-07-14 10:00:00 ',
                dns_ip: '201.199.29.1',
                host_ip: '10.112.64.255',
                type: 'dsdsdsssss',
                query: 'ssdsdsadada',
                host: 'msadsws.ssaad.com.cn',
                host_addr: '122.231.47.1',
                reverse_addr: '-',
                name: 'pc-info-cowc-232123232',
                ttl: '23,132',
                des_query: '成功'
            },
            {
                time: '2018-07-16 10:00:00 - 2018-07-19 10:00:00 ',
                dns_ip: '201.199.29.1',
                host_ip: '10.112.64.255',
                type: 'dsdsdsssss',
                query: 'ssdsdsadada',
                host: 'msadsws.ssaad.com.cn',
                host_addr: '122.231.47.1',
                reverse_addr: '-',
                name: 'pc-info-cowc-232123232',
                ttl: '23,132',
                des_query: '成功'
            }, {
                time: '2018-07-11 10:00:00 - 2018-07-12 10:00:00 ',
                dns_ip: '201.199.29.1',
                host_ip: '10.112.64.255',
                type: 'dsdsdsssss',
                query: 'ssdsdsadada',
                host: 'msadsws.ssaad.com.cn',
                host_addr: '122.231.47.1',
                reverse_addr: '-',
                name: 'pc-info-cowc-232123232',
                ttl: '23,132',
                des_query: '失败'
            }, {
                time: '2018-07-13 10:00:00 - 2018-07-15 10:00:00 ',
                dns_ip: '201.199.29.1',
                host_ip: '10.112.64.255',
                type: 'dsdsdsssss',
                query: 'ssdsdsadada',
                host: 'msadsws.ssaad.com.cn',
                host_addr: '122.231.47.1',
                reverse_addr: '-',
                name: 'pc-info-cowc-232123232',
                ttl: '23,132',
                des_query: '失败'
            }
        ]
    };
    //搜索
    $scope.getPage = function (pageNow) {
        pageNow = pageNow ? pageNow : 1;
        $scope.params_data = {
            host_ip:'',
            dns_ip:'',
            domain:'',
            resolve_ip:'',
            ttl:'',
            resolve_result:'',
            start_time:'',
            end_time:'',
            current_page:'',
            per_page_count:''
        }
        $http.post('./yiiapi/user/page', {
            page: pageNow
        }).then(function success(rsp) {
            console.log(rsp.data);
            if (rsp.data.status == 0) {
                $scope.pages = rsp.data.data;
            }
        }, function err(rsp) {});
    };

    $scope.search = function () {
        console.log($scope.dns);
        console.log($scope.default_time);
        $scope.params_data = {
            host_ip:$scope.dns.host_ip,
            dns_ip:$scope.dns.server_ip,
            domain:$scope.dns.domain_ip,
            resolve_ip:$scope.dns.resolves_ip,
            ttl:$scope.dns.ttl,
            resolve_result:$scope.dns.resolves_res,
            start_time:$scope.default_time.startTime,
            end_time:$scope.default_time.endTime,
            current_page:'1',
            per_page_count:'10'
        }
        var loading = zeroModal.loading(4);
        $http({
            method: 'get',
            url: './yiiapi/investigate/dns-investigation',
            params: $scope.params_data,
        }).success(function (data) {
            console.log(data);

            zeroModal.close(loading);
        }).error(function () {
            zeroModal.close(loading);
        })
    };
    $scope.pages = {
        data: [],
        count: 0,
        maxPage: "...",
        pageNow: 1,
    };

    $scope.getPage = function (pageNow) {
        pageNow = pageNow ? pageNow : 1;
        $http.post('./yiiapi/user/page', {
            page: pageNow
        }).then(function success(rsp) {
            console.log(rsp.data);
            if (rsp.data.status == 0) {
                $scope.pages = rsp.data.data;
            }
        }, function err(rsp) {});
    };




    
    //导出csv 
    $scope.export = function (params) {
        console.log($scope.dns);
        console.log($scope.searchData);
    }
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