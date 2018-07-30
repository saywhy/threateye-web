'use strict';
/* Controllers */
app.controller('Safety_iocController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        $scope.upload_true = true; //初始化禁用提交按钮
        $("#avatval").click(function(){
            $("input[type='file']").trigger('click');
            $scope.$apply(function(){
                $('#progress')[0].style='width:0%';
                $scope.progress_if=false;
            })
        });
        $("input[type='file']").change(function(target){
            $("#avatval").val($(this).val());
            if(target.target.value.split('.')[1].indexOf('txt') == -1 && target.target.value.split('.')[1].indexOf('ioc') == -1 ){
                zeroModal.error(' 请重新选择.txt或.ioc格式的文件上传');
                $scope.$apply(function(){
                    $scope.upload_true = true;
                })
            }else{
                $scope.$apply(function(){
                    $scope.upload_true = false;
                })
            }
        });
        $scope.progress_if=false;
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
        input1.attr("name", "id");
        form.append(input1);
        form.submit(); //表单提交
    };
    // 上传文件
    $scope.uploadPic = function () {
        $scope.progress_if=true;
        var form = document.getElementById('upload'),
            formData = new FormData(form);
            console.log(form);
            console.log(formData);
        $.ajax({
            url: "./yiiapi/investigate/upload-file",
            type: "post",
            data: formData,
            xhr: function () {　　　　
                var xhr = $.ajaxSettings.xhr();　　　　
                if (xhr.upload) {　　　　　　
                    xhr.upload.onprogress = function (progress) {
                        if (progress.lengthComputable) {
                                $('#progress')[0].style='width:'+ parseInt(progress.loaded / progress.total * 100) +'%';
                        }
                    };
                    xhr.upload.onloadstart = function () {
                        console.log('started...');
                    };　　　
                }
                return xhr;　
            },
            processData: false,  // 告诉jQuery不要去处理发送的数据
             contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            success: function (res) {
                console.log(res);
                if (res) {
                    // alert("上传成功！");
                }
            },
            error: function (err) {
                alert("网络连接失败,稍后重试", err);
            }
        })
    };

    $scope.init();
}]);