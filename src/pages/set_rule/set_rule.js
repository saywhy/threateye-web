/* Controllers */
app.controller('Set_ruleController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        $("#avatval").click(function () {
            $("input[type='file']").trigger('click');
            $scope.$apply(function(){
                $('#progress')[0].style='width:0%';
                $scope.progress_if=false;
            })
        });
        $("input[type='file']").change(function () {
            $("#avatval").val($(this).val());
        });
        $scope.progress_if=false;
    };
    // 上传文件
    $scope.uploadPic = function () {
        $scope.progress_if=true;
        var form = document.getElementById('upload'),
            formData = new FormData(form);
        $.ajax({
            url: "./yiiapi/rulebase/upload-package",
            type: "post",
            data: formData,
            processData: false, // 告诉jQuery不要去处理发送的数据
            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
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
            success: function (res) {
                res = JSON.parse(res)
                console.log(res);
                if (res) {

                }
            },
            error: function (err) {
                alert("网络连接失败,稍后重试", err);
            }
        })
    };


    $scope.init();
}]);