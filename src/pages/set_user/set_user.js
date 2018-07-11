/* Controllers */
app.controller('Set_userController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {
        $scope.get_users();// 获取所有用户
        // $http.post('http://localhost:81/user/user-add',
        // {'Content-Type':'application/form-data'})
        // .success(function(data){
        //     console.log(1111); console.log(data);
        // });
        // $http.jsonp("http://localhost:81/user/page?callback=JSON_CALLBACK").success(function(data){  
        //      console.log(1111); console.log(data); 

        //     });
        //     $http({
        //         method: 'JSONP',
        //         url: 'http://localhost:81/user/page',
        //     }).success(function (data) {
        //         console.log(data);
        //     });
        
     
        $http({
            method: 'GET',
            url: 'http://192.168.1.123:81/user/page'
        }).then(function successCallback(data) {
            console.log(data.data);
        }, function errorCallback(data) {
            console.log(data);
        });
        // $http.get('http://localhost:81/user/page').success(function (data) {
        //     console.log(11212);
        //     console.log(data);
        // });
        // $.get("http://localhost:81/user/page", function (data) {
        //     console.log(data);
        // });
        //   $.ajax({
        //     type:"get",    //请求方式
        //     async:true,    //是否异步
        //     url:"http://192.168.1.123:81/user/page",
        //     dataType:"jsonp",    //跨域json请求一定是jsonp
        //     // jsonp: "callbackparam",    //跨域请求的参数名，默认是callback
        //         //jsonpCallback:"successCallback",    //自定义跨域参数值，回调函数名也是一样，默认为jQuery自动生成的字符串
        //     // data:{"query":"civilnews"},    //请求参数
        //     beforeSend: function() {
        //         //请求前的处理
        //     },
        //     success: function(data) {
        //         console.log(data);
        //         //请求成功处理，和本地回调完全一样
        //     },
        //     complete: function() {
        //         //请求完成的处理
        //     },
        //     error: function() {
        //         console.log(data);
        //         //请求出错处理
        //     }
        // });
        // $.ajax({
        //     url: "http://192.168.1.123:81/user/page",
        //     // dataType: 'jsonp', 
        //     type: 'GET',
        //     success: function (data) {
        //         console.log(data);
        //     },
        //     error: function (data) {
        //         console.log(data);
        //         //请求出错处理
        //     }
        // });
    }
    // 获取用户列表
    $scope.get_users = function(){
        var loading = zeroModal.loading(4);
        var params = {
            page:1,
            rows:10
        };
        $http({
            method: 'get',
            url: '../yiiapi/user/page',
            params:params
        }).then(function successCallback(data) {
            console.log(data);
            zeroModal.close(loading);
        }, function errorCallback(data) {
            console.log(data);
            zeroModal.close(loading);
        });
    };


    $scope.init();
}]);