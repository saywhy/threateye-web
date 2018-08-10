/* Controllers */
app.controller('Set_yaraController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {

    };
    $scope.yara_replace = function () {
        console.log(1111);
        $("input[type='file']").trigger('click');
        $("input[type='file']").change(function (target) {
            $("#avatval").val($(this).val());
            console.log(22222);
        });
    };
    $scope.init();
}]);