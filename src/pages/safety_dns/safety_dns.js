

'use strict';
/* Controllers */
app.controller('Safety_dnsController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        $scope.dns = {};
        // 解析结果选择
        $scope.statusData = [{
            num: 1,
            type: '失败'
        }, {
            num: 2,
            type: '成功'
        },{
            num: 3,
            type: '所有'
        }];
        $scope.dns.resolves_res = 3;
        $scope.searchData = {
            startTime: moment().subtract(1, 'days').unix(),
            endTime: moment().unix()
        };
        $scope.timerange();// 时间插件初始化

        // 假数据
        $scope.pages = [{
            time:'2018-07-10 10:00:00 - 2018-07-14 10:00:00 ',
            dns_ip :'201.199.29.1',
            host_ip:'10.112.64.255',
            type:'dsdsdsssss',
            query:'ssdsdsadada',
            host:'msadsws.ssaad.com.cn',
            host_addr:'122.231.47.1',
            reverse_addr:'-',
            name:'pc-info-cowc-232123232',
            ttl:'23,132',
            des_query:'成功'
        },
        {
            time:'2018-07-16 10:00:00 - 2018-07-19 10:00:00 ',
            dns_ip :'201.199.29.1',
            host_ip:'10.112.64.255',
            type:'dsdsdsssss',
            query:'ssdsdsadada',
            host:'msadsws.ssaad.com.cn',
            host_addr:'122.231.47.1',
            reverse_addr:'-',
            name:'pc-info-cowc-232123232',
            ttl:'23,132',
            des_query:'成功'
        },{
            time:'2018-07-11 10:00:00 - 2018-07-12 10:00:00 ',
            dns_ip :'201.199.29.1',
            host_ip:'10.112.64.255',
            type:'dsdsdsssss',
            query:'ssdsdsadada',
            host:'msadsws.ssaad.com.cn',
            host_addr:'122.231.47.1',
            reverse_addr:'-',
            name:'pc-info-cowc-232123232',
            ttl:'23,132',
            des_query:'失败'
        },{
            time:'2018-07-13 10:00:00 - 2018-07-15 10:00:00 ',
            dns_ip :'201.199.29.1',
            host_ip:'10.112.64.255',
            type:'dsdsdsssss',
            query:'ssdsdsadada',
            host:'msadsws.ssaad.com.cn',
            host_addr:'122.231.47.1',
            reverse_addr:'-',
            name:'pc-info-cowc-232123232',
            ttl:'23,132',
            des_query:'失败'
        }]
    };

    // 搜索
    $scope.search = function (params) {
        console.log($scope.dns);
        console.log($scope.searchData);
    }
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
            $scope.searchData.startTime = start.unix();
            $scope.searchData.endTime = end.unix();
        });
     };

    $scope.init();


}]);