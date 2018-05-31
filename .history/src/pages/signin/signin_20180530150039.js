'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    console.log('333');

    $scope.user = {};
    $scope.authError = null;
    $scope.login = function () {
        //   $scope.authError = null;
        // Try to login
        //   $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
        //   .then(function(response) {
        //     if ( !response.data.user ) {
        //       $scope.authError = 'Email or Password not right';
        //     }else{
        //       $state.go('app.dashboard-v1');
        //     }
        //   }, function(x) {
        //     $scope.authError = 'Server Error';
        //   });
        // };
        console.log($scope.user);
        $http.post('https://192.168.1.253/site/login', $scope.user)
            .then(function (data) {
                console.log(data);
            }, function (err) {
                console.log(err);
            });
    };

    $scope.test = function (params) {
        $http({
            method: 'GET',
            url: 'https://192.168.1.253:8080/alert/threat-type'
        }).then(function (data, status, headers, config) {

            console.log(data.data);

            // 当相应准备就绪时调用
        }, function (error, status, headers, config) {
            console.log(error);

        })
    }
    $scope.test();


}]);