'use strict';

/* Controllers */
// overview controller
app.controller('OverViemController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        
    }
    $scope.init();
    // 第一排 左边图表--系统状态
    $scope.sysState = function (params) {
            var myChart = echarts.init(document.getElementById('sys'));
            var option = {
                series: [{
                        name: '访问来源',
                        type: "pie",
                        silent: 'true', //不响应hover事件
                        radius: ["50%", "75%"],
                        center: ["50%", "50%"],
                        hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
                        legendHoverLink: false, //是否启用图例 hover 时的联动高亮。
                        hoverOffset: 0, //高亮扇区的偏移距离。
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: $scope.dataArray
                    },
                    {
                        name: '姓名',
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '50%'],
                        silent: 'true', //不响应hover事件
                        hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
                        legendHoverLink: false, //是否启用图例 hover 时的联动高亮。
                        hoverOffset: 0, //高亮扇区的偏移距离。
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [11],

                        itemStyle: {
                            normal: {
                                color: 'rgba(131,186,174,1)'
                            }
                        }
                    }
                ]
            };

            myChart.setOption(option);

        }, function (error, status, headers, config) {
            console.log(error);

        });
    }
    // 第二排 中间图表--流量信息
    //告警日志
    $scope.flowInfo = function (params) {
        //获取总日志数量
        $http({
            method: 'GET',
            url: '/alert/get-last24-alarms'
        }).then(function (data, status, headers, config) {

            $scope.alarmsDataName = [];
            $scope.alarmsDataNum = [];
            var objData = JSON.parse(data.data).alarms[0];
            for (var key in objData) {
                $scope.alarmsDataName.push(key);
                $scope.alarmsDataNum.push(objData[key]);
            }
            var myChart = echarts.init(document.getElementById('flowinfo'));
            var option = {
                grid: {
                    left: 45,
                    right: 30,
                    top: 15,
                    bottom: 25
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#ddd'
                        }
                    },
                    backgroundColor: 'rgba(255,255,255,1)',
                    padding: [5, 10],
                    textStyle: {
                        color: '#7588E4',
                    },
                    extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
                },
                xAxis: {
                    type: 'category',
                    data: $scope.alarmsDataName,
                    boundaryGap: false,
                    splitLine: {
                        show: true,
                        interval: 0, //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
                        maxInterval: 3600 * 24 * 1000,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        margin: 5,
                        textStyle: {
                            fontSize: 14
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            // color: ['#D4DFF5']
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            // color: '#609ee9'
                        }
                    },
                    axisLabel: {
                        margin: 5,
                        textStyle: {
                            fontSize: 14
                        }
                    }
                },
                series: [{
                    name: '告警日志',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    symbol: 'circle',
                    symbolSize: 6,
                    data: $scope.alarmsDataNum,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: $scope.colorType.rgbaHigh8
                            }, {
                                offset: 1,
                                color: $scope.colorType.rgbaHigh2
                            }], false)
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: $scope.colorType.rgbaHigh10
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    }
                }]
            };
            myChart.setOption(option);
            // 当相应准备就绪时调用
        }, function (error, status, headers, config) {
            console.log(error);
        })
    }
    // 实时日志
    $scope.flowTotal = function (params) {

        $http({
            method: 'GET',
            url: '/alert/get-last24-logs'
        }).then(function (data, status, headers, config) {
            $scope.dataArray = [];
            $scope.dataNum = [];
            angular.forEach(data.data.last24logs, function (key, value) {
                //   console.log(key);

                $scope.dataArray.push(key[0]);
                $scope.dataNum.push(key[1]);
            });
            var myChart = echarts.init(document.getElementById('flowtotal'));
            var option = {
                grid: {
                    left: 45,
                    right: 30,
                    top: 15,
                    bottom: 25
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#ddd'
                        }
                    },
                    backgroundColor: 'rgba(255,255,255,1)',
                    padding: [5, 10],
                    textStyle: {
                        color: '#7588E4',
                    },
                    extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
                },
                xAxis: {
                    type: 'category',
                    data: $scope.dataArray,
                    boundaryGap: false,
                    splitLine: {
                        show: true,
                        interval: 0, //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
                        maxInterval: 3600 * 24 * 1000,
                        lineStyle: {
                            // color: ['#D4DFF5']
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            // color: '#609ee9'
                        }
                    },
                    axisLabel: {
                        margin: 5,
                        textStyle: {
                            fontSize: 14
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            // color: ['#D4DFF5']
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            // color: '#609ee9'
                        }
                    },
                    axisLabel: {
                        margin: 5,
                        textStyle: {
                            fontSize: 14
                        }
                    }
                },
                series: [{
                    name: '实时日志',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    symbol: 'circle',
                    symbolSize: 6,
                    data: $scope.dataNum,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: $scope.colorType.rgbaLow8
                            }, {
                                offset: 1,
                                color: $scope.colorType.rgbaLow2
                            }], false)
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: $scope.colorType.rgbaLow10
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    }
                }]
            };
            myChart.setOption(option);

            // 当相应准备就绪时调用
        }, function (error, status, headers, config) {
            console.log(error);

        })


    }


}]);