'use strict';
/* Controllers */
app.controller('Safety_hostController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        $scope.user = {};
        $scope.searchData = {
            startTime: moment().subtract(1, 'days').unix(),
            endTime: moment().unix()
        };
        $scope.timerange(); // 时间插件初始化
        $scope.tab_data = [{
                name: '网络通讯',
                content_th: [{
                    name: '时间'
                }, {
                    name: '源IP'
                }, {
                    name: '源端口'
                }, {
                    name: '目的地址'
                }, {
                    name: '目的端口'
                }, {
                    name: 'Email地址'
                }, {
                    name: '应用'
                }],
                value:[{
                    time:'2018-07-20 12:00:00',
                    Ip:'192.168.2.254',
                    source_port:'8422',
                    addr:'10.22.2.123',
                    port:'5643',
                    email:'wssdaa@163.com',
                    application:'https'
                },{
                    time:'2018-07-22 02:00:00',
                    Ip:'192.168.2.224',
                    source_port:'7223',
                    addr:'10.22.2.123',
                    port:'5433',
                    email:'wssdaa@126.com',
                    application:'http'
                },]
            },
            {
                name: '文件',
                content_th: [{
                    name: '文件名'
                }, {
                    name: '哈希值'
                }, {
                    name: '来源'
                }, {
                    name: '主机IP'
                }, {
                    name: '应用'
                }],
                value:[{
                    name:'文件名1',
                    hash:'221',
                    source:'8422',
                    host_ip:'10.22.2.123',
                    application:'https'
                },{
                    name:'文件名2',
                    hash:'323',
                    source:'8422',
                    host_ip:'192.122.2.213',
                    application:'https'
                }]
            },
            {
                name: '用户',
                content_th: [{
                    name: '用户名'
                }, {
                    name: '主机IP'
                }, {
                    name: '应用'
                }],
                value:[{
                    user_name:'用户名1',
                    host_ip:'10.22.2.123',
                    application:'https'
                },{
                    user_name:'用户名2',
                    host_ip:'192.122.2.213',
                    application:'https'
                }]
            }
        ];
        $scope.selected = 0;
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
    //tab栏切换
    $scope.show = function (params) {
        $scope.selected = params;
        console.log(params);
    };
    // 搜索
    $scope.search = function (params) {
        console.log($scope.user);
        console.log($scope.searchData);
        console.log($scope.selected);

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