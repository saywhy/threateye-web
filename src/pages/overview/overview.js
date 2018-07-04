'use strict';

/* Controllers */
// overview controller
app.controller('OverViemController', ['$scope', '$http', '$state', '$modal', function ($scope, $http, $state, $modal) {
    // 初始化
    $scope.init = function (params) {
        console.log('11212121212');
    
        
        $scope.colorType = {
            high: '#962116',
            mid: '#F5BF41',
            low: '#4AA46E',
            rgbaHigh10: 'rgba(150,33,22,1)',
            rgbaHigh8: 'rgba(150,33,22,.8)',
            rgbaHigh2: 'rgba(150,33,22,.2)',
            rgbaMid: 'rgba(245,191,65,1)',
            rgbaLow10: 'rgba(74,164,110,1)',
            rgbaLow8: 'rgba(74,164,110,.8)',
            rgbaLow2: 'rgba(74,164,110,.2)',
        };
        $scope.sysState();
        $scope.flowInfo();
        $scope.flowTotal();
        $scope.safetyequipment(); // 右边 图表
        $scope.targetPort(); //top10目标端口
        $scope.alarmNum(); //告警数量
        $scope.logrythm_left(); //流量统计-左边
        $scope.logrythm_right(); //流量统计-右边
        // $scope.graph_echart();
       
    };

    // 第一排 左边图表--系统状态
    $scope.sysState = function (params) {
        $scope.system = [{
                name: '预警',
                color: 'box-block-red',
                num: 0
            },
            {
                name: '健康',
                color: 'box-block-green',
                num: 3
            },
            {
                name: '离线',
                color: 'box-block-gray',
                num: 0
            }
        ];
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
                    data: [{
                            value: "10",
                            name: '硬盘',
                            itemStyle: {
                                normal: {
                                    color: 'rgba(131,186,174,.8)'
                                }
                            }
                        },
                        {
                            value: "10",
                            name: '内存',
                            itemStyle: {
                                normal: {
                                    color: 'rgba(131,186,174,.8)'
                                }
                            }
                        },
                        {
                            value: "10",
                            name: 'cpu',
                            itemStyle: {
                                normal: {
                                    color: 'rgba(131,186,174,.8)'
                                }
                            }
                        }
                    ]
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
    }
    // 第一排 中间图表--流量信息
    //告警日志
    $scope.flowInfo = function (params) {
        //获取总日志数量
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
                data: ['05-23', '05-24', '05-25', '05-26', '05-27', '05-28', '05-29'],
                boundaryGap: false,
                splitLine: {
                    show: false,
                    interval: 0, //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
                    maxInterval: 3600 * 24 * 1000,
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 5,
                    textStyle: {
                        fontSize: 10
                    }
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        // color: 'red'
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
                        fontSize: 10
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
                data: [10, 22, 12, 33, 54, 32, 12],
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

    }
    // 实时日志
    $scope.flowTotal = function (params) {
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
                data: ['05-23', '05-24', '05-25', '05-26', '05-27', '05-28', '05-29'],
                boundaryGap: false,
                splitLine: {
                    show: false,
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
                        fontSize: 10
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
                        fontSize: 10
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
                data: [654, 234, 543, 343, 541, 322, 276],
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
    }
    // 第一排右边 图表
    $scope.safetyequipment = function (params) {

        var myChart = echarts.init(document.getElementById('safetyequipment'));
        var option = {
            // title: {
            //     text: '今日&昨日',
            //     left: '50%',
            //     textAlign: 'center'
            // },
            grid: {
                left: 40,
                right: 20,
                top: 15,
                bottom: 85
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
            legend: {
                bottom: 20,
                left: 20,
                orient: 'horizontal',
                selected: {
                    // 选中'系列1'
                    'HTTP': true,
                    // 不选中'系列2'
                    'HTTPS': true,
                    'SSH': false,

                },
                data: ['HTTP', 'HTTPS', 'SSH']
            },
            xAxis: {
                type: 'category',
                data: ['00:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', "22:00"],
                boundaryGap: false,
                splitLine: {
                    show: false,
                    interval: 'auto',
                    lineStyle: {
                        color: ['#D4DFF5']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#666'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 10
                    }
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: ['#D4DFF5']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#666'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 10
                    }
                }
            },
            series: [{
                name: 'HTTP',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322'],
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(199, 237, 250,0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(199, 237, 250,0.2)'
                        }], false)
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f7b851'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 3
                    }
                }
            }, {
                name: 'HTTPS',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1998', '822'],
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(216, 244, 247,1)'
                        }, {
                            offset: 1,
                            color: 'rgba(216, 244, 247,1)'
                        }], false)
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#58c8da'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 3
                    }
                }
            }, {
                name: 'SSH',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: ['488', '1600', '1200', '1400', '626', '1100', '500', '300', '1998', '822', '808', '811'],
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
        };;
        myChart.setOption(option);
    }
    // 第二排 左边图表 - top10目标端口
    $scope.targetPort = function (params) {
        var myChart = echarts.init(document.getElementById('target_port'));
        var option = {
            // title: {
            //     text: '今日&昨日',
            //     left: '50%',
            //     textAlign: 'center'
            // },
            grid: {
                left: 40,
                right: 20,
                top: 15,
                bottom: 85
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
            legend: {
                bottom: 20,
                left: 20,
                orient: 'horizontal',
                selected: {
                    // 选中'系列1'
                    'HTTP': true,
                    // 不选中'系列2'
                    'HTTPS': true,
                    'SSH': false,

                },
                data: ['HTTP', 'HTTPS', 'SSH']
            },
            xAxis: {
                type: 'category',
                data: ['00:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', "22:00"],
                boundaryGap: false,
                splitLine: {
                    show: false,
                    interval: 'auto',
                    lineStyle: {
                        color: ['#D4DFF5']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#666'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 10
                    }
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: ['#D4DFF5']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#666'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 10
                    }
                }
            },
            series: [{
                name: 'HTTP',
                type: 'line',
                symbol: 'circle', // none 这句就是去掉点的  
                smooth: false, //这句就是让曲线变平滑的 
                showSymbol: false,
                symbolSize: 6,
                data: ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322'],
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(199, 237, 250,0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(199, 237, 250,0.2)'
                        }], false)
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f7b851'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 3
                    }
                }
            }, {
                name: 'HTTPS',
                type: 'line',
                symbol: 'circle', // none 这句就是去掉点的  
                smooth: false, //这句就是让曲线变平滑的 
                showSymbol: false,
                symbolSize: 6,
                data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1998', '822'],
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(216, 244, 247,1)'
                        }, {
                            offset: 1,
                            color: 'rgba(216, 244, 247,1)'
                        }], false)
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#58c8da'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 3
                    }
                }
            }, {
                name: 'SSH',
                type: 'line',
                symbol: 'circle', // none 这句就是去掉点的  
                smooth: false, //这句就是让曲线变平滑的 
                showSymbol: false,
                symbolSize: 6,
                data: ['488', '1600', '1200', '1400', '626', '1100', '500', '300', '1998', '822', '808', '811'],
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
        };;
        myChart.setOption(option);


    }
    // 第二排右边图表 -  告警数量
    $scope.alarmNum = function (params) {
        var myChart = echarts.init(document.getElementById('alarm_number'));
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['05-18', '05-19', '05-20', '05-21', '05-22', '05-23', '05-24', '05-25', '05-26', '05-27', '05-28', '05-29', '05-30', '05-31'],
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 5,
                    textStyle: {
                        fontSize: 10
                    }
                }
            },
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 5,
                    textStyle: {
                        fontSize: 10
                    }
                }
            }],
            series: [{
                    name: '高危',
                    type: 'bar',
                    barWidth: 20,
                    stack: '搜索引擎',
                    itemStyle: {
                        normal: {
                            barBorderRadius: [0, 0, 4, 4], //柱形图圆角，初始化效果
                            color: $scope.colorType.high
                        }
                    },
                    data: [13, 23, 32, 32, 44, 34, 21, 22, 24, 15, 36, 18, 27]
                },
                {
                    name: '中危',
                    type: 'bar',
                    stack: '搜索引擎',
                    itemStyle: {
                        normal: {
                            color: $scope.colorType.mid
                        }
                    },
                    data: [22, 24, 15, 36, 13, 23, 34, 21, 18, 27, 32, 32, 44]
                },
                {
                    name: '低危',
                    type: 'bar',
                    stack: '搜索引擎',
                    itemStyle: {
                        normal: {
                            barBorderRadius: [4, 4, 0, 0], //柱形图圆角，初始化效果
                            color: $scope.colorType.low
                        }
                    },
                    data: [21, 22, 24, 15, 36, 18, 27, 13, 23, 32, 32, 44, 34]
                }
            ]
        };
        myChart.setOption(option);
    }

    // 第四排 ——流量统计
    $scope.logrythm_left = function () {
        var myChart = echarts.init(document.getElementById('logrythm_left'));
        var option = option = {
            tooltip: {
                trigger: 'item',
                formatter: "com:1212(27%)<br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data: ['com', 'net', 'edu', 'gov', 'io', 'de', 'org', 'tv', 'to', 'fi', 'facebook.com', 'secious.com', 'outlook.com', 'rightpoint.com', 'spotxcdn.com', 'adnxs.com']
            },
            series: [{
                name: ' ',
                type: 'pie',
                radius: ['35%', '50%'],
                center : [ '45%', '50%' ],
                avoidLabelOverlap: false,
                hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    }
                },
                data: [{
                    value: 335,
                    name: 'com'
                }, {
                    value: 12,
                    name: 'net'
                }, {
                    value: 123,
                    name: 'edu'
                }, {
                    value: 122,
                    name: 'gov'
                }, {
                    value: 59,
                    name: 'io'
                }, {
                    value: 20,
                    name: 'de'
                }, {
                    value: 335,
                    name: 'org'
                }, {
                    value: 12,
                    name: 'tv'
                }, {
                    value: 123,
                    name: 'to'
                }, {
                    value: 122,
                    name: 'fi'
                }, {
                    value: 59,
                    name: 'facebook.com'
                }, {
                    value: 20,
                    name: 'secious.com'
                }, {
                    value: 20,
                    name: 'outlook.com'
                }, {
                    value: 20,
                    name: 'rightpoint.com'
                }, {
                    value: 20,
                    name: 'spotxcdn.com'
                }, {
                    value: 20,
                    name: 'adnxs.com'
                }]
            }, {
                name: ' ',
                type: 'pie',
                radius: ['50%', '65%'],
                center : [ '45%', '50%' ],
                avoidLabelOverlap: false,
                hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
                legendHoverLink: false, //是否启用图例 hover 时的联动高亮。
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    value: 23,
                    name: 'com'
                }, {
                    value: 113,
                    name: 'net'
                }, {
                    value: 323,
                    name: 'edu'
                }, {
                    value: 1252,
                    name: 'gov'
                }, {
                    value: 323,
                    name: 'io'
                }, {
                    value: 123,
                    name: 'de'
                }, {
                    value: 31,
                    name: 'org'
                }, {
                    value: 65,
                    name: 'tv'
                }, {
                    value: 98,
                    name: 'to'
                }, {
                    value: 121,
                    name: 'fi'
                }, {
                    value: 97,
                    name: 'facebook.com'
                }, {
                    value: 54,
                    name: 'secious.com'
                }, {
                    value: 63,
                    name: 'outlook.com'
                }, {
                    value: 20,
                    name: 'rightpoint.com'
                }, {
                    value: 12,
                    name: 'spotxcdn.com'
                }, {
                    value: 64,
                    name: 'adnxs.com'
                }]
            }, {
                name: ' ',
                type: 'pie',
                radius: ['65%', '80%'],
                center : [ '45%', '50%' ],
                avoidLabelOverlap: false,
                hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
                legendHoverLink: false, //是否启用图例 hover 时的联动高亮。
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    value: 111,
                    name: 'com'
                }, {
                    value: 213,
                    name: 'net'
                }, {
                    value: 113,
                    name: 'edu'
                }, {
                    value: 21,
                    name: 'gov'
                }, {
                    value: 323,
                    name: 'io'
                }, {
                    value: 123,
                    name: 'de'
                }, {
                    value: 311,
                    name: 'org'
                }, {
                    value: 323,
                    name: 'tv'
                }, {
                    value: 198,
                    name: 'to'
                }, {
                    value: 11,
                    name: 'fi'
                }, {
                    value: 312,
                    name: 'facebook.com'
                }, {
                    value: 154,
                    name: 'secious.com'
                }, {
                    value: 554,
                    name: 'outlook.com'
                }, {
                    value: 875,
                    name: 'rightpoint.com'
                }, {
                    value: 122,
                    name: 'spotxcdn.com'
                }, {
                    value: 64,
                    name: 'adnxs.com'
                }]
            }]
        };
        myChart.setOption(option);
    }
    $scope.logrythm_right = function () {
        var myChart = echarts.init(document.getElementById('logrythm_right'));
        var option = option = {
            tooltip: {
                trigger: 'item',
                formatter: "link:2252(45%)<br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data: ['link', 'ie', 'me', 'ai', 'co', 'ru', 'fm', 'ms', 'uk', 'fr', 'independent.ie', 'somatlx.ai', 'nanorep.co', 'yandex.ru', 'last.fm', 'sfx.ms']
            },
            series: [{
                name: ' ',
                type: 'pie',
                radius: ['35%', '50%'],
                center : [ '45%', '50%' ],
                avoidLabelOverlap: false,
                hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    }
                },
                data: [{
                    value: 335,
                    name: 'link'
                }, {
                    value: 12,
                    name: 'ie'
                }, {
                    value: 123,
                    name: 'me'
                }, {
                    value: 122,
                    name: 'ai'
                }, {
                    value: 59,
                    name: 'co'
                }, {
                    value: 20,
                    name: 'ru'
                }, {
                    value: 335,
                    name: 'fm'
                }, {
                    value: 12,
                    name: 'ms'
                }, {
                    value: 123,
                    name: 'uk'
                }, {
                    value: 122,
                    name: 'fr'
                }, {
                    value: 59,
                    name: 'independent.ie'
                }, {
                    value: 20,
                    name: 'somatlx.ai'
                }, {
                    value: 20,
                    name: 'nanorep.co'
                }, {
                    value: 20,
                    name: 'yandex.ru'
                }, {
                    value: 20,
                    name: 'last.fm'
                }, {
                    value: 20,
                    name: 'sfx.ms'
                }]
            }, {
                name: ' ',
                type: 'pie',
                radius: ['50%', '65%'],
                center : [ '45%', '50%' ],
                avoidLabelOverlap: false,
                hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
                legendHoverLink: false, //是否启用图例 hover 时的联动高亮。
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    value: 131,
                    name: 'link'
                }, {
                    value: 232,
                    name: 'ie'
                }, {
                    value: 111,
                    name: 'me'
                }, {
                    value: 122,
                    name: 'ai'
                }, {
                    value: 11,
                    name: 'co'
                }, {
                    value: 32,
                    name: 'ru'
                }, {
                    value: 112,
                    name: 'fm'
                }, {
                    value: 2231,
                    name: 'ms'
                }, {
                    value: 323,
                    name: 'uk'
                }, {
                    value: 122,
                    name: 'fr'
                }, {
                    value: 519,
                    name: 'independent.ie'
                }, {
                    value: 220,
                    name: 'somatlx.ai'
                }, {
                    value: 20,
                    name: 'nanorep.co'
                }, {
                    value: 20,
                    name: 'yandex.ru'
                }, {
                    value: 201,
                    name: 'last.fm'
                }, {
                    value: 201,
                    name: 'sfx.ms'
                }]
            }, {
                name: ' ',
                type: 'pie',
                radius: ['65%', '80%'],
                center : [ '45%', '50%' ],
                avoidLabelOverlap: false,
                hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
                legendHoverLink: false, //是否启用图例 hover 时的联动高亮。
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    value: 35,
                    name: 'link'
                }, {
                    value: 1122,
                    name: 'ie'
                }, {
                    value: 32,
                    name: 'me'
                }, {
                    value: 1322,
                    name: 'ai'
                }, {
                    value: 592,
                    name: 'co'
                }, {
                    value: 210,
                    name: 'ru'
                }, {
                    value: 35,
                    name: 'fm'
                }, {
                    value: 122,
                    name: 'ms'
                }, {
                    value: 1123,
                    name: 'uk'
                }, {
                    value: 22,
                    name: 'fr'
                }, {
                    value: 591,
                    name: 'independent.ie'
                }, {
                    value: 210,
                    name: 'somatlx.ai'
                }, {
                    value: 202,
                    name: 'nanorep.co'
                }, {
                    value: 90,
                    name: 'yandex.ru'
                }, {
                    value: 10,
                    name: 'last.fm'
                }, {
                    value: 70,
                    name: 'sfx.ms'
                }]
            }]
        };
        myChart.setOption(option);
    };




    // 弹窗内容拓扑图
    $scope.showState = function (item) {
        if (item.num != 0) {
            $scope.showpop = true; //  显示弹窗
            $scope.sysEchart();
        }
    }
    $scope.change_password = function (size) {
        console.log(6666);
        $scope.data = {};
        var data = '传递数据';
        var modalInstance = $modal.open({
            templateUrl: 'tuopu.html',
            controller: 'Modal_change_passwordCtrl',
            size: size,
            resolve: {
                data: function () { //data作为modal的controller传入的参数
                    console.log(777);
                    return $scope.data; //用于传递数据
            
                }
            }
        });

    };

    $scope.graph_echart = function(){
        var myChart = echarts.init(document.getElementById('graph_echart'));
        var option = {
            title: {
                text: 'Graph 简单示例'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    roam: true,
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        normal: {
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    data: [{
                        name: '节点1',
                        x: 300,
                        y: 300
                    }, {
                        name: '节点2',
                        x: 800,
                        y: 300
                    }, {
                        name: '节点3',
                        x: 550,
                        y: 100
                    }, {
                        name: '节点4',
                        x: 550,
                        y: 500
                    }],
                    // links: [],
                    links: [{
                        source: 0,
                        target: 1,
                        symbolSize: [5, 20],
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 5,
                                curveness: 0.2
                            }
                        }
                    }, {
                        source: '节点2',
                        target: '节点1',
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        lineStyle: {
                            normal: { curveness: 0.2 }
                        }
                    }, {
                        source: '节点1',
                        target: '节点3'
                    }, {
                        source: '节点2',
                        target: '节点3'
                    }, {
                        source: '节点2',
                        target: '节点4'
                    }, {
                        source: '节点1',
                        target: '节点4'
                    }],
                    lineStyle: {
                        normal: {
                            opacity: 0.9,
                            width: 2,
                            curveness: 0
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    };
    //弹窗系统状态图表
    $scope.sysEchart = function (params) {
        console.log(params);
    }

    $scope.init();
}]);