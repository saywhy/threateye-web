'use strict';

/* Controllers */
// Alarm controller
app.controller('AlarmController', [
    '$scope',
    '$http',
    '$state',
    '$filter',
    function ($scope, $http, $state, $filter) {
        // 初始化
        $scope.init = function (params) {
            $scope.searchData = {};
            $scope.statusData = [{
                num: 3,
                type: '所有'
            }, {
                num: 2,
                type: '已解决'
            }, {
                num: 0,
                type: '未解决'
            }];
            $scope.timepicker();
            $scope.alarmEchart(); // 折线图表
            $scope.pages = {
                data: [],
                count: 0,
                maxPage: "...",
                pageNow: 1,
            };
            // 默认时间
            $scope.searchData = {
                startTime: moment().subtract(365, 'days').unix(),
                endTime: moment().unix()
            };
            $scope.getPage();
        };
        // 告警列表
        $scope.getPage = function (pageNow) {
            pageNow = pageNow ? pageNow : 1;
            $scope.params_data = {
                start_time: $scope.searchData.startTime,
                end_time: $scope.searchData.endTime,
                src_ip: $scope.searchData.src_ip,
                dest_ip: $scope.searchData.dest_ip,
                status: $scope.searchData.status,
                page: pageNow,
                rows: '10'
            };
            console.log($scope.params_data);
            $http({
                method: 'get',
                url: './yiiapi/alert/list',
                params: $scope.params_data,
            }).success(function (data) {
                console.log(data);
                if (data.status == 0) {
                    $scope.pages = data.data;
                }
                console.log($scope.pages);
            }).error(function (err) {
                console.log(err);
            })
        }
         // 默认是未解决
    $scope.selectedName = 0;
    $scope.setAriaID = function (item, $event) {
        $event.stopPropagation();
        if ($scope.ariaID == item.id) {
            $scope.ariaID = null;
        } else {
            $scope.ariaID = item.id;
        }
    };
    $scope.delAriaID = function ($event) {
        $event.stopPropagation();
        setTimeout(function () {
            $scope.ariaID = null;
        }, 10);
    };
        // 搜索按钮
        $scope.search = function () {
            $scope.getPage();
        }
        // 折线图表
        $scope.alarmEchart = function (params) {
            var data = {
                data: {
                    alert_count: [13, 23, 16, 32, 43, 31, 131, 313, 133, 313, 132, 56, 44, 63, 55, 32, 45, 52, 23, 55],
                    times: ['2018-07-22 01:00',
                        '2018-07-22 02:00',
                        '2018-07-22 03:00',
                        '2018-07-22 04:00',
                        '2018-07-22 05:00',
                        '2018-07-22 06:00',
                        '2018-07-22 07:00',
                        '2018-07-22 08:00',
                        '2018-07-22 09:00',
                        '2018-07-22 10:00',
                        '2018-07-22 11:00',
                        '2018-07-22 12:00',
                        '2018-07-22 13:00',
                        '2018-07-22 14:00',
                        '2018-07-22 15:00',
                        '2018-07-22 16:00',
                        '2018-07-22 17:00',
                        '2018-07-22 18:00',
                        '2018-07-22 19:00',
                        '2018-07-22 12:00'
                    ]
                }
            };
            var myChart = echarts.init(document.getElementById('alarm_echart'));
            var option = {
                grid: {
                    bottom: 80,
                    top: 50,
                    left: 50,
                    right: 50
                },
                tooltip: {
                    trigger: 'axis',
                },
                dataZoom: [{
                        show: true,
                        realtime: true,
                        start: 80,
                        end: 100
                    },
                    {
                        type: 'inside',
                        realtime: true,
                        start: 80,
                        end: 100
                    }
                ],
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        onZero: false
                    },
                    data: data.data.times.map(function (str) {
                        return str.replace(' ', '\n')
                    }),
                    axisTick: {
                        show: false
                    }
                }],
                yAxis: [{
                    name: '告警',
                    type: 'value',
                    axisTick: {
                        show: false
                    }
                }],
                series: [{
                        name: '告警',
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        symbol: 'circle',
                        symbolSize: 3,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(150,33,22,.8)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(150,33,22,.5)'
                                }], false)
                            }
                        },
                        animation: true,
                        lineStyle: {
                            normal: {
                                width: 3
                            }
                        },
                        data: data.data.alert_count
                    }

                ]
            };
            myChart.setOption(option);
        };
        // 时间插件初始化
        $scope.timepicker = function (params) {
            $('.timerange').daterangepicker({
                    timePicker: true,
                    timePickerIncrement: 10,
                    // startDate: moment().startOf('year'),
                    // endDate: moment().endOf('day'),
                    startDate: moment().subtract(365, 'days'),
                    endDate: moment(),
                    locale: {
                        applyLabel: '确定',
                        cancelLabel: '取消',
                        format: 'YYYY-MM-DD HH:mm',
                        customRangeLabel: '指定时间范围',
                    },
                    ranges: {
                        今天: [moment().startOf('day'), moment().endOf('day')],
                        '7日内': [
                            moment()
                            .startOf('day')
                            .subtract(7, 'days'),
                            moment().endOf('day'),
                        ],
                        本月: [moment().startOf('month'), moment().endOf('day')],
                        今年: [moment().startOf('year'), moment().endOf('day')],
                    },
                },
                function (start, end, label) {
                    $scope.searchData.startTime = start.unix();
                    $scope.searchData.endTime = end.unix();
                }
            );
        };
        // 跳转详情页面
        $scope.detail = function (params) {
            console.log(params);
            params = escape(JSON.stringify(params));
            $state.go('app.alarm_detail', {
                data: params
            });
        };

        $scope.init();
    },
]);