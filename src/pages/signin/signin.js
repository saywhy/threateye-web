'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    console.log('成功链接服务器230');
    $scope.init = function () {
        // $scope.particvle();
        $scope.login_show = false;
        $scope.user = {};
        $scope.creat = {};
        $scope.frist_login();
    };
    // 第一次登录判断有无用户
    $scope.frist_login = function () {
        $http({
            method: 'POST',
            url: './yiiapi/site/login'
        }).then(function successCallback(data) {
            console.log(data.data);
            if(data.data.status == 207){
                console.log('未注册');
                $scope.login_show = true;
            }else if(data.data.status == 202){
                console.log('已登陆');
                $state.go('app.overview');
            }else{
                $scope.login_show = false;
            }
        }, function errorCallback(data) {
            console.log(data);
            zeroModal.close(loading);
        });
    };
    // 创建管理员
    $scope.creat_admin = function(){
        console.log($scope.creat);
        var loading = zeroModal.loading(4);
        // $state.go('app.overview');
        $scope.password_rexp = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}/;
        if( !$scope.password_rexp.test($scope.creat.password)){
            zeroModal.error('密码8-30位必须包含大写字母、小写字母、数字、特殊字符');
            zeroModal.close(loading);
        }else if($scope.creat.password!=$scope.creat.repassword){
            zeroModal.error('密码不一致');
            zeroModal.close(loading);
        }else {
            $http({
                method: 'POST',
                url: './yiiapi/site/login',
                data:{
                    "LoginForm": {
                        "username": $scope.creat.username,
                        "password": $scope.creat.password,
                        'repassword':$scope.creat.repassword
                    },
                    "login-button": ""
                }
            }).then(function successCallback(data) {
                console.log(data);
                zeroModal.close(loading);
                // 创建成功，显示登录页面登录
                if (data.data.status == 0) {
                    zeroModal.success('创建管理员成功!');
                    $scope.login_show = false;
                } 
            }, function errorCallback(data) {
                zeroModal.close(loading);
            });
        }
      
      
    };
    // 登录
    $scope.login = function () {
        var loading = zeroModal.loading(4);
        console.log($scope.user);
        // $state.go('app.overview');
        $http({
            method: 'POST',
            url: './yiiapi/site/login',
            data: {
                "LoginForm": {
                    "username": $scope.user.username,
                    "password": $scope.user.password
                },
                "login-button": ""
            }
        }).then(function successCallback(data) {
            console.log(data.data);
            // 登陆成功
            if (data.data.status == 0) {
                $state.go('app.overview');
                zeroModal.close(loading);
            } else if (data.data.status == 202) {
                // 已登录
                $state.go('app.overview');
                zeroModal.close(loading);
            }else if(data.data.status == 1){
                zeroModal.close(loading);
                if(data.data.msg.username){
                    $scope.msg_error = data.data.msg.username[0];
                };
                if(data.data.msg.password){
                    $scope.msg_error = data.data.msg.password[0];
                };
            }
        }, function errorCallback(data) {
            console.log(data);
            zeroModal.close(loading);
        });
    };
    //背景canvas 插件
    $scope.particvle = function (params) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    $scope.init();
}]);