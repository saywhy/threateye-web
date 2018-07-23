'use strict';

/* Controllers */
// overview controller
app.controller('OverViemController', ['$scope', '$http', '$state', '$modal', function ($scope, $http, $state, $modal) {
    // 初始化
    $scope.init = function (params) {
        $scope.computer_base64 = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADI0lEQVR4Xu2bS0iUURTH/2fGZhwrMZKKIpMis4fZRFhEhElFmwoX4ioQylpkD2mosAcWswkJJXuQzkaSFmZt3BX5oNA2YSoobRyDalMjKc2o8zlzwqJoopp7x28eznc/mNX3v/ee8/vOPfdc7h2CwR8yuP9QAFQEANiw5+R2E9MBwDgREWR6PthV/4LyCk/tBfEzI0ZCgIMltKmwwkGEmhkAW/PWoMCeA6LkTQ2fR8fxqO3lj+/N7PwFYPP6bDTfOWeIQDh9uQGd3QOhAEoO7sKVylJDALjlaoPr4VMFIGQKqAhQU0DlAJUE1SqglkFVB6hC6F8EtCBjdCogBSjDYobVnHj7iogqQe90EMPjfikAqxZYkG4xSbWJhVgBUHsBtRmS3w1OBhgfvVpUpugiqxkzv1g9McsBog4tsaVgqS1FVD5rXUQADB8Bs8aeQB1EFAGRFEKyPpuJkJka/VwQEYBICiFZAPNMhNwMq2wzab0CoAohVQjJF0LSEy2BG0SUAxLYH2nTFACVBFUSVElQHY6q0+E/jscP7S+A8+IR6SVlLjaoufsED1o7Qu8HLJxvQ0vjBaxYtngu+iRsc//QCCqvuvDJMxYKQLiHZBL+fkcomfwS9mUGQPHxG06L1XJJuFESCTVt+jY97nlbvzYnqyIefo24P8A/pSEnNzsew8M9/L6Z+jw+B4G+3xOM9VPlqIXPO4G6e1WxHvrneE4a8EwcZcAVDwuGBt3w+/3I37IuHsODwA5yM6d+9UzcZNBGvazwabzSN82rRfob806CBYRpFvP48nRrr4BUSMLAkJVTz0fl7Pp69xcHgYWmVdfgOwQ5PILMdFtPS2nuTiHvJEQKgAQsYamKADUFVA4wcBKsZtO+rP77AOwiSYODSBP5ow4xRkYD2uHXJ7bpeklB91WgqKG3DoQzIs7Lahho6ii3l8m2+59eVwBFjb1nAdTqaeBf+rrWXm6v1msM3QAUNbwpBrgVhKjfiwsSyjqP2Zv0gKALgMLGvh3EgXYisulhVLg+mFljMu/uLM9/FU4b7r0uAMINksjvFYBE/jqxsM3wEfANeS54DOvPkoIAAAAASUVORK5CYII=';
        $scope.oracle_base64 = 'image://data:image/png;base64,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';
        $scope.router_base64 = 'image://data:image/png;base64,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';


        $scope.colorType = {
            high: '#962116',
            mid: '#F5BF41',
            low: '#4AA46E',
            rgbaHigh10: 'rgba(150,33,22,1)',
            rgbaHigh8: 'rgba(150,33,22,.8)',
            rgbaHigh2: 'rgba(150,33,22,.2)',
            rgbaMid: 'rgba(245,191,65,1)',
            rgbaMid8: 'rgba(245,191,65,.8)',
            rgbaMid2: 'rgba(245,191,65,.2)',
            rgbaLow10: 'rgba(74,164,110,1)',
            rgbaLow8: 'rgba(74,164,110,.8)',
            rgbaLow2: 'rgba(74,164,110,.2)',
        };
        // 第一排
        $scope.sysState();
        $scope.file(); // 中间 文件数量
        $scope.flowTotal(); //中间流量总数
        $scope.safetyequipment(); // 右边 图表
        // 第二排
        $scope.alarmNum(); //告警数量
        $scope.threaten_type(); //威胁类型
        // 第三排
        $scope.top_threaten(); //top 威胁
        $scope.risk_property(); //top 风险资产
        $scope.untreatedAlarm(); //第二排中间未处理告警
        // $scope.change_password(); //test
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
    };
    // 第一排 中间图表--流量文件信息
    //文件
    $scope.file = function (params) {
        //获取文件数量
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
            series: [{
                name: '文件',
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
    };
    // 流量
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
            series: [{
                name: '流量',
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
    };
    // 第一排右边 图表 协议统计
    $scope.safetyequipment = function (params) {

        var myChart = echarts.init(document.getElementById('safetyequipment'));
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
                top: '4%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
            },
            yAxis: {
                type: 'category',
                data: ['SSH', 'TLS', 'IPSec', 'Telnet', 'SSH', 'SET'],
                axisTick: {
                    show: false
                },

            },
            series: [{
                    name: '直接访问',
                    type: 'bar',
                    stack: '总量',
                    data: [320, 302, 301, 334, 390, 330],
                    barWidth: 20,
                    itemStyle: {
                        normal: {
                            barBorderRadius: [4, 0, 0, 4], //柱形图圆角，初始化效果
                        }
                    }
                },
                {
                    name: '邮件营销',
                    type: 'bar',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230]
                },
                {
                    name: '联盟广告',
                    type: 'bar',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330]
                },
                {
                    name: '视频广告',
                    type: 'bar',
                    stack: '总量',
                    data: [150, 212, 201, 154, 190, 330]
                },
                {
                    name: '搜索引擎',
                    type: 'bar',
                    stack: '总量',
                    data: [820, 832, 901, 934, 1290, 1330],
                    itemStyle: {
                        normal: {
                            barBorderRadius: [0, 4, 4, 0], //柱形图圆角，初始化效果
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    };
    // 第二排 右边图表 - 威胁类型
    $scope.threaten_type = function (params) {
        var myChart = echarts.init(document.getElementById('threaten_type'));
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
                top: '4%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
            },
            yAxis: {
                type: 'category',
                data: ['可疑IP', '可疑文件', '可疑URL', '可疑行为', '其他'],
                axisTick: {
                    show: false
                },

            },
            series: [{
                    name: '直接访问',
                    type: 'bar',
                    stack: '总量',
                    data: [320, 302, 301, 334, 330],
                    barWidth: 20,
                    itemStyle: {
                        normal: {
                            barBorderRadius: [4, 0, 0, 4], //柱形图圆角，初始化效果
                        }
                    }
                },
                {
                    name: '邮件营销',
                    type: 'bar',
                    stack: '总量',
                    data: [120, 132, 134, 190, 230]
                },
                {
                    name: '联盟广告',
                    type: 'bar',
                    stack: '总量',
                    data: [182, 191, 234, 190, 330]
                },
                {
                    name: '视频广告',
                    type: 'bar',
                    stack: '总量',
                    data: [100, 212, 201, 154, 330]
                },
                {
                    name: '搜索引擎',
                    type: 'bar',
                    stack: '总量',
                    data: [820, 901, 934, 1290, 330],
                    itemStyle: {
                        normal: {
                            barBorderRadius: [0, 4, 4, 0], //柱形图圆角，初始化效果
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    };
    // 第二排 中间 -- 未处理告警
    $scope.untreatedAlarm = function (params) {
        // $http({
        //     method: 'GET',
        //     url: '/alert/untreated-alarm-type'
        // }).then(function (data, status, headers, config) {
        var myChart = echarts.init(document.getElementById('untreatedalarm'));
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{b}:{c}({d}%)"
            },
            grid: {
                show: true,
                left: 'center',
                right: 'center',
                top: 'center',
                bottom: 'center'
            },
            series: [{
                name: '未处理告警',
                type: 'pie',
                radius: '50%',
                center: ['50%', '50%'],
                hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
                hoverOffset: 0, //高亮扇区的偏移距离。
                selectedMode: 'single',
                data: [{
                        value: 123,
                        name: '高危',
                        itemStyle: {
                            normal: {
                                color: $scope.colorType.high
                            }
                        }
                    },
                    {
                        value: 231,
                        name: '中危',
                        itemStyle: {
                            normal: {
                                color: $scope.colorType.mid
                            }
                        }
                    },
                    {
                        value: 323,
                        name: '低危',
                        itemStyle: {
                            normal: {
                                color: $scope.colorType.low
                            }
                        }
                    }
                ],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: '{b} : {c} \n ({d}%)'
                        },
                        labelLine: {
                            show: true
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        myChart.setOption(option);
        // }, function (error, status, headers, config) {
        //     console.log(error);
        // });
    };
    // 第二排左边边图表 -  告警数量
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
                data: ['05-25', '05-26', '05-27', '05-28', '05-29', '05-30', '05-31'],
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
                    data: [13, 23, 32, 32, 44, 34, 21]
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
                    data: [22, 24, 15, 36, 13, 23, 34]
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
                    data: [21, 22, 24, 15, 36, 18, 27]
                }
            ]
        };
        myChart.setOption(option);
    };
    // 第三排
    // top5威胁
    $scope.top_threaten = function () {
        $scope.top_threaten_data = [{
            client_ip: '192.1.32.132',
            style: {
                width: '90%',
                borderRadius: '5px',
                backgroundColor: $scope.colorType.rgbaHigh8
            }
        }, {
            client_ip: '12.1.32.322',
            style: {
                width: '78%',
                borderRadius: '5px',
                backgroundColor: 'rgba(254,127,0,.8)'
            }
        }, {
            client_ip: '10.1.32.232',
            style: {
                width: '70%',
                borderRadius: '5px',
                backgroundColor: '#FE9B20'
            }
        }, {
            client_ip: '192.10.23.32',
            style: {
                width: '66%',
                borderRadius: '5px',
                backgroundColor: '#FEBB11'
            }
        }, {
            client_ip: '122.1.32.32',
            style: {
                width: '54%',
                borderRadius: '5px',
                backgroundColor: '#FECC01'
            }
        }]
    }
    //top风险资产
    $scope.risk_property = function () {
        $scope.risk_property_data = [{
            client_ip: '192.1.32.132',
            style: {
                width: '90%',
                borderRadius: '5px',
                backgroundColor: $scope.colorType.rgbaHigh8
            }
        }, {
            client_ip: '12.1.32.322',
            style: {
                width: '78%',
                borderRadius: '5px',
                backgroundColor: 'rgba(254,127,0,.8)'
            }
        }, {
            client_ip: '10.1.32.232',
            style: {
                width: '70%',
                borderRadius: '5px',
                backgroundColor: '#FE9B20'
            }
        }, {
            client_ip: '192.10.23.32',
            style: {
                width: '66%',
                borderRadius: '5px',
                backgroundColor: '#FEBB11'
            }
        }, {
            client_ip: '122.1.32.32',
            style: {
                width: '54%',
                borderRadius: '5px',
                backgroundColor: '#FECC01'
            }
        }]
    }
    //最新告警


    // 第四排 ——流量统计

    // 弹窗内容拓扑图
    $scope.change_password = function (size) {
        console.log(6666);
        $scope.showpop = true; //  显示弹窗
        setTimeout(function () {
            $scope.graph_echart();
        }, 10);
    };
    $scope.popfasle = function () {
        $scope.showpop = false; //  隐藏弹窗
    };
    $scope.ito_popfasle = function () {
        $scope.iotcontent = false; //  隐藏弹窗
    };
    $scope.graph_echart = function () {
        var myChart = echarts.init(document.getElementById('graph'));
        var option = {
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [{
                type: 'graph',
                layout: 'none',
                symbolSize: 50,
                roam: true,
                label: {
                    normal: {
                        show: true
                    }
                },
                focusNodeAdjacenc: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
                edgeSymbol: ['arrow', 'arrow'],
                edgeSymbolSize: [7, 7],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                data: [{
                    name: '节点1',
                    x: 900,
                    y: 300,
                    symbol: $scope.oracle_base64,
                    tooltip: {
                        formatter: `设备名称：引擎/探针<br/>
                        IP地址：10.12.32.123<br/>
                        状态：在线`
                    },
                    //节点上面的文字	
                    label: {
                        normal: {
                            position: "bottom",
                            show: true,
                            textStyle: {
                                fontSize: 12,
                                color: '#666',
                                align: 'center',
                            },
                            formatter: '引擎/探针'
                        }
                    }
                }, {
                    name: '节点2',
                    x: 600,
                    y: 100,
                    symbol: $scope.computer_base64,
                    tooltip: {
                        formatter: `名称：引擎<br/>
                        IP地址：10.12.32.111<br/>
                        状态：离线`,
                    }, //节点上面的文字	
                    label: {
                        normal: {
                            position: "bottom",
                            show: true,
                            textStyle: {
                                fontSize: 12,
                                color: '#666',
                                align: 'center',
                            },
                            formatter: '引擎'
                        }
                    }
                }, {
                    name: '节点3',
                    x: 600,
                    y: 300,
                    symbol: $scope.computer_base64,
                    tooltip: {
                        formatter: `设备名称：探针<br/>
                        IP地址：192.168.32.123<br/>
                        状态：离线`
                    },
                    //节点上面的文字	
                    label: {
                        normal: {
                            position: "bottom",
                            show: true,
                            textStyle: {
                                fontSize: 12,
                                color: '#666',
                                align: 'center',
                            },
                            formatter: '探针'
                        }
                    }
                }, {
                    name: '节点4',
                    x: 600,
                    y: 500,
                    symbol: $scope.computer_base64,
                    tooltip: {
                        formatter: `设备名称：引擎/探针<br/>
                        IP地址：192.12.32.123<br/>
                        状态：离线`
                    },
                    //节点上面的文字	
                    label: {
                        normal: {
                            position: "bottom",
                            show: true,
                            textStyle: {
                                fontSize: 12,
                                color: '#666',
                                align: 'center',
                            },
                            formatter: '引擎/探针'
                        }
                    }
                }, {
                    name: '节点5',
                    x: 900,
                    y: 100,
                    symbol: $scope.router_base64,
                    tooltip: {
                        formatter: `设备名称：引擎/探针<br/>
                        IP地址：192.12.32.123<br/>
                        状态：离线`
                    },
                    //节点上面的文字	
                    label: {
                        normal: {
                            position: "right",
                            show: true,
                            textStyle: {
                                fontSize: 12,
                                color: '#666',
                                align: 'left',
                            },
                            formatter: '引擎/探针'
                        }
                    }
                }, {
                    name: '节点7',
                    x: 1200,
                    y: 100,
                    symbol: $scope.router_base64,
                    tooltip: {
                        formatter: `设备名称：引擎/探针<br/>
                        IP地址：192.12.32.123<br/>
                        状态：离线`
                    },
                    //节点上面的文字	
                    label: {
                        normal: {
                            position: "bottom",
                            show: true,
                            textStyle: {
                                fontSize: 12,
                                color: '#666',
                                align: 'center',
                            },
                            formatter: '引擎/探针'
                        }
                    }
                }, {
                    name: '节点8',
                    x: 1200,
                    y: 300,
                    symbol: $scope.router_base64,
                    tooltip: {
                        formatter: `设备名称：引擎/探针<br/>
                        IP地址：192.12.32.123<br/>
                        状态：离线`
                    },
                    //节点上面的文字	
                    label: {
                        normal: {
                            position: "bottom",
                            show: true,
                            textStyle: {
                                fontSize: 12,
                                color: '#666',
                                align: 'center',
                            },
                            formatter: '引擎/探针'
                        }
                    }
                }, {
                    name: '节点9',
                    x: 1200,
                    y: 500,
                    symbol: $scope.router_base64,
                    tooltip: {
                        formatter: `设备名称：引擎/探针<br/>
                        IP地址：192.12.32.123<br/>
                        状态：离线`
                    },
                    //节点上面的文字	
                    label: {
                        normal: {
                            position: "bottom",
                            show: true,
                            textStyle: {
                                fontSize: 12,
                                color: '#666',
                                align: 'center',
                            },
                            formatter: '引擎/探针'
                        }
                    }
                }],
                links: [{
                    source: '节点2',
                    target: '节点1',
                    label: {
                        normal: {
                            show: true,
                            formatter: 'mysql',
                            fontSize: '14',
                            color: '#5e5e5e',
                            emphasis: false
                        }

                    }
                }, {
                    source: '节点1',
                    value: "1111",
                    target: '节点3',
                }, {
                    source: '节点1',
                    target: '节点4'
                }, {
                    source: '节点1',
                    target: '节点6'
                }, {
                    source: '节点1',
                    target: '节点7'
                }, {
                    source: '节点1',
                    target: '节点8'
                }, {
                    source: '节点1',
                    target: '节点9'
                }, {
                    source: '节点1',
                    target: '节点5'
                }],
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            }]
        };
        myChart.setOption(option);
        myChart.resize();
        //添加点击事件
        myChart.on('click', function (params) {
            // 弹窗打印数据的名称
            console.log(params);
            if (params.dataType == "node") {
                $scope.$apply(function () {
                    $scope.iotcontent = true;
                    setTimeout(function () {
                        $scope.iot_detail_top(); //iot具体cpu/内存/硬盘
                        $scope.iot_detail_bom(); // iot具体流量
                    }, 10);
                })
            }
        });
    };
    // iot_detail -  iot具体cpu/内存/硬盘
    $scope.iot_detail_top = function (params) {
        var myChart = echarts.init(document.getElementById('iot_detail_top'));
        var option = {
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
                    'CPU': true,
                    // 不选中'系列2'
                    '内存': true,
                    '硬盘': true,

                },
                data: ['CPU', '内存', '硬盘']
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
                name: 'CPU',
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
                            color: $scope.colorType.rgbaMid8
                        }, {
                            offset: 1,
                            color: $scope.colorType.rgbaMid2
                        }], false)
                    }
                },
                itemStyle: {
                    normal: {
                        color: $scope.colorType.rgbaMid
                    }
                },
                lineStyle: {
                    normal: {
                        width: 3
                    }
                }
            }, {
                name: '内存',
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
                name: '硬盘',
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
        myChart.resize();
    };
    // iot_detail -  iot具体流量
    $scope.iot_detail_bom = function (params) {
        var myChart = echarts.init(document.getElementById('iot_detail_bom'));
        var option = {
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
                    '流量': true
                },
                data: ['流量']
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
                name: '流量',
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
        myChart.resize();
    };
    //弹窗系统状态图表
    $scope.sysEchart = function (params) {
        console.log(params);
    };
    $scope.init();
}]);