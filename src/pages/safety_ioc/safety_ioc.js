'use strict';
/* Controllers */
app.controller('Safety_iocController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        $scope.upload_true = true; //初始化禁用提交按钮
        $("#avatval").click(function () {
            $("input[type='file']").trigger('click');
            $scope.$apply(function () {
                $('#progress')[0].style = 'width:0%';
                $scope.progress_if = false;
            })
        });
        $("input[type='file']").change(function (target) {
            $("#avatval").val($(this).val());
            if (target.target.value) {
                if (target.target.value.split('.')[1].indexOf('txt') == -1 && target.target.value.split('.')[1].indexOf('ioc') == -1) {
                    zeroModal.error(' 请重新选择.txt或.ioc格式的文件上传');
                    $scope.$apply(function () {
                        $scope.upload_true = true;
                    })
                } else {
                    $scope.$apply(function () {
                        $scope.upload_true = false;
                    })
                }
            }
        });
        $scope.progress_if = false;
        $scope.pages = {
            data: [],
            count: 0,
            maxPage: "...",
            pageNow: 1,
        };
        $scope.getPage(); // 获取数据列表
    };
    //获取数据
    $scope.getPage = function (pageNow) {
        var loading = zeroModal.loading(4);
        pageNow = pageNow ? pageNow : 1;
        $scope.index_num = (pageNow-1) * 10;
        $scope.params_data = {
            page: pageNow,
            rows: 10
        };
        $http({
            method: 'get',
            url: './yiiapi/investigate/ioc-scanning-list',
            params: $scope.params_data,
        }).success(function (data) {
            // console.log(data);
            if (data.status == 0) {
                $scope.pages = data.data;
                angular.forEach( $scope.pages.data,function(item,index){
                    item.create_percent = item.create_percent +'%';
                });
            }
            zeroModal.close(loading);
        }).error(function () {
            zeroModal.close(loading);
        })
    };
    // 下载模版
    $scope.download_temp = function () {
        var tt = new Date().getTime();
        var url = './yiiapi/investigate/download-ioc-template';
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
    };
    // 上传文件
    $scope.uploadPic = function () {
        $scope.progress_if = true;
        var form = document.getElementById('upload'),
            formData = new FormData(form);
        $.ajax({
            url: "./yiiapi/investigate/upload-file",
            type: "post",
            data: formData,
            xhr: function () {　　　　
                var xhr = $.ajaxSettings.xhr();　　　　
                if (xhr.upload) {　　　　　　
                    xhr.upload.onprogress = function (progress) {
                        if (progress.lengthComputable) {
                            $('#progress')[0].style = 'width:' + parseInt(progress.loaded / progress.total * 100) + '%';
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
                if (res.status == 0) {
                    zeroModal.success('上传成功');
                }
                if(res.status == 1){
                    zeroModal.error(res.msg);
                }
            },
            error: function (err) {
                alert("网络连接失败,稍后重试", err);
            }
        })
    };
    //搜索
    $scope.search = function () {
        $scope.getPage();
    };
    //下载列表文件
    $scope.download = function (id) {
        zeroModal.confirm({
            content: "确定下载吗？",
            okFn: function () {
                $http({
                    method: 'get',
                    url: './yiiapi/investigate/ioc-scanning-download-test',
                    params: {
                        'id': id
                    }
                }).success(function (data) {
                    // console.log(data);
                    if (data.status == 0) {
                        var tt = new Date().getTime();
                        var url = './yiiapi/investigate/ioc-scanning-download';
                        var form = $("<form>"); //定义一个form表单
                        form.attr("style", "display:none");
                        form.attr("target", "");
                        form.attr("method", "get"); //请求类型
                        form.attr("action", url); //请求地址
                        $("body").append(form); //将表单放置在web中
                        var input1 = $("<input>");
                        input1.attr("type", "hidden");
                        input1.attr("name", "id");
                        input1.attr("value", id);
                        form.append(input1);
                        form.submit(); //表单提交
                    } else if (data.status == 1) {
                        zeroModal.error(data.msg);
                    }
                }).error(function (error) {
                    console.log(error);
                })
            },
            cancelFn: function () {}
        });
    };
    //删除列表数据
    $scope.del = function (id) {
        zeroModal.confirm({
            content: "确定删除吗？",
            okFn: function () {
                var loading = zeroModal.loading(4);
                $http({
                    method: 'delete',
                    url: './yiiapi/investigate/ioc-scanning-del',
                    data: {
                        'id': id
                    }
                }).success(function (data) {
                    // console.log(data);
                    if (data.status == 0) {
                        zeroModal.success('删除成功');
                        $scope.getPage();
                    } else {
                        zeroModal.error(data.msg);
                    }
                    zeroModal.close(loading);
                }).error(function () {
                    zeroModal.close(loading);
                    zeroModal.error('删除失败');
                })
            },
            cancelFn: function () {}
        });

    };

    $scope.init();
}]);