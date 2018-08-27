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
            rows: 10
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
        $scope.getPage(1);
    };
    //搜索
    $scope.search = function () {
        $scope.getPage(1);
    };
    // 获取数据
    $scope.getPage = function (pageNow) {
        pageNow = pageNow ? pageNow : 1;
        $scope.index_num = (pageNow - 1) * 10;
        $scope.params_data = {
            host_ip: $scope.dns.host_ip,
            dns_ip: $scope.dns.server_ip,
            domain: $scope.dns.domain_ip,
            resolve_ip: $scope.dns.resolves_ip,
            ttl: $scope.dns.ttl,
            resolve_result: $scope.dns.resolves_res,
            start_time: $scope.default_time.startTime,
            end_time: $scope.default_time.endTime,
            current_page: pageNow,
            per_page_count: '10'
        };
        console.log($scope.params_data);
        // var loading = zeroModal.loading(4);
        $http({
            method: 'get',
            url: './yiiapi/investigate/dns-investigation',
            params: $scope.params_data,
        }).success(function (data) {
            console.log(data);
            if (data.status == 0) {
                $scope.pages = data.data;
                console.log($scope.pages);
            }
            if (data.status == 1) {
                zeroModal.error(data.msg);
            }
            // zeroModal.close(loading);
        }).error(function () {
            // zeroModal.close(loading);
        })
    };
    //导出csv 
    $scope.export = function (params) {
        console.log($scope.dns);
        console.log($scope.searchData);
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
                function: 'DnsSearch',
                host_ip: $scope.params_data.host_ip,
                dns_ip: $scope.params_data.dns_ip,
                domain: $scope.params_data.domain,
                resolve_ip: $scope.params_data.resolve_ip,
                ttl: $scope.params_data.ttl,
                resolve_result: $scope.params_data.resolve_result,
                start_time: $scope.params_data.start_time,
                end_time: $scope.params_data.end_time,
                current_page: 0,
                per_page_count: 0,
            }
        }).success(function (data) {
            console.log(data);
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
            var url = './yiiapi/investigate/dns-investigation-export';
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
            input1.attr("name", "host_ip");
            input1.attr("value", $scope.params_data.host_ip);
            form.append(input1);

            var input2 = $("<input>");
            input2.attr("type", "hidden");
            input2.attr("name", "dns_ip");
            input2.attr("value", $scope.params_data.dns_ip);
            form.append(input2);

            var input3 = $("<input>");
            input3.attr("type", "hidden");
            input3.attr("name", "domain");
            input3.attr("value", $scope.params_data.domain);
            form.append(input3);

            var input4 = $("<input>");
            input4.attr("type", "hidden");
            input4.attr("name", "resolve_ip");
            input4.attr("value", $scope.params_data.resolve_ip);
            form.append(input4);

            var input5 = $("<input>");
            input5.attr("type", "hidden");
            input5.attr("name", "ttl");
            input5.attr("value", $scope.params_data.ttl);
            form.append(input5);

            var input6 = $("<input>");
            input6.attr("type", "hidden");
            input6.attr("name", "resolve_result");
            input6.attr("value", $scope.params_data.resolve_result);
            form.append(input6);

            var input7 = $("<input>");
            input7.attr("type", "hidden");
            input7.attr("name", "start_time");
            input7.attr("value", $scope.params_data.start_time);
            form.append(input7);

            var input8 = $("<input>");
            input8.attr("type", "hidden");
            input8.attr("name", "end_time");
            input8.attr("value", $scope.params_data.end_time);
            form.append(input8);

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
            $scope.default_time.startTime = start.unix();
            $scope.default_time.endTime = end.unix();
        });
    };
    $scope.init();
}]);