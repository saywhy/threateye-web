/* Controllers */
app.controller('Set_ruleController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        $scope.upload_true = true;
        $scope.disabledUpdata = true;
        $scope.updataText = '';
        $scope.offline_update_button = true;
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
                if (target.target.value.split('.')[1].indexOf('tgz') == -1) {
                    zeroModal.error(' 请重新选择.tgz格式的文件上传');
                    // 请上传名为sdk.tgz、ips.tgz、sandbox.tgz或yara.tgz的文件
                    $scope.$apply(function () {
                        $scope.upload_true = true;
                        $scope.offline_update_button = true;
                    })
                } else {
                    $scope.$apply(function () {
                        $scope.upload_true = false;
                    })
                }
            } else {
                $scope.$apply(function () {
                    $scope.upload_true = true;
                    $scope.offline_update_button = true;
                })
            }

        });
        $scope.progress_if = false;
        $scope.updataStatus();
    };


    $scope.getUpdataStatus = setInterval(function () {
        $scope.updataStatus();
    }, 10000)

    $scope.updataStatus = function () {
        $http({
            method: 'get',
            url: './yiiapi/rulebase/get-update-status'
        }).success(function (data) {
            console.log(data);
            if (data.status == 0) {
                if (data.data.status == 1) {
                    // 正在升级中
                    $scope.disabledUpdata = true;
                    $scope.updataText = '正在升级中'
                }
                if (data.data.status == 2) {
                    // 升级完成
                    // 手动升级完成时间为 timestamp
                    $scope.disabledUpdata = false;
                    $scope.updataText = '手动升级完成时间为:' + data.data.timestamp
                }
            }
        }).error(function () {
            zeroModal.error('获取更新状态失败！');
            clearInterval($scope.getUpdataStatus);
        })
    }
    // 实时更新
    $scope.real_time_update = function () {

        if ($scope.disabledUpdata) {
            zeroModal.error('正在升级中');
        } else {
            var loading = zeroModal.loading(4);
            $http({
                method: 'post',
                url: './yiiapi/rulebase/realtime-update'
            }).success(function (data) {
                console.log(data);
                if (data.status == 0) {
                    // zeroModal.success('开始更新！');
                }
                if (data.status == 1) {
                    zeroModal.error(data.msg);
                }
                zeroModal.close(loading);
            }).error(function () {
                zeroModal.close(loading);
                zeroModal.error('更新失败！');
            })
        }
    };
    // 离线更新
    $scope.offline_update = function () {
        var loading = zeroModal.loading(4);
        $http({
            method: 'post',
            url: './yiiapi/rulebase/offline-updating'
        }).success(function (data) {
            // console.log(data);
            zeroModal.close(loading);
            if (data.status == 0) {
                zeroModal.success('更新成功！');
            }
            if (data.status == 1) {
                zeroModal.error(data.msg);
            }
        }).error(function () {
            zeroModal.close(loading);
            zeroModal.error('更新失败！');
        })
    };

    // 上传文件
    $scope.uploadPic = function () {
        $scope.progress_if = true;
        $scope.offline_update_button = true;
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
                            $('#progress')[0].style = 'width:' + parseInt(progress.loaded / progress.total * 100) + '%';
                        }
                    };
                    xhr.upload.onloadstart = function () {
                        // console.log('started...');
                    };　　　
                }
                return xhr;　
            },
            success: function (res) {
                // res = JSON.parse(res)
                // console.log(res);
                if (res.status == 0) {
                    zeroModal.success('上传成功');
                    $scope.$apply(function () {
                        $scope.offline_update_button = false;
                    })

                } else if (res.status == 1) {
                    zeroModal.error(res.msg);
                }
            },
            error: function (err) {
                alert("网络连接失败,稍后重试", err);
            }
        })
    };
    $scope.init();
}]);