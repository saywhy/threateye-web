'use strict';
/* Controllers */
app.controller('Safety_iocController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        console.log('Safety_iocController');

      
    }
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
    }
    // 上传文件
    $scope.uploadPic = function () {
        console.log(1111);
        
        var form = document.getElementById('upload'),
            formData = new FormData(form);
        $.ajax({
            url: "./yiiapi/investigate/upload-file",
            type: "post",
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res) {
                    // alert("上传成功！");
                }
                console.log(res);
                $("#pic").val("");
                $(".showUrl").html(res);
                $(".showPic").attr("src", res);
            },
            error: function (err) {
                alert("网络连接失败,稍后重试", err);
            }

        })

    }

    $scope.init();
}]);