/* Controllers */
app.controller('ReportformController', ['$scope', '$http', '$state', '$filter', function ($scope, $http, $state, $filter) {
    rootScope = $scope;
    $scope.init = function (params) {
        $scope.datafalse = false; //版本暂时不需要，隐藏
        $scope.reportNameInput = true;
        $scope.selectedName = 'csv';
        $scope.alertMsg = false;
        $scope.reportName = $scope.getDate;
        $scope.choosetime = 'week';
        //   默认周报
        $scope.timerChoose = {
            maxDate: moment(),
            minDate: moment().subtract(90, 'days'),
            timePickerIncrement: 10,
            startDate: moment().subtract(7, 'days'),
            endDate: moment()
        };
        $scope.getDate = new Date();
        //可以当前日期
        $scope.nowDate = $filter("date")($scope.getDate, "yyyy-MM-dd HH:mm:ss");
        //获取前一天日期
        $scope.oldDay = $filter("date")($scope.getDate - 86400000, "yyyy-MM-dd HH:mm:ss");
        //获取一周前日期
        $scope.oldWeek = $filter("date")($scope.getDate - 86400000 * 7, "yyyy-MM-dd HH:mm:ss");
        //获取一月前日期
        $scope.oldMonth = $filter("date")($scope.getDate - 86400000 * 30, "yyyy-MM-dd HH:mm:ss");
        $scope.startTime = $scope.oldWeek;
        $scope.endTime = $scope.nowDate;
        $scope.datapicker($scope.timerChoose);
        $scope.datatype = [{
            name: '运行报告(docx)',
            value: 'docx'
        }, {
            name: '告警列表(csv)',
            value: 'csv'
        }];
        $scope.pages = {
            data: [],
            count: 0,
            maxPage: "...",
            pageNow: 1,
        };
        //获取报表 记录
        $scope.getPage(1);
    };
    $scope.inputfocus = function (params) {
        $scope.reportNameInput = true;
    };
    // 分页
    $scope.getPage = function (pageNow) {
        $scope.pages.pageNow = pageNow;
        $scope.getDataInfo($scope.pages);
    };
    //获取报表 记录
    $scope.getDataInfo = function (data) {
        $http({
            method: 'GET',
            url: './yiiapi/report/list',
            params: {
                page: data.pageNow,
                rows: 10
            }
        }).then(function (data, status, headers, config) {
            console.log(data.data.data);
            $scope.pages = {
                data: data.data.data.data,
                count: data.data.data.count,
                maxPage: data.data.data.maxPage,
                pageNow: data.data.data.pageNow,
            };
            $scope.dataInfo = $scope.pages.data;
        }, function (error, status, headers, config) {
            console.log(error);
        });
    };
    //生成报表
    $scope.generate = function (params) {
        if ($scope.reportName) {
            $scope.alertMsg = false;
        } else {
            $scope.alertMsg = true;
        }
        if ($scope.reportName == undefined) {
            $scope.reportNameInput = false;
        } else {
            $scope.reportNameInput = true;
            // 获取echarts数据
            console.log($scope.selectedName);
            if ($scope.selectedName == 'docx') {
                // var loading = zeroModal.loading(4);
                $http({
                    method: 'get',
                    url: './yiiapi/report/create-echarts-img',
                    params: {
                        stime: new Date($scope.startTime).valueOf() / 1000,
                        etime: new Date($scope.endTime).valueOf() / 1000,
                        report_name: $scope.reportName,
                        report_type: $scope.selectedName
                    }
                }).success(function (data) {
                    console.log(data.data.threat_level);
                    if (data.status == 0) {
                        zeroModal.close(loading);
                        // 未处理告警
                        $scope.threat_level = data.data.threat_level;
                        $scope.untreatedAlarm($scope.threat_level);
                        var loading = zeroModal.loading(4);
                        $http({
                            method: 'post',
                            url: './yiiapi/report/create-report',
                            data: {
                                stime: new Date($scope.startTime).valueOf() / 1000,
                                etime: new Date($scope.endTime).valueOf() / 1000,
                                report_name: $scope.reportName,
                                report_type: $scope.selectedName,
                                threat_level: $scope.base64_untreatedAlarm
                            }
                        }).success(function (data) {
                            console.log(data);
                            if (data.status == 0) {
                                // 生成成功
                                zeroModal.success("保存成功!");
                                $scope.getDataInfo(1);
                                zeroModal.close(loading);
                            }
                        }).error(function () {
                            zeroModal.error("保存失败!");
                            zeroModal.close(loading);
                        })
                    }
                }).error(function () {
                    zeroModal.error("保存失败!");
                    zeroModal.close(loading);
                })
            } else {
                var loading = zeroModal.loading(4);
                $http({
                    method: 'post',
                    url: './yiiapi/report/create-report',
                    data: {
                        stime: new Date($scope.startTime).valueOf() / 1000,
                        etime: new Date($scope.endTime).valueOf() / 1000,
                        report_name: $scope.reportName,
                        report_type: $scope.selectedName
                    }
                }).then(function (data, status, headers, config) {
                    console.log(data);
                    if (data.data.status == 0) {
                        // 添加成功，刷新数据 
                        zeroModal.close(loading);
                        zeroModal.success("保存成功!");
                        $scope.getDataInfo(1);
                    }
                }, function (error, status, headers, config) {
                    zeroModal.close(loading);
                    zeroModal.error("保存失败!");
                    console.log(error);
                })
            }
        }

    };
    // 删除报表
    $scope.del = function (params) {
        var item = params;

        function del_confirm(item) {
            $scope.loading = zeroModal.loading(4);
            $http({
                method: 'delete',
                url: './yiiapi/report/delete',
                data: {
                    id: item.id
                }
            }).then(function (data, status, headers, config) {
                console.log(data);
                zeroModal.close($scope.loading);
                if (data.data.status == 0) {
                    // 添加成功，刷新数据
                    $scope.getDataInfo($scope.pages);
                }
            }, function (error, status, headers, config) {
                console.log(error);
                zeroModal.close($scope.loading);
            });
        }
        zeroModal.confirm({
            content: "确定删除报表吗？",
            okFn: function () {
                del_confirm(item);
            },
            cancelFn: function () {}
        });
    };
    // 生成图表
    $scope.untreatedAlarm = function (params) {
        angular.forEach(params, function (item) {
            if (item.degree == "low") {
                $scope.low_total_count = item.total_count
            } else if (item.degree == "medium") {
                $scope.medium_total_count = item.total_count
            } else if (item.degree == "high") {
                $scope.high_total_count = item.total_count
            }
        });
        var myChart = echarts.init(document.getElementById('untreatedalarm_report'));
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
                animation: false,
                radius: '50%',
                center: ['50%', '50%'],
                hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
                hoverOffset: 0, //高亮扇区的偏移距离。
                selectedMode: 'single',
                data: [{
                        value: $scope.high_total_count,
                        name: '高危',
                        itemStyle: {
                            normal: {
                                color: '#962116'
                            }
                        }
                    },
                    {
                        value: $scope.medium_total_count,
                        name: '中危',
                        itemStyle: {
                            normal: {
                                color: '#F5BF41'
                            }
                        }
                    },
                    {
                        value: $scope.low_total_count,
                        name: '低危',
                        itemStyle: {
                            normal: {
                                color: '#4AA46E'
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
        $scope.base64_untreatedAlarm = myChart.getDataURL();
        console.log(myChart.getDataURL());
    };
    // 下载报表
    $scope.download = function (params) {
        zeroModal.confirm({
            content: "确定下载报表吗？",
            okFn: function () {
                $scope.download_report(params.id);
            },
            cancelFn: function () {}
        });
    };
    $scope.download_report = function (params) {
        console.log(params);
        var tt = new Date().getTime();
        var url = './yiiapi/report/download-report';
        /**
         * 使用form表单来发送请求
         * 1.method属性用来设置请求的类型——post还是get
         * 2.action属性用来设置请求路径。
         */
        var form = $("<form>"); //定义一个form表单
        form.attr("style", "display:none");
        form.attr("target", "");
        form.attr("method", "get"); //请求类型
        form.attr("action", url); //请求地址
        $("body").append(form); //将表单放置在web中
        /**
         * input标签主要用来传递请求所需的参数：
         * 1.name属性是传递请求所需的参数名.
         * 2.value属性是传递请求所需的参数值.
         * 3.当为get类型时，请求所需的参数用input标签来传递，直接写在URL后面是无效的。
         * 4.当为post类型时，queryString参数直接写在URL后面，formData参数则用input标签传递
         *       有多少数据则使用多少input标签
         */
        var input1 = $("<input>");
        input1.attr("type", "hidden");
        input1.attr("name", "id");
        input1.attr("value", params);
        form.append(input1);
        form.submit(); //表单提交
    };
    // 选择 日报月报 周报 触发
    $scope.changeTime = function (params) {
        if ($scope.choosetime == 'day') {
            $scope.timerChoose = {
                maxDate: moment(),
                minDate: moment().subtract(90, 'days'),
                timePickerIncrement: 10,
                startDate: moment().subtract(1, 'days'),
                endDate: moment()
            }
            $scope.startTime = $scope.oldDay;
            $scope.endTime = $scope.nowDate;
        } else if ($scope.choosetime == 'week') {
            $scope.timerChoose = {
                maxDate: moment(),
                minDate: moment().subtract(90, 'days'),
                timePickerIncrement: 10,
                startDate: moment().subtract(7, 'days'),
                endDate: moment()
            }
            $scope.startTime = $scope.oldWeek;
            $scope.endTime = $scope.nowDate;
        } else if ($scope.choosetime == 'month') {
            $scope.timerChoose = {
                maxDate: moment(),
                minDate: moment().subtract(90, 'days'),
                timePickerIncrement: 10,
                startDate: moment().subtract(30, 'days'),
                endDate: moment()
            }
            $scope.startTime = $scope.oldMonth;
            $scope.endTime = $scope.nowDate;
        }
        $scope.datapicker($scope.timerChoose);
    };
    // 时间插件
    $scope.datapicker = function (choosetime) {
        $('#reservationtime').daterangepicker({
            maxDate: choosetime.maxDate,
            minDate: choosetime.minDate,
            timePickerIncrement: 10,
            startDate: choosetime.startDate,
            endDate: choosetime.endDate,
            locale: {
                applyLabel: '确定',
                cancelLabel: '取消',
                format: 'YYYY-MM-DD HH:mm:ss'
            }
        }, function (start, end, label) {
            $scope.startTime = $filter("date")(start.unix() * 1000, "yyyy-MM-dd HH:mm:ss");
            $scope.endTime = $filter("date")(end.unix() * 1000, "yyyy-MM-dd HH:mm:ss");
        });
    };
    // 点击时间插件 取消日报月报周报选项
    $scope.custom = function (params) {
        $("input[type='radio']").removeAttr('checked');
    };
    $scope.init();
}]);