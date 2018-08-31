/* Controllers */
app.controller('Set_userController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        $scope.UserIDList = [];
        $scope.userList = {};
        $scope.pages = {
            data: [],
            count: 0,
            maxPage: "...",
            pageNow: 1,
        };
        $scope.userRole = {
            'admin': '管理员',
            'user': '普通用户',
            'share': '共享用户'
        }
        $scope.getPage(); // 获取用户列表
    };
    // 获取用户列表
    $scope.getPage = function (pageNow) {
        var loading = zeroModal.loading(4);
        pageNow = pageNow ? pageNow : 1;
        $scope.index_num = (pageNow-1) * 10;
        $http.post('./yiiapi/user/page', {
            page: pageNow
        }).then(function success(rsp) {
            // console.log(rsp.data);
            if (rsp.data.status == 0) {
                zeroModal.close(loading);
                $scope.pages = rsp.data.data;
            }
            if(rsp.data.status == 1){
                zeroModal.error(rsp.data.msg);
            }
        }, function err(rsp) {
            zeroModal.close(loading);
        });
    };
    // 添加用户
    $scope.add = function () {
        var W = 540;
        var H = 480;
        var box = null;
        $scope.newUser = {
            username: '',
            password: '',
            role: 'user'
        }
        box = zeroModal.show({
            title: '添加用户',
            content: newUser,
            width: W + "px",
            height: H + "px",
            ok: true,
            cancel: true,
            okFn: function () {
                var username = $scope.newUser.username;
                var flag = true;
                if (username == null || username.length == 0 || !/^[a-z0-9_-]{2,16}$/.test(username)) {
                    flag = false;
                    $scope.nameerror = true;
                } else {
                    $scope.nameerror = false;
                }
                var password = $scope.newUser.password;
                var pattern = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}/;
                if (!pattern.test(password)) {
                    flag = false;
                    $scope.passworderror = true;
                } else {
                    $scope.passworderror = false;
                }
                if (password != $scope.newUser.repassword) {
                    flag = false;
                    $scope.repassworderror = true;
                } else {
                    $scope.repassworderror = false;
                }
                $scope.$apply();
                if (!flag) {
                    return false;
                }
                $scope.sendUser();
            },
            onCleanup: function () {
                hideenBox.appendChild(newUser);
            }
        });
    };
    $scope.sendUser = function (id, $event) {
        rqs_data = {
            username: $scope.newUser.username,
            password: $scope.newUser.password,
            role: $scope.newUser.role,
            page: $scope.pages.pageNow
        };
        var str = JSON.stringify(rqs_data)
        // console.log(str);
        var loading = zeroModal.loading(4);
        $http.post("./yiiapi/user/user-add", rqs_data).then(function success(rsp) {
            zeroModal.close(loading);
            // console.log(rsp);
            if (rsp.data.status == 0) {
                $scope.pages = rsp.data.data;
            } else if (rsp.data.status == 1) {
                zeroModal.error({
                    content: '用户添加失败',
                    contentDetail: '此用户名已经存在！'
                });
            }
        }, function err(rsp) {
            zeroModal.close(loading);
        });
    };
    // 删除用户
    $scope.del = function (item) {
        zeroModal.confirm({
            content: '确定删除' + $scope.userRole[item.role] + '"' + item.username + '"吗？',
            okFn: function () {
                rqs_data = {
                    id: item.id,
                    page: $scope.pages.pageNow
                };
                // console.log(rqs_data);
                var loading = zeroModal.loading(4);
                $http({
                    method: 'delete',
                    url: './yiiapi/user/user-del',
                    data: rqs_data,
                }).success(function (req) {
                    zeroModal.close(loading);
                    if (req.status == 0) {
                        $scope.getPage();
                    }
                }).error(function () {
                    zeroModal.close(loading);
                })
            },
            cancelFn: function () {}
        });
    };
    //重置密码
    $scope.resetPassword = function (user) {
        // console.log(user);
        
        var loading = zeroModal.loading(4);
        $http.get("./yiiapi/user/get-password-reset-token?id=" + user.id).then(function success(rsp) {
            // console.log(rsp);
            
            zeroModal.close(loading);
            if (rsp.data.status == 0) {
                var W = 540;
                var H = W * 3 / 4;
                zeroModal.show({
                    title: '重置[' + user.username + ']的密码',
                    content: resetPassword,
                    width: W + "px",
                    height: H + "px",
                    ok: true,
                    cancel: true,
                    okFn: function () {
                        var flag = true;
                        var password = $scope.resetUser.password;
                        var pattern = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}/;
                        if (!pattern.test(password)) {
                            flag = false;
                            $scope.resetUser_passworderror = true;
                        } else {
                            $scope.resetUser_passworderror = false;
                        }
                        if (password != $scope.resetUser.repassword) {
                            flag = false;
                            $scope.resetUser_repassworderror = true;
                        } else {
                            $scope.resetUser_repassworderror = false;
                        }
                        $scope.$apply();
                        if (!flag) {
                            return false;
                        }
                        var post_data = {
                            'ResetPasswordForm': {
                                'password': password
                            }
                        };
                        loading = zeroModal.loading(4);
                        $http({
                            method: 'put',
                            url: './yiiapi/user/reset-password?token=' + rsp.data.data.token,
                            data: post_data,
                        }).success(function (data) {
                            // console.log(data);
                            if(data.status == 0){
                                zeroModal.success('密码重置成功！');
                            }else{
                                zeroModal.error('密码重置失败！');
                            }
                            zeroModal.close(loading);
                        }).error(function () {
                            zeroModal.close(loading);
                            zeroModal.error('密码重置失败！');
                        })
                    },
                    onCleanup: function () {
                        hideenBox.appendChild(resetPassword);
                    }
                });
            }
        }, function err(rsp) {
            zeroModal.close(loading);
        });
    };
    $scope.init();
}]);