

'use strict';
/* Controllers */
app.controller('Safety_directionController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
       // 初始化
       $scope.init = function (params) {
        $scope.direction = {};
        $scope.direction.flow_direction = 0;
          // 流量方向选择
          $scope.statusData = [{
            num: 0,
            type: '内网到外网'
        }, {
            num: 1,
            type: '外网到内网'
        },{
            num: 2,
            type: '内网到内网'
        },{
            num: 3,
            type: '其他'
        }];
        $scope.searchData = {
            startTime: moment().subtract(1, 'days').unix(),
            endTime: moment().unix()
        };
        $scope.timerange(); // 时间插件初始化
        // 假数据
        $scope.pages = [{
                time: '2018-07-10 10:00:00 - 2018-07-14 10:00:00 ',
                source_ip: '201.199.29.1',
                dns_ip: '201.199.29.1',
                host: 'ftp',
            },
            {
                time: '2018-07-16 10:00:00 - 2018-07-19 10:00:00 ',
                source_ip: '201.199.29.1',
                dns_ip: '201.199.29.1',
                host: 'https',
            }, {
                time: '2018-07-11 10:00:00 - 2018-07-12 10:00:00 ',
                source_ip: '201.199.29.1',
                dns_ip: '201.199.29.1',
                host: 'http',
            }, {
                time: '2018-07-13 10:00:00 - 2018-07-15 10:00:00 ',
                source_ip: '201.199.29.1',
                dns_ip: '201.199.29.1',
                host: 'smtp',
            }
        ]
    };
    // 搜索
    $scope.search = function (params) {
        console.log($scope.user);
        console.log($scope.searchData);
    };
    //导出csv 
    $scope.export = function (params) {
        console.log($scope.user);
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
            $scope.searchData.startTime = start.unix();
            $scope.searchData.endTime = end.unix();
        });
    };
    $scope.init();
}]);