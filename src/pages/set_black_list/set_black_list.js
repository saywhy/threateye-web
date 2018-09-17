/* Controllers */
app.controller('Set_black_listController', ['$scope', '$http', '$state','$rootScope', function ($scope, $http, $state,$rootScope) {
    // 初始化
    $scope.init = function (params) {
        clearInterval($rootScope.insideInterval);
        clearInterval($rootScope.startInterval);
        clearInterval($rootScope.getUpdataStatus);
        $rootScope.pageNow= 0;
        $("input[type='file']").change(function (target) {
            $("#avatval").val($(this).val());
            $scope.uploadPic();
        });
        $scope.white_list = {};
        $scope.pages0 = {
            data: [],
            count: 0,
            maxPage: "...",
            pageNow: 1,
        };
        $scope.type_list = ["MD5", "IP", "URL"];
        $scope.getPage0(); // 获取数据列表
    };
    // 获取列表
    $scope.getPage0 = function (pageNow) {
        var loading = zeroModal.loading(4);
        pageNow = pageNow ? pageNow : 1;
        $scope.index_num = (pageNow-1) * 10;
        $scope.params_data = {
            page: pageNow,
            rows: 10
        };
        $http({
            method: 'get',
            url: './yiiapi/whitelist/list',
            params: $scope.params_data,
        }).success(function (data) {
            // console.log(data);
            if (data.status == 0) {
                $scope.pages0 = data.data;
            }
            if(data.status == 1){
                zeroModal.error(data.msg);
            }
            if (data.status == 401) {
                zeroModal.error(data.msg);
            }
            zeroModal.close(loading);
        }).error(function () {
            zeroModal.close(loading);
        })
    };

    // 添加白名单
    $scope.add = function () {
        var W = 440;
        var H = 300;
        var box = null;
        box = zeroModal.show({
            title: '添加白名单',
            content: newUser,
            width: W + "px",
            height: H + "px",
            ok: true,
            cancel: true,
            okFn: function () {
                // console.log($scope.white_list);
                $scope.add_whitelist($scope.white_list);
            },
            onCleanup: function () {
                hideenBox.appendChild(newUser);
            }
        });
    }

    //添加白名单请求
    $scope.add_whitelist = function(white_list){
        var loading = zeroModal.loading(4);
        $http({
            method: 'post',
            url: './yiiapi/whitelist/add',
            data: {
                "indicator": white_list.indicator,
                "alert_type": white_list.alert_type
            },
        }).success(function (data) {
            // console.log(data);
            if (data.status == 0) {
                zeroModal.success('添加成功！');
                $scope.white_list.indicator = '';
                $scope.getPage0();
            }
            if(data.status == 1){
                zeroModal.error(data.msg);
            }
            if (data.status == 401) {
                zeroModal.error(data.msg);
            }
            zeroModal.close(loading);
        }).error(function () {
            zeroModal.close(loading);
            zeroModal.error('添加失败！');
        })
    };
    //删除白名单
    $scope.del = function(item){
        // console.log(item);
        $scope.del_item = item;
        zeroModal.confirm({
            content: "确定删除白名单吗？",
            okFn: function (item) {
                var loading = zeroModal.loading(4);
                $http({
                    method: 'DELETE',
                    url: './yiiapi/whitelist/del',
                    data: {
                        id:  $scope.del_item.id,
                        indicator:  $scope.del_item.indicator,
                        alert_type:  $scope.del_item.alert_type
                    },
                }).success(function (data) {
                    // console.log(data);
                    if (data.status == 0) {
                        zeroModal.success('删除成功！');
                        $scope.getPage0();
                    }
                    if(data.status == 1){
                        zeroModal.error(data.msg);
                    }
                    if (data.status == 401) {
                        zeroModal.error(data.msg);
                    }
                    zeroModal.close(loading);
                }).error(function () {
                    zeroModal.close(loading);
                    zeroModal.error('删除失败！');
                })
            },
            cancelFn: function () {}
        });
    }
    // 批量导入
    $scope.import = function () {
        $("input[type='file']").trigger('click');
    };
    $scope.uploadPic = function () {
        $scope.progress_if = true;
        var form = document.getElementById('upload'),
            formData = new FormData(form);
        $.ajax({
            url: "./yiiapi/whitelist/add-import",
            type: "post",
            data: formData,
            xhr: function () {　　　　
                var xhr = $.ajaxSettings.xhr();　　　　
                if (xhr.upload) {　　　　　　
                    xhr.upload.onprogress = function (progress) {
                        if (progress.lengthComputable) {
                            // $('#progress')[0].style = 'width:' + parseInt(progress.loaded / progress.total * 100) + '%';
                        }
                    };
                    xhr.upload.onloadstart = function () {
                        // console.log('started...');
                    };　　　
                }
                return xhr;　
            },
            processData: false, // 告诉jQuery不要去处理发送的数据
            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            success: function (res) {
                // console.log(res);
                res = JSON.parse(res) 
                if (res.status == 0) {
                    zeroModal.success('上传成功');
                    $scope.getPage0(); // 获取数据列表
                }
                if (res.status == 1) {
                    zeroModal.error(res.msg);
                }
                if (res.status == 401) {
                    zeroModal.error(res.msg);
                }
            },
            error: function (err) {
                alert("网络连接失败,稍后重试", err);
            }
        })
    };
    // 下载模版
    $scope.download = function(){
        var tt = new Date().getTime();
        var url = './yiiapi/whitelist/download-ioc-template';
        var form = $("<form>"); //定义一个form表单
        form.attr("style", "display:none");
        form.attr("target", "");
        form.attr("method", "get"); //请求类型
        form.attr("action", url); //请求地址
        $("body").append(form); //将表单放置在web中
        var input1 = $("<input>");
        input1.attr("type", "hidden");
        form.append(input1);
        form.submit(); //表单提交
    }
    // 指标 类型 列添加
    $scope.init();
}]);