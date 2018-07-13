'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', '$modal', '$http', '$state',
        function ($scope, $translate, $localStorage, $window, $modal, $http, $state) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

            // config
            $scope.app = {
                name: 'ThreatEye防APT解决方案',
                title: 'ThreatEye',
                version: '1.0.0',
                http: 'http://192.168.1.253',
                https: 'http://192.168.1.253',
            }
            // save settings to local storage
            if (angular.isDefined($localStorage.settings)) {
                $scope.app.settings = $localStorage.settings;
            } else {
                $localStorage.settings = $scope.app.settings;
            }
            $scope.$watch('app.settings', function () {
                if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                    // aside dock and fixed must set the header fixed.
                    $scope.app.settings.headerFixed = true;
                }
                // save to local storage
                $localStorage.settings = $scope.app.settings;
            }, true);

            // angular translate
            $scope.lang = {
                isopen: false
            };
            $scope.langs = {
                en: 'English',
                de_DE: 'German',
                it_IT: 'Italian'
            };
            $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
            $scope.setLang = function (langKey, $event) {
                // set the current lang
                $scope.selectLang = $scope.langs[langKey];
                // You can change the language during runtime
                $translate.use(langKey);
                $scope.lang.isopen = !$scope.lang.isopen;
            };

            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }
            //-------------------------------------------------------
            $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                // console.log(toState);
                if (toState.url == '' || toState.url == '/signin') {
                    $http({
                        method: 'POST',
                        url: './yiiapi/site/login'
                    }).then(function successCallback(data) {
                        console.log(data.data);
                        if (data.data.status == 202) {
                            // console.log('已登陆');
                            $state.go('app.overview');
                        }
                    }, function errorCallback(data) {});
                }
            });
            $scope.items = ['item1', 'item2', 'item3'];
            //修改密码
            $scope.change_password = function (size) {
                $scope.data = {};
                var data = '传递数据';
                var modalInstance = $modal.open({
                    templateUrl: 'modal.html',
                    controller: 'Modal_change_passwordCtrl',
                    size: size,
                    resolve: {
                        data: function () { //data作为modal的controller传入的参数
                            $scope.reset_token();
                            return $scope.data; //用于传递数据
                        }
                    }
                });
            };
            $scope.reset_token = function () {

                $http({
                    method: 'get',
                    url: './yiiapi/user/get-self-password-reset-token'
                }).then(function successCallback(data) {
                    if (data.data.status == 0) {
                        $scope.data.token = data.data.data.data.token;
                    }
                }, function errorCallback(data) {
                    console.log(data);
                });
            };
            // 退出
            $scope.sign_out = function () {
                var loading = zeroModal.loading(4);
                $http({
                    method: 'get',
                    url: './yiiapi/site/logout'
                }).then(function successCallback(data) {
                    console.log(data);
                    // 退出成功
                    if (data.data.status == 0) {
                        zeroModal.close(loading);
                        $state.go('signin');
                    }
                }, function errorCallback(data) {
                    console.log(data);
                });
            };
        }
    ]);