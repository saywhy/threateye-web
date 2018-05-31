'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    console.log('333');
    
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
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
    
    $http.post('Type_Login', $scope.user)
    .then(function(data) {
        console.log(data);
    }, function(err) {
        console.log(err);
    });
  };

  $scope.newAlert = function (params) {
    $scope.getTime = new Date();
    var postData = {
        client_ip: "",
        endTime: $scope.getTime.valueOf().toString().substring(0, 10),
        page: 1,
        startTime: ($scope.getTime.valueOf() - 86400000 * 300).toString().substring(0, 10)
    }

    $http.post('https://192.168.1.253:8080/alert/page', postData).then(function success(rsp) {
    console.log('111');
    
        console.log(rsp);
        
        $scope.newAlertData = rsp.data.data.slice(0, 5);


    }, function err(rsp) {
        console.log(rsp);
    });

}
$scope.newAlert();


  }]);