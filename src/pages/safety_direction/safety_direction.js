'use strict';
/* Controllers */
app.controller('Safety_directionController', ['$scope', '$http', '$state', '$rootScope', '$filter', function ($scope, $http, $state, $rootScope, $filter) {
    // 初始化
    $scope.init = function (params) {
        $scope.content_show = false;
        clearInterval($rootScope.insideInterval);
        clearInterval($rootScope.startInterval);
        clearInterval($rootScope.getUpdataStatus);
        $rootScope.pageNow = 0;
        // 流量方向选择
        $scope.statusData = [{
            num: 0,
            type: '内网到外网'
        }, {
            num: 1,
            type: '外网到内网'
        }, {
            num: 2,
            type: '内网到内网'
        }, {
            num: 3,
            type: '其他'
        }];
        $scope.pages = {
            data: [],
            count: 0,
            maxPage: "...",
            pageNow: 1,
            rows: 10
        };
        $scope.direction = {
            start_time: moment().subtract(1, 'days').unix(),
            end_time: moment().unix(),
            host_ip: '',
        };
        $scope.timerange(); // 时间插件初始化
    };
    $scope.number_filter = function (params) {
        if (params < 1024) {
            return params + ' B'
        }
        if (params >= 1024 && params < 1024 * 1024) {
            return $filter('number')(params / 1024, 2) + ' KB';
        }
        if (params >= 1024 * 1024 && params < 1024 * 1024 * 1024) {
            return $filter('number')(params / (1024 * 1024), 2) + ' MB';
        }
        if (params >= 1024 * 1024 * 1024) {
            return $filter('number')(params / (1024 * 1024 * 1024), 2) + ' GB';
        }
    };
    // 获取数据
    $scope.getPage = function (pageNow) {
        $scope.content_show = true;
        pageNow = pageNow ? pageNow : 1;
        $scope.index_num = (pageNow - 1) * 10;
        $scope.params_data = {
            flow_direction: $scope.direction.flow_direction,
            host_ip: $scope.direction.host_ip,
            start_time: $scope.direction.start_time,
            end_time: $scope.direction.end_time,
            current_page: pageNow,
            per_page_count: '10'
        };
        if (pageNow > 1000) {
            zeroModal.error('数据超过一万条,请缩小搜索条件');
        } else {
            var loading = zeroModal.loading(4);
            $http({
                method: 'get',
                url: './yiiapi/investigate/flow-direction-investigation',
                params: $scope.params_data,
            }).success(function (data) {
                console.log(data);
                if (data.status == 0) {
                    angular.forEach(data.data.data.data, function (item) {
                        item.flow_bytes = $scope.number_filter(item.flow_bytes);
                    })
                    $scope.pages = data.data;
                    // console.log($scope.pages);
                }
                if (data.status == 1) {
                    zeroModal.error(data.msg);
                }
                zeroModal.close(loading);
            }).error(function (error) {
                console.log(error);
                zeroModal.close(loading);
            })
        }
    };

    // 搜索
    $scope.search = function (params) {
        if ($scope.direction.host_ip == '') {
            zeroModal.error('至少选择时间范围以及另外一项搜索条件');
        } else {
            $scope.getPage(1);
        }
    };
    // 下载报表
    $scope.download = function () {
        if ($scope.pages.count > 1000) {
            zeroModal.error('下载数据不能超出1000条！')
        } else {
            zeroModal.confirm({
                content: "确定下载列表吗？",
                okFn: function () {
                    $scope.download_list();
                },
                cancelFn: function () {}
            });
        }
    };
    //下载列表
    $scope.download_list = function () {
        $http({
            method: 'get',
            url: './yiiapi/investigate/investigation-download-test',
            params: {
                function: 'FlowDirectionSearch',
                flow_direction: $scope.params_data.flow_direction,
                host_ip: $scope.params_data.host_ip,
                start_time: $scope.params_data.start_time,
                end_time: $scope.params_data.end_time,
                current_page: 0,
                per_page_count: 0,
            }
        }).success(function (data) {
            // console.log(data);
            if (data.status == 0) {
                download_now();
            }
            if (data.status == 1) {
                zeroModal.error(data.msg);
            }
        }).error(function (error) {
            console.log(error);
        })

        function download_now() {
            var tt = new Date().getTime();
            var url = './yiiapi/investigate/flow-direction-investigation-export';

            var form = $("<form>"); //定义一个form表单
            form.attr("style", "display:none");
            form.attr("target", "");
            form.attr("method", "get"); //请求类型
            form.attr("action", url); //请求地址
            $("body").append(form); //将表单放置在web中

            var input1 = $("<input>");
            input1.attr("type", "hidden");
            input1.attr("name", "flow_direction");
            input1.attr("value", $scope.params_data.flow_direction);
            form.append(input1);

            var input2 = $("<input>");
            input2.attr("type", "hidden");
            input2.attr("name", "host_ip");
            input2.attr("value", $scope.params_data.host_ip);
            form.append(input2);

            var input3 = $("<input>");
            input3.attr("type", "hidden");
            input3.attr("name", "start_time");
            input3.attr("value", $scope.params_data.start_time);
            form.append(input3);

            var input4 = $("<input>");
            input4.attr("type", "hidden");
            input4.attr("name", "end_time");
            input4.attr("value", $scope.params_data.end_time);
            form.append(input4);

            var input9 = $("<input>");
            input9.attr("type", "hidden");
            input9.attr("name", "current_page");
            input9.attr("value", 0);
            form.append(input9);

            var input0 = $("<input>");
            input0.attr("type", "hidden");
            input0.attr("name", "per_page_count");
            input0.attr("value", 0);
            form.append(input0);

            form.submit(); //表单提交
        }
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
            $scope.direction.start_time = start.unix();
            $scope.direction.end_time = end.unix();
        });
    };
    $scope.init();
}]);