/* Controllers */
app.controller('Set_yaraController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    $scope.init = function (params) {

    };
    $scope.yara_replace = function () {
        $("input[type='file']").trigger('click');
        $("input[type='file']").change(function (target) {
            $("#avatval").val($(this).val());
        });
    };
    $scope.init();
}]);